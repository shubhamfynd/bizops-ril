import React from "react";

export default function TasksTabFooter({ activeTab, onTabChange }) {
    return (
        <div className="fixed bottom-0 left-0 w-full z-30 bg-white pt-2 pb-[32px] shadow-inner border-t">
            <div className="mx-auto w-11/12 max-w-md bg-[#f0f0f0] rounded-xl p-1 flex justify-between">
                <button
                    className={`flex-1 py-2 rounded-lg text-sm transition-all ${activeTab === "my"
                            ? "bg-white text-blue-600 font-semibold shadow"
                            : "bg-transparent text-gray-500"
                        }`}
                    onClick={() => onTabChange("my")}
                >
                    My Tasks
                </button>
                <button
                    className={`flex-1 py-2 rounded-lg text-sm transition-all ${activeTab === "other"
                            ? "bg-white text-blue-600 font-semibold shadow"
                            : "bg-transparent text-gray-500"
                        }`}
                    onClick={() => onTabChange("other")}
                >
                    Other Store Tasks
                </button>
            </div>
        </div>
    );
}
