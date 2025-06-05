import React, { useState } from 'react';
import DashboardToggle from '@/components/analytics/DashboardToggle';
import StoreDashboard from '@/components/analytics/StoreDashboard';
import OwnDashboard from '@/components/analytics/OwnDashboard';
import ProductDashboard from '@/components/analytics/ProductDashboard';
import Header from '@/components/analytics/Header';
import Footer from '../components/Footer';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('store');
  
  const renderDashboard = () => {
    switch (activeTab) {
      case 'own':
        return <OwnDashboard />;
      case 'product':
        return <ProductDashboard />;
      case 'store':
      default:
        return <StoreDashboard />;
    }
  };
  
  return (
    <div className="min-h-screen bg-app-bg ">
      {/* Header */}
      <Header />
      
      {/* Dashboard Toggle */}
      <div className="px-4 py-3">
        <DashboardToggle activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      {/* Dashboard Content */}
      <div className="px-4 max-h-[calc(100vh-100px)] overflow-y-auto mb-16">
        {renderDashboard()}
      </div>
      
      {/* Bottom Navigation */}
      {/* <BottomNav activeView="dashboard" /> */}
      <Footer />
    </div>
  );
};

export default Analytics;
