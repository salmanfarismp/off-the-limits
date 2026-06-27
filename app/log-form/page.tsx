"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function LogFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id") || "";
  const title = searchParams.get("title") || "Pushups";
  const initialReps = Number(searchParams.get("reps")) || 25;
  const type = searchParams.get("type") || "pushups";

  const [repsCount, setRepsCount] = useState(25);

  useEffect(() => {
    if (initialReps) {
      setRepsCount(initialReps);
    }
  }, [initialReps]);

  const handleDecrement = () => {
    setRepsCount((prev) => Math.max(0, prev - 1));
  };

  const handleIncrement = () => {
    setRepsCount((prev) => prev + 1);
  };

  const handleSave = () => {
    if (!id) {
      router.push("/");
      return;
    }

    const saved = localStorage.getItem("off-the-limits-logs");
    let customLogs = [];
    if (saved) {
      try {
        customLogs = JSON.parse(saved);
      } catch (e) {}
    }

    // Determine badge and accent state based on default items
    let badgeText = "NEW RECORD";
    let badgeType: "better" | "waiting" | "almost" | "done" = "better";

    if (id === "1") {
      badgeText = "BETTER THAN YESTERDAY";
      badgeType = "better";
    } else if (id === "2") {
      badgeText = "WAITING";
      badgeType = "waiting";
    } else if (id === "3") {
      badgeText = "ALMOST THERE";
      badgeType = "almost";
    } else if (id === "4") {
      badgeText = "YOU DID IT";
      badgeType = "done";
    }

    const updatedLog = {
      id,
      type,
      title,
      timestamp: "Logged just now",
      reps: repsCount,
      badgeText,
      badgeType,
    };

    const hasLog = customLogs.some((c: any) => c.id === id);
    let updatedList = [];
    if (hasLog) {
      updatedList = customLogs.map((c: any) => (c.id === id ? updatedLog : c));
    } else {
      updatedList = [updatedLog, ...customLogs];
    }

    localStorage.setItem("off-the-limits-logs", JSON.stringify(updatedList));
    router.push("/");
  };

  const getHistoryText = (logType: string) => {
    switch (logType) {
      case "pushups":
        return "Yesterday: 22 reps";
      case "pullups":
        return "Yesterday: 8 reps";
      case "squats":
        return "Yesterday: 40 reps";
      default:
        return "Yesterday: 15 reps";
    }
  };

  return (
    <div className="absolute inset-0 bg-[#131313] z-50 overflow-y-auto px-4 py-6 flex flex-col justify-between select-none">
      {/* Top Section */}
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

        {/* Context Headers */}
        <div className="mt-8 flex flex-col items-start w-full">
          <span className="text-[10px] font-extrabold tracking-widest text-[#abd600] font-inter uppercase">
            PERFORMANCE INPUT
          </span>
          <h2 className="font-montserrat font-extrabold text-[28px] leading-tight text-white uppercase tracking-tight mt-1">
            {title} Log
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-[#8e8d8c] mt-2 select-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-3.5 h-3.5 shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 15 15" />
            </svg>
            <span>{getHistoryText(type)}</span>
          </div>
        </div>

        {/* Repetitions Stepper Card */}
        <div className="bg-[#1c1b1b] border border-[#2a2a2a] border-l-4 border-l-[#abd600] rounded-[0.5rem] p-6 mt-8 shadow-2xl flex flex-col justify-between">
          <span className="text-[10px] font-extrabold tracking-widest text-[#8e8d8c] font-inter uppercase">
            REPETITIONS COUNT
          </span>

          <div className="flex justify-between items-center mt-6 px-4">
            {/* Decrement Button */}
            <button
              onClick={handleDecrement}
              className="w-11 h-11 rounded-full border border-[#2a2a2a] bg-transparent flex items-center justify-center text-white text-xl active:scale-[0.98] transition-transform select-none hover:border-[#8e8d8c]"
            >
              &minus;
            </button>

            {/* Numeric display */}
            <span className="text-[44px] font-black text-[#abd600] font-montserrat tracking-tight leading-none">
              {repsCount}
            </span>

            {/* Increment Button */}
            <button
              onClick={handleIncrement}
              className="w-11 h-11 rounded-full border border-[#2a2a2a] bg-transparent flex items-center justify-center text-white text-xl active:scale-[0.98] transition-transform select-none hover:border-[#8e8d8c]"
            >
              &#43;
            </button>
          </div>
        </div>
      </div>

      {/* Action Button Stack */}
      <div className="mt-8 flex flex-col gap-3">
        {/* Save Progress Button */}
        <button
          onClick={handleSave}
          className="w-full bg-[#abd600] text-black font-montserrat font-extrabold text-[12px] py-4 rounded-[0.5rem] flex items-center justify-center gap-1.5 uppercase tracking-wider active:scale-[0.98] transition-transform duration-100 shadow-md shadow-[#abd600]/10 hover:brightness-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 shrink-0"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <span>Save Progress</span>
        </button>

        {/* Cancel Button */}
        <Link
          href="/"
          className="w-full bg-transparent border border-[#2a2a2a] text-white hover:border-[#8e8d8c] hover:bg-[#1a1a1a]/20 text-[12px] font-extrabold tracking-widest py-4 rounded-[0.5rem] uppercase text-center font-inter active:scale-[0.98] transition-all duration-100 flex items-center justify-center"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}

export default function LogFormPage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">Loading Performance Log...</div>}>
      <LogFormContent />
    </Suspense>
  );
}
