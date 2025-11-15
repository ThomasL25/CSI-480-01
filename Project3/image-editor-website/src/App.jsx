import { useState } from 'react'
import './App.css'

function App() {
    const [uploadedImage, setUploadedImage] = useState(null)
    const [editedImage, setEditedImage] = useState(null)

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
        if (action === 'Sepia Tone') applySepia()
            if (action === 'Hue Rotation') applyHueRotation()
        // Placeholder for future implementation
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
            </div>
        </div>
    )
}

export default App