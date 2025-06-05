
import React from "react";
import { ChevronRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const ClockInSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 mt-4">
      <div className="bg-blue-50 rounded-2xl p-4 flex flex-col shadow mb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-black-400">Jan 13, 2025 <span className="text-gray-400">Monday</span></span>
          <ChevronRight className="text-blue-700" size={18} />
        </div>
        <span className="text-xs text-gray-500 mb-2">0h / 12h 0m</span>
        <button onClick={() => { navigate("/map") }} className="bg-[#3b5bfd] text-white rounded-full py-2 font-semibold mt-1">Clock In</button>
      </div>
    </div>
  );
};

export default ClockInSection;
