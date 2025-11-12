import { useState } from 'react'
import './App.css'

function App() {
    const [uploadedImage, setUploadedImage] = useState(null)

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                setUploadedImage(event.target.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleButtonClick = (action) => {
        console.log(`${action} clicked`)
        // Placeholder for future implementation
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
                    <span>Edited Image</span>
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