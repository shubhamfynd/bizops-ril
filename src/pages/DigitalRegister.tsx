import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search } from 'lucide-react';
import { registers, Register } from '@/data/registers';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ROUTES } from '@/lib/routes';

const DigitalRegister: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'registers' | 'pending'>('registers');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredRegisters = registers.filter(register =>
    register.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    register.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingRegisters = registers.filter(register => register.pendingEntries && register.pendingEntries > 0);

  const handleRegisterClick = (register: Register) => {
    if (register.id === 'visitor') {
      navigate(ROUTES.VISITOR_REGISTER);
    } else if (register.id === 'staff-purchase') {
      navigate(ROUTES.STAFF_PURCHASE);
    } else if (register.id === 'petty-cash') {
      navigate(ROUTES.PETTY_CASH_PURCHASE);
    } else if (register.id === 'eb-count') {
      navigate(ROUTES.EB_COUNT);
    } else if (register.id === 'inward') {
      navigate(ROUTES.INWARD_REGISTER);
    } else {
      // Handle other register clicks
      console.log('Clicked register:', register);
    }
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen bg-[#f5f6fa]">
        {/* Header */}
        <div className="bg-[#181f60] text-white">
          <div className="flex items-center px-4 py-3">
            <button onClick={() => navigate(-1)} className="mr-2">
              <ChevronLeft size={24} className="text-white" />
            </button>
            <h1 className="text-lg font-semibold">Digital Register</h1>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#4f5fff]">
            <button
              className={`flex-1 py-3 text-center text-sm font-medium ${
                activeTab === 'registers'
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('registers')}
            >
              Registers
            </button>
            <button
              className={`flex-1 py-3 text-center text-sm font-medium ${
                activeTab === 'pending'
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('pending')}
            >
              Pending Approval
              {pendingRegisters.length > 0 && (
                <Badge className="ml-2 bg-red-500 text-white" variant="secondary">
                  {pendingRegisters.length}
                </Badge>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-white border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search registers..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-3 gap-3">
            {(activeTab === 'registers' ? filteredRegisters : pendingRegisters).map((register) => (
              <Tooltip key={register.id}>
                <TooltipTrigger asChild>
                  <Card
                    className="aspect-square p-4 cursor-pointer hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center relative"
                    onClick={() => handleRegisterClick(register)}
                  >
                    <div className="mb-3">{register.icon}</div>
                    <h3 className="font-medium text-sm text-gray-900 mb-1">{register.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{register.description}</p>
                  </Card>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[200px]">
                  <p className="text-sm">{register.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default DigitalRegister; 