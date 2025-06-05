import React, { useState } from 'react';
import { subDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RegisterHeader } from '@/components/RegisterHeader';
import { RegisterActionsBar } from '@/components/RegisterActionsBar';
import { StaffPurchaseList } from '@/components/staff/StaffPurchaseList';
import type { StaffPurchaseEntry } from '@/components/staff/StaffPurchaseList';
import { StaffPurchaseForm } from '@/components/staff/StaffPurchaseForm';
import { toast } from 'sonner';

// Mock data for demonstration
const mockEntries: StaffPurchaseEntry[] = [
  {
    id: '1',
    staffName: 'Rajesh Kumar',
    department: 'IT',
    transactionDate: new Date().toISOString(),
    transactionId: 'TRX001',
    cashierId: 'CASH001',
    transactionValue: 2500,
    articles: [
      {
        articleCode: 'ART001',
        description: 'Office Shirt',
        mrp: 1500,
        discountedPrice: 1200
      },
      {
        articleCode: 'ART002',
        description: 'Formal Trousers',
        mrp: 1500,
        discountedPrice: 1300
      }
    ],
    remarks: 'Staff purchase during sale',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    staffName: 'Priya Sharma',
    department: 'HR',
    transactionDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    transactionId: 'TRX002',
    cashierId: 'CASH002',
    transactionValue: 1800,
    articles: [
      {
        articleCode: 'ART003',
        description: 'Casual Shoes',
        mrp: 2000,
        discountedPrice: 1800
      }
    ],
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
  },
  {
    id: '3',
    staffName: 'Arjun Singh',
    department: 'Finance',
    transactionDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    transactionId: 'TRX003',
    cashierId: 'CASH001',
    transactionValue: 3200,
    articles: [
      {
        articleCode: 'ART004',
        description: 'Winter Jacket',
        mrp: 3500,
        discountedPrice: 3200
      }
    ],
    remarks: 'Winter collection purchase',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
  }
];

export const StaffPurchase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [entries, setEntries] = useState<StaffPurchaseEntry[]>(mockEntries);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateEntry = (data: Omit<StaffPurchaseEntry, 'id' | 'createdAt'>) => {
    const newEntry: StaffPurchaseEntry = {
      ...data,
      id: `TRX${String(entries.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
    };
    setEntries([newEntry, ...entries]);
    setIsDialogOpen(false);
    toast.success('Staff purchase entry created successfully');
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch = searchQuery === '' || 
      entry.staffName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.cashierId.toLowerCase().includes(searchQuery.toLowerCase());

    const entryDate = new Date(entry.transactionDate);
    const matchesDateRange = dateRange.from && dateRange.to && 
      entryDate >= dateRange.from && entryDate <= dateRange.to;

    return matchesSearch && matchesDateRange;
  });

  return (
    <div className="flex flex-col h-screen bg-[#f5f6fa]">
      <RegisterHeader title="Staff Purchase Register" />

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
        <StaffPurchaseList entries={filteredEntries} />
      </div>

      {/* New Entry Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>New Staff Purchase Entry</DialogTitle>
          </DialogHeader>
          <StaffPurchaseForm onSubmit={handleCreateEntry} />
        </DialogContent>
      </Dialog>
    </div>
  );
}; 