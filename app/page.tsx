"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/components/UserProvider";
import TimelineBadge from "@/components/TimelineBadge";
import { GOAL_ICONS, STATUS_BADGES } from "./constants/data";
import GoalIcon from "@/components/GoalIcon";
import EmptyState from "@/components/EmptyState";

interface LogItem {
  goal_id: string;
  log_id: string | null;
  exercise: string;
  count: number;
  unit: string | null;
  icon_id: number | null;
  logged_at: string | null;
  status: number | null;
}

interface DayGroup {
  date: string;
  rawDate: string;
  entries: LogItem[];
}

const formatTimelineDate = (dateStr: string) => {
  const parts = dateStr.split("T")[0].split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // 0-indexed
  const day = parseInt(parts[2], 10);
  const dateObj = new Date(year, month, day);

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const formattedMonthDay = `${months[month]} ${day}`;

  if (isSameDay(dateObj, today)) {
    return `TODAY, ${formattedMonthDay}`;
  } else if (isSameDay(dateObj, yesterday)) {
    return `YESTERDAY, ${formattedMonthDay}`;
  } else {
    return `${formattedMonthDay}, ${year}`;
  }
};

const formatLoggedAt = (loggedAt: string | null) => {
  if (!loggedAt) return "No log today";
  const date = new Date(loggedAt);
  return `Logged at ${date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}`;
};

export default function Home() {
  const { userId, isLoading: isUserLoading } = useUser();
  const [dayGroups, setDayGroups] = useState<DayGroup[]>([]);
  const [limitDays, setLimitDays] = useState(2);
  const [isLoadingTimeline, setIsLoadingTimeline] = useState(true);

  useEffect(() => {
    if (isUserLoading || !userId) return;

    async function fetchTimeline() {
      setIsLoadingTimeline(true);
      try {
        const supabase = createClient();
        const { data, error } = await supabase.rpc(
          "get_user_daily_timeline_paginated",
          {
            target_user_id: userId,
            limit_days: limitDays,
            offset_days: 0,
          },
        );

        if (error) {
          console.error("Error fetching timeline:", error);
          return;
        }

        if (data) {
          const formattedGroups: DayGroup[] = data.map((item: any) => ({
            date: formatTimelineDate(item.date),
            rawDate: item.date,
            entries: item.logs || [],
          }));
          setDayGroups(formattedGroups);
        }
      } catch (err) {
        console.error("Failed to load daily timeline:", err);
      } finally {
        setIsLoadingTimeline(false);
      }
    }

    fetchTimeline();
  }, [userId, isUserLoading, limitDays]);

  const loadPreviousDays = () => {
    setLimitDays((prev) => prev + 2);
  };

  const hasData = dayGroups.length > 0;

  if (isUserLoading || isLoadingTimeline) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-5rem)] justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#abd600]"></div>
        <p className="text-sm text-[#8e8d8c] mt-4 font-inter">
          Loading Performance Archive...
        </p>
      </div>
    );
  }

  // Render Empty State if no logs exist
  if (!hasData) {
    return <EmptyState />;
  }

  // Render Populated Daily Log View
  return (
    <div
      className="flex flex-col min-h-[calc(100vh-5rem)] justify-between relative pb-14"
      style={{
        backgroundImage:
          "radial-gradient(circle at top right, rgba(171, 214, 0, 0.03) 0%, rgba(19, 19, 19, 0) 65%)",
      }}
    >
      {/* Top brand header */}
      <header className="w-full flex justify-between items-center pt-2">
        <span className="text-[20px] font-black italic tracking-wider text-[#abd600] font-montserrat uppercase select-none">
          OFF THE LIMITS
        </span>
      </header>

      {/* Header section info */}
      <div className="mt-6 flex flex-col items-start w-full">
        <h2 className="font-montserrat font-extrabold text-[28px] leading-tight text-white uppercase tracking-tight">
          Daily Log
        </h2>
        <p className="font-inter text-sm text-[#8e8d8c] mt-1 select-none">
          Your chronological performance archive.
        </p>
      </div>

      {/* Timeline view block */}
      <div className="relative pl-8 mt-6 flex-1">
        {/* Single continuous vertical timeline connector line */}
        <div className="absolute left-[13px] top-[26px] bottom-16 w-[2px] bg-[#abd600]/20 z-0" />

        {/* Day Group Loop */}
        {dayGroups.map((group, groupIdx) => (
          <div key={group.date} className={groupIdx > 0 ? "mt-10" : ""}>
            {/* Timeline Header Circle & Date */}
            <div className="flex items-center gap-3 relative z-10 select-none">
              <div className="w-7 h-7 rounded-full bg-[#abd600] flex items-center justify-center text-[#131313] shadow-lg shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="w-3.5 h-3.5"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <span className="text-[12px] font-extrabold tracking-widest text-[#abd600] font-inter uppercase">
                {group.date}
              </span>
            </div>

            {/* Daily Log Cards List */}
            <div className="mt-5 flex flex-col gap-4 relative z-10">
              {group.entries.map((log) => {
                const isWaiting = log.status === null || log.status === 0;
                const currentBadge = STATUS_BADGES[log.status || 0];
                const { text: badgeText, type: badgeType } = currentBadge;

                return (
                  <Link
                    key={log.log_id || log.goal_id}
                    href={`/log-form?goal_id=${log.goal_id}&log_id=${log.log_id || ""}&title=${encodeURIComponent(
                      log.exercise,
                    )}&reps=${log.count}&unit=${log.unit || "reps"}&date=${group.rawDate}`}
                    className={`group relative bg-[#1c1b1b] border border-[#2a2a2a] border-l-4 rounded-[0.5rem] p-4 flex flex-col active:scale-[0.98] transition-transform duration-100 cursor-pointer select-none animate-fade-in ${
                      isWaiting ? "border-l-[#2a2a2a]" : "border-l-[#0266ff]"
                    }`}
                  >
                    {/* Card Top Row */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        {/* Circular icon wrapper */}
                        <div className="w-9 h-9 rounded-full bg-[#131313] flex items-center justify-center shrink-0 border border-[#2a2a2a]">
                          <GoalIcon
                            type={
                              GOAL_ICONS.find((icon) => icon.id === log.icon_id)
                                ?.type || "dumbbell"
                            }
                            className="w-5 h-5 text-[#abd600]"
                          />
                        </div>

                        {/* Title & Notes */}
                        <div className="flex flex-col">
                          <span className="text-[15px] font-bold text-white font-inter">
                            {log.exercise}
                          </span>
                          <span className="text-[11px] text-[#8e8d8c] font-inter mt-0.5">
                            {formatLoggedAt(log.logged_at)}
                          </span>
                        </div>
                      </div>

                      {/* Badge Pill */}
                      <TimelineBadge
                        badgeType={badgeType}
                        badgeText={badgeText}
                      />
                    </div>

                    {/* Card Bottom Row: Large Numeric Metric */}
                    <div className="mt-4 flex items-baseline select-none">
                      <span className="text-[28px] font-black text-white font-montserrat tracking-tight leading-none">
                        {log.count}
                      </span>
                      <span className="text-[10px] font-bold text-[#8e8d8c] font-inter uppercase tracking-widest ml-1.5">
                        {(log.unit || "reps").toUpperCase()}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Load Previous Days Boundary outline button */}
        <button
          onClick={loadPreviousDays}
          className="w-full bg-transparent border border-[#2a2a2a] text-white hover:border-[#8e8d8c] hover:bg-[#1a1a1a]/20 text-[11px] font-bold tracking-widest py-3.5 rounded-[0.5rem] mt-6 uppercase font-inter active:scale-[0.98] transition-all duration-100"
        >
          LOAD PREVIOUS DAYS
        </button>
      </div>

      {/* Floating Action Link (FAB) layer - constrained within mobile layout */}
      <div className="absolute bottom-4 right-0 z-40">
        <Link
          href="/create-goal"
          className="bg-[#abd600] text-black font-montserrat font-extrabold text-[12px] px-5 py-3.5 rounded-full uppercase tracking-wider active:scale-[0.98] transition-transform duration-100 shadow-xl shadow-[#abd600]/20 flex items-center gap-1.5 hover:brightness-105 text-center flex items-center justify-center"
        >
          + ADD NEW GOAL
        </Link>
      </div>
    </div>
  );
}
