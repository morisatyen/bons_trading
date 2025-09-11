import React, { useState } from 'react';
import { Send, Bot, User, Clock, Zap } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Hello! Welcome to Bons-AI Support. How can I help you today?',
    sender: 'bot',
    timestamp: '10:30 AM'
  },
  {
    id: '2',
    text: 'I need help with payments and funding my account',
    sender: 'user',
    timestamp: '10:31 AM'
  },
  {
    id: '3',
    text: 'I\'d be happy to help you with payments! We support multiple funding methods including Wise transfers, bank transfers, and linked brokerage accounts. What specific aspect would you like assistance with?',
    sender: 'bot',
    timestamp: '10:31 AM'
  },
  {
    id: '4',
    text: 'How do I add funds using Wise?',
    sender: 'user',
    timestamp: '10:32 AM'
  },
  {
    id: '5',
    text: 'Great choice! Wise offers fast and secure international transfers. Here\'s how to add funds:\n\n1. Go to "Add Funds" in your dashboard\n2. Select "Buy Turing Tokens (BSAI)"\n3. Enter the amount you want to add\n4. Click "Purchase via Wise"\n5. You\'ll be redirected to Wise for secure payment\n\nThe process typically takes 2-5 minutes. Is there anything specific about the Wise process you\'d like me to explain?',
    sender: 'bot',
    timestamp: '10:32 AM'
  },
  {
    id: '6',
    text: 'That\'s very helpful, thank you!',
    sender: 'user',
    timestamp: '10:33 AM'
  }
];

export const ContactSupportPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thank you for your message! Our support team will get back to you shortly. In the meantime, you can check our FAQ section or explore our help documentation.',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Contact Support</h1>
        <p className="text-gray-600">Get instant help from our AI assistant or connect with our support team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col" padding="none">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Bons-AI Support Assistant</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' 
                        ? 'bg-blue-600' 
                        : 'bg-gray-100'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    <div className={`rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="rounded-full px-4 py-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Support Info Panel */}
        <div className="space-y-6">
          {/* Support Hours */}
          <Card>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Support Hours</h3>
              <p className="text-sm text-gray-600 mb-2">Monday - Friday</p>
              <p className="text-lg font-bold text-gray-900">9:00 AM - 6:00 PM</p>
              <p className="text-xs text-gray-500 mt-2">EST (Eastern Standard Time)</p>
            </div>
          </Card>

          {/* Response Time */}
          <Card>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
              <p className="text-lg font-bold text-blue-600">Instant</p>
              <p className="text-sm text-gray-600">for chat support</p>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">Email support: 2-4 hours</p>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h3 className="font-semibold text-gray-900 mb-3">Quick Help</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Account Setup Help
              </button>
              <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Payment Issues
              </button>
              <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Trading Questions
              </button>
              <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Technical Support
              </button>
            </div>
          </Card>

          {/* Contact Methods */}
          <Card>
            <h3 className="font-semibold text-gray-900 mb-3">Other Ways to Reach Us</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-gray-900">Email</p>
                <p className="text-blue-600">support@bons-ai.com</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Phone</p>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Emergency</p>
                <p className="text-red-600">24/7 for critical issues</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};