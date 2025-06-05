
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Map } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ROUTES } from '@/lib/routes';

const StoreHeatmap: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white py-4 px-4 flex items-center shadow-sm">
        <ChevronLeft 
          className="h-6 w-6 text-gray-700 mr-3 cursor-pointer" 
          onClick={() => navigate(ROUTES.INSIGHTS)}
        />
        <h1 className="text-xl font-semibold">Store Heatmap</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <Card className="mb-4">
          <CardContent className="p-6 text-center">
            <Map className="h-10 w-10 mx-auto mb-4 text-orange-500" />
            <h2 className="text-lg font-medium mb-2">Store Traffic Heatmap</h2>
            <p className="text-gray-500">Store heatmap feature is under development. Check back soon for visualization of customer movement patterns and hotspots.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoreHeatmap;
