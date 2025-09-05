import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import { Order } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface OrderConfirmationModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  isOpen,
  onClose
}) => {
  if (!order || !isOpen) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const totalValue = order.price ? order.quantity * order.price : 0;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <Card 
          className="max-w-md w-full"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Order Placed Successfully!</h3>
                  <p className="text-sm text-gray-600">Order ID: #{order.id}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Order Details */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Order Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Symbol</span>
                    <span className="font-medium text-gray-900">{order.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Side</span>
                    <span className={`font-medium ${order.side === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                      {order.side.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Type</span>
                    <span className="font-medium text-gray-900">{order.type.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity</span>
                    <span className="font-medium text-gray-900">{order.quantity}</span>
                  </div>
                  {order.price && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price</span>
                      <span className="font-medium text-gray-900">{formatCurrency(order.price)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product Type</span>
                    <span className="font-medium text-gray-900">{order.productType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Validity</span>
                    <span className="font-medium text-gray-900">{order.validity}</span>
                  </div>
                  {totalValue > 0 && (
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-gray-600">Total Value</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(totalValue)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Status:</strong> Your order has been placed successfully and is being processed. 
                  You can track its status in the Orders section.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex space-x-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Close
              </Button>
              <Button onClick={onClose} className="flex-1">
                View Orders
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};