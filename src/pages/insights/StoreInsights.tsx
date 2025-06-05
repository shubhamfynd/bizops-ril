
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CalendarDays, ArrowUp, ArrowDown, Users, Clock, PieChart, DollarSign, LineChart, Smile } from 'lucide-react';
import { storeInsights } from '@/data/insightsData';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { ROUTES } from '@/lib/routes';

const StoreInsights: React.FC = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Get the most recent insight data
  const latestInsight = storeInsights[0];
  const previousInsight = storeInsights[1];
  
  // Calculate daily changes
  const calculateChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change >= 0
    };
  };
  
  const changes = {
    footfall: calculateChange(latestInsight.footfall, previousInsight.footfall),
    conversion: calculateChange(latestInsight.conversion, previousInsight.conversion),
    dwellTime: calculateChange(latestInsight.averageDwellTime, previousInsight.averageDwellTime),
    salesPerSqFt: calculateChange(latestInsight.salesPerSqFt, previousInsight.salesPerSqFt),
    satisfaction: calculateChange(latestInsight.customerSatisfaction, previousInsight.customerSatisfaction)
  };
  
  // Prepare chart data
  const chartData = storeInsights
    .slice()
    .reverse()
    .map(insight => ({
      date: new Date(insight.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      footfall: insight.footfall
    }));

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white py-4 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <ChevronLeft 
            className="h-6 w-6 text-gray-700 mr-2 cursor-pointer" 
            onClick={() => navigate(ROUTES.HOME)}
          />
          <h1 className="text-xl font-semibold">Insights</h1>
        </div>
        <Button variant="outline" size="sm" className="flex items-center">
          <CalendarDays className="h-4 w-4 mr-1" />
          Today
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Key Metrics</h2>
          <div className="flex">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Footfall */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-500">Footfall</span>
                <Users className="h-4 w-4 text-blue-500" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold">{latestInsight.footfall}</span>
                <div className={`flex items-center text-xs ${changes.footfall.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {changes.footfall.isPositive ? (
                    <ArrowUp className="h-3 w-3 mr-0.5" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-0.5" />
                  )}
                  {changes.footfall.value}%
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conversion */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-500">Conversion</span>
                <PieChart className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold">{latestInsight.conversion}%</span>
                <div className={`flex items-center text-xs ${changes.conversion.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {changes.conversion.isPositive ? (
                    <ArrowUp className="h-3 w-3 mr-0.5" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-0.5" />
                  )}
                  {changes.conversion.value}%
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dwell Time */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-500">Avg. Dwell Time</span>
                <Clock className="h-4 w-4 text-purple-500" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold">{latestInsight.averageDwellTime} min</span>
                <div className={`flex items-center text-xs ${changes.dwellTime.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {changes.dwellTime.isPositive ? (
                    <ArrowUp className="h-3 w-3 mr-0.5" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-0.5" />
                  )}
                  {changes.dwellTime.value}%
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sales per sq ft */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-500">Sales per sq ft</span>
                <DollarSign className="h-4 w-4 text-yellow-500" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold">₹{latestInsight.salesPerSqFt}</span>
                <div className={`flex items-center text-xs ${changes.salesPerSqFt.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {changes.salesPerSqFt.isPositive ? (
                    <ArrowUp className="h-3 w-3 mr-0.5" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-0.5" />
                  )}
                  {changes.salesPerSqFt.value}%
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Satisfaction */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Customer Satisfaction</span>
              <Smile className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">{latestInsight.customerSatisfaction}</span>
                <span className="text-gray-500 ml-1">/5</span>
              </div>
              <div className={`flex items-center text-sm ${changes.satisfaction.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {changes.satisfaction.isPositive ? (
                  <ArrowUp className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 mr-1" />
                )}
                {changes.satisfaction.value}% from yesterday
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footfall Trend */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Footfall Trend</span>
              <LineChart className="h-5 w-5 text-blue-500" />
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#6B7280" }}
                    domain={[0, 'auto']}
                  />
                  <Bar dataKey="footfall" fill="#3b5bfd" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Navigation */}
        <h2 className="text-lg font-medium mb-3">Detailed Insights</h2>
        <div className="grid grid-cols-2 gap-3 mb-20">
          <Button 
            variant="outline" 
            className="h-20 flex flex-col items-center justify-center"
            onClick={() => navigate(ROUTES.STORE_ANALYTICS)}
          >
            <LineChart className="h-6 w-6 mb-1 text-blue-600" />
            <span>Analytics</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col items-center justify-center"
            onClick={() => navigate(ROUTES.STORE_HEATMAP)}
          >
            <PieChart className="h-6 w-6 mb-1 text-orange-600" />
            <span>Heatmap</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col items-center justify-center"
            onClick={() => navigate(ROUTES.CUSTOMER_JOURNEY)}
          >
            <Users className="h-6 w-6 mb-1 text-green-600" />
            <span>Customer Journey</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col items-center justify-center"
            onClick={() => navigate(ROUTES.STAFF_PERFORMANCE)}
          >
            <Users className="h-6 w-6 mb-1 text-purple-600" />
            <span>Staff Performance</span>
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StoreInsights;
