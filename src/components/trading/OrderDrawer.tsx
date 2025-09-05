import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Plus, Minus, BarChart3 } from 'lucide-react';
import { Stock, MarketDepth, Position, Order } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { dummyMarketDepth, dummyPositions, dummyChartData } from '../../utils/dummyData';

interface OrderDrawerProps {
  stock: Stock | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderPlace: (order: Omit<Order, 'id' | 'timestamp' | 'status'>) => void;
  onViewChart: (symbol: string) => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  stock,
  isOpen,
  onClose,
  onOrderPlace,
  onViewChart
}) => {
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'sl'>('market');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [productType, setProductType] = useState<'CNC' | 'MIS' | 'BO' | 'CO'>('CNC');
  const [validity, setValidity] = useState<'DAY' | 'IOC'>('DAY');
  const [chartPeriod, setChartPeriod] = useState<'1D' | '1W'>('1D');

  React.useEffect(() => {
    if (stock && orderType === 'market') {
      setPrice(stock.currentPrice);
    }
  }, [stock, orderType]);

  if (!stock || !isOpen) return null;

  const marketDepth = dummyMarketDepth[stock.symbol] || { bids: [], asks: [] };
  const position = dummyPositions.find(p => p.symbol === stock.symbol);
  const chartData = dummyChartData[chartPeriod];

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleOrderSubmit = (side: 'buy' | 'sell') => {
    const order = {
      symbol: stock.symbol,
      type: orderType,
      side,
      quantity,
      price: orderType === 'market' ? undefined : price,
      productType,
      validity
    };
    onOrderPlace(order);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`
        fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:max-w-lg
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{stock.symbol}</h2>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-gray-900">
                  ₹{stock.currentPrice.toFixed(2)}
                </span>
                <span className={`flex items-center text-sm font-medium ${
                  stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stock.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Mini Chart */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">Price Chart</h3>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setChartPeriod('1D')}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                      chartPeriod === '1D' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    1D
                  </button>
                  <button
                    onClick={() => setChartPeriod('1W')}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                      chartPeriod === '1W' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    1W
                  </button>
                </div>
              </div>
              <div className="h-20 flex items-end space-x-1">
                {chartData.map((point, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-blue-500 rounded-t"
                    style={{
                      height: `${((point.price - Math.min(...chartData.map(p => p.price))) / 
                        (Math.max(...chartData.map(p => p.price)) - Math.min(...chartData.map(p => p.price)))) * 60 + 10}px`
                    }}
                  />
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewChart(stock.symbol)}
                className="w-full mt-2"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                View Full Chart
              </Button>
            </Card>

            {/* Market Depth */}
            <Card className="p-4">
              <h3 className="font-medium text-gray-900 mb-3">Market Depth</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-medium text-gray-600 mb-2">BID</h4>
                  <div className="space-y-1">
                    {marketDepth.bids.slice(0, 5).map((bid, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span className="text-green-600">₹{bid.price.toFixed(2)}</span>
                        <span className="text-gray-600">{bid.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-gray-600 mb-2">ASK</h4>
                  <div className="space-y-1">
                    {marketDepth.asks.slice(0, 5).map((ask, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span className="text-red-600">₹{ask.price.toFixed(2)}</span>
                        <span className="text-gray-600">{ask.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Position Snapshot */}
            {position && (
              <Card className="p-4 bg-blue-50 border-blue-200">
                <h3 className="font-medium text-blue-900 mb-2">Current Position</h3>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-blue-700">Qty: {position.quantity}</p>
                  </div>
                  <div>
                    <p className="text-blue-700">Avg: ₹{position.avgPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className={`font-medium ${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      P&L: {position.pnl >= 0 ? '+' : ''}₹{position.pnl.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Order Form */}
            <Card className="p-4">
              <h3 className="font-medium text-gray-900 mb-4">Place Order</h3>
              
              <div className="space-y-4">
                {/* Order Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Type</label>
                  <select
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="market">Market</option>
                    <option value="limit">Limit</option>
                    <option value="sl">Stop Loss</option>
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                    />
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Price */}
                {orderType !== 'market' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                {/* Product Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="CNC">CNC (Cash & Carry)</option>
                    <option value="MIS">MIS (Intraday)</option>
                    <option value="BO">BO (Bracket Order)</option>
                    <option value="CO">CO (Cover Order)</option>
                  </select>
                </div>

                {/* Validity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Validity</label>
                  <select
                    value={validity}
                    onChange={(e) => setValidity(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="DAY">DAY</option>
                    <option value="IOC">IOC (Immediate or Cancel)</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="p-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleOrderSubmit('buy')}
                className="bg-green-600 hover:bg-green-700 text-white"
                fullWidth
              >
                BUY
              </Button>
              <Button
                onClick={() => handleOrderSubmit('sell')}
                className="bg-red-600 hover:bg-red-700 text-white"
                fullWidth
              >
                SELL
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};