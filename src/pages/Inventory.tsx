import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, SlidersHorizontal, Search, Package, Truck, Tag, RotateCcw, ChevronDown, Plus } from 'lucide-react';
import { inventorySummary, products, chartData } from '@/data/inventory';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

const Inventory: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'list'>('dashboard');
  const [activeTab, setActiveTab] = useState('All Items');
  const [showGRNOptions, setShowGRNOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const onBack = () => {
    navigate('/home');
  };

  const summaryBoxes = [
    { label: 'Total Inventory Quantity', value: inventorySummary.totalQuantity.toLocaleString() },
    { label: 'Quantity to be Received', value: inventorySummary.pendingReceival.toLocaleString() },
    { label: 'On Shelf Capacity', value: `${inventorySummary.shelfCapacity}%`, color: 'text-green-500' },
    { label: 'Total Inventory Value', value: `₹ ${inventorySummary.totalValue.toLocaleString()}` },
    { label: 'Damaged Goods', value: inventorySummary.damagedGoods.toString() },
    { label: 'Exhausted Items', value: inventorySummary.exhaustedItems.toString(), badge: true }
  ];

  const quickActions = [
    { 
      icon: <Truck size={20} className="text-[#3b5bfd]" />, 
      label: 'Inwards',
      onClick: () => setShowGRNOptions(true)
    },
    { 
      icon: <Package size={20} className="text-[#3b5bfd]" />, 
      label: 'Outwards'
    }
  ];

  const handleScanProduct = () => {
    navigate('/scan-sku');
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleStartDCGRN = () => {
    // TODO: Implement DC GRN flow
    setShowGRNOptions(false);
  };

  const handleStartDSDGRN = () => {
    // TODO: Implement DSD GRN flow
    setShowGRNOptions(false);
  };

  const tabs = [
    { id: 'all', label: 'All Items', count: 156 },
    { id: 'low-stock', label: 'Low Stock', count: 12 },
    { id: 'out-of-stock', label: 'Out of Stock', count: 3 },
    { id: 'expiring', label: 'Expiring Soon', count: 8 }
  ];

  const inventoryItems = [
    {
      id: 1,
      name: 'Coffee Beans - Premium Blend',
      sku: 'CB001',
      category: 'Coffee',
      stock: 45,
      minStock: 20,
      price: 24.99,
      status: 'in-stock'
    },
    {
      id: 2,
      name: 'Milk - Whole',
      sku: 'MK001',
      category: 'Dairy',
      stock: 8,
      minStock: 15,
      price: 3.49,
      status: 'low-stock'
    },
    {
      id: 3,
      name: 'Sugar Packets',
      sku: 'SG001',
      category: 'Condiments',
      stock: 0,
      minStock: 10,
      price: 0.25,
      status: 'out-of-stock'
    },
    {
      id: 4,
      name: 'Paper Cups - 12oz',
      sku: 'PC001',
      category: 'Disposables',
      stock: 120,
      minStock: 50,
      price: 0.15,
      status: 'in-stock'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'text-green-600 bg-green-100';
      case 'low-stock': return 'text-yellow-600 bg-yellow-100';
      case 'out-of-stock': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-stock': return 'In Stock';
      case 'low-stock': return 'Low Stock';
      case 'out-of-stock': return 'Out of Stock';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#181f60] w-full pt-6 pb-4 shadow-md">
        <div className="flex items-center mx-4">
          <button
            onClick={onBack}
            className="p-2 text-white"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="ml-2">
            <span className="text-white font-semibold text-lg">Inventory</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 bg-white border-b">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.label)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.label
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center justify-center space-x-1">
                <span>{tab.label}</span>
                <span className="bg-white bg-opacity-20 px-1.5 py-0.5 rounded-full text-xs">
                  {tab.count}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Inventory List */}
      <div className="p-4 space-y-3">
        {inventoryItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Package size={16} className="text-gray-400" />
                  <span className="font-medium text-gray-900">{item.name}</span>
                </div>
                <div className="text-sm text-gray-500 space-y-1">
                  <div>SKU: {item.sku}</div>
                  <div>Category: {item.category}</div>
                  <div className="flex items-center space-x-4">
                    <span>Stock: {item.stock}</span>
                    <span>Min: {item.minStock}</span>
                    <span>${item.price}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {getStatusText(item.status)}
                </span>
                <button
                  onClick={() => handleProductClick(item.id.toString())}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={handleScanProduct}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default Inventory;
