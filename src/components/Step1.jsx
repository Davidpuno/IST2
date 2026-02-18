import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowRight, 
  faCircleInfo,
  faCoins,
  faChartLine,
  faSeedling,
  faDumbbell,
  faRocket,
  faCrown,
  faStar,
  faChartSimple,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

export default function Step1({ formData, setFormData, next, canGoNext }) {
  const [localValue, setLocalValue] = useState(formData.monthlyIncomeGoal || '100000');
  const [isFocused, setIsFocused] = useState(false);
  const [activePreset, setActivePreset] = useState(null);

  useEffect(() => {
    setLocalValue(formData.monthlyIncomeGoal || '100000');
  }, [formData.monthlyIncomeGoal]);

  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, '').replace(/\D/g, '');
    const limitedValue = rawValue.slice(0, 7);
    setLocalValue(limitedValue);
    setFormData({ ...formData, monthlyIncomeGoal: limitedValue });
    setActivePreset(null);
  };

  const handleSliderChange = (e) => {
    const value = e.target.value;
    setLocalValue(value);
    setFormData({ ...formData, monthlyIncomeGoal: value });
    setActivePreset(null);
  };

  const formatNumber = (num) => {
    if (!num) return '';
    const number = num.toString().replace(/\D/g, '');
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const incomeValue = parseInt(localValue) || 100000;
  
  const incomePresets = [
    { value: 50000, label: '₱50k', icon: faSeedling, iconColor: '#10b981', description: 'Great for beginners' },
    { value: 100000, label: '₱100k',  icon: faDumbbell, iconColor: '#f59e0b', description: 'Top 25% of advisors' },
    { value: 150000, label: '₱150k',  icon: faChartSimple, iconColor: '#3b82f6', description: 'Above average performer' },
    { value: 250000, label: '₱250k', icon: faRocket, iconColor: '#8b5cf6', description: 'Top producer level' },
    { value: 400000, label: '₱400k', icon: faCrown, iconColor: '#f4b43c', description: 'Elite producer' },
    { value: 600000, label: '₱600k+', icon: faStar, iconColor: '#ec4899', description: 'Top 1% of advisors' }
  ];

  const handlePresetClick = (preset) => {
    setLocalValue(preset.value.toString());
    setFormData({ ...formData, monthlyIncomeGoal: preset.value.toString() });
    setActivePreset(preset.value);
  };

  const sliderPercentage = ((incomeValue - 10000) / 990000) * 100;

  return (
    <div className="step-card">
      <div className="step-content-area">
        {/* Header */}
        <div className="step-header">
          <div className="step-indicator-modern">
            <div className="step-number-modern">1</div>
            <div className="step-title-modern">
              <span className="step-title-label">STEP ONE</span>
              <span className="step-title-main">Monthly Income Goal</span>
            </div>
          </div>
        </div>

        <h1 className="step-main-title">
          What monthly income do you want to earn?
        </h1>
        
        <p className="step-supporting-text">
          This is your First-Year Commission (FYC) target. Be ambitious but realistic — 
          we'll help you create a plan to get there.
        </p>

        {/* Income input card */}
        <div className="income-card">
          <div className="income-card-header">
            <FontAwesomeIcon icon={faCoins} className="income-card-icon" />
            <span className="income-card-title">Set your monthly target</span>
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
            <span className="income-input-period">/month</span>
          </div>

          {/* Slider */}
          <div className="income-slider-section">
            <div className="slider-value-display">
              <FontAwesomeIcon icon={faCoins} style={{ color: '#003266', marginRight: '4px', fontSize: '14px' }} />
              <span className="slider-value-label">Your goal:</span>
              <span className="slider-value-amount">₱{incomeValue.toLocaleString()}</span>
              <span className="slider-value-period">per month</span>
            </div>

            <div className="slider-container">
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={incomeValue}
                onChange={handleSliderChange}
                className="income-slider"
                style={{
                  background: `linear-gradient(90deg, #003266 ${sliderPercentage}%, #e2e8f0 ${sliderPercentage}%)`
                }}
              />
              
              <div className="slider-markers">
                <span className="marker-label">₱10k</span>
                <span className="marker-label">₱250k</span>
                <span className="marker-label">₱500k</span>
                <span className="marker-label">₱750k</span>
                <span className="marker-label">₱1M</span>
              </div>
            </div>
          </div>

          {/* Quick select presets */}
          <div className="income-presets-section">
            <div className="presets-header">
              <FontAwesomeIcon icon={faChartLine} className="presets-icon" />
              <span className="presets-title">Quick select by experience level</span>
            </div>
            
            <div className="presets-grid">
              {incomePresets.map((preset) => (
                <button
                  key={preset.value}
                  className={`preset-card ${activePreset === preset.value ? 'active' : ''}`}
                  onClick={() => handlePresetClick(preset)}
                >
                  <div className="preset-icon-wrapper" style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: `${preset.iconColor}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 8px'
                  }}>
                    <FontAwesomeIcon 
                      icon={preset.icon} 
                      style={{ 
                        fontSize: '20px', 
                        color: activePreset === preset.value ? 'white' : preset.iconColor 
                      }} 
                    />
                  </div>
                  <span className="preset-value" style={{ 
                    color: activePreset === preset.value ? 'white' : '#0a1c2f'
                  }}>{preset.label}</span>
                  <span className="preset-level" style={{ 
                    color: activePreset === preset.value ? 'rgba(255,255,255,0.9)' : '#003266'
                  }}>{preset.level}</span>
                  <span className="preset-description" style={{ 
                    color: activePreset === preset.value ? 'rgba(255,255,255,0.7)' : '#64748b'
                  }}>{preset.description}</span>
                  
                  {activePreset === preset.value && (
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

          {/* Insight card */}
          <div className="insight-card">
            <FontAwesomeIcon icon={faCircleInfo} className="insight-icon" />
            <div className="insight-content">
              <span className="insight-title">Pro tip</span>
              <span className="insight-text">
                Most successful advisors aim for ₱100k-₱250k monthly in their first 2 years.
              </span>
            </div>
          </div>

          {/* THE ANNUAL/DAILY/HOURLY CARD HAS BEEN REMOVED */}
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation-container">
        {!canGoNext() && (
          <div className="navigation-hint">
            <span className="hint-dot"></span>
            <span className="hint-text">Enter your monthly income goal to continue</span>
          </div>
        )}
        <button
          className="next-button-modern"
          onClick={next}
          disabled={!canGoNext()}
        >
          <span>Continue to Case Size</span>
          <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
        </button>
      </div>
    </div>
  );
}