import React from 'react';
import { CheckCircle, ArrowRight, DollarSign, Link2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useOnboarding } from '../../context/OnboardingContext';

export const SuccessConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useOnboarding();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Bons-AI!</h2>
        <p className="text-lg text-gray-600">
          Your account has been successfully set up. You're now ready to start trading 
          with AI-powered insights.
        </p>
      </div>

      <Card>
        <div className="space-y-6">
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Name</span>
                <span className="font-medium text-gray-900">{data.personalDetails?.name}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Email</span>
                <span className="font-medium text-gray-900">{data.personalDetails?.email}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Risk Profile</span>
                <span className="font-medium text-gray-900 capitalize">{data.riskProfile}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">KYC Status</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                  Under Review
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Free Trades Remaining</span>
                <span className="font-medium text-green-600">100</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-2">Next Steps</h4>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Start with our $10,000 virtual trading account</li>
              <li>• Complete KYC verification for full access</li>
              <li>• Add funds or link your existing brokerage accounts</li>
              <li>• Explore our AI trading recommendations</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              fullWidth 
              onClick={() => navigate('/funding')}
              className="flex items-center justify-center"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Add Funds
            </Button>
            <Button 
              variant="outline" 
              fullWidth
              onClick={() => navigate('/funding')}
              className="flex items-center justify-center"
            >
              <Link2 className="w-4 h-4 mr-2" />
              Link Accounts
            </Button>
          </div>

          <Button size="lg" fullWidth onClick={handleGetStarted}>
            Go to Dashboard
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
};