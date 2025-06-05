import React from 'react';
import { Shipment, DeliveryAssociate } from '@/lib/types';
import { MapPin, Clock, Truck } from 'lucide-react';

interface DeliveryMapProps {
  shipment: Shipment;
  associate?: DeliveryAssociate;
}

const DeliveryMap: React.FC<DeliveryMapProps> = ({ shipment, associate }) => {
  return (
    <div className="relative w-full h-60 bg-gray-200 rounded-lg mb-4">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <MapPin className="h-8 w-8 text-primary mb-2" />
        <p className="text-sm text-gray-600">Map View Coming Soon</p>
        
        {associate && (
          <div className="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">{associate.name}</p>
                  <p className="text-xs text-gray-500">{associate.phone}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-primary mr-1" />
                <span className="text-xs font-medium">
                  {shipment.eta ? new Date(shipment.eta).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryMap;
