import React from 'react';
import { TrendingUp, TrendingDown, ShoppingCart, X, BarChart3 } from 'lucide-react';
import { Stock, WatchlistItem } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface WatchlistViewProps {
  watchlist: WatchlistItem[];
  stocks: Stock[];
  onRemoveFromWatchlist: (symbol: string) => void;
  onBuyClick: (stock: Stock) => void;
  onViewPortfolio: (symbol: string) => void;
}

export const WatchlistView: React.FC<WatchlistViewProps> = ({ 
  watchlist, 
  stocks, 
  onRemoveFromWatchlist, 
  onBuyClick,
  onViewPortfolio
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getStockData = (symbol: string) => {
    return stocks.find(stock => stock.symbol === symbol);
  };

  const watchedStocks = watchlist.map(item => ({
    ...item,
    stockData: getStockData(item.symbol)
  })).filter(item => item.stockData);

  if (watchlist.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your Watchlist is Empty</h3>
          <p className="text-gray-600 mb-4">
            Add stocks to your watchlist to track their performance and get quick access to trading.
          </p>
          <p className="text-sm text-gray-500">
            Go to "All Stocks" tab and click the "Watch" button on any stock.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="none">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">My Watchlist</h2>
            <p className="text-sm text-gray-600">{watchlist.length} stocks being tracked</p>
          </div>
        </div>
      </div>
      
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CMP
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Change
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Added On
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {watchedStocks.map((item) => (
              <tr key={item.symbol} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.symbol}</p>
                    <p className="text-xs text-gray-500">{item.stockData?.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(item.stockData?.currentPrice || 0)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`flex items-center text-sm font-medium ${
                    (item.stockData?.change || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {(item.stockData?.change || 0) >= 0 ? 
                      <TrendingUp className="w-3 h-3 mr-1" /> : 
                      <TrendingDown className="w-3 h-3 mr-1" />
                    }
                    {(item.stockData?.change || 0) >= 0 ? '+' : ''}{(item.stockData?.change || 0).toFixed(2)} 
                    ({(item.stockData?.changePercent || 0).toFixed(2)}%)
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.addedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onViewPortfolio(item.symbol)}
                      className="flex items-center"
                    >
                      <BarChart3 className="w-3 h-3 mr-1" />
                      Portfolio
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onBuyClick(item.stockData!)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Buy
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onRemoveFromWatchlist(item.symbol)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden">
        {watchedStocks.map((item) => (
          <div key={item.symbol} className="p-4 border-b border-gray-200 last:border-b-0">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{item.symbol}</h3>
                <p className="text-xs text-gray-500">{item.stockData?.sector}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{formatCurrency(item.stockData?.currentPrice || 0)}</p>
                <div className={`flex items-center justify-end text-sm font-medium ${
                  (item.stockData?.change || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {(item.stockData?.change || 0) >= 0 ? 
                    <TrendingUp className="w-3 h-3 mr-1" /> : 
                    <TrendingDown className="w-3 h-3 mr-1" />
                  }
                  {(item.stockData?.change || 0) >= 0 ? '+' : ''}{(item.stockData?.change || 0).toFixed(2)} 
                  ({(item.stockData?.changePercent || 0).toFixed(2)}%)
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <p className="text-xs text-gray-500">Added on {new Date(item.addedAt).toLocaleDateString()}</p>
            </div>

            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onViewPortfolio(item.symbol)}
                className="flex-1 flex items-center justify-center"
              >
                <BarChart3 className="w-3 h-3 mr-1" />
                Portfolio
              </Button>
              <Button
                size="sm"
                onClick={() => onBuyClick(item.stockData!)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                Buy
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onRemoveFromWatchlist(item.symbol)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};