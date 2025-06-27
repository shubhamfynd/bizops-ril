import React, { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Package, Calendar, Building, User, FileText, Truck, Box, Calculator, CheckCircle, Clock, X } from 'lucide-react';

export interface InwardEntry {
  id: string;
  date: string;
  fromLocation: string;
  vendor: string;
  brand: string;
  stnInvoiceNo: string;
  stnDate: string;
  deliveryNo: string;
  noOfBoxes: number;
  materialDocQuantity: number;
  countedQuantity: number;
  difference: number;
  grnNumber: string;
  grnDate: string;
  grdcNo: string;
  dateOfGrdc: string;
  status: 'open' | 'closed';
  inwardBy: string;
  wayBillDetails: string;
  waybillOutwardBy: string;
  supervisorSign: string;
  remarks?: string;
  createdAt: string;
}

interface InwardEntryListProps {
  entries: InwardEntry[];
  onUpdateEntry: (id: string, data: Partial<InwardEntry>) => void;
  InwardEntryFormComponent: React.ComponentType<{
    onSubmit: (data: any) => void;
    initialData?: any;
    isEditing?: boolean;
  }>;
}

export const InwardEntryList: React.FC<InwardEntryListProps> = ({ entries, onUpdateEntry, InwardEntryFormComponent }) => {
  const [selectedEntry, setSelectedEntry] = useState<InwardEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<InwardEntry | null>(null);

  const handleEntryClick = (entry: InwardEntry) => {
    if (entry.status === 'open') {
      // For pending entries, open the form modal
      setEditingEntry(entry);
      setIsFormModalOpen(true);
    } else {
      // For completed entries, open the details modal
      setSelectedEntry(entry);
      setIsModalOpen(true);
    }
  };

  const handleFormSubmit = (data: Omit<InwardEntry, 'id' | 'createdAt'>) => {
    if (editingEntry) {
      onUpdateEntry(editingEntry.id, {
        ...data,
        status: 'closed' // Move to completed status
      });
      setIsFormModalOpen(false);
      setEditingEntry(null);
    }
  };

  if (entries.length === 0) {
    return (
      <div className="text-center py-8">
        <Package className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No entries found</h3>
        <p className="mt-1 text-sm text-gray-500">
          No inward entries match your current filters.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {entries.map((entry) => (
          <Card 
            key={entry.id} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleEntryClick(entry)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {format(new Date(entry.date), 'dd MMM yyyy')}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{entry.stnInvoiceNo}</span>
                  </div>
                </div>
                
                <Badge 
                  variant={entry.status === 'closed' ? 'default' : 'secondary'}
                  className={entry.status === 'closed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                >
                  {entry.status === 'closed' ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <Clock className="h-3 w-3 mr-1" />
                  )}
                  {entry.status === 'closed' ? 'Completed' : 'Pending'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Details Modal for Completed Entries */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Inward Entry Details</span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </DialogTitle>
          </DialogHeader>
          
          {selectedEntry && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {format(new Date(selectedEntry.date), 'dd MMM yyyy')}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{selectedEntry.fromLocation}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{selectedEntry.vendor}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{selectedEntry.brand}</span>
                  </div>
                </div>

                {/* Document Numbers */}
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-medium text-gray-500">STN/Invoice No.</span>
                    <p className="text-sm text-gray-900">{selectedEntry.stnInvoiceNo}</p>
                  </div>
                  
                  <div>
                    <span className="text-xs font-medium text-gray-500">STN Date</span>
                    <p className="text-sm text-gray-900">{format(new Date(selectedEntry.stnDate), 'dd MMM yyyy')}</p>
                  </div>
                  
                  <div>
                    <span className="text-xs font-medium text-gray-500">Delivery No/AWB</span>
                    <p className="text-sm text-gray-900">{selectedEntry.deliveryNo}</p>
                  </div>
                  
                  <div>
                    <span className="text-xs font-medium text-gray-500">GRN Number</span>
                    <p className="text-sm text-gray-900">{selectedEntry.grnNumber}</p>
                  </div>
                </div>
              </div>

              {/* Quantities and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Box className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Boxes: {selectedEntry.noOfBoxes}</span>
                    </div>
                    <Badge 
                      variant={selectedEntry.status === 'closed' ? 'default' : 'secondary'}
                      className={selectedEntry.status === 'closed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                    >
                      {selectedEntry.status === 'closed' ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      {selectedEntry.status === 'closed' ? 'Completed' : 'Pending'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-xs text-gray-500">Doc Qty</span>
                      <p className="font-medium">{selectedEntry.materialDocQuantity}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Counted</span>
                      <p className="font-medium">{selectedEntry.countedQuantity}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Difference</span>
                      <p className={`font-medium ${selectedEntry.difference < 0 ? 'text-red-600' : selectedEntry.difference > 0 ? 'text-green-600' : 'text-gray-600'}`}>
                        {selectedEntry.difference > 0 ? '+' : ''}{selectedEntry.difference}
                      </p>
                    </div>
                  </div>
                </div>

                {/* GRN and GRDC Information */}
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-medium text-gray-500">GRN Date</span>
                    <p className="text-sm text-gray-900">{format(new Date(selectedEntry.grnDate), 'dd MMM yyyy')}</p>
                  </div>
                  
                  <div>
                    <span className="text-xs font-medium text-gray-500">GRDC No</span>
                    <p className="text-sm text-gray-900">{selectedEntry.grdcNo}</p>
                  </div>
                  
                  <div>
                    <span className="text-xs font-medium text-gray-500">Date of GRDC</span>
                    <p className="text-sm text-gray-900">{format(new Date(selectedEntry.dateOfGrdc), 'dd MMM yyyy')}</p>
                  </div>
                </div>
              </div>

              {/* Personnel Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{selectedEntry.inwardBy}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{selectedEntry.wayBillDetails}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-medium text-gray-500">Waybill Outward By</span>
                    <p className="text-sm text-gray-900">{selectedEntry.waybillOutwardBy}</p>
                  </div>
                  
                  <div>
                    <span className="text-xs font-medium text-gray-500">Supervisor Sign</span>
                    <p className="text-sm text-gray-900">{selectedEntry.supervisorSign}</p>
                  </div>
                </div>
              </div>

              {/* Remarks */}
              {selectedEntry.remarks && (
                <div className="pt-3 border-t border-gray-100">
                  <span className="text-xs font-medium text-gray-500">Remarks</span>
                  <p className="text-sm text-gray-600 mt-1">{selectedEntry.remarks}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Form Modal for Editing Pending Entries */}
      <Dialog open={isFormModalOpen} onOpenChange={setIsFormModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complete Inward Entry</DialogTitle>
          </DialogHeader>
          {editingEntry && (
            <InwardEntryFormComponent 
              onSubmit={handleFormSubmit}
              initialData={editingEntry}
              isEditing={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}; 