"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/components/UserProvider";

export default function CreateGoal() {
  const router = useRouter();
  const { userId, isLoading } = useUser();
  const [goalName, setGoalName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(1); // Default dumbbell active
  const [finalGoal, setFinalGoal] = useState("0");
  const [unit, setUnit] = useState("reps");
  const [showDropdown, setShowDropdown] = useState(false);

  const icons = [
    { id: 1, type: "dumbbell" },
    { id: 2, type: "runner" },
    { id: 3, type: "sprinter" },
    { id: 4, type: "timer" },
    { id: 5, type: "graph" },
    { id: 6, type: "water" },
  ];

  const handleGoalValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setFinalGoal("0");
    } else {
      const parsed = parseInt(value, 10);
      if (isNaN(parsed)) return;
      setFinalGoal(parsed.toString());
    }
  };

  const handleCreateGoal = async () => {
    if (!userId) {
      console.error("No user ID found to create goal");
      return;
    }

    const supabase = createClient();

    // 1. Insert into Goal table
    const { data: goalData, error: goalError } = await supabase
      .from("Goal")
      .insert({
        name: goalName || "Unnamed Goal",
        user: userId,
      })
      .select()
      .single();

    if (goalError) {
      console.error("Error creating goal in Supabase:", goalError);
      return;
    }

    // Redirect to Home timeline
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="absolute inset-0 bg-[#131313] z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#abd600]"></div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-[#131313] z-50 overflow-y-auto px-4 py-6 flex flex-col justify-between select-none">
      {/* Scrollable Container Wrapper */}
      <div className="flex-1 flex flex-col">
        {/* Top Header Bar */}
        <header className="w-full flex items-center pt-2">
          <Link
            href="/"
            className="active:scale-[0.98] transition-transform text-white mr-4 p-1 rounded-full hover:bg-white/5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="w-5 h-5 text-white"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </Link>
          <span className="font-montserrat font-extrabold text-[15px] uppercase tracking-wider text-white select-none">
            OFF THE LIMITS
          </span>
        </header>

        {/* Milestone Preview Card */}
        <div className="glassmorphic border border-[#2a2a2a] rounded-[0.5rem] p-6 flex flex-col items-center justify-center mt-6 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-[#abd600]/10 flex items-center justify-center mb-3 border border-[#abd600]/20">
            <svg
              className="w-5 h-5 text-[#abd600] rotate-45"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 3h2v18H6zm10 0h2v18h-2zM2 8h4v8H2zm16 0h4v8h-4zM6 11h10v2H6z" />
            </svg>
          </div>
          <span className="text-[10px] font-extrabold tracking-[0.25em] text-white font-inter uppercase">
            NEW MILESTONE
          </span>
        </div>

        {/* Vertical Form Stack */}
        <div className="mt-8 flex flex-col gap-6">
          {/* Goal Name Input */}
          <div className="flex flex-col">
            <label className="text-[10px] font-extrabold tracking-widest text-[#abd600] font-inter uppercase mb-2">
              GOAL NAME
            </label>
            <input
              type="text"
              placeholder="e.g., Bench Press Max"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              className="w-full bg-[#1c1b1b] border border-[#2a2a2a] rounded-[0.5rem] p-4 text-white placeholder-[#8e8d8c]/60 font-inter text-sm outline-none focus:border-[#abd600] transition-colors"
            />
          </div>

          {/* Identifier Icon Selector */}
          <div className="flex flex-col">
            <label className="text-[10px] font-extrabold tracking-widest text-[#abd600] font-inter uppercase mb-3">
              IDENTIFIER ICON
            </label>
            <div className="grid grid-cols-6 gap-2">
              {icons.map((icon) => (
                <button
                  key={icon.id}
                  onClick={() => setSelectedIcon(icon.id)}
                  className={`aspect-square w-full bg-[#1c1b1b] rounded-[0.5rem] flex items-center justify-center active:scale-[0.98] transition-all ${
                    selectedIcon === icon.id
                      ? "border-2 border-[#abd600] shadow-sm shadow-[#abd600]/10"
                      : "border border-[#2a2a2a] hover:border-[#8e8d8c]"
                  }`}
                >
                  {icon.type === "dumbbell" && (
                    <svg
                      className="w-5 h-5 text-white rotate-45"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 3h2v18H6zm10 0h2v18h-2zM2 8h4v8H2zm16 0h4v8h-4zM6 11h10v2H6z" />
                    </svg>
                  )}
                  {icon.type === "runner" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 text-white"
                    >
                      <path d="M18 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                      <path d="M14 9.5 12 8.2l-3 3.6H4" />
                      <path d="M9 13.5v5l3-3 2.5 1 2-5" />
                    </svg>
                  )}
                  {icon.type === "sprinter" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 text-white"
                    >
                      <line x1="2" y1="8" x2="6" y2="8" />
                      <line x1="2" y1="12" x2="5" y2="12" />
                      <line x1="2" y1="16" x2="7" y2="16" />
                      <circle cx="17" cy="5" r="1.5" />
                      <path d="M15 9.5 13 8l-2 3H8" />
                      <path d="M12 11v4.5l2-2.5 2 0.5 1.5-3" />
                    </svg>
                  )}
                  {icon.type === "timer" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 text-white"
                    >
                      <circle cx="12" cy="13" r="8" />
                      <path d="M12 9v4l2.5 1.5" />
                      <path d="M10 2h4" />
                      <path d="M12 2v3" />
                    </svg>
                  )}
                  {icon.type === "graph" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 text-white"
                    >
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                  )}
                  {icon.type === "water" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 text-white"
                    >
                      <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7Z" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Split Target Metric Fields */}
          <div className="grid grid-cols-2 gap-4">
            {/* Final Goal Input */}
            <div className="flex flex-col">
              <label className="text-[10px] font-extrabold tracking-widest text-[#abd600] font-inter uppercase mb-2">
                FINAL GOAL
              </label>
              <input
                type="number"
                value={finalGoal}
                onChange={handleGoalValueChange}
                className="w-full bg-[#1c1b1b] border border-[#2a2a2a] rounded-[0.5rem] p-4 text-center font-montserrat font-extrabold text-[28px] text-white outline-none focus:border-[#abd600] transition-colors"
              />
            </div>

            {/* Unit Dropdown */}
            <div className="flex flex-col relative">
              <label className="text-[10px] font-extrabold tracking-widest text-[#abd600] font-inter uppercase mb-2">
                UNIT
              </label>
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full bg-[#1c1b1b] border border-[#2a2a2a] rounded-[0.5rem] p-4 flex justify-between items-center text-white text-sm font-inter cursor-pointer active:scale-[0.98] transition-transform select-none"
              >
                <span className="capitalize">{unit}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8e8d8c"
                  strokeWidth="2.5"
                  className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {/* Dropdown Menu Option List */}
              {showDropdown && (
                <div className="absolute top-[72px] left-0 right-0 bg-[#1c1b1b] border border-[#2a2a2a] rounded-[0.5rem] overflow-hidden z-20 shadow-2xl">
                  {["reps", "sets", "mins", "kgs"].map((item) => (
                    <div
                      key={item}
                      onClick={() => {
                        setUnit(item);
                        setShowDropdown(false);
                      }}
                      className="px-4 py-3 hover:bg-[#abd600] hover:text-black font-inter text-sm cursor-pointer capitalize text-white transition-colors"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Action Button */}
        <button
          onClick={handleCreateGoal}
          className="w-full bg-[#abd600] text-black font-montserrat font-black text-[13px] py-4 rounded-[0.5rem] flex items-center justify-center gap-2 uppercase tracking-wider active:scale-[0.98] transition-transform duration-100 shadow-md shadow-[#abd600]/10 mt-8"
        >
          <div className="w-4 h-4 rounded-full border-2 border-black flex items-center justify-center">
            <span className="text-[12px] font-black leading-none mb-0.5">+</span>
          </div>
          <span>Create Goal</span>
        </button>
      </div>

      {/* Bottom Tagline */}
      <footer className="w-full text-center mt-8">
        <span className="text-[9px] font-bold tracking-widest text-[#8e8d8c] font-inter">
          PRECISION ENGINEERED FOR PERFORMANCE
        </span>
      </footer>
    </div>
  );
}
