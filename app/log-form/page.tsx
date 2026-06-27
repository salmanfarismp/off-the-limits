"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/components/UserProvider";

const getDayBefore = (dateStr: string) => {
  const parts = dateStr.split("T")[0].split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // 0-indexed
  const day = parseInt(parts[2], 10);

  const d = new Date(year, month, day);
  d.setDate(d.getDate() - 1);

  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
};

function LogFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userId, isLoading: isUserLoading } = useUser();

  const goalId = searchParams.get("goal_id") || "";
  const logId = searchParams.get("log_id") || "";
  const title = searchParams.get("title") || "Pushups";
  const initialReps = Number(searchParams.get("reps")) || 25;
  const unit = searchParams.get("unit") || "reps";
  const date = searchParams.get("date") || "";

  const [repsCount, setRepsCount] = useState(25);
  const [yesterdayReps, setYesterdayReps] = useState<number | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  useEffect(() => {
    if (initialReps) {
      setRepsCount(initialReps);
    }
  }, [initialReps]);

  useEffect(() => {
    if (!goalId || !date) {
      setIsLoadingHistory(false);
      return;
    }

    async function fetchYesterdayPerformance() {
      try {
        const dayBeforeStr = getDayBefore(date);
        const supabase = createClient();
        const { data, error } = await supabase
          .from("Log")
          .select("count")
          .eq("goal_id", goalId)
          .gte("created_at", `${dayBeforeStr}T00:00:00Z`)
          .lte("created_at", `${dayBeforeStr}T23:59:59Z`)
          .maybeSingle();

        if (error) {
          console.error("Error fetching yesterday performance:", error);
        } else if (data) {
          setYesterdayReps(data.count);
        }
      } catch (err) {
        console.error("Failed to load history:", err);
      } finally {
        setIsLoadingHistory(false);
      }
    }

    fetchYesterdayPerformance();
  }, [goalId, date]);

  const handleDecrement = () => {
    setRepsCount((prev) => Math.max(0, prev - 1));
  };

  const handleIncrement = () => {
    setRepsCount((prev) => prev + 1);
  };

  const handleSave = async () => {
    if (!goalId || !userId) {
      router.push("/");
      return;
    }

    const supabase = createClient();
    const { error: rpcError } = await supabase.rpc("create_daily_workout_log", {
      target_user_id: userId,
      target_goal_id: parseInt(goalId, 10),
      input_count: repsCount,
      input_date: date || new Date().toISOString(),
      target_log_id: logId ? parseInt(logId, 10) : null,
    });

    if (rpcError) {
      console.error("Error logging workout via RPC:", rpcError);
    }

    router.push("/");
  };

  const getHistoryText = () => {
    if (isLoadingHistory) return "Loading performance history...";
    if (yesterdayReps === null) return "Yesterday: No log";
    return `Yesterday: ${yesterdayReps} ${unit}`;
  };

  if (isUserLoading) {
    return (
      <div className="absolute inset-0 bg-[#131313] z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#abd600]"></div>
      </div>
    );
  }

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
            <span>{getHistoryText()}</span>
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
