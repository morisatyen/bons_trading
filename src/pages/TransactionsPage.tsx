import React, { useState } from 'react';
import { Search, Filter, Download, TrendingUp, TrendingDown, DollarSign, Bell } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { AllStocksList } from '../components/trading/AllStocksList';
import { WatchlistView } from '../components/trading/WatchlistView';
import { PortfolioView } from '../components/trading/PortfolioView';
import { OrderDrawer } from '../components/trading/OrderDrawer';
import { OrderConfirmationModal } from '../components/trading/OrderConfirmationModal';
import { dummyTransactions, dummyStocks, dummyWatchlist, dummyHoldings, dummyTradeHistory } from '../utils/dummyData';
import { Stock, Order, WatchlistItem, Holding } from '../types';
import { useNavigate } from 'react-router-dom';

export const TransactionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [confirmationOrder, setConfirmationOrder] = useState<Order | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all-stocks' | 'watchlist' | 'portfolio' | 'transactions'>('all-stocks');
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(dummyWatchlist);
  const [holdings] = useState<Holding[]>(dummyHoldings);
  const [selectedPortfolioStock, setSelectedPortfolioStock] = useState<string | undefined>();

  const handleAddToWatchlist = (symbol: string) => {
    if (!watchlist.some(item => item.symbol === symbol)) {
      setWatchlist(prev => [...prev, { symbol, addedAt: new Date().toISOString() }]);
    }
  };

  const handleRemoveFromWatchlist = (symbol: string) => {
    setWatchlist(prev => prev.filter(item => item.symbol !== symbol));
  };

  const handleViewPortfolio = (symbol?: string) => {
    setSelectedPortfolioStock(symbol);
    setActiveTab('portfolio');
  };

  const handleBackToPortfolio = () => {
    setSelectedPortfolioStock(undefined);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBuyClick = (stock: Stock) => {
    setSelectedStock(stock);
    setIsOrderDrawerOpen(true);
  };

  const handleOrderPlace = (orderData: Omit<Order, 'id' | 'timestamp' | 'status'>) => {
    const order: Order = {
      ...orderData,
      id: `ORD${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'executed'
    };
    
    setConfirmationOrder(order);
    setIsOrderDrawerOpen(false);
    setIsConfirmationOpen(true);
    
    // Show success toast
    setTimeout(() => {
      // This would typically be handled by a toast library
      console.log('Order placed successfully!');
    }, 100);
  };

  const handleViewChart = (symbol: string) => {
    navigate(`/chart/${symbol}`);
  };

  const filteredTransactions = dummyTransactions.filter(transaction => {
    const matchesSearch = transaction.asset.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || transaction.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'buy': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'sell': return <TrendingDown className="w-5 h-5 text-red-600" />;
      default: return <DollarSign className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trading & Transactions</h1>
          <p className="text-gray-600">Trade stocks and track all your trading activity</p>
        </div>
        <Button variant="outline" className="flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('all-stocks')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'all-stocks'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            All Stocks
          </button>
          <button
            onClick={() => setActiveTab('watchlist')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'watchlist'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Watchlist ({watchlist.length})
          </button>
          <button
            onClick={() => handleViewPortfolio()}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'portfolio'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Portfolio ({holdings.length})
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'transactions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Transaction History
          </button>
        </nav>
      </div>

      {/* Filters */}
      {activeTab === 'transactions' && (
        <Card>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by asset..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Transactions</option>
                <option value="buy">Buy Orders</option>
                <option value="sell">Sell Orders</option>
                <option value="deposit">Deposits</option>
                <option value="withdrawal">Withdrawals</option>
              </select>

              <Button variant="outline" className="flex items-center justify-center">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Content based on active tab */}
      {activeTab === 'all-stocks' && (
        <AllStocksList 
          stocks={dummyStocks} 
          watchlist={watchlist}
          onAddToWatchlist={handleAddToWatchlist}
          onRemoveFromWatchlist={handleRemoveFromWatchlist}
          onBuyClick={handleBuyClick} 
        />
      )}

      {activeTab === 'watchlist' && (
        <WatchlistView 
          watchlist={watchlist}
          stocks={dummyStocks}
          onRemoveFromWatchlist={handleRemoveFromWatchlist}
          onBuyClick={handleBuyClick}
          onViewPortfolio={handleViewPortfolio}
        />
      )}

      {activeTab === 'portfolio' && (
        <PortfolioView 
          holdings={holdings}
          tradeHistory={dummyTradeHistory}
          stocks={dummyStocks}
          selectedStock={selectedPortfolioStock}
          onBack={handleBackToPortfolio}
          onBuyClick={handleBuyClick}
        />
      )}

      {/* Transactions List */}
      {activeTab === 'transactions' && (
        <Card padding="none">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`
                  p-6 hover:bg-gray-50 cursor-pointer transition-colors
                  ${selectedTransaction === transaction.id ? 'bg-blue-50' : ''}
                `}
                onClick={() => setSelectedTransaction(
                  selectedTransaction === transaction.id ? null : transaction.id
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.type.toUpperCase()} {transaction.asset}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatDate(transaction.timestamp)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className={`font-medium ${
                          transaction.type === 'buy' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {transaction.type === 'buy' ? '-' : '+'}
                          {formatCurrency(transaction.amount * transaction.price)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {transaction.amount} {transaction.asset === 'USD' ? '' : 'shares'} @ {formatCurrency(transaction.price)}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedTransaction === transaction.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 bg-white rounded-lg p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Transaction ID</p>
                        <p className="font-medium text-gray-900">#{transaction.id}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Execution Time</p>
                        <p className="font-medium text-gray-900">{formatDate(transaction.timestamp)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Fees</p>
                        <p className="font-medium text-gray-900">{formatCurrency(transaction.fees)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Status</p>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Order Drawer */}
      <OrderDrawer
        stock={selectedStock}
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        onOrderPlace={handleOrderPlace}
        onViewChart={handleViewChart}
      />

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        order={confirmationOrder}
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
      />
    </div>
  );
};