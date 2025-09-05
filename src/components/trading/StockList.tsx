import React from 'react';
import { TrendingUp, TrendingDown, ShoppingCart } from 'lucide-react';
import { Stock } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface StockListProps {
  stocks: Stock[];
  onBuyClick: (stock: Stock) => void;
}

export const StockList: React.FC<StockListProps> = ({ stocks, onBuyClick }) => {
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

  return (
    <Card padding="none">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Stock Market</h2>
        <p className="text-sm text-gray-600">Live stock prices and trading</p>
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
                LTP
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
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stocks.map((stock) => (
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
                  <Button
                    size="sm"
                    onClick={() => onBuyClick(stock)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Buy
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden">
        {stocks.map((stock) => (
          <div key={stock.symbol} className="p-4 border-b border-gray-200 last:border-b-0">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{stock.symbol}</h3>
                <p className="text-xs text-gray-500">{stock.sector}</p>
              </div>
              <Button
                size="sm"
                onClick={() => onBuyClick(stock)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                Buy
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">LTP</p>
                <p className="font-medium text-gray-900">{formatCurrency(stock.currentPrice)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Change</p>
                <div className={`flex items-center text-sm font-medium ${
                  stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stock.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Volume</p>
                <p className="text-sm text-gray-900">{formatVolume(stock.volume)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Market Cap</p>
                <p className="text-sm text-gray-900">{stock.marketCap}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};