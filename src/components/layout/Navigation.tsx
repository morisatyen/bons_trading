import React from 'react';
import { BarChart3, DollarSign, FileText, Settings, Users, Shield, CreditCard, MessageCircle, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const customerNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/dashboard' },
  { id: 'transactions', label: 'Transactions', icon: FileText, path: '/transactions' },
  { id: 'funding', label: 'Add Funds', icon: DollarSign, path: '/funding' },
  { id: 'support', label: 'Contact Support', icon: MessageCircle, path: '/support' },
  { id: 'support', label: 'Contact Support', icon: MessageCircle, path: '/support' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' }
];

const adminNavItems = [
  { id: 'admin-dashboard', label: 'Dashboard', icon: BarChart3, path: '/admin/dashboard' },
  { id: 'customers', label: 'Customers', icon: Users, path: '/admin/customers' },
  { id: 'kyc', label: 'KYC Review', icon: Shield, path: '/admin/kyc' },
  { id: 'billing', label: 'Billing', icon: CreditCard, path: '/admin/billing' },
  { id: 'support', label: 'Contact Support', icon: MessageCircle, path: '/support' }
  { id: 'support', label: 'Contact Support', icon: MessageCircle, path: '/support' }
];

interface NavigationProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isOpen = true, onClose }) => {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isOpen = true, onClose }) => {
  const { isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = isAdmin ? adminNavItems : customerNavItems;

  const handleNavClick = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && onClose && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Navigation Drawer */}
      <nav className={`
        bg-white border-r border-gray-200 min-h-screen p-4 z-50
        lg:relative lg:translate-x-0 lg:w-64
        ${onClose ? 'fixed top-0 left-0 w-80 md:w-72 transform transition-transform duration-300 ease-in-out' : 'w-64'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Mobile Close Button */}
        {onClose && (
          <div className="lg:hidden flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                {isAdmin ? 'Admin' : 'Bons-AI'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        )}
        
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
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
    </>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        )}
        
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
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
    </>
  );
};