import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

export default function Step5({ formData, setFormData, next, back, canGoNext }) {
  // Skip this step if less than 2 licenses
  useEffect(() => {
    if (formData.selectedLicenses.length < 2) {
      const timer = setTimeout(() => {
        next();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [formData.selectedLicenses.length, next]);

  const handleChange = (license, value) => {
    const numValue = Math.max(0, Math.min(100, parseInt(value) || 0));
    setFormData(prev => ({
      ...prev,
      effortAllocation: {
        ...prev.effortAllocation,
        [license]: numValue
      }
    }));
  };

  // Calculate total
  const total = formData.selectedLicenses.reduce((sum, license) => {
    return sum + (formData.effortAllocation[license] || 0);
  }, 0);

  const isValid = Math.abs(total - 100) < 1;

  // Calculate remaining percentage
  const remaining = 100 - total;

  // Don't render anything if less than 2 licenses
  if (formData.selectedLicenses.length < 2) {
    return null;
  }

  return (
    <div className="step-card">
      <div className="step-content-area">
        <div className="step-indicator">
          <div className="step-number">5</div>
          <div className="step-title">Effort Split</div>
        </div>

        <h1>How do you want to split your time?</h1>
        <p className="step-description">
          Distribute your effort across your selected licenses. The total must equal 100%.
        </p>

        {/* Info card */}
        <div className="effort-info-card">
          <FontAwesomeIcon icon={faCircleInfo} className="info-icon" />
          <span>Allocate percentages based on where you'll focus your time</span>
        </div>

        <div className="effort-inputs">
          {formData.selectedLicenses.map((license, index) => (
            <div key={license} className="effort-input-group">
              <div className="license-badge">License {license}</div>
              <div className="input-wrapper">
                <div className="input-with-suffix">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.effortAllocation[license] || 0}
                    onChange={(e) => handleChange(license, e.target.value)}
                    placeholder="0"
                    className={formData.effortAllocation[license] ? 'filled' : ''}
                  />
                  <span className="suffix">%</span>
                </div>
                
                {/* Progress bar for each license */}
                <div className="license-progress-bar">
                  <div 
                    className="license-progress-fill"
                    style={{ width: `${formData.effortAllocation[license] || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total section with visual feedback */}
        <div className={`effort-total-container ${isValid ? 'valid' : 'invalid'}`}>
          <div className="total-label">
            <span>Total Allocation</span>
            <span className="total-percentage">{total}%</span>
          </div>
          
          {/* Main progress bar */}
          <div className="total-progress-bar">
            <div 
              className="total-progress-fill"
              style={{ width: `${total}%` }}
            ></div>
          </div>
          
          <div className="total-message">
            {isValid ? (
              <span className="success-message">
                <span className="check-icon">✓</span> Ready to continue
              </span>
            ) : (
              <span className="error-message">
                <span className="x-icon">✗</span> 
                {total > 100 
                  ? `Over by ${total - 100}%` 
                  : `Need ${remaining}% more to reach 100%`}
              </span>
            )}
          </div>
        </div>

        {/* Quick distribution buttons */}
        <div className="quick-distribute">
          <span className="quick-label">Quick distribute:</span>
          <div className="quick-buttons">
            <button 
              className="quick-btn"
              onClick={() => {
                const equalShare = Math.floor(100 / formData.selectedLicenses.length);
                const remainder = 100 - (equalShare * formData.selectedLicenses.length);
                const newAllocation = {};
                formData.selectedLicenses.forEach((license, index) => {
                  newAllocation[license] = index === 0 ? equalShare + remainder : equalShare;
                });
                setFormData(prev => ({ ...prev, effortAllocation: newAllocation }));
              }}
            >
              Equal Split
            </button>
            <button 
              className="quick-btn"
              onClick={() => {
                const newAllocation = {};
                formData.selectedLicenses.forEach((license, index) => {
                  newAllocation[license] = index === 0 ? 100 : 0;
                });
                setFormData(prev => ({ ...prev, effortAllocation: newAllocation }));
              }}
            >
              Focus on One
            </button>
          </div>
        </div>
      </div>

      <div className="next-button-container">
        <button className="btn-outline" onClick={back}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <button
          className="next-button"
          onClick={next}
          disabled={!isValid}
        >
          Next <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}