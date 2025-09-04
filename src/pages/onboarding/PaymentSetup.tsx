import React, { useState } from 'react';
import { CreditCard, Building2, Shield } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { useOnboarding } from '../../context/OnboardingContext';

export const PaymentSetup: React.FC = () => {
  const { updateData, nextStep, prevStep } = useOnboarding();
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [formData, setFormData] = useState({
    accountNumber: '',
    routingNumber: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateData({ 
      paymentInfo: {
        accountNumber: formData.accountNumber,
        routingNumber: formData.routingNumber
      }
    });
    nextStep();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Setup</h2>
        <p className="text-gray-600">
          Set up your payment method for your free trial subscription and future funding
        </p>
      </div>

      <Card>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Payment Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setPaymentMethod('bank')}
              className={`
                p-4 border-2 rounded-lg text-left transition-all duration-200
                ${paymentMethod === 'bank' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <Building2 className={`w-6 h-6 mb-2 ${paymentMethod === 'bank' ? 'text-blue-600' : 'text-gray-400'}`} />
              <h4 className="font-medium text-gray-900">Bank Account</h4>
              <p className="text-sm text-gray-600">Direct bank transfer (recommended)</p>
            </button>
            
            <button
              onClick={() => setPaymentMethod('card')}
              className={`
                p-4 border-2 rounded-lg text-left transition-all duration-200
                ${paymentMethod === 'card' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <CreditCard className={`w-6 h-6 mb-2 ${paymentMethod === 'card' ? 'text-blue-600' : 'text-gray-400'}`} />
              <h4 className="font-medium text-gray-900">Credit/Debit Card</h4>
              <p className="text-sm text-gray-600">Instant setup and funding</p>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {paymentMethod === 'bank' ? (
            <>
              <Input
                label="Account Number"
                value={formData.accountNumber}
                onChange={(value) => setFormData({ ...formData, accountNumber: value })}
                placeholder="Enter your account number"
                required
              />
              <Input
                label="Routing Number"
                value={formData.routingNumber}
                onChange={(value) => setFormData({ ...formData, routingNumber: value })}
                placeholder="Enter your routing number"
                required
              />
            </>
          ) : (
            <>
              <Input
                label="Card Number"
                value={formData.cardNumber}
                onChange={(value) => setFormData({ ...formData, cardNumber: value })}
                placeholder="1234 5678 9012 3456"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  value={formData.expiryDate}
                  onChange={(value) => setFormData({ ...formData, expiryDate: value })}
                  placeholder="MM/YY"
                  required
                />
                <Input
                  label="CVV"
                  value={formData.cvv}
                  onChange={(value) => setFormData({ ...formData, cvv: value })}
                  placeholder="123"
                  required
                />
              </div>
            </>
          )}

          <Card className="bg-blue-50 border-blue-200">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Secure & Encrypted</h4>
                <p className="text-sm text-blue-700">
                  Your payment information is encrypted and secure. We use bank-level security 
                  and never store your full payment details.
                </p>
              </div>
            </div>
          </Card>

          <div className="flex space-x-4">
            <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
              Back
            </Button>
            <Button type="submit" className="flex-1">
              Continue
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};