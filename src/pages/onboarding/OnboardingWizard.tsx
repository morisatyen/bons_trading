import React from 'react';
import { useOnboarding, OnboardingProvider } from '../../context/OnboardingContext';
import { ProgressStepper } from '../../components/onboarding/ProgressStepper';
import { PersonalDetails } from './PersonalDetails';
import { KYCVerification } from './KYCVerification';
import { PaymentSetup } from './PaymentSetup';
import { ContractSigning } from './ContractSigning';
import { RiskProfiling } from './RiskProfiling';
import { SuccessConfirmation } from './SuccessConfirmation';

const steps = [
  { id: 0, title: 'Personal Details', description: 'Basic information' },
  { id: 1, title: 'KYC Verification', description: 'Identity verification' },
  { id: 2, title: 'Payment Setup', description: 'Payment method' },
  { id: 3, title: 'Agreement', description: 'Service contract' },
  { id: 4, title: 'Risk Profile', description: 'Investment preferences' },
  { id: 5, title: 'Complete', description: 'Account ready' }
];

const OnboardingContent: React.FC = () => {
  const { currentStep } = useOnboarding();

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <PersonalDetails />;
      case 1: return <KYCVerification />;
      case 2: return <PaymentSetup />;
      case 3: return <ContractSigning />;
      case 4: return <RiskProfiling />;
      case 5: return <SuccessConfirmation />;
      default: return <PersonalDetails />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {currentStep < 5 && (
          <ProgressStepper 
            steps={steps} 
            currentStep={currentStep} 
            completedSteps={Array.from({ length: currentStep }, (_, i) => i)}
          />
        )}
        {renderStep()}
      </div>
    </div>
  );
};

export const OnboardingWizard: React.FC = () => {
  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  );
};