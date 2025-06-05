
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ROUTES } from '@/lib/routes';

const StaffPerformance: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white py-4 px-4 flex items-center shadow-sm">
        <ChevronLeft 
          className="h-6 w-6 text-gray-700 mr-3 cursor-pointer" 
          onClick={() => navigate(ROUTES.INSIGHTS)}
        />
        <h1 className="text-xl font-semibold">Staff Performance</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <Card className="mb-4">
          <CardContent className="p-6 text-center">
            <Users className="h-10 w-10 mx-auto mb-4 text-purple-500" />
            <h2 className="text-lg font-medium mb-2">Staff Performance Metrics</h2>
            <p className="text-gray-500">Staff performance metrics feature is under development. Check back soon for detailed employee productivity and efficiency analytics.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffPerformance;
