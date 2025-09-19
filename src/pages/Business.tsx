import React, { useState } from "react";
import { ChevronLeft, TrendingUp, TrendingDown, Brain, Calendar, RotateCcw, FileText, AlertTriangle, Target, Users, X, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ROUTES } from "@/lib/routes";

type ComparisonPeriod = 'vs-last-day' | 'wow' | 'yoy';

const Business: React.FC = () => {
  const navigate = useNavigate();
  const [comparisonPeriod, setComparisonPeriod] = useState<ComparisonPeriod>('vs-last-day');
  const [showAIModal, setShowAIModal] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  // KPI data for different comparison periods
  const kpiData = {
    'vs-last-day': {
      targetVsSales: { percentage: 85.30, trend: 3.90, direction: 'up' as const, period: 'vs Last Day' },
      footfallVsAchieved: { percentage: 92.10, trend: -2.10, direction: 'down' as const, period: 'vs Last Day' },
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
      ipcm: { value: 2.10, trend: 0.30, direction: 'up' as const, period: 'vs Last Day' },
      ats: { value: 2537.00, trend: -150.00, direction: 'down' as const, period: 'vs Last Day' }
    },
    'wow': {
      targetVsSales: { percentage: 87.20, trend: 5.20, direction: 'up' as const, period: 'WoW' },
      footfallVsAchieved: { percentage: 89.80, trend: -3.50, direction: 'down' as const, period: 'WoW' },
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
      ipcm: { value: 2.30, trend: 0.20, direction: 'up' as const, period: 'WoW' },
      ats: { value: 2680.00, trend: 120.00, direction: 'up' as const, period: 'WoW' }
    },
    'yoy': {
      targetVsSales: { percentage: 82.40, trend: 8.70, direction: 'up' as const, period: 'YoY' },
      footfallVsAchieved: { percentage: 94.60, trend: 12.30, direction: 'up' as const, period: 'YoY' },
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
      ipcm: { value: 1.90, trend: -0.40, direction: 'down' as const, period: 'YoY' },
      ats: { value: 2450.00, trend: 280.00, direction: 'up' as const, period: 'YoY' }
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
        <div className="space-y-4">
          {/* AI Analytics Section */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-600 text-sm font-medium">AI Analytics</h2>
            <div className="flex items-center">
              <Brain size={16} className="text-blue-500 mr-2" />
              <span className="text-blue-500 text-xs font-medium">Active</span>
            </div>
          </div>

          {/* AI Analytics List */}
          <div className="bg-white rounded-xl shadow-sm">
            {/* Sales Performance Alert */}
            <div className="flex items-start p-4 border-b border-gray-100">
              <Calendar size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-gray-900 font-semibold text-sm">Sales Performance Alert</h3>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">High Priority</span>
                </div>
                <p className="text-gray-500 text-sm">Daily sales target missed by ₹1.2L (14% gap) - trending below weekly average</p>
              </div>
            </div>

            {/* Customer Behavior Insight */}
            <div className="flex items-start p-4 border-b border-gray-100">
              <Users size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-gray-900 font-semibold text-sm">Customer Behavior Insight</h3>
                  <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">Important</span>
                </div>
                <p className="text-gray-500 text-sm">Weekend footfall increased 32% but conversion dropped to 68% - optimize staffing</p>
              </div>
            </div>

            {/* Inventory Optimization */}
            <div className="flex items-start p-4 border-b border-gray-100">
              <RotateCcw size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-gray-900 font-semibold text-sm">Inventory Optimization</h3>
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">Action Required</span>
                </div>
                <p className="text-gray-500 text-sm">Summer collection showing 45% slower movement - consider early markdown strategy</p>
              </div>
            </div>

            {/* View More Button */}
            <div className="flex items-center justify-center p-4">
              <button
                onClick={() => setShowAIModal(true)}
                className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <span>View More AI Insights</span>
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>

          {/* Key Metrics Section */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-600 text-sm font-medium">Key Metrics</h2>
            <Select value={comparisonPeriod} onValueChange={(value) => setComparisonPeriod(value as ComparisonPeriod)}>
              <SelectTrigger className="w-32 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vs-last-day" className="text-xs">
                  Vs Last Day
                </SelectItem>
                <SelectItem value="wow" className="text-xs">
                  WoW
                </SelectItem>
                <SelectItem value="yoy" className="text-xs">
                  YoY
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Target Vs Sales */}
              <div 
                className={`bg-white rounded-xl p-4 shadow-sm border-l-4 aspect-square flex flex-col justify-between ${getBorderColor(getRAGStatus(currentData.targetVsSales.percentage))} cursor-pointer hover:shadow-md transition-shadow`}
                onClick={() => handleKPIClick('target-vs-sales')}
              >
                <div>
                  <h3 className="text-gray-900 font-medium text-sm mb-2">Target Vs Sales</h3>
                  <div className="flex items-center mb-3">
                    {getTrendIcon(currentData.targetVsSales.direction)}
                    <span className={`text-xs ml-1 ${getTrendColor(currentData.targetVsSales.direction)}`}>
                      {Math.abs(currentData.targetVsSales.trend).toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div className="text-center mb-3">
                  <span className={`text-2xl font-bold ${getValueColor(getRAGStatus(currentData.targetVsSales.percentage))}`}>
                    {currentData.targetVsSales.percentage.toFixed(2)}%
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Target</span>
                      <span className="font-semibold text-gray-900">₹10.5L</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Actual</span>
                      <span className="font-semibold text-gray-900">₹8.2L</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Target Footfall Vs Achieved Footfall */}
              <div 
                className={`bg-white rounded-xl p-4 shadow-sm border-l-4 aspect-square flex flex-col justify-between ${getBorderColor(getRAGStatus(currentData.footfallVsAchieved.percentage))} cursor-pointer hover:shadow-md transition-shadow`}
                onClick={() => handleKPIClick('footfall-vs-achieved')}
              >
                <div>
                  <h3 className="text-gray-900 font-medium text-sm mb-2">Footfall</h3>
                  <div className="flex items-center mb-3">
                    {getTrendIcon(currentData.footfallVsAchieved.direction)}
                    <span className={`text-xs ml-1 ${getTrendColor(currentData.footfallVsAchieved.direction)}`}>
                      {Math.abs(currentData.footfallVsAchieved.trend).toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div className="text-center mb-3">
                  <span className={`text-2xl font-bold ${getValueColor(getRAGStatus(currentData.footfallVsAchieved.percentage))}`}>
                    {currentData.footfallVsAchieved.percentage.toFixed(2)}%
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Target</span>
                      <span className="font-semibold text-gray-900">4,500</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Actual</span>
                      <span className="font-semibold text-gray-900">4,145</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversion % */}
              <div 
                className={`bg-white rounded-xl p-4 shadow-sm border-l-4 aspect-square flex flex-col justify-between ${getBorderColor(getRAGStatus(currentData.billsVsFootfall.percentage))} cursor-pointer hover:shadow-md transition-shadow`}
                onClick={() => handleKPIClick('bills-vs-footfall')}
              >
                <div>
                  <h3 className="text-gray-900 font-medium text-sm mb-2">Conversion %</h3>
                  <div className="flex items-center mb-3">
                    {getTrendIcon(currentData.billsVsFootfall.direction)}
                    <span className={`text-xs ml-1 ${getTrendColor(currentData.billsVsFootfall.direction)}`}>
                      {Math.abs(currentData.billsVsFootfall.trend).toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div className="text-center mb-3">
                  <span className={`text-2xl font-bold ${getValueColor(getRAGStatus(currentData.billsVsFootfall.percentage))}`}>
                    {currentData.billsVsFootfall.percentage.toFixed(2)}%
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Bills</span>
                      <span className="font-semibold text-gray-900">324</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Footfall</span>
                      <span className="font-semibold text-gray-900">423</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* IPCM */}
              <div 
                className={`bg-white rounded-xl p-4 shadow-sm border-l-4 aspect-square flex flex-col justify-between ${getBorderColor(getIPCMRAGStatus(currentData.ipcm.value))} cursor-pointer hover:shadow-md transition-shadow`}
                onClick={() => handleKPIClick('ipcm')}
              >
                <div>
                  <h3 className="text-gray-900 font-medium text-sm mb-2">IPCM</h3>
                  <div className="flex items-center mb-3">
                    {getTrendIcon(currentData.ipcm.direction)}
                    <span className={`text-xs ml-1 ${getTrendColor(currentData.ipcm.direction)}`}>
                      {Math.abs(currentData.ipcm.trend).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="text-center mb-3">
                  <span className={`text-2xl font-bold ${getValueColor(getIPCMRAGStatus(currentData.ipcm.value))}`}>
                    {currentData.ipcm.value.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Items</span>
                      <span className="font-semibold text-gray-900">680</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Memos</span>
                      <span className="font-semibold text-gray-900">324</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ATS */}
              <div 
                className={`bg-white rounded-xl p-4 shadow-sm border-l-4 aspect-square flex flex-col justify-between ${getBorderColor(getATSRAGStatus(currentData.ats.value))} cursor-pointer hover:shadow-md transition-shadow`}
                onClick={() => handleKPIClick('ats')}
              >
                <div>
                  <h3 className="text-gray-900 font-medium text-sm mb-2">ATS</h3>
                  <div className="flex items-center mb-3">
                    {getTrendIcon(currentData.ats.direction)}
                    <span className={`text-xs ml-1 ${getTrendColor(currentData.ats.direction)}`}>
                      ₹{Math.abs(currentData.ats.trend).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="text-center mb-3">
                  <span className={`text-2xl font-bold ${getValueColor(getATSRAGStatus(currentData.ats.value))}`}>
                    ₹{currentData.ats.value.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Sales</span>
                      <span className="font-semibold text-gray-900">₹8.2L</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Bills</span>
                      <span className="font-semibold text-gray-900">324</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>

      {/* AI Analytics Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center">
                <Brain size={20} className="text-blue-500 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">AI Analytics Insights</h2>
              </div>
              <button
                onClick={() => setShowAIModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[60vh]">
              {/* Sales Performance Alert */}
              <div className="flex items-start p-4 border-b border-gray-100">
                <Calendar size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">Sales Performance Alert</h3>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">High Priority</span>
                  </div>
                  <p className="text-gray-500 text-sm">Daily sales target missed by ₹1.2L (14% gap) - trending below weekly average</p>
                </div>
              </div>

              {/* Customer Behavior Insight */}
              <div className="flex items-start p-4 border-b border-gray-100">
                <Users size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">Customer Behavior Insight</h3>
                    <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">Important</span>
                  </div>
                  <p className="text-gray-500 text-sm">Weekend footfall increased 32% but conversion dropped to 68% - optimize staffing</p>
                </div>
              </div>

              {/* Inventory Optimization */}
              <div className="flex items-start p-4 border-b border-gray-100">
                <RotateCcw size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">Inventory Optimization</h3>
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">Action Required</span>
                  </div>
                  <p className="text-gray-500 text-sm">Summer collection showing 45% slower movement - consider early markdown strategy</p>
                </div>
              </div>

              {/* Zero Sales Alert */}
              <div className="flex items-start p-4 border-b border-gray-100">
                <AlertTriangle size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">Zero Sales Alert</h3>
                    <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs font-medium">Monitor</span>
                  </div>
                  <p className="text-gray-500 text-sm">8 SKUs in formal wear category had zero sales in last 7 days</p>
                </div>
              </div>

              {/* Margin Analysis */}
              <div className="flex items-start p-4 border-b border-gray-100">
                <Target size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">Margin Analysis</h3>
                    <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">Important</span>
                  </div>
                  <p className="text-gray-500 text-sm">Average ticket size decreased by ₹180 (7%) - focus on upselling accessories</p>
                </div>
              </div>

              {/* High Markdown Alert */}
              <div className="flex items-start p-4">
                <FileText size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">High Markdown Alert</h3>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">High Priority</span>
                  </div>
                  <p className="text-gray-500 text-sm">Women's ethnic wear showing 28% markdown rate - review supplier pricing</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end p-6 border-t border-gray-200">
              <button
                onClick={() => setShowAIModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Business;
