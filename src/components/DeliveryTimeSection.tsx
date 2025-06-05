
import React from 'react';
import { ChevronRight, Package, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Shipment, TimeSlot } from '@/lib/types';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface DeliveryTimeSectionProps {
  title: string;
  timeSlot: TimeSlot;
  deliveries: Shipment[];
}

const DeliveryTimeSection: React.FC<DeliveryTimeSectionProps> = ({ 
  title, 
  timeSlot, 
  deliveries 
}) => {
  const navigate = useNavigate();

  const handleDeliveryClick = (deliveryId: string) => {
    navigate(`/delivery/${deliveryId}`);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between px-4 mb-2">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <div className="flex items-center text-primary">
          <span className="text-sm">View all</span>
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>

      {deliveries.length === 0 ? (
        <Card className="mx-4 p-4 flex items-center justify-center">
          <p className="text-gray-500">No deliveries scheduled</p>
        </Card>
      ) : (
        <div className="space-y-3 px-4">
          {deliveries.map((delivery) => (
            <Card 
              key={delivery.id}
              className="p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleDeliveryClick(delivery.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Tracking #{delivery.trackingNumber}</h3>
                    <p className="text-sm text-gray-500">
                      {delivery.totalItems} {delivery.totalItems === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>
                <div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs 
                    ${delivery.status === 'in-transit' 
                      ? 'bg-blue-100 text-blue-800' 
                      : delivery.status === 'delivered' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {delivery.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>
                  {format(new Date(delivery.scheduledTime), "h:mm a")}
                  {delivery.eta && ` • ETA: ${format(new Date(delivery.eta), "h:mm a")}`}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryTimeSection;
