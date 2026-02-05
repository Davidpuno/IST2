// components/Step2.jsx (Select Licenses)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const licenses = [
  { id: 'L', name: 'L' },
  { id: 'NL', name: 'NL' },
  { id: 'GL', name: 'GL' },
];

export default function Step2({ formData, setFormData, next, back, canGoNext }) {
  const toggle = id => {
    setFormData(prev => ({
      ...prev,
      selectedLicenses: prev.selectedLicenses.includes(id)
        ? prev.selectedLicenses.filter(l => l !== id)
        : [...prev.selectedLicenses, id]
    }));
  };

  return (
    <div className="step-card">
      <div>
        <h1>Select License</h1>
        <p>Choose one or more licenses (L, NL, GL)</p>

        <div className="cards-grid">
          {licenses.map(l => (
            <div
              key={l.id}
              className={`card ${formData.selectedLicenses.includes(l.id) ? 'selected' : ''}`}
              onClick={() => toggle(l.id)}
            >
              <strong>{l.name}</strong>
              {formData.selectedLicenses.includes(l.id) && <FontAwesomeIcon icon={faCheckCircle} />}
            </div>
          ))}
        </div>
      </div>

      <div className="cta-row">
        <button className="btn-outline" onClick={back}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <button className="btn-outline appointment-btn" onClick={next} disabled={!canGoNext()}>
          Next <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}