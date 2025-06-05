import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyTasksList from "@/components/MyTasksList";
import OtherStoreTasksList from "@/components/OtherStoreTasksList";
import TasksTabFooter from "@/components/TasksTabFooter";

export default function OtherStoreTasksPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'my' | 'other'>('other');
    return (
        <div className="p-0 min-h-screen bg-[#181f60] flex flex-col">
            <div className="flex-1 overflow-y-auto pb-24">
                {activeTab === 'my' ? (
                    <MyTasksList fullView onBack={() => navigate("/home")} onViewAll={() => { }} />
                ) : (
                    <OtherStoreTasksList fullView onBack={() => navigate("/home")} onViewAll={() => { }} />
                )}
            </div>
            <TasksTabFooter activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    );
} 