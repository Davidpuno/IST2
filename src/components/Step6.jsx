import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faTrophy, faUserTie, faUsers, faChartLine, faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Step6 = ({ formData, results, next, prev, reset, formatCurrency, formatNumber, setShowModal }) => {
  const chartData = [
    { name: 'Direct Commission', value: results.commissionEarnings, color: '#003366' },
    { name: 'Override Earnings', value: results.overrideEarnings, color: '#FF9900' }
  ].filter(item => item.value > 0);

  const totalChartValue = chartData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].name}</p>
          <p className="value">{formatCurrency(payload[0].value)}</p>
          <p className="percent">{((payload[0].value / totalChartValue) * 100).toFixed(1)}% of total</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="question-page">
      <div className="question-header">
        <div className="question-number">Step 6 of 9</div>
        <h2 className="question-title">Your Business Results</h2>
        <p className="question-description">
          Based on your inputs, here's your projected business performance
        </p>
      </div>

      <div className="question-content">
        <div className="results-section">
          {/* Summary Card */}
          <div className="summary-card">
            <div className="summary-header">
              <FontAwesomeIcon icon={faTrophy} />
              <h3>Annual Income Summary</h3>
            </div>
            <div className="summary-total">{formatCurrency(results.totalIncome)}</div>
            <div className="summary-subtitle">
              Based on {formData.businessType} with {formData.license} License
            </div>
          </div>

          {/* Income Breakdown */}
          <div className="income-breakdown">
            <h4>Income Breakdown</h4>
            <div className="breakdown-grid">
              <div className="breakdown-card">
                <div className="breakdown-header">
                  <FontAwesomeIcon icon={faUserTie} />
                  <h5>Direct Commission</h5>
                </div>
                <div className="breakdown-value">{formatCurrency(results.commissionEarnings)}</div>
                <div className="breakdown-details">
                  <div className="detail">
                    <span>Rate:</span>
                    <span>{formData.commissionRate}%</span>
                  </div>
                  <div className="detail">
                    <span>Required ANP:</span>
                    <span>{formatCurrency(results.requiredANP)}</span>
                  </div>
                </div>
              </div>

              {formData.license === "L" && formData.isRecruitingAgent && (
                <div className="breakdown-card">
                  <div className="breakdown-header">
                    <FontAwesomeIcon icon={faUsers} />
                    <h5>Team Overrides</h5>
                  </div>
                  <div className="breakdown-value">{formatCurrency(results.overrideEarnings)}</div>
                  <div className="breakdown-details">
                    <div className="detail">
                      <span>Recruits:</span>
                      <span>{formData.numberOfRecruits}</span>
                    </div>
                    <div className="detail">
                      <span>Override Rate:</span>
                      <span>{formData.overrideRate}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="performance-metrics">
            <h4>Performance Metrics</h4>
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-icon">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </div>
                <div className="metric-content">
                  <div className="metric-label">Annual Clients</div>
                  <div className="metric-value">{formatNumber(results.clientsPerYear)}</div>
                  <div className="metric-sub">
                    {formData.clientsPerWeek} per week
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div className="metric-content">
                  <div className="metric-label">Hours per Client</div>
                  <div className="metric-value">{results.hoursPerClient.toFixed(1)}</div>
                  <div className="metric-sub">
                    Efficiency ratio
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">
                  <FontAwesomeIcon icon={faChartLine} />
                </div>
                <div className="metric-content">
                  <div className="metric-label">Average Premium</div>
                  <div className="metric-value">
                    {formatCurrency(results.requiredANP / results.clientsPerYear)}
                  </div>
                  <div className="metric-sub">
                    Per client needed
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Income Distribution Chart */}
          <div className="chart-section">
            <h4>Income Distribution</h4>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="chart-center">
                <div className="chart-total">{formatCurrency(totalChartValue)}</div>
                <div className="chart-label">Total Income</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="action-btn download" onClick={() => setShowModal(true)}>
              <span>📥</span> Download Report
            </button>
            <button className="action-btn reset" onClick={reset}>
              <span>🔄</span> Start Over
            </button>
          </div>
        </div>
      </div>

      <div className="question-footer">
        <button className="btn-back" onClick={prev}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <button className="btn-next" onClick={next}>
          Next: License Breakdown <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default Step6;