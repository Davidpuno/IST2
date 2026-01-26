import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faChartBar, faMoneyBillWave, faUsers, faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Step7 = ({ formData, licenseBreakdown, next, prev, formatCurrency, formatNumber }) => {
  // Custom Tooltip for Bar Chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="label">{data.name}</p>
          <p className="value">{formatCurrency(data.earnings)}</p>
          <p className="detail">Required ANP: {formatCurrency(data.requiredANP)}</p>
          <p className="detail">Clients Needed: {formatNumber(data.clientsNeeded)}</p>
        </div>
      );
    }
    return null;
  };

  // Prepare data for bar chart
  const chartData = licenseBreakdown.map(license => ({
    name: license.type,
    earnings: license.earnings,
    requiredANP: license.requiredANP,
    clientsNeeded: license.clientsNeeded,
    color: license.color
  }));

  // Find current license
  const currentLicense = licenseBreakdown.find(l => l.type === formData.license);

  return (
    <div className="question-page">
      <div className="question-header">
        <div className="question-number">Step 7 of 9</div>
        <h2 className="question-title">License Breakdown Comparison</h2>
        <p className="question-description">
          Compare income potential across different license types
        </p>
      </div>

      <div className="question-content">
        <div className="breakdown-section">
          {/* Bar Chart Visualization */}
          <div className="chart-container-large">
            <h4>
              <FontAwesomeIcon icon={faChartBar} />
              <span>Income Comparison by License</span>
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#666' }}
                  axisLine={{ stroke: '#ddd' }}
                />
                <YAxis 
                  tickFormatter={(value) => `$${value/1000}k`}
                  tick={{ fill: '#666' }}
                  axisLine={{ stroke: '#ddd' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="earnings" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke={entry.name === formData.license ? "#000" : "none"}
                      strokeWidth={entry.name === formData.license ? 2 : 0}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* License Details Grid */}
          <div className="license-details-grid">
            <h4>
              <FontAwesomeIcon icon={faUserGraduate} />
              <span>License Details</span>
            </h4>
            
            <div className="details-table">
              <div className="table-header">
                <div className="table-cell">License</div>
                <div className="table-cell">Income</div>
                <div className="table-cell">ANP Required</div>
                <div className="table-cell">Clients Needed</div>
                <div className="table-cell">Advantage</div>
              </div>

              {licenseBreakdown.map((license) => (
                <div 
                  key={license.type}
                  className={`table-row ${license.type === formData.license ? "current" : ""}`}
                  style={{ borderLeftColor: license.color }}
                >
                  <div className="table-cell license-name">
                    <div 
                      className="license-badge"
                      style={{ backgroundColor: license.color }}
                    >
                      {license.type}
                    </div>
                    <div className="license-fullname">{license.name}</div>
                  </div>
                  <div className="table-cell">
                    <div className="value-primary">{formatCurrency(license.earnings)}</div>
                    <div className="value-secondary">
                      {license.type === "GL" ? "Base" : 
                       license.type === "AL" ? "+30%" : "+50%"}
                    </div>
                  </div>
                  <div className="table-cell">
                    <div className="value-primary">{formatCurrency(license.requiredANP)}</div>
                    <div className="value-secondary">
                      Annual Premium
                    </div>
                  </div>
                  <div className="table-cell">
                    <div className="value-primary">{formatNumber(license.clientsNeeded)}</div>
                    <div className="value-secondary">
                      @ $50k avg
                    </div>
                  </div>
                  <div className="table-cell">
// Update the advantage column
                     <div className="advantage">
                        {license.type === "GL" && "International Markets"}
                        {license.type === "AL" && "Advanced Products"}
                        {license.type === "L" && "Team Building + Overrides"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current License Summary */}
          {currentLicense && (
            <div className="current-license-summary">
              <h4>
                <FontAwesomeIcon icon={faMoneyBillWave} />
                <span>Your Selected License: {currentLicense.name}</span>
              </h4>
              
              <div className="summary-cards">
                <div className="summary-card">
                  <div className="summary-icon" style={{ color: currentLicense.color }}>
                    <FontAwesomeIcon icon={faMoneyBillWave} />
                  </div>
                  <div className="summary-content">
                    <div className="summary-label">Projected Income</div>
                    <div className="summary-value">{formatCurrency(currentLicense.earnings)}</div>
                    <div className="summary-detail">
                      {currentLicense.type === "GL" ? "Standard rates apply" :
                       currentLicense.type === "AL" ? "30% premium on commissions" :
                       "50% premium + override potential"}
                    </div>
                  </div>
                </div>

                <div className="summary-card">
                  <div className="summary-icon" style={{ color: currentLicense.color }}>
                    <FontAwesomeIcon icon={faUsers} />
                  </div>
                  <div className="summary-content">
                    <div className="summary-label">Business Requirements</div>
                    <div className="summary-value">{formatNumber(currentLicense.clientsNeeded)} clients</div>
                    <div className="summary-detail">
                      {currentLicense.clientsNeeded} clients at ${formatNumber(50000)} average premium
                    </div>
                  </div>
                </div>
              </div>

              <div className="license-advice">
                <h5>Recommendation:</h5>
                <p>
                  {currentLicense.type === "GL" && 
                    "Focus on building your client base and mastering sales skills. Consider upgrading to AL license after 1-2 years of consistent performance."}
                  
                  {currentLicense.type === "AL" && 
                    "Leverage your higher commission rates to maximize income. Consider niche specialization or upselling strategies."}
                  
                  {currentLicense.type === "L" && 
                    "Combine direct sales with team building. Your income potential scales with both personal production and team overrides."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="question-footer">
        <button className="btn-back" onClick={prev}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <button className="btn-next" onClick={next}>
          Next: Business Scenarios <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default Step7;