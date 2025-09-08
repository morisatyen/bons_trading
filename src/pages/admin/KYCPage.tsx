import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Eye, Download } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

interface KYCSubmission {
  id: string;
  customerName: string;
  email: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: {
    id: boolean;
    address: boolean;
    selfie: boolean;
  };
}

const kycSubmissions: KYCSubmission[] = [
  {
    id: '1',
    customerName: 'Jane Smith',
    email: 'jane.smith@example.com',
    submittedAt: '2024-01-22T10:30:00Z',
    status: 'pending',
    documents: { id: true, address: true, selfie: true }
  },
  {
    id: '2',
    customerName: 'Robert Chen',
    email: 'robert.chen@example.com',
    submittedAt: '2024-01-21T15:45:00Z',
    status: 'pending',
    documents: { id: true, address: true, selfie: false }
  },
  {
    id: '3',
    customerName: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    submittedAt: '2024-01-20T09:15:00Z',
    status: 'approved',
    documents: { id: true, address: true, selfie: true }
  }
];

export const KYCPage: React.FC = () => {
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  const handleApprove = (submissionId: string) => {
    // Simulate approval
    console.log('Approved submission:', submissionId);
  };

  const handleReject = (submissionId: string) => {
    // Simulate rejection
    console.log('Rejected submission:', submissionId, 'Notes:', reviewNotes);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">KYC Verification</h1>
        <p className="text-gray-600">Review and process customer identity verification submissions</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">23</p>
            <p className="text-sm text-gray-600">Pending Review</p>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">1,247</p>
            <p className="text-sm text-gray-600">Approved</p>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">47</p>
            <p className="text-sm text-gray-600">Rejected</p>
          </div>
        </Card>
      </div>

      {/* KYC Submissions */}
      <Card padding="none">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Submissions</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {kycSubmissions.map((submission) => (
            <div key={submission.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Eye className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{submission.customerName}</p>
                    <p className="text-sm text-gray-500">{submission.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(submission.status)}`}>
                    {submission.status}
                  </span>
                  {getStatusIcon(submission.status)}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Document Status */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Documents Submitted</h4>
                  <div className="space-y-2">
                    {[
                      { key: 'id', label: 'Government ID' },
                      { key: 'address', label: 'Proof of Address' },
                      { key: 'selfie', label: 'Identity Selfie' }
                    ].map((doc) => (
                      <div key={doc.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700">{doc.label}</span>
                        <div className="flex items-center space-x-2">
                          {submission.documents[doc.key as keyof typeof submission.documents] ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                          {submission.documents[doc.key as keyof typeof submission.documents] && (
                            <>
                              <Button variant="ghost" size="sm">
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="w-3 h-3" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review Actions */}
                {submission.status === 'pending' && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Review & Decision</h4>
                    <div className="space-y-4">
                      <textarea
                        placeholder="Add review notes (optional)"
                        value={reviewNotes}
                        onChange={(e) => setReviewNotes(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      
                      <div className="flex space-x-3">
                        <Button
                          variant="success"
                          onClick={() => handleApprove(submission.id)}
                          className="flex-1 align-middle flex items-center justify-center"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          variant="error"
                          onClick={() => handleReject(submission.id)}
                          className="flex-1 align-middle flex items-center justify-center"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
                <span>Submitted: {new Date(submission.submittedAt).toLocaleString()}</span>
                {submission.status === 'pending' && (
                  <span className="text-orange-600 font-medium">
                    Awaiting Review
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};