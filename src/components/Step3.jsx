// components/Step3.jsx (Allocate Effort)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Step3({ formData, setFormData, next, back, canGoNext, totalEffort }) {
  const updateEffort = (license, value) => {
    const num = value === '' ? '' : Math.max(0, Math.min(100, Number(value)));
    setFormData(prev => ({
      ...prev,
      effortAllocation: { ...prev.effortAllocation, [license]: num }
    }));
  };

  return (
    <div className="step-card">
      <div>
        <h1>Allocate Effort</h1>
        <p>Distribute 100% across selected licenses</p>

        <div className="effort-inputs">
          {formData.selectedLicenses.map(lic => (
            <div key={lic} className="effort-input-group">
              <label>{lic} License</label>
              <div className="input-with-suffix">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.effortAllocation[lic] || ''}
                  onChange={e => updateEffort(lic, e.target.value)}
                  placeholder="0"
                />
                <span className="suffix">%</span>
              </div>
            </div>
          ))}
        </div>

        <div className={`effort-total ${Math.abs(totalEffort - 100) < 0.01 ? 'valid' : 'invalid'}`}>
          Total Effort: {totalEffort}%
          {Math.abs(totalEffort - 100) < 0.01 ? ' ✓' : ' (must equal 100%)'}
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