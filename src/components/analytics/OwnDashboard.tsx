import React, { useState } from 'react';
import MetricCard from './MetricCard';
import BarChart from './BarChart';

const performanceData = [
  { name: 'Mon', value: 92 },
  { name: 'Tue', value: 88 },
  { name: 'Wed', value: 94 },
  { name: 'Thu', value: 90 },
  { name: 'Fri', value: 96 },
  { name: 'Sat', value: 97 },
  { name: 'Sun', value: 95 }
];

const OwnDashboard: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState('Weekly');
  
  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-xl font-bold">Own Performance</h2>
      
      {/* Performance Summary */}
      <div>
        <h3 className="text-sm text-gray-500 font-medium mb-3">Performance Summary</h3>
        <div className="grid grid-cols-2 gap-3">
          <MetricCard 
            title="Overall Score"
            value="93%"
            borderColor="green"
            trend={2}
            trendLabel="vs last period"
          />
          <MetricCard 
            title="Attendance"
            value="100%"
            borderColor="green"
          />
          <MetricCard 
            title="Task Completion"
            value="97%"
            borderColor="green"
            trend={5}
            trendLabel="vs target"
          />
          <MetricCard 
            title="Customer Rating"
            value="4.8/5"
            borderColor="green"
            trend={0.2}
            trendLabel="vs last period"
          />
        </div>
      </div>
      
      {/* Sales Performance */}
      <div>
        <h3 className="text-sm text-gray-500 font-medium mb-3">Sales Performance</h3>
        <div className="grid grid-cols-2 gap-3">
          <MetricCard 
            title="Personal Sales"
            value="$48,972"
            trend={12.4}
            trendLabel="vs last period"
          />
          <MetricCard 
            title="Team Sales"
            value="$142,847"
            trend={7.2}
            trendLabel="vs last period"
          />
          <MetricCard 
            title="Sales Target"
            value="92%"
            borderColor="green"
            subtitle="$53,000 goal"
            trend={4}
            trendLabel="vs target"
          />
          <MetricCard 
            title="Avg. Transaction"
            value="$52.84"
            trend={3.7}
            trendLabel="vs last period"
          />
        </div>
      </div>
      
      {/* Performance Trend */}
      <BarChart 
        title="Performance Score Trend" 
        data={performanceData}
        timeFrame={timeFrame}
        onTimeFrameChange={setTimeFrame}
        yAxisLabel="Amount in Rs."
        xAxisType="date"
      />
      
      {/* Additional KPIs */}
      <div className="h-[calc(100vh-400px)] overflow-y-auto">
        <h3 className="text-sm text-gray-500 font-medium mb-3">Additional KPIs</h3>
        <div className="grid grid-cols-2 gap-3">
          <MetricCard 
            title="Cross-selling"
            value="24%"
            borderColor="green"
            trend={1.8}
            trendLabel="vs target"
          />
          <MetricCard 
            title="Returns Handled"
            value="27"
            trend={-3}
            trendLabel="vs last period"
          />
          <MetricCard 
            title="Training Score"
            value="98%"
            borderColor="green"
          />
          <MetricCard 
            title="Inventory Accuracy"
            value="99.2%"
            borderColor="green"
            trend={0.5}
            trendLabel="vs last period"
          />
        </div>
      </div>
    </div>
  );
};

export default OwnDashboard;
