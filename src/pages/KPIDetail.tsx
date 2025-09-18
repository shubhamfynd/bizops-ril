import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, TrendingUp, TrendingDown, Filter, ChevronDown } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ROUTES } from "@/lib/routes";

type ComparisonPeriod = 'vs-last-day' | 'wow' | 'yoy';

interface AttributeFilters {
  segment: string;
  brand: string;
  brick: string;
  fashionGrade: string;
}

interface ZoneData {
  zone: string;
  percentage: number;
  trend: number;
  direction: 'up' | 'down';
  target: string | number;
  actual: string | number;
  ragStatus: 'red' | 'amber' | 'green';
}

const KPIDetail: React.FC = () => {
  const { kpiType } = useParams<{ kpiType: string }>();
  const navigate = useNavigate();
  const [comparisonPeriod, setComparisonPeriod] = useState<ComparisonPeriod>('vs-last-day');
  const [attributeFilters, setAttributeFilters] = useState<AttributeFilters>({
    segment: 'all',
    brand: 'all',
    brick: 'all',
    fashionGrade: 'all'
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleZoneClick = (zone: string) => {
    navigate(`${ROUTES.ZONE_DRILL_DOWN.replace(':kpiType', kpiType || '').replace(':zone', zone.toLowerCase())}`);
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

  // Zone-wise data for different KPIs
  const getZoneData = (): ZoneData[] => {
    const baseData = {
      'vs-last-day': {
        north: { percentage: 88.2, trend: 4.1, direction: 'up' as const },
        east: { percentage: 82.5, trend: -1.8, direction: 'down' as const },
        west: { percentage: 85.7, trend: 2.3, direction: 'up' as const },
        south: { percentage: 79.3, trend: -3.2, direction: 'down' as const }
      },
      'wow': {
        north: { percentage: 90.1, trend: 5.8, direction: 'up' as const },
        east: { percentage: 84.2, trend: -2.1, direction: 'down' as const },
        west: { percentage: 87.3, trend: 3.4, direction: 'up' as const },
        south: { percentage: 81.6, trend: -1.5, direction: 'down' as const }
      },
      'yoy': {
        north: { percentage: 85.7, trend: 9.2, direction: 'up' as const },
        east: { percentage: 78.9, trend: -4.3, direction: 'down' as const },
        west: { percentage: 83.1, trend: 6.7, direction: 'up' as const },
        south: { percentage: 76.4, trend: -7.1, direction: 'down' as const }
      }
    };

    const currentPeriodData = baseData[comparisonPeriod];
    
    return Object.entries(currentPeriodData).map(([zone, data]) => ({
      zone: zone.charAt(0).toUpperCase() + zone.slice(1),
      percentage: data.percentage,
      trend: data.trend,
      direction: data.direction,
      target: kpiType === 'ats' ? '₹2,500' : 
              kpiType === 'ipcm' ? '2.5' : 
              kpiType === 'bills-vs-footfall' ? '9,750' :
              '₹10,50,000',
      actual: kpiType === 'ats' ? `₹${(data.percentage * 30).toFixed(0)}` : 
              kpiType === 'ipcm' ? data.percentage / 40 : 
              kpiType === 'bills-vs-footfall' ? Math.round(data.percentage * 125).toLocaleString() :
              `₹${(data.percentage * 10000).toLocaleString()}`,
      ragStatus: getRAGStatus(data.percentage)
    }));
  };

  const zoneData = getZoneData();
  const filteredData = zoneData;

  const getKPITitle = () => {
    switch (kpiType) {
      case 'target-vs-sales': return 'Target Vs Sales';
      case 'footfall-vs-achieved': return 'Target Footfall Vs Achieved Footfall';
      case 'bills-vs-footfall': return 'Conversion %';
      case 'ipcm': return 'IPCM: Item Sold Vs Cash Memo';
      case 'ats': return 'ATS: Sales Vs No of Bills';
      default: return 'KPI Detail';
    }
  };

  const getKPISubtitle = () => {
    switch (kpiType) {
      case 'target-vs-sales': return 'Sales performance across zones';
      case 'footfall-vs-achieved': return 'Footfall achievement by zone';
      case 'bills-vs-footfall': return 'Bill conversion rates by zone';
      case 'ipcm': return 'Items per cash memo by zone';
      case 'ats': return 'Average ticket size by zone';
      default: return 'Zone-wise breakdown';
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

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4">
          <div className="mb-3">
            <h2 className="text-gray-600 text-sm font-medium">{getKPISubtitle()}</h2>
          </div>

          {/* Time Filter */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Time Period</span>
            </div>
            <div className="bg-white rounded-xl p-1 shadow-sm border">
              <ToggleGroup 
                type="single" 
                value={comparisonPeriod} 
                onValueChange={(value) => setComparisonPeriod(value as ComparisonPeriod)}
                className="grid grid-cols-3 gap-1"
              >
                <ToggleGroupItem 
                  value="vs-last-day" 
                  className="flex-1 py-3 px-4 text-sm font-medium rounded-lg data-[state=on]:bg-blue-600 data-[state=on]:text-white data-[state=on]:shadow-sm hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-xs font-semibold">Vs Last Day</span>
                    <span className="text-xs opacity-75">Daily</span>
                  </div>
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="wow" 
                  className="flex-1 py-3 px-4 text-sm font-medium rounded-lg data-[state=on]:bg-blue-600 data-[state=on]:text-white data-[state=on]:shadow-sm hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-xs font-semibold">WoW</span>
                    <span className="text-xs opacity-75">Weekly</span>
                  </div>
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="yoy" 
                  className="flex-1 py-3 px-4 text-sm font-medium rounded-lg data-[state=on]:bg-blue-600 data-[state=on]:text-white data-[state=on]:shadow-sm hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-xs font-semibold">YoY</span>
                    <span className="text-xs opacity-75">Yearly</span>
                  </div>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          {/* Attribute Filters */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-3">
              <Filter size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Attribute Filters</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {/* Segment Filter */}
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Segment</label>
                <Select value={attributeFilters.segment} onValueChange={(value) => handleFilterChange('segment', value)}>
                  <SelectTrigger className="h-8 text-xs">
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
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Brand</label>
                <Select value={attributeFilters.brand} onValueChange={(value) => handleFilterChange('brand', value)}>
                  <SelectTrigger className="h-8 text-xs">
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
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Brick</label>
                <Select value={attributeFilters.brick} onValueChange={(value) => handleFilterChange('brick', value)}>
                  <SelectTrigger className="h-8 text-xs">
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
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Fashion Grade</label>
                <Select value={attributeFilters.fashionGrade} onValueChange={(value) => handleFilterChange('fashionGrade', value)}>
                  <SelectTrigger className="h-8 text-xs">
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
          
          {/* Zone-wise KPI Cards */}
          <div className="space-y-4">
            {filteredData.map((data, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${getBorderColor(data.ragStatus)} cursor-pointer hover:shadow-md transition-shadow`}
                onClick={() => handleZoneClick(data.zone)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-gray-900 font-medium text-base">{data.zone} Zone</h3>
                    <div className="flex items-center mt-1">
                      {getTrendIcon(data.direction)}
                      <span className={`text-xs ml-1 ${getTrendColor(data.direction)}`}>
                        {Math.abs(data.trend)}% {comparisonPeriod === 'vs-last-day' ? 'vs Last Day' : 
                         comparisonPeriod === 'wow' ? 'WoW' : 'YoY'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-2xl font-bold ${getValueColor(data.ragStatus)}`}>
                      {kpiType === 'ats' ? `₹${data.percentage * 30}` : 
                       kpiType === 'ipcm' ? data.percentage / 40 : 
                       `${data.percentage}%`}
                    </span>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-gray-500">Target</span>
                      <div className="text-sm font-semibold text-gray-900">{data.target}</div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Actual</span>
                      <div className="text-sm font-semibold text-gray-900">{data.actual}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIDetail;
