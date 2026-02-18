import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faTrophy, faDownload, faRedo, faChartLine, faBullseye, faCertificate } from "@fortawesome/free-solid-svg-icons";

const ResultsStep = ({ formData, reset, setShowModal }) => {
  // Calculate results based on new flow
  const calculateResults = () => {
    const monthlyIncome = parseInt(formData.monthlyIncomeGoal?.replace(/\D/g, '')) || 0;
    const caseSize = parseInt(formData.averageCaseSize) || 100000;
    
    // Annual income (monthly * 12)
    const annualIncomeTarget = monthlyIncome * 12;
    
    // Calculate policies needed
    const policiesNeeded = caseSize > 0 ? annualIncomeTarget / caseSize : 0;
    
    // Calculate ramp-up multiplier
    let rampMultiplier = 1;
    if (formData.rampUp === 'beginner') rampMultiplier = 1.5;
    else if (formData.rampUp === 'midlevel') rampMultiplier = 1.3;
    else if (formData.rampUp === 'experienced') rampMultiplier = 1.1;
    
    // Calculate income by license if effort allocated
    const licenseIncome = {};
    let totalAllocatedIncome = 0;
    
    if (formData.selectedLicenses.length > 1 && Object.keys(formData.effortAllocation).length > 0) {
      formData.selectedLicenses.forEach(license => {
        const effort = parseFloat(formData.effortAllocation[license]) || 0;
        licenseIncome[license] = (annualIncomeTarget * effort) / 100;
        totalAllocatedIncome += licenseIncome[license];
      });
    } else {
      // Equal split if only one license or no allocation
      formData.selectedLicenses.forEach(license => {
        const share = 100 / formData.selectedLicenses.length;
        licenseIncome[license] = (annualIncomeTarget * share) / 100;
      });
    }
    
    // Calculate override if team building
    let overrideEarnings = 0;
    if (formData.isRecruitingAgent) {
      // Assuming 20% override on team production (simplified)
      overrideEarnings = annualIncomeTarget * 0.2;
    }
    
    const totalIncome = annualIncomeTarget + overrideEarnings;
    
    return {
      annualIncomeTarget,
      monthlyIncomeTarget: monthlyIncome,
      caseSize,
      policiesNeeded: Math.ceil(policiesNeeded),
      policiesPerMonth: Math.ceil(policiesNeeded / 12),
      rampMultiplier,
      licenseIncome,
      overrideEarnings,
      totalIncome,
      selectedLicenses: formData.selectedLicenses,
      isRecruitingAgent: formData.isRecruitingAgent
    };
  };
  
  const results = calculateResults();
  
  const formatCurrency = (value) => {
    const num = typeof value === 'string' ? parseInt(value.replace(/\D/g, '')) || 0 : value;
    return `₱${num.toLocaleString('en-US')}`;
  };
  
  return (
    <div className="step-card">
      <div className="step-content-area">
        <div className="question-header">
          <div className="question-number">Results</div>
          <h1>Your Income Projection</h1>
          <p className="question-description">
            Based on your inputs, here's your projected earnings breakdown
          </p>
        </div>

        <div className="results-section">
          {/* Summary Card */}
          <div className="summary-card">
            <div className="summary-header">
              <FontAwesomeIcon icon={faTrophy} />
              <h3>Total Annual Income</h3>
            </div>
            <div className="summary-total">{formatCurrency(results.totalIncome)}</div>
            <div className="summary-subtitle">
              {results.isRecruitingAgent 
                ? "Includes team override earnings" 
                : "Based on personal production"}
            </div>
          </div>

          {/* Key Metrics - Monthly Target Card REMOVED */}
          <div className="breakdown-grid">
            {/* Ramp-up Plan Card - Now first */}
            <div className="breakdown-card">
              <div className="breakdown-header">
                <FontAwesomeIcon icon={faChartLine} />
                <h4>Ramp-up Plan</h4>
              </div>
              <div className="breakdown-value">{results.rampMultiplier}×</div>
              <div className="breakdown-details">
                <div className="detail-item">
                  <span>Activity Level:</span>
                  <span>
                    {formData.rampUp === 'beginner' && 'Beginner (6 months)'}
                    {formData.rampUp === 'midlevel' && 'Mid-level (4 months)'}
                    {formData.rampUp === 'experienced' && 'Experienced (3 months)'}
                    {formData.rampUp === 'none' && 'No ramp-up'}
                    {formData.rampUp === 'custom' && 'Custom'}
                  </span>
                </div>
                <div className="detail-item">
                  <span>Annual Policies:</span>
                  <span>{results.policiesNeeded}</span>
                </div>
              </div>
            </div>

            {/* License Breakdown */}
            {results.selectedLicenses.length > 0 && (
              <div className="breakdown-card">
                <div className="breakdown-header">
                  <FontAwesomeIcon icon={faCertificate} />
                  <h4>License Breakdown</h4>
                </div>
                <div className="breakdown-details">
                  {Object.entries(results.licenseIncome).map(([license, amount]) => (
                    <div key={license} className="detail-item">
                      <span>License {license}:</span>
                      <span>{formatCurrency(amount)}</span>
                      {formData.selectedLicenses.length > 1 && (
                        <small style={{ fontSize: '11px', color: '#666' }}>
                          ({formData.effortAllocation[license] || (100/results.selectedLicenses.length).toFixed(0)}%)
                        </small>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Team Overrides */}
            {results.isRecruitingAgent && (
              <div className="breakdown-card bonus-card">
                <div className="breakdown-header">
                  <FontAwesomeIcon icon={faUsers} />
                  <h4>Team Overrides</h4>
                </div>
                <div className="breakdown-value">{formatCurrency(results.overrideEarnings)}</div>
                <div className="breakdown-details">
                  <div className="detail-item">
                    <span>Team Building:</span>
                    <span>Yes</span>
                  </div>
                  <div className="detail-item">
                    <span>Override Rate:</span>
                    <span>20% (estimated)</span>
                  </div>
                  <div className="detail-item">
                    <span>Additional Income:</span>
                    <span>+{formatCurrency(results.overrideEarnings)}</span>
                  </div>
                </div>
                <div className="bonus-note">
                  Team overrides provide additional earnings from your team's production
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="action-btn recalculate" onClick={reset}>
              <FontAwesomeIcon icon={faRedo} /> Start Over
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