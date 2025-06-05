
import React, { useState } from "react";
import { Menu, ChevronDown, Bell, MessageSquare, Search, QrCode } from 'lucide-react';
import LeftMenu from "@/components/LeftMenu";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  
  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  return (
    <div className="bg-[#181f60] w-full pt-6 pb-4 shadow-md">
      <div className="flex items-center justify-between mx-4">
        <button
          onClick={() => { toggleMenu() }}
          className="p-2 text-white"
        >
          <Menu />
        </button>

        {showMenu && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-30 z-40"
              onClick={() => setShowMenu(false)}
            ></div>
            <div className="fixed top-0 left-0 h-full z-50">
              <LeftMenu />
            </div>
          </>
        )}

        <span className="text-white font-semibold text-lg flex items-center">MyStore <ChevronDown size={18} className="ml-1" /></span>
        <div className="flex items-center space-x-4">
          <Bell className="text-white" />
          <MessageSquare className="text-white" />
        </div>
      </div>
      <div className="flex items-center space-x-3 w-full max-w-2xl mx-auto m-2 px-4 py-3">
        <div className="flex items-center bg-[#353d7c] rounded-full px-4 py-2 flex-1">
          <input
            className="bg-transparent text-white placeholder-white/70 outline-none text-sm sm:text-base flex-1"
            placeholder="Search"
          />
          <Search className="text-white opacity-80" size={20} />
        </div>
        <button className="bg-[#353d7c] p-2 sm:p-3 rounded-full hover:bg-[#454d9c] transition">
          <QrCode className="text-white opacity-80" size={20} />
        </button>
      </div>
    </div>
  );
};

export default Header;
