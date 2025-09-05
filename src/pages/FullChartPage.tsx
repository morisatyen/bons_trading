import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Volume2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { dummyStocks } from '../utils/dummyData';

export const FullChartPage: React.FC = () => {
  const navigate = useNavigate();
  const { symbol } = useParams<{ symbol: string }>();
  const [timeframe, setTimeframe] = useState('1D');
  
  const stock = dummyStocks.find(s => s.symbol === symbol);
  
  if (!stock) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Stock Not Found</h2>
          <Button onClick={() => navigate('/transactions')}>
            Back to Transactions
          </Button>
        </div>
      </div>
    );
  }

  // Generate more detailed dummy chart data
  const generateChartData = (timeframe: string) => {
    const basePrice = stock.currentPrice;
    const points = timeframe === '1D' ? 50 : timeframe === '1W' ? 35 : timeframe === '1M' ? 30 : 12;
    const data = [];
    
    for (let i = 0; i < points; i++) {
      const variation = (Math.random() - 0.5) * 0.05; // 5% variation
      const price = basePrice * (1 + variation);
      const volume = Math.floor(Math.random() * 1000000) + 500000;
      
      data.push({
        time: i,
        price: price,
        volume: volume
      });
    }
    
    return data;
  };

  const chartData = generateChartData(timeframe);
  const maxPrice = Math.max(...chartData.map(d => d.price));
  const minPrice = Math.min(...chartData.map(d => d.price));
  const maxVolume = Math.max(...chartData.map(d => d.volume));

  const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/transactions')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{stock.symbol}</h1>
              <p className="text-sm text-gray-600">{stock.name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">₹{stock.currentPrice.toFixed(2)}</p>
            <div className={`flex items-center justify-end text-sm font-medium ${
              stock.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {stock.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-3">
            <Card>
              <div className="p-6">
                {/* Timeframe Selector */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Price Chart</h2>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    {timeframes.map((tf) => (
                      <button
                        key={tf}
                        onClick={() => setTimeframe(tf)}
                        className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                          timeframe === tf ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Chart */}
                <div className="h-80 mb-6">
                  <div className="h-full flex items-end space-x-1 bg-gray-50 rounded-lg p-4">
                    {chartData.map((point, index) => (
                      <div
                        key={index}
                        className="flex-1 bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                        style={{
                          height: `${((point.price - minPrice) / (maxPrice - minPrice)) * 250 + 10}px`
                        }}
                        title={`₹${point.price.toFixed(2)}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Volume Chart */}
                <div className="h-20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Volume2 className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Volume</span>
                  </div>
                  <div className="h-16 flex items-end space-x-1 bg-gray-50 rounded-lg p-2">
                    {chartData.map((point, index) => (
                      <div
                        key={index}
                        className="flex-1 bg-gray-400 rounded-t"
                        style={{
                          height: `${(point.volume / maxVolume) * 50 + 2}px`
                        }}
                        title={`Volume: ${point.volume.toLocaleString()}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stock Info */}
            <Card>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Stock Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sector</span>
                    <span className="font-medium text-gray-900">{stock.sector}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Market Cap</span>
                    <span className="font-medium text-gray-900">{stock.marketCap}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Volume</span>
                    <span className="font-medium text-gray-900">{stock.volume.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Day High</span>
                    <span className="font-medium text-gray-900">₹{(stock.currentPrice * 1.02).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Day Low</span>
                    <span className="font-medium text-gray-900">₹{(stock.currentPrice * 0.98).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Key Statistics */}
            <Card>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Key Statistics</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">P/E Ratio</span>
                    <span className="font-medium text-gray-900">24.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">EPS</span>
                    <span className="font-medium text-gray-900">₹59.45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Book Value</span>
                    <span className="font-medium text-gray-900">₹312.80</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dividend Yield</span>
                    <span className="font-medium text-gray-900">2.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">52W High</span>
                    <span className="font-medium text-gray-900">₹{(stock.currentPrice * 1.25).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">52W Low</span>
                    <span className="font-medium text-gray-900">₹{(stock.currentPrice * 0.75).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button fullWidth className="bg-green-600 hover:bg-green-700">
                    Buy {stock.symbol}
                  </Button>
                  <Button fullWidth variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                    Sell {stock.symbol}
                  </Button>
                  <Button fullWidth variant="outline">
                    Add to Watchlist
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};