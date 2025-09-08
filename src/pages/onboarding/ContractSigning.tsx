import React, { useState } from 'react';
import { FileText, Shield, Eye, Download } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useOnboarding } from '../../context/OnboardingContext';

export const ContractSigning: React.FC = () => {
  const { updateData, nextStep, prevStep } = useOnboarding();
  const [agreed, setAgreed] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);

  const handleSign = () => {
    updateData({ contractSigned: true });
    nextStep();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Agreement</h2>
        <p className="text-gray-600">
          Please review and sign the trading service agreement to continue
        </p>
      </div>

      <Card>
        <div className="space-y-6">
          {/* Contract Preview */}
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Bons-AI Trading Agreement</h3>
            </div>
            
            <div className="bg-white rounded-lg p-4 max-h-64 overflow-y-auto border">
              <div className="space-y-4 text-sm text-gray-700">
                <section>
                  <h4 className="font-semibold mb-2">1. Trading Services</h4>
                  <p>
                    Bons-AI provides AI-powered trading insights and execution services. 
                    All trades are executed at your discretion based on our recommendations.
                  </p>
                </section>
                
                <section>
                  <h4 className="font-semibold mb-2">2. Risk Disclosure</h4>
                  <p>
                    Trading involves substantial risk of loss. Past performance does not 
                    guarantee future results. Never invest more than you can afford to lose.
                  </p>
                </section>
                
                <section>
                  <h4 className="font-semibold mb-2">3. Fees and Charges</h4>
                  <p>
                    Our fee structure is transparent with no hidden charges. 
                    Standard trading fees apply after your first 100 free trades.
                  </p>
                </section>
                
                <section>
                  <h4 className="font-semibold mb-2">4. Account Security</h4>
                  <p>
                    You are responsible for maintaining the confidentiality of your account 
                    credentials and all activities under your account.
                  </p>
                </section>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => setIsReviewing(true)} className='flex items-center space-x-2'>
              <Eye className="w-4 h-4 mr-2" />
              Review Full Contract
            </Button>
            <Button variant="outline" className='flex items-center space-x-2'>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>

          {/* Security Notice */}
          <Card className="bg-green-50 border-green-200">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900">Secure Electronic Signature</h4>
                <p className="text-sm text-green-700">
                  Your digital signature is legally binding and secured with advanced encryption. 
                  This process is equivalent to DocuSign's security standards.
                </p>
              </div>
            </div>
          </Card>

          {/* Agreement Checkbox */}
          <div className="bg-gray-50 rounded-lg p-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                I have read, understood, and agree to the terms and conditions outlined in the 
                Bons-AI Trading Service Agreement. I understand the risks associated with trading 
                and acknowledge that I am entering into this agreement voluntarily.
              </span>
            </label>
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" onClick={prevStep} className="flex-1">
              Back
            </Button>
            <Button 
              onClick={handleSign} 
              disabled={!agreed}
              className="flex-1"
              variant="success"
            >
              Sign Agreement
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};