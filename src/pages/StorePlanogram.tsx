import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera, File } from 'lucide-react';
import PlanogramViewer from '@/components/storePlanogram/PlanogramViewer';
import ComplianceCapture from '@/components/storePlanogram/ComplianceCapture';
import CycleCount from '@/components/storePlanogram/CycleCount';

const StorePlanogram = () => {
  const [activeView, setActiveView] = useState('planogram');
  const tabs = [
    { id: 'planogram', label: 'Visual Merchandising', icon: File },
    { id: 'cycle-count', label: 'Inventory Count', icon: Camera },
    { id: 'compliance', label: 'Store Compliance', icon: Camera },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'planogram':
        return <PlanogramViewer />;
      case 'compliance':
        return <ComplianceCapture />;
      case 'cycle-count':
        return <CycleCount />;
      default:
        return <PlanogramViewer />;
    }
  };

  const navigate = useNavigate();

  // Refs for header and tabs
  const headerRef = useRef(null);
  const tabsRef = useRef(null);

  // State to hold calculated scroll height
  const [scrollHeight, setScrollHeight] = useState('calc(100vh)');

  useEffect(() => {
    function updateHeight() {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const tabsHeight = tabsRef.current?.offsetHeight || 0;
      setScrollHeight(`calc(100vh - ${headerHeight + tabsHeight}px)`);
    }
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div
        ref={headerRef}
        className="bg-[#181f60] w-full pt-6 pb-4 shadow-md sticky top-0 z-20"
      >
        <div className="flex items-center mx-4">
          <button onClick={() => navigate('/home')} className="p-2 text-white">
            <ChevronLeft size={24} />
          </button>
          <div>
            <span className="text-white font-semibold text-lg">Store Planogram</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <nav
        ref={tabsRef}
        className="bg-white border-b border-slate-200 sticky top-0 z-10"
      >
        <div className="flex px-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`flex-1 py-3 px-1 text-base font-medium transition-colors border-b-2
                ${
                  activeView === tab.id
                    ? 'text-slate-900 font-bold border-indigo-600'
                    : 'text-slate-500 border-transparent hover:text-slate-900'
                }`}
              style={{ outline: 'none' }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Scrollable Main Content */}
      <main
        className="overflow-y-auto"
        style={{ height: scrollHeight }}
      >
        {renderView()}
      </main>
    </div>
  );
};

export default StorePlanogram;
