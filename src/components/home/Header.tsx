import React, { useState } from "react";
import { Menu, ChevronDown, Bell, Play } from 'lucide-react';
import LeftMenu from "@/components/LeftMenu";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const handleStoriesClick = () => {
    navigate('/stories');
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

        <span className="text-white font-semibold text-lg">BizOps Center</span>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleStoriesClick}
            className="text-white hover:opacity-80 transition-opacity hover:bg-blue-500/20 hover:rounded-full p-2"
          >
            <Play size={20} />
          </button>
          <button className="text-white hover:opacity-80 transition-opacity hover:bg-blue-500/20 hover:rounded-full p-2">
            <Bell size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
