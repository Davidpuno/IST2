// components/Step6.jsx - Updated for flowchart
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faUsers, faTrophy, faDownload, faRedo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const Step6 = ({ formData, results, formatCurrency, reset }) => {
  if (!results) return <div>Loading results...</div>;

  // Prepare data for the donut chart
  const chartData = Object.entries(results.breakdown || {}).map(([license, amount]) => ({
    name: `License ${license}`,
    value: amount,
    color: getLicenseColor(license)
  }));

  function getLicenseColor(license) {
    const colors = {
      'AZ': '#003266',  // Dark blue
      'NL': '#0055aa',  // Medium blue
      'GL': '#0077cc',  // Light blue
    };
    return colors[license] || '#003266';
  }

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{payload[0].name}</p>
          <p className="tooltip-value">{formatCurrency(payload[0].value)}</p>
          <p className="tooltip-percentage">
            {((payload[0].value / results.totalIncome) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const breakdownData = Object.entries(results?.breakdown || {}).map(([license, amount]) => ({
    license,
    amount,
    percentage: formData.effortAllocation[license] || 0,
    effort: formData.effortAllocation[license] || 0
  }));

  return (
    <div className="step-card">
      <div className="question-header">
        <div className="question-number">Results</div>
        <h1>Income Projection</h1>
        <p className="question-description">
          {results.personalIncomeOnly 
            ? "Personal income only (recruiting agent mode)" 
            : "Breakdown per license based on effort allocation"}
        </p>
      </div>

      <div className="results-section">
        {/* Summary Card */}
        <div className="summary-card">
          <div className="summary-header">
            <FontAwesomeIcon icon={faTrophy} />
            <h3>Total Projected Income</h3>
          </div>
          <div className="summary-total">{formatCurrency(results?.totalIncome || 0)}</div>
          <div className="summary-subtitle">
            {results.personalIncomeOnly 
              ? "Personal income calculation (recruiting agent)" 
              : "Based on license selection and effort allocation"}
          </div>
        </div>

        {/* Flowchart Information Banner */}
        {results.personalIncomeOnly && (
          <div className="flowchart-banner">
            <FontAwesomeIcon icon={faInfoCircle} />
            <div>
              <strong>Flowchart Mode: Personal Income Only</strong>
              <p>According to the flowchart, when "Team Building = Yes", data is sent to backend as "Personal income only".</p>
            </div>
          </div>
        )}

        {/* Donut Chart Section */}
        <div className="chart-section">
          <h3 className="chart-title">Income Distribution</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={2}
                  dataKey="value"
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value, entry) => (
                    <span className="legend-text">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Chart center info */}
            <div className="chart-center-info">
              <div className="chart-center-total">{formatCurrency(results.totalIncome)}</div>
              <div className="chart-center-label">
                {results.personalIncomeOnly ? "Personal Income" : "Total Annual"}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="detailed-breakdown">
          <h3>Breakdown per License</h3>
          <div className="breakdown-grid">
            {breakdownData.map(item => (
              <div key={item.license} className="breakdown-card">
                <div className="breakdown-header">
                  <FontAwesomeIcon icon={faUserTie} />
                  <h4>License {item.license}</h4>
                </div>
                <div className="breakdown-value">{formatCurrency(item.amount)}</div>
                <div className="breakdown-details">
                  <div className="detail-item">
                    <span>Effort Allocation:</span>
                    <span>{item.effort}%</span>
                  </div>
                  <div className="detail-item">
                    <span>Share of Income:</span>
                    <span>{((item.amount / results.totalIncome) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="detail-item">
                    <span>Calculation:</span>
                    <span>₱{parseInt(formData.desiredIncome.replace(/,/g, '') || 0).toLocaleString()} × {item.effort}%</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Flowchart Mode Indicator */}
            {results.personalIncomeOnly && (
              <div className="breakdown-card mode-card">
                <div className="breakdown-header">
                  <FontAwesomeIcon icon={faUsers} />
                  <h4>Flowchart Mode</h4>
                </div>
                <div className="breakdown-details">
                  <div className="detail-item">
                    <span>Team Building:</span>
                    <span>Yes</span>
                  </div>
                  <div className="detail-item">
                    <span>Calculation Type:</span>
                    <span>Personal Income Only</span>
                  </div>
                  <div className="detail-item">
                    <span>Backend Data:</span>
                    <span>Sent as "Personal income only"</span>
                  </div>
                </div>
                <p className="mode-note">
                  According to the flowchart, when you select "Yes" for team building, 
                  the data is sent to the backend marked as "Personal income only".
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="action-btn recalculate" onClick={reset}>
            <FontAwesomeIcon icon={faRedo} /> Start Over
          </button>
          <button className="action-btn download" onClick={() => console.log('Download report')}>
            <FontAwesomeIcon icon={faDownload} /> Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step6;