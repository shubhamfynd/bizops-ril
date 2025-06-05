import { ChevronLeft } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const onBack=()=>{
    navigate(-1);
  }
  
  return (
    <div className="bg-[#0a0d36] text-white px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-2">
        <button onClick={onBack} className="mr-2 text-white font-bold text-lg">
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center">
            <h1 className="text-lg font-bold">MyStore</h1>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
        
        {/* Right section */}
        <div className="flex items-center space-x-3">
          <button className="p-1" aria-label="Notifications">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          </button>
          <button className="p-1 relative" aria-label="Messages">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span className="absolute top-0 right-0 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">3</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
