// ProgressBar.jsx - CARD STYLE WITH HOVER TOOLTIPS
import React from "react";

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  // Step labels for each step
  const stepLabels = {
    1: "Income",
    2: "Case Size",
    3: "Ramp Up",
    4: "Licenses",
    5: "Effort",
    6: "Team",
    7: "Results"
  };

  // Step descriptions for tooltips
  const stepDescriptions = {
    1: "Set your monthly income goal",
    2: "Define average commission per policy",
    3: "Choose your ramp-up timeline",
    4: "Select your licenses",
    5: "Allocate effort across licenses",
    6: "Decide on team building",
    7: "View your projected earnings"
  };

  return (
    <div className="progress-section">
      {/* Step cards above the progress bar */}
      <div className="step-numbers-top">
        {steps.map((stepNumber) => (
          <div 
            key={stepNumber}
            className={`step-number-top 
              ${stepNumber === currentStep ? 'active' : ''} 
              ${stepNumber < currentStep ? 'completed' : ''}`}
          >
            <div 
              className="step-card-indicator"
              data-tooltip={stepDescriptions[stepNumber]}
            >
              <span className="step-number-text">
                {stepNumber < currentStep ? '✓' : stepNumber}
              </span>
              <span className="step-label-text">
                {stepLabels[stepNumber]}
              </span>
            </div>
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
        {steps.map((stepNumber) => (
          <span 
            key={stepNumber} 
            className={`step-label ${stepNumber === currentStep ? 'active' : ''}`}
          >
            {stepLabels[stepNumber]}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;