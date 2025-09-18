import React from "react";
import { Settings, TrendingUp, DollarSign, Package, Wrench, Users, FileText, Monitor } from 'lucide-react';
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
  
  const quickActions: QuickActionItem[] = [
    { icon: <TrendingUp size={40} className="text-blue-700" />, label: "Business", route: ROUTES.BUSINESS },
    { icon: <Package size={40} className="text-blue-700" />, label: "Inventory", route: ROUTES.INVENTORY },
    { icon: <DollarSign size={40} className="text-blue-700" />, label: "Commercial" },
    { icon: <Settings size={40} className="text-blue-700" />, label: "Admin" },
    { icon: <Wrench size={40} className="text-blue-700" />, label: "Maintenance" },
    { icon: <Users size={40} className="text-blue-700" />, label: "People" },
    { icon: <FileText size={40} className="text-blue-700" />, label: "Service Charter" },
    { icon: <Monitor size={40} className="text-blue-700" />, label: "VM" },
  ];

  return (
    <div className="px-4 mt-4">
      <div className="font-semibold text-base mb-2">Quick Actions</div>
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <div
            key={action.label}
            className="bg-white rounded-xl flex flex-col items-center justify-center aspect-square shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow py-6"
            onClick={() => {
              navigate(
                action.route ||
                  `/${action.label.toLowerCase().replace(/\s+/g, '-')}`
              );
            }}
          >
            {action.icon}
            <span className="text-sm mt-3 font-medium text-gray-700 text-center">
              {action.label}
            </span>
            {action.badge && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] rounded-full px-1.5 py-0.5">
                {action.badge}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default QuickActions;
