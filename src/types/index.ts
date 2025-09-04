export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  country: string;
  kycStatus: 'pending' | 'verified' | 'rejected';
  subscriptionStatus: 'active' | 'inactive' | 'trial';
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  createdAt: string;
}

export interface Portfolio {
  totalValue: number;
  totalReturn: number;
  returnPercentage: number;
  availableFunds: number;
  turingTokens: number;
  linkedAccounts: number;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'deposit' | 'withdrawal';
  asset: string;
  amount: number;
  price: number;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  fees: number;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  kycStatus: 'pending' | 'verified' | 'rejected';
  subscriptionStatus: 'active' | 'inactive' | 'trial';
  joinedDate: string;
  totalValue: number;
}