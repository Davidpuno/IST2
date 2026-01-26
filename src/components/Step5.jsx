import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faUserPlus, faUserTie, faUsers, faChartLine } from "@fortawesome/free-solid-svg-icons";

const Step5 = ({ formData, setFormData, next, prev, formatCurrency }) => {
  // This step only shows for L license
  if (formData.license !== "L") {
    // Skip to next step
    next();
    return null;
  }

  return (
    <div className="question-page">
      <div className="question-header">
        <div className="question-number">Step 5 of 9</div>
        <h2 className="question-title">Recruiting Agent Options</h2>
        <p className="question-description">
          As a Leadership License holder, you can build a team
        </p>
      </div>

      <div className="question-content">
        <div className="recruiting-section">
          <div className="recruiting-choice">
            <h4>Will you be recruiting agents?</h4>
            <div className="choice-cards">
              <div
                className={`choice-card ${formData.isRecruitingAgent ? "selected" : ""}`}
                onClick={() => setFormData(prev => ({ ...prev, isRecruitingAgent: true }))}
              >
                <div className="choice-icon">
                  <FontAwesomeIcon icon={faUserPlus} />
                </div>
                <h3>Yes</h3>
                <p>I want to build a team</p>
                <ul>
                  <li>Earn override commissions</li>
                  <li>Team leadership bonuses</li>
                  <li>Recruitment incentives</li>
                  <li>Residual income streams</li>
                </ul>
              </div>
              
              <div
                className={`choice-card ${!formData.isRecruitingAgent ? "selected" : ""}`}
                onClick={() => setFormData(prev => ({ ...prev, isRecruitingAgent: false }))}
              >
                <div className="choice-icon">
                  <FontAwesomeIcon icon={faUserTie} />
                </div>
                <h3>No</h3>
                <p>Focus on direct sales only</p>
                <ul>
                  <li>Higher personal commissions</li>
                  <li>No team management</li>
                  <li>Simpler business model</li>
                  <li>Direct client focus</li>
                </ul>
              </div>
            </div>
          </div>

          {formData.isRecruitingAgent && (
            <div className="recruiting-details">
              <h4>Team Building Details:</h4>
              <div className="team-inputs">
                <div className="input-group">
                  <label>
                    <FontAwesomeIcon icon={faUsers} />
                    <span>Number of Recruits (First Year)</span>
                  </label>
                  <div className="input-with-slider">
                    <input
                      type="number"
                      value={formData.numberOfRecruits}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        numberOfRecruits: Math.max(0, Math.min(100, Number(e.target.value)))
                      }))}
                      min="0"
                      max="100"
                      placeholder="0"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.numberOfRecruits}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        numberOfRecruits: Number(e.target.value)
                      }))}
                      className="slider"
                    />
                  </div>
                  <div className="input-hint">Typical range: 5-20 recruits in first year</div>
                </div>

                <div className="input-group">
                  <label>
                    <FontAwesomeIcon icon={faChartLine} />
                    <span>Override Rate (%)</span>
                  </label>
                  <div className="input-with-slider">
                    <input
                      type="number"
                      value={formData.overrideRate}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        overrideRate: Math.max(0, Math.min(50, Number(e.target.value)))
                      }))}
                      min="0"
                      max="50"
                      step="0.5"
                      placeholder="5"
                    />
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={formData.overrideRate}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        overrideRate: Number(e.target.value)
                      }))}
                      className="slider"
                    />
                  </div>
                  <div className="input-hint">Typical override: 3-10% of team sales</div>
                </div>
              </div>

              <div className="team-preview">
                <h4>Team Income Preview:</h4>
                <div className="preview-grid">
                  <div className="preview-card">
                    <div className="preview-label">Annual Overrides</div>
                    <div className="preview-value">
                      {formatCurrency(formData.numberOfRecruits * 50000 * (formData.overrideRate / 100))}
                    </div>
                    <div className="preview-sub">
                      Based on ${formatCurrency(50000)} avg per recruit
                    </div>
                  </div>
                  <div className="preview-card">
                    <div className="preview-label">Total Team ANP</div>
                    <div className="preview-value">
                      {formatCurrency(formData.numberOfRecruits * 500000)}
                    </div>
                    <div className="preview-sub">
                      Estimated team annual premium
                    </div>
                  </div>
                  <div className="preview-card">
                    <div className="preview-label">Recruiting Bonus</div>
                    <div className="preview-value">
                      {formatCurrency(formData.numberOfRecruits * 1000)}
                    </div>
                    <div className="preview-sub">
                      Signing bonuses for new agents
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="question-footer">
        <button className="btn-back" onClick={prev}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <button className="btn-next" onClick={next}>
          Next: See Results <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default Step5;