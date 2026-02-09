import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

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

        <h1>How do you want to split your time and effort across licenses?</h1>
        <p>
          Enter percentages for each license. They must add up to exactly 100%.
        </p>

        <div className="effort-inputs">
          {formData.selectedLicenses.map(license => (
            <div key={license} className="effort-input-group">
              <label>License {license}</label>
              <div className="input-with-suffix">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.effortAllocation[license] || 0}
                  onChange={(e) => handleChange(license, e.target.value)}
                  placeholder="0"
                />
                <span className="suffix">%</span>
              </div>
            </div>
          ))}
        </div>

        <div className={`effort-total ${isValid ? 'valid' : 'invalid'}`}>
          Total: {total}% {isValid ? '✓ Ready to continue' : '✗ Must equal 100%'}
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