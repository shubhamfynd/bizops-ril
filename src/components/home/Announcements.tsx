
import React from "react";
import { User, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';

const Announcements: React.FC = () => {
  return (
    <div className="px-4 mt-6 mb-28">
      <div className="flex items-center mb-2">
        <span className="font-semibold text-base mr-2">Announcements</span>
        <span className="bg-gray-200 text-xs rounded-full px-2 py-0.5 text-gray-600 font-medium">8</span>
      </div>
      <div className="bg-white rounded-xl p-4 shadow flex flex-col">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2 overflow-hidden">
            <User className="text-gray-500" size={20} />
          </div>
          <div>
            <div className="font-medium text-sm text-gray-800">Terry John Paul</div>
            <div className="text-xs text-gray-400">27 Mar 2025</div>
          </div>
        </div>
        <div className="text-xs text-gray-700 mb-2">Wifi Down in the store</div>
        <div className="text-xs text-gray-500 mb-3">Hi All, We are currently experiencing a technical issue with regarding automatic leave deductions. We are working to resolve the problem and will keep you updated once it is fixed.</div>
        <div className="flex items-center space-x-6 text-xs text-gray-400">
          <div className="flex items-center space-x-1"><ThumbsUp size={16} /> <span>16</span></div>
          <div className="flex items-center space-x-1"><MessageCircle size={16} /> <span>16</span></div>
          <div className="flex items-center space-x-1 ml-auto"><Share2 size={16} /> <span>Share</span></div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
