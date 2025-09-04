import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OnboardingData {
  personalDetails?: {
    country: string;
    name: string;
    email: string;
    phone: string;
  };
  kycStatus?: 'pending' | 'verified' | 'rejected';
  paymentInfo?: {
    accountNumber: string;
    routingNumber: string;
  };
  contractSigned?: boolean;
  riskProfile?: 'conservative' | 'moderate' | 'aggressive';
}

interface OnboardingContextType {
  data: OnboardingData;
  currentStep: number;
  updateData: (stepData: Partial<OnboardingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

interface OnboardingProviderProps {
  children: ReactNode;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ children }) => {
  const [data, setData] = useState<OnboardingData>({});
  const [currentStep, setCurrentStep] = useState(0);

  const updateData = (stepData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const setStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <OnboardingContext.Provider value={{ 
      data, 
      currentStep, 
      updateData, 
      nextStep, 
      prevStep, 
      setStep 
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};