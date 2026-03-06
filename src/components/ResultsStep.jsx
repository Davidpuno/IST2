// src/components/ResultsStep.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUsers, faTrophy, faRedo, faChartLine, 
  faCertificate, faFileExcel 
} from "@fortawesome/free-solid-svg-icons";

const ResultsStep = ({ formData, reset }) => {
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
    
    if (formData.selectedLicenses?.length > 1 && Object.keys(formData.effortAllocation || {}).length > 0) {
      formData.selectedLicenses.forEach(license => {
        const effort = parseFloat(formData.effortAllocation?.[license]) || 0;
        licenseIncome[license] = (annualIncomeTarget * effort) / 100;
      });
    } else {
      // Equal split if only one license or no allocation
      formData.selectedLicenses?.forEach(license => {
        const share = 100 / formData.selectedLicenses.length;
        licenseIncome[license] = (annualIncomeTarget * share) / 100;
      });
    }
    
    // Calculate override if team building
    let overrideEarnings = 0;
    if (formData.isRecruitingAgent) {
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
      selectedLicenses: formData.selectedLicenses || [],
      isRecruitingAgent: formData.isRecruitingAgent || false
    };
  };
  
  const results = calculateResults();
  
  const formatCurrency = (value) => {
    const num = typeof value === 'string' ? parseInt(value.replace(/\D/g, '')) || 0 : value;
    return `₱${num.toLocaleString('en-US')}`;
  };

  // Download from Google Sheets
  const downloadExcelTemplate = async () => {
    try {
      // Your Google Sheet ID extracted from the link
      const sheetId = '1LY012q8-QcO6-Pv0LbDVvHvc1jfiUS-fNevplQrFEiQ';
      
      // Show loading state on button
      const button = document.querySelector('.action-btn.download');
      const originalText = button.innerHTML;
      button.innerHTML = 'Downloading...';
      button.disabled = true;
      
      // Google Sheets export URL for Excel format
      const exportUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx`;
      
      // Fetch the file
      const response = await fetch(exportUrl);
      
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }
      
      // Get the file as blob
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = '100 Prospect Template.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Reset button state
      button.innerHTML = originalText;
      button.disabled = false;
      
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download template. Please try again.');
      
      // Reset button state
      const button = document.querySelector('.action-btn.download');
      if (button) {
        button.innerHTML = '<svg class="svg-inline--fa fa-file-excel" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-excel" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v48h40c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16h-40v48c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V352H176v48c0 8.8-7.2 16-16 16H128c-8.8 0-16-7.2-16-16V352H72c-8.8 0-16-7.2-16-16V304c0-8.8 7.2-16 16-16h40V240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v48h40V240z"></path></svg> Download 100 Prospect Template';
        button.disabled = false;
      }
    }
  };
  
  return (
    <div className="step-card">
      <div className="step-content-area">
        <div className="question-header">
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

          {/* Key Metrics - Grid adjusts automatically based on content */}
          <div className="breakdown-grid">
            {/* Ramp-up Plan Card */}
            <div className="breakdown-card">
              <div className="breakdown-header">
                <FontAwesomeIcon icon={faChartLine} />
                <h4>Ramp-up Plan</h4>
              </div>
              <div className="breakdown-value">{results.rampMultiplier}×</div>
              <div className="breakdown-details">
                <div className="detail-item">
                  <span>Activity Level:</span>
                  <span className="detail-value">
                    {formData.rampUp === 'beginner' && 'Beginner (6 months)'}
                    {formData.rampUp === 'midlevel' && 'Mid-level (4 months)'}
                    {formData.rampUp === 'experienced' && 'Experienced (3 months)'}
                    {formData.rampUp === 'none' && 'No ramp-up'}
                    {formData.rampUp === 'custom' && 'Custom'}
                  </span>
                </div>
                <div className="detail-item">
                  <span>Annual Policies:</span>
                  <span className="detail-value">{results.policiesNeeded}</span>
                </div>
              </div>
            </div>

            {/* License Breakdown */}
            {results.selectedLicenses?.length > 0 && (
              <div className="breakdown-card">
                <div className="breakdown-header">
                  <FontAwesomeIcon icon={faCertificate} />
                  <h4>License Breakdown</h4>
                </div>
                <div className="breakdown-details">
                  {Object.entries(results.licenseIncome).map(([license, amount]) => (
                    <div key={license} className="detail-item">
                      <span>License {license}:</span>
                      <span className="detail-value">{formatCurrency(amount)}</span>
                      {results.selectedLicenses.length > 1 && (
                        <span className="detail-value badge">
                          {formData.effortAllocation?.[license] || (100/results.selectedLicenses.length).toFixed(0)}%
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Team Overrides and Action Buttons Side by Side */}
            {results.isRecruitingAgent && (
              <div className="bonus-row">
                <div className="breakdown-card bonus-card">
                  <div className="breakdown-header">
                    <FontAwesomeIcon icon={faUsers} />
                    <h4>Team Overrides</h4>
                  </div>
                  <div className="breakdown-value">{formatCurrency(results.overrideEarnings)}</div>
                  <div className="breakdown-details">
                    <div className="detail-item">
                      <span>Team Building:</span>
                      <span className="detail-value">Yes</span>
                    </div>
                    <div className="detail-item">
                      <span>Override Rate:</span>
                      <span className="detail-value">20% (estimated)</span>
                    </div>
                    <div className="detail-item highlight">
                      <span>Additional Income:</span>
                      <span className="detail-value highlight">+{formatCurrency(results.overrideEarnings)}</span>
                    </div>
                  </div>
                  <div className="bonus-note">
                    <FontAwesomeIcon icon={faUsers} size="sm" />
                    <span>Team overrides provide additional earnings from your team's production</span>
                  </div>
                </div>
                <div className="action-buttons action-buttons-vertical results-action-buttons">
                  <button className="action-btn recalculate" onClick={reset}>
                    <FontAwesomeIcon icon={faRedo} /> Start Over
                  </button>
                  <button className="action-btn download" onClick={downloadExcelTemplate}>
                    <FontAwesomeIcon icon={faFileExcel} /> Download 100 Prospect Template
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons (hidden if recruiting agent) */}
          {!results.isRecruitingAgent && (
            <div className="action-buttons">
              <button className="action-btn recalculate" onClick={reset}>
                <FontAwesomeIcon icon={faRedo} /> Start Over
              </button>
              <button className="action-btn download" onClick={downloadExcelTemplate}>
                <FontAwesomeIcon icon={faFileExcel} /> Download 100 Prospect Template
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsStep;