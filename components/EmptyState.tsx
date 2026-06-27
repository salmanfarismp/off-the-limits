import React from "react";
import Link from "next/link";

export default function EmptyState() {
  return (
    <div
      className="flex flex-col min-h-[calc(100vh-5rem)] justify-between"
      style={{
        backgroundImage:
          "radial-gradient(circle at center, rgba(171, 214, 0, 0.04) 0%, rgba(19, 19, 19, 0) 75%)",
      }}
    >
      {/* Top brand header */}
      <header className="w-full flex justify-between items-center pt-2">
        <span className="text-[20px] font-black italic tracking-wider text-[#abd600] font-montserrat uppercase select-none">
          OFF THE LIMITS
        </span>
      </header>

      {/* Center content stack */}
      <div className="flex-1 flex flex-col justify-center items-center py-6">
        {/* Centered Graphic Illustration */}
        <div className="relative flex justify-center items-center mb-8">
          {/* Radial Glow Element */}
          <div className="absolute w-48 h-48 rounded-full bg-[#abd600] opacity-[0.07] blur-2xl pointer-events-none" />

          {/* Central Circular Badge */}
          <div className="relative w-36 h-36 rounded-full bg-[#1c1b1b] border border-[#2a2a2a] flex justify-center items-center shadow-2xl">
            {/* Custom SVG: checkmark + plus icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#abd600"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-14 h-14"
            >
              <path d="M12 21a9 9 0 1 1 6.36-2.64" />
              <polyline points="7 11.5 10 14.5 16.5 8" />
              <line x1="17.5" y1="18.5" x2="22.5" y2="18.5" />
              <line x1="20" y1="16" x2="20" y2="21" />
            </svg>

            {/* Floating Accent Badge: Top-Right (Upward graph arrow) */}
            <div className="absolute -top-1 -right-1 w-9 h-9 rounded-[0.5rem] bg-[#1c1b1b] border border-[#2a2a2a] flex justify-center items-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#abd600"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            </div>

            {/* Floating Accent Badge: Bottom-Left (Lightning bolt) */}
            <div className="absolute -bottom-1 -left-1 w-9 h-9 rounded-[0.5rem] bg-[#1c1b1b] border border-[#2a2a2a] flex justify-center items-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0266ff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Main copy */}
        <h2 className="text-center font-montserrat font-extrabold text-[32px] leading-tight text-white uppercase tracking-tight">
          START YOUR <br /> JOURNEY
        </h2>

        {/* Subtext */}
        <p className="text-center font-inter text-sm text-[#8e8d8c] mt-4 max-w-[290px] leading-relaxed">
          "We’re not just here to take part. We’re here to take over."
          <br /> — Conor McGregor
        </p>

        {/* Action Link - Navigates to Create Goal Route */}
        <Link
          href="/create-goal"
          className="w-full max-w-[280px] bg-[#abd600] text-black font-montserrat font-bold text-sm py-4 rounded-[0.5rem] mt-8 uppercase tracking-wider active:scale-[0.98] transition-transform duration-100 shadow-md shadow-[#abd600]/10 hover:brightness-105 text-center flex items-center justify-center"
        >
          + ADD NEW GOAL
        </Link>
      </div>
    </div>
  );
}
