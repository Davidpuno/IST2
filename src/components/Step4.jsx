import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const licenses = [
  { id: 'AZ', name: 'AZ License', description: 'Basic insurance license for property and casualty' },
  { id: 'NL', name: 'NL License', description: 'Non-life insurance focus including health and auto' },
  { id: 'GL', name: 'GL License', description: 'Global license for international operations' }
];

export default function Step4({ formData, setFormData, next, back, canGoNext }) {
  const toggleLicense = (id) => {
    setFormData(prev => ({
      ...prev,
      selectedLicenses: prev.selectedLicenses.includes(id)
        ? prev.selectedLicenses.filter(l => l !== id)
        : [...prev.selectedLicenses, id]
    }));
  };

  return (
    <div className="step-card">
      <div className="step-content-area">
        <div className="step-indicator">
          <div className="step-number">4</div>
          <div className="step-title">Licenses</div>
        </div>

        <h1>Which licenses do you currently hold or are working toward?</h1>
        <p>
          Select all that apply. This helps us calculate your earning potential accurately — higher licenses unlock bigger cases and team overrides.
        </p>

        <div className="cards-grid">
          {licenses.map(license => (
            <div
              key={license.id}
              className={`card ${formData.selectedLicenses.includes(license.id) ? 'selected' : ''}`}
              onClick={() => toggleLicense(license.id)}
            >
              <strong>{license.id}</strong>
              <span>{license.name}</span>
              <small>{license.description}</small>
            </div>
          ))}
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
          {formData.selectedLicenses.length > 1 ? 'Next: Split Effort' : 'Next'} 
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}