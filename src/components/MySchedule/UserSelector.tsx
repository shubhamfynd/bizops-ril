import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const users = [
  { id: 'current', name: 'My Schedule', role: 'Store Associate' },
  { id: 'sarah', name: 'Sarah Johnson', role: 'Store Manager' },
  { id: 'mike', name: 'Mike Chen', role: 'Sales Associate' },
  { id: 'emma', name: 'Emma Davis', role: 'Inventory Specialist' },
];

interface UserSelectorProps {
  selectedUser: string;
  onUserChange: (userId: string) => void;
  hideCurrentOption?: boolean;
  placeholder?: string;
}

const UserSelector: React.FC<UserSelectorProps> = ({ selectedUser, onUserChange, hideCurrentOption = false, placeholder }) => {
  const filteredUsers = hideCurrentOption ? users.filter(u => u.id !== 'current') : users;
  return (
    <Select value={selectedUser} onValueChange={onUserChange}>
      <SelectTrigger className="w-full max-w-xs">
        <SelectValue placeholder={placeholder || 'Select User'} />
      </SelectTrigger>
      <SelectContent>
        {filteredUsers.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.name} <span className="text-xs text-gray-400 ml-2">{user.role}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { UserSelector };
