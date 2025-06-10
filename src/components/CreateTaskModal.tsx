import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { storeStaff } from '@/data/staff';
import { toast } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { Switch } from "@/components/ui/switch";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (taskData: {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    assigneeId: string;
    requiresImage: boolean;
  }) => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose, onCreateTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [requiresImage, setRequiresImage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !startTime || !endTime || !assigneeId) {
      toast.error('Please fill in all fields');
      return;
    }
    onCreateTask({
      title,
      description,
      startTime,
      endTime,
      assigneeId,
      requiresImage
    });
    toast.success('Task created successfully');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Create New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Name</Label>
            <Input
              id="title"
              placeholder="Enter task name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Task Description</Label>
            <textarea
              id="description"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[100px] p-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4f5fff] focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignee">Assign To</Label>
            <Select value={assigneeId} onValueChange={setAssigneeId}>
              <SelectTrigger id="assignee" className="w-full">
                <SelectValue placeholder="Select staff member" />
              </SelectTrigger>
              <SelectContent>
                {storeStaff.map((staff) => (
                  <SelectItem key={staff.id} value={staff.id}>
                    {staff.name} - {staff.role} ({staff.department})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Requires Image Upload</Label>
              <p className="text-xs text-gray-500">Staff will need to upload an image while completing this task</p>
            </div>
            <Switch
              checked={requiresImage}
              onCheckedChange={setRequiresImage}
              className="data-[state=checked]:bg-[#4f5fff]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-4"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#4f5fff] text-white px-4 hover:bg-[#3b3bfd]"
            >
              Create Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskModal; 