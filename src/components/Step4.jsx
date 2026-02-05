// Step4.jsx - Add skip logic display
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faUsers, faUserTie, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export default function Step4({ formData, setFormData, next, back, canGoNext }) {
  // If only L license is selected, this step should be skipped
  const shouldBeSkipped = formData.selectedLicenses.length === 1 && 
                         formData.selectedLicenses[0] === 'L';

  if (shouldBeSkipped) {
    return (
      <div className="step-card">
        <div className="auto-skip-message">
          <FontAwesomeIcon icon={faInfoCircle} size="3x" />
          <h2>Step Automatically Skipped</h2>
          <p>
            Since you only selected the <strong>L license</strong>, the Team Building step 
            is not required according to the flowchart.
          </p>
          <p>Proceeding to the next step automatically...</p>
          <button 
            className="btn-outline appointment-btn" 
            onClick={next}
            style={{ marginTop: '20px' }}
          >
            Continue to Review <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="step-card">
      <div>
        <h1>Team Building</h1>
        <p>Will part of your effort go into building a team?</p>

        <div className="cards-grid">
          <div
            className={`card ${formData.isRecruitingAgent === true ? 'selected' : ''}`}
            onClick={() => setFormData({ ...formData, isRecruitingAgent: true })}
          >
            <FontAwesomeIcon icon={faUsers} size="2x" />
            <strong>Yes</strong>
            <span>Personal income only (recruiting agent)</span>
          </div>

          <div
            className={`card ${formData.isRecruitingAgent === false ? 'selected' : ''}`}
            onClick={() => setFormData({ ...formData, isRecruitingAgent: false })}
          >
            <FontAwesomeIcon icon={faUserTie} size="2x" />
            <strong>No</strong>
            <span>Calculate income per license</span>
          </div>
        </div>
        
        <div className="flowchart-note">
          <small>
            <strong>Note:</strong> According to the flowchart:
            <ul>
              <li>If "Yes": Data sent to backend as "Personal income only"</li>
              <li>If "No": Backend calculates income per license</li>
            </ul>
          </small>
        </div>
      </div>

      <div className="cta-row">
        <button className="btn-outline" onClick={back}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <button 
          className="btn-outline appointment-btn" 
          onClick={next} 
          disabled={!canGoNext()}
        >
          Next <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}