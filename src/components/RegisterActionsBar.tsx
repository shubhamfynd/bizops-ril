import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RegisterSearchBar } from './RegisterSearchBar';
import { DateRange } from 'react-day-picker';

interface RegisterActionsBarProps {
  onCreateClick: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  searchPlaceholder?: string;
  createButtonText?: string;
}

export const RegisterActionsBar: React.FC<RegisterActionsBarProps> = ({
  onCreateClick,
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  searchPlaceholder,
  createButtonText = 'Create New Entry'
}) => {
  return (
    <div className="p-4 bg-white border-b">
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <Button
            className="bg-[#181f60] hover:bg-[#4f5fff]"
            onClick={onCreateClick}
          >
            <Plus className="w-4 h-4 mr-2" />
            {createButtonText}
          </Button>
        </div>

        <RegisterSearchBar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          dateRange={dateRange}
          onDateRangeChange={onDateRangeChange}
          placeholder={searchPlaceholder}
        />
      </div>
    </div>
  );
}; 