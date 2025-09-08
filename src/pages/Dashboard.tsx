import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Link2, Plus, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { dummyPortfolio, portfolioChartData, dummyTransactions } from '../utils/dummyData';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const recentTransactions = dummyTransactions.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
            <p className="text-blue-100 text-lg">
              Your portfolio is up {dummyPortfolio.returnPercentage}% this month
            </p>
          </div>
          <div className="mt-6 lg:mt-0">
            <Button variant="secondary" onClick={() => navigate('/funding')} className="flex items-center justify-center space-x-2">
              <Plus className="w-4 h-4 mr-2" />
              Add Funds
            </Button>
          </div>
        </div>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Portfolio Value</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(dummyPortfolio.totalValue)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Return</p>
              <p className="text-2xl font-bold text-green-600">
                +{formatCurrency(dummyPortfolio.totalReturn)}
              </p>
              <p className="text-sm text-green-600">
                +{dummyPortfolio.returnPercentage}%
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Funds</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(dummyPortfolio.availableFunds)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Turing Tokens</p>
              <p className="text-2xl font-bold text-gray-900">
                {dummyPortfolio.turingTokens}
              </p>
              <p className="text-sm text-gray-500">
                {dummyPortfolio.linkedAccounts} linked accounts
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Link2 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Portfolio Chart */}
      <Card>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Portfolio Performance</h3>
              <p className="text-sm text-gray-600">Last 6 months</p>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-600">
                +{dummyPortfolio.returnPercentage}%
              </span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={portfolioChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value as number), 'Portfolio Value']}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px' 
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* Quick Actions & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                fullWidth 
                onClick={() => navigate('/funding')}
                className="flex items-center justify-center space-x-2"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                <span>Add Funds</span>
              </Button>
              <Button 
                variant="outline" 
                fullWidth 
                onClick={() => navigate('/funding')}
                className="flex items-center justify-center space-x-2"
              >
                <Link2 className="w-4 h-4 mr-2" />
                <span>Link Account</span>
              </Button>
              <Button 
                variant="outline" 
                fullWidth 
                onClick={() => navigate('/transactions')}
                className="flex items-center justify-center space-x-2"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                <span>View Transactions</span>
              </Button>
            </div>
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card className="lg:col-span-2">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate('/transactions')}>
                View All
              </Button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      ${transaction.type === 'buy' ? 'bg-green-100' : 
                        transaction.type === 'sell' ? 'bg-red-100' : 'bg-blue-100'}
                    `}>
                      {transaction.type === 'buy' ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : transaction.type === 'sell' ? (
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      ) : (
                        <DollarSign className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.type.toUpperCase()} {transaction.asset}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(transaction.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${transaction.type === 'buy' ? 'text-red-600' : 'text-green-600'}`}>
                      {transaction.type === 'buy' ? '-' : '+'}
                      {formatCurrency(transaction.amount * transaction.price)}
                    </p>
                    <p className="text-sm text-gray-600 capitalize">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">AI Market Insights</h3>
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
              Live
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Market Recommendation</h4>
              <p className="text-sm text-gray-700 mb-3">
                Based on current market conditions and your moderate risk profile, 
                consider increasing exposure to tech stocks while maintaining defensive positions.
              </p>
              <Button size="sm" variant="outline">
                View Details
              </Button>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Portfolio Optimization</h4>
              <p className="text-sm text-gray-700 mb-3">
                Your current allocation aligns well with your risk profile. 
                Consider rebalancing in 2 weeks based on market trends.
              </p>
              <Button size="sm" variant="outline">
                Auto-Rebalance
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};