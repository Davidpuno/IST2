import React, { useState } from 'react';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import Step6 from './components/Step6';
import ResultsStep from './components/ResultsStep';
import ProgressBar from './components/ProgressBar';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    monthlyIncomeGoal: '100000',
    averageCaseSize: '100000',
    rampUp: 'midlevel',
    selectedLicenses: ['AZ'],
    effortAllocation: {},
    isRecruitingAgent: false
  });

  const next = () => {
    if (currentStep === 4 && formData.selectedLicenses.length < 2) {
      setCurrentStep(6);
    } else if (currentStep === 5 && formData.selectedLicenses.length < 2) {
      setCurrentStep(6);
    } else {
      setCurrentStep(prev => Math.min(prev + 1, 7));
    }
  };

  const back = () => {
    if (currentStep === 6 && formData.selectedLicenses.length < 2) {
      setCurrentStep(4);
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }
  };

  const reset = () => {
    setCurrentStep(1);
    setFormData({
      monthlyIncomeGoal: '100000',
      averageCaseSize: '100000',
      rampUp: 'midlevel',
      selectedLicenses: ['AZ'],
      effortAllocation: {},
      isRecruitingAgent: false
    });
  };

  const canGoNext = () => {
    switch(currentStep) {
      case 1: return !!formData.monthlyIncomeGoal;
      case 2: return !!formData.averageCaseSize;
      case 3: return !!formData.rampUp;
      case 4: return formData.selectedLicenses.length > 0;
      case 5: 
        if (formData.selectedLicenses.length < 2) return true;
        const total = Object.values(formData.effortAllocation).reduce((sum, val) => sum + (val || 0), 0);
        return Math.abs(total - 100) < 0.1;
      case 6: return formData.isRecruitingAgent !== undefined;
      default: return true;
    }
  };

  const renderStep = () => {
    const stepProps = {
      formData,
      setFormData,
      next,
      back,
      canGoNext: () => canGoNext()
    };

    switch(currentStep) {
      case 1: return <Step1 {...stepProps} />;
      case 2: return <Step2 {...stepProps} />;
      case 3: return <Step3 {...stepProps} />;
      case 4: return <Step4 {...stepProps} />;
      case 5: return <Step5 {...stepProps} />;
      case 6: return <Step6 {...stepProps} />;
      case 7: return <ResultsStep formData={formData} reset={reset} setShowModal={() => alert('Download feature would open here')} />;
      default: return <Step1 {...stepProps} />;
    }
  };

  return (
    <div className="app">
      <div className="container">
        <ProgressBar currentStep={currentStep} totalSteps={7} />
        {renderStep()}
      </div>
    </div>
  );
}

export default App;