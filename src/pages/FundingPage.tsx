import React, { useState } from 'react';
import { CreditCard, Building2, Link2, Plus, CheckCircle, Coins } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const FundingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'link'>('tokens');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [exchange, setExchange] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const linkedAccounts = [
    { name: 'Coinbase Pro', type: 'crypto', status: 'active', balance: 15430.50 },
    { name: 'TD Ameritrade', type: 'brokerage', status: 'active', balance: 42750.00 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Add Funds & Link Accounts</h1>
        <p className="text-gray-600">
          Fund your account with Turing Tokens or link your existing trading accounts
        </p>
      </div>

      {/* Current Balance */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-blue-100 mb-1">Available Funds</p>
              <p className="text-2xl font-bold">{formatCurrency(25430.50)}</p>
            </div>
            <div>
              <p className="text-blue-100 mb-1">Turing Tokens</p>
              <p className="text-2xl font-bold">1,250 BSAI</p>
            </div>
            <div>
              <p className="text-blue-100 mb-1">Linked Accounts</p>
              <p className="text-2xl font-bold">{linkedAccounts.length}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('tokens')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'tokens'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Coins className="w-4 h-4 mr-2 inline" />
            Buy Turing Tokens
          </button>
          <button
            onClick={() => setActiveTab('link')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'link'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Link2 className="w-4 h-4 mr-2 inline" />
            Link Accounts
          </button>
        </nav>
      </div>

      {activeTab === 'tokens' && (
        <div className="space-y-6">
          {/* Buy Tokens Section */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Purchase Turing Tokens (BSAI)</h3>
              <p className="text-gray-600 mb-6">
                1 BSAI = $20.00 USD • Minimum purchase: $100
              </p>
              
              <div className="space-y-6">
                <Input
                  label="Amount (USD)"
                  type="number"
                  value={amount}
                  onChange={setAmount}
                  placeholder="100.00"
                />

                {amount && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">You will receive:</span>
                      <span className="text-lg font-bold text-blue-600">
                        {(parseFloat(amount) / 20).toFixed(2)} BSAI
                      </span>
                    </div>
                  </div>
                )}

                {/* Payment Methods */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Payment Method</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`
                        p-4 border-2 rounded-lg text-left transition-all duration-200
                        ${paymentMethod === 'card'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <CreditCard className={`w-6 h-6 mb-2 ${paymentMethod === 'card' ? 'text-blue-600' : 'text-gray-400'}`} />
                      <h5 className="font-medium text-gray-900">Credit/Debit Card</h5>
                      <p className="text-sm text-gray-600">Instant processing</p>
                    </button>
                    
                    <button
                      onClick={() => setPaymentMethod('bank')}
                      className={`
                        p-4 border-2 rounded-lg text-left transition-all duration-200
                        ${paymentMethod === 'bank'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <Building2 className={`w-6 h-6 mb-2 ${paymentMethod === 'bank' ? 'text-blue-600' : 'text-gray-400'}`} />
                      <h5 className="font-medium text-gray-900">Bank Transfer</h5>
                      <p className="text-sm text-gray-600">Lower fees, 1-2 days</p>
                    </button>
                  </div>
                </div>

                <Button fullWidth size="lg" disabled={!amount || parseFloat(amount) < 100}>
                  <Plus className="w-4 h-4 mr-2" />
                  Purchase {amount ? `$${amount}` : ''} in BSAI Tokens
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'link' && (
        <div className="space-y-6">
          {/* Linked Accounts */}
          {linkedAccounts.length > 0 && (
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Accounts</h3>
                <div className="space-y-4">
                  {linkedAccounts.map((account, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{account.name}</p>
                          <p className="text-sm text-gray-600 capitalize">{account.type} account</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{formatCurrency(account.balance)}</p>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          Active
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Link New Account */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Link New Account</h3>
              <p className="text-gray-600 mb-6">
                Connect your existing brokerage or cryptocurrency exchange accounts via API
              </p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exchange/Broker</label>
                  <select
                    value={exchange}
                    onChange={(e) => setExchange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select exchange or broker</option>
                    <option value="coinbase">Coinbase Pro</option>
                    <option value="binance">Binance</option>
                    <option value="td">TD Ameritrade</option>
                    <option value="schwab">Charles Schwab</option>
                    <option value="robinhood">Robinhood</option>
                    <option value="etrade">E*TRADE</option>
                  </select>
                </div>

                <Input
                  label="API Key"
                  value={apiKey}
                  onChange={setApiKey}
                  placeholder="Enter your API key"
                  type="password"
                />

                <Input
                  label="API Secret"
                  value={apiSecret}
                  onChange={setApiSecret}
                  placeholder="Enter your API secret"
                  type="password"
                />

                <Card className="bg-yellow-50 border-yellow-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-yellow-900">Security Notice</h4>
                      <p className="text-sm text-yellow-800">
                        Your API credentials are encrypted and stored securely. We only request 
                        read-only access to view your account balances and positions.
                      </p>
                    </div>
                  </div>
                </Card>

                <Button 
                  fullWidth 
                  size="lg" 
                  disabled={!exchange || !apiKey || !apiSecret}
                  variant="success"
                >
                  <Link2 className="w-4 h-4 mr-2" />
                  Connect Account
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};