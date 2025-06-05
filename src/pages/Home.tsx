
import React, { useState } from "react";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import Header from "@/components/home/Header";
import ClockInSection from "@/components/home/ClockInSection";
import QuickActions from "@/components/home/QuickActions";
import PendingTasks from "@/components/home/PendingTasks";
import Announcements from "@/components/home/Announcements";

const Home: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-[#f5f6fa] overflow-hidden">
      {/* Header - Fixed at top */}
      <Header />

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="w-full px-4 mt-4 bg-white rounded-2xl p-4 flex flex-col shadow mb-2">
          <ClockInSection />
          <QuickActions />
          <PendingTasks />
          <Announcements />
        </div>
      </div>

      {/* Footer - Fixed at bottom */}
      {!showMenu && <Footer />}
    </div>
  );
};

export default Home;
