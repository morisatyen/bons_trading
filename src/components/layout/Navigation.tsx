import React from 'react';
import { BarChart3, DollarSign, FileText, Settings, Users, Shield, CreditCard } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const customerNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/dashboard' },
  { id: 'transactions', label: 'Transactions', icon: FileText, path: '/transactions' },
  { id: 'funding', label: 'Add Funds', icon: DollarSign, path: '/funding' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' }
];

const adminNavItems = [
  { id: 'admin-dashboard', label: 'Dashboard', icon: BarChart3, path: '/admin/dashboard' },
  { id: 'customers', label: 'Customers', icon: Users, path: '/admin/customers' },
  { id: 'kyc', label: 'KYC Review', icon: Shield, path: '/admin/kyc' },
  { id: 'billing', label: 'Billing', icon: CreditCard, path: '/admin/billing' }
];

export const Navigation: React.FC = () => {
  const { isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = isAdmin ? adminNavItems : customerNavItems;

  return (
    <nav className="bg-white border-r border-gray-200 w-64 min-h-screen p-4">
      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`
                w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left
                transition-all duration-200 group
                ${isActive 
                  ? 'bg-blue-50 text-blue-700 shadow-sm' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};