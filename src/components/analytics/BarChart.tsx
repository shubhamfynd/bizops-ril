import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Label } from 'recharts';

interface DataPoint {
  name?: string;
  date?: string;
  value: number;
}

interface BarChartProps {
  data: DataPoint[];
  title: string;
  timeFrame?: string;
  onTimeFrameChange?: (timeFrame: string) => void;
  yAxisLabel?: string;
  xAxisType?: 'date' | 'category';
}

const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  title,
  timeFrame = 'Monthly',
  onTimeFrameChange,
  yAxisLabel = '',
  xAxisType = 'category',
}) => {
  const timeFrameOptions = ['Weekly', 'Monthly', 'Quarterly', 'Yearly'];
  const xKey = xAxisType === 'date' ? 'date' : 'name';
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm w-full max-w-full sm:max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-800">{title}</h3>
        <div className="relative">
          <select
            className="text-sm text-app-blue font-medium bg-transparent border-none cursor-pointer focus:outline-none pr-6"
            value={timeFrame}
            onChange={(e) => onTimeFrameChange && onTimeFrameChange(e.target.value)}
          >
            {timeFrameOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <div className="absolute right-1 top-1 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-app-blue"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data} margin={{ top: 5, right: 5, bottom: 20, left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey={xKey} tickLine={false} axisLine={false} angle={-15} textAnchor="end" />
            <YAxis tickLine={false} axisLine={false} >
              {yAxisLabel && (
                <Label angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }}>{yAxisLabel}</Label>
              )}
            </YAxis>
            <Tooltip 
              cursor={{fill: 'rgba(0, 0, 0, 0.05)'}}
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
            />
            <Bar dataKey="value" fill="#4863f7" radius={[4, 4, 0, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
