Web-Based Image Processing Application

Created by: Justin Allman, Zachary Olson, Thomas Lukasiewicz

Website URL:
https://keen-mandazi-6bcb0b.netlify.app/



Description:

The website's main purpose is to take any image the user uploads and perform a number of graphical transformations to it. Each implemented transformation besides Grayscale and Sepia come with a slider to change the scale as to which the transformation is performed. There is also the ability to download the changed photo simply by clicking on it on the right panel.



Features:

* Grayscale
* Brightness
* Contrast
* Saturation
* Hue
* Sepia

Ability to upload and download images, and perform certain image processing with a real time preview and side-by-side comparison.



Technology Dependencies:



Core Technologies:

JavaScript - Programming language used for all image processing logic and user interactions

React (v19.2.0) - JavaScript library for building the user interface

Vite (v7.2.2) - Fast build tool and development server



package.json dependencies:

JavaScript:

* "react": "^19.2.0",
* "react-dom": "^19.2.0"JavaScript

Dev Dependencies

* "@eslint/js": "^9.39.1",
* "@types/react": "^19.2.2",
* "@types/react-dom": "^19.2.2",
* "@vitejs/plugin-react": "^5.1.0",
* "eslint": "^9.39.1",
* "eslint-plugin-react-hooks": "^5.2.0",
* "eslint-plugin-react-refresh": "^0.4.24",
* "globals": "^16.5.0",
* "vite": "^7.2.2"



Setup Instructions:

1. Install the project folder
2. Unzip the folder
3. Open up Windows PowerShell or an equivalent
4. CD to the project file
5. run "npm install"
6. run "npm run dev"
7. Copy and paste the stated address given into a browser of your choice



File Structure:

Primary coding files are within the src folder, including two .jsx and two .css files. Included in the src folder is an assets folder which was not used. App.css was the primary file for styling of the web page. App.jsx has the implemented image transformations other important functions. index.css also implements styling of the web page. Finally main.jsx takes and performs the executions from App.jsx. The README is also located in the root of the folder.

