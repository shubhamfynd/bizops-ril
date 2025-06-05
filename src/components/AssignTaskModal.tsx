import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, User } from 'lucide-react';
import { storeStaff, StaffMember } from '@/data/staff';
import { toast } from '@/components/ui/sonner';

interface AssignTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (staffId: string) => void;
  taskId: number;
}

const AssignTaskModal: React.FC<AssignTaskModalProps> = ({ isOpen, onClose, onAssign, taskId }) => {
  const [search, setSearch] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);

  const filteredStaff = storeStaff.filter(staff => 
    staff.name.toLowerCase().includes(search.toLowerCase()) ||
    staff.department.toLowerCase().includes(search.toLowerCase()) ||
    staff.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleStaffSelect = (staffId: string) => {
    setSelectedStaff(staffId);
    onAssign(staffId);
    toast.success('Task assigned successfully');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Assign Task to Staff</DialogTitle>
        </DialogHeader>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <Input
            placeholder="Search staff by name, role or department"
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="mt-4 max-h-[60vh] overflow-y-auto">
          {filteredStaff.map((staff) => (
            <div
              key={staff.id}
              className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${
                selectedStaff === staff.id ? 'bg-[#e6ecff]' : ''
              }`}
              onClick={() => handleStaffSelect(staff.id)}
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                {staff.image ? (
                  <img src={staff.image} alt={staff.name} className="w-full h-full rounded-full" />
                ) : (
                  <User className="text-gray-500" size={20} />
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{staff.name}</div>
                <div className="text-xs text-gray-500">{staff.role} • {staff.department}</div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignTaskModal; 