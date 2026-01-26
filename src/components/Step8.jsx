import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faChartLine, faLightbulb, faRocket, faShieldAlt, faUsers } from "@fortawesome/free-solid-svg-icons";

const Step8 = ({ formData, scenarios, next, prev, formatCurrency, formatNumber }) => {
  // Calculate scenario results
  const calculateScenarioResult = (scenario) => {
    const baseIncome = formData.desiredIncome;
    const businessMultiplier = 1.2; // Default for Life Insurance
    
    // Adjust for client volume
    const clientFactor = scenario.clientsPerWeek / formData.clientsPerWeek;
    
    // Adjust for commission rate
    const commissionFactor = scenario.commissionRate / formData.commissionRate;
    
    // Calculate income
    let income = baseIncome * businessMultiplier * clientFactor * commissionFactor;
    
    // Add team factor if applicable
    if (scenario.recruits && formData.license === "L") {
      const overrideIncome = income * (formData.overrideRate / 100) * (scenario.recruits / 5);
      income += overrideIncome;
    }
    
    return Math.round(income);
  };

  const scenarioTypes = [
    {
      id: "growth",
      name: "Growth Focus",
      icon: faRocket,
      color: "#10B981",
      description: "Aggressive client acquisition"
    },
    {
      id: "balanced",
      name: "Balanced Approach",
      icon: faChartLine,
      color: "#3B82F6",
      description: "Steady sustainable growth"
    },
    {
      id: "team",
      name: "Team Building",
      icon: faUsers,
      color: "#F59E0B",
      description: "Focus on recruitment"
    },
    {
      id: "niche",
      name: "Niche Specialization",
      icon: faShieldAlt,
      color: "#8B5CF6",
      description: "High-value specialized market"
    }
  ];

  return (
    <div className="question-page">
      <div className="question-header">
        <div className="question-number">Step 8 of 9</div>
        <h2 className="question-title">Business Scenarios & Overview</h2>
        <p className="question-description">
          Explore different business strategies and their outcomes
        </p>
      </div>

      <div className="question-content">
        <div className="scenarios-section">
          {/* Scenario Type Selection */}
          <div className="scenario-types">
            <h4>
              <FontAwesomeIcon icon={faLightbulb} />
              <span>Choose Your Strategy</span>
            </h4>
            
            <div className="strategy-cards">
              {scenarioTypes.map((strategy) => (
                <div
                  key={strategy.id}
                  className="strategy-card"
                  style={{ borderColor: strategy.color }}
                >
                  <div className="strategy-icon" style={{ color: strategy.color }}>
                    <FontAwesomeIcon icon={strategy.icon} />
                  </div>
                  <h5>{strategy.name}</h5>
                  <p className="strategy-description">{strategy.description}</p>
                  <div className="strategy-highlights">
                    {strategy.id === "growth" && (
                      <>
                        <span>• High client volume</span>
                        <span>• Marketing focus</span>
                        <span>• Rapid growth</span>
                      </>
                    )}
                    {strategy.id === "balanced" && (
                      <>
                        <span>• Steady growth</span>
                        <span>• Work-life balance</span>
                        <span>• Sustainable model</span>
                      </>
                    )}
                    {strategy.id === "team" && (
                      <>
                        <span>• Recruit agents</span>
                        <span>• Build overrides</span>
                        <span>• Residual income</span>
                      </>
                    )}
                    {strategy.id === "niche" && (
                      <>
                        <span>• Specialized market</span>
                        <span>• Higher premiums</span>
                        <span>• Expert positioning</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scenario Results Grid */}
          <div className="scenario-results">
            <h4>Scenario Analysis</h4>
            
            <div className="scenarios-grid">
              {scenarios.map((scenario, index) => {
                const income = calculateScenarioResult(scenario);
                const percentageChange = ((income - formData.desiredIncome) / formData.desiredIncome * 100).toFixed(0);
                
                return (
                  <div key={index} className="scenario-card">
                    <div className="scenario-header">
                      <h5>{scenario.name}</h5>
                      <div className={`scenario-change ${percentageChange >= 0 ? "positive" : "negative"}`}>
                        {percentageChange >= 0 ? "+" : ""}{percentageChange}%
                      </div>
                    </div>
                    
                    <p className="scenario-description">{scenario.description}</p>
                    
                    <div className="scenario-details">
                      <div className="detail-row">
                        <span>Clients/Week:</span>
                        <span className="detail-value">{scenario.clientsPerWeek}</span>
                      </div>
                      <div className="detail-row">
                        <span>Commission Rate:</span>
                        <span className="detail-value">{scenario.commissionRate}%</span>
                      </div>
                      {scenario.recruits && (
                        <div className="detail-row">
                          <span>New Recruits:</span>
                          <span className="detail-value">{scenario.recruits}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="scenario-income">
                      <div className="income-label">Projected Income</div>
                      <div className="income-value">{formatCurrency(income)}</div>
                    </div>
                    
                    <div className="scenario-action">
                      <button 
                        className="scenario-btn"
                        onClick={() => {
                          // Apply this scenario to form data
                          console.log("Apply scenario:", scenario);
                          alert(`Would apply ${scenario.name} scenario`);
                        }}
                      >
                        Apply This Strategy
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Year-over-Year Projection */}
          <div className="projection-section">
            <h4>5-Year Income Projection</h4>
            
            <div className="projection-cards">
              {[1, 2, 3, 4, 5].map((year) => {
                const growthRate = 0.15; // 15% annual growth
                const baseIncome = formData.desiredIncome * 1.2; // Business multiplier
                const projectedIncome = Math.round(baseIncome * Math.pow(1 + growthRate, year - 1));
                
                // Add team growth for L license
                let teamBonus = 0;
                if (formData.license === "L" && formData.isRecruitingAgent) {
                  const teamSize = formData.numberOfRecruits * year;
                  teamBonus = projectedIncome * (formData.overrideRate / 100) * (teamSize / 5);
                }
                
                const totalIncome = Math.round(projectedIncome + teamBonus);
                
                return (
                  <div key={year} className="projection-card">
                    <div className="projection-year">Year {year}</div>
                    <div className="projection-income">{formatCurrency(totalIncome)}</div>
                    <div className="projection-details">
                      <div className="detail">
                        <span>Direct:</span>
                        <span>{formatCurrency(projectedIncome)}</span>
                      </div>
                      {teamBonus > 0 && (
                        <div className="detail">
                          <span>Team:</span>
                          <span>{formatCurrency(teamBonus)}</span>
                        </div>
                      )}
                    </div>
                    <div className="projection-growth">
                      {year === 1 ? "Base" : `+${(growthRate * 100).toFixed(0)}%`}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="projection-summary">
              <h5>Growth Summary:</h5>
              <p>
                Based on your current settings, you could reach{" "}
                <strong>
                  {formatCurrency(formData.desiredIncome * 1.2 * Math.pow(1.15, 4))}
                </strong>{" "}
                in 5 years with consistent 15% annual growth.
                {formData.license === "L" && formData.isRecruitingAgent && 
                  " Team overrides could significantly increase this projection."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="question-footer">
        <button className="btn-back" onClick={prev}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <button className="btn-next" onClick={next}>
          Next: Prospect Template <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default Step8;