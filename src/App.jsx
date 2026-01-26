import React, { useState, useEffect } from "react";
import "./App.css";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5 from "./components/Step5";
import Step6 from "./components/Step6";
import Step7 from "./components/Step7";
import Step8 from "./components/Step8";
import Step9 from "./components/Step9";
import ProgressBar from "./components/ProgressBar";
import DownloadModal from "./components/DownloadModal";

const App = () => {
  const [step, setStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    desiredIncome: 100000,
    businessType: "Life Insurance",
    license: "GL",
    clientsPerWeek: 5,
    hoursPerWeek: 40,
    isRecruitingAgent: false,
    numberOfRecruits: 0,
    commissionRate: 20,
    overrideRate: 5
  });
  
  const [results, setResults] = useState({
    totalIncome: 0,
    requiredANP: 0,
    commissionEarnings: 0,
    overrideEarnings: 0,
    clientsPerYear: 0,
    hoursPerClient: 0
  });

  const [licenseBreakdown, setLicenseBreakdown] = useState([]);
  const [scenarios, setScenarios] = useState([]);

  // Calculate results whenever form data changes
  useEffect(() => {
    calculateResults();
    calculateLicenseBreakdown();
    generateScenarios();
  }, [formData]);

  const calculateResults = () => {
    const {
      desiredIncome,
      businessType,
      license,
      clientsPerWeek,
      hoursPerWeek,
      isRecruitingAgent,
      numberOfRecruits,
      commissionRate,
      overrideRate
    } = formData;

    // Business type multipliers
    const businessMultipliers = {
      "Life Insurance": 1.2,
      "General Insurance": 1.0,
      "Health Insurance": 1.3,
      "Property & Casualty": 1.1,
      "Annuities": 1.4,
      "Investment Products": 1.5
    };

    // License multipliers
    const licenseMultipliers = {
      "GL": 1.0,   // General License
      "AL": 1.3,   // Advanced License (+30%)
      "L": 1.5     // Leadership License (+50%)
    };

    // Base calculations
    const clientsPerYear = clientsPerWeek * 52;
    const hoursPerClient = hoursPerWeek / clientsPerWeek;
    
    const businessMultiplier = businessMultipliers[businessType] || 1.0;
    const licenseMultiplier = licenseMultipliers[license] || 1.0;
    
    let commissionEarnings = desiredIncome * businessMultiplier * licenseMultiplier;
    let requiredANP = commissionEarnings / (commissionRate / 100);
    
    // Override calculations for L license with recruiting
    let overrideEarnings = 0;
    if (license === "L" && isRecruitingAgent) {
      const baseOverride = commissionEarnings * (overrideRate / 100);
      overrideEarnings = baseOverride * (1 + (numberOfRecruits / 50)); // Scale with recruits
    }
    
    const totalIncome = commissionEarnings + overrideEarnings;

    setResults({
      totalIncome,
      requiredANP,
      commissionEarnings,
      overrideEarnings,
      clientsPerYear,
      hoursPerClient
    });
  };

  const calculateLicenseBreakdown = () => {
    const { desiredIncome, businessType, commissionRate } = formData;
    
    const businessMultipliers = {
      "Life Insurance": 1.2,
      "General Insurance": 1.0,
      "Health Insurance": 1.3,
      "Property & Casualty": 1.1,
      "Annuities": 1.4,
      "Investment Products": 1.5
    };

    const businessMultiplier = businessMultipliers[businessType] || 1.0;
    
    const licenses = [
      { type: "GL", multiplier: 1.0, name: "General License", color: "#3B82F6" },
      { type: "AL", multiplier: 1.3, name: "Advanced License", color: "#10B981" },
      { type: "L", multiplier: 1.5, name: "Leadership License", color: "#F59E0B" }
    ];

    const breakdown = licenses.map(license => {
      const earnings = desiredIncome * businessMultiplier * license.multiplier;
      const requiredANP = earnings / (commissionRate / 100);
      const clientsNeeded = Math.ceil(requiredANP / 50000); // Assuming average premium $50,000
      
      return {
        ...license,
        earnings,
        requiredANP,
        clientsNeeded,
        commission: earnings * (commissionRate / 100)
      };
    });

    setLicenseBreakdown(breakdown);
  };

  const generateScenarios = () => {
    const scenarios = [
      {
        name: "Conservative",
        clientsPerWeek: Math.max(1, formData.clientsPerWeek - 2),
        commissionRate: formData.commissionRate - 2,
        description: "Lower client volume, conservative approach"
      },
      {
        name: "Moderate",
        clientsPerWeek: formData.clientsPerWeek,
        commissionRate: formData.commissionRate,
        description: "Current settings - balanced approach"
      },
      {
        name: "Aggressive",
        clientsPerWeek: formData.clientsPerWeek + 3,
        commissionRate: formData.commissionRate + 3,
        description: "Higher volume with better rates"
      },
      {
        name: "Team Building",
        clientsPerWeek: formData.clientsPerWeek,
        commissionRate: formData.commissionRate,
        recruits: formData.isRecruitingAgent ? formData.numberOfRecruits + 5 : 5,
        description: "Focus on team growth and overrides"
      }
    ];

    setScenarios(scenarios);
  };

  // Navigation
  const next = () => setStep(prev => Math.min(prev + 1, 8)); // 9 steps total (0-8)
  const prev = () => setStep(prev => Math.max(prev - 1, 0));
  const reset = () => {
    setStep(0);
    setFormData({
      desiredIncome: 100000,
      businessType: "Life Insurance",
      license: "GL",
      clientsPerWeek: 5,
      hoursPerWeek: 40,
      isRecruitingAgent: false,
      numberOfRecruits: 0,
      commissionRate: 20,
      overrideRate: 5
    });
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format number
  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  // Render steps based on current step
  const renderStep = () => {
    const sharedProps = {
      formData,
      setFormData,
      step,
      next,
      prev,
      reset,
      formatCurrency,
      formatNumber,
      setShowModal,
      results,
      licenseBreakdown,
      scenarios
    };

    switch(step) {
      case 0: return <Step1 {...sharedProps} />;
      case 1: return <Step2 {...sharedProps} />;
      case 2: return <Step3 {...sharedProps} />;
      case 3: return <Step4 {...sharedProps} />;
      case 4: return <Step5 {...sharedProps} />;
      case 5: return <Step6 {...sharedProps} />;
      case 6: return <Step7 {...sharedProps} />;
      case 7: return <Step8 {...sharedProps} />;
      case 8: return <Step9 {...sharedProps} />;
      default: return <Step1 {...sharedProps} />;
    }
  };

  return (
    <div className="app-container">
      <ProgressBar step={step} totalSteps={9} />
      
      <div className="app-header">
        <h1>Insurance Business Calculator</h1>
        <p>Plan your insurance business success</p>
      </div>

      <div className="app-content">
        {renderStep()}
      </div>

      {showModal && <DownloadModal setShowModal={setShowModal} />}
    </div>
  );
};

export default App;