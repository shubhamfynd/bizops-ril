import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, TrendingUp, TrendingDown, Filter, ChevronRight, Home, Sparkles, Calendar, RotateCcw, FileText, AlertTriangle, Target, Users, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ROUTES } from "@/lib/routes";

type ComparisonPeriod = 'vs-last-day' | 'wow' | 'yoy';

interface AttributeFilters {
  segment: string;
  brand: string;
  brick: string;
  fashionGrade: string;
}

interface StateData {
  state: string;
  percentage: number;
  trend: number;
  direction: 'up' | 'down';
  target: string | number;
  actual: string | number;
  ragStatus: 'red' | 'amber' | 'green';
}

const ZoneDrillDown: React.FC = () => {
  const { kpiType, zone } = useParams<{ kpiType: string; zone: string }>();
  const navigate = useNavigate();
  const [comparisonPeriod, setComparisonPeriod] = useState<ComparisonPeriod>('vs-last-day');
  const [showAIModal, setShowAIModal] = useState(false);
  const [attributeFilters, setAttributeFilters] = useState<AttributeFilters>({
    segment: 'all',
    brand: 'all',
    brick: 'all',
    fashionGrade: 'all'
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleBreadcrumbClick = (path: string) => {
    navigate(path);
  };

  const handleStateClick = (stateName: string) => {
    const stateSlug = stateName.toLowerCase().replace(/\s+/g, '-');
    navigate(`${ROUTES.STATE_DRILL_DOWN.replace(':kpiType', kpiType || '').replace(':zone', zone || '').replace(':state', stateSlug)}`);
  };

  // Filter options data
  const filterOptions = {
    segment: [
      { value: 'all', label: 'All Segments' },
      { value: 'mens', label: 'Mens' },
      { value: 'womens', label: 'Womens' },
      { value: 'kids', label: 'Kids' },
      { value: 'home', label: 'Home' }
    ],
    brand: [
      { value: 'all', label: 'All Brands' },
      { value: 'brand-a', label: 'Brand A' },
      { value: 'brand-b', label: 'Brand B' },
      { value: 'brand-c', label: 'Brand C' },
      { value: 'brand-d', label: 'Brand D' }
    ],
    brick: [
      { value: 'all', label: 'All Bricks' },
      { value: 'premium', label: 'Premium' },
      { value: 'mid-market', label: 'Mid Market' },
      { value: 'value', label: 'Value' },
      { value: 'budget', label: 'Budget' }
    ],
    fashionGrade: [
      { value: 'all', label: 'All Grades' },
      { value: 'a-plus', label: 'A+' },
      { value: 'a', label: 'A' },
      { value: 'b-plus', label: 'B+' },
      { value: 'b', label: 'B' },
      { value: 'c', label: 'C' }
    ]
  };

  const handleFilterChange = (filterType: keyof AttributeFilters, value: string) => {
    setAttributeFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Helper function to determine RAG status based on percentage
  const getRAGStatus = (percentage: number, isReverse = false) => {
    if (isReverse) {
      if (percentage >= 90) return 'green';
      if (percentage >= 70) return 'amber';
      return 'red';
    } else {
      if (percentage >= 90) return 'green';
      if (percentage >= 70) return 'amber';
      return 'red';
    }
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

  // Indian states data for different zones
  const getStateData = (): StateData[] => {
    const zoneStates = {
      north: ['Delhi', 'Haryana', 'Himachal Pradesh', 'Jammu & Kashmir', 'Punjab', 'Rajasthan', 'Uttar Pradesh', 'Uttarakhand'],
      east: ['Bihar', 'Jharkhand', 'Odisha', 'West Bengal', 'Assam', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Sikkim', 'Tripura'],
      west: ['Maharashtra', 'Gujarat', 'Goa', 'Madhya Pradesh', 'Chhattisgarh'],
      south: ['Karnataka', 'Kerala', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Puducherry']
    };

    const baseData = {
      'vs-last-day': {
        north: { basePercentage: 88.20, trend: 4.10, direction: 'up' as const },
        east: { basePercentage: 82.50, trend: -1.80, direction: 'down' as const },
        west: { basePercentage: 85.70, trend: 2.30, direction: 'up' as const },
        south: { basePercentage: 79.30, trend: -3.20, direction: 'down' as const }
      },
      'wow': {
        north: { basePercentage: 90.10, trend: 5.80, direction: 'up' as const },
        east: { basePercentage: 84.20, trend: -2.10, direction: 'down' as const },
        west: { basePercentage: 87.30, trend: 3.40, direction: 'up' as const },
        south: { basePercentage: 81.60, trend: -1.50, direction: 'down' as const }
      },
      'yoy': {
        north: { basePercentage: 85.70, trend: 9.20, direction: 'up' as const },
        east: { basePercentage: 78.90, trend: -4.30, direction: 'down' as const },
        west: { basePercentage: 83.10, trend: 6.70, direction: 'up' as const },
        south: { basePercentage: 76.40, trend: -7.10, direction: 'down' as const }
      }
    };

    const currentZoneData = baseData[comparisonPeriod][zone as keyof typeof baseData[typeof comparisonPeriod]];
    const states = zoneStates[zone as keyof typeof zoneStates] || [];
    
    return states.map((state, index) => {
      // Add some variation to each state's data
      const variation = (Math.random() - 0.5) * 15; // ±7.5% variation
      const statePercentage = Math.max(0, Math.min(100, currentZoneData.basePercentage + variation));
      
      return {
        state,
        percentage: Math.round((Math.max(0, Math.min(100, currentZoneData.basePercentage + variation)) * 100) / 100),
        trend: Math.round((currentZoneData.trend + (Math.random() - 0.5) * 3) * 100) / 100,
        direction: currentZoneData.direction,
        target: kpiType === 'ats' ? '₹2,500' : 
                kpiType === 'ipcm' ? '2.5' : 
                kpiType === 'bills-vs-footfall' ? '9,750' :
                '₹10,50,000',
        actual: kpiType === 'ats' ? `₹${(statePercentage * 30).toFixed(0)}` : 
                kpiType === 'ipcm' ? statePercentage / 40 : 
                kpiType === 'bills-vs-footfall' ? Math.round(statePercentage * 125).toLocaleString() :
                `₹${(statePercentage * 10000).toLocaleString()}`,
        ragStatus: getRAGStatus(statePercentage)
      };
    });
  };

  const stateData = getStateData();

  const getKPITitle = () => {
    switch (kpiType) {
      case 'target-vs-sales': return 'Target Vs Sales';
      case 'footfall-vs-achieved': return 'Footfall';
      case 'bills-vs-footfall': return 'Conversion %';
      case 'ipcm': return 'IPCM: Item Sold Vs Cash Memo';
      case 'ats': return 'ATS: Sales Vs No of Bills';
      default: return 'KPI Detail';
    }
  };

  const getKPISubtitle = () => {
    const zoneName = zone?.charAt(0).toUpperCase() + zone?.slice(1) || '';
    switch (kpiType) {
      case 'target-vs-sales': return `${zoneName} Zone - Sales performance by state`;
      case 'footfall-vs-achieved': return `${zoneName} Zone - Footfall achievement by state`;
      case 'bills-vs-footfall': return `${zoneName} Zone - Bill conversion rates by state`;
      case 'ipcm': return `${zoneName} Zone - Items per cash memo by state`;
      case 'ats': return `${zoneName} Zone - Average ticket size by state`;
      default: return `${zoneName} Zone - State-wise breakdown`;
    }
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
            <span className="text-white font-semibold text-lg">{getKPITitle()}</span>
          </div>
        </div>
      </div>

      {/* Smart Breadcrumbs */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center min-w-0">
          {/* Always show first item */}
          <button
            onClick={() => handleBreadcrumbClick(ROUTES.BUSINESS)}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 flex-shrink-0"
          >
            <Home size={14} />
            <span className="text-sm font-medium">Business</span>
          </button>
          
          {/* Separator */}
          <ChevronRight size={14} className="text-gray-400 mx-2 flex-shrink-0" />
          
          {/* Middle items with overflow handling */}
          <div className="flex items-center min-w-0 flex-1">
            <button
              onClick={() => handleBreadcrumbClick(`${ROUTES.KPI_DETAIL.replace(':kpiType', kpiType || '')}`)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium truncate max-w-[120px]"
              title={getKPITitle()}
            >
              {getKPITitle()}
            </button>
          </div>
          
          {/* Separator */}
          <ChevronRight size={14} className="text-gray-400 mx-2 flex-shrink-0" />
          
          {/* Current item - always visible */}
          <div className="flex items-center space-x-1 flex-shrink-0">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
            <span className="text-sm text-gray-600 font-medium truncate max-w-[100px]" title={`${zone?.charAt(0).toUpperCase() + zone?.slice(1)} Zone`}>
              {zone?.charAt(0).toUpperCase() + zone?.slice(1)} Zone
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {/* State Details Section */}
          <div className="mb-4">
            <div className="mb-3">
              <h2 className="text-gray-600 text-sm font-medium">{getKPISubtitle()}</h2>
            </div>

            {/* Time Filter */}
            <div className="mb-4">
              <div className="flex justify-end mb-3">
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
            </div>

            {/* Attribute Filters */}
            <div className="mb-4">
              <div className="flex overflow-x-auto space-x-3 pb-2">
                {/* Segment Filter */}
                <div className="flex-shrink-0">
                  <label className="text-xs text-gray-500 mb-1 block">Segment</label>
                  <Select value={attributeFilters.segment} onValueChange={(value) => handleFilterChange('segment', value)}>
                    <SelectTrigger className="h-8 text-xs w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {filterOptions.segment.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-xs">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Brand Filter */}
                <div className="flex-shrink-0">
                  <label className="text-xs text-gray-500 mb-1 block">Brand</label>
                  <Select value={attributeFilters.brand} onValueChange={(value) => handleFilterChange('brand', value)}>
                    <SelectTrigger className="h-8 text-xs w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {filterOptions.brand.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-xs">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Brick Filter */}
                <div className="flex-shrink-0">
                  <label className="text-xs text-gray-500 mb-1 block">Brick</label>
                  <Select value={attributeFilters.brick} onValueChange={(value) => handleFilterChange('brick', value)}>
                    <SelectTrigger className="h-8 text-xs w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {filterOptions.brick.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-xs">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Fashion Grade Filter */}
                <div className="flex-shrink-0">
                  <label className="text-xs text-gray-500 mb-1 block">Fashion Grade</label>
                  <Select value={attributeFilters.fashionGrade} onValueChange={(value) => handleFilterChange('fashionGrade', value)}>
                    <SelectTrigger className="h-8 text-xs w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {filterOptions.fashionGrade.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-xs">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          
          {/* State-wise KPI Cards */}
          <div className="grid grid-cols-2 gap-4">
            {stateData.map((data, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl p-4 shadow-sm border-l-4 aspect-square flex flex-col justify-between ${getBorderColor(data.ragStatus)} cursor-pointer hover:shadow-md transition-all duration-300 hover:scale-105 animate-fade-in-up`}
                onClick={() => handleStateClick(data.state)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div>
                  <h3 className="text-gray-900 font-medium text-sm mb-2">{data.state}</h3>
                  <div className="flex items-center mb-3">
                    {getTrendIcon(data.direction)}
                    <span className={`text-xs ml-1 ${getTrendColor(data.direction)}`}>
                      {Math.abs(data.trend).toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div className="text-center mb-3">
                  <span className={`text-2xl font-bold ${getValueColor(data.ragStatus)}`}>
                    {kpiType === 'ats' ? `₹${(data.percentage * 30).toFixed(2)}` : 
                     kpiType === 'ipcm' ? (data.percentage / 40).toFixed(2) : 
                     `${data.percentage.toFixed(2)}%`}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Target</span>
                      <span className="font-semibold text-gray-900">{data.target}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Actual</span>
                      <span className="font-semibold text-gray-900">{data.actual}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 3 and Bottom 3 Stores */}
        <div className="space-y-4 mt-8">
          {/* Top 3 Stores */}
          <div>
            <h2 className="text-gray-600 text-sm font-medium mb-3">Top 3 Stores</h2>
            <div className="bg-white rounded-xl shadow-sm">
              <div className="space-y-0">
                {(() => {
                  // Generate KPI-specific data based on kpiType
                  let topStores = [];
                  if (kpiType === 'target-vs-sales') {
                    topStores = [
                      { name: "RT-001 Mumbai", zone: "North", value: "₹12.5L", achievement: "125.5%" },
                      { name: "RT-003 Delhi", zone: "North", value: "₹11.8L", achievement: "118.2%" },
                      { name: "RT-007 Bangalore", zone: "South", value: "₹11.2L", achievement: "112.8%" }
                    ];
                  } else if (kpiType === 'footfall-vs-achieved') {
                    topStores = [
                      { name: "RT-001 Mumbai", zone: "North", value: "4,850", achievement: "107.8%" },
                      { name: "RT-003 Delhi", zone: "North", value: "4,720", achievement: "104.9%" },
                      { name: "RT-007 Bangalore", zone: "South", value: "4,650", achievement: "103.3%" }
                    ];
                  } else if (kpiType === 'bills-vs-footfall') {
                    topStores = [
                      { name: "RT-001 Mumbai", zone: "North", value: "8.2%", achievement: "125.5%" },
                      { name: "RT-003 Delhi", zone: "North", value: "7.8%", achievement: "118.2%" },
                      { name: "RT-007 Bangalore", zone: "South", value: "7.5%", achievement: "112.8%" }
                    ];
                  } else if (kpiType === 'ipcm') {
                    topStores = [
                      { name: "RT-001 Mumbai", zone: "North", value: "3.2", achievement: "128.0%" },
                      { name: "RT-003 Delhi", zone: "North", value: "3.1", achievement: "124.0%" },
                      { name: "RT-007 Bangalore", zone: "South", value: "3.0", achievement: "120.0%" }
                    ];
                  } else if (kpiType === 'ats') {
                    topStores = [
                      { name: "RT-001 Mumbai", zone: "North", value: "₹3,200", achievement: "128.0%" },
                      { name: "RT-003 Delhi", zone: "North", value: "₹3,100", achievement: "124.0%" },
                      { name: "RT-007 Bangalore", zone: "South", value: "₹3,000", achievement: "120.0%" }
                    ];
                  }
                  return topStores.map((store, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-gray-900 font-medium text-sm">{store.name}</h3>
                          <p className="text-gray-500 text-xs">{store.zone} Zone</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-900 font-semibold text-sm">{store.value}</p>
                        <p className="text-green-600 text-xs font-medium">{store.achievement}</p>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>

          {/* Bottom 3 Stores */}
          <div>
            <h2 className="text-gray-600 text-sm font-medium mb-3">Bottom 3 Stores</h2>
            <div className="bg-white rounded-xl shadow-sm">
              <div className="space-y-0">
                {(() => {
                  // Generate KPI-specific data based on kpiType
                  let bottomStores = [];
                  if (kpiType === 'target-vs-sales') {
                    bottomStores = [
                      { name: "RT-025 Kolkata", zone: "East", value: "₹6.2L", achievement: "62.1%" },
                      { name: "RT-018 Ahmedabad", zone: "West", value: "₹6.8L", achievement: "68.3%" },
                      { name: "RT-022 Hyderabad", zone: "South", value: "₹7.1L", achievement: "71.2%" }
                    ];
                  } else if (kpiType === 'footfall-vs-achieved') {
                    bottomStores = [
                      { name: "RT-025 Kolkata", zone: "East", value: "3,200", achievement: "71.1%" },
                      { name: "RT-018 Ahmedabad", zone: "West", value: "3,450", achievement: "76.7%" },
                      { name: "RT-022 Hyderabad", zone: "South", value: "3,650", achievement: "81.1%" }
                    ];
                  } else if (kpiType === 'bills-vs-footfall') {
                    bottomStores = [
                      { name: "RT-025 Kolkata", zone: "East", value: "5.1%", achievement: "62.1%" },
                      { name: "RT-018 Ahmedabad", zone: "West", value: "5.5%", achievement: "68.3%" },
                      { name: "RT-022 Hyderabad", zone: "South", value: "5.8%", achievement: "71.2%" }
                    ];
                  } else if (kpiType === 'ipcm') {
                    bottomStores = [
                      { name: "RT-025 Kolkata", zone: "East", value: "1.6", achievement: "64.0%" },
                      { name: "RT-018 Ahmedabad", zone: "West", value: "1.7", achievement: "68.0%" },
                      { name: "RT-022 Hyderabad", zone: "South", value: "1.8", achievement: "72.0%" }
                    ];
                  } else if (kpiType === 'ats') {
                    bottomStores = [
                      { name: "RT-025 Kolkata", zone: "East", value: "₹1,600", achievement: "64.0%" },
                      { name: "RT-018 Ahmedabad", zone: "West", value: "₹1,700", achievement: "68.0%" },
                      { name: "RT-022 Hyderabad", zone: "South", value: "₹1,800", achievement: "72.0%" }
                    ];
                  }
                  return bottomStores.map((store, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-gray-900 font-medium text-sm">{store.name}</h3>
                          <p className="text-gray-500 text-xs">{store.zone} Zone</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-900 font-semibold text-sm">{store.value}</p>
                        <p className="text-red-600 text-xs font-medium">{store.achievement}</p>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Analytics Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-slide-in-up">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center">
                <Sparkles size={20} className="text-blue-500 mr-3" />
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
              {/* State Performance Alert */}
              <div className="flex items-start p-4 border-b border-gray-100">
                <Calendar size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">State Performance Alert</h3>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">High Priority</span>
                  </div>
                  <p className="text-gray-500 text-sm">Maharashtra showing 18% below target - requires immediate intervention</p>
                </div>
              </div>

              {/* Regional Market Analysis */}
              <div className="flex items-start p-4 border-b border-gray-100">
                <Users size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">Regional Market Analysis</h3>
                    <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">Important</span>
                  </div>
                  <p className="text-gray-500 text-sm">Karnataka outperforming by 12% - analyze market strategies for replication</p>
                </div>
              </div>

              {/* State Inventory Distribution */}
              <div className="flex items-start p-4 border-b border-gray-100">
                <RotateCcw size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">State Inventory Distribution</h3>
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">Action Required</span>
                  </div>
                  <p className="text-gray-500 text-sm">Tamil Nadu has excess inventory - recommend redistribution to other states</p>
                </div>
              </div>

              {/* State Competition Analysis */}
              <div className="flex items-start p-4 border-b border-gray-100">
                <Target size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">State Competition Analysis</h3>
                    <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">Important</span>
                  </div>
                  <p className="text-gray-500 text-sm">Gujarat facing increased competition - adjust regional pricing strategy</p>
                </div>
              </div>

              {/* State Demand Forecast */}
              <div className="flex items-start p-4 border-b border-gray-100">
                <AlertTriangle size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">State Demand Forecast</h3>
                    <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs font-medium">Monitor</span>
                  </div>
                  <p className="text-gray-500 text-sm">Rajasthan showing seasonal demand shift - prepare inventory accordingly</p>
                </div>
              </div>

              {/* State Efficiency Metrics */}
              <div className="flex items-start p-4">
                <FileText size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">State Efficiency Metrics</h3>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">High Priority</span>
                  </div>
                  <p className="text-gray-500 text-sm">Maharashtra operational efficiency down 15% - review state processes</p>
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

      {/* Floating AI Analytics Button */}
      <button
        onClick={() => setShowAIModal(true)}
        className="fixed bottom-6 right-6 bg-[#181f60] hover:bg-[#1a2468] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:shadow-xl z-40 animate-bounce-in"
        title="AI Analytics"
      >
        <Sparkles size={24} />
      </button>
    </div>
  );
};

export default ZoneDrillDown;
