import React from 'react';
import { Home, Layers, BarChart2, ClipboardList, Settings } from 'lucide-react';

export const BottomNavigation = () => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, active: false },
    { id: 'inventory', label: 'Inventory', icon: Layers, active: false },
    { id: 'analytics', label: 'Analytics', icon: BarChart2, active: true },
    { id: 'tasks', label: 'Tasks', icon: ClipboardList, active: false },
    { id: 'settings', label: 'Settings', icon: Settings, active: false },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 rounded-b-xl">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-lg touch-manipulation transition-colors duration-150 ${
              item.active
                ? 'text-[#4F46E5] font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
