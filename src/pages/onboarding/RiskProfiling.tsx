import React, { useState } from 'react';
import { TrendingUp, Shield, Zap } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useOnboarding } from '../../context/OnboardingContext';

interface Question {
  id: string;
  question: string;
  options: { value: number; label: string; description: string }[];
}

const questions: Question[] = [
  {
    id: 'experience',
    question: 'What is your trading experience level?',
    options: [
      { value: 1, label: 'Beginner', description: 'New to trading and investing' },
      { value: 2, label: 'Intermediate', description: '1-3 years of experience' },
      { value: 3, label: 'Advanced', description: '3+ years of active trading' }
    ]
  },
  {
    id: 'timeHorizon',
    question: 'What is your typical investment time horizon?',
    options: [
      { value: 1, label: 'Short-term', description: 'Days to weeks' },
      { value: 2, label: 'Medium-term', description: 'Months to 1 year' },
      { value: 3, label: 'Long-term', description: '1+ years' }
    ]
  },
  {
    id: 'riskTolerance',
    question: 'How much portfolio volatility can you tolerate?',
    options: [
      { value: 1, label: 'Low', description: 'Prefer stable, predictable returns' },
      { value: 2, label: 'Moderate', description: 'Accept some ups and downs for better returns' },
      { value: 3, label: 'High', description: 'Comfortable with significant volatility for higher potential gains' }
    ]
  }
];

export const RiskProfiling: React.FC = () => {
  const { updateData, nextStep, prevStep } = useOnboarding();
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateRiskProfile = () => {
    const total = Object.values(answers).reduce((sum, value) => sum + value, 0);
    const average = total / Object.keys(answers).length;
    
    if (average <= 1.5) return 'conservative';
    if (average <= 2.5) return 'moderate';
    return 'aggressive';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const riskProfile = calculateRiskProfile();
    updateData({ riskProfile });
    nextStep();
  };

  const allAnswered = questions.every(q => answers[q.id]);
  const riskProfile = allAnswered ? calculateRiskProfile() : null;

  const riskProfiles = {
    conservative: { icon: Shield, color: 'green', label: 'Conservative', description: 'Focus on capital preservation with steady returns' },
    moderate: { icon: TrendingUp, color: 'blue', label: 'Moderate', description: 'Balanced approach with moderate risk for growth' },
    aggressive: { icon: Zap, color: 'purple', label: 'Aggressive', description: 'High-risk, high-reward growth strategy' }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Investment Risk Profile</h2>
        <p className="text-gray-600">
          Help us understand your investment goals and risk tolerance to provide 
          personalized trading recommendations
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {questions.map((question, index) => (
          <Card key={question.id}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {index + 1}. {question.question}
            </h3>
            <div className="space-y-3">
              {question.options.map((option) => (
                <label
                  key={option.value}
                  className={`
                    block p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                    ${answers[question.id] === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option.value}
                    checked={answers[question.id] === option.value}
                    onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value))}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{option.label}</h4>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                    <div className={`
                      w-5 h-5 rounded-full border-2 transition-all duration-200
                      ${answers[question.id] === option.value
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                      }
                    `}>
                      {answers[question.id] === option.value && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </Card>
        ))}

        {riskProfile && (
          <Card className={`bg-${riskProfiles[riskProfile].color}-50 border-${riskProfiles[riskProfile].color}-200`}>
            <div className="flex items-center space-x-3">
              {React.createElement(riskProfiles[riskProfile].icon, { 
                className: `w-6 h-6 text-${riskProfiles[riskProfile].color}-600` 
              })}
              <div>
                <h4 className={`font-semibold text-${riskProfiles[riskProfile].color}-900`}>
                  Your Risk Profile: {riskProfiles[riskProfile].label}
                </h4>
                <p className={`text-sm text-${riskProfiles[riskProfile].color}-700`}>
                  {riskProfiles[riskProfile].description}
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="flex space-x-4">
          <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
            Back
          </Button>
          <Button type="submit" disabled={!allAnswered} className="flex-1">
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};