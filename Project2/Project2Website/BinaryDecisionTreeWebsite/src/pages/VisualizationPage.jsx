function VisualizationPage() {
    return (
        <div className="page-container">
            <h1>Visualization Page</h1>

            {/* Metadata Section */}
            <section className="metadata-section">
                <h2>Dataset Metadata</h2>
                <div className="metadata-grid">
                    <div className="metadata-card">
                        <strong>Total Records:</strong> 10,476 rows x 20 columns
                    </div>
                    <div className="metadata-card">
                        <strong>Date Range:</strong> 2020-01-04 to 2023-09-16 (1,351 days)
                    </div>
                    <div className="metadata-card">
                        <strong>Total All-Cause Deaths:</strong> 24,747,391 deaths
                    </div>
                    <div className="metadata-card">
                        <strong>Average Weekly Deaths:</strong> 61,361 deaths per week
                    </div>
                    <div className="metadata-card">
                        <strong>Peak Weekly Deaths:</strong> 81,851 deaths (December 2020)
                    </div>
                    <div className="metadata-card">
                        <strong>COVID-19 Deaths:</strong> 2.29M total (9.3% of all deaths)
                    </div>
                    <div className="metadata-card">
                        <strong>Feature Count:</strong> 20 total features (18 numeric, 2 categorical)
                    </div>
                    <div className="metadata-card">
                        <strong>Missing Values:</strong> 15.39% of all cells
                    </div>
                    <div className="metadata-card">
                        <strong>Years Covered:</strong> 2020, 2021, 2022, 2023 (193 unique weeks)
                    </div>
                    <div className="metadata-card">
                        <strong>Geographic Coverage:</strong> Multiple US jurisdictions
                    </div>
                    <div className="metadata-card">
                        <strong>Leading Cause of Death:</strong> Heart Disease with 5.16M deaths (20.9%)
                    </div>
                    <div className="metadata-card">
                        <strong>Natural vs Non-Natural Deaths:</strong> 91.4% natural causes
                    </div>
                    <div className="metadata-card">
                        <strong>Seasonal Mortality Pattern:</strong> Peak in winter weeks, lowest in summer
                    </div>
                    <div className="metadata-card">
                        <strong>Data Quality:</strong> 0 duplicate rows
                    </div>
                    <div className="metadata-card">
                        <strong>Weekly Death Range:</strong> 52,803 to 81,851 deaths
                    </div>
                </div>
            </section>

            {/* Visualization Section */}
            <section className="visualization-section">
                <h2>Visualization:</h2>
                <p>Mean Values: The Average Weekly Death Rate.</p>
                <img src='./src/assets/ScatterPlotofMeans.png' alt="ScatterPlot" width="800" height="500" />
                <img src='./src/assets/Top15MeanByJurisdiction.png' alt="Top 15 Mean By Jurisdiction" width="500" height="400" />
                <img src='./src/assets/10SmallestMeanValuesByJurisdictiom.png' alt="10 Smallest Means" width="500" height="400" />
            </section>

            {/* Analytics Section */}
            <section className="analytics-section">
                <h2>Analytics</h2>
                <p>Only 10 Jurisdictions in the United States have an average weekly death rate over 2,000,
                    making it so 19.6% of the Jurisdictions have an average over 2,000 weekly deaths</p>

                <ul className="analytics-list">
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
                </ul>
            </section>
        </div>
    );
}

export default VisualizationPage;