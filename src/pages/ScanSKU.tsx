
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { products } from '@/data/inventory';

const ScanSKU: React.FC = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(true);
  const [productFound, setProductFound] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    // Simulate scanning after a few seconds
    const timer = setTimeout(() => {
      if (scanning) {
        // Pretend we found the first product
        const foundProduct = products[0];
        setSelectedProduct(foundProduct);
        setScanning(false);
        setProductFound(true);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [scanning]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleManualEntry = () => {
    toast("Manual entry mode activated");
  };

  const handleViewDetails = () => {
    if (selectedProduct) {
      navigate(`/product/${selectedProduct.id}`);
    }
  };

  const handleMarkdown = () => {
    toast("Product marked for markdown");
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="p-4 flex items-center">
        <button onClick={handleBack} className="mr-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold">Scan SKU</h1>
      </div>

      <div className="flex-1 flex flex-col">
        {scanning ? (
          <>
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <div className="relative w-full max-w-md aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Camera viewfinder overlay */}
                  <div className="border-2 border-white w-4/5 h-1/3 rounded-lg flex items-center justify-center">
                    <div className="animate-pulse text-white text-sm">Scanning...</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <Button 
                variant="outline" 
                className="w-full bg-white border-blue-600 text-blue-600 mb-4"
                onClick={handleManualEntry}
              >
                Enter Manually
              </Button>
            </div>
          </>
        ) : productFound && selectedProduct ? (
          <div className="flex-1 flex flex-col">
            <div className="p-5 flex items-center justify-center">
              <div className="bg-gray-100 w-full max-w-md rounded-xl p-8 flex justify-center">
                <img 
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="h-40 object-contain"
                />
              </div>
            </div>
            
            <div className="p-5 flex-1">
              <h2 className="text-xl font-semibold">{selectedProduct.name}</h2>
              <p className="text-gray-500 text-sm mb-4">SKU ID: {selectedProduct.sku}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-500 text-sm">Price</p>
                  <p className="font-medium">₹ {selectedProduct.price}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">In Stock</p>
                  <p className="font-medium">{selectedProduct.inStock}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Category</p>
                  <p className="font-medium">{selectedProduct.category}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Sub Category</p>
                  <p className="font-medium">{selectedProduct.subCategory}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Expiry Date</p>
                  <p className="font-medium">{selectedProduct.expiryDate}</p>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-4">
                <Button 
                  variant="outline" 
                  className="flex-1 border-orange-500 text-orange-500"
                  onClick={handleMarkdown}
                >
                  Markdown
                </Button>
                <Button 
                  className="flex-1 bg-blue-600"
                  onClick={handleViewDetails}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <p className="text-gray-500">No product found</p>
            <Button 
              className="mt-4 bg-blue-600"
              onClick={() => setScanning(true)}
            >
              Scan Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanSKU;
