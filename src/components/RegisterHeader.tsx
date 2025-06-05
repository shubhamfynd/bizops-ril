import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface RegisterHeaderProps {
  title: string;
}

export const RegisterHeader: React.FC<RegisterHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#181f60] text-white">
      <div className="flex items-center px-4 py-3">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ChevronLeft size={24} className="text-white" />
        </button>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
    </div>
  );
}; 