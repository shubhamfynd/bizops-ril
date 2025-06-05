import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Search, ZoomIn, Camera } from 'lucide-react';

const PlanogramViewer = () => {
  const [selectedPlanogram, setSelectedPlanogram] = useState(null);
  
  const planograms = [
    {
      id: 1,
      name: 'Women\'s Fashion - Spring Collection',
      category: 'Apparel',
      lastUpdated: '2024-01-15',
      compliance: 92,
      status: 'active',
    },
    {
      id: 2,
      name: 'Accessories Display - Main Entrance',
      category: 'Accessories',
      lastUpdated: '2024-01-14',
      compliance: 85,
      status: 'needs_update',
    },
    {
      id: 3,
      name: 'Men\'s Casual Wear - Section A',
      category: 'Menswear',
      lastUpdated: '2024-01-13',
      compliance: 96,
      status: 'active',
    },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-slate-900">Visual Merchandising</h1>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search planograms..."
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Planogram List */}
      <div className="space-y-3">
        {planograms.map((planogram) => (
          <Card key={planogram.id} className="cursor-pointer hover:shadow-md transition-shadow border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{planogram.name}</h3>
                  <p className="text-sm text-slate-600">{planogram.category}</p>
                </div>
                <Badge variant={planogram.status === 'active' ? 'default' : 'secondary'} 
                       className={planogram.status === 'active' ? 'bg-indigo-600' : ''}>
                  {planogram.status === 'active' ? 'Active' : 'Needs Update'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-slate-600">
                    Compliance: <span className={`font-semibold ${planogram.compliance >= 90 ? 'text-green-600' : 'text-orange-600'}`}>
                      {planogram.compliance}%
                    </span>
                  </span>
                  <span className="text-slate-500">Updated: {planogram.lastUpdated}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                  <ZoomIn className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button size="sm" variant="outline" className="border-indigo-200 text-indigo-600">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-indigo-200 text-indigo-600">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mock Planogram Viewer */}
      <Card className="mt-6 border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg">Planogram Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-100 h-64 rounded-lg flex items-center justify-center">
            <div className="text-center text-slate-500">
              <ZoomIn className="h-12 w-12 mx-auto mb-2" />
              <p>Select a planogram to view</p>
              <p className="text-sm">Interactive planogram viewer will appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanogramViewer;
