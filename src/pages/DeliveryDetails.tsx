import React, { useState } from 'react';
import { ArrowLeft, ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getDeliveryById } from '@/data/mockData';

const DeliveryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'details' | 'tracking'>('details');

  const delivery = id ? getDeliveryById(id) : undefined;

  if (!delivery) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Delivery not found</h1>
          <Button onClick={() => navigate('/deliveries')}>Back to Deliveries</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center px-4 py-3">
          <button
            onClick={() => navigate('/deliveries')}
            className="mr-3 text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-lg font-semibold">Delivery Details</h1>
            <p className="text-sm text-gray-500">#{delivery.id}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Status</span>
              <Badge 
                variant={delivery.status === 'delivered' ? 'default' : 'secondary'}
                className={delivery.status === 'delivered' ? 'bg-green-100 text-green-800' : ''}
              >
                {delivery.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Tracking Number:</span>
                <span className="font-medium">{delivery.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Scheduled Time:</span>
                <span className="font-medium">{new Date(delivery.scheduledTime).toLocaleString()}</span>
              </div>
              {delivery.eta && (
                <div className="flex justify-between">
                  <span className="text-gray-600">ETA:</span>
                  <span className="font-medium">{new Date(delivery.eta).toLocaleString()}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Package Details */}
        <Card>
          <CardHeader>
            <CardTitle>Package Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Items:</span>
                <span className="font-medium">{delivery.totalItems}</span>
              </div>
              <div className="space-y-2">
                <span className="text-gray-600">Items:</span>
                {delivery.items.map((item, index) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span className="font-medium">Qty: {item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex space-x-3">
          <Button className="flex-1" variant="outline">
            Track Package
          </Button>
          <Button className="flex-1">
            Mark as Delivered
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetails;
