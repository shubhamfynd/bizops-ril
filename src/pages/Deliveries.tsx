import React, { useState } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import DeliveryTimeSection from '@/components/DeliveryTimeSection';
import { morningDeliveries, afternoonDeliveries, eveningDeliveries } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Shipment } from '@/lib/types';
import Footer from '@/components/Footer';
import { ChevronLeft, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TaskHeader from '@/components/TaskHeader';
import { Bell, MessageSquare, Mic, Search, QrCode, ChevronDown } from 'lucide-react';
import LeftMenu from '@/components/LeftMenu';
type StatusFilter = 'all' | 'pending' | 'in-transit' | 'delivered';

const Deliveries = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filterDeliveries = (deliveries: Shipment[]) => {
    if (statusFilter === 'all') return deliveries;
    return deliveries.filter(delivery => delivery.status === statusFilter);
  };

  const filteredMorningDeliveries = filterDeliveries(morningDeliveries);
  const filteredAfternoonDeliveries = filterDeliveries(afternoonDeliveries);
  const filteredEveningDeliveries = filterDeliveries(eveningDeliveries);
  const navigate = useNavigate();



  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-[#181f60] w-full pt-6 pb-4 shadow-md">
        <div className="flex items-center mx-4">
          <button
            onClick={() => { navigate('/home') }}
            className="p-2 text-white"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="">
            <span className="text-white font-semibold text-lg">Delivery Details</span>
          </div>

        </div>

      </div>

      <SearchBar />

      <div className="px-4 py-2 flex gap-2 overflow-x-auto">
        <Button
          variant={statusFilter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setStatusFilter('all')}
          className="whitespace-nowrap"
        >
          All
        </Button>
        <Button
          variant={statusFilter === 'pending' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setStatusFilter('pending')}
          className="whitespace-nowrap"
        >
          Pending
        </Button>
        <Button
          variant={statusFilter === 'in-transit' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setStatusFilter('in-transit')}
          className="whitespace-nowrap"
        >
          In Transit
        </Button>
        <Button
          variant={statusFilter === 'delivered' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setStatusFilter('delivered')}
          className="whitespace-nowrap"
        >
          Delivered
        </Button>
      </div>
      <div className='mt-4 pb-16 flex flex-col max-h-[calc(100vh-200px)] overflow-auto'>
        <DeliveryTimeSection
          title="Morning (4am - 10am)"
          timeSlot="morning"
          deliveries={filteredMorningDeliveries}
        />

        <DeliveryTimeSection
          title="Afternoon (10am - 4pm)"
          timeSlot="afternoon"
          deliveries={filteredAfternoonDeliveries}
        />

        <DeliveryTimeSection
          title="Evening (4pm - 10pm)"
          timeSlot="evening"
          deliveries={filteredEveningDeliveries}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Deliveries;
