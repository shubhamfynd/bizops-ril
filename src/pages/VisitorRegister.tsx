import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, subDays } from 'date-fns';
import { Search, Calendar, ChevronLeft, Plus } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DateRangePicker } from "@/components/ui/date-range-picker/index";
import { VisitorEntryForm } from '@/components/visitor/VisitorEntryForm';
import { VisitorEntryList, VisitorEntry } from '@/components/visitor/VisitorEntryList';
import { toast } from 'sonner';

// Mock data for demonstration
const mockEntries: VisitorEntry[] = [
  // Today's entries
  {
    id: '1',
    visitorName: 'Rajesh Kumar',
    comingFrom: 'Tata Consultancy Services',
    meetingWith: 'Store Manager',
    phoneNumber: '+91 98765 43210',
    purpose: 'Business Meeting',
    visitingPassNumber: 'VP001',
    timeIn: new Date().toISOString(),
    timeOut: new Date(new Date().setHours(new Date().getHours() + 2)).toISOString(),
    remarks: 'Discussed new product line and store expansion plans',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    visitorName: 'Priya Sharma',
    comingFrom: 'Infosys Technologies',
    meetingWith: 'IT Department Head',
    phoneNumber: '+91 98765 43211',
    purpose: 'System Maintenance',
    visitingPassNumber: 'VP002',
    timeIn: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  // Yesterday's entries
  {
    id: '3',
    visitorName: 'Arjun Singh',
    comingFrom: 'Wipro Limited',
    meetingWith: 'Sarah Davis',
    phoneNumber: '+91 98765 43212',
    purpose: 'Interview',
    visitingPassNumber: 'VP003',
    timeIn: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    timeOut: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    remarks: 'Senior Developer position - Technical round completed',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
  },
  {
    id: '4',
    visitorName: 'Ananya Patel',
    comingFrom: 'Reliance Retail',
    meetingWith: 'Merchandise Manager',
    phoneNumber: '+91 98765 43213',
    purpose: 'Supplier Meeting',
    visitingPassNumber: 'VP004',
    timeIn: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    timeOut: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    remarks: 'Discussed new collection launch',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
  },
  // Last week's entries
  {
    id: '5',
    visitorName: 'Vikram Malhotra',
    comingFrom: 'HDFC Bank',
    meetingWith: 'Store Security Head',
    phoneNumber: '+91 98765 43214',
    purpose: 'Security Audit',
    visitingPassNumber: 'VP005',
    timeIn: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    timeOut: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    remarks: 'Annual security system review completed',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
  },
  {
    id: '6',
    visitorName: 'Meera Gupta',
    comingFrom: 'ICICI Bank',
    meetingWith: 'Customer Service Manager',
    phoneNumber: '+91 98765 43215',
    purpose: 'Customer Satisfaction Survey',
    visitingPassNumber: 'VP006',
    timeIn: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
    timeOut: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
    remarks: 'Conducted store experience survey',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
  },
  {
    id: '7',
    visitorName: 'Rahul Verma',
    comingFrom: 'Larsen & Toubro',
    meetingWith: 'Facility Manager',
    phoneNumber: '+91 98765 43216',
    purpose: 'HVAC Maintenance',
    visitingPassNumber: 'VP007',
    timeIn: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    timeOut: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    remarks: 'Regular AC maintenance completed',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
  },
  // Older entries
  {
    id: '8',
    visitorName: 'Neha Reddy',
    comingFrom: 'Mahindra Group',
    meetingWith: 'Marketing Head',
    phoneNumber: '+91 98765 43217',
    purpose: 'Campaign Planning',
    visitingPassNumber: 'VP008',
    timeIn: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
    timeOut: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
    remarks: 'Discussed upcoming festival campaign',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
  },
  {
    id: '9',
    visitorName: 'Amit Shah',
    comingFrom: 'Tech Mahindra',
    meetingWith: 'Inventory Manager',
    phoneNumber: '+91 98765 43218',
    purpose: 'Software Demo',
    visitingPassNumber: 'VP009',
    timeIn: new Date(new Date().setDate(new Date().getDate() - 8)).toISOString(),
    timeOut: new Date(new Date().setDate(new Date().getDate() - 8)).toISOString(),
    remarks: 'New inventory management system presentation',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 8)).toISOString(),
  },
  {
    id: '10',
    visitorName: 'Pooja Desai',
    comingFrom: 'Axis Bank',
    meetingWith: 'HR Manager',
    phoneNumber: '+91 98765 43219',
    purpose: 'Training Program',
    visitingPassNumber: 'VP010',
    timeIn: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
    timeOut: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
    remarks: 'Customer service training session',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
  }
];

export const VisitorRegister: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [entries, setEntries] = useState<VisitorEntry[]>(mockEntries);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateEntry = (data: Omit<VisitorEntry, 'id' | 'createdAt'>) => {
    const newEntry: VisitorEntry = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    setEntries([newEntry, ...entries]);
    setIsDialogOpen(false);
    toast.success('Visitor entry created successfully');
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch = searchQuery === '' || 
      entry.visitorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.comingFrom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.meetingWith.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.visitingPassNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const entryDate = new Date(entry.createdAt);
    const matchesDateRange = dateRange.from && dateRange.to && 
      entryDate >= dateRange.from && entryDate <= dateRange.to;

    return matchesSearch && matchesDateRange;
  });

  return (
    <div className="flex flex-col h-screen bg-[#f5f6fa]">
      {/* Header */}
      <div className="bg-[#181f60] text-white">
        <div className="flex items-center px-4 py-3">
          <button onClick={() => navigate(-1)} className="mr-2">
            <ChevronLeft size={24} className="text-white" />
          </button>
          <h1 className="text-lg font-semibold">Visitor Register</h1>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="p-4 bg-white border-b">
        <div className="flex flex-col gap-3">
          <div className="flex justify-end">
            <Button
              className="bg-[#181f60] hover:bg-[#4f5fff]"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Entry
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search visitors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              className="w-[300px]"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <VisitorEntryList entries={filteredEntries} />
      </div>

      {/* New Entry Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>New Visitor Entry</DialogTitle>
          </DialogHeader>
          <VisitorEntryForm onSubmit={handleCreateEntry} />
        </DialogContent>
      </Dialog>
    </div>
  );
}; 