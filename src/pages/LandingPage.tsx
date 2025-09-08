import React from 'react';
import { ArrowRight, Shield, TrendingUp, Users, Globe, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: 'Secure Trading',
      description: 'Bank-level security with advanced encryption and regulatory compliance'
    },
    {
      icon: TrendingUp,
      title: 'AI-Powered Insights',
      description: 'Advanced algorithms provide real-time market analysis and trading signals'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: '24/7 customer support from experienced trading professionals'
    },
    {
      icon: Globe,
      title: 'Global Markets',
      description: 'Access to stocks, crypto, and commodities across international exchanges'
    }
  ];

  const benefits = [
    'Zero commission on first 100 trades',
    'Real-time market data and analytics',
    'Mobile and desktop trading platforms',
    'Advanced portfolio management tools',
    'Instant deposits and withdrawals',
    'Educational resources and webinars'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Bons-AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button onClick={() => navigate('/signup')}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Trade Smarter with
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI-Powered </span>
            Insights
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Experience the future of trading with our advanced AI algorithms, 
            institutional-grade security, and zero-fee starter plans. Join thousands of traders 
            already maximizing their returns with Bons-AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" onClick={() => navigate('/signup')} className="px-8 py-4 flex items-center space-x-2">
              <span>Create Free Account</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/login')}>
              Watch Demo
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • Free $10,000 virtual trading account
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Bons-AI?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built for both beginners and professionals, our platform combines cutting-edge 
            technology with intuitive design.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center group hover:scale-105 transition-transform duration-200">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Everything You Need to Succeed
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our comprehensive trading platform provides all the tools and resources 
                you need to make informed investment decisions and maximize your returns.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Start Trading Today</h3>
                  <p className="text-gray-600">Join our growing community of successful traders</p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Account Setup</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">First 100 Trades</span>
                    <span className="text-green-600 font-semibold">$0 Commission</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Virtual Trading Account</span>
                    <span className="text-green-600 font-semibold">$10,000</span>
                  </div>
                </div>
                <Button fullWidth size="lg" onClick={() => navigate('/signup')} className='flex items-center justify-center space-x-2'>
                  Create Free Account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">B</span>
                </div>
                <span className="text-xl font-bold">Bons-AI</span>
              </div>
              <p className="text-gray-400 text-sm">
                Revolutionizing trading with AI-powered insights and institutional-grade security.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Web Trading</li>
                <li>Mobile App</li>
                <li>API Access</li>
                <li>Market Data</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Live Chat</li>
                <li>Educational Resources</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Risk Disclosure</li>
                <li>Regulatory</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Bons-AI. All rights reserved. Trading involves risk of loss.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};