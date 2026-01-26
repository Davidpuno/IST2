import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faUsers, faTrophy, faDownload, faRedo } from "@fortawesome/free-solid-svg-icons";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const ResultsStep = ({ formData, results, formatCurrency, reset, setShowModal }) => {
  const chartData = [
    { name: 'Direct Commission', value: results.commissionEarnings, color: '#003266' },
    { name: 'Override Earnings', value: results.overrideEarnings, color: '#f4b43c' }
  ];

  return (
    <div className="question-page">
      <div className="question-header">
        <div className="question-number">Results</div>
        <h2 className="question-title">Your Income Projection</h2>
        <p className="question-description">
          Based on your inputs, here's your projected earnings breakdown
        </p>
      </div>

      <div className="question-content">
        <div className="results-section">
          <div className="summary-card">
            <div className="summary-header">
              <FontAwesomeIcon icon={faTrophy} />
              <h3>Total Annual Income</h3>
            </div>
            <div className="summary-total">{formatCurrency(results.totalIncome)}</div>
            <div className="summary-subtitle">Based on your {formData.license} License and {formData.role} role</div>
          </div>

          <div className="income-breakdown">
            <div className="breakdown-card">
              <div className="breakdown-header">
                <FontAwesomeIcon icon={faUserTie} />
                <h4>Direct Commission</h4>
              </div>
              <div className="breakdown-value">{formatCurrency(results.commissionEarnings)}</div>
              <div className="breakdown-details">
                <div className="detail-item">
                  <span>Commission Rate:</span>
                  <span>{formData.commissionRate}%</span>
                </div>
                <div className="detail-item">
                  <span>Required ANP:</span>
                  <span>{formatCurrency(results.requiredANP)}</span>
                </div>
                <div className="detail-item">
                  <span>Clients Needed:</span>
                  <span>{Math.ceil(results.totalClientsPerYear / 52)}/week</span>
                </div>
              </div>
            </div>

            {formData.license === "L" && formData.isRecruitingAgent && (
              <div className="breakdown-card">
                <div className="breakdown-header">
                  <FontAwesomeIcon icon={faUsers} />
                  <h4>Override Earnings</h4>
                </div>
                <div className="breakdown-value">{formatCurrency(results.overrideEarnings)}</div>
                <div className="breakdown-details">
                  <div className="detail-item">
                    <span>Advisors:</span>
                    <span>{formData.numberOfAdvisors}</span>
                  </div>
                  <div className="detail-item">
                    <span>Override Rate:</span>
                    <span>{formData.overrideRate}%</span>
                  </div>
                  <div className="detail-item">
                    <span>Recruits:</span>
                    <span>{formData.numberOfRecruits}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="chart-section">
            <h4>Income Distribution</h4>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
              <div className="chart-center">
                <div className="chart-total">{formatCurrency(results.totalIncome)}</div>
                <div className="chart-label">Total Annual</div>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="action-btn recalculate" onClick={reset}>
              <FontAwesomeIcon icon={faRedo} /> Re-calculate
            </button>
            <button className="action-btn download" onClick={() => setShowModal(true)}>
              <FontAwesomeIcon icon={faDownload} /> Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsStep;