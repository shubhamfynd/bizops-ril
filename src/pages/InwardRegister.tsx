import React, { useState } from 'react';
import { subDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RegisterHeader } from '@/components/RegisterHeader';
import { RegisterActionsBar } from '@/components/RegisterActionsBar';
import { InwardEntryForm } from '../components/inward/InwardEntryForm';
import { InwardEntryList, InwardEntry } from '@/components/inward/InwardEntryList';
import { toast } from 'sonner';

// Mock data for demonstration
const mockEntries: InwardEntry[] = [
  {
    id: '1',
    date: new Date().toISOString(),
    fromLocation: 'Mumbai Warehouse',
    vendor: 'ABC Suppliers Ltd',
    brand: 'Nike',
    stnInvoiceNo: 'STN001234',
    stnDate: new Date().toISOString(),
    deliveryNo: '',
    noOfBoxes: 0,
    materialDocQuantity: 0,
    countedQuantity: 0,
    difference: 0,
    grnNumber: '',
    grnDate: new Date().toISOString(),
    grdcNo: '',
    dateOfGrdc: new Date().toISOString(),
    status: 'open',
    inwardBy: '',
    wayBillDetails: '',
    waybillOutwardBy: '',
    supervisorSign: '',
    remarks: '',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    fromLocation: 'Delhi Distribution Center',
    vendor: 'XYZ Trading Co',
    brand: 'Adidas',
    stnInvoiceNo: 'STN001235',
    stnDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    deliveryNo: 'DEL789457',
    noOfBoxes: 30,
    materialDocQuantity: 600,
    countedQuantity: 600,
    difference: 0,
    grnNumber: 'GRN2024002',
    grnDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    grdcNo: 'GRDC002',
    dateOfGrdc: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    status: 'closed',
    inwardBy: 'Mike Johnson',
    wayBillDetails: 'WB123456790',
    waybillOutwardBy: 'Sarah Wilson',
    supervisorSign: 'data:image/png;base64,...', // Mock signature data
    remarks: 'All items received in perfect condition',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
  },
  {
    id: '3',
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    fromLocation: 'Bangalore Hub',
    vendor: 'PQR Logistics',
    brand: 'Puma',
    stnInvoiceNo: 'STN001236',
    stnDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    deliveryNo: '',
    noOfBoxes: 0,
    materialDocQuantity: 0,
    countedQuantity: 0,
    difference: 0,
    grnNumber: '',
    grnDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    grdcNo: '',
    dateOfGrdc: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    status: 'open',
    inwardBy: '',
    wayBillDetails: '',
    waybillOutwardBy: '',
    supervisorSign: '',
    remarks: '',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
  }
];

export const InwardRegister: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter entries based on active tab and search
  const filteredEntries = mockEntries.filter(entry => {
    const matchesTab = activeTab === 'pending' ? entry.status === 'open' : entry.status === 'closed';
    const matchesSearch = 
      entry.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.stnInvoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.grnNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const handleCreateEntry = (data: Omit<InwardEntry, 'id' | 'createdAt'>) => {
    const newEntry: InwardEntry = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    // In a real app, this would be an API call
    console.log('Creating new inward entry:', newEntry);
    toast.success('Inward entry created successfully');
    setIsDialogOpen(false);
  };

  const handleUpdateEntry = (id: string, data: Partial<InwardEntry>) => {
    // In a real app, this would be an API call
    console.log('Updating inward entry:', id, data);
    toast.success('Inward entry updated successfully');
  };

  return (
    <div className="flex flex-col h-screen bg-[#f5f6fa]">
      <RegisterHeader title="Inward Register" />

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="flex border-b border-[#4f5fff]">
          <button
            className={`flex-1 py-3 text-center text-sm font-medium ${
              activeTab === 'pending'
                ? 'text-[#181f60] border-b-2 border-[#181f60]'
                : 'text-gray-500 hover:text-[#181f60]'
            }`}
            onClick={() => setActiveTab('pending')}
          >
            Pending Entry
            {mockEntries.filter(entry => entry.status === 'open').length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {mockEntries.filter(entry => entry.status === 'open').length}
              </span>
            )}
          </button>
          <button
            className={`flex-1 py-3 text-center text-sm font-medium ${
              activeTab === 'completed'
                ? 'text-[#181f60] border-b-2 border-[#181f60]'
                : 'text-gray-500 hover:text-[#181f60]'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      <RegisterActionsBar
        onCreateClick={() => setIsDialogOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        searchPlaceholder="Search entries..."
        createButtonText="Create New Entry"
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <InwardEntryList 
          entries={filteredEntries} 
          onUpdateEntry={handleUpdateEntry}
          InwardEntryFormComponent={InwardEntryForm}
        />
      </div>

      {/* New Entry Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>New Inward Entry</DialogTitle>
          </DialogHeader>
          <InwardEntryForm onSubmit={handleCreateEntry} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InwardRegister; 