import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Step1({ formData, setFormData, next, canGoNext }) {
  const handleInputChange = (e) => {
    const val = e.target.value.replace(/,/g, '').replace(/\D/g, '');
    setFormData({ ...formData, monthlyIncomeGoal: val });
  };

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setFormData({ ...formData, monthlyIncomeGoal: value.toString() });
  };

  const formatNumber = (num) => {
    if (!num) return '';
    const number = num.replace(/\D/g, '');
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const incomeValue = parseInt(formData.monthlyIncomeGoal) || 100000;

  return (
    <div className="step-card">
      <div className="step-content-area">
        <h1>What monthly income do you want to earn?</h1>
        <p className="step-subtitle">
          This is your First-Year Commission (FYC) target — let's make it real.
        </p>

        <div className="income-input-container">
          <span className="currency-symbol">₱</span>
          <input
            type="text"
            inputMode="numeric"
            value={formatNumber(formData.monthlyIncomeGoal)}
            onChange={handleInputChange}
            placeholder="0"
            className="peso-input"
          />
        </div>

        <div className="slider-wrapper">
          <input
            type="range"
            min="10000"
            max="1000000"
            step="10000"
            value={incomeValue}
            onChange={handleSliderChange}
            className="custom-slider"
          />
          
          <div className="slider-ticks">
            <span>50k</span>
            <span>100k</span>
            <span>150k</span>
            <span>250k</span>
            <span>400k</span>
            <span>600k+</span>
          </div>
        </div>
      </div>

      <div className="next-button-container">
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