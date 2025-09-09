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

export const dummyStocks: Stock[] = [
  {
    symbol: 'INFY',
    name: 'Infosys Limited',
    currentPrice: 1456.75,
    change: 23.45,
    changePercent: 1.64,
    volume: 2847563,
    marketCap: '₹6,04,123 Cr',
    sector: 'IT Services'
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    currentPrice: 3542.80,
    change: -45.20,
    changePercent: -1.26,
    volume: 1234567,
    marketCap: '₹12,85,456 Cr',
    sector: 'IT Services'
  },
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    currentPrice: 2456.90,
    change: 67.85,
    changePercent: 2.84,
    volume: 3456789,
    marketCap: '₹16,62,789 Cr',
    sector: 'Oil & Gas'
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Limited',
    currentPrice: 1678.45,
    change: -12.30,
    changePercent: -0.73,
    volume: 1876543,
    marketCap: '₹9,23,456 Cr',
    sector: 'Banking'
  },
  {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Limited',
    currentPrice: 987.60,
    change: 15.75,
    changePercent: 1.62,
    volume: 2345678,
    marketCap: '₹6,89,123 Cr',
    sector: 'Banking'
  },
  {
    symbol: 'WIPRO',
    name: 'Wipro Limited',
    currentPrice: 432.15,
    change: -8.25,
    changePercent: -1.87,
    volume: 1567890,
    marketCap: '₹2,34,567 Cr',
    sector: 'IT Services'
  }
];

export const dummyMarketDepth: Record<string, MarketDepth> = {
  INFY: {
    bids: [
      { price: 1456.70, quantity: 1250 },
      { price: 1456.65, quantity: 2340 },
      { price: 1456.60, quantity: 1890 },
      { price: 1456.55, quantity: 3450 },
      { price: 1456.50, quantity: 2100 }
    ],
    asks: [
      { price: 1456.75, quantity: 1100 },
      { price: 1456.80, quantity: 1750 },
      { price: 1456.85, quantity: 2200 },
      { price: 1456.90, quantity: 1650 },
      { price: 1456.95, quantity: 2850 }
    ]
  },
  TCS: {
    bids: [
      { price: 3542.75, quantity: 850 },
      { price: 3542.70, quantity: 1240 },
      { price: 3542.65, quantity: 1690 },
      { price: 3542.60, quantity: 2150 },
      { price: 3542.55, quantity: 1800 }
    ],
    asks: [
      { price: 3542.80, quantity: 950 },
      { price: 3542.85, quantity: 1350 },
      { price: 3542.90, quantity: 1750 },
      { price: 3542.95, quantity: 1450 },
      { price: 3543.00, quantity: 2250 }
    ]
  },
  RELIANCE: {
    bids: [
      { price: 2456.85, quantity: 1450 },
      { price: 2456.80, quantity: 2150 },
      { price: 2456.75, quantity: 1850 },
      { price: 2456.70, quantity: 2650 },
      { price: 2456.65, quantity: 1950 }
    ],
    asks: [
      { price: 2456.90, quantity: 1250 },
      { price: 2456.95, quantity: 1650 },
      { price: 2457.00, quantity: 2050 },
      { price: 2457.05, quantity: 1750 },
      { price: 2457.10, quantity: 2350 }
    ]
  }
};

export const dummyWatchlist: WatchlistItem[] = [
  { symbol: 'INFY', addedAt: '2024-01-20T10:30:00Z' },
  { symbol: 'TCS', addedAt: '2024-01-19T14:15:00Z' },
  { symbol: 'RELIANCE', addedAt: '2024-01-18T09:45:00Z' }
];

export const dummyHoldings: Holding[] = [
  {
    symbol: 'INFY',
    quantity: 20,
    avgPrice: 1450.30,
    currentPrice: 1456.75,
    currentValue: 29135,
    pnl: 129,
    pnlPercent: 0.44,
    lastUpdated: '2024-01-22T15:30:00Z'
  },
  {
    symbol: 'RELIANCE',
    quantity: 15,
    avgPrice: 2380.45,
    currentPrice: 2456.90,
    currentValue: 36853.50,
    pnl: 1146.75,
    pnlPercent: 3.21,
    lastUpdated: '2024-01-22T15:30:00Z'
  },
  {
    symbol: 'HDFCBANK',
    quantity: 10,
    avgPrice: 1695.20,
    currentPrice: 1678.45,
    currentValue: 16784.50,
    pnl: -167.50,
    pnlPercent: -0.99,
    lastUpdated: '2024-01-22T15:30:00Z'
  }
];

export const dummyTradeHistory: Record<string, TradeHistory[]> = {
  INFY: [
    { id: 'T001', symbol: 'INFY', type: 'buy', quantity: 10, price: 1445.20, date: '2024-01-15', total: 14452 },
    { id: 'T002', symbol: 'INFY', type: 'buy', quantity: 10, price: 1455.40, date: '2024-01-18', total: 14554 },
    { id: 'T003', symbol: 'INFY', type: 'sell', quantity: 5, price: 1460.80, date: '2024-01-20', total: 7304 }
  ],
  RELIANCE: [
    { id: 'T004', symbol: 'RELIANCE', type: 'buy', quantity: 15, price: 2380.45, date: '2024-01-16', total: 35706.75 }
  ],
  HDFCBANK: [
    { id: 'T005', symbol: 'HDFCBANK', type: 'buy', quantity: 10, price: 1695.20, date: '2024-01-17', total: 16952 }
  ]
};

export const dummyPositions: Position[] = [
  {
    symbol: 'INFY',
    quantity: 50,
    avgPrice: 1420.30,
    currentPrice: 1456.75,
    pnl: 1822.50,
    pnlPercent: 2.57
  },
  {
    symbol: 'RELIANCE',
    quantity: 25,
    avgPrice: 2380.45,
    currentPrice: 2456.90,
    pnl: 1911.25,
    pnlPercent: 3.21
  }
];

export const dummyChartData = {
  '1D': [
    { time: '09:15', price: 1445.20 },
    { time: '09:30', price: 1448.75 },
    { time: '10:00', price: 1452.30 },
    { time: '10:30', price: 1449.85 },
    { time: '11:00', price: 1453.40 },
    { time: '11:30', price: 1456.75 },
    { time: '12:00', price: 1454.20 },
    { time: '12:30', price: 1457.90 },
    { time: '13:00', price: 1456.75 }
  ],
  '1W': [
    { time: 'Mon', price: 1432.50 },
    { time: 'Tue', price: 1445.20 },
    { time: 'Wed', price: 1438.75 },
    { time: 'Thu', price: 1451.30 },
    { time: 'Fri', price: 1456.75 }
  ]
};