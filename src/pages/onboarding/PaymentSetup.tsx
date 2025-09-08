import React, { useState } from 'react';
import { Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { useOnboarding } from '../../context/OnboardingContext';

export const PaymentSetup: React.FC = () => {
  const { updateData, nextStep, prevStep } = useOnboarding();
  const [showWiseFlow, setShowWiseFlow] = useState(false);
  const [wiseStep, setWiseStep] = useState(0);
  const [email, setEmail] = useState('');

  const handleWisePayment = () => {
    setShowWiseFlow(true);
    setWiseStep(1);
    
    // Simulate Wise redirect
    setTimeout(() => {
      setWiseStep(2);
    }, 2000);
    
    // Simulate payment completion
    setTimeout(() => {
      setWiseStep(3);
    }, 4000);
  };

  const handleCompletePayment = () => {
    updateData({ 
      paymentInfo: {
        method: 'wise',
        email: email,
        status: 'completed'
      }
    });
    nextStep();
  };

  const WisePaymentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="max-w-md w-full mx-4">
        <div className="p-6 text-center">
          {wiseStep === 1 && (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Redirecting to Wise...</h3>
              <p className="text-gray-600">Please wait while we redirect you to Wise for secure payment processing.</p>
            </>
          )}
          
          {wiseStep === 2 && (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="animate-pulse rounded-full h-8 w-8 bg-green-600"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Payment...</h3>
              <p className="text-gray-600">Your payment is being processed securely through Wise.</p>
            </>
          )}
          
          {wiseStep === 3 && (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">Payment Successful!</h3>
              <p className="text-gray-600 mb-4">Your payment has been processed successfully through Wise.</p>
              <div className="bg-green-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-green-700">
                  <strong>Transaction ID:</strong> WSE-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>
              <Button onClick={handleCompletePayment} fullWidth className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center">
                Continue Setup
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Setup</h2>
        <p className="text-gray-600">
          Set up Wise as your secure payment method for funding your account
        </p>
      </div>

      <Card>
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Pay with Wise</h3>
            <p className="text-gray-600 mb-6">
              Securely transfer funds with Wise's trusted international payment platform. 
              Low fees, fast transfers, and bank-level security.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900">Why Wise?</h4>
                <ul className="text-sm text-green-700 mt-1 space-y-1">
                  <li>• Up to 8x cheaper than traditional banks</li>
                  <li>• Real exchange rates with no hidden fees</li>
                  <li>• Fast, secure international transfers</li>
                  <li>• Regulated by financial authorities worldwide</li>
                </ul>
              </div>
            </div>
          </div>

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Enter your email for Wise notifications"
            required
          />

          <Card className="bg-blue-50 border-blue-200">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Secure & Encrypted</h4>
                <p className="text-sm text-blue-700">
                  Your payment will be processed securely through Wise's encrypted platform. 
                  We never store your banking details.
                  Your payment information is encrypted and secure. We use bank-level security 
                </p>
              </div>
            </div>
          </Card>

          <div className="flex space-x-4">
            <Button variant="outline" onClick={prevStep} className="flex-1">
              Back
            </Button>
            <Button 
              onClick={handleWisePayment} 
              disabled={!email}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
            >
              Pay with Wise
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
      
      {showWiseFlow && <WisePaymentModal />}
    </div>
  );
};