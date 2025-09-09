import React from 'react';
import { TrendingUp, TrendingDown, ArrowLeft, BarChart3, ShoppingCart } from 'lucide-react';
import { Holding, TradeHistory, Stock } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface PortfolioViewProps {
  holdings: Holding[];
  tradeHistory: Record<string, TradeHistory[]>;
  stocks: Stock[];
  selectedStock?: string;
  onBack: () => void;
  onBuyClick: (stock: Stock) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ 
  holdings, 
  tradeHistory, 
  stocks,
  selectedStock,
  onBack,
  onBuyClick
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

  const totalPortfolioValue = holdings.reduce((sum, holding) => sum + holding.currentValue, 0);
  const totalPnL = holdings.reduce((sum, holding) => sum + holding.pnl, 0);
  const totalPnLPercent = totalPnL / (totalPortfolioValue - totalPnL) * 100;

  // If a specific stock is selected, show detailed view
  if (selectedStock) {
    const holding = holdings.find(h => h.symbol === selectedStock);
    const stockData = getStockData(selectedStock);
    const trades = tradeHistory[selectedStock] || [];

    if (!holding || !stockData) {
      return (
        <Card>
          <div className="p-6 text-center">
            <p className="text-gray-600">No holdings found for {selectedStock}</p>
            <Button onClick={onBack} className="mt-4">
              Back to Portfolio
            </Button>
          </div>
        </Card>
      );
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{selectedStock} Portfolio</h2>
            <p className="text-sm text-gray-600">{stockData.name}</p>
          </div>
        </div>

        {/* Position Summary */}
        <Card>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600">Quantity</p>
                <p className="text-2xl font-bold text-gray-900">{holding.quantity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. Price</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(holding.avgPrice)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Value</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(holding.currentValue)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">P&L</p>
                <div className="flex items-center space-x-2">
                  <p className={`text-2xl font-bold ${holding.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {holding.pnl >= 0 ? '+' : ''}{formatCurrency(holding.pnl)}
                  </p>
                  <span className={`text-sm font-medium ${holding.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ({holding.pnlPercent >= 0 ? '+' : ''}{holding.pnlPercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Current Market Info */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Market Price</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(stockData.currentPrice)}</p>
                  <div className={`flex items-center text-sm font-medium ${
                    stockData.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stockData.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {stockData.change >= 0 ? '+' : ''}{stockData.change.toFixed(2)} ({stockData.changePercent.toFixed(2)}%)
                  </div>
                </div>
              </div>
              <Button onClick={() => onBuyClick(stockData)} className="bg-blue-600 hover:bg-blue-700">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Trade More
              </Button>
            </div>
          </div>
        </Card>

        {/* Trade History */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trade History</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {trades.map((trade) => (
                    <tr key={trade.id}>
                      <td className="px-4 py-2 text-sm text-gray-900">{trade.date}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          trade.type === 'buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {trade.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">{trade.quantity}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{formatCurrency(trade.price)}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{formatCurrency(trade.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Show overall portfolio view
  return (
    <Card padding="none">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">My Portfolio</h2>
            <p className="text-sm text-gray-600">{holdings.length} holdings</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPortfolioValue)}</p>
            <div className={`flex items-center justify-end text-sm font-medium ${
              totalPnL >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {totalPnL >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)} ({totalPnLPercent >= 0 ? '+' : ''}{totalPnLPercent.toFixed(2)}%)
            </div>
          </div>
        </div>
      </div>

      {holdings.length === 0 ? (
        <div className="p-12 text-center">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Holdings Yet</h3>
          <p className="text-gray-600">
            Start trading to build your portfolio. Your holdings will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Symbol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  P&L
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {holdings.map((holding) => {
                const stockData = getStockData(holding.symbol);
                return (
                  <tr key={holding.symbol} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{holding.symbol}</p>
                        <p className="text-xs text-gray-500">{stockData?.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {holding.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(holding.avgPrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(holding.currentValue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${holding.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {holding.pnl >= 0 ? '+' : ''}{formatCurrency(holding.pnl)}
                        <div className="text-xs">
                          ({holding.pnlPercent >= 0 ? '+' : ''}{holding.pnlPercent.toFixed(2)}%)
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onBuyClick(stockData!)}
                        >
                          Trade
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};