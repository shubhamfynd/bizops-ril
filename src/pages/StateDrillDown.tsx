import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, TrendingUp, TrendingDown, Filter, ChevronRight, Home, Brain, Calendar, RotateCcw, FileText, AlertTriangle, Target, Users, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ROUTES } from "@/lib/routes";

type ComparisonPeriod = 'vs-last-day' | 'wow' | 'yoy';

interface AttributeFilters {
  segment: string;
  brand: string;
  brick: string;
  fashionGrade: string;
}

interface CityData {
  city: string;
  percentage: number;
  trend: number;
  direction: 'up' | 'down';
  target: string | number;
  actual: string | number;
  ragStatus: 'red' | 'amber' | 'green';
}

const StateDrillDown: React.FC = () => {
  const { kpiType, zone, state } = useParams<{ kpiType: string; zone: string; state: string }>();
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

  const handleCityClick = (cityName: string) => {
    const citySlug = cityName.toLowerCase().replace(/\s+/g, '-');
    navigate(`${ROUTES.CITY_DRILL_DOWN.replace(':kpiType', kpiType || '').replace(':zone', zone || '').replace(':state', state || '').replace(':city', citySlug)}`);
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

  // Indian cities data for different states
  const getCityData = (): CityData[] => {
    const stateCities: { [key: string]: string[] } = {
      // North Zone States
      'delhi': ['New Delhi', 'Central Delhi', 'East Delhi', 'North Delhi', 'South Delhi', 'West Delhi'],
      'haryana': ['Gurgaon', 'Faridabad', 'Panipat', 'Karnal', 'Hisar', 'Sonipat'],
      'punjab': ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda'],
      'rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner'],
      'uttar-pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Meerut', 'Allahabad'],
      
      // East Zone States
      'west-bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman'],
      'bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Purnia'],
      'odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Puri'],
      'assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Tezpur', 'Nagaon'],
      
      // West Zone States
      'maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur'],
      'gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar'],
      'madhya-pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar'],
      
      // South Zone States
      'karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum', 'Gulbarga'],
      'tamil-nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli'],
      'kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kollam', 'Palakkad'],
      'andhra-pradesh': ['Hyderabad', 'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool'],
      'telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar', 'Ramagundam']
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
    const cities = stateCities[state?.toLowerCase() || ''] || [];
    
    return cities.map((city, index) => {
      // Add some variation to each city's data
      const variation = (Math.random() - 0.5) * 20; // ±10% variation
      const cityPercentage = Math.max(0, Math.min(100, currentZoneData.basePercentage + variation));
      
      return {
        city,
        percentage: Math.round((Math.max(0, Math.min(100, currentZoneData.basePercentage + variation)) * 100) / 100),
        trend: Math.round((currentZoneData.trend + (Math.random() - 0.5) * 4) * 100) / 100,
        direction: currentZoneData.direction,
        target: kpiType === 'ats' ? '₹2,500' : 
                kpiType === 'ipcm' ? '2.5' : 
                kpiType === 'bills-vs-footfall' ? '9,750' :
                '₹10,50,000',
        actual: kpiType === 'ats' ? `₹${(cityPercentage * 30).toFixed(2)}` : 
                kpiType === 'ipcm' ? (cityPercentage / 40).toFixed(2) : 
                kpiType === 'bills-vs-footfall' ? Math.round(cityPercentage * 125).toLocaleString() :
                `₹${(cityPercentage * 10000).toFixed(2)}`,
        ragStatus: getRAGStatus(cityPercentage)
      };
    });
  };

  const cityData = getCityData();

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
    switch (kpiType) {
      case 'target-vs-sales': return `${zoneName} Zone - ${stateName} - Sales performance by city`;
      case 'footfall-vs-achieved': return `${zoneName} Zone - ${stateName} - Footfall achievement by city`;
      case 'bills-vs-footfall': return `${zoneName} Zone - ${stateName} - Bill conversion rates by city`;
      case 'ipcm': return `${zoneName} Zone - ${stateName} - Items per cash memo by city`;
      case 'ats': return `${zoneName} Zone - ${stateName} - Average ticket size by city`;
      default: return `${zoneName} Zone - ${stateName} - City-wise breakdown`;
    }
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
          <div className="flex items-center min-w-0 flex-1">
            <button
              onClick={() => handleBreadcrumbClick(`${ROUTES.KPI_DETAIL.replace(':kpiType', kpiType || '')}`)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium truncate max-w-[100px] mr-2"
              title={getKPITitle()}
            >
              {getKPITitle()}
            </button>
            <ChevronRight size={14} className="text-gray-400 flex-shrink-0" />
            <button
              onClick={() => handleBreadcrumbClick(`${ROUTES.ZONE_DRILL_DOWN.replace(':kpiType', kpiType || '').replace(':zone', zone || '')}`)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium truncate max-w-[80px] ml-2"
              title={`${zone?.charAt(0).toUpperCase() + zone?.slice(1)} Zone`}
            >
              {zone?.charAt(0).toUpperCase() + zone?.slice(1)} Zone
            </button>
          </div>
          
          {/* Separator */}
          <ChevronRight size={14} className="text-gray-400 mx-2 flex-shrink-0" />
          
          {/* Current item - always visible */}
          <div className="flex items-center space-x-1 flex-shrink-0">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
            <span className="text-sm text-gray-600 font-medium truncate max-w-[120px]" title={getStateDisplayName()}>
              {getStateDisplayName()}
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
            {/* City Performance Alert */}
            <div className="flex items-start p-4 border-b border-gray-100">
              <Calendar size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-gray-900 font-semibold text-sm">City Performance Alert</h3>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">High Priority</span>
                </div>
                <p className="text-gray-500 text-sm">Mumbai showing 22% below target - requires immediate city-level intervention</p>
              </div>
            </div>

            {/* Urban Market Analysis */}
            <div className="flex items-start p-4 border-b border-gray-100">
              <Users size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-gray-900 font-semibold text-sm">Urban Market Analysis</h3>
                  <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">Important</span>
                </div>
                <p className="text-gray-500 text-sm">Bangalore outperforming by 15% - analyze urban strategies for replication</p>
              </div>
            </div>

            {/* City Inventory Distribution */}
            <div className="flex items-start p-4 border-b border-gray-100">
              <RotateCcw size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-gray-900 font-semibold text-sm">City Inventory Distribution</h3>
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">Action Required</span>
                </div>
                <p className="text-gray-500 text-sm">Chennai has excess inventory - recommend inter-city transfer</p>
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

          {/* City Details Section */}
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
          
          {/* City-wise KPI Cards */}
          <div className="grid grid-cols-2 gap-4">
            {cityData.map((data, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl p-4 shadow-sm border-l-4 aspect-square flex flex-col justify-between ${getBorderColor(data.ragStatus)} cursor-pointer hover:shadow-md transition-shadow`}
                onClick={() => handleCityClick(data.city)}
              >
                <div>
                  <h3 className="text-gray-900 font-medium text-sm mb-2">{data.city}</h3>
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
              {/* City Performance Alert */}
              <div className="flex items-start p-4 border-b border-gray-100">
                <Calendar size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">City Performance Alert</h3>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">High Priority</span>
                  </div>
                  <p className="text-gray-500 text-sm">Mumbai showing 22% below target - requires immediate city-level intervention</p>
                </div>
              </div>

              {/* Urban Market Analysis */}
              <div className="flex items-start p-4 border-b border-gray-100">
                <Users size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">Urban Market Analysis</h3>
                    <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">Important</span>
                  </div>
                  <p className="text-gray-500 text-sm">Bangalore outperforming by 15% - analyze urban strategies for replication</p>
                </div>
              </div>

              {/* City Inventory Distribution */}
              <div className="flex items-start p-4 border-b border-gray-100">
                <RotateCcw size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">City Inventory Distribution</h3>
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">Action Required</span>
                  </div>
                  <p className="text-gray-500 text-sm">Chennai has excess inventory - recommend inter-city transfer</p>
                </div>
              </div>

              {/* City Competition Analysis */}
              <div className="flex items-start p-4 border-b border-gray-100">
                <Target size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">City Competition Analysis</h3>
                    <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">Important</span>
                  </div>
                  <p className="text-gray-500 text-sm">Delhi facing increased competition - adjust city-level pricing strategy</p>
                </div>
              </div>

              {/* City Demand Forecast */}
              <div className="flex items-start p-4 border-b border-gray-100">
                <AlertTriangle size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">City Demand Forecast</h3>
                    <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs font-medium">Monitor</span>
                  </div>
                  <p className="text-gray-500 text-sm">Hyderabad showing seasonal demand shift - prepare city inventory accordingly</p>
                </div>
              </div>

              {/* City Efficiency Metrics */}
              <div className="flex items-start p-4">
                <FileText size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold text-sm">City Efficiency Metrics</h3>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">High Priority</span>
                  </div>
                  <p className="text-gray-500 text-sm">Mumbai operational efficiency down 18% - review city processes</p>
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

export default StateDrillDown;
