
import React from 'react';
import { Search, Mic, Package } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SearchBar = () => {
  return (
    <div className="relative mx-4 my-3">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-gray-400" />
        <Input 
          type="text" 
          placeholder="Search" 
          className="pl-9 pr-9 py-2 bg-white rounded-full border border-gray-200"
        />
        <Mic className="absolute right-3 h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBar;
