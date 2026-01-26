import React from "react";

const ProgressBar = ({ step, totalSteps }) => {
  const progress = (step / (totalSteps - 1)) * 100;
  
  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;