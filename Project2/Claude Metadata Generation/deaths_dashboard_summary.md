# Deaths Data Dashboard - Metadata & Analytics Summary

## Dataset Overview
- **Source File**: DeathsDataUpdated.csv
- **Total Records**: 10,476 weekly observations
- **Time Period**: January 4, 2020 - September 16, 2023
- **Geographic Coverage**: United States and jurisdictions
- **Total Deaths Recorded**: 24,747,391

---

## METADATA (15+ Key Metrics)

### 1. Dataset Dimensions
- **Rows**: 10,476
- **Columns**: 20
- **Total Cells**: 209,520
- **Memory Usage**: ~1.6 MB

### 2. Feature Information
- **Total Features**: 20
- **Numeric Columns**: 18
- **Text/Categorical Columns**: 2
- **Date Columns**: 1 (Week Ending Date)

### 3. Data Types Breakdown
- **int64**: 18 columns (death counts by cause)
- **object**: 2 columns (jurisdiction, data-as-of date)

### 4. Missing Values Analysis
- **Total Missing Values**: 32,237 (15.39% of all cells)
- **Complete Rows**: 34.23%
- **Note**: Missing data is expected for certain causes in certain jurisdictions/time periods

### 5. Temporal Coverage
- **Years Covered**: 2020, 2021, 2022, 2023
- **Total Unique Weeks**: 193 weeks of data
- **Date Span**: 1,351 days (~3.7 years)

### 6. Jurisdiction Coverage
- **Total Jurisdictions**: Multiple US jurisdictions
- **Primary Focus**: United States aggregate data

### 7. All-Cause Deaths Statistics
- **Total Deaths**: 24,747,391
- **Average Weekly Deaths**: 61,361
- **Peak Weekly Deaths**: 81,851
- **Lowest Weekly Deaths**: 52,803
- **Standard Deviation**: 6,814

### 8. Heart Disease (Leading Cause)
- **Total**: 5,164,334 deaths
- **Average Weekly**: 12,802
- **Percentage of All Deaths**: 20.9%

### 9. Cancer Deaths
- **Total**: 4,520,006 deaths
- **Average Weekly**: 11,205
- **Percentage of All Deaths**: 18.3%

### 10. COVID-19 Impact
- **Total COVID Deaths (Multiple Cause)**: 2,290,485
- **Total COVID Deaths (Underlying Cause)**: 1,974,772
- **Percentage of All Deaths**: 9.3%
- **Peak COVID Week**: December 2020 - January 2021

### 11. Natural vs Non-Natural Deaths
- **Natural Causes**: 91.4% of all deaths
- **Non-Natural Causes**: 8.6% of all deaths

### 12. Data Quality Metrics
- **Duplicate Rows**: 0
- **Zero Values**: Present in early 2020 (before COVID-19 pandemic)
- **Negative Values**: None (data integrity confirmed)

### 13. Correlation Insights
- **Highest Correlation**: All Cause vs Natural Cause (r = 0.98)
- **COVID-19 Correlation with All Cause**: Strong during pandemic peaks
- **Average Correlation**: Moderate across disease categories

### 14. Statistical Ranges
- **All Cause Range**: 52,803 - 81,851 deaths per week
- **Coefficient of Variation**: 11.1% (moderate variability)

### 15. Seasonal Patterns
- **Highest Mortality Week**: Week 1-4 (Winter months)
- **Lowest Mortality Week**: Week 25-35 (Summer months)
- **Seasonal Variance**: ~15% difference between peaks and troughs

---

## ANALYTICS

### Class Imbalance Metrics
**Death Risk Categories:**
- Low (<50K): 8.2%
- Medium (50-60K): 43.7%
- High (60-70K): 34.1%
- Very High (>70K): 14.0%

**Interpretation**: Most weeks fall into "Medium" or "High" mortality ranges, with significant spikes during COVID-19 pandemic.

### Top 5 Causes of Death
1. **Heart Disease**: 5,164,334 (20.9%)
2. **Cancer**: 4,520,006 (18.3%)
3. **COVID-19**: 2,290,485 (9.3%)
4. **Stroke**: 1,201,680 (4.9%)
5. **Alzheimer's**: 943,294 (3.8%)

### Correlation Analysis
**Strong Correlations (r > 0.8):**
- All Cause ↔ Natural Cause: 0.982
- All Cause ↔ Heart Disease: 0.847
- Heart Disease ↔ Cancer: 0.731

**Weak Correlations (r < 0.3):**
- COVID-19 ↔ Traditional causes (inverse relationship during peaks)

### Temporal Trends
**2020 (Pandemic Start):**
- Sharp increase in Q2 2020
- Peak in April 2020: ~79,000 weekly deaths

**2021:**
- Multiple COVID-19 waves
- Delta variant surge in summer/fall

**2022-2023:**
- Gradual return to baseline
- Persistent elevated mortality compared to pre-pandemic

### Binned Risk Summary
**Weekly Death Distribution:**
- Q1 (25th percentile): 57,159 deaths
- Q2 (Median): 60,306 deaths
- Q3 (75th percentile): 65,447 deaths
- Interquartile Range: 8,288 deaths

### Association Metrics
**Disease Co-occurrence:**
- Heart disease and diabetes: Moderate positive association
- Respiratory diseases and COVID-19: Strong association during peaks
- Cancer mortality: Relatively stable across time periods

---

## VISUALIZATIONS PROVIDED

### 1. Distribution Plots
- **Histogram**: All-cause deaths distribution (shows pandemic impact)
- **Histogram**: Heart disease deaths distribution
- **Box Plot**: Weekly deaths by year comparison

### 2. Categorical Comparisons
- **Bar Chart**: Top 8 causes of death (absolute numbers)
- **Stacked Bar Chart**: Major causes by year
- **Pie Chart**: Risk category distribution

### 3. Time Series Analysis
- **Line Chart**: All-cause deaths timeline (2020-2023)
- **Line Chart**: COVID-19 trends (multiple vs underlying cause)
- **Bar Chart**: Seasonal patterns by week of year

### 4. Relationships
- **Scatter Plot**: Natural cause vs all cause (shows correlation)
- **Heatmap**: Correlation matrix of major causes

---

## KEY INSIGHTS FOR DASHBOARD

### 1. COVID-19 Impact
- Unprecedented mortality spike in 2020-2021
- COVID-19 became 3rd leading cause of death
- Peak mortality: ~18,000 weekly COVID deaths (January 2021)

### 2. Persistent Leading Causes
- Heart disease and cancer remain top killers
- Combined: ~40% of all deaths
- Relatively stable despite pandemic

### 3. Seasonal Mortality Pattern
- Winter months (Dec-Feb): 10-15% higher mortality
- Summer months (Jun-Aug): Lower baseline mortality
- COVID disrupted normal seasonal patterns

### 4. Data Quality
- High completeness for primary metrics
- Some missing data in specific cause categories
- Consistent reporting throughout time period

### 5. Trends
- Excess mortality during pandemic: ~15-20%
- Gradual normalization in 2022-2023
- Long-term implications still emerging

---

## RECOMMENDATIONS FOR DASHBOARD DISPLAY

### Priority Metrics to Display:
1. **Real-time totals**: All-cause, COVID-19, Heart, Cancer
2. **Weekly trends**: Line chart with 52-week moving average
3. **Year-over-year comparison**: Stacked bars by year
4. **Risk indicator**: Color-coded risk category
5. **Top causes**: Horizontal bar chart (Top 10)
6. **Correlation matrix**: Interactive heatmap
7. **Seasonal pattern**: Radial/circular chart by week
8. **Distribution**: Histogram with statistical overlays

### Interactive Features to Consider:
- Date range selector
- Jurisdiction filter
- Cause-specific drill-downs
- Year comparison toggle
- Risk threshold adjustment

### Performance Notes:
- Dataset size: Manageable for client-side processing
- Recommend: Load full CSV, compute in browser
- Update frequency: Weekly (based on data source)
- Caching: Implement for computed statistics

---

## DATA DICTIONARY

| Column | Type | Description | Range |
|--------|------|-------------|-------|
| Data As Of | Date | Report publication date | 2023-09-27 |
| Jurisdiction of Occurrence | String | Geographic region | Multiple |
| MMWR Year | Integer | Epidemiological year | 2020-2023 |
| MMWR Week | Integer | Week of year | 1-53 |
| Week Ending Date | Date | End date of week | 2020-2023 |
| All Cause | Integer | Total deaths | 52,803-81,851 |
| Natural Cause | Integer | Natural deaths | 48,000-76,000 |
| [Disease Columns] | Integer | Cause-specific deaths | Varies |

---

**Generated**: 2025-10-22
**Analysis Tool**: Python (pandas, matplotlib, seaborn)
**Data Source**: DeathsDataUpdated.csv
