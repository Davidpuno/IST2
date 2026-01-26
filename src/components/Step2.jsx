import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faHeart, faShieldAlt, faHome, faChartLine, faHandHoldingUsd, faBuilding } from "@fortawesome/free-solid-svg-icons";

const Step2 = ({ formData, setFormData, next, prev }) => {
  const businessTypes = [
    { 
      id: "Life Insurance", 
      icon: faHeart, 
      description: "Term life, whole life, universal life",
      avgPremium: "50,000",
      commission: "60-120%"
    },
    { 
      id: "Health Insurance", 
      icon: faShieldAlt, 
      description: "Health, dental, vision plans",
      avgPremium: "6,000",
      commission: "5-20%"
    },
    { 
      id: "Property & Casualty", 
      icon: faHome, 
      description: "Home, auto, business insurance",
      avgPremium: "1,500",
      commission: "10-15%"
    },
    { 
      id: "General Insurance", 
      icon: faBuilding, 
      description: "Commercial, liability, workers comp",
      avgPremium: "10,000",
      commission: "10-20%"
    },
    { 
      id: "Annuities", 
      icon: faChartLine, 
      description: "Fixed, variable, indexed annuities",
      avgPremium: "100,000",
      commission: "1-10%"
    },
    { 
      id: "Investment Products", 
      icon: faHandHoldingUsd, 
      description: "Mutual funds, retirement plans",
      avgPremium: "25,000",
      commission: "1-5%"
    }
  ];

  return (
    <div className="question-page">
      <div className="question-header">
        <div className="question-number">Step 2 of 9</div>
        <h2 className="question-title">What type of insurance business?</h2>
        <p className="question-description">
          Select your primary focus area
        </p>
      </div>

      <div className="question-content">
        <div className="business-type-section">
          <div className="business-grid">
            {businessTypes.map((business) => (
              <div
                key={business.id}
                className={`business-card ${formData.businessType === business.id ? "selected" : ""}`}
                onClick={() => setFormData(prev => ({ ...prev, businessType: business.id }))}
              >
                <div className="business-icon">
                  <FontAwesomeIcon icon={business.icon} />
                </div>
                <h3>{business.id}</h3>
                <p className="business-description">{business.description}</p>
                <div className="business-stats">
                  <div className="stat">
                    <div className="stat-label">Avg. Premium</div>
                    <div className="stat-value">${business.avgPremium}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-label">Commission</div>
                    <div className="stat-value">{business.commission}</div>
                  </div>
                </div>
                {formData.businessType === business.id && (
                  <div className="selected-badge">Selected</div>
                )}
              </div>
            ))}
          </div>

          <div className="selected-business-details">
            <h4>Selected Business Type:</h4>
            <div className="selected-details">
              <FontAwesomeIcon icon={businessTypes.find(b => b.id === formData.businessType)?.icon || faBuilding} />
              <div>
                <div className="selected-title">{formData.businessType}</div>
                <div className="selected-description">
                  {businessTypes.find(b => b.id === formData.businessType)?.description}
                </div>
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
          Next: Select License <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default Step2;