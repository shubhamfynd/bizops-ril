import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/home/Header";
import QuickActions from "@/components/home/QuickActions";

const Home: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-[#f5f6fa] overflow-hidden">
      {/* Header - Fixed at top */}
      <Header />

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="w-full px-4 mt-4 bg-white rounded-2xl p-4 flex flex-col shadow mb-2">
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Home;
