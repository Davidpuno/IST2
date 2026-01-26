import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";

const Step1 = ({ formData, setFormData, next, formatCurrency }) => {
  return (
    <div className="question-page">
      <div className="question-header">
        <div className="question-number">Step 1 of 9</div>
        <h2 className="question-title">What is your desired annual income?</h2>
        <p className="question-description">
          Set your income target for the next 12 months
        </p>
      </div>

      <div className="question-content">
        <div className="income-input-section">
          <div className="income-icon">
            <FontAwesomeIcon icon={faMoneyBillWave} />
          </div>
          
          <div className="income-input-container">
            <span className="currency-symbol">$</span>
            <input
              type="number"
              className="income-input"
              value={formData.desiredIncome}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                desiredIncome: Number(e.target.value)
              }))}
              min="0"
              step="1000"
              placeholder="100,000"
            />
            <span className="currency-label">per year</span>
          </div>
          
          <div className="income-preview">
            <div className="preview-card">
              <div className="preview-label">Your target income:</div>
              <div className="preview-value">{formatCurrency(formData.desiredIncome)}</div>
            </div>
            
            <div className="income-slider-container">
              <input
                type="range"
                min="0"
                max="500000"
                step="10000"
                value={formData.desiredIncome}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  desiredIncome: Number(e.target.value)
                }))}
                className="income-slider"
              />
              <div className="slider-labels">
                <span>$50K</span>
                <span>$250K</span>
                <span>$500K</span>
              </div>
            </div>
            
            <div className="income-benchmarks">
              <h4>Industry Benchmarks:</h4>
              <div className="benchmark-grid">
                <div className="benchmark">
                  <div className="benchmark-title">Entry Level</div>
                  <button 
                    className="benchmark-btn"
                    onClick={() => setFormData(prev => ({ ...prev, desiredIncome: 50000 }))}
                  >
                    $50,000
                  </button>
                </div>
                <div className="benchmark">
                  <div className="benchmark-title">Experienced</div>
                  <button 
                    className="benchmark-btn"
                    onClick={() => setFormData(prev => ({ ...prev, desiredIncome: 150000 }))}
                  >
                    $150,000
                  </button>
                </div>
                <div className="benchmark">
                  <div className="benchmark-title">Top Performer</div>
                  <button 
                    className="benchmark-btn"
                    onClick={() => setFormData(prev => ({ ...prev, desiredIncome: 300000 }))}
                  >
                    $300,000
                  </button>
                </div>
                <div className="benchmark">
                  <div className="benchmark-title">Agency Owner</div>
                  <button 
                    className="benchmark-btn"
                    onClick={() => setFormData(prev => ({ ...prev, desiredIncome: 500000 }))}
                  >
                    $500,000
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="question-footer">
        <button className="btn-next" onClick={next}>
          Next: Choose Business Type <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default Step1;