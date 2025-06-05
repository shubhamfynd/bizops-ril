import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, CalendarDays, User } from "lucide-react";
import { tasks as allTasks } from "@/data/tasks";
import TaskHeader from "@/components/TaskHeader";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import AssignTaskModal from "./AssignTaskModal";
import { storeStaff } from "@/data/staff";

const statusTabs = [
    { label: "Pending", count: 4 },
    { label: "In Progress", count: 3 },
    { label: "Completed", count: 1 },
];

export default function MyTasksList({ fullView, onViewAll, onBack }) {
    const [activeStatus, setActiveStatus] = useState("Pending");
    const [search, setSearch] = useState("");
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
    const navigate = useNavigate();
    const tasks = allTasks.filter(t => t.group === "my" && t.title.toLowerCase().includes(search.toLowerCase()));

    const handleAssignClick = (taskId: number, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click
        setSelectedTaskId(taskId);
        setShowAssignModal(true);
    };

    const handleAssignTask = (staffId: string) => {
        if (selectedTaskId) {
            const task = tasks.find(t => t.id === selectedTaskId);
            if (task) {
                const staff = storeStaff.find(s => s.id === staffId);
                if (staff) {
                    // Update task in the tasks array
                    const taskIndex = allTasks.findIndex(t => t.id === selectedTaskId);
                    if (taskIndex !== -1) {
                        allTasks[taskIndex] = {
                            ...allTasks[taskIndex],
                            group: 'other',
                            assignee: staff.name
                        };
                    }
                }
            }
        }
    };

    return (
        <div className={fullView ? "min-h-screen bg-[#181f60] pt-0" : ""}>
            {fullView ? (
                <>
                    <TaskHeader title={"Today's Tasks"} onBack={onBack} />
                    <div className="bg-white rounded-t-2xl p-4 -mt-4 min-h-screen">
                        <div className="flex items-center mb-1">
                            <span className="font-semibold text-base mr-2">My Tasks</span>
                            <span className="bg-[#f0f4ff] text-xs rounded-full px-2 py-0.5 font-semibold">{tasks.length}</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-2">Showing all the tasks assigned to you</div>
                        <div className="flex gap-2 mb-4">
                            {statusTabs.map(tab => (
                                <button
                                    key={tab.label}
                                    className={`px-3 py-1 rounded-full border text-xs font-semibold ${activeStatus === tab.label ? 'bg-[#e6ecff] text-[#181f60] border-[#181f60]' : 'bg-white text-gray-600 border-gray-300'}`}
                                    onClick={() => setActiveStatus(tab.label)}
                                >
                                    {tab.label} <span className="ml-1">{tab.count}</span>
                                </button>
                            ))}
                        </div>
                        <div className="overflow-y-auto max-h-[calc(100vh-200px)] pb-12">
                            {tasks.map((task, i) => (
                                <Card className="mb-3 p-4 cursor-pointer" key={i} onClick={() => navigate(`/task/${task.id}`)}>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-base">{task.title}</span>
                                            <ChevronRight className="text-gray-400" size={20} />
                                        </div>
                                        <div className="flex gap-2 mb-1">
                                            {task.priority === 'High Priority' && <Badge className="bg-red-100 text-red-800" variant="secondary">High Priority</Badge>}
                                            {task.priority === 'Medium Priority' && <Badge className="bg-yellow-100 text-yellow-800" variant="secondary">Medium Priority</Badge>}
                                            {task.priority === 'New' && <Badge className="bg-blue-100 text-blue-800" variant="secondary">New</Badge>}
                                            {task.type && <Badge className="bg-gray-100 text-gray-800" variant="secondary">{task.type}</Badge>}
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500 gap-2">
                                            <span className="flex items-center"><CalendarDays className="mr-1" size={14} /> Due: {task.due}</span>
                                            <span className="flex items-center ml-4"><User className="mr-1" size={14} /> By: {task.assignee}</span>
                                        </div>
                                        {fullView && (
                                            <div className="flex gap-2 mt-2">
                                                <button 
                                                    className="border border-[#181f60] text-[#181f60] rounded-full px-4 py-1 text-xs font-semibold"
                                                    onClick={(e) => handleAssignClick(task.id, e)}
                                                >
                                                    + Assign Task
                                                </button>
                                                <button className="bg-[#4f5fff] text-white rounded-full px-4 py-1 text-xs font-semibold">
                                                    Start Task
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {tasks.slice(0, 3).map((task, i) => (
                        <Card className="mb-3 p-4 cursor-pointer" key={i} onClick={() => navigate(`/task/${task.id}`)}>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-base">{task.title}</span>
                                    <ChevronRight className="text-gray-400" size={20} />
                                </div>
                                <div className="flex gap-2 mb-1">
                                    {task.priority === 'High Priority' && <Badge className="bg-red-100 text-red-800" variant="secondary">High Priority</Badge>}
                                    {task.priority === 'Medium Priority' && <Badge className="bg-yellow-100 text-yellow-800" variant="secondary">Medium Priority</Badge>}
                                    {task.priority === 'New' && <Badge className="bg-blue-100 text-blue-800" variant="secondary">New</Badge>}
                                    {task.type && <Badge className="bg-gray-100 text-gray-800" variant="secondary">{task.type}</Badge>}
                                </div>
                                <div className="flex items-center text-xs text-gray-500 gap-2">
                                    <span className="flex items-center"><CalendarDays className="mr-1" size={14} /> Due: {task.due}</span>
                                    <span className="flex items-center ml-4"><User className="mr-1" size={14} /> To: {task.assignee}</span>
                                </div>
                            </div>
                        </Card>
                    ))}
                    <button className="mx-auto block text-[#2563eb] text-sm font-semibold mt-2 mb-1" onClick={onViewAll}>View All</button>
                </>
            )}

            <AssignTaskModal
                isOpen={showAssignModal}
                onClose={() => setShowAssignModal(false)}
                onAssign={handleAssignTask}
                taskId={selectedTaskId || 0}
            />
        </div>
    );
} 