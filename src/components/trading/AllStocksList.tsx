import React, { useState } from 'react';
import { Search, Plus, TrendingUp, TrendingDown, ShoppingCart, Eye } from 'lucide-react';
import { Stock, WatchlistItem } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface AllStocksListProps {
  stocks: Stock[];
  watchlist: WatchlistItem[];
  onAddToWatchlist: (symbol: string) => void;
  onRemoveFromWatchlist: (symbol: string) => void;
  onBuyClick: (stock: Stock) => void;
}

export const AllStocksList: React.FC<AllStocksListProps> = ({ 
  stocks, 
  watchlist, 
  onAddToWatchlist, 
  onRemoveFromWatchlist, 
  onBuyClick 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 10000000) {
      return `${(volume / 10000000).toFixed(1)}Cr`;
    } else if (volume >= 100000) {
      return `${(volume / 100000).toFixed(1)}L`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toString();
  };

  const isInWatchlist = (symbol: string) => {
    return watchlist.some(item => item.symbol === symbol);
  };

  const filteredStocks = stocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card padding="none">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">All Stocks</h2>
            <p className="text-sm text-gray-600">Browse and trade from our complete stock universe</p>
          </div>
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search stocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
                Volume
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Market Cap
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStocks.map((stock) => (
              <tr key={stock.symbol} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{stock.symbol}</p>
                    <p className="text-xs text-gray-500">{stock.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(stock.currentPrice)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`flex items-center text-sm font-medium ${
                    stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stock.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatVolume(stock.volume)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {stock.marketCap}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      size="sm"
                      variant={isInWatchlist(stock.symbol) ? 'success' : 'outline'}
                      onClick={() => isInWatchlist(stock.symbol) 
                        ? onRemoveFromWatchlist(stock.symbol) 
                        : onAddToWatchlist(stock.symbol)
                      }
                      className="flex items-center"
                    >
                      {isInWatchlist(stock.symbol) ? (
                        <>
                          <Eye className="w-3 h-3 mr-1" />
                          Watching
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3 mr-1" />
                          Watch
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onBuyClick(stock)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Buy
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
        {filteredStocks.map((stock) => (
          <div key={stock.symbol} className="p-4 border-b border-gray-200 last:border-b-0">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{stock.symbol}</h3>
                <p className="text-xs text-gray-500">{stock.sector}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{formatCurrency(stock.currentPrice)}</p>
                <div className={`flex items-center justify-end text-sm font-medium ${
                  stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stock.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-xs text-gray-500">Volume</p>
                <p className="text-sm text-gray-900">{formatVolume(stock.volume)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Market Cap</p>
                <p className="text-sm text-gray-900">{stock.marketCap}</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                size="sm"
                variant={isInWatchlist(stock.symbol) ? 'success' : 'outline'}
                onClick={() => isInWatchlist(stock.symbol) 
                  ? onRemoveFromWatchlist(stock.symbol) 
                  : onAddToWatchlist(stock.symbol)
                }
                className="flex-1 flex items-center justify-center"
              >
                {isInWatchlist(stock.symbol) ? (
                  <>
                    <Eye className="w-3 h-3 mr-1" />
                    Watching
                  </>
                ) : (
                  <>
                    <Plus className="w-3 h-3 mr-1" />
                    Watch
                  </>
                )}
              </Button>
              <Button
                size="sm"
                onClick={() => onBuyClick(stock)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                Buy
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};