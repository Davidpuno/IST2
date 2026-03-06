import React, { useState, useEffect } from 'react';
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
  { id: '1', amount: '₱80,000', value: 80000, label: 'Typical for newer advisors', description: 'Good starting point' },
  { id: '2', amount: '₱100,000', value: 100000, label: 'Solid mid-range', description: 'Most common target' },
  { id: '3', amount: '₱125,000', value: 125000, label: 'Strong average', description: 'Above average performer' },
  { id: '4', amount: '₱150,000+', value: 150000, label: 'High-value / premium focus', description: 'Elite producer level' }
];

export default function Step2({ formData, setFormData, next, back, canGoNext }) {
  const [localValue, setLocalValue] = useState(formData.averageCaseSize || '100000');
  const [isFocused, setIsFocused] = useState(false);
  const [activePreset, setActivePreset] = useState(null);

  useEffect(() => {
    setLocalValue(formData.averageCaseSize || '100000');
  }, [formData.averageCaseSize]);

  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, '').replace(/\D/g, '');
    const limitedValue = rawValue.slice(0, 7);
    setLocalValue(limitedValue);
    setFormData({ ...formData, averageCaseSize: limitedValue });
    setActivePreset(null);
  };

  const handleCaseSelect = (caseSize) => {
    setLocalValue(caseSize.value.toString());
    setFormData({ ...formData, averageCaseSize: caseSize.value.toString() });
    setActivePreset(caseSize.value);
  };

  const formatNumber = (num) => {
    if (!num) return '';
    const number = num.toString().replace(/\D/g, '');
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const formatCurrency = (value) => {
    const num = typeof value === 'string' ? parseInt(value.replace(/\D/g, '')) || 0 : value;
    return `₱${num.toLocaleString('en-US')}`;
  };

  const currentValue = parseInt(localValue) || 100000;

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
        
        <div className="insight-card" style={{ marginBottom: '28px' }}>
          <FontAwesomeIcon icon={faCircleInfo} className="insight-icon" />
          <div className="insight-content">
            <span className="insight-title">Did you know?</span>
            <span className="insight-text">
              The average case size in the industry is ₱100,000-₱125,000 for experienced advisors.
            </span>
          </div>
        </div>

        {/* Input area similar to Step1 */}
        <div className="income-card" style={{ marginBottom: '24px' }}>
          <div className="income-card-header">
            <FontAwesomeIcon icon={faCoins} className="income-card-icon" />
            <span className="income-card-title">Set your average case size</span>
          </div>

          {/* Input */}
          <div className={`income-input-wrapper ${isFocused ? 'focused' : ''} ${localValue ? 'has-value' : ''}`}>
            <span className="currency-sign">₱</span>
            <input
              type="text"
              inputMode="numeric"
              value={formatNumber(localValue)}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="0"
              className="income-input-field"
            />
            <span className="income-input-period">per policy</span>
          </div>
        </div>

        {/* Quick select cards - ICONS REMOVED */}
        <div className="income-presets-section" style={{ marginBottom: '24px' }}>
          <div className="presets-header">
            <FontAwesomeIcon icon={faCoins} className="presets-icon" />
            <span className="presets-title">Quick select by experience level</span>
          </div>
          
          <div className="presets-grid">
            {caseSizes.map((caseSize) => (
              <button
                key={caseSize.id}
                className={`preset-card ${activePreset === caseSize.value ? 'active' : ''}`}
                onClick={() => handleCaseSelect(caseSize)}
              >
                <span className="preset-value" style={{ 
                  color: activePreset === caseSize.value ? 'white' : '#0a1c2f'
                }}>{caseSize.amount}</span>
                <span className="preset-description" style={{ 
                  color: activePreset === caseSize.value ? 'rgba(255,255,255,0.7)' : '#64748b'
                }}>{caseSize.description}</span>
                
                {activePreset === caseSize.value && (
                  <FontAwesomeIcon 
                    icon={faCheckCircle}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      color: 'white',
                      fontSize: '16px'
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Motivational message */}
        <div className="motivation-message" style={{ background: '#f0f9ff', border: '1px solid #b8e1ff' }}>
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
              <span className="hint-text">Enter your case size</span>
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