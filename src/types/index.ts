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

export interface Stock {
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  sector: string;
}

export interface MarketDepth {
  bids: { price: number; quantity: number }[];
  asks: { price: number; quantity: number }[];
}

export interface Position {
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
}

export interface Order {
  id: string;
  symbol: string;
  type: 'market' | 'limit' | 'sl';
  side: 'buy' | 'sell';
  quantity: number;
  price?: number;
  productType: 'CNC' | 'MIS' | 'BO' | 'CO';
  validity: 'DAY' | 'IOC';
  status: 'pending' | 'executed' | 'cancelled';
  timestamp: string;
}

export interface WatchlistItem {
  symbol: string;
  addedAt: string;
}

export interface Holding {
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  currentValue: number;
  pnl: number;
  pnlPercent: number;
  lastUpdated: string;
}

export interface TradeHistory {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  date: string;
  total: number;
}