
import React from 'react';
import { Calendar, Store } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-slate-900 text-white px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Store className="w-5 h-5" />
            <span className="font-semibold">MyStore 1</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Calendar className="w-6 h-6" />
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
            3
          </div>
        </div>
      </div>
    </header>
  );
};
