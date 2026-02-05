// components/Step5.jsx (Review & Calculate)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Step5({ formData, setFormData, next, back, canGoNext, formatCurrency }) {
  const totalEffort = formData.selectedLicenses.reduce(
    (sum, lic) => sum + (parseFloat(formData.effortAllocation[lic]) || 0),
    0
  );

  const calculateIncome = () => {
    const baseIncome = parseInt(formData.desiredIncome) || 0;
    const breakdown = {};
    let totalIncome = 0;

    formData.selectedLicenses.forEach(license => {
      const effort = parseFloat(formData.effortAllocation[license]) || 0;
      const licenseIncome = (baseIncome * effort) / 100;
      breakdown[license] = licenseIncome;
      totalIncome += licenseIncome;
    });

    return { breakdown, totalIncome };
  };

  const { breakdown, totalIncome } = calculateIncome();

  return (
    <div className="step-card">
      <div>
        <h1>Review & Calculate</h1>
        <p>Review your selections and calculate projected income</p>

        <div className="review-summary">
          <div className="summary-item">
            <span>Desired Income:</span>
            <strong>{formatCurrency(formData.desiredIncome)}</strong>
          </div>

          <div className="summary-item">
            <span>Selected Licenses:</span>
            <strong>{formData.selectedLicenses.join(', ')}</strong>
          </div>

          <div className="summary-item">
            <span>Effort Allocation:</span>
            <div className="effort-breakdown">
              {formData.selectedLicenses.map(lic => (
                <div key={lic} className="license-effort">
                  {lic}: {formData.effortAllocation[lic] || 0}%
                </div>
              ))}
              <div className="total-effort-display">
                Total: {totalEffort}%
              </div>
            </div>
          </div>

          {formData.isRecruitingAgent !== null && (
            <div className="summary-item">
              <span>Team Building:</span>
              <strong>{formData.isRecruitingAgent ? 'Yes' : 'No'}</strong>
            </div>
          )}

          <div className="projected-income">
            <h3>Projected Income</h3>
            {formData.selectedLicenses.map(lic => (
              <div key={lic} className="income-breakdown-item">
                <span>License {lic}:</span>
                <span>{formatCurrency(breakdown[lic] || 0)}</span>
              </div>
            ))}
            <div className="total-income">
              <span>Total Projected Income:</span>
              <strong>{formatCurrency(totalIncome)}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-row">
        <button className="btn-outline" onClick={back}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <button className="btn-outline appointment-btn" onClick={next}>
          View Detailed Results <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}