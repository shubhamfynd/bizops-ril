import React, { useState, useEffect } from "react";
import { Package, Tag, BarChart2, ClipboardList, Truck, Users, SlidersHorizontal, Headphones, PieChart, ChevronUp, ChevronDown, AlarmClock } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/lib/routes";


interface QuickActionItem {
  icon: React.ReactNode;
  label: string;
  route?: string;
  badge?: number;
}

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const [showMoreQuick, setShowMoreQuick] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem('showMoreQuick');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('showMoreQuick', JSON.stringify(showMoreQuick));
  }, [showMoreQuick]);
  
  const quickActions: QuickActionItem[] = [
    { icon: <Package size={24} className="text-blue-700" />, label: "Inventory", route: ROUTES.INVENTORY },
    { icon: <PieChart size={24} className="text-blue-700" />, label: "Insights", route: ROUTES.INSIGHTS },
    { icon: <Tag size={24} className="text-blue-700" />, label: "Tasks", route: ROUTES.MY_TASKS },
    { icon: <Headphones size={24} className="text-blue-700" />, label: "Raise Tickets", route: ROUTES.TICKET_DASHBOARD, badge: 3 },
    { icon: <Truck size={24} className="text-blue-700" />, label: "Deliveries", route: ROUTES.DELIVERIES },
    { icon: <BarChart2 size={24} className="text-blue-700" />, label: "Communication" },
    { icon: <Users size={24} className="text-blue-700" />, label: "Digital Register", route: ROUTES.DIGITAL_REGISTER, badge: 1 },
    { icon: <SlidersHorizontal size={24} className="text-blue-700" />, label: "Store Planogram", route: ROUTES.STORE_PLANOMGRAM },
    { icon: <AlarmClock size={24} className="text-blue-700" />, label: "My Schedule", route: ROUTES.MY_SCHEDULE },
  ];

  return (
    <div className="px-4 mt-4">
      <div className="font-semibold text-base mb-2">Quick Actions</div>
      <div className="grid grid-cols-3 gap-3">
        {quickActions
          .slice(0, showMoreQuick ? quickActions.length : 6)
          .map((action) => (
            <div
              key={action.label}
              className="bg-white rounded-xl flex flex-col items-center justify-center py-4 shadow relative cursor-pointer"
              onClick={() => {
                navigate(
                  action.route ||
                    `/${action.label.toLowerCase().replace(/\s+/g, '-')}`
                );
              }}
            >
              {action.icon}
              <span className="text-xs mt-2 font-medium text-gray-700">
                {action.label}
              </span>
              {action.badge && (
                <span className="absolute top-2 right-3 bg-red-500 text-white text-[10px] rounded-full px-1.5 py-0.5">
                  {action.badge}
                </span>
              )}
            </div>
          ))}
      </div>
      <button
        className="mx-auto block text-[#3b5bfd] text-xs mt-2 font-semibold"
        onClick={() => setShowMoreQuick(!showMoreQuick)}
      >
        View {showMoreQuick ? 'Less' : 'More'}{' '}
        {showMoreQuick ? (
          <ChevronUp size={14} className="inline" />
        ) : (
          <ChevronDown size={14} className="inline" />
        )}
      </button>
    </div>
  );
};
export default QuickActions;
