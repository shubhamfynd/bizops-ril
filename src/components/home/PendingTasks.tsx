
import React, { useState } from "react";
import { AlertCircle, CalendarDays, FileText } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import MyTasksList from "@/components/MyTasksList";
import OtherStoreTasksList from "@/components/OtherStoreTasksList";

interface PendingAction {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  due?: string;
  dueColor?: string;
  badge?: string;
}

const PendingTasks: React.FC = () => {
  const [activeTaskTab, setActiveTaskTab] = useState<'my' | 'other'>('other');
  const navigate = useNavigate();
  
  const pendingActions: PendingAction[] = [
    { title: "Assistance Request", subtitle: "Men's trial room 2, Floor 2", icon: <AlertCircle size={18} className="text-gray-400" /> },
    { title: "Shutter-Up Activities", subtitle: "Daily | SO Team", due: "Due by 5:30PM", icon: <CalendarDays size={18} className="text-orange-500" />, dueColor: "text-orange-500" },
    { title: "Store Review Checklist", subtitle: "Monthly | SO Team", due: "Due by Jan 21", icon: <FileText size={18} className="text-orange-500" />, dueColor: "text-orange-500" },
    { title: "Store Planogram", subtitle: "5 Attachments | SO Team", badge: "New", icon: <FileText size={18} className="text-blue-700" /> },
  ];

  return (
    <div className="px-4 mt-6">
      <div className="flex items-center mb-2">
        <span className="font-semibold text-base mr-2">Pending Store Tasks</span>
        <span className="bg-[#f0f4ff] text-[#181f60] text-xs rounded-full px-2 py-0.5 font-medium">36</span>
      </div>
      <div className="flex gap-3 mb-3 w-fit mt-4 mb-4">
        <button
          className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all
            ${activeTaskTab === 'my'
              ? 'bg-[#e6ecff] text-[#181f60] border-[#181f60]'
              : 'bg-transparent text-gray-600 border border-gray-300'}
          `}
          onClick={() => setActiveTaskTab('my')}
        >
          My Tasks
          <span className={`ml-2 text-xs rounded-full px-2 py-0.5 font-semibold border
            ${activeTaskTab === 'my'
              ? 'bg-white text-[#181f60]'
              : 'bg-[#f0f4ff] text-[#181f60]'}
          `}>
            8
          </span>
        </button>

        <button
          className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all
            ${activeTaskTab === 'other'
              ? 'bg-[#e6ecff] text-[#181f60] border-[#181f60]'
              : 'bg-transparent text-gray-600 border border-gray-300'}
          `}
          onClick={() => setActiveTaskTab('other')}
        >
          Other Store Tasks
          <span className={`ml-2 text-xs rounded-full px-2 py-0.5 font-semibold border
            ${activeTaskTab === 'other'
              ? 'bg-white text-[#181f60]'
              : 'bg-[#f0f4ff] text-[#181f60]'}
          `}>
            28
          </span>
        </button>
      </div>

      {activeTaskTab === 'my' ? (
        <MyTasksList fullView={false} onViewAll={() => navigate('/my-tasks')} onBack={() => {}} />
      ) : (
        <OtherStoreTasksList fullView={false} onViewAll={() => navigate('/other-store-tasks')} onBack={() => {}} />
      )}
    </div>
  );
};

export default PendingTasks;
