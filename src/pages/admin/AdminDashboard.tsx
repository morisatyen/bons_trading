import React from 'react';
import { Users, Shield, FileText, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Customers', value: '2,847', change: '+12%', icon: Users, color: 'blue' },
    { title: 'Pending KYC', value: '23', change: '-8%', icon: Shield, color: 'yellow' },
    { title: 'Active Trades', value: '1,429', change: '+18%', icon: TrendingUp, color: 'green' },
    { title: 'Total Revenue', value: '$847K', change: '+25%', icon: FileText, color: 'purple' }
  ];

  const recentAlerts = [
    { type: 'warning', message: '5 KYC documents require review', time: '2 hours ago' },
    { type: 'info', message: 'Monthly report generated', time: '4 hours ago' },
    { type: 'success', message: 'System backup completed', time: '6 hours ago' }
  ];

  const pendingActions = [
    { title: 'KYC Reviews', count: 23, action: () => navigate('/admin/kyc') },
    { title: 'Customer Support Tickets', count: 8, action: () => navigate('/admin/support') },
    { title: 'Billing Issues', count: 3, action: () => navigate('/admin/billing') }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-300">
          Monitor and manage all aspects of the Bons-AI trading platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-full flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Actions */}
        <Card>
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Pending Actions</h3>
          </div>
          <div className="p-6 space-y-4">
            {pendingActions.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.count} items require attention</p>
                </div>
                <Button variant="outline" size="sm" onClick={item.action}>
                  Review
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
          </div>
          <div className="p-6 space-y-4">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="mt-0.5">
                  {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                  {alert.type === 'info' && <FileText className="w-5 h-5 text-blue-500" />}
                  {alert.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Access */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Access</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              fullWidth 
              onClick={() => navigate('/admin/customers')}
              className="justify-start p-6 h-auto"
            >
              <Users className="w-6 h-6 mr-3" />
              <div className="text-left">
                <p className="font-medium">Customer Management</p>
                <p className="text-sm text-gray-600">Manage user accounts and subscriptions</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              fullWidth 
              onClick={() => navigate('/admin/kyc')}
              className="justify-start p-6 h-auto"
            >
              <Shield className="w-6 h-6 mr-3" />
              <div className="text-left">
                <p className="font-medium">KYC Verification</p>
                <p className="text-sm text-gray-600">Review identity documents</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              fullWidth 
              onClick={() => navigate('/admin/billing')}
              className="justify-start p-6 h-auto"
            >
              <FileText className="w-6 h-6 mr-3" />
              <div className="text-left">
                <p className="font-medium">Billing & Reports</p>
                <p className="text-sm text-gray-600">Generate statements and invoices</p>
              </div>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};