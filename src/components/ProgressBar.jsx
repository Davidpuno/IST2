// ProgressBar.jsx - SIMPLE PROGRESS INDICATOR
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

  return (
    <div className="progress-section-minimal">
      {/* Simple step indicators - no cards */}
      <div className="step-indicators-minimal">
        {steps.map((stepNumber) => (
          <div 
            key={stepNumber}
            className={`step-minimal 
              ${stepNumber === currentStep ? 'active' : ''} 
              ${stepNumber < currentStep ? 'completed' : ''}`}
          >
            <span className="step-dot"></span>
            <span className="step-label-minimal">
              {stepLabels[stepNumber]}
            </span>
          </div>
        ))}
      </div>

      {/* Simple progress bar */}
      <div className="progress-container-minimal">
        <div 
          className="progress-bar-fill-minimal"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;