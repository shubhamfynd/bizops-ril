
import React from 'react';

interface Product {
  id: string;
  name: string;
  category: string;
  sales: number;
  stock: number;
  trend: number;
}

interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const getTrendIcon = (trend: number) => {
    if (trend > 0) {
      return <span className="text-success">↑ {trend}%</span>;
    } else {
      return <span className="text-danger">↓ {Math.abs(trend)}%</span>;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-800">Top Products</h3>
        <button className="text-sm text-app-blue font-medium">View All</button>
      </div>
      
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-xs text-gray-500">
            <th className="pb-2">PRODUCT</th>
            <th className="pb-2">CATEGORY</th>
            <th className="pb-2 text-right">SALES</th>
            <th className="pb-2 text-right">TREND</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((product) => (
            <tr key={product.id} className="text-sm">
              <td className="py-3 pr-4">
                <div className="font-medium">{product.name}</div>
              </td>
              <td className="py-3 pr-4 text-gray-600">{product.category}</td>
              <td className="py-3 pr-4 text-right">${product.sales.toLocaleString()}</td>
              <td className="py-3 text-right">{getTrendIcon(product.trend)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
