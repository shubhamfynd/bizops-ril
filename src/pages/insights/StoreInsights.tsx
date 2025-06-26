import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CalendarDays, ArrowUp, ArrowDown, Users, Clock, PieChart, DollarSign, LineChart, Smile } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/routes';

const StoreInsights = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const navigate = useNavigate();

  const periods = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' }
  ];

  const metrics = [
    {
      title: 'Total Sales',
      value: '₹45,230',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Customer Visits',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Average Transaction',
      value: '₹367',
      change: '-2.1%',
      trend: 'down',
      icon: PieChart,
      color: 'text-orange-600'
    },
    {
      title: 'Staff Productivity',
      value: '94%',
      change: '+5.3%',
      trend: 'up',
      icon: Clock,
      color: 'text-purple-600'
    }
  ];

  const quickActions = [
    {
      title: 'Store Analytics',
      description: 'Detailed performance metrics',
      icon: LineChart,
      route: ROUTES.STORE_ANALYTICS,
      color: 'bg-blue-500'
    },
    {
      title: 'Store Heatmap',
      description: 'Customer traffic patterns',
      icon: PieChart,
      route: ROUTES.STORE_HEATMAP,
      color: 'bg-green-500'
    },
    {
      title: 'Customer Journey',
      description: 'Customer interaction flow',
      icon: Users,
      route: ROUTES.CUSTOMER_JOURNEY,
      color: 'bg-purple-500'
    },
    {
      title: 'Staff Performance',
      description: 'Team productivity insights',
      icon: Smile,
      route: ROUTES.STAFF_PERFORMANCE,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#181f60] w-full pt-6 pb-4 shadow-md">
        <div className="flex items-center mx-4">
          <button
            onClick={() => navigate('/home')}
            className="p-2 text-white"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="ml-2">
            <span className="text-white font-semibold text-lg">Store Insights</span>
          </div>
        </div>
      </div>

      {/* Period Selector */}
      <div className="bg-white border-b">
        <div className="flex space-x-1 p-4">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === period.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  <Badge 
                    variant={metric.trend === 'up' ? 'default' : 'secondary'}
                    className={metric.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                  >
                    {metric.trend === 'up' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                    {metric.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <div className="text-sm text-gray-500">{metric.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(action.route)}
              >
                <CardContent className="p-4">
                  <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Activity</span>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New customer registration</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Inventory update completed</p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Staff shift started</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoreInsights;
