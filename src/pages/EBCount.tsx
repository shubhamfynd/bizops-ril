import React, { useState } from 'react';
import { subDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RegisterHeader } from '@/components/RegisterHeader';
import { RegisterActionsBar } from '@/components/RegisterActionsBar';
import { EBCountList, EBCountEntry } from '@/components/eb-count/EBCountList';
import { EBCountForm } from '@/components/eb-count/EBCountForm';
import { toast } from 'sonner';

// Mock data for demonstration
const mockEntries: EBCountEntry[] = [
  {
    id: '1',
    brandName: 'Brand A',
    physicalQuantity: 100,
    sohQuantity: 98,
    shortExcess: 2,
    brandSign: 'data:image/png;base64,...', // Mock signature data
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    brandName: 'Brand B',
    physicalQuantity: 150,
    sohQuantity: 150,
    shortExcess: 0,
    brandSign: 'data:image/png;base64,...', // Mock signature data
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
  },
  {
    id: '3',
    brandName: 'Brand C',
    physicalQuantity: 75,
    sohQuantity: 80,
    shortExcess: -5,
    brandSign: 'data:image/png;base64,...', // Mock signature data
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
  }
];

export const EBCount: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [entries, setEntries] = useState<EBCountEntry[]>(mockEntries);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateEntry = (data: Omit<EBCountEntry, 'id' | 'createdAt' | 'shortExcess'>) => {
    const shortExcess = data.physicalQuantity - data.sohQuantity;
    const newEntry: EBCountEntry = {
      ...data,
      id: `EB${String(entries.length + 1).padStart(3, '0')}`,
      shortExcess,
      createdAt: new Date().toISOString(),
    };
    setEntries([newEntry, ...entries]);
    setIsDialogOpen(false);
    toast.success('EB Count entry created successfully');
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch = searchQuery === '' || 
      entry.brandName.toLowerCase().includes(searchQuery.toLowerCase());

    const entryDate = new Date(entry.createdAt);
    const matchesDateRange = dateRange.from && dateRange.to && 
      entryDate >= dateRange.from && entryDate <= dateRange.to;

    return matchesSearch && matchesDateRange;
  });

  return (
    <div className="flex flex-col h-screen bg-[#f5f6fa]">
      <RegisterHeader title="EB Count Register" />

      <RegisterActionsBar
        onCreateClick={() => setIsDialogOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        searchPlaceholder="Search brands..."
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <EBCountList entries={filteredEntries} />
      </div>

      {/* New Entry Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>New EB Count Entry</DialogTitle>
          </DialogHeader>
          <EBCountForm onSubmit={handleCreateEntry} />
        </DialogContent>
      </Dialog>
    </div>
  );
}; 