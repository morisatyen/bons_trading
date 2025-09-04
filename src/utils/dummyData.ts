import { User, Portfolio, Transaction, AdminCustomer } from '../types';

export const dummyUser: User = {
  id: '1',
  email: 'john.doe@example.com',
  name: 'John Doe',
  phone: '+1-555-0123',
  country: 'United States',
  kycStatus: 'verified',
  subscriptionStatus: 'active',
  riskProfile: 'moderate',
  createdAt: '2024-01-15T08:00:00Z'
};

export const dummyPortfolio: Portfolio = {
  totalValue: 125430.50,
  totalReturn: 12430.50,
  returnPercentage: 11.2,
  availableFunds: 25430.50,
  turingTokens: 1250,
  linkedAccounts: 2
};

export const dummyTransactions: Transaction[] = [
  {
    id: '1',
    type: 'buy',
    asset: 'AAPL',
    amount: 100,
    price: 150.25,
    status: 'completed',
    timestamp: '2024-01-20T14:30:00Z',
    fees: 2.50
  },
  {
    id: '2',
    type: 'sell',
    asset: 'TSLA',
    amount: 50,
    price: 220.80,
    status: 'completed',
    timestamp: '2024-01-19T11:15:00Z',
    fees: 1.75
  },
  {
    id: '3',
    type: 'deposit',
    asset: 'USD',
    amount: 5000,
    price: 1,
    status: 'completed',
    timestamp: '2024-01-18T09:00:00Z',
    fees: 0
  },
  {
    id: '4',
    type: 'buy',
    asset: 'BTC',
    amount: 0.5,
    price: 42500.00,
    status: 'pending',
    timestamp: '2024-01-21T16:45:00Z',
    fees: 15.00
  }
];

export const dummyAdminCustomers: AdminCustomer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    kycStatus: 'verified',
    subscriptionStatus: 'active',
    joinedDate: '2024-01-15',
    totalValue: 125430.50
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    kycStatus: 'pending',
    subscriptionStatus: 'trial',
    joinedDate: '2024-01-20',
    totalValue: 15000.00
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    kycStatus: 'verified',
    subscriptionStatus: 'active',
    joinedDate: '2024-01-10',
    totalValue: 89750.25
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    kycStatus: 'rejected',
    subscriptionStatus: 'inactive',
    joinedDate: '2024-01-22',
    totalValue: 0
  }
];

export const portfolioChartData = [
  { name: 'Jan', value: 100000 },
  { name: 'Feb', value: 105000 },
  { name: 'Mar', value: 108000 },
  { name: 'Apr', value: 112000 },
  { name: 'May', value: 118000 },
  { name: 'Jun', value: 125430 }
];