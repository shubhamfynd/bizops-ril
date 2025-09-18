import React, { useState } from "react";
import { ChevronLeft, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ROUTES } from "@/lib/routes";

type ComparisonPeriod = 'vs-last-day' | 'wow' | 'yoy';

const Business: React.FC = () => {
  const navigate = useNavigate();
  const [comparisonPeriod, setComparisonPeriod] = useState<ComparisonPeriod>('vs-last-day');

  const handleBack = () => {
    navigate(-1);
  };

  // KPI data for different comparison periods
  const kpiData = {
    'vs-last-day': {
      targetVsSales: { percentage: 85.3, trend: 3.9, direction: 'up' as const, period: 'vs Last Day' },
      footfallVsAchieved: { percentage: 92.1, trend: -2.1, direction: 'down' as const, period: 'vs Last Day' },
      billsVsFootfall: { 
        percentage: 78.20, 
        trend: -0.80, 
        direction: 'down' as const, 
        period: 'vs Last Day',
        footfallTarget: '12,500',
        footfallActual: '11,475',
        billsTarget: '9,750',
        billsActual: '7,625',
        conversionRate: '66.45%',
        description: 'Bill conversion rate - customers who make purchases'
      },
      ipcm: { value: 2.1, trend: 0.3, direction: 'up' as const, period: 'vs Last Day' },
      ats: { value: 2537, trend: -150, direction: 'down' as const, period: 'vs Last Day' }
    },
    'wow': {
      targetVsSales: { percentage: 87.2, trend: 5.2, direction: 'up' as const, period: 'WoW' },
      footfallVsAchieved: { percentage: 89.8, trend: -3.5, direction: 'down' as const, period: 'WoW' },
      billsVsFootfall: { 
        percentage: 79.60, 
        trend: 1.80, 
        direction: 'up' as const, 
        period: 'WoW',
        footfallTarget: '87,500',
        footfallActual: '77,263',
        billsTarget: '68,250',
        billsActual: '54,327',
        conversionRate: '70.32%',
        description: 'Weekly bill conversion rate'
      },
      ipcm: { value: 2.3, trend: 0.2, direction: 'up' as const, period: 'WoW' },
      ats: { value: 2680, trend: 120, direction: 'up' as const, period: 'WoW' }
    },
    'yoy': {
      targetVsSales: { percentage: 82.4, trend: 8.7, direction: 'up' as const, period: 'YoY' },
      footfallVsAchieved: { percentage: 94.6, trend: 12.3, direction: 'up' as const, period: 'YoY' },
      billsVsFootfall: { 
        percentage: 75.80, 
        trend: -4.20, 
        direction: 'down' as const, 
        period: 'YoY',
        footfallTarget: '4,550,000',
        footfallActual: '4,204,200',
        billsTarget: '3,547,500',
        billsActual: '2,688,805',
        conversionRate: '63.95%',
        description: 'Annual bill conversion rate'
      },
      ipcm: { value: 1.9, trend: -0.4, direction: 'down' as const, period: 'YoY' },
      ats: { value: 2450, trend: 280, direction: 'up' as const, period: 'YoY' }
    }
  };

  const currentData = kpiData[comparisonPeriod];

  const handleKPIClick = (kpiType: string) => {
    navigate(`${ROUTES.KPI_DETAIL.replace(':kpiType', kpiType)}`);
  };

  // Helper function to determine RAG status based on percentage
  const getRAGStatus = (percentage: number, isReverse = false) => {
    if (isReverse) {
      // For metrics where lower is better (like conversion rate issues)
      if (percentage >= 90) return 'green';
      if (percentage >= 70) return 'amber';
      return 'red';
    } else {
      // For metrics where higher is better
      if (percentage >= 90) return 'green';
      if (percentage >= 70) return 'amber';
      return 'red';
    }
  };

  // Helper function for IPCM (Items Per Cash Memo) - higher is better
  const getIPCMRAGStatus = (value: number) => {
    if (value >= 3.0) return 'green';
    if (value >= 2.0) return 'amber';
    return 'red';
  };

  // Helper function for ATS (Average Ticket Size) - higher is better
  const getATSRAGStatus = (value: number) => {
    if (value >= 3000) return 'green';
    if (value >= 2000) return 'amber';
    return 'red';
  };

  // Helper function to get border color class
  const getBorderColor = (status: 'red' | 'amber' | 'green') => {
    switch (status) {
      case 'green': return 'border-l-green-500';
      case 'amber': return 'border-l-yellow-500';
      case 'red': return 'border-l-red-500';
      default: return 'border-l-gray-500';
    }
  };

  // Helper function to get text color class for values
  const getValueColor = (status: 'red' | 'amber' | 'green') => {
    switch (status) {
      case 'green': return 'text-green-500';
      case 'amber': return 'text-yellow-500';
      case 'red': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  // Helper function to get trend icon
  const getTrendIcon = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      return <TrendingUp size={12} className="text-green-500" />;
    } else {
      return <TrendingDown size={12} className="text-red-500" />;
    }
  };

  // Helper function to get trend color
  const getTrendColor = (direction: 'up' | 'down') => {
    return direction === 'up' ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-[#181f60] w-full pt-6 pb-4 shadow-md">
        <div className="flex items-center mx-4">
          <button
            onClick={handleBack}
            className="p-2 text-white"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="ml-2">
            <span className="text-white font-semibold text-lg">Business</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-600 text-sm font-medium">Key Metrics</h2>
            <div className="bg-white rounded-xl p-1 shadow-sm border">
              <ToggleGroup 
                type="single" 
                value={comparisonPeriod} 
                onValueChange={(value) => setComparisonPeriod(value as ComparisonPeriod)}
                className="grid grid-cols-3 gap-1"
              >
                <ToggleGroupItem 
                  value="vs-last-day" 
                  className="flex-1 py-2 px-3 text-xs font-medium rounded-lg data-[state=on]:bg-blue-600 data-[state=on]:text-white data-[state=on]:shadow-sm hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex flex-col items-center space-y-0.5">
                    <span className="text-xs font-semibold">Vs Last Day</span>
                    <span className="text-[10px] opacity-75">Daily</span>
                  </div>
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="wow" 
                  className="flex-1 py-2 px-3 text-xs font-medium rounded-lg data-[state=on]:bg-blue-600 data-[state=on]:text-white data-[state=on]:shadow-sm hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex flex-col items-center space-y-0.5">
                    <span className="text-xs font-semibold">WoW</span>
                    <span className="text-[10px] opacity-75">Weekly</span>
                  </div>
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="yoy" 
                  className="flex-1 py-2 px-3 text-xs font-medium rounded-lg data-[state=on]:bg-blue-600 data-[state=on]:text-white data-[state=on]:shadow-sm hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex flex-col items-center space-y-0.5">
                    <span className="text-xs font-semibold">YoY</span>
                    <span className="text-[10px] opacity-75">Yearly</span>
                  </div>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
          
          {/* KPI Cards */}
          <div className="space-y-4">
            {/* Target Vs Sales */}
            <div 
              className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${getBorderColor(getRAGStatus(currentData.targetVsSales.percentage))} cursor-pointer hover:shadow-md transition-shadow`}
              onClick={() => handleKPIClick('target-vs-sales')}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-gray-900 font-medium text-base">Target Vs Sales</h3>
                  <div className="flex items-center mt-1">
                    {getTrendIcon(currentData.targetVsSales.direction)}
                    <span className={`text-xs ml-1 ${getTrendColor(currentData.targetVsSales.direction)}`}>
                      {Math.abs(currentData.targetVsSales.trend)}% {currentData.targetVsSales.period}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-2xl font-bold ${getValueColor(getRAGStatus(currentData.targetVsSales.percentage))}`}>
                    {currentData.targetVsSales.percentage}%
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-gray-500">Target</span>
                    <div className="text-sm font-semibold text-gray-900">₹10,50,000</div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Actual Sales</span>
                    <div className="text-sm font-semibold text-gray-900">₹8,22,001</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Footfall Vs Achieved Footfall */}
            <div 
              className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${getBorderColor(getRAGStatus(currentData.footfallVsAchieved.percentage))} cursor-pointer hover:shadow-md transition-shadow`}
              onClick={() => handleKPIClick('footfall-vs-achieved')}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-gray-900 font-medium text-base">Target Footfall Vs Achieved Footfall</h3>
                  <div className="flex items-center mt-1">
                    {getTrendIcon(currentData.footfallVsAchieved.direction)}
                    <span className={`text-xs ml-1 ${getTrendColor(currentData.footfallVsAchieved.direction)}`}>
                      {Math.abs(currentData.footfallVsAchieved.trend)}% {currentData.footfallVsAchieved.period}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-2xl font-bold ${getValueColor(getRAGStatus(currentData.footfallVsAchieved.percentage))}`}>
                    {currentData.footfallVsAchieved.percentage}%
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-gray-500">Target Footfall</span>
                    <div className="text-sm font-semibold text-gray-900">4,500</div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Achieved Footfall</span>
                    <div className="text-sm font-semibold text-gray-900">4,145</div>
                  </div>
                </div>
              </div>
            </div>

            {/* No of Bills Vs Footfall */}
            <div 
              className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${getBorderColor(getRAGStatus(currentData.billsVsFootfall.percentage))} cursor-pointer hover:shadow-md transition-shadow`}
              onClick={() => handleKPIClick('bills-vs-footfall')}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-gray-900 font-medium text-base">Conversion %</h3>
                  <div className="flex items-center mt-1">
                    {getTrendIcon(currentData.billsVsFootfall.direction)}
                    <span className={`text-xs ml-1 ${getTrendColor(currentData.billsVsFootfall.direction)}`}>
                      {Math.abs(currentData.billsVsFootfall.trend)}% {currentData.billsVsFootfall.period}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-2xl font-bold ${getValueColor(getRAGStatus(currentData.billsVsFootfall.percentage))}`}>
                    {currentData.billsVsFootfall.percentage}%
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-gray-500">No. of Bills</span>
                    <div className="text-sm font-semibold text-gray-900">324</div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Footfall</span>
                    <div className="text-sm font-semibold text-gray-900">423</div>
                  </div>
                </div>
              </div>
            </div>

            {/* IPCM: Item Sold Vs Cash Memo */}
            <div 
              className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${getBorderColor(getIPCMRAGStatus(currentData.ipcm.value))} cursor-pointer hover:shadow-md transition-shadow`}
              onClick={() => handleKPIClick('ipcm')}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-gray-900 font-medium text-base">IPCM: Item Sold Vs Cash Memo</h3>
                  <div className="flex items-center mt-1">
                    {getTrendIcon(currentData.ipcm.direction)}
                    <span className={`text-xs ml-1 ${getTrendColor(currentData.ipcm.direction)}`}>
                      {Math.abs(currentData.ipcm.trend)} {currentData.ipcm.period}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-2xl font-bold ${getValueColor(getIPCMRAGStatus(currentData.ipcm.value))}`}>
                    {currentData.ipcm.value}
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-gray-500">Items Sold</span>
                    <div className="text-sm font-semibold text-gray-900">680</div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Cash Memos</span>
                    <div className="text-sm font-semibold text-gray-900">324</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ATS: Sales Vs No of Bills */}
            <div 
              className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${getBorderColor(getATSRAGStatus(currentData.ats.value))} cursor-pointer hover:shadow-md transition-shadow`}
              onClick={() => handleKPIClick('ats')}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-gray-900 font-medium text-base">ATS: Sales Vs No of Bills</h3>
                  <div className="flex items-center mt-1">
                    {getTrendIcon(currentData.ats.direction)}
                    <span className={`text-xs ml-1 ${getTrendColor(currentData.ats.direction)}`}>
                      ₹{Math.abs(currentData.ats.trend)} {currentData.ats.period}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-2xl font-bold ${getValueColor(getATSRAGStatus(currentData.ats.value))}`}>
                    ₹{currentData.ats.value.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-gray-500">Total Sales</span>
                    <div className="text-sm font-semibold text-gray-900">₹8,22,001</div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">No. of Bills</span>
                    <div className="text-sm font-semibold text-gray-900">324</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business;
