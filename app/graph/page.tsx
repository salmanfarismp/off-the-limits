"use client";

import React from "react";

export default function PerformanceAnalytics() {
  return (
    <div
      className="flex flex-col min-h-[calc(100vh-5rem)] justify-between relative pb-14 select-none"
      style={{
        backgroundImage: "radial-gradient(circle at top right, rgba(171, 214, 0, 0.03) 0%, rgba(19, 19, 19, 0) 65%)",
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
        <span className="text-[10px] font-extrabold tracking-widest text-[#abd600] font-inter uppercase">
          PERFORMANCE ANALYTICS
        </span>
        <h2 className="font-montserrat font-extrabold text-[28px] leading-tight text-white uppercase tracking-tight mt-1">
          Progress Metrics
        </h2>
      </div>

      {/* Stacked Analytics Cards */}
      <div className="flex flex-col gap-6 mt-6 flex-1">
        {/* Card 1: Pushups */}
        <div className="bg-[#1c1b1b] border border-[#2a2a2a] rounded-[0.5rem] p-5 shadow-2xl active:scale-[0.98] transition-transform duration-100 cursor-default">
          {/* Header Row */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[15px] font-bold text-white font-inter">
                Pushups
              </span>
              <span className="text-[11px] text-[#8e8d8c] font-inter mt-0.5">
                Daily Repetitions Peak
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="text-[28px] font-black text-[#abd600] font-montserrat tracking-tight leading-none">
                85
              </span>
              <span className="text-[9px] font-extrabold text-[#8e8d8c] font-inter uppercase tracking-widest ml-1.5 self-end mb-1">
                CURRENT
              </span>
            </div>
          </div>

          {/* SVG Line Chart for Pushups */}
          <div className="relative mt-6 h-36 flex">
            {/* Y-axis Labels on Left */}
            <div className="flex flex-col justify-between text-[9px] font-bold text-[#8e8d8c] font-montserrat h-[100px] w-6 shrink-0 pt-[20px] pb-1">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            {/* Chart Area */}
            <div className="flex-1 relative h-[120px]">
              {/* GOAL Label Text overlay */}
              <span className="absolute left-2.5 top-[13px] text-[8px] font-bold text-[#8e8d8c] uppercase tracking-widest bg-[#1c1b1b] px-1 select-none z-10">
                GOAL: 100
              </span>

              <svg viewBox="0 0 340 120" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="pushups-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#abd600" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#abd600" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Dashed Goal Line at y=20 (value=100) */}
                <line
                  x1="0"
                  y1="20"
                  x2="340"
                  y2="20"
                  stroke="#8e8d8c"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.4"
                />

                {/* Area Gradient Fill */}
                <path
                  d="M 10 95 C 40 95, 60 92, 80 92 C 110 92, 120 70, 140 70 C 160 70, 180 92, 200 92 C 230 92, 240 40, 260 40 C 280 40, 300 55, 330 55 L 330 120 L 10 120 Z"
                  fill="url(#pushups-grad)"
                />

                {/* Line Path stroke */}
                <path
                  d="M 10 95 C 40 95, 60 92, 80 92 C 110 92, 120 70, 140 70 C 160 70, 180 92, 200 92 C 230 92, 240 40, 260 40 C 280 40, 300 55, 330 55"
                  fill="none"
                  stroke="#abd600"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Vertex indicator nodes */}
                <circle cx="10" cy="95" r="2.5" fill="#1c1b1b" stroke="#abd600" strokeWidth="1.5" />
                <circle cx="80" cy="92" r="2.5" fill="#1c1b1b" stroke="#abd600" strokeWidth="1.5" />
                <circle cx="140" cy="70" r="2.5" fill="#1c1b1b" stroke="#abd600" strokeWidth="1.5" />
                <circle cx="200" cy="92" r="2.5" fill="#1c1b1b" stroke="#abd600" strokeWidth="1.5" />
                <circle cx="260" cy="40" r="2.5" fill="#1c1b1b" stroke="#abd600" strokeWidth="1.5" />
                <circle cx="330" cy="55" r="2.5" fill="#1c1b1b" stroke="#abd600" strokeWidth="1.5" />
              </svg>

              {/* X-axis Labels */}
              <div className="flex justify-between items-center text-[9px] font-bold text-[#8e8d8c] font-montserrat uppercase tracking-widest mt-2 px-1">
                <span>FIRST DAY</span>
                <span>TODAY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Pullups */}
        <div className="bg-[#1c1b1b] border border-[#2a2a2a] rounded-[0.5rem] p-5 shadow-2xl active:scale-[0.98] transition-transform duration-100 cursor-default">
          {/* Header Row */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[15px] font-bold text-white font-inter">
                Pullups
              </span>
              <span className="text-[11px] text-[#8e8d8c] font-inter mt-0.5">
                Strict Form Sets
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="text-[28px] font-black text-[#0266ff] font-montserrat tracking-tight leading-none">
                22
              </span>
              <span className="text-[9px] font-extrabold text-[#8e8d8c] font-inter uppercase tracking-widest ml-1.5 self-end mb-1">
                CURRENT
              </span>
            </div>
          </div>

          {/* SVG Line Chart for Pullups */}
          <div className="relative mt-6 h-36 flex">
            {/* Y-axis Labels on Left */}
            <div className="flex flex-col justify-between text-[9px] font-bold text-[#8e8d8c] font-montserrat h-[100px] w-6 shrink-0 pt-[20px] pb-1">
              <span>25</span>
              <span>20</span>
              <span>15</span>
              <span>10</span>
              <span>5</span>
              <span>0</span>
            </div>

            {/* Chart Area */}
            <div className="flex-1 relative h-[120px]">
              {/* GOAL Label Text overlay */}
              <span className="absolute left-2.5 top-[13px] text-[8px] font-bold text-[#8e8d8c] uppercase tracking-widest bg-[#1c1b1b] px-1 select-none z-10">
                GOAL: 25
              </span>

              <svg viewBox="0 0 340 120" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="pullups-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#abd600" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#abd600" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Dashed Goal Line at y=20 (value=25) */}
                <line
                  x1="0"
                  y1="20"
                  x2="340"
                  y2="20"
                  stroke="#8e8d8c"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.4"
                />

                {/* Area Gradient Fill */}
                <path
                  d="M 10 96 C 40 96, 60 95, 80 95 C 110 95, 120 80, 140 80 C 160 80, 180 76, 200 76 C 230 76, 240 48, 260 48 C 280 48, 300 56, 330 56 L 330 120 L 10 120 Z"
                  fill="url(#pullups-grad)"
                />

                {/* Line Path stroke */}
                <path
                  d="M 10 96 C 40 96, 60 95, 80 95 C 110 95, 120 80, 140 80 C 160 80, 180 76, 200 76 C 230 76, 240 48, 260 48 C 280 48, 300 56, 330 56"
                  fill="none"
                  stroke="#abd600"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Vertex indicator nodes */}
                <circle cx="10" cy="96" r="2.5" fill="#1c1b1b" stroke="#abd600" strokeWidth="1.5" />
                <circle cx="80" cy="95" r="2.5" fill="#1c1b1b" stroke="#abd600" strokeWidth="1.5" />
                <circle cx="140" cy="80" r="2.5" fill="#1c1b1b" stroke="#abd600" strokeWidth="1.5" />
                <circle cx="200" cy="76" r="2.5" fill="#1c1b1b" stroke="#abd600" strokeWidth="1.5" />
                <circle cx="260" cy="48" r="2.5" fill="#1c1b1b" stroke="#abd600" strokeWidth="1.5" />
                <circle cx="330" cy="56" r="2.5" fill="#1c1b1b" stroke="#abd600" strokeWidth="1.5" />
              </svg>

              {/* X-axis Labels */}
              <div className="flex justify-between items-center text-[9px] font-bold text-[#8e8d8c] font-montserrat uppercase tracking-widest mt-2 px-1">
                <span>FIRST DAY</span>
                <span>TODAY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
