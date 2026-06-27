"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/components/UserProvider";
import GoalIcon from "@/components/GoalIcon";
import { GOAL_ICONS, TRACKING_UNITS } from "../constants/data";

export default function CreateGoal() {
  const router = useRouter();
  const { userId, isLoading } = useUser();
  const [goalName, setGoalName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(1); // Default dumbbell active
  const [finalGoal, setFinalGoal] = useState("0");
  const [unit, setUnit] = useState("reps");
  const [showDropdown, setShowDropdown] = useState(false);



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
        icon_id: selectedIcon,
        goal: finalGoal,
        unit: unit,
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
    <div className="absolute inset-0 bg-[#131313] z-50 overflow-y-auto px-4 pt-[calc(1.5rem+env(safe-area-inset-top,0px))] pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] flex flex-col justify-between select-none">
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
            <GoalIcon
              type={
                GOAL_ICONS.find((icon) => icon.id === selectedIcon)?.type ||
                "dumbbell"
              }
              className="w-5 h-5 text-[#abd600]"
            />
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
              {GOAL_ICONS.map((icon) => (
                <button
                  key={icon.id}
                  onClick={() => setSelectedIcon(icon.id)}
                  className={`aspect-square w-full bg-[#1c1b1b] rounded-[0.5rem] flex items-center justify-center active:scale-[0.98] transition-all ${
                    selectedIcon === icon.id
                      ? "border-2 border-[#abd600] shadow-sm shadow-[#abd600]/10"
                      : "border border-[#2a2a2a] hover:border-[#8e8d8c]"
                  }`}
                >
                  <GoalIcon type={icon.type} />
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
                  {TRACKING_UNITS.map((unit) => (
                    <div
                      key={unit.value}
                      onClick={() => {
                        setUnit(unit.value);
                        setShowDropdown(false);
                      }}
                      className="px-4 py-3 hover:bg-[#abd600] hover:text-black font-inter text-sm cursor-pointer capitalize text-white transition-colors"
                    >
                      {unit.label}
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
            <span className="text-[12px] font-black leading-none mb-0.5">
              +
            </span>
          </div>
          <span>Create Goal</span>
        </button>
      </div>
    </div>
  );
}
