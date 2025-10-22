function JustinPage() {
    return (
        <div className="page-container">
            <h1>Justin's Page is for my visualations and analytics</h1>
            <h2>Visualization:</h2>
            <p>Mean Values: The Average Weekly Death Rate.</p>
            <img src='./src/assets/ScatterPlotofMeans.png' alt="ScatterPlot"/>
            <img src='./src/assets/Top15MeanByJurisdiction.png' alt="Top 15 Mean By Jurisdicition"/>
            <img src='./src/assets/10SmallestMeanValuesByJurisdictiom.png' alt="10 Smallest Means"/>
            <h2>Analytics</h2>
        </div>
    );
}

export default JustinPage;
