import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const rampOptions = [
  { 
    id: 'beginner',
    title: 'New / Beginner',
    multiplier: '1.5×',
    duration: '6 months',
    description: 'Best for agents in first 1–2 years'
  },
  { 
    id: 'midlevel',
    title: 'Average / Mid-level',
    multiplier: '1.3×',
    duration: '4 months',
    description: 'Good if you already have some experience'
  },
  { 
    id: 'experienced',
    title: 'Experienced / Fast',
    multiplier: '1.1×',
    duration: '3 months',
    description: 'For consistent producers'
  },
  { 
    id: 'none',
    title: 'No ramp-up',
    multiplier: '1.0×',
    duration: 'flat every month',
    description: 'You\'re already running at full speed'
  }
];

export default function Step3({ formData, setFormData, next, back, canGoNext }) {
  const handleRampSelect = (option) => {
    setFormData({ ...formData, rampUp: option.id });
  };

  return (
    <div className="step-card">
      <div className="step-content-area">
        <div className="step-indicator">
          <div className="step-number">3</div>
          <div className="step-title">Ramp-up Phase</div>
        </div>

        <h1>How fast do you expect to build momentum?</h1>
        <p>
          Most new advisors need extra effort in the first few months while building skills and pipeline.
        </p>

        <div className="cards-grid">
          {rampOptions.map(option => (
            <div
              key={option.id}
              className={`card ${formData.rampUp === option.id ? 'selected' : ''}`}
              onClick={() => handleRampSelect(option)}
            >
              <strong>{option.title}</strong>
              <span>{option.multiplier} activity for first {option.duration}</span>
              <small>{option.description}</small>
            </div>
          ))}
        </div>

        <div className="custom-ramp-button">
          <button className="btn-outline" onClick={() => {
            setFormData({ ...formData, rampUp: 'custom' });
          }}>
            Custom ramp-up
          </button>
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