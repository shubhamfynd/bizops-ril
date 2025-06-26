import React, { useState } from 'react';
import { Truck, Package, Calendar, AlertCircle, CheckCircle2, Clock, Menu, ChevronDown, Bell, MessageSquare, Search, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllDeliveries } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Deliveries = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  
  const deliveries = getAllDeliveries();

  const tabs = [
    { id: 'all', label: 'All Deliveries', count: deliveries.length },
    { id: 'pending', label: 'Pending', count: deliveries.filter(d => d.status === 'pending').length },
    { id: 'in-transit', label: 'In Transit', count: deliveries.filter(d => d.status === 'in-transit').length },
    { id: 'delivered', label: 'Delivered', count: deliveries.filter(d => d.status === 'delivered').length }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in-transit': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle2 size={16} />;
      case 'in-transit': return <Truck size={16} />;
      case 'pending': return <Clock size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#181f60] w-full pt-6 pb-4 shadow-md">
        <div className="flex items-center justify-between mx-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/home')}
              className="p-2 text-white"
            >
              <Menu size={24} />
            </button>
            <span className="text-white font-semibold text-lg ml-2">Deliveries</span>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="text-white" />
            <MessageSquare className="text-white" />
          </div>
        </div>
        <div className="flex items-center space-x-3 w-full max-w-2xl mx-auto m-2 px-4 py-3">
          <div className="flex items-center bg-[#353d7c] rounded-full px-4 py-2 flex-1">
            <input
              className="bg-transparent text-white placeholder-white/70 outline-none text-sm sm:text-base flex-1"
              placeholder="Search deliveries"
            />
            <Search className="text-white opacity-80" size={20} />
          </div>
          <button className="bg-[#353d7c] p-2 sm:p-3 rounded-full hover:bg-[#454d9c] transition">
            <QrCode className="text-white opacity-80" size={20} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="flex space-x-1 p-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center justify-center space-x-1">
                <span>{tab.label}</span>
                <span className="bg-white bg-opacity-20 px-1.5 py-0.5 rounded-full text-xs">
                  {tab.count}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Deliveries List */}
      <div className="p-4 space-y-3">
        {deliveries
          .filter(delivery => activeTab === 'all' || delivery.status === activeTab)
          .map((delivery) => (
            <Card key={delivery.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Package size={16} className="text-gray-400" />
                      <span className="font-medium text-gray-900">#{delivery.trackingNumber}</span>
                    </div>
                    <div className="text-sm text-gray-500 space-y-1">
                      <div>Items: {delivery.totalItems}</div>
                      <div>Scheduled: {new Date(delivery.scheduledTime).toLocaleDateString()}</div>
                      {delivery.eta && (
                        <div>ETA: {new Date(delivery.eta).toLocaleDateString()}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`flex items-center space-x-1 ${getStatusColor(delivery.status)}`}>
                      {getStatusIcon(delivery.status)}
                      <span className="capitalize">{delivery.status}</span>
                    </Badge>
                    <button
                      onClick={() => navigate(`/delivery/${delivery.id}`)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Deliveries;
