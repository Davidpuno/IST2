import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faIdCard, faUserGraduate, faUserTie, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Step3 = ({ formData, setFormData, next, prev }) => {
  const licenseTypes = [
    {
      id: "GL",
      name: "General License",
      icon: faIdCard,
      description: "Basic insurance license for direct sales",
      requirements: "State exam required",
      commissions: "Standard rates",
      teamBuilding: "No team overrides",
      color: "#3B82F6",
      steps: "Complete all 9 steps"
    },
    {
      id: "AL",
      name: "Advanced License",
      icon: faUserGraduate,
      description: "Advanced products and higher commissions",
      requirements: "Additional certifications",
      commissions: "+30% higher rates",
      teamBuilding: "Limited team options",
      color: "#10B981",
      steps: "Complete all 9 steps"
    },
    {
      id: "L",
      name: "Leadership License",
      icon: faUserTie,
      description: "Full capabilities including team building",
      requirements: "Management experience",
      commissions: "+50% higher rates",
      teamBuilding: "Full team overrides",
      color: "#F59E0B",
      steps: "Extra step: Recruiting options"
    }
  ];

  return (
    <div className="question-page">
      <div className="question-header">
        <div className="question-number">Step 3 of 9</div>
        <h2 className="question-title">Select Your License Type</h2>
        <p className="question-description">
          Choose the license that matches your qualifications and goals
        </p>
      </div>

      <div className="question-content">
        <div className="license-section">
          <div className="license-cards">
            {licenseTypes.map((license) => (
              <div
                key={license.id}
                className={`license-card ${formData.license === license.id ? "selected" : ""}`}
                onClick={() => setFormData(prev => ({ ...prev, license: license.id }))}
                style={{ borderColor: license.color }}
              >
                <div className="license-header" style={{ background: `linear-gradient(135deg, ${license.color}, ${license.color}99)` }}>
                  <div className="license-icon">
                    <FontAwesomeIcon icon={license.icon} />
                  </div>
                  <h3>{license.name}</h3>
                  <div className="license-badge">{license.id}</div>
                </div>
                
                <div className="license-content">
                  <p className="license-description">{license.description}</p>
                  
                  <div className="license-details">
                    <div className="detail-item">
                      <FontAwesomeIcon icon={faCheckCircle} />
                      <span>{license.requirements}</span>
                    </div>
                    <div className="detail-item">
                      <FontAwesomeIcon icon={faCheckCircle} />
                      <span>{license.commissions}</span>
                    </div>
                    <div className="detail-item">
                      <FontAwesomeIcon icon={faCheckCircle} />
                      <span>{license.teamBuilding}</span>
                    </div>
                    <div className="detail-item">
                      <FontAwesomeIcon icon={faCheckCircle} />
                      <span>{license.steps}</span>
                    </div>
                  </div>
                  
                  {formData.license === license.id && (
                    <div className="license-selected" style={{ backgroundColor: `${license.color}20` }}>
                      <FontAwesomeIcon icon={faCheckCircle} style={{ color: license.color }} />
                      <span>Selected License</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="license-comparison">
            <h4>License Comparison:</h4>
            <div className="comparison-table">
              <div className="comparison-row header">
                <div className="comparison-cell">Feature</div>
                <div className="comparison-cell">GL</div>
                <div className="comparison-cell">AL</div>
                <div className="comparison-cell">L</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell">Commission Rate</div>
                <div className="comparison-cell">100%</div>
                <div className="comparison-cell">130%</div>
                <div className="comparison-cell">150%</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell">Team Overrides</div>
                <div className="comparison-cell">No</div>
                <div className="comparison-cell">Limited</div>
                <div className="comparison-cell">Full</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell">Recruiting</div>
                <div className="comparison-cell">No</div>
                <div className="comparison-cell">No</div>
                <div className="comparison-cell">Yes</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell">Required Training</div>
                <div className="comparison-cell">Basic</div>
                <div className="comparison-cell">Advanced</div>
                <div className="comparison-cell">Leadership</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="question-footer">
        <button className="btn-back" onClick={prev}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <button className="btn-next" onClick={next}>
          Next: Set Your Effort Level <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default Step3;