
import React from 'react';
import { Shipment, ShipmentItem } from '@/lib/types';
import { format } from 'date-fns';
import { Package, Clock, User } from 'lucide-react';

interface ShipmentDetailsProps {
  shipment: Shipment;
}

const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({ shipment }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Shipment Details</h3>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs 
          ${shipment.status === 'in-transit' 
            ? 'bg-blue-100 text-blue-800' 
            : shipment.status === 'delivered' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {shipment.status.replace('-', ' ')}
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center">
          <Package className="h-5 w-5 text-gray-400 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Tracking Number</p>
            <p className="font-medium">{shipment.trackingNumber}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-gray-400 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Scheduled Time</p>
            <p className="font-medium">{format(new Date(shipment.scheduledTime), "MMM d, yyyy h:mm a")}</p>
          </div>
        </div>
        
        {shipment.associateId && (
          <div className="flex items-center">
            <User className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Delivery Associate</p>
              <p className="font-medium">ID: {shipment.associateId}</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <h4 className="text-md font-medium mb-2">Items ({shipment.totalItems})</h4>
        <div className="bg-gray-50 rounded-lg p-3">
          {shipment.items.map((item) => (
            <ItemRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ItemRow: React.FC<{ item: ShipmentItem }> = ({ item }) => {
  return (
    <div className="py-2 border-b border-gray-200 last:border-b-0">
      <div className="flex justify-between">
        <p className="font-medium">{item.name}</p>
        <p className="text-sm">Qty: {item.quantity}</p>
      </div>
      <p className="text-sm text-gray-500">SKU: {item.sku}</p>
    </div>
  );
};

export default ShipmentDetails;
