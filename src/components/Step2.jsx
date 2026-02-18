import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faArrowRight,
  faCircleInfo,
  faSeedling,
  faDumbbell,
  faChartLine,
  faBullseye,
  faCoins,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

const caseSizes = [
  { id: '1', amount: '₱80,000', value: 80000, label: 'Typical for newer advisors', icon: faSeedling, iconColor: '#10b981', description: 'Good starting point' },
  { id: '2', amount: '₱100,000', value: 100000, label: 'Solid mid-range', icon: faDumbbell, iconColor: '#f59e0b', description: 'Most common target' },
  { id: '3', amount: '₱125,000', value: 125000, label: 'Strong average', icon: faChartLine, iconColor: '#3b82f6', description: 'Above average performer' },
  { id: '4', amount: '₱150,000+', value: 150000, label: 'High-value / premium focus', icon: faBullseye, iconColor: '#8b5cf6', description: 'Elite producer level' }
];

export default function Step2({ formData, setFormData, next, back, canGoNext }) {
  const handleCaseSelect = (caseSize) => {
    setFormData({ ...formData, averageCaseSize: caseSize.value.toString() });
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
  const sliderPercentage = ((currentValue - 60000) / 190000) * 100;

  const getMotivationalMessage = () => {
    if (currentValue >= 150000) return { icon: faBullseye, message: "High-value focus! You're aiming for premium clients and bigger commissions." };
    if (currentValue >= 125000) return { icon: faChartLine, message: "Strong average! This puts you in the top tier of advisors." };
    if (currentValue >= 100000) return { icon: faDumbbell, message: "Solid target! This is the sweet spot for most successful advisors." };
    return { icon: faSeedling, message: "Great starting point! You can increase this as you gain experience." };
  };

  const motivation = getMotivationalMessage();

  return (
    <div className="step-card">
      <div className="step-content-area">
        <div className="step-header">
          <div className="step-indicator-modern">
            <div className="step-number-modern">2</div>
            <div className="step-title-modern">
              <span className="step-title-label">STEP TWO</span>
              <span className="step-title-main">Average Case Size</span>
            </div>
          </div>
        </div>

        <h1 className="step-main-title">
          What's your average commission per policy?
        </h1>
        
        <p className="step-supporting-text">
          Bigger cases = fewer families you need to help each month. 
          Be realistic based on your current clients and market.
        </p>

        <div className="insight-card" style={{ marginBottom: '28px' }}>
          <FontAwesomeIcon icon={faCircleInfo} className="insight-icon" />
          <div className="insight-content">
            <span className="insight-title">Did you know?</span>
            <span className="insight-text">
              The average case size in the industry is ₱100,000-₱125,000 for experienced advisors.
            </span>
          </div>
        </div>

        {/* Cards - INPUT */}
        <div className="cards-grid">
          {caseSizes.map(caseSize => (
            <div
              key={caseSize.id}
              className={`card ${currentValue === caseSize.value ? 'selected' : ''}`}
              onClick={() => handleCaseSelect(caseSize)}
            >
              <div className="card-icon-wrapper" style={{ 
                width: '48px', height: '48px', borderRadius: '16px',
                background: `${caseSize.iconColor}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px'
              }}>
                <FontAwesomeIcon icon={caseSize.icon} style={{ fontSize: '24px', color: caseSize.iconColor }} />
              </div>
              <strong>{caseSize.amount}</strong>
              <span>{caseSize.label}</span>
              <small>{caseSize.description}</small>
              {currentValue === caseSize.value && (
                <FontAwesomeIcon icon={faCheckCircle} style={{
                  position: 'absolute', top: '12px', right: '12px',
                  color: '#10b981', fontSize: '20px'
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Slider - QUICK SELECT */}
        <div className="income-slider-section" style={{ marginTop: '16px' }}>
          <div className="slider-value-display">
            <FontAwesomeIcon icon={faCoins} style={{ color: '#003266', marginRight: '4px' }} />
            <span className="slider-value-label">Your case size:</span>
            <span className="slider-value-amount">{formatCurrency(currentValue)}</span>
            <span className="slider-value-period">per policy</span>
          </div>

          <div className="slider-container">
            <input
              type="range"
              min="60000"
              max="250000"
              step="5000"
              value={currentValue}
              onChange={handleCustomChange}
              className="income-slider"
              style={{
                background: `linear-gradient(90deg, #003266 ${sliderPercentage}%, #e2e8f0 ${sliderPercentage}%)`
              }}
            />
            
            <div className="slider-markers">
              <span className="marker-label">₱60k</span>
              <span className="marker-label">₱100k</span>
              <span className="marker-label">₱150k</span>
              <span className="marker-label">₱200k</span>
              <span className="marker-label">₱250k</span>
            </div>
          </div>
        </div>

        {/* Motivational message */}
        <div className="motivation-message" style={{ marginTop: '24px', background: '#f0f9ff', border: '1px solid #b8e1ff' }}>
          <FontAwesomeIcon icon={motivation.icon} style={{ color: '#003266', fontSize: '18px' }} />
          <span>{motivation.message}</span>
        </div>

        {/* STATS CARDS AND SUMMARY NOTE HAVE BEEN REMOVED */}
      </div>

      {/* Navigation */}
      <div className="navigation-container">
        <button className="btn-outline" onClick={back} style={{ padding: '14px 28px' }}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {!canGoNext() && (
            <div className="navigation-hint">
              <span className="hint-dot"></span>
              <span className="hint-text">Select a case size</span>
            </div>
          )}
          <button
            className="next-button-modern"
            onClick={next}
            disabled={!canGoNext()}
          >
            <span>Continue to Ramp-up</span>
            <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}