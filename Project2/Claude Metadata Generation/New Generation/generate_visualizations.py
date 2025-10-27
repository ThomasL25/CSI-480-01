import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime

# Set style for better-looking plots
sns.set_style("whitegrid")
plt.rcParams['figure.figsize'] = (14, 8)
plt.rcParams['font.size'] = 10

# Load the data
df = pd.read_csv('/mnt/user-data/uploads/DeathsDataUpdated.csv')

# Convert Week Ending Date to datetime
df['Week Ending Date'] = pd.to_datetime(df['Week Ending Date'])

# Filter for years 2020-2023
df_filtered = df[(df['MMWR Year'] >= 2020) & (df['MMWR Year'] <= 2023)].copy()

print(f"Data loaded: {len(df_filtered)} rows from 2020-2023")
print(f"Date range: {df_filtered['Week Ending Date'].min()} to {df_filtered['Week Ending Date'].max()}")

# ===== VISUALIZATION 1: Top 8 Causes of Death (2020-2023) =====
print("\nGenerating Visualization 1: Top 8 Causes of Death...")

# Define the cause columns (excluding All Cause, Natural Cause, and COVID which we'll handle separately)
cause_columns = {
    'Diseases of heart (I00-I09,I11,I13,I20-I51)': 'Heart Disease',
    'Malignant neoplasms (C00-C97)': 'Cancer',
    'COVID-19 (U071, Multiple Cause of Death)': 'COVID-19',
    'Chronic lower respiratory diseases (J40-J47)': 'Chronic Respiratory',
    'Cerebrovascular diseases (I60-I69)': 'Stroke',
    'Alzheimer disease (G30)': 'Alzheimer\'s',
    'Diabetes mellitus (E10-E14)': 'Diabetes',
    'Influenza and pneumonia (J09-J18)': 'Flu & Pneumonia',
}

# Calculate total deaths for each cause
cause_totals = {}
for col, name in cause_columns.items():
    if col in df_filtered.columns:
        cause_totals[name] = df_filtered[col].sum()

# Sort and get top 8
top_causes = sorted(cause_totals.items(), key=lambda x: x[1], reverse=True)[:8]
causes = [x[0] for x in top_causes]
deaths = [x[1] for x in top_causes]

# Create the plot
fig, ax = plt.subplots(figsize=(14, 8))
colors = sns.color_palette("husl", len(causes))
bars = ax.barh(causes, deaths, color=colors)

# Add value labels on bars
for i, (bar, death) in enumerate(zip(bars, deaths)):
    width = bar.get_width()
    ax.text(width + width*0.01, bar.get_y() + bar.get_height()/2, 
            f'{death:,.0f}',
            ha='left', va='center', fontsize=11, fontweight='bold', 
            color='black')

ax.set_xlabel('Total Deaths', fontsize=14, fontweight='bold')
ax.set_ylabel('Cause of Death', fontsize=14, fontweight='bold')
ax.set_title('Top 8 Causes of Death in the United States (2020-2023)', 
             fontsize=16, fontweight='bold', pad=20)
ax.xaxis.set_major_formatter(plt.FuncFormatter(lambda x, p: f'{int(x):,}'))
plt.tight_layout()
plt.savefig('/mnt/user-data/outputs/top_8_causes_of_death.png', dpi=300, bbox_inches='tight')
plt.close()
print("✓ Saved: top_8_causes_of_death.png")

# ===== VISUALIZATION 2: Total Deaths Over Time =====
print("\nGenerating Visualization 2: Total Deaths Over Time...")

# Aggregate by month for cleaner visualization
df_filtered['Year-Month'] = df_filtered['Week Ending Date'].dt.to_period('M')
monthly_deaths = df_filtered.groupby('Year-Month')['All Cause'].sum().reset_index()
monthly_deaths['Year-Month'] = monthly_deaths['Year-Month'].dt.to_timestamp()

# Create the plot
fig, ax = plt.subplots(figsize=(16, 8))
colors_timeline = []
for date in monthly_deaths['Year-Month']:
    year = date.year
    if year == 2020:
        colors_timeline.append('#A8DADC')  # Light blue
    elif year == 2021:
        colors_timeline.append('#457B9D')  # Medium blue
    elif year == 2022:
        colors_timeline.append('#1D3557')  # Dark blue
    else:  # 2023
        colors_timeline.append('#0D1B2A')  # Darkest blue

bars = ax.bar(monthly_deaths['Year-Month'], monthly_deaths['All Cause'], 
              width=25, color=colors_timeline, edgecolor='black', linewidth=0.5)

ax.set_xlabel('Month', fontsize=14, fontweight='bold')
ax.set_ylabel('Total Deaths', fontsize=14, fontweight='bold')
ax.set_title('Total Deaths Over Time by Month (2020-2023)', 
             fontsize=16, fontweight='bold', pad=20)
ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, p: f'{int(x/1000)}K'))

# Format x-axis to show dates nicely
import matplotlib.dates as mdates
ax.xaxis.set_major_formatter(mdates.DateFormatter('%b\n%Y'))
ax.xaxis.set_major_locator(mdates.MonthLocator(interval=3))

# Add legend for years with blue shades
from matplotlib.patches import Patch
legend_elements = [
    Patch(facecolor='#A8DADC', label='2020'),
    Patch(facecolor='#457B9D', label='2021'),
    Patch(facecolor='#1D3557', label='2022'),
    Patch(facecolor='#0D1B2A', label='2023')
]
ax.legend(handles=legend_elements, loc='upper right', fontsize=12)

plt.xticks(rotation=0, ha='center')
plt.grid(axis='y', alpha=0.3)
plt.tight_layout()
plt.savefig('/mnt/user-data/outputs/total_deaths_over_time.png', dpi=300, bbox_inches='tight')
plt.close()
print("✓ Saved: total_deaths_over_time.png")

# ===== VISUALIZATION 3: COVID-19 Deaths Over Time =====
print("\nGenerating Visualization 3: COVID-19 Deaths Over Time...")

# Use weekly data for COVID to show more detail
covid_col = 'COVID-19 (U071, Multiple Cause of Death)'
df_covid = df_filtered[['Week Ending Date', covid_col]].copy()
df_covid = df_covid.sort_values('Week Ending Date')

# Create the plot
fig, ax = plt.subplots(figsize=(16, 8))

# Create a line plot with filled area
ax.fill_between(df_covid['Week Ending Date'], df_covid[covid_col], 
                alpha=0.3, color='#E63946')
ax.plot(df_covid['Week Ending Date'], df_covid[covid_col], 
        linewidth=2.5, color='#E63946', label='COVID-19 Deaths')

ax.set_xlabel('Date', fontsize=14, fontweight='bold')
ax.set_ylabel('Weekly COVID-19 Deaths', fontsize=14, fontweight='bold')
ax.set_title('COVID-19 Deaths Over Time (2020-2023)', 
             fontsize=16, fontweight='bold', pad=20)
ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, p: f'{int(x):,}'))

# Format x-axis
ax.xaxis.set_major_formatter(mdates.DateFormatter('%b %Y'))
ax.xaxis.set_major_locator(mdates.MonthLocator(interval=3))
plt.xticks(rotation=45, ha='right')

# Add grid
plt.grid(axis='both', alpha=0.3)

# Highlight major peaks
max_covid = df_covid[covid_col].max()
max_date = df_covid[df_covid[covid_col] == max_covid]['Week Ending Date'].values[0]
max_date_formatted = pd.to_datetime(max_date)

ax.annotate(f'Peak: {int(max_covid):,} deaths\n{max_date_formatted.strftime("%b %d, %Y")}',
            xy=(max_date_formatted, max_covid),
            xytext=(max_date_formatted, max_covid + 5000),
            fontsize=11, fontweight='bold',
            bbox=dict(boxstyle='round,pad=0.5', facecolor='yellow', alpha=0.7),
            arrowprops=dict(arrowstyle='->', connectionstyle='arc3,rad=0', lw=2))

plt.tight_layout()
plt.savefig('/mnt/user-data/outputs/covid_deaths_over_time.png', dpi=300, bbox_inches='tight')
plt.close()
print("✓ Saved: covid_deaths_over_time.png")

print("\n" + "="*60)
print("All visualizations generated successfully!")
print("="*60)
print("\nSummary Statistics:")
print(f"Total deaths (2020-2023): {df_filtered['All Cause'].sum():,}")
print(f"Total COVID-19 deaths: {df_filtered[covid_col].sum():,}")
print(f"Peak COVID-19 deaths (weekly): {max_covid:,} on {max_date_formatted.strftime('%B %d, %Y')}")
print(f"\nFiles saved to: /mnt/user-data/outputs/")
