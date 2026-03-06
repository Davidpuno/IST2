import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons';

export default function Step6({ formData, setFormData, next, back, canGoNext }) {
  const handleChoice = (choice) => {
    setFormData({ ...formData, isRecruitingAgent: choice });
  };

  return (
    <div className="step-card">
      <div className="step-content-area">
        <div className="step-indicator">
          <div className="step-number">6</div>
          <div className="step-title">Team Building</div>
        </div>

        <h1>Do you plan to build or recruit a team?</h1>
        
        <div className="cards-grid">
          <div
            className={`card ${formData.isRecruitingAgent === true ? 'selected' : ''}`}
            onClick={() => handleChoice(true)}
          >
            <FontAwesomeIcon icon={faUsers} size="2x" />
            <strong>Yes</strong>
            <span>I plan to build a team and earn overrides</span>
          </div>

          <div
            className={`card ${formData.isRecruitingAgent === false ? 'selected' : ''}`}
            onClick={() => handleChoice(false)}
          >
            <FontAwesomeIcon icon={faUserTie} size="2x" />
            <strong>No</strong>
            <span>I'll focus on personal production only</span>
          </div>
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
          View Results <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}