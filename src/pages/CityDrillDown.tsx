import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, TrendingUp, TrendingDown, Filter, ChevronRight, Home, MapPin } from "lucide-react";
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

interface StoreData {
  storeName: string;
  storeCode: string;
  location: string;
  percentage: number;
  trend: number;
  direction: 'up' | 'down';
  target: string | number;
  actual: string | number;
  ragStatus: 'red' | 'amber' | 'green';
}

const CityDrillDown: React.FC = () => {
  const { kpiType, zone, state, city } = useParams<{ kpiType: string; zone: string; state: string; city: string }>();
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

  const handleBreadcrumbClick = (path: string) => {
    navigate(path);
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

  // Reliance Trends stores data for different cities
  const getStoreData = (): StoreData[] => {
    const cityStores: { [key: string]: Array<{ name: string; code: string; location: string }> } = {
      // Major cities with 3-4 stores each
      'new-delhi': [
        { name: 'Reliance Trends Connaught Place', code: 'RT001', location: 'Connaught Place' },
        { name: 'Reliance Trends Karol Bagh', code: 'RT002', location: 'Karol Bagh' },
        { name: 'Reliance Trends Lajpat Nagar', code: 'RT003', location: 'Lajpat Nagar' },
        { name: 'Reliance Trends Rajouri Garden', code: 'RT004', location: 'Rajouri Garden' }
      ],
      'mumbai': [
        { name: 'Reliance Trends Bandra', code: 'RT101', location: 'Bandra West' },
        { name: 'Reliance Trends Andheri', code: 'RT102', location: 'Andheri West' },
        { name: 'Reliance Trends Powai', code: 'RT103', location: 'Powai' },
        { name: 'Reliance Trends Thane', code: 'RT104', location: 'Thane West' }
      ],
      'bangalore': [
        { name: 'Reliance Trends Koramangala', code: 'RT201', location: 'Koramangala' },
        { name: 'Reliance Trends Indiranagar', code: 'RT202', location: 'Indiranagar' },
        { name: 'Reliance Trends Whitefield', code: 'RT203', location: 'Whitefield' },
        { name: 'Reliance Trends Electronic City', code: 'RT204', location: 'Electronic City' }
      ],
      'chennai': [
        { name: 'Reliance Trends T. Nagar', code: 'RT301', location: 'T. Nagar' },
        { name: 'Reliance Trends Anna Nagar', code: 'RT302', location: 'Anna Nagar' },
        { name: 'Reliance Trends Velachery', code: 'RT303', location: 'Velachery' },
        { name: 'Reliance Trends OMR', code: 'RT304', location: 'OMR' }
      ],
      'kolkata': [
        { name: 'Reliance Trends Park Street', code: 'RT401', location: 'Park Street' },
        { name: 'Reliance Trends Salt Lake', code: 'RT402', location: 'Salt Lake' },
        { name: 'Reliance Trends New Market', code: 'RT403', location: 'New Market' },
        { name: 'Reliance Trends Howrah', code: 'RT404', location: 'Howrah' }
      ],
      'hyderabad': [
        { name: 'Reliance Trends Banjara Hills', code: 'RT501', location: 'Banjara Hills' },
        { name: 'Reliance Trends Gachibowli', code: 'RT502', location: 'Gachibowli' },
        { name: 'Reliance Trends Secunderabad', code: 'RT503', location: 'Secunderabad' },
        { name: 'Reliance Trends HITEC City', code: 'RT504', location: 'HITEC City' }
      ],
      'pune': [
        { name: 'Reliance Trends Koregaon Park', code: 'RT601', location: 'Koregaon Park' },
        { name: 'Reliance Trends Hinjewadi', code: 'RT602', location: 'Hinjewadi' },
        { name: 'Reliance Trends Viman Nagar', code: 'RT603', location: 'Viman Nagar' },
        { name: 'Reliance Trends Baner', code: 'RT604', location: 'Baner' }
      ],
      'ahmedabad': [
        { name: 'Reliance Trends C.G. Road', code: 'RT701', location: 'C.G. Road' },
        { name: 'Reliance Trends Prahlad Nagar', code: 'RT702', location: 'Prahlad Nagar' },
        { name: 'Reliance Trends Satellite', code: 'RT703', location: 'Satellite' },
        { name: 'Reliance Trends Vastrapur', code: 'RT704', location: 'Vastrapur' }
      ],
      'lucknow': [
        { name: 'Reliance Trends Hazratganj', code: 'RT801', location: 'Hazratganj' },
        { name: 'Reliance Trends Gomti Nagar', code: 'RT802', location: 'Gomti Nagar' },
        { name: 'Reliance Trends Alambagh', code: 'RT803', location: 'Alambagh' },
        { name: 'Reliance Trends Indira Nagar', code: 'RT804', location: 'Indira Nagar' }
      ],
      'jaipur': [
        { name: 'Reliance Trends Pink City', code: 'RT901', location: 'Pink City' },
        { name: 'Reliance Trends C-Scheme', code: 'RT902', location: 'C-Scheme' },
        { name: 'Reliance Trends Vaishali Nagar', code: 'RT903', location: 'Vaishali Nagar' },
        { name: 'Reliance Trends Malviya Nagar', code: 'RT904', location: 'Malviya Nagar' }
      ]
    };

    const baseData = {
      'vs-last-day': {
        north: { basePercentage: 88.2, trend: 4.1, direction: 'up' as const },
        east: { basePercentage: 82.5, trend: -1.8, direction: 'down' as const },
        west: { basePercentage: 85.7, trend: 2.3, direction: 'up' as const },
        south: { basePercentage: 79.3, trend: -3.2, direction: 'down' as const }
      },
      'wow': {
        north: { basePercentage: 90.1, trend: 5.8, direction: 'up' as const },
        east: { basePercentage: 84.2, trend: -2.1, direction: 'down' as const },
        west: { basePercentage: 87.3, trend: 3.4, direction: 'up' as const },
        south: { basePercentage: 81.6, trend: -1.5, direction: 'down' as const }
      },
      'yoy': {
        north: { basePercentage: 85.7, trend: 9.2, direction: 'up' as const },
        east: { basePercentage: 78.9, trend: -4.3, direction: 'down' as const },
        west: { basePercentage: 83.1, trend: 6.7, direction: 'up' as const },
        south: { basePercentage: 76.4, trend: -7.1, direction: 'down' as const }
      }
    };

    const currentZoneData = baseData[comparisonPeriod][zone as keyof typeof baseData[typeof comparisonPeriod]];
    const stores = cityStores[city?.toLowerCase() || ''] || [
      { name: 'Reliance Trends Store 1', code: 'RT001', location: 'City Center' },
      { name: 'Reliance Trends Store 2', code: 'RT002', location: 'Mall Road' },
      { name: 'Reliance Trends Store 3', code: 'RT003', location: 'Market Area' }
    ];
    
    return stores.map((store, index) => {
      // Add some variation to each store's data
      const variation = (Math.random() - 0.5) * 25; // ±12.5% variation
      const storePercentage = Math.max(0, Math.min(100, currentZoneData.basePercentage + variation));
      
      return {
        storeName: store.name,
        storeCode: store.code,
        location: store.location,
        percentage: Math.round(storePercentage * 10) / 10,
        trend: Math.round((currentZoneData.trend + (Math.random() - 0.5) * 5) * 10) / 10,
        direction: currentZoneData.direction,
        target: kpiType === 'ats' ? '₹2,500' : 
                kpiType === 'ipcm' ? '2.5' : 
                kpiType === 'bills-vs-footfall' ? '9,750' :
                '₹10,50,000',
        actual: kpiType === 'ats' ? `₹${(storePercentage * 30).toFixed(0)}` : 
                kpiType === 'ipcm' ? storePercentage / 40 : 
                kpiType === 'bills-vs-footfall' ? Math.round(storePercentage * 125).toLocaleString() :
                `₹${(storePercentage * 10000).toLocaleString()}`,
        ragStatus: getRAGStatus(storePercentage)
      };
    });
  };

  const storeData = getStoreData();

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
    const zoneName = zone?.charAt(0).toUpperCase() + zone?.slice(1) || '';
    const stateName = state?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';
    const cityName = city?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';
    switch (kpiType) {
      case 'target-vs-sales': return `${zoneName} Zone - ${stateName} - ${cityName} - Sales performance by store`;
      case 'footfall-vs-achieved': return `${zoneName} Zone - ${stateName} - ${cityName} - Footfall achievement by store`;
      case 'bills-vs-footfall': return `${zoneName} Zone - ${stateName} - ${cityName} - Bill conversion rates by store`;
      case 'ipcm': return `${zoneName} Zone - ${stateName} - ${cityName} - Items per cash memo by store`;
      case 'ats': return `${zoneName} Zone - ${stateName} - ${cityName} - Average ticket size by store`;
      default: return `${zoneName} Zone - ${stateName} - ${cityName} - Store-wise breakdown`;
    }
  };

  const getCityDisplayName = () => {
    return city?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';
  };

  const getStateDisplayName = () => {
    return state?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';
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
          <div className="flex items-center min-w-0 flex-1 overflow-hidden">
            <button
              onClick={() => handleBreadcrumbClick(`${ROUTES.KPI_DETAIL.replace(':kpiType', kpiType || '')}`)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium truncate max-w-[80px] mr-1"
              title={getKPITitle()}
            >
              {getKPITitle()}
            </button>
            <ChevronRight size={14} className="text-gray-400 flex-shrink-0 mx-1" />
            <button
              onClick={() => handleBreadcrumbClick(`${ROUTES.ZONE_DRILL_DOWN.replace(':kpiType', kpiType || '').replace(':zone', zone || '')}`)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium truncate max-w-[60px] mx-1"
              title={`${zone?.charAt(0).toUpperCase() + zone?.slice(1)} Zone`}
            >
              {zone?.charAt(0).toUpperCase() + zone?.slice(1)} Zone
            </button>
            <ChevronRight size={14} className="text-gray-400 flex-shrink-0 mx-1" />
            <button
              onClick={() => handleBreadcrumbClick(`${ROUTES.STATE_DRILL_DOWN.replace(':kpiType', kpiType || '').replace(':zone', zone || '').replace(':state', state || '')}`)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium truncate max-w-[80px] ml-1"
              title={getStateDisplayName()}
            >
              {getStateDisplayName()}
            </button>
          </div>
          
          {/* Separator */}
          <ChevronRight size={14} className="text-gray-400 mx-2 flex-shrink-0" />
          
          {/* Current item - always visible */}
          <div className="flex items-center space-x-1 flex-shrink-0">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
            <span className="text-sm text-gray-600 font-medium truncate max-w-[100px]" title={getCityDisplayName()}>
              {getCityDisplayName()}
            </span>
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
          
          {/* Store-wise KPI Cards */}
          <div className="space-y-4">
            {storeData.map((data, index) => (
              <div key={index} className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${getBorderColor(data.ragStatus)}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-gray-900 font-medium text-base">{data.storeName}</h3>
                    <div className="flex items-center mt-1 space-x-2">
                      <div className="flex items-center">
                        <MapPin size={12} className="text-gray-400" />
                        <span className="text-xs text-gray-500 ml-1">{data.location}</span>
                      </div>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{data.storeCode}</span>
                    </div>
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

export default CityDrillDown;
