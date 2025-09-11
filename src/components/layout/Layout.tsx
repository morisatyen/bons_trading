import React, { useState } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { useAuth } from '../../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const { user } = useAuth();  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!user) {
    return <>{children}</>;
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

 
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={title} onMenuToggle={toggleMobileMenu} />
      <div className="flex">
        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <Navigation />
        </div>
        
        {/* Mobile Navigation */}
        <Navigation 
          isOpen={isMobileMenuOpen} 
          onClose={closeMobileMenu}
        />
        
        <div className="hidden lg:block">
          <Navigation />
        </div>
        
        {/* Mobile Navigation */}
        <Navigation 
          isOpen={isMobileMenuOpen} 
          onClose={closeMobileMenu}
        />
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};