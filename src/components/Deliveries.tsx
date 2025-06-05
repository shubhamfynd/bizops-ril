import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Package, Calendar, AlertCircle, CheckCircle2, Clock, Menu, ChevronDown, Bell, MessageSquare, Search, QrCode } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import LeftMenu from "@/components/LeftMenu";
import Footer from "@/components/Footer";

interface Delivery {
  id: string;
  status: 'pending' | 'in-transit' | 'delivered';
  trackingNumber: string;
  estimatedDelivery: string;
  items: number;
  store: string;
}

const mockDeliveries: Delivery[] = [
  {
    id: '1',
    status: 'pending',
    trackingNumber: 'TRK123456',
    estimatedDelivery: '2024-03-20',
    items: 5,
    store: 'Store A'
  },
  {
    id: '2',
    status: 'in-transit',
    trackingNumber: 'TRK789012',
    estimatedDelivery: '2024-03-21',
    items: 3,
    store: 'Store B'
  },
  {
    id: '3',
    status: 'delivered',
    trackingNumber: 'TRK345678',
    estimatedDelivery: '2024-03-19',
    items: 8,
    store: 'Store C'
  }
];

const Deliveries: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const getStatusIcon = (status: Delivery['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500" size={20} />;
      case 'in-transit':
        return <Truck className="text-blue-500" size={20} />;
      case 'delivered':
        return <CheckCircle2 className="text-green-500" size={20} />;
    }
  };

  const getStatusBadge = (status: Delivery['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'in-transit':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">In Transit</Badge>;
      case 'delivered':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Delivered</Badge>;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#f5f6fa] overflow-hidden">
      {/* Header - Fixed at top */}
      <div className="bg-[#181f60] w-full pt-6 pb-4 shadow-md">
        <div className="flex items-center justify-between mx-4">
          <button
            onClick={toggleMenu}
            className="p-2 text-white"
          >
            <Menu />
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 bg-black bg-opacity-30 z-40"
                onClick={() => setShowMenu(false)}
              ></div>
              <div className="fixed top-0 left-0 h-full z-50">
                <LeftMenu />
              </div>
            </>
          )}

          <span className="text-white font-semibold text-lg flex items-center">Deliveries <ChevronDown size={18} className="ml-1" /></span>
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

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="w-full px-4 mt-4 bg-white rounded-2xl p-4 flex flex-col shadow mb-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Delivery Dashboard</h2>
            <Button onClick={() => navigate('/new-delivery')} className="bg-[#3b5bfd] hover:bg-[#2d4afd]">
              <Package className="mr-2" size={20} />
              New Delivery
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="space-y-4">
                {mockDeliveries.map((delivery) => (
                  <Card key={delivery.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(delivery.status)}
                          <span className="font-medium">Tracking #{delivery.trackingNumber}</span>
                          {getStatusBadge(delivery.status)}
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          <div>Store: {delivery.store}</div>
                          <div>Items: {delivery.items}</div>
                          <div>Estimated Delivery: {delivery.estimatedDelivery}</div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => navigate(`/delivery/${delivery.id}`)}
                        className="border-[#3b5bfd] text-[#3b5bfd] hover:bg-[#3b5bfd] hover:text-white"
                      >
                        View Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="font-medium mb-4">Delivery Calendar</h3>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Fixed at bottom */}
      {!showMenu && <Footer />}
    </div>
  );
};

export default Deliveries; 