# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Setup and installation:
- Prerequisites
    Node.js (version 16 or higher)
    npm (comes with Node.js)
- Installation Steps
    Install the zip folder and Extract
    Open powershell or terminal
    cd to the root of the extracted folder
    npm install
    npm run dev
    Then open your browser and navigate to the given link in your terminal

Technologies Used: Help from Claude, React, and Vite
# Model Card
Data Source: Data.gov  https://catalog.data.gov/dataset/weekly-counts-of-deaths-by-state-and-select-causes-2019-2020

Features Used: Data As Of,Jurisdiction of Occurrence,MMWR Year,MMWR Week,Week Ending Date,All Cause,Natural Cause,Septicemia (A40-A41),Malignant neoplasms (C00-C97),Diabetes mellitus (E10-E14),Alzheimer disease (G30),Influenza and pneumonia (J09-J18),Chronic lower respiratory diseases (J40-J47),"Other diseases of respiratory system (J00-J06,J30-J39,J67,J70-J98)","Nephritis, nephrotic syndrome and nephrosis (N00-N07,N17-N19,N25-N27)","Symptoms, signs and abnormal clinical and laboratory findings, not elsewhere classified (R00-R99)","Diseases of heart (I00-I09,I11,I13,I20-I51)",Cerebrovascular diseases (I60-I69),"COVID-19 (U071, Multiple Cause of Death)","COVID-19 (U071, Underlying Cause of Death)",flag_sept,flag_neopl,flag_diab,flag_alz,flag_inflpn,flag_clrd,flag_otherresp,flag_nephr,flag_otherunk,flag_hd,flag_stroke,flag_cov19mcod,flag_cov19ucod

Target: Weekly Death Total

Intended Use: Predicting the State of Emergency based in Weekly Death Total

Limitations: Diseases used in data set and Timeline in Data Set

Fairness Consideration: We do  not use any identifiers and very heavily influenced by the Pandemic in the timeline so it is very influenced by those totals.





Features Implemented:

The features we implemented are two forms of predicting if the weekly death total is either a health emergency or not. The two
different ways are either advanced, which asks for different fields of death statistics, or a simple one which just asks for the nuber of deaths and the state.

Issues or limitations:
Some issues is the visual of the prediction is somewhat limited to the information presented, and some of the fielda could have a dropdown of numbers.

Future enhancements planned:

Some enhancements planned are an updated layout for the visualizations on the visulization page.
