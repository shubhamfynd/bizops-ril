import React, { useState } from 'react';
import { subDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RegisterHeader } from '@/components/RegisterHeader';
import { RegisterActionsBar } from '@/components/RegisterActionsBar';
import { PettyCashList } from '@/components/petty-cash/PettyCashList';
import type { PettyCashEntry } from '@/components/petty-cash/PettyCashList';
import { PettyCashForm } from '@/components/petty-cash/PettyCashForm';
import { toast } from 'sonner';

// Mock data for demonstration
const mockEntries: PettyCashEntry[] = [
  {
    id: '1',
    description: 'Office Supplies',
    purchaseDate: new Date().toISOString(),
    quantity: 5,
    billNo: 'BILL001',
    amount: 2500,
    vendorName: 'Stationery World',
    vendorAddress: '123 Main Street, City',
    remarks: 'Monthly office supplies',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    description: 'Cleaning Materials',
    purchaseDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    quantity: 10,
    billNo: 'BILL002',
    amount: 1800,
    vendorName: 'Clean Solutions',
    vendorAddress: '456 Market Road, City',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
  },
  {
    id: '3',
    description: 'Emergency Repairs',
    purchaseDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    quantity: 1,
    billNo: 'BILL003',
    amount: 3200,
    vendorName: 'Quick Fix Services',
    vendorAddress: '789 Service Lane, City',
    remarks: 'AC repair emergency',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
  }
];

export const PettyCashPurchase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [entries, setEntries] = useState<PettyCashEntry[]>(mockEntries);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateEntry = (data: Omit<PettyCashEntry, 'id' | 'createdAt'>) => {
    const newEntry: PettyCashEntry = {
      ...data,
      id: `PC${String(entries.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
    };
    setEntries([newEntry, ...entries]);
    setIsDialogOpen(false);
    toast.success('Petty cash entry created successfully');
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch = searchQuery === '' || 
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.billNo.toLowerCase().includes(searchQuery.toLowerCase());

    const entryDate = new Date(entry.createdAt);
    const matchesDateRange = dateRange.from && dateRange.to && 
      entryDate >= dateRange.from && entryDate <= dateRange.to;

    return matchesSearch && matchesDateRange;
  });

  return (
    <div className="flex flex-col h-screen bg-[#f5f6fa]">
      <RegisterHeader title="Petty Cash Purchase Register" />

      <RegisterActionsBar
        onCreateClick={() => setIsDialogOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        searchPlaceholder="Search entries..."
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <PettyCashList entries={filteredEntries} />
      </div>

      {/* New Entry Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>New Petty Cash Entry</DialogTitle>
          </DialogHeader>
          <PettyCashForm onSubmit={handleCreateEntry} />
        </DialogContent>
      </Dialog>
    </div>
  );
}; 