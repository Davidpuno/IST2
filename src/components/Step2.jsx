import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const caseSizes = [
  { id: '1', amount: '₱80,000', label: 'Typical for newer advisors' },
  { id: '2', amount: '₱100,000', label: 'Solid mid-range' },
  { id: '3', amount: '₱125,000', label: 'Strong average' },
  { id: '4', amount: '₱150,000+', label: 'High-value / premium focus' }
];

export default function Step2({ formData, setFormData, next, back, canGoNext }) {
  const handleCaseSelect = (caseSize) => {
    const amount = caseSize.amount.replace('₱', '').replace(',', '').replace('+', '');
    setFormData({ ...formData, averageCaseSize: amount });
  };

  const handleCustomChange = (e) => {
    const value = parseInt(e.target.value);
    setFormData({ ...formData, averageCaseSize: value.toString() });
  };

  const formatCurrency = (value) => {
    const num = typeof value === 'string' ? parseInt(value.replace(/\D/g, '')) || 0 : value;
    return `₱${num.toLocaleString('en-US')}`;
  };

  const currentValue = parseInt(formData.averageCaseSize) || 100000;

  return (
    <div className="step-card">
      <div className="step-content-area">
        <div className="step-indicator">
          <div className="step-number">2</div>
          <div className="step-title">Average Case Size</div>
        </div>

        <h1>What's your average commission per policy sold?</h1>
        <p>
          Bigger cases = fewer families you need to help each month. Be realistic based on your current clients.
        </p>

        <div className="cards-grid">
          {caseSizes.map(caseSize => (
            <div
              key={caseSize.id}
              className={`card ${currentValue === parseInt(caseSize.amount.replace(/\D/g, '')) ? 'selected' : ''}`}
              onClick={() => handleCaseSelect(caseSize)}
            >
              <strong>{caseSize.amount}</strong>
              <span>{caseSize.label}</span>
            </div>
          ))}
        </div>

        <div className="custom-slider-container">
          <div className="slider-value">{formatCurrency(currentValue)}</div>
          <input
            type="range"
            min="60000"
            max="250000"
            step="5000"
            value={currentValue}
            onChange={handleCustomChange}
            className="custom-slider"
          />
          <div className="slider-ticks">
            <span>₱60,000</span>
            <span>₱250,000</span>
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
          disabled={!canGoNext()}
        >
          Next <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}