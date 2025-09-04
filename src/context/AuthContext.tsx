import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { dummyUser } from '../utils/dummyData';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  adminLogin: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate login with dummy data
    if (email && password) {
      setUser(dummyUser);
      setIsAdmin(false);
      return true;
    }
    return false;
  };

  const adminLogin = async (username: string, password: string): Promise<boolean> => {
    // Fixed admin credentials for demo
    if (username === 'admin' && password === 'password123') {
      setUser({ ...dummyUser, name: 'Admin User' });
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, adminLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};