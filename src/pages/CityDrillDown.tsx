import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, TrendingUp, TrendingDown, Filter, ChevronRight, Home, MapPin, Brain, Calendar, RotateCcw, FileText, AlertTriangle, Target, Users, X } from "lucide-react";
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
        percentage: Math.round((Math.max(0, Math.min(100, currentZoneData.basePercentage + variation)) * 100) / 100),
        trend: Math.round((currentZoneData.trend + (Math.random() - 0.5) * 5) * 100) / 100,
        direction: currentZoneData.direction,
        target: kpiType === 'ats' ? '₹2,500' : 
                kpiType === 'ipcm' ? '2.5' : 
                kpiType === 'bills-vs-footfall' ? '9,750' :
                '₹10,50,000',
        actual: kpiType === 'ats' ? `₹${(storePercentage * 30).toFixed(2)}` : 
                kpiType === 'ipcm' ? (storePercentage / 40).toFixed(2) : 
                kpiType === 'bills-vs-footfall' ? Math.round(storePercentage * 125).toLocaleString() :
                `₹${(storePercentage * 10000).toFixed(2)}`,
        ragStatus: getRAGStatus(storePercentage)
      };
    });
  };

  const storeData = getStoreData();

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
            {/* Store Performance Alert */}
            <div className="flex items-start p-4 border-b border-gray-100">
              <Calendar size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-gray-900 font-semibold text-sm">Store Performance Alert</h3>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">High Priority</span>
                </div>
                <p className="text-gray-500 text-sm">RT-001 showing 25% below target - requires immediate store-level intervention</p>
              </div>
            </div>

            {/* Store Market Analysis */}
            <div className="flex items-start p-4 border-b border-gray-100">
              <Users size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-gray-900 font-semibold text-sm">Store Market Analysis</h3>
                  <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">Important</span>
                </div>
                <p className="text-gray-500 text-sm">RT-003 outperforming by 18% - analyze store strategies for replication</p>
              </div>
            </div>

            {/* Store Inventory Distribution */}
            <div className="flex items-start p-4 border-b border-gray-100">
              <RotateCcw size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-gray-900 font-semibold text-sm">Store Inventory Distribution</h3>
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">Action Required</span>
                </div>
                <p className="text-gray-500 text-sm">RT-002 has excess inventory - recommend inter-store transfer</p>
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

          {/* Store Details Section */}
          <div className="mb-4">
            <div className="mb-3">
              <h2 className="text-gray-600 text-sm font-medium">{getKPISubtitle()}</h2>
            </div>

            {/* Time Filter */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Time Period</span>
                </div>
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
          </div>
          
          {/* Store-wise KPI Cards */}
          <div className="grid grid-cols-2 gap-4">
            {storeData.map((data, index) => (
              <div key={index} className={`bg-white rounded-xl p-4 shadow-sm border-l-4 aspect-square flex flex-col justify-between ${getBorderColor(data.ragStatus)}`}>
                <div>
                  <h3 className="text-gray-900 font-medium text-sm mb-2">{data.storeName}</h3>
                  <div className="flex items-center mb-2 space-x-2">
                    <div className="flex items-center">
                      <MapPin size={10} className="text-gray-400" />
                      <span className="text-xs text-gray-500 ml-1">{data.location}</span>
                    </div>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{data.storeCode}</span>
                  </div>
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
              {/* Store Performance Alert */}
              <div className="flex items-start p-4 border-b border-gray-100">
                <Calendar size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">Store Performance Alert</h3>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">High Priority</span>
                  </div>
                  <p className="text-gray-500 text-sm">RT-001 showing 25% below target - requires immediate store-level intervention</p>
                </div>
              </div>

              {/* Store Market Analysis */}
              <div className="flex items-start p-4 border-b border-gray-100">
                <Users size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">Store Market Analysis</h3>
                    <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">Important</span>
                  </div>
                  <p className="text-gray-500 text-sm">RT-003 outperforming by 18% - analyze store strategies for replication</p>
                </div>
              </div>

              {/* Store Inventory Distribution */}
              <div className="flex items-start p-4 border-b border-gray-100">
                <RotateCcw size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">Store Inventory Distribution</h3>
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">Action Required</span>
                  </div>
                  <p className="text-gray-500 text-sm">RT-002 has excess inventory - recommend inter-store transfer</p>
                </div>
              </div>

              {/* Store Competition Analysis */}
              <div className="flex items-start p-4 border-b border-gray-100">
                <Target size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">Store Competition Analysis</h3>
                    <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">Important</span>
                  </div>
                  <p className="text-gray-500 text-sm">RT-004 facing increased competition - adjust store-level pricing strategy</p>
                </div>
              </div>

              {/* Store Demand Forecast */}
              <div className="flex items-start p-4 border-b border-gray-100">
                <AlertTriangle size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">Store Demand Forecast</h3>
                    <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs font-medium">Monitor</span>
                  </div>
                  <p className="text-gray-500 text-sm">All stores showing seasonal demand shift - prepare store inventory accordingly</p>
                </div>
              </div>

              {/* Store Efficiency Metrics */}
              <div className="flex items-start p-4">
                <FileText size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">Store Efficiency Metrics</h3>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">High Priority</span>
                  </div>
                  <p className="text-gray-500 text-sm">RT-001 operational efficiency down 20% - review store processes</p>
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

export default CityDrillDown;
