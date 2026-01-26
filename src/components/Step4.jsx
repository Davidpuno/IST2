import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faClock, faUserFriends, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const Step4 = ({ formData, setFormData, next, prev, formatCurrency }) => {
  const effortLevels = [
    {
      level: "Part-Time",
      clientsPerWeek: 2,
      hoursPerWeek: 20,
      description: "Side business, supplemental income",
      icon: "🕒"
    },
    {
      level: "Full-Time",
      clientsPerWeek: 5,
      hoursPerWeek: 40,
      description: "Dedicated full-time focus",
      icon: "👨‍💼"
    },
    {
      level: "High-Performance",
      clientsPerWeek: 10,
      hoursPerWeek: 60,
      description: "Aggressive growth strategy",
      icon: "🚀"
    },
    {
      level: "Agency Builder",
      clientsPerWeek: 3,
      hoursPerWeek: 50,
      description: "Focus on team building and recruitment",
      icon: "👥"
    }
  ];

  const calculateEfficiency = () => {
    if (formData.clientsPerWeek === 0 || formData.hoursPerWeek === 0) return 0;
    return (formData.hoursPerWeek / formData.clientsPerWeek).toFixed(1);
  };

  return (
    <div className="question-page">
      <div className="question-header">
        <div className="question-number">Step 4 of 9</div>
        <h2 className="question-title">Set Your Effort Level</h2>
        <p className="question-description">
          Define how much time and effort you'll invest
        </p>
      </div>

      <div className="question-content">
        <div className="effort-section">
          <div className="effort-presets">
            <h4>Select Effort Level:</h4>
            <div className="effort-cards">
              {effortLevels.map((effort) => (
                <div
                  key={effort.level}
                  className={`effort-card ${
                    formData.clientsPerWeek === effort.clientsPerWeek && 
                    formData.hoursPerWeek === effort.hoursPerWeek ? "selected" : ""
                  }`}
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    clientsPerWeek: effort.clientsPerWeek,
                    hoursPerWeek: effort.hoursPerWeek
                  }))}
                >
                  <div className="effort-icon">{effort.icon}</div>
                  <h4>{effort.level}</h4>
                  <div className="effort-stats">
                    <div className="stat">
                      <FontAwesomeIcon icon={faUserFriends} />
                      <span>{effort.clientsPerWeek}/week</span>
                    </div>
                    <div className="stat">
                      <FontAwesomeIcon icon={faClock} />
                      <span>{effort.hoursPerWeek} hours</span>
                    </div>
                  </div>
                  <p className="effort-description">{effort.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="custom-effort">
            <h4>Custom Effort Settings:</h4>
            <div className="effort-inputs">
              <div className="input-group">
                <label>
                  <FontAwesomeIcon icon={faUserFriends} />
                  <span>Clients Per Week</span>
                </label>
                <div className="input-with-slider">
                  <input
                    type="number"
                    value={formData.clientsPerWeek}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      clientsPerWeek: Math.max(0, Number(e.target.value))
                    }))}
                    min="0"
                    max="20"
                  />
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={formData.clientsPerWeek}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      clientsPerWeek: Number(e.target.value)
                    }))}
                    className="slider"
                  />
                </div>
              </div>

              <div className="input-group">
                <label>
                  <FontAwesomeIcon icon={faClock} />
                  <span>Hours Per Week</span>
                </label>
                <div className="input-with-slider">
                  <input
                    type="number"
                    value={formData.hoursPerWeek}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      hoursPerWeek: Math.max(0, Number(e.target.value))
                    }))}
                    min="0"
                    max="80"
                    step="5"
                  />
                  <input
                    type="range"
                    min="0"
                    max="80"
                    value={formData.hoursPerWeek}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      hoursPerWeek: Number(e.target.value)
                    }))}
                    className="slider"
                  />
                </div>
              </div>
            </div>

            <div className="effort-summary">
              <div className="summary-card">
                <h4>Efficiency Analysis</h4>
                <div className="summary-grid">
                  <div className="summary-item">
                    <div className="summary-label">Weekly Clients</div>
                    <div className="summary-value">{formData.clientsPerWeek}</div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-label">Weekly Hours</div>
                    <div className="summary-value">{formData.hoursPerWeek}</div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-label">Hours Per Client</div>
                    <div className="summary-value">{calculateEfficiency()}</div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-label">Annual Clients</div>
                    <div className="summary-value">{formData.clientsPerWeek * 52}</div>
                  </div>
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
          Next: {formData.license === "L" ? "Recruiting Options" : "See Results"} <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default Step4;