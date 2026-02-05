// App.jsx - CLEAN WORKING VERSION
import React, { useState, useEffect } from "react";
import ProgressBar from "./components/ProgressBar";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5 from "./components/Step5";
import Step6 from "./components/Step6";

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  
  const [formData, setFormData] = useState({
    desiredIncome: "",
    selectedLicenses: [],
    effortAllocation: {},
    isRecruitingAgent: null,
  });

  const [results, setResults] = useState(null);

  // Calculate total effort
  const calculateTotalEffort = () => {
    return formData.selectedLicenses.reduce(
      (sum, lic) => sum + (parseFloat(formData.effortAllocation[lic]) || 0),
      0
    );
  };

  const totalEffort = calculateTotalEffort();

  // Format currency helper
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "₱0";
    
    const num = typeof amount === 'string' 
      ? parseInt(amount.replace(/,/g, '')) || 0 
      : Number(amount) || 0;
    
    return `₱${num.toLocaleString('en-PH')}`;
  };

  // Step validation
  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        const incomeNum = parseInt(formData.desiredIncome.replace(/,/g, '')) || 0;
        return incomeNum > 0;
      
      case 2:
        return formData.selectedLicenses.length > 0;
      
      case 3:
        return Math.abs(totalEffort - 100) < 0.01;
      
      case 4:
        return formData.isRecruitingAgent !== null;
      
      case 5:
        return true;
      
      default:
        return false;
    }
  };

  // Navigation
  const nextStep = () => {
    if (currentStep >= totalSteps) return;
    
    if (!canGoNext()) {
      console.log("Cannot proceed - validation failed");
      return;
    }

    // Skip step 4 if only L license is selected
    if (currentStep === 3) {
      const hasOnlyL = formData.selectedLicenses.length === 1 && 
                      formData.selectedLicenses[0] === 'L';
      
      if (hasOnlyL) {
        // Auto-set to false and skip to step 5
        setFormData(prev => ({ 
          ...prev, 
          isRecruitingAgent: false 
        }));
        
        // Calculate results and go to step 5 (Review)
        calculateResults();
        setCurrentStep(5);
        return;
      }
    }

    // Calculate results before final step
    if (currentStep === 5) {
      calculateResults();
    }

    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep <= 1) return;
    
    // If going back from step 5 and we skipped step 4
    if (currentStep === 5) {
      const hasOnlyL = formData.selectedLicenses.length === 1 && 
                      formData.selectedLicenses[0] === 'L';
      
      if (hasOnlyL) {
        // Go back to step 3 (Effort Allocation)
        setCurrentStep(3);
        return;
      }
    }
    
    setCurrentStep(prev => prev - 1);
  };

  // Calculate results
  const calculateResults = () => {
    const baseIncome = parseInt(formData.desiredIncome.replace(/,/g, '')) || 0;
    const breakdown = {};
    let totalIncome = 0;

    if (formData.isRecruitingAgent === true) {
      // Personal income only mode
      totalIncome = baseIncome;
    } else {
      // Calculate per license
      formData.selectedLicenses.forEach(license => {
        const effort = parseFloat(formData.effortAllocation[license]) || 0;
        const licenseIncome = (baseIncome * effort) / 100;
        breakdown[license] = licenseIncome;
        totalIncome += licenseIncome;
      });
    }

    setResults({
      breakdown,
      totalIncome,
      personalIncomeOnly: formData.isRecruitingAgent === true,
    });
  };

  // Reset
  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      desiredIncome: "",
      selectedLicenses: [],
      effortAllocation: {},
      isRecruitingAgent: null,
    });
    setResults(null);
  };

  // Render step
  const renderStep = () => {
    const commonProps = {
      formData,
      setFormData,
      next: nextStep,
      back: prevStep,
      canGoNext: () => canGoNext(),
      formatCurrency,
      totalEffort,
    };

    switch (currentStep) {
      case 1:
        return <Step1 {...commonProps} />;
      case 2:
        return <Step2 {...commonProps} />;
      case 3:
        return <Step3 {...commonProps} />;
      case 4:
        return <Step4 {...commonProps} />;
      case 5:
        return <Step5 {...commonProps} />;
      case 6:
        return (
          <Step6 
            formData={formData} 
            results={results} 
            formatCurrency={formatCurrency} 
            reset={resetForm} 
          />
        );
      default:
        return <Step1 {...commonProps} />;
    }
  };

  return (
    <div className="container">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      {renderStep()}
    </div>
  );
};

export default App;