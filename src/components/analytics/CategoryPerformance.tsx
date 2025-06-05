
import React, { useState } from 'react';

interface CategoryData {
  name: string;
  value: number;
  percent: number;
}

interface CategoryPerformanceProps {
  categories: CategoryData[];
}

const CategoryPerformance: React.FC<CategoryPerformanceProps> = ({ categories }) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  
  const toggleExpanded = (categoryName: string) => {
    if (expanded === categoryName) {
      setExpanded(null);
    } else {
      setExpanded(categoryName);
    }
  };

  const getColorClass = (value: number) => {
    if (value >= 85) return 'bg-success';
    if (value >= 50) return 'bg-warning';
    return 'bg-danger';
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-medium text-gray-800 mb-4">Category Performance</h3>
      
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <button 
                  className="mr-2 text-gray-500"
                  onClick={() => toggleExpanded(category.name)}
                >
                  {expanded === category.name ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 15l6-6 6 6"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  )}
                </button>
                <span className="font-medium">{category.name}</span>
              </div>
              <span className="font-medium text-sm">
                ${category.value.toLocaleString()}
              </span>
            </div>
            
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getColorClass(category.percent)}`} 
                style={{ width: `${category.percent}%` }} 
              />
            </div>
            
            {expanded === category.name && (
              <div className="pl-6 pt-2 space-y-3">
                {/* Subcategories */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Electronics</span>
                  <span>${(category.value * 0.4).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Kitchen</span>
                  <span>${(category.value * 0.3).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Accessories</span>
                  <span>${(category.value * 0.3).toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPerformance;
