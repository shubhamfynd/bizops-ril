
import React from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Search, File, Plus } from 'lucide-react';

interface NavigationProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const Navigation = ({ activeView, onNavigate }: NavigationProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: File },
    { id: 'planogram', label: 'Planograms', icon: File },
    { id: 'compliance', label: 'Compliance', icon: Camera },
    { id: 'cycle-count', label: 'RFID Count', icon: Search },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeView === item.id ? "default" : "ghost"}
            size="sm"
            className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
              activeView === item.id ? 'bg-blue-500 text-white' : 'text-slate-600'
            }`}
            onClick={() => onNavigate(item.id)}
          >
            <item.icon className="h-4 w-4" />
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
