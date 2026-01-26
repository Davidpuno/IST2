import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload, faCopy, faPrint, faUsers, faFilter, faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const Step9 = ({ formData, results, prev, formatNumber }) => {
  const [prospectCount, setProspectCount] = useState(50);
  const [selectedTemplate, setSelectedTemplate] = useState("basic");
  const [includeTips, setIncludeTips] = useState(true);

  // Generate prospect data based on form inputs
  const generateProspectData = () => {
    const templates = {
      basic: {
        name: "Basic Contact List",
        fields: ["Name", "Phone", "Email", "Status"],
        description: "Simple contact management"
      },
      detailed: {
        name: "Detailed Profile",
        fields: ["Name", "Contact", "Age", "Income", "Insurance Need", "Follow-up Date", "Notes"],
        description: "Complete prospect profiling"
      },
      advanced: {
        name: "Advanced Tracking",
        fields: ["Name", "Contact", "Demographics", "Risk Profile", "Product Interest", "Appointment", "Status", "Priority"],
        description: "Comprehensive sales pipeline"
      }
    };

    const selectedTemplate = templates[selectedTemplate];
    
    // Generate sample prospects
    const sampleProspects = Array.from({ length: Math.min(prospectCount, 20) }, (_, i) => {
      const firstName = ["John", "Jane", "Robert", "Mary", "David", "Sarah", "Michael", "Lisa"][i % 8];
      const lastName = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"][i % 8];
      
      return {
        id: i + 1,
        name: `${firstName} ${lastName}`,
        phone: `(555) ${100 + i}-${1000 + i}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
        age: 30 + (i % 30),
        income: `$${formatNumber(50000 + (i * 10000))}`,
        need: ["Life", "Health", "Auto", "Home", "Retirement"][i % 5],
        status: ["New", "Contacted", "Meeting Set", "Proposal Sent", "Closed"][i % 5],
        priority: ["Low", "Medium", "High"][i % 3]
      };
    });

    return {
      template: selectedTemplate,
      prospects: sampleProspects,
      totalNeeded: results.clientsPerYear,
      conversionRate: 0.1, // 10% conversion rate
      prospectsNeeded: Math.ceil(results.clientsPerYear / 0.1)
    };
  };

  const prospectData = generateProspectData();

  const handleDownload = () => {
    const dataStr = JSON.stringify(prospectData.prospects, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `prospect-list-${selectedTemplate}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    alert(`Prospect list downloaded as ${exportFileDefaultName}`);
  };

  const handleCopy = () => {
    const text = prospectData.prospects.map(p => 
      `${p.name}\t${p.phone}\t${p.email}\t${p.status}\t${p.priority}`
    ).join('\n');
    
    navigator.clipboard.writeText(text).then(() => {
      alert('Prospect list copied to clipboard!');
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="question-page">
      <div className="question-header">
        <div className="question-number">Step 9 of 9</div>
        <h2 className="question-title">Prospect List Template</h2>
        <p className="question-description">
          Generate a customized prospect list template for your business
        </p>
      </div>

      <div className="question-content">
        <div className="prospect-section">
          {/* Template Selection */}
          <div className="template-selection">
            <h4>
              <FontAwesomeIcon icon={faFilter} />
              <span>Choose Your Template</span>
            </h4>
            
            <div className="template-cards">
              <div 
                className={`template-card ${selectedTemplate === "basic" ? "selected" : ""}`}
                onClick={() => setSelectedTemplate("basic")}
              >
                <h5>Basic Contact List</h5>
                <p>Simple contact management for beginners</p>
                <div className="template-fields">
                  <span>Name</span>
                  <span>Phone</span>
                  <span>Email</span>
                  <span>Status</span>
                </div>
              </div>
              
              <div 
                className={`template-card ${selectedTemplate === "detailed" ? "selected" : ""}`}
                onClick={() => setSelectedTemplate("detailed")}
              >
                <h5>Detailed Profile</h5>
                <p>Complete prospect profiling</p>
                <div className="template-fields">
                  <span>Name</span>
                  <span>Contact</span>
                  <span>Demographics</span>
                  <span>Needs</span>
                  <span>Follow-up</span>
                </div>
              </div>
              
              <div 
                className={`template-card ${selectedTemplate === "advanced" ? "selected" : ""}`}
                onClick={() => setSelectedTemplate("advanced")}
              >
                <h5>Advanced Tracking</h5>
                <p>Comprehensive sales pipeline</p>
                <div className="template-fields">
                  <span>Full Profile</span>
                  <span>Risk Assessment</span>
                  <span>Sales Pipeline</span>
                  <span>Priority Tracking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Prospect Requirements */}
          <div className="requirements-section">
            <h4>
              <FontAwesomeIcon icon={faUsers} />
              <span>Your Prospect Requirements</span>
            </h4>
            
            <div className="requirements-cards">
              <div className="requirement-card">
                <div className="requirement-label">Annual Clients Needed</div>
                <div className="requirement-value">{formatNumber(results.clientsPerYear)}</div>
                <div className="requirement-sub">
                  {formData.clientsPerWeek} clients per week
                </div>
              </div>
              
              <div className="requirement-card">
                <div className="requirement-label">Prospects Needed</div>
                <div className="requirement-value">{formatNumber(prospectData.prospectsNeeded)}</div>
                <div className="requirement-sub">
                  At 10% conversion rate
                </div>
              </div>
              
              <div className="requirement-card">
                <div className="requirement-label">Weekly Prospects</div>
                <div className="requirement-value">
                  {formatNumber(Math.ceil(prospectData.prospectsNeeded / 52))}
                </div>
                <div className="requirement-sub">
                  To meet annual goals
                </div>
              </div>
            </div>
          </div>

          {/* Prospect List Preview */}
          <div className="prospect-preview">
            <div className="preview-header">
              <h4>
                <FontAwesomeIcon icon={faSearch} />
                <span>Prospect List Preview</span>
              </h4>
              
              <div className="preview-controls">
                <div className="control-group">
                  <label>Sample Prospects:</label>
                  <input
                    type="number"
                    value={prospectCount}
                    onChange={(e) => setProspectCount(Math.max(1, Math.min(100, Number(e.target.value))))}
                    min="1"
                    max="100"
                  />
                </div>
                
                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={includeTips}
                      onChange={(e) => setIncludeTips(e.target.checked)}
                    />
                    Include Tips
                  </label>
                </div>
              </div>
            </div>
            
            <div className="preview-table-container">
              <table className="prospect-table">
                <thead>
                  <tr>
                    {prospectData.template.fields.map((field, index) => (
                      <th key={index}>{field}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {prospectData.prospects.map((prospect) => (
                    <tr key={prospect.id}>
                      <td>
                        <div className="prospect-name">
                          <strong>{prospect.name}</strong>
                          <span className="prospect-priority">{prospect.priority}</span>
                        </div>
                      </td>
                      <td>{prospect.phone}</td>
                      <td>{prospect.email}</td>
                      {selectedTemplate === "detailed" && (
                        <>
                          <td>{prospect.age}</td>
                          <td>{prospect.income}</td>
                          <td>{prospect.need}</td>
                        </>
                      )}
                      {selectedTemplate === "advanced" && (
                        <>
                          <td>{prospect.need}</td>
                          <td>Next Week</td>
                          <td>
                            <span className={`status-${prospect.status.toLowerCase().replace(/\s+/g, '-')}`}>
                              {prospect.status}
                            </span>
                          </td>
                          <td>
                            <span className={`priority-${prospect.priority.toLowerCase()}`}>
                              {prospect.priority}
                            </span>
                          </td>
                        </>
                      )}
                      <td>
                        <span className={`status-${prospect.status.toLowerCase().replace(/\s+/g, '-')}`}>
                          {prospect.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {includeTips && (
              <div className="prospecting-tips">
                <h5>Prospecting Tips:</h5>
                <ul>
                  <li>Follow up within 24 hours of initial contact</li>
                  <li>Personalize your approach based on prospect's needs</li>
                  <li>Use a CRM system to track all interactions</li>
                  <li>Set clear next steps after each contact</li>
                  <li>Focus on building relationships, not just making sales</li>
                </ul>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="prospect-actions">
            <h4>
              <FontAwesomeIcon icon={faUserPlus} />
              <span>Export Your Template</span>
            </h4>
            
            <div className="action-buttons">
              <button className="action-btn download" onClick={handleDownload}>
                <FontAwesomeIcon icon={faDownload} />
                Download JSON
              </button>
              
              <button className="action-btn copy" onClick={handleCopy}>
                <FontAwesomeIcon icon={faCopy} />
                Copy to Clipboard
              </button>
              
              <button className="action-btn print" onClick={handlePrint}>
                <FontAwesomeIcon icon={faPrint} />
                Print Preview
              </button>
            </div>
            
            <div className="export-options">
              <h5>Recommended Tools:</h5>
              <div className="tools-list">
                <div className="tool">
                  <strong>CRM Software:</strong> Salesforce, HubSpot, Zoho CRM
                </div>
                <div className="tool">
                  <strong>Spreadsheets:</strong> Excel, Google Sheets (use our template)
                </div>
                <div className="tool">
                  <strong>Mobile Apps:</strong> Contact management apps for on-the-go tracking
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
        <button className="btn-complete" onClick={() => alert("Congratulations! You've completed your business plan.")}>
          Complete Your Business Plan
        </button>   
      </div>
    </div>
  );
};

export default Step9;   