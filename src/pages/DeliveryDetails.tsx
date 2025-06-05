import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft } from 'lucide-react';
import { getDeliveryById, getAssociateById } from '@/data/mockData';
import DeliveryMap from '@/components/DeliveryMap';
import ShipmentDetails from '@/components/ShipmentDetails';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const DeliveryDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const shipment = id ? getDeliveryById(id) : undefined;
  const associate = shipment?.associateId ? getAssociateById(shipment.associateId) : undefined;

  const handleStartGRN = () => {
    // TODO: Implement GRN functionality
    console.log('Starting GRN for shipment:', shipment?.id);
  };

  if (!shipment) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Shipment not found</p>
        <button 
          className="mt-4 bg-primary text-white px-4 py-2 rounded-lg"
          onClick={() => navigate('/deliveries')}
        >
          Back to Deliveries
        </button>
      </div>
    );
  }

  return (
    <div className="pb-16 min-h-screen">
      
      {/* <header className="bg-white py-4 px-4 flex items-center shadow-sm">
        <button onClick={() => navigate('/deliveries')} className="mr-3">
          <ChevronLeft size={24}/>
        </button>
        <h1 className="text-xl font-semibold">Delivery Details</h1>
      </header> */}

<div className="bg-[#181f60] w-full pt-6 pb-4 shadow-md">
        <div className="flex items-center mx-4">
          <button
            onClick={() => { navigate(-1) }}
            className="p-2 text-white"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="">
            <span className="text-white font-semibold text-lg">Delivery Details</span>
          </div>

        </div>

      </div>

      <div className="mt-4 pb-16 flex flex-col max-h-[calc(100vh-70px)] overflow-auto">
      <div className="p-4">
        {associate ? (
          <DeliveryMap shipment={shipment} associate={associate} />
        ) : (
          <div className="bg-gray-100 rounded-lg p-4 mb-4 text-center">
            <p className="text-gray-600">No delivery associate assigned yet.</p>
            <p className="text-sm text-gray-500">Map view will be available once an associate is assigned.</p>
          </div>
        )}
        
        <ShipmentDetails shipment={shipment} />

        <div className="mt-6 px-4">
          <Button 
            className={`w-full py-3 ${
              shipment.status === 'delivered' 
                ? 'bg-primary hover:bg-primary/90 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleStartGRN}
            disabled={shipment.status !== 'delivered'}
          >
            Start GRN
          </Button>
          {shipment.status !== 'delivered' && (
            <p className="text-sm text-gray-500 text-center mt-2">
              GRN can only be started for delivered shipments
            </p>
          )}
        </div>
      </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DeliveryDetails;
