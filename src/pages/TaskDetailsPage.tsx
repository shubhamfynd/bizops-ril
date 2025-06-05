import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tasks } from "@/data/tasks";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

export default function TaskDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((t) => String(t.id) === String(id));
  const [showSheet, setShowSheet] = React.useState(false);
  const [sheetMsg, setSheetMsg] = React.useState("");
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarMsg, setSnackbarMsg] = React.useState("");
  const [showDialog, setShowDialog] = React.useState(false);
  const [showChecklistDialog, setShowChecklistDialog] = React.useState(false);
  const [showChecklistSnackbar, setShowChecklistSnackbar] = React.useState(false);
  const [checklistSnackbarMsg, setChecklistSnackbarMsg] = React.useState("");
  const [showChecklistModal, setShowChecklistModal] = React.useState(false);
  const [checklistAnswers, setChecklistAnswers] = React.useState<{ [qIdx: number]: string }>({});
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answers, setAnswers] = useState({});

  const handleOptionChange = (questionIndex, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };
  if (!task) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Task Not Found</h2>
          <button className="text-blue-600 underline" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  // Use type assertion to allow optional properties, resolving TS errors
  const adhocDetails = (task as any).adhocDetails;
  const checklistDetails = (task as any).checklistDetails;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-[#181f60] px-4 py-4 flex items-center">
        <button onClick={() => navigate(-1)} className="mr-2 text-white font-bold text-lg"><ChevronLeft size={24} /></button>
        <span className="font-semibold text-base text-white">Task Details</span>
      </div>
      <div className="flex-1 px-4 py-6 flex flex-col relative">
        <div className="font-bold text-xl mb-2">{task.title}</div>
        <div className="flex gap-2 mb-2">
          {task.priority === 'High Priority' && <span className="inline-block bg-red-100 text-red-800 text-xs rounded px-2 py-0.5 font-semibold">High Priority</span>}
          {task.priority === 'Medium Priority' && <span className="inline-block bg-yellow-100 text-yellow-800 text-xs rounded px-2 py-0.5 font-semibold">Medium Priority</span>}
          {task.priority === 'New' && <span className="inline-block bg-blue-100 text-blue-800 text-xs rounded px-2 py-0.5 font-semibold">New</span>}
          {task.type && <span className="inline-block bg-gray-200 text-gray-800 text-xs rounded px-2 py-0.5 font-semibold">{task.type}</span>}
        </div>
        <div className="flex items-center text-xs text-gray-500 gap-4 mb-4">
          <span>Due: {task.due}</span>
          <span>By: {task.assignee}</span>
        </div>
        {/* Details Section */}
        {task.type === 'Ad-Hoc' && adhocDetails ? (
          <>
            <div className="mt-4 text-sm text-black font-semibold">Task Description</div>
            <div className="text-xs text-gray-700 mt-1">{adhocDetails?.description}</div>
            <div className="mt-4 text-sm text-black font-semibold">Key metrics to track</div>
            <div className="mt-1">
              {adhocDetails?.keyMetrics?.map((metric, idx) => (
                <div key={idx} className="mb-2">
                  <div className="font-semibold text-xs">{metric.title}</div>
                  <ul className="list-disc ml-5 text-xs text-gray-700">
                    {metric.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        ) : task.type === 'Checklist' ? (
          <div className="h-screen flex flex-col px-4 py-4">
  {/* Top non-scrolling content */}
  <div className="shrink-0">
    <div className="flex items-center text-xs text-gray-500 gap-2 mb-4">
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
        <rect x="2" y="2" width="12" height="12" rx="2" />
        <path d="M7 7h2v2H7z" />
      </svg>
      {checklistDetails?.questionsCount} Questions
    </div>

    <hr className="my-4 border-gray-200" />

    <div className="text-xs text-gray-500 mb-2 font-semibold">Task Description</div>
    <div className="text-sm text-gray-800 mb-4">{checklistDetails.description}</div>

    <div className="text-xs text-gray-500 mb-2 font-semibold">Key metrics to track</div>
  </div>

  <div className="flex-1 overflow-y-auto pt-2 pb-20">
    {checklistDetails.questions.map((q, idx) => (
      <div
        key={idx}
        className="mb-8 p-5 bg-white rounded-lg shadow-md border border-gray-200 scroll-mb-34"
      >
        <h3 className="text-base font-semibold text-gray-800 mb-4">{q.question}</h3>

        <div className="space-y-3">
          {q.options.map((item, i) => (
            <label
              key={i}
              className="flex items-center p-3 bg-gray-50 rounded-md cursor-pointer border border-gray-200 hover:border-blue-500 transition duration-200"
            >
              <input
                type="radio"
                name={`question-${idx}`}
                value={item}
                className="form-radio text-blue-600 focus:ring-0 focus:outline-none mr-3"
                onChange={() => handleOptionChange(idx, item)}
              />
              <span className="text-sm text-gray-700">{item}</span>
            </label>
          ))}
        </div>
      </div>
    ))}
     <button
    className="w-full bg-[#4f5fff] text-white rounded-full py-3 text-base font-semibold mt-3 mb-4"
    onClick={() => setShowChecklistDialog(true)}
  >
    Submit
  </button>
  </div>
  </div>

        ) : (
          <div className="text-xs text-gray-700">No extra details for this task type.</div>
        )}
        <div className="flex-1" />

        <div className="relative w-full mt-8">
          {showSnackbar && (
            <div className="absolute bottom-full mb-4 left-0 w-full px-4">
              <div className="bg-green-700 text-white font-semibold rounded-xl flex items-center px-4 py-2 shadow-md text-sm w-full">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="mr-2 flex-shrink-0">
                  <circle cx="9" cy="9" r="9" fill="#198754" />
                  <path d="M5 9.5L8 12.5L13 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="truncate">{snackbarMsg}</span>
              </div>
            </div>
          )}
          {showDialog && (
            <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30">
              <div className="w-full bg-white rounded-t-2xl p-6 pb-8 shadow-lg flex flex-col items-center animate-slide-up" style={{ maxWidth: '100%' }}>
                <div className="font-semibold text-lg mb-6 mt-2 w-full text-left">Are you sure ?</div>
                <button
                  className="w-full bg-[#3b3bfd] text-white rounded-full py-3 text-base font-semibold mb-3"
                  onClick={() => {
                    setShowDialog(false);
                    setSnackbarMsg(task.type === 'Ad-Hoc' ? 'Ad-Hoc task completed' : 'Task marked as complete!');
                    setShowSnackbar(true);
                    setTimeout(() => setShowSnackbar(false), 1000);
                  }}
                >
                  Yes, Complete Task
                </button>
                <button
                  className="text-[#3b3bfd] text-base font-semibold mt-1 mb-2"
                  onClick={() => setShowDialog(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {task.type === 'Ad-Hoc' && (
            <button
              className="w-full bg-[#4f5fff] text-white rounded-full py-3 text-base font-semibold"
              onClick={() => setShowDialog(true)}
            >
              Mark as Complete
            </button>
          )}
          {task.type === 'Checklist' && (
            <>
              {showChecklistDialog && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30">
                  <div className="w-full bg-white rounded-t-2xl p-6 pb-8 shadow-lg flex flex-col items-center animate-slide-up" style={{ maxWidth: '100%' }}>
                    <div className="font-semibold text-lg mb-6 mt-2 w-full text-left">Are you sure ?</div>
                    <button
                      className="w-full bg-[#3b3bfd] text-white rounded-full py-3 text-base font-semibold mb-3"
                      onClick={() => {
                        setShowChecklistDialog(false);
                        setTimeout(() => setShowChecklistModal(true), 200);
                      }}
                    >
                      Yes, Start Checklist
                    </button>
                    <button
                      className="text-[#3b3bfd] text-base font-semibold mt-1 mb-2"
                      onClick={() => setShowChecklistDialog(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              {showChecklistSnackbar && (
                <div className="absolute bottom-full mb-4 left-0 w-full px-4">
                  <div className="bg-green-700 text-white font-semibold rounded-xl flex items-center px-4 py-2 shadow-md text-sm w-full">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="mr-2 flex-shrink-0">
                      <circle cx="9" cy="9" r="9" fill="#198754" />
                      <path d="M5 9.5L8 12.5L13 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="truncate">{checklistSnackbarMsg}</span>
                  </div>
                </div>
              )}
              <button
                className="w-full bg-[#4f5fff] text-white rounded-full py-3 text-base font-semibold"
                onClick={() => setShowChecklistDialog(true)}
              >
                Start Checklist
              </button>
              {showChecklistModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg flex flex-col h-[90vh] relative animate-slide-up">
                    {/* Header */}
                    <div className="flex items-center px-4 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                      <button onClick={() => setShowChecklistModal(false)} className="mr-2 text-[#181f60] font-bold text-lg">
                        <ChevronLeft size={24} />
                      </button>
                      <span className="font-semibold text-base text-[#181f60]">Checklist</span>
                      <span className="ml-auto text-sm font-semibold" style={{ color: '#198754' }}>
                        {Math.round((Object.keys(checklistAnswers).length / (checklistDetails?.questionsCount || 1)) * 100)}% Completed
                      </span>
                    </div>

                    {/* Scrollable Questions/Options */}
                    <div className="flex-1 overflow-y-auto px-4 py-2">
                      {checklistDetails?.questions && (
                        <div>
                          <div className="text-xs text-gray-500 font-semibold mb-1 mt-2">
                            Question {currentQuestion + 1}/{checklistDetails.questionsCount}
                          </div>
                          <div className="text-sm font-medium mb-2">{checklistDetails.questions[currentQuestion].question}</div>
                          <div className="flex flex-col gap-2">
                            {checklistDetails.questions[currentQuestion].options.map((opt, oIdx) => (
                              <label
                                key={oIdx}
                                className={`border rounded-xl px-4 py-2 flex items-center text-sm cursor-pointer transition-all ${checklistAnswers[currentQuestion] === opt
                                  ? 'border-[#4f5fff] bg-[#f5f7ff]'
                                  : 'border-gray-200 bg-white'
                                  }`}
                              >
                                <input
                                  type="radio"
                                  name={`question-${currentQuestion}`}
                                  value={opt}
                                  checked={checklistAnswers[currentQuestion] === opt}
                                  onChange={() => setChecklistAnswers(a => ({ ...a, [currentQuestion]: opt }))}
                                  className="mr-2 accent-[#4f5fff]"
                                />
                                {opt}
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 px-4 py-4 border-t border-gray-100 sticky bottom-0 bg-white z-10">
                      <button
                        className="flex-1 bg-gray-100 text-[#181f60] rounded-full py-3 text-base font-semibold"
                        onClick={() => setCurrentQuestion(q => Math.max(0, q - 1))}
                        disabled={currentQuestion === 0}
                      >
                        Previous
                      </button>
                      {currentQuestion < (checklistDetails?.questionsCount || 1) - 1 ? (
                        <button
                          className={`flex-1 rounded-full py-3 text-base font-semibold text-white ${checklistAnswers[currentQuestion] ? 'bg-[#4f5fff]' : 'bg-gray-300 cursor-not-allowed'
                            }`}
                          disabled={!checklistAnswers[currentQuestion]}
                          onClick={() => setCurrentQuestion(q => q + 1)}
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          className={`flex-1 rounded-full py-3 text-base font-semibold text-white ${Object.keys(checklistAnswers).length === checklistDetails?.questionsCount
                            ? 'bg-[#4f5fff]'
                            : 'bg-gray-300 cursor-not-allowed'
                            }`}
                          disabled={Object.keys(checklistAnswers).length !== checklistDetails?.questionsCount}
                          onClick={() => {
                            setShowChecklistModal(false);
                            setChecklistSnackbarMsg('Checklist submitted!');
                            setShowChecklistSnackbar(true);
                            setChecklistAnswers({});
                            setCurrentQuestion(0);
                            setTimeout(() => setShowChecklistSnackbar(false), 1200);
                          }}
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
} 