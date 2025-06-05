
import React from 'react';
import { cn } from "@/lib/utils";

interface DashboardToggleProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardToggle: React.FC<DashboardToggleProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
      <button
        className={cn(
          "flex-1 py-2 text-sm font-medium rounded-md transition-colors",
          activeTab === "store" ? "bg-indigo-600 text-white" : "text-gray-600"
        )}
        onClick={() => setActiveTab("store")}
      >
        <div className="flex justify-center items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-store"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7"/><path d="M18 12a2 2 0 0 1-2-2V7"/><path d="M14 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7"/><path d="M10 12a2 2 0 0 1-2-2V7"/><path d="M6 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7"/></svg>
          <span>Store</span>
        </div>
      </button>
      <button
        className={cn(
          "flex-1 py-2 text-sm font-medium rounded-md transition-colors",
          activeTab === "own" ? "bg-indigo-600 text-white" : "text-gray-600"
        )}
        onClick={() => setActiveTab("own")}
      >
        <div className="flex justify-center items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>Own</span>
        </div>
      </button>
      <button
        className={cn(
          "flex-1 py-2 text-sm font-medium rounded-md transition-colors",
          activeTab === "product" ? "bg-indigo-600 text-white" : "text-gray-600"
        )}
        onClick={() => setActiveTab("product")}
      >
        <div className="flex justify-center items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
          <span>Product</span>
        </div>
      </button>
    </div>
  );
};

export default DashboardToggle;
