// components/Step1.jsx (Desired Income)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPesoSign, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Step1({ formData, setFormData, next, canGoNext }) {
  // Format input with commas for better readability
  const formatNumber = (num) => {
    if (!num) return '';
    const number = num.replace(/\D/g, '');
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleInputChange = (e) => {
    const val = e.target.value.replace(/,/g, '').replace(/\D/g, '');
    setFormData({ ...formData, desiredIncome: val });
  };

  return (
    <div className="step-card">
      <div>
        <h1>Desired Income</h1>
        <p>Enter your target income for the next 12 months</p>

        <div className="income-input-container">
          <span className="currency-symbol">₱</span>
          <input
            type="text"
            inputMode="numeric"
            value={formatNumber(formData.desiredIncome)}
            onChange={handleInputChange}
            placeholder="0"
            className="peso-input"
          />
        </div>
        
        <div className="income-hint">
          <small>Examples: 500,000 (₱500k) | 1,200,000 (₱1.2M) | 2,500,000 (₱2.5M)</small>
        </div>
      </div>

      <button
        className="btn-outline appointment-btn"
        onClick={next}
        disabled={!canGoNext()}
      >
        Next <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
}