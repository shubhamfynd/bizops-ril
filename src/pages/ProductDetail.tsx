
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, PrinterIcon, Layers, X } from 'lucide-react';
import { products } from '@/data/inventory';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from '@/components/ui/sonner';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleAction = (action: string) => {
    toast(`Action triggered: ${action}`, {
      duration: 500,
      className: 'bg-red-600 text-white rounded-md px-4 py-2 font-medium shadow',
    });
    setShowActions(false);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="p-4 flex items-center">
        <button onClick={handleBack} className="mr-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold">{product.name}</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        <div className="p-5 flex items-center justify-center">
          <div className="bg-gray-100 w-full max-w-md rounded-xl p-8 flex justify-center">
            <img 
              src={product.image}
              alt={product.name}
              className="h-40 object-contain"
            />
          </div>
        </div>
        
        <div className="px-5">
          <div className="grid grid-cols-2 gap-y-4 mb-6">
            <div>
              <p className="text-gray-500 text-xs">SKU Name</p>
              <p className="font-medium">{product.name}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">SKU ID</p>
              <p className="font-medium">{product.sku}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Price</p>
              <p className="font-medium">₹ {product.price}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">In Stock</p>
              <p className="font-medium">{product.inStock}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Category</p>
              <p className="font-medium">{product.category}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Sub Category</p>
              <p className="font-medium">{product.subCategory}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Expiry Date</p>
              <p className="font-medium">{product.expiryDate}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Status</p>
              <p className={`font-medium ${product.status === 'Markdown' ? 'text-orange-500' : 'text-blue-600'}`}>
                {product.status}
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-500 text-xs mb-1">Product Description</p>
            <p className="text-sm">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Sale History</h3>
            {product.saleHistory && product.saleHistory.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3 text-xs">Date</TableHead>
                    <TableHead className="w-1/3 text-xs">Quantity</TableHead>
                    <TableHead className="w-1/3 text-xs">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.saleHistory.map((sale, index) => (
                    <TableRow key={index}>
                      <TableCell className="py-2 text-sm">{sale.date}</TableCell>
                      <TableCell className="py-2 text-sm">{sale.quantity}</TableCell>
                      <TableCell className="py-2 text-sm">₹ {sale.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-gray-500">No sales history available</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-9 right-9 z-50">
        
        <DropdownMenu open={showActions} onOpenChange={setShowActions}>
          <DropdownMenuTrigger asChild>
            <Button className="bg-blue-600 shadow-lg rounded-full px-6 py-3 text-white">
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white">
            <DropdownMenuItem className="py-2 cursor-pointer" onClick={() => handleAction('Markdown')}>
              <div className="w-5 h-5 mr-2 flex items-center justify-center text-blue-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 14-5-5 5-5" />
                  <path d="M20 21H9a2 2 0 0 1-2-2V5" />
                </svg>
              </div>
              <span>Markdown</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2 cursor-pointer" onClick={() => handleAction('Print SEL')}>
              <div className="w-5 h-5 mr-2 flex items-center justify-center text-blue-600">
                <PrinterIcon size={16} />
              </div>
              <span>Print SEL</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2 cursor-pointer" onClick={() => handleAction('Print POP')}>
              <div className="w-5 h-5 mr-2 flex items-center justify-center text-blue-600">
                <PrinterIcon size={16} />
              </div>
              <span>Print POP</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2 cursor-pointer" onClick={() => handleAction('Count Correction')}>
              <div className="w-5 h-5 mr-2 flex items-center justify-center text-blue-600">
                <Layers size={16} />
              </div>
              <span>Count Correction</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2 cursor-pointer" onClick={() => handleAction('Dump')}>
              <div className="w-5 h-5 mr-2 flex items-center justify-center text-blue-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
              </div>
              <span>Dump</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* <Toaster position="bottom-right" /> */}
    </div>
  );
};

export default ProductDetail;
