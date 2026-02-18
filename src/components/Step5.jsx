import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faArrowRight, 
  faCircleInfo,
  faCheckCircle,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';

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

  const total = formData.selectedLicenses.reduce((sum, license) => {
    return sum + (formData.effortAllocation[license] || 0);
  }, 0);

  const isValid = Math.abs(total - 100) < 1;
  const remaining = 100 - total;

  if (formData.selectedLicenses.length < 2) {
    return null;
  }

  return (
    <div className="step-card">
      <div className="step-content-area">
        <div className="step-header">
          <div className="step-indicator-modern">
            <div className="step-number-modern">5</div>
            <div className="step-title-modern">
              <span className="step-title-label">STEP FIVE</span>
              <span className="step-title-main">Effort Split</span>
            </div>
          </div>
        </div>

        <h1 className="step-main-title">
          How do you want to split your time?
        </h1>
        
        <p className="step-supporting-text">
          Distribute your effort across your selected licenses. The total must equal 100%.
        </p>

        <div className="insight-card" style={{ marginBottom: '28px' }}>
          <FontAwesomeIcon icon={faCircleInfo} className="insight-icon" />
          <div className="insight-content">
            <span className="insight-title">Quick tip</span>
            <span className="insight-text">
              Allocate percentages based on where you'll focus your time
            </span>
          </div>
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

        {/* MINIMALISTIC TOTAL CARD - Clean, simple, no progress bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '24px',
          padding: '12px 16px',
          backgroundColor: isValid ? '#f0fdf4' : '#fef2f2',
          borderRadius: '40px',
          border: `1px solid ${isValid ? '#10b981' : '#ef4444'}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FontAwesomeIcon 
              icon={isValid ? faCheckCircle : faExclamationCircle} 
              style={{ color: isValid ? '#10b981' : '#ef4444', fontSize: '16px' }} 
            />
            <span style={{ 
              fontSize: '14px', 
              fontWeight: '500',
              color: isValid ? '#10b981' : '#ef4444'
            }}>
              {isValid ? 'Complete' : total > 100 ? 'Over' : `${remaining}% left`}
            </span>
          </div>
          <div style={{
            fontSize: '20px',
            fontWeight: '700',
            color: isValid ? '#10b981' : '#ef4444',
          }}>
            {total}%
          </div>
        </div>

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

      <div className="navigation-container">
        <button className="btn-outline" onClick={back}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {!isValid && (
            <div className="navigation-hint">
              <span className="hint-dot"></span>
              <span className="hint-text">Must equal 100%</span>
            </div>
          )}
          <button
            className="next-button-modern"
            onClick={next}
            disabled={!isValid}
          >
            <span>Continue to Team Building</span>
            <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}