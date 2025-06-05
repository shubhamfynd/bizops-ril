
import React from 'react';
import { Calendar, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const QuickActions = () => {
  const actions = [
    { id: 'new-appointment', label: 'Book Customer', icon: Store, color: 'bg-blue-600 hover:bg-blue-700' },
    { id: 'new-task', label: 'Add Task', icon: Calendar, color: 'bg-purple-600 hover:bg-purple-700' },
  ];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <Button
            key={action.id}
            className={`${action.color} text-white p-4 h-auto flex flex-col items-center space-y-2 touch-manipulation`}
            onClick={() => console.log(`${action.label} clicked`)}
          >
            <action.icon className="w-6 h-6" />
            <span className="text-sm font-medium">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
