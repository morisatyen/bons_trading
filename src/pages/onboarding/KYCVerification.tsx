import React, { useState } from 'react';
import { Upload, Camera, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useOnboarding } from '../../context/OnboardingContext';

export const KYCVerification: React.FC = () => {
  const { nextStep, prevStep } = useOnboarding();
  const [uploadedDocs, setUploadedDocs] = useState({
    id: false,
    address: false,
    selfie: false
  });

  const handleFileUpload = (docType: keyof typeof uploadedDocs) => {
    // Simulate file upload
    setUploadedDocs(prev => ({ ...prev, [docType]: true }));
  };

  const handleNext = () => {
    if (uploadedDocs.id && uploadedDocs.address && uploadedDocs.selfie) {
      nextStep();
    }
  };

  const allUploaded = uploadedDocs.id && uploadedDocs.address && uploadedDocs.selfie;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Identity Verification</h2>
        <p className="text-gray-600">
          We need to verify your identity to comply with financial regulations. 
          This process is secure and typically takes 1-2 business days.
        </p>
      </div>

      <div className="space-y-6">
        {/* Status Tracker */}
        <Card className="bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">Verification Status</h3>
                <p className="text-sm text-blue-700">Pending Document Review</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
              In Progress
            </span>
          </div>
        </Card>

        {/* Document Upload */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
          
          <div className="space-y-4">
            {/* ID Document */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Government ID</h4>
                {uploadedDocs.id && <CheckCircle className="w-5 h-5 text-green-500" />}
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Upload a clear photo of your driver's license, passport, or national ID
              </p>
              <Button 
                variant={uploadedDocs.id ? 'success' : 'outline'} 
                size="sm"
                onClick={() => handleFileUpload('id')}
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploadedDocs.id ? 'Uploaded ✓' : 'Upload Document'}
              </Button>
            </div>

            {/* Address Proof */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Proof of Address</h4>
                {uploadedDocs.address && <CheckCircle className="w-5 h-5 text-green-500" />}
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Upload a utility bill, bank statement, or lease agreement (less than 3 months old)
              </p>
              <Button 
                variant={uploadedDocs.address ? 'success' : 'outline'} 
                size="sm"
                onClick={() => handleFileUpload('address')}
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploadedDocs.address ? 'Uploaded ✓' : 'Upload Document'}
              </Button>
            </div>

            {/* Selfie Verification */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Identity Selfie</h4>
                {uploadedDocs.selfie && <CheckCircle className="w-5 h-5 text-green-500" />}
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Take a clear selfie holding your government ID next to your face
              </p>
              <Button 
                variant={uploadedDocs.selfie ? 'success' : 'outline'} 
                size="sm"
                onClick={() => handleFileUpload('selfie')}
              >
                <Camera className="w-4 h-4 mr-2" />
                {uploadedDocs.selfie ? 'Captured ✓' : 'Take Selfie'}
              </Button>
            </div>
          </div>
        </Card>

        {allUploaded && (
          <Card className="bg-green-50 border-green-200">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div>
                <h3 className="font-semibold text-green-900">All Documents Uploaded</h3>
                <p className="text-sm text-green-700">
                  Your documents have been submitted for review. We'll notify you once verification is complete.
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="flex space-x-4">
          <Button variant="outline" onClick={prevStep} className="flex-1">
            Back
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={!allUploaded}
            className="flex-1"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};