import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, SlidersHorizontal, Search, Package, Truck, Tag, RotateCcw, ChevronDown, Plus } from 'lucide-react';
import { inventorySummary, products, chartData } from '@/data/inventory';
import Footer from '@/components/Footer';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

const Inventory: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'list'>('dashboard');
  const [activeTab, setActiveTab] = useState('All Items');
  const [showGRNOptions, setShowGRNOptions] = useState(false);
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

  return (
    <div className="h-screen flex flex-col bg-[#f5f6fa] overflow-hidden">
      <div className="bg-white w-full py-4 shadow-md">
        <div className="flex items-center mx-4">
          <button onClick={onBack} className="mr-2 text-black font-bold text-lg">
            <ChevronLeft size={24} />
          </button>
          <span className="text-gray-800 font-semibold text-lg">Inventory</span>
        </div>

        <div className="flex justify-center mt-3">
          <div className="bg-gray-100 p-1 rounded-lg flex w-full max-w-xs mx-4">
            <button
              className={`flex-1 py-2 px-4 rounded-lg text-center ${view === 'dashboard' ? 'bg-white shadow-sm text-[#3b5bfd]' : 'text-gray-600'}`}
              onClick={() => setView('dashboard')}
            >
              <span className="flex items-center justify-center">
                <Package size={16} className="mr-1" />
                Dashboard
              </span>
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-lg text-center ${view === 'list' ? 'bg-white shadow-sm text-[#3b5bfd]' : 'text-gray-600'}`}
              onClick={() => setView('list')}
            >
              <span className="flex items-center whitespace-nowrap overflow-hidden text-ellipsis">
                <Package size={16} className="mr-1" />
                Merchandise List
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        {view === 'dashboard' && (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3 mb-4">
              {summaryBoxes.map((box, index) => (
                <div key={index} className="bg-white rounded-lg p-3 shadow">
                  <div className="text-xs text-gray-500">{box.label}</div>
                  {box.badge ? (
                    <div className={`text-lg font-semibold flex items-center justify-between ${box.color || 'text-gray-800'}`}>
                      <span>{box.value}</span>
                      <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 ml-2">!</span>
                    </div>
                  ) : (
                    <div className={`text-lg font-semibold ${box.color || 'text-gray-800'}`}>{box.value}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5">
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-lg flex flex-col items-center p-3 shadow cursor-pointer hover:bg-gray-50"
                    onClick={action.onClick}
                  >
                    {action.icon}
                    <span className="text-xs text-gray-700 mt-1">{action.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {showGRNOptions && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4">
                  <h3 className="text-lg font-semibold mb-4">Select GRN Type</h3>
                  <div className="space-y-3">
                    <Button 
                      className="w-full py-3 bg-[#3b5bfd] hover:bg-[#3b5bfd]/90 text-white"
                      onClick={handleStartDCGRN}
                    >
                      Start DC GRN
                    </Button>
                    <Button 
                      className="w-full py-3 bg-[#3b5bfd] hover:bg-[#3b5bfd]/90 text-white"
                      onClick={handleStartDSDGRN}
                    >
                      Start DSD GRN
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full py-3"
                      onClick={() => setShowGRNOptions(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Top Selling Products</h3>
                <span className="text-xs text-[#3b5bfd]">See All</span>
              </div>
              <div className="flex overflow-x-auto pb-2 -mx-4 px-4 hover:cursor-pointer">
                {products.slice(0, 2).map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg p-3 shadow mr-3 min-w-32 flex flex-col items-center"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-contain mb-2" />
                    <div className="text-xs text-center font-medium">{product.name}</div>
                  </div>
                ))}
              </div>
            </div>


            <div className="mt-6 mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Low Selling Products</h3>
                <span className="text-xs text-[#3b5bfd]">See All</span>
              </div>
              <div className="flex overflow-x-auto pb-2 -mx-4 px-4 hover:cursor-pointer">
                {products.slice(0, 2).map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg p-3 shadow mr-3 min-w-32 flex flex-col items-center"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-contain mb-2" />
                    <div className="text-xs text-center font-medium">{product.name}</div>
                  </div>
                ))}
              </div>
            </div>


          </div>
        )}

        {view === 'list' && (
          <div className="p-4">
            <div className="flex items-center mb-4">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input placeholder="Search Products" className="pl-10 pr-8" />
              </div>
              <button className="ml-2 p-2 bg-white rounded-md shadow">
                <SlidersHorizontal size={20} className="text-gray-600" />
              </button>
              <button className="ml-2 p-2 bg-white rounded-md shadow" onClick={handleScanProduct}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                  <rect width="14" height="14" x="5" y="5" rx="2" />
                  <path d="M10 10h.01" />
                  <path d="M14 10h.01" />
                  <path d="M10 14h.01" />
                  <path d="M14 14h.01" />
                </svg>
              </button>
            </div>

            <div className="flex mb-4 overflow-x-auto whitespace-nowrap py-1 -mx-4 px-4">
              {['All Items', 'Composite Items', 'Item Groups'].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-1.5 rounded-full mr-2 text-xs font-medium ${activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-20">
              <Table>
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Variant</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">Availability</th>
                  </tr>
                </thead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleProductClick(product.id)}>
                      <TableCell className="py-3">
                        <div className="flex items-center">
                          <img src={product.image} alt={product.name} className="w-10 h-10 object-contain mr-3" />
                          <div>
                            <div className="font-medium text-sm">{product.name}</div>
                            <div className="text-xs text-gray-500">{product.weight}</div>
                            {product.status === 'Markdown' && (
                              <div className="text-xs text-orange-500">Markdown</div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center py-3">
                        <div className="text-blue-600 font-medium">{product.inStock}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Inventory;
