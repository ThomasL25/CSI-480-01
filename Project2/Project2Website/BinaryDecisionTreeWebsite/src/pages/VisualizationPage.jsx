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
                <h3>Mean Values: The Average Weekly Death Rate.</h3>
                <img src='./src/assets/ScatterPlotofMeans.png' alt="ScatterPlot" width="800" height="500" />
                <h3>15 States with Highest Mean Values of Death.</h3>
                <img src='./src/assets/Top15MeanByJurisdiction.png' alt="Top 15 Mean By Jurisdiction" width="500" height="400" />
                <h3>10 States with Smallest Mean Values of Death.</h3>
                <img src='./src/assets/10SmallestMeanValuesByJurisdictiom.png' alt="10 Smallest Means" width="500" height="400" />
                <h3>Top Causes of Death.</h3>
                <img src='./src/assets/top_8_causes_of_death.png' alt="Top 8 Causes of Death" width="500" height="400" />
                <h3>Total Deaths over Time.</h3>
                <img src='./src/assets/total_deaths_over_time.png' alt="Total Deaths over Time" width="500" height="400" />
                <h3>Covid Deaths over Time.</h3>
                <img src='./src/assets/covid_deaths_over_time.png' alt="Covid Deaths over Time" width="500" height="400" />
            </section>

            {/* Analytics Section */}
            <section className="analytics-section">
                <h2>Analytics</h2>
                <div className="analytics-grid">
                    <div className="analytics-card">
                        <strong>COVID-19 Peak</strong> 18,578 deaths in a single week (December 2020)
                    </div>
                    <div className="analytics-card">
                        <strong>Excess Mortality During Pandemic</strong> ~15-20% above baseline
                    </div>
                    <div className="analytics-card">
                        <strong>Top 5 Causes of Death</strong> Heart Disease (20.9%), Cancer (18.3%), COVID-19 (9.3%), Stroke (4.9%), Alzheimer's (3.8%)
                    </div>
                    <div className="analytics-card">
                        <strong>Natural Cause Death</strong> 22.6M out of 24.7M total
                    </div>
                    <div className="analytics-card">
                        <strong>COVID-19 Weeks Active</strong> 193 weeks with at least 1 COVID death
                    </div>
                    <div className="analytics-card">
                        <strong>Average Deaths By Year</strong> 2020 (varying), 2021 (elevated), 2022-2023 (normalizing)
                    </div>
                    <div className="analytics-card">
                        <strong>Winter vs Summer Mortality</strong> ~15% higher deaths in winter months
                    </div>
                    <div className="analytics-card">
                        <strong>Heart Disease Average</strong> 12,802 deaths per week 
                    </div>
                    <div className="analytics-card">
                        <strong>Cancer Average</strong> 11,205 deaths per week
                    </div>
                    <div className="analytics-card">
                        <strong>Risk Categories</strong> 43.7% weeks classified as "Medium Risk" (50-60K deaths)
                    </div>
                    <div className="analytics-card">
                        <strong>COVID as Underlying Cause</strong> 1.97M deaths (86% of multiple cause total)
                    </div>
                    <div className="analytics-card">
                        <strong>Respiratory Deaths</strong> Increased correlation with COVID-19 during peeks
                    </div>
                    <div className="analytics-card">
                        <strong>Diabetes Deaths</strong> 1.8M total across the period
                    </div>
                    <div className="analytics-card">
                        <strong>Stroke Deaths</strong> Relatively stable at ~3,000 per week average
                    </div>
                    <div className="analytics-card">
                        <strong>Jurisdictions Over 2,000 Average Weekly Deaths</strong> Only 19 Jurisdiction around 19.6%
                    </div>
                </div>
            </section>
        </div>
    );
}

export default VisualizationPage;
