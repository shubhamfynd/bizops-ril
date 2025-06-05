import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Scan, CheckCircle, AlertCircle } from 'lucide-react';

const CycleCount = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedItems, setScannedItems] = useState([]);
  
  const countTasks = [
    {
      id: 1,
      section: 'Women\'s Apparel Section A',
      targetItems: 125,
      scannedItems: 118,
      status: 'in_progress',
      priority: 'high',
    },
    {
      id: 2,
      section: 'Accessories & Jewelry',
      targetItems: 89,
      scannedItems: 89,
      status: 'completed',
      priority: 'medium',
    },
    {
      id: 3,
      section: 'Men\'s Footwear',
      targetItems: 67,
      scannedItems: 0,
      status: 'pending',
      priority: 'low',
    },
  ];

  const recentScans = [
    { id: 1, item: 'Designer Handbag - Leather', rfid: 'RF001234', timestamp: '10:34 AM' },
    { id: 2, item: 'Summer Dress - Floral Print', rfid: 'RF001235', timestamp: '10:33 AM' },
    { id: 3, item: 'Running Shoes - Size 9', rfid: 'RF001236', timestamp: '10:32 AM' },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-slate-900">Inventory Count</h1>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-blue-600">281</div>
            <div className="text-xs text-blue-600">Total Items</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-green-600">207</div>
            <div className="text-xs text-green-600">Scanned</div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-orange-600">7</div>
            <div className="text-xs text-orange-600">Missing</div>
          </CardContent>
        </Card>
      </div>

      {/* RFID Scanner */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg">RFID Scanner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`h-32 rounded-lg flex items-center justify-center transition-colors ${
            isScanning ? 'bg-indigo-100 border-2 border-indigo-300 border-dashed' : 'bg-slate-100'
          }`}>
            <div className="text-center">
              {isScanning ? (
                <div className="text-indigo-600">
                  <div className="animate-pulse">
                    <Search className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-medium">Scanning for RFID tags...</p>
                  </div>
                </div>
              ) : (
                <div className="text-slate-500">
                  <Search className="h-8 w-8 mx-auto mb-2" />
                  <p>Ready to scan RFID tags</p>
                </div>
              )}
            </div>
          </div>
          
          <Button 
            size="lg" 
            className="w-full bg-indigo-600 hover:bg-indigo-700" 
            onClick={() => setIsScanning(!isScanning)}
          >
            <Search className="h-5 w-5 mr-2" />
            {isScanning ? 'Stop Scanning' : 'Start RFID Scan'}
          </Button>
        </CardContent>
      </Card>

      {/* Count Tasks */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Count Tasks</h2>
        <div className="space-y-3">
          {countTasks.map((task) => (
            <Card key={task.id} className="border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{task.section}</h3>
                    <p className="text-sm text-slate-600">
                      {task.scannedItems}/{task.targetItems} items scanned
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {task.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : task.status === 'in_progress' ? (
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                    ) : (
                      <div className="h-5 w-5 rounded-full bg-slate-300" />
                    )}
                    <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'}
                           className={task.priority === 'medium' ? 'bg-indigo-600 text-white' : ''}>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
                
                <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
                  <div 
                    className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(task.scannedItems / task.targetItems) * 100}%` }}
                  />
                </div>
                
                <Button size="sm" variant="outline" className="w-full border-indigo-200 text-indigo-600">
                  <Scan className="h-4 w-4 mr-2" />
                  Continue Count
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Scans */}
      {recentScans.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Scans</h2>
          <Card className="border-slate-200">
            <CardContent className="p-0">
              {recentScans.map((scan, index) => (
                <div key={scan.id} className={`p-3 ${index !== recentScans.length - 1 ? 'border-b border-slate-100' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{scan.item}</p>
                      <p className="text-xs text-slate-500">RFID: {scan.rfid}</p>
                    </div>
                    <span className="text-xs text-slate-500">{scan.timestamp}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CycleCount;
