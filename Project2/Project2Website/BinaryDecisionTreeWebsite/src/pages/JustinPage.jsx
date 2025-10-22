function JustinPage() {
    return (
        <div className="page-container">
            <h1>Visualizationn Page </h1>
            <h2>Visualization:</h2>
            <p>Mean Values: The Average Weekly Death Rate.</p>
            <img src='./src/assets/ScatterPlotofMeans.png' alt="ScatterPlot" width="800" height="500"/>
            <img src='./src/assets/Top15MeanByJurisdiction.png' alt="Top 15 Mean By Jurisdicition" width="500" height="400"/>
            <img src='./src/assets/10SmallestMeanValuesByJurisdictiom.png' alt="10 Smallest Means" width="500" height="400"/>
            <h2>Analytics:</h2>
            <p>Only 10 Jurisdictions in the United States have am average weekly death rate pver 2,000
                making it so 19.6% of the Jurisdictions have an average over 2,000 weekly deaths</p>
            <h2>Analytics</h2>
            <li>COVID-19 Peak: 18,578 deaths in a single week (December 2020)</li>
            <li>Excess Mortality During Pandemic: ~15-20% above baseline</li>
            <li>Top 5 Causes: Heart Disease (20.9%), Cancer (18.3%), COVID-19 (9.3%), Stroke (4.9%), Alzheimer's (3.8%)</li>
            <li>Natural Cause Deaths: 22.6M out of 24.7M total</li>
            <li>COVID-19 Weeks Active: 193 weeks with at least 1 COVID death</li>
            <li>Highest Correlation: All Cause vs Natural Cause (r = 0.98)</li>
            <li>Average Deaths by Year: 2020 (varying), 2021 (elevated), 2022-2023 (normalizing)</li>
            <li>Winter vs Summer Mortality: ~15% higher deaths in winter months</li>
            <li>Heart Disease Average: 12,802 deaths per week</li>
            <li>Cancer Average: 11,205 deaths per week</li>
            <li>Risk Categories: 43.7% weeks classified as "Medium Risk" (50-60K deaths)</li>
            <li>COVID as Underlying Cause: 1.97M deaths (86% of multiple cause total)</li>
            <li>Respiratory Deaths: Increased correlation with COVID-19 during peaks</li>
            <li>Diabetes Deaths: 1.8M total across the period</li>
            <li>Stroke Deaths: Relatively stable at ~3,000 per week average</li>
            <h2>Metadata</h2>
            <li>Total Records: 10,476 rows x 20 columns</li>
            <li>Date Range: 2020-01-04 to 2023-09-16 (1,351 days)</li>
            <li>Total All-Cause Deaths: 24,747,391 deaths</li>
            <li>Average Weekly Deaths: 61,361 deaths per week</li>
            <li>Peak Weekly Deaths: 81,851 deaths (December 2020)</li>
            <li>COVID-19 Deaths: 2.29M total (9.3% of all deaths)</li>
            <li>Feature Count: 20 total features (18 numeric, 2 categorical)</li>
            <li>Missing Values: 15.39% of all cells</li>
            <li>Years Covered: 2020, 2021, 2022, 2023 (193 unique weeks)</li>
            <li>Geographic Coverage: Multiple US jurisdictions</li>
            <li>Leading Cause of Death: Heart Disease with 5.16M deaths (20.9%)</li>
            <li>Natural vs Non-Natural Deaths: 91.4% natural causes</li>
            <li>Seasonal Mortality Pattern: Peak in winter weeks, lowest in summer</li>
            <li>Data Quality: 0 duplicate rows (perfect integrity)</li>
            <li>Weekly Death Range: 52,803 to 81,851 deaths</li>
        </div>
    );
}

export default JustinPage;
