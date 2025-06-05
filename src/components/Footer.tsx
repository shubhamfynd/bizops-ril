import React from "react";
import { useNavigate } from "react-router-dom";
import { Package, BarChart2, ClipboardList, Tag } from "lucide-react";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-2 z-50 shadow-md">
      <div className="max-w-[420px] w-full mx-auto flex justify-around items-center">
        <button
          onClick={() => navigate('/home')}
          className="flex flex-col items-center text-[#3b5bfd] focus:outline-none cursor-pointer"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-home"
          >
            <path d="M3 9.5V20a1 1 0 0 0 1 1h5m6 0h5a1 1 0 0 0 1-1V9.5a1 1 0 0 0-.553-.894l-7-3.5a1 1 0 0 0-.894 0l-7 3.5A1 1 0 0 0 3 9.5Z" />
            <path d="M9 21V12h6v9" />
          </svg>
          <span className="text-xs mt-1 font-medium">Home</span>
        </button>

        <button
          onClick={() => navigate('/inventory')}
          className="flex flex-col items-center text-gray-400 focus:outline-none cursor-pointer"
        >
          <Package size={24} />
          <span className="text-xs mt-1 font-medium">Inventory</span>
        </button>

        <button
          onClick={() => navigate('/analytics')}
          className="flex flex-col items-center text-gray-400 focus:outline-none cursor-pointer"
        >
          <BarChart2 size={24} />
          <span className="text-xs mt-1 font-medium">Analytics</span>
        </button>

        <button
          onClick={() => navigate('/tasks')}
          className="flex flex-col items-center text-gray-400 focus:outline-none cursor-pointer"
        >
          <ClipboardList size={24} />
          <span className="text-xs mt-1 font-medium">Tasks</span>
        </button>

        <button
          onClick={() => navigate('/promotions')}
          className="flex flex-col items-center text-gray-400 focus:outline-none cursor-pointer"
        >
          <Tag size={24} />
          <span className="text-xs mt-1 font-medium">Promotions</span>
        </button>
      </div>
    </nav>
  );
};

export default Footer; 