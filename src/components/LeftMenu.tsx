import React from "react";
import { User, FileText, File, BookText, Users, GraduationCap, Bot, Clock, MessageSquare, HelpCircle, Settings } from "lucide-react";

export default function LeftMenu() {
  return (
    <div className="w-72 max-w-full bg-white h-full flex flex-col shadow-lg">
      <div className="flex flex-col items-center py-6">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Rishabh Patel"
          className="w-14 h-14 rounded-full object-cover mb-2"
        />
        <div className="font-semibold text-base">Rishabh Patel</div>
        <a href="#" className="text-blue-700 text-xs mt-1 hover:underline">View Profile</a>
      </div>
      <hr className="my-2 mx-4" />
      <nav className="flex-1 px-4 overflow-y-auto">
        <ul className="space-y-2 ">
          <li className="flex items-center space-x-3 py-2 cursor-pointer hover:bg-gray-100 rounded px-2">
            <FileText size={18} className="text-gray-600" />
            <span>Digital Register</span>
          </li>
          <li className="flex items-center space-x-3 py-2 cursor-pointer hover:bg-gray-100 rounded px-2">
            <File size={18} className="text-gray-600" />
            <span>Reports</span>
          </li>
          <li className="flex items-center space-x-3 py-2 cursor-pointer hover:bg-gray-100 rounded px-2">
            <BookText size={18} className="text-gray-600" />
            <span>Doc Management</span>
          </li>
          <li className="flex items-center space-x-3 py-2 cursor-pointer hover:bg-gray-100 rounded px-2">
            <Users size={18} className="text-gray-600" />
            <span>Team</span>
          </li>
          <li className="flex items-center space-x-3 py-2 cursor-pointer hover:bg-gray-100 rounded px-2">
            <GraduationCap size={18} className="text-gray-600" />
            <span>My Learnings</span>
          </li>
          <li className="flex items-center space-x-3 py-2 cursor-pointer hover:bg-gray-100 rounded px-2">
            <Bot size={18} className="text-gray-600" />
            <span>HR Bot</span>
          </li>
          <li className="flex items-center space-x-3 py-2 cursor-pointer hover:bg-gray-100 rounded px-2">
            <Clock size={18} className="text-gray-600" />
            <span>Activity Log</span>
          </li>
        </ul>
        <ul className="space-y-2 ">
          <li className="flex items-center space-x-3 py-2 cursor-pointer hover:bg-gray-100 rounded px-2">
            <FileText size={18} className="text-gray-600" />
            <span>Digital Register</span>
          </li>
          <li className="flex items-center space-x-3 py-2 cursor-pointer hover:bg-gray-100 rounded px-2">
            <File size={18} className="text-gray-600" />
            <span>Reports</span>
          </li>
          <li className="flex items-center space-x-3 py-2 cursor-pointer hover:bg-gray-100 rounded px-2">
            <BookText size={18} className="text-gray-600" />
            <span>Doc Management</span>
          </li>
          <li className="flex items-center space-x-3 py-2 cursor-pointer hover:bg-gray-100 rounded px-2">
            <Users size={18} className="text-gray-600" />
            <span>Team</span>
          </li>
          <li className="flex items-center space-x-3 py-2 cursor-pointer hover:bg-gray-100 rounded px-2">
            <GraduationCap size={18} className="text-gray-600" />
            <span>My Learnings</span>
          </li>
          <li className="flex items-center space-x-3 py-2 cursor-pointer hover:bg-gray-100 rounded px-2">
            <Bot size={18} className="text-gray-600" />
            <span>HR Bot</span>
          </li>
          <li className="flex items-center space-x-3 py-2 cursor-pointer hover:bg-gray-100 rounded px-2">
            <Clock size={18} className="text-gray-600" />
            <span>Activity Log</span>
          </li>
        </ul>
      </nav>
      <div className="px-4">
        <hr className="my-4" />
        <ul className="space-y-2 mb-4">
          <li className="flex items-center space-x-3 py-2 cursor-pointer hover:bg-gray-100 rounded px-2">
            <MessageSquare size={18} className="text-gray-600" />
            <span>My Requests</span>
            <span className="ml-auto text-xs bg-blue-100 text-blue-600 rounded-full px-2">3</span>
          </li>
          <li className="flex items-center space-x-3 py-2 cursor-pointer hover:bg-gray-100 rounded px-2">
            <HelpCircle size={18} className="text-gray-600" />
            <span>Help</span>
          </li>
          <li className="flex items-center space-x-3 py-2 cursor-pointer hover:bg-gray-100 rounded px-2">
            <Settings size={18} className="text-gray-600" />
            <span>Settings</span>
          </li>
        </ul>
      </div>
    </div>
  );
} 