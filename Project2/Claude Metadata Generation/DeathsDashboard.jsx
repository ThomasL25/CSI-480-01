import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const DeathsDashboard = () => {
  const [data, setData] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load and parse CSV
    fetch('/DeathsDataUpdated.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            setData(results.data);
            computeMetadata(results.data);
            setLoading(false);
          }
        });
      });
  }, []);

  const computeMetadata = (rawData) => {
    const validData = rawData.filter(row => row['All Cause']); // Filter valid rows
    
    const meta = {
      // 1. Dataset Size
      totalRows: validData.length,
      totalColumns: Object.keys(validData[0] || {}).length,
      
      // 2. Date Range
      dateRange: {
        start: validData[0]?.['Week Ending Date'],
        end: validData[validData.length - 1]?.['Week Ending Date']
      },
      
      // 3. All Cause Statistics
      allCauseStats: {
        total: validData.reduce((sum, row) => sum + (row['All Cause'] || 0), 0),
        mean: validData.reduce((sum, row) => sum + (row['All Cause'] || 0), 0) / validData.length,
        max: Math.max(...validData.map(row => row['All Cause'] || 0)),
        min: Math.min(...validData.map(row => row['All Cause'] || 0))
      },
      
      // 4. COVID-19 Statistics
      covidStats: {
        total: validData.reduce((sum, row) => sum + (row['COVID-19 (U071, Multiple Cause of Death)'] || 0), 0),
        peak: Math.max(...validData.map(row => row['COVID-19 (U071, Multiple Cause of Death)'] || 0))
      },
      
      // 5. Top Causes
      topCauses: [
        {
          name: 'Heart Disease',
          total: validData.reduce((sum, row) => sum + (row['Diseases of heart (I00-I09,I11,I13,I20-I51)'] || 0), 0)
        },
        {
          name: 'Cancer',
          total: validData.reduce((sum, row) => sum + (row['Malignant neoplasms (C00-C97)'] || 0), 0)
        },
        {
          name: 'COVID-19',
          total: validData.reduce((sum, row) => sum + (row['COVID-19 (U071, Multiple Cause of Death)'] || 0), 0)
        },
        {
          name: 'Stroke',
          total: validData.reduce((sum, row) => sum + (row['Cerebrovascular diseases (I60-I69)'] || 0), 0)
        },
        {
          name: 'Alzheimer\'s',
          total: validData.reduce((sum, row) => sum + (row['Alzheimer disease (G30)'] || 0), 0)
        }
      ].sort((a, b) => b.total - a.total),
      
      // 6. Missing Values
      missingValues: calculateMissingValues(validData),
      
      // 7. Years Covered
      yearsCovered: [...new Set(validData.map(row => row['MMWR Year']))].sort(),
      
      // 8. Risk Categories
      riskCategories: categorizeRisk(validData),
      
      // 9. Natural vs Non-Natural
      naturalVsNonNatural: {
        natural: validData.reduce((sum, row) => sum + (row['Natural Cause'] || 0), 0),
        total: validData.reduce((sum, row) => sum + (row['All Cause'] || 0), 0)
      },
      
      // 10. Jurisdictions
      jurisdictions: [...new Set(validData.map(row => row['Jurisdiction of Occurrence']))].length
    };
    
    setMetadata(meta);
  };

  const calculateMissingValues = (data) => {
    let totalCells = 0;
    let missingCells = 0;
    
    data.forEach(row => {
      Object.values(row).forEach(value => {
        totalCells++;
        if (value === null || value === undefined || value === '') {
          missingCells++;
        }
      });
    });
    
    return {
      count: missingCells,
      percentage: ((missingCells / totalCells) * 100).toFixed(2)
    };
  };

  const categorizeRisk = (data) => {
    const categories = { Low: 0, Medium: 0, High: 0, VeryHigh: 0 };
    
    data.forEach(row => {
      const deaths = row['All Cause'] || 0;
      if (deaths < 50000) categories.Low++;
      else if (deaths < 60000) categories.Medium++;
      else if (deaths < 70000) categories.High++;
      else categories.VeryHigh++;
    });
    
    return categories;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="text-xl">Loading dashboard data...</div>
    </div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Deaths Data Dashboard (2020-2023)
      </h1>
      
      {/* Metadata Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* Card 1: Dataset Size */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">DATASET SIZE</h3>
          <p className="text-3xl font-bold text-blue-600">{metadata.totalRows.toLocaleString()}</p>
          <p className="text-sm text-gray-600 mt-1">Total Records</p>
          <p className="text-xs text-gray-500 mt-2">{metadata.totalColumns} features</p>
        </div>
        
        {/* Card 2: Total Deaths */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">TOTAL DEATHS</h3>
          <p className="text-3xl font-bold text-red-600">
            {(metadata.allCauseStats.total / 1000000).toFixed(1)}M
          </p>
          <p className="text-sm text-gray-600 mt-1">All Causes</p>
          <p className="text-xs text-gray-500 mt-2">
            Avg: {metadata.allCauseStats.mean.toLocaleString('en-US', {maximumFractionDigits: 0})} per week
          </p>
        </div>
        
        {/* Card 3: Date Range */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">TIME PERIOD</h3>
          <p className="text-lg font-bold text-green-600">{metadata.dateRange.start}</p>
          <p className="text-sm text-gray-600">to</p>
          <p className="text-lg font-bold text-green-600">{metadata.dateRange.end}</p>
        </div>
        
        {/* Card 4: COVID-19 Impact */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">COVID-19 DEATHS</h3>
          <p className="text-3xl font-bold text-purple-600">
            {(metadata.covidStats.total / 1000000).toFixed(2)}M
          </p>
          <p className="text-sm text-gray-600 mt-1">Total</p>
          <p className="text-xs text-gray-500 mt-2">
            Peak: {metadata.covidStats.peak.toLocaleString()} per week
          </p>
        </div>
      </div>

      {/* Top Causes Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Top 5 Causes of Death</h2>
        <div className="space-y-3">
          {metadata.topCauses.map((cause, index) => {
            const percentage = (cause.total / metadata.allCauseStats.total * 100).toFixed(1);
            return (
              <div key={index} className="flex items-center">
                <span className="text-2xl font-bold text-gray-400 w-8">{index + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-gray-700">{cause.name}</span>
                    <span className="text-gray-600">
                      {(cause.total / 1000000).toFixed(2)}M ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{width: `${percentage}%`}}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        
        {/* Data Quality */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-3 text-gray-800">Data Quality</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Missing Values:</span>
              <span className="font-semibold">{metadata.missingValues.percentage}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Complete Rows:</span>
              <span className="font-semibold">
                {(100 - metadata.missingValues.percentage).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Jurisdictions:</span>
              <span className="font-semibold">{metadata.jurisdictions}</span>
            </div>
          </div>
        </div>

        {/* Risk Categories */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-3 text-gray-800">Weekly Death Risk</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-green-600">● Low (&lt;50K):</span>
              <span className="font-semibold">{metadata.riskCategories.Low}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-yellow-600">● Medium (50-60K):</span>
              <span className="font-semibold">{metadata.riskCategories.Medium}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-orange-600">● High (60-70K):</span>
              <span className="font-semibold">{metadata.riskCategories.High}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-red-600">● Very High (&gt;70K):</span>
              <span className="font-semibold">{metadata.riskCategories.VeryHigh}</span>
            </div>
          </div>
        </div>

        {/* Natural vs Non-Natural */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-3 text-gray-800">Death Classification</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Natural Causes:</span>
                <span className="font-semibold">
                  {((metadata.naturalVsNonNatural.natural / metadata.naturalVsNonNatural.total) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{width: `${(metadata.naturalVsNonNatural.natural / metadata.naturalVsNonNatural.total) * 100}%`}}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Non-Natural:</span>
                <span className="font-semibold">
                  {(((metadata.naturalVsNonNatural.total - metadata.naturalVsNonNatural.natural) / metadata.naturalVsNonNatural.total) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-600 h-2 rounded-full" 
                  style={{width: `${((metadata.naturalVsNonNatural.total - metadata.naturalVsNonNatural.natural) / metadata.naturalVsNonNatural.total) * 100}%`}}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Years Covered */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-3 text-gray-800">Temporal Coverage</h3>
        <div className="flex space-x-4">
          {metadata.yearsCovered.map(year => (
            <div key={year} className="bg-blue-100 px-4 py-2 rounded-lg">
              <span className="font-bold text-blue-800">{year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeathsDashboard;
