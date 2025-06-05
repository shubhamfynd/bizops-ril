import React from 'react';
import { Search } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Input } from '@/components/ui/input';
import { DateRangePicker } from '@/components/ui/date-range-picker/index';

interface RegisterSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  placeholder?: string;
}

export const RegisterSearchBar: React.FC<RegisterSearchBarProps> = ({
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  placeholder = 'Search entries...'
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <DateRangePicker
        value={dateRange}
        onChange={onDateRangeChange}
        className="w-[300px]"
      />
    </div>
  );
}; 