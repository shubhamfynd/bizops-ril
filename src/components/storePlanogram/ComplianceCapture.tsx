import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Check, AlertTriangle } from 'lucide-react';

const ComplianceCapture = () => {
  const [selectedShelf, setSelectedShelf] = useState(null);
  
  const pendingChecks = [
    {
      id: 1,
      location: 'Women\'s Fashion - Window Display',
      priority: 'high',
      dueDate: 'Today',
      lastCheck: '3 days ago',
    },
    {
      id: 2,
      location: 'Accessories Counter - Main Floor',
      priority: 'medium',
      dueDate: 'Tomorrow',
      lastCheck: '1 day ago',
    },
    {
      id: 3,
      location: 'Men\'s Casual - Section B',
      priority: 'low',
      dueDate: 'In 2 days',
      lastCheck: '2 hours ago',
    },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-slate-900">Store Compliance</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-red-600">5</div>
            <div className="text-xs text-red-600">Pending</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-green-600">18</div>
            <div className="text-xs text-green-600">Completed</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-blue-600">89%</div>
            <div className="text-xs text-blue-600">Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Checks */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Pending Compliance Checks</h2>
        <div className="space-y-3">
          {pendingChecks.map((check) => (
            <Card key={check.id} className="cursor-pointer hover:shadow-md transition-shadow border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{check.location}</h3>
                    <p className="text-sm text-slate-600">Last check: {check.lastCheck}</p>
                  </div>
                  <Badge 
                    variant={check.priority === 'high' ? 'destructive' : check.priority === 'medium' ? 'default' : 'secondary'}
                    className={check.priority === 'medium' ? 'bg-indigo-600' : ''}
                  >
                    {check.priority === 'high' && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {check.priority}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Due: {check.dueDate}</span>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                    <Camera className="h-4 w-4 mr-2" />
                    Capture
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplianceCapture;
