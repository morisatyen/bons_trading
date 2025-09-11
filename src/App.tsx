import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/layout/Layout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { OnboardingWizard } from './pages/onboarding/OnboardingWizard';

// Customer Pages
import { Dashboard } from './pages/Dashboard';
import { TransactionsPage } from './pages/TransactionsPage';
import { FundingPage } from './pages/FundingPage';
import { SettingsPage } from './pages/SettingsPage';
import { FullChartPage } from './pages/FullChartPage';
import { ContactSupportPage } from './pages/ContactSupportPage';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CustomersPage } from './pages/admin/CustomersPage';
import { KYCPage } from './pages/admin/KYCPage';
import { BillingPage } from './pages/admin/BillingPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode; adminRequired?: boolean }> = ({ 
  children, 
  adminRequired = false 
}) => {
  const { user, isAdmin } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminRequired && !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { user, isAdmin } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={user ? <Navigate to={isAdmin ? "/admin/dashboard" : "/dashboard"} replace /> : <LandingPage />} />
      <Route path="/login" element={user ? <Navigate to={isAdmin ? "/admin/dashboard" : "/dashboard"} replace /> : <LoginPage />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <SignupPage />} />
      <Route path="/onboarding" element={user ? <Navigate to="/dashboard" replace /> : <OnboardingWizard />} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={isAdmin ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />} />
      <Route path="/admin/dashboard" element={
        <ProtectedRoute adminRequired>
          <Layout title="Admin Dashboard">
            <AdminDashboard />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/admin/customers" element={
        <ProtectedRoute adminRequired>
          <Layout title="Customer Management">
            <CustomersPage />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/admin/kyc" element={
        <ProtectedRoute adminRequired>
          <Layout title="KYC Verification">
            <KYCPage />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/admin/billing" element={
        <ProtectedRoute adminRequired>
          <Layout title="Billing & Invoices">
            <BillingPage />
          </Layout>
        </ProtectedRoute>
      } />
      
      {/* Customer Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/transactions" element={
        <ProtectedRoute>
          <Layout title="Transactions">
            <TransactionsPage />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/funding" element={
        <ProtectedRoute>
          <Layout title="Add Funds">
            <FundingPage />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <Layout title="Settings">
            <SettingsPage />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/support" element={
        <ProtectedRoute>
          <Layout title="Contact Support">
            <ContactSupportPage />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/chart/:symbol" element={
        <ProtectedRoute>
          <FullChartPage />
        </ProtectedRoute>
      } />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;