import { useState } from 'react'
import './App.css'

function App() {
    const [uploadedImage, setUploadedImage] = useState(null)
    const [editedImage, setEditedImage] = useState(null)
    const [brightness, setBrightness] = useState(0);
    const [showBrightness, setShowBrightness] = useState(false);
    const [saturation, setSaturation] = useState(0);
    const [showSaturation, setShowSaturation] = useState(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                setUploadedImage(event.target.result)
                setEditedImage(null)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleButtonClick = (action) => {
        console.log(`${action} clicked`)
        if (action === 'Sepia Tone') 
        {
            applySepia();
            setShowBrightness(false);
            setShowSaturation(false);
        }   
        if (action === 'Hue Rotation') 
        {
            applyHueRotation();
            setShowBrightness(false);
            setShowSaturation(false);
        }
        if (action === 'Grayscale') {
            applyGreyScale();
            setShowBrightness(false);
            setShowSaturation(false);
        }

        if (action === 'Brightness') {
            setShowBrightness(true);
            setShowSaturation(false);
            setEditedImage(uploadedImage);
        }

        if (action === 'Saturation Adjustment') {
            setShowSaturation(true);
            setShowBrightness(false);
            setEditedImage(uploadedImage);
        }
        // Placeholder for future implementation
    }

    const applyGreyScale = () => {
        if(!uploadedImage) return

        const img = new Image()
        img.src = uploadedImage
        img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            const data = imageData.data


            for (let i = 0;i < data.length; i += 4) {
                let r = data[i] * 0.2126
                let g = data[i + 1] * 0.7152
                let b = data[i + 2] * 0.0722

                let greyScale = r + g + b

                data[i] = data[i + 1] = data[i + 2] = greyScale

            }

            ctx.putImageData(imageData, 0, 0)
            setEditedImage(canvas.toDataURL())
        }

    }


    const applySepia = () => {
        if (!uploadedImage) return


        const img = new Image()
        img.src = uploadedImage
        img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)


            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            const data = imageData.data


            for (let i = 0; i < data.length; i += 4) {
            const r = data[i]
            const g = data[i + 1]
            const b = data[i + 2]


            data[i] = Math.min(0.393 * r + 0.769 * g + 0.189 * b, 255)
            data[i + 1] = Math.min(0.349 * r + 0.686 * g + 0.168 * b, 255)
            data[i + 2] = Math.min(0.272 * r + 0.534 * g + 0.131 * b, 255)
            }


            ctx.putImageData(imageData, 0, 0)
            setEditedImage(canvas.toDataURL())
        }
    }

    const applyHueRotation = () => {
        if (!uploadedImage) return


        const img = new Image()
        img.src = uploadedImage
        img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)


            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            const data = imageData.data


            for (let i = 0; i < data.length; i += 4) {
                let r = data[i] / 255
                let g = data[i + 1] / 255
                let b = data[i + 2] / 255


                const max = Math.max(r, g, b)
                const min = Math.min(r, g, b)
                let h, s, l
                l = (max + min) / 2


                if (max === min) {
                h = s = 0
                } else {
                    const d = max - min
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
                    switch (max) {
                        case r:
                        h = (g - b) / d + (g < b ? 6 : 1)
                        break
                        case g:
                        h = (b - r) / d + 2
                        break
                        case b:
                        h = (r - g) / d + 4
                        break
                    }
                    h /= 6
                }


                // Add hue rotation
                h += 0.1
                if (h > 1) h -= 1


                const hueToRgb = (p, q, t) => {
                    if (t < 0) t += 1
                    if (t > 1) t -= 1
                    if (t < 1/6) return p + (q - p) * 6 * t
                    if (t < 1/2) return q
                    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
                    return p
                }


                let r2, g2, b2
                if (s === 0) {
                r2 = g2 = b2 = l
                } else {
                    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
                    const p = 2 * l - q
                    r2 = hueToRgb(p, q, h + 1/3)
                    g2 = hueToRgb(p, q, h)
                    b2 = hueToRgb(p, q, h - 1/3)
                }


                data[i] = r2 * 255
                data[i + 1] = g2 * 255
                data[i + 2] = b2 * 255
            }


            ctx.putImageData(imageData, 0, 0)
            setEditedImage(canvas.toDataURL())
        }
    }

    const applyBrightness = (value) => {
        if (!uploadedImage) return;

        const img = new Image();
        img.src = uploadedImage;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                data[i]     = Math.min(Math.max(data[i]     + value, 0), 255); // R
                data[i + 1] = Math.min(Math.max(data[i + 1] + value, 0), 255); // G
                data[i + 2] = Math.min(Math.max(data[i + 2] + value, 0), 255); // B
            }

            ctx.putImageData(imageData, 0, 0);
            setEditedImage(canvas.toDataURL());
        };
    };

    const applySaturation = (value) => {
        if (!uploadedImage) return;

        const img = new Image();
        img.src = uploadedImage;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Convert value from -100 to 100 range to a saturation multiplier
            // -100 = 0 saturation (grayscale), 0 = no change, 100 = 2x saturation
            const saturationMultiplier = 1 + (value / 100);

            for (let i = 0; i < data.length; i += 4) {
                let r = data[i] / 255;
                let g = data[i + 1] / 255;
                let b = data[i + 2] / 255;

                // Convert RGB to HSL
                const max = Math.max(r, g, b);
                const min = Math.min(r, g, b);
                let h, s, l;
                l = (max + min) / 2;

                if (max === min) {
                    h = s = 0; // achromatic
                } else {
                    const d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch (max) {
                        case r:
                            h = (g - b) / d + (g < b ? 6 : 0);
                            break;
                        case g:
                            h = (b - r) / d + 2;
                            break;
                        case b:
                            h = (r - g) / d + 4;
                            break;
                    }
                    h /= 6;
                }

                // Apply saturation adjustment
                s = Math.min(Math.max(s * saturationMultiplier, 0), 1);

                // Convert HSL back to RGB
                const hueToRgb = (p, q, t) => {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                };

                let r2, g2, b2;
                if (s === 0) {
                    r2 = g2 = b2 = l;
                } else {
                    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                    const p = 2 * l - q;
                    r2 = hueToRgb(p, q, h + 1 / 3);
                    g2 = hueToRgb(p, q, h);
                    b2 = hueToRgb(p, q, h - 1 / 3);
                }

                data[i] = r2 * 255;
                data[i + 1] = g2 * 255;
                data[i + 2] = b2 * 255;
            }

            ctx.putImageData(imageData, 0, 0);
            setEditedImage(canvas.toDataURL());
        };
    };

    

    return (
        <div className="app">
            <h1 className="title">Image Editor</h1>

            <div className="editor-container">
                <div className="image-box">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        id="image-upload"
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="image-upload" className="upload-label">
                        {uploadedImage ? (
                            <img src={uploadedImage} alt="Uploaded" className="preview-image" />
                        ) : (
                            <span>Upload Your Image</span>
                        )}
                    </label>
                </div>

                <div className="arrow">&#8594;</div>

                <div className="image-box edited">
                    {editedImage ? (
                        <img src={editedImage} alt="Edited" className="preview-image" />
                    ) : (
                    <span>Edited Image</span>
                    )}
                </div>
            </div>

            <div className="controls">
                <button onClick={() => handleButtonClick('Grayscale')}>Grayscale</button>
                <button onClick={() => handleButtonClick('Contrast Adjustment')}>Contrast Adjustment</button>
                <button onClick={() => handleButtonClick('Hue Rotation')}>Hue Rotation</button>
                <button onClick={() => handleButtonClick('Brightness')}>Brightness</button>
                <button onClick={() => handleButtonClick('Saturation Adjustment')}>Saturation Adjustment</button>
                <button onClick={() => handleButtonClick('Sepia Tone')}>Sepia Tone</button>

                {uploadedImage && showBrightness && (
                    <div style={{ marginTop: '20px' }}>
                        <label>Brightness: {brightness}</label>
                        <input
                            type="range"
                            min="-100"
                            max="100"
                            value={brightness}
                            onChange={(e) => {
                                const newValue = Number(e.target.value);
                                setBrightness(newValue);
                                applyBrightness(newValue);
                            }}
                        />
                    </div>
                )}
                {uploadedImage && showSaturation && (
                    <div style={{ marginTop: '20px' }}>
                        <label>Saturation: {saturation}</label>
                        <input
                            type="range"
                            min="-200"
                            max="200"
                            value={saturation}
                            onChange={(e) => {
                                const newValue = Number(e.target.value);
                                setSaturation(newValue);
                                applySaturation(newValue);
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default App
