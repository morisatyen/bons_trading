import React, { useState } from 'react';
import { User, Shield, Bell, CreditCard, Download, Eye, EyeOff } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-600">Manage your profile, security, and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <Card className="lg:col-span-1" padding="none">
          <nav className="p-4 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200
                    ${activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'profile' && (
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-500" />
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF (max 2MB)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      value={user?.name || ''}
                      onChange={() => {}}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      value={user?.email || ''}
                      onChange={() => {}}
                    />
                    <Input
                      label="Phone Number"
                      value={user?.phone || ''}
                      onChange={() => {}}
                    />
                    <Input
                      label="Country"
                      value={user?.country || ''}
                      onChange={() => {}}
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Risk Profile</h3>
                    <Card className="bg-blue-50 border-blue-200">
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-blue-900 capitalize">
                              {user?.riskProfile || 'Moderate'} Risk Tolerance
                            </p>
                            <p className="text-sm text-blue-700">
                              Balanced approach with moderate risk for growth
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Retake Assessment
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <Button className="w-full md:w-auto">Save Changes</Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Password & Authentication</h2>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
                      <div className="grid grid-cols-1 gap-4 max-w-md">
                        <div className="relative">
                          <Input
                            label="Current Password"
                            type={showCurrentPassword ? 'text' : 'password'}
                            placeholder="Enter current password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                          >
                            {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        <div className="relative">
                          <Input
                            label="New Password"
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder="Enter new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                          >
                            {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      <Button>Update Password</Button>
                    </div>

                    <hr className="border-gray-200" />

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">SMS Authentication</p>
                          <p className="text-sm text-gray-600">
                            Get verification codes via text message
                          </p>
                        </div>
                        <button
                          onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                          className={`
                            relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                            ${twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-200'}
                          `}
                        >
                          <span
                            className={`
                              inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                              ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}
                            `}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Connected Devices</h2>
                  <div className="space-y-4">
                    {[
                      { device: 'MacBook Pro', location: 'San Francisco, CA', lastActive: '2 minutes ago', current: true },
                      { device: 'iPhone 15', location: 'San Francisco, CA', lastActive: '1 hour ago', current: false },
                      { device: 'Windows PC', location: 'New York, NY', lastActive: '3 days ago', current: false }
                    ].map((device, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">
                            {device.device} {device.current && <span className="text-green-600">(Current)</span>}
                          </p>
                          <p className="text-sm text-gray-600">{device.location} • Last active {device.lastActive}</p>
                        </div>
                        {!device.current && (
                          <Button variant="outline" size="sm">
                            Revoke
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                <div className="space-y-6">
                  {[
                    { id: 'trading', title: 'Trading Alerts', description: 'Order executions, market movements, and AI recommendations' },
                    { id: 'account', title: 'Account Updates', description: 'Security alerts, profile changes, and verification status' },
                    { id: 'news', title: 'Market News', description: 'Breaking financial news and market analysis' },
                    { id: 'educational', title: 'Educational Content', description: 'Trading tips, webinars, and learning resources' }
                  ].map((notification) => (
                    <div key={notification.id} className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{notification.title}</h3>
                        <p className="text-sm text-gray-600">{notification.description}</p>
                      </div>
                      <div className="ml-4 space-y-2">
                        {['Email', 'SMS', 'Push'].map((method) => (
                          <label key={method} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              defaultChecked={method === 'Email'}
                              className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{method}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="mt-6">Save Preferences</Button>
              </div>
            </Card>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Subscription</h2>
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-green-900">Free Trial Active</h3>
                      <p className="text-sm text-green-700">
                        Your free trial includes 100 commission-free trades
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Billing History</h2>
                  <div className="space-y-4">
                    {[
                      { date: '2024-01-15', description: 'Account Setup', amount: 0, status: 'Completed' },
                      { date: '2024-01-10', description: 'KYC Verification', amount: 0, status: 'Completed' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{item.description}</p>
                          <p className="text-sm text-gray-600">{item.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            {item.amount === 0 ? 'Free' : `$${item.amount}`}
                          </p>
                          <p className="text-sm text-green-600">{item.status}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};