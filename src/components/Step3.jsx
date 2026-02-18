import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faArrowRight,
  faCircleInfo,
  faSeedling,
  faDumbbell,
  faRocket,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';

const rampOptions = [
  { 
    id: 'beginner',
    title: 'New / Beginner',
    multiplier: '1.5×',
    duration: '6 months',
    description: 'Best for agents in first 1–2 years',
    icon: faSeedling,
    iconColor: '#10b981'
  },
  { 
    id: 'midlevel',
    title: 'Average / Mid-level',
    multiplier: '1.3×',
    duration: '4 months',
    description: 'Good if you already have some experience',
    icon: faDumbbell,
    iconColor: '#f59e0b'
  },
  { 
    id: 'experienced',
    title: 'Experienced / Fast',
    multiplier: '1.1×',
    duration: '3 months',
    description: 'For consistent producers',
    icon: faRocket,
    iconColor: '#3b82f6'
  },
  { 
    id: 'none',
    title: 'No ramp-up',
    multiplier: '1.0×',
    duration: 'flat every month',
    description: 'You\'re already running at full speed',
    icon: faChartLine,
    iconColor: '#64748b'
  }
];

export default function Step3({ formData, setFormData, next, back, canGoNext }) {
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customMultiplier, setCustomMultiplier] = useState(1.3);
  const [customMonths, setCustomMonths] = useState(4);

  const handleRampSelect = (option) => {
    setFormData({ ...formData, rampUp: option.id });
  };

  const CustomRampModal = () => (
    <div className="modal-overlay" onClick={() => setShowCustomModal(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>Custom Ramp-up Plan</h3>
        <div className="modal-field">
          <label>Extra effort multiplier</label>
          <input 
            type="range" 
            min="1.0" 
            max="2.0" 
            step="0.1"
            value={customMultiplier}
            onChange={(e) => setCustomMultiplier(parseFloat(e.target.value))}
          />
          <span>{customMultiplier}×</span>
        </div>
        <div className="modal-field">
          <label>Number of months</label>
          <input 
            type="range" 
            min="1" 
            max="12" 
            step="1"
            value={customMonths}
            onChange={(e) => setCustomMonths(parseInt(e.target.value))}
          />
          <span>{customMonths} months</span>
        </div>
        <button 
          className="action-btn apply"
          onClick={() => {
            setFormData({ 
              ...formData, 
              rampUp: 'custom',
              customRampMultiplier: customMultiplier,
              customRampMonths: customMonths
            });
            setShowCustomModal(false);
          }}
        >
          Apply Custom Plan
        </button>
      </div>
    </div>
  );

  return (
    <div className="step-card">
      <div className="step-content-area">
        {/* Modern header */}
        <div className="step-header">
          <div className="step-indicator-modern">
            <div className="step-number-modern">3</div>
            <div className="step-title-modern">
              <span className="step-title-label">STEP THREE</span>
              <span className="step-title-main">Ramp-up Phase</span>
            </div>
          </div>
        </div>

        {/* Main title */}
        <h1 className="step-main-title">
          How fast do you expect to build momentum?
        </h1>
        
        <p className="step-supporting-text">
          Most new advisors need extra effort in the first few months while building skills and pipeline.
        </p>

        {/* Info card */}
        <div className="insight-card" style={{ marginBottom: '28px' }}>
          <FontAwesomeIcon icon={faCircleInfo} className="insight-icon" />
          <div className="insight-content">
            <span className="insight-title">Did you know?</span>
            <span className="insight-text">
              A 1.5× ramp-up means you'll need 50% more activity in your first 6 months
            </span>
          </div>
        </div>

        {/* Ramp options grid */}
        <div className="cards-grid">
          {rampOptions.map(option => (
            <div
              key={option.id}
              className={`card ${formData.rampUp === option.id ? 'selected' : ''}`}
              onClick={() => handleRampSelect(option)}
            >
              <div className="card-icon-wrapper" style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '16px',
                background: `${option.iconColor}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px'
              }}>
                <FontAwesomeIcon 
                  icon={option.icon} 
                  style={{ 
                    fontSize: '24px', 
                    color: option.iconColor 
                  }} 
                />
              </div>
              <strong>{option.title}</strong>
              <span>{option.multiplier} activity for first {option.duration}</span>
              <small>{option.description}</small>
            </div>
          ))}
        </div>

        {/* Custom ramp-up button */}
        <div className="custom-ramp-button">
          <button 
            className="btn-outline" 
            onClick={() => setShowCustomModal(true)}
          >
            Custom ramp-up
          </button>
        </div>

        {/* Custom modal */}
        {showCustomModal && <CustomRampModal />}
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
              <span className="hint-text">Select a ramp-up option</span>
            </div>
          )}
          <button
            className="next-button-modern"
            onClick={next}
            disabled={!canGoNext()}
          >
            <span>Continue to Licenses</span>
            <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}