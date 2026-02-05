// ProgressBar.jsx - UPDATED with step numbers above
import React from "react";

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="progress-section">
      {/* Step numbers above the progress bar */}
      <div className="step-numbers-top">
        {steps.map((stepNumber) => (
          <div 
            key={stepNumber}
            className={`step-number-top ${stepNumber <= currentStep ? 'active' : ''}`}
          >
            <span className="step-circle">{stepNumber}</span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="progress-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Step labels below */}
      <div className="step-labels">
        <span className="step-label">Income</span>
        <span className="step-label">Licenses</span>
        <span className="step-label">Effort</span>
        <span className="step-label">Team</span>
        <span className="step-label">Review</span>
        <span className="step-label">Results</span>
      </div>
    </div>
  );
};

export default ProgressBar;