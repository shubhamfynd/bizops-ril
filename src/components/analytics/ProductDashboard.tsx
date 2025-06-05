import React, { useState } from 'react';
import MetricCard from './MetricCard';
import CategoryPerformance from './CategoryPerformance';
import ProductTable from './ProductTable';

const categories = [
  { name: 'Electronics', value: 62450, percent: 94 },
  { name: 'Clothing & Apparel', value: 48320, percent: 78 },
  { name: 'Home & Kitchen', value: 36180, percent: 65 },
  { name: 'Health & Beauty', value: 28740, percent: 45 }
];

const products = [
  { id: '1', name: 'Smart TV 55"', category: 'Electronics', sales: 32480, stock: 24, trend: 5 },
  { id: '2', name: 'Wireless Headphones', category: 'Electronics', sales: 18650, stock: 47, trend: 12 },
  { id: '3', name: 'Designer T-shirt', category: 'Clothing', sales: 15320, stock: 86, trend: -3 },
  { id: '4', name: 'Coffee Maker', category: 'Kitchen', sales: 12840, stock: 15, trend: 8 },
  { id: '5', name: 'Face Moisturizer', category: 'Beauty', sales: 8750, stock: 63, trend: -2 }
];

const ProductDashboard: React.FC = () => {
  const [productFilter, setProductFilter] = useState('All');
  
  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-xl font-bold">Product Performance</h2>
      
      {/* Summary Stats */}
      <div>
        <h3 className="text-sm text-gray-500 font-medium mb-3">Summary</h3>
        <div className="grid grid-cols-2 gap-3">
          <MetricCard 
            title="Total Revenue"
            value="$248,935"
            trend={8.3}
            trendLabel="vs last period"
          />
          <MetricCard 
            title="Products Sold"
            value="5,842"
            trend={6.7}
            trendLabel="vs last period"
          />
          <MetricCard 
            title="Avg. Product Rating"
            value="4.6/5"
            borderColor="green"
            trend={0.2}
            trendLabel="vs last period"
          />
          <MetricCard 
            title="Out of Stock"
            value="24"
            borderColor="yellow"
            trend={-5}
            trendLabel="vs last period"
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>}
          />
        </div>
      </div>
      
      {/* Category Performance */}
      <CategoryPerformance categories={categories} />
      
      {/* Top Products */}
      <ProductTable products={products} />
      
      {/* Product Metrics */}
      <div className="h-[calc(100vh-400px)] overflow-y-auto">
        <h3 className="text-sm text-gray-500 font-medium mb-3">Product Metrics</h3>
        <div className="grid grid-cols-2 gap-3">
          <MetricCard 
            title="Profit Margin"
            value="31.4%"
            borderColor="green"
            trend={1.2}
            trendLabel="vs target"
          />
          <MetricCard 
            title="Return Rate"
            value="3.8%"
            borderColor="green"
            trend={-0.5}
            trendLabel="vs last period"
          />
          <MetricCard 
            title="Stock Turnover"
            value="6.2x"
            trend={0.4}
            trendLabel="vs target"
          />
          <MetricCard 
            title="New Products"
            value="37"
            trend={15}
            trendLabel="vs last period"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;
