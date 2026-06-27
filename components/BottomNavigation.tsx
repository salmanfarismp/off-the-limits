"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="absolute bottom-0 left-0 right-0 w-full bg-[#1c1b1b] border-t border-[#2a2a2a] z-50 select-none">
      <div className="flex justify-around items-center h-16 px-4">
        {/* HOME Button */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center w-24 h-14 active:scale-[0.98] transition-transform outline-none ${
            pathname === "/" ? "text-[#abd600]" : "text-[#8e8d8c]"
          }`}
        >
          <div className="mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.06l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 0 0 1.061 1.06l8.69-8.69Z" />
              <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
            </svg>
          </div>
          <span className="text-[10px] font-bold tracking-wider font-inter uppercase">
            HOME
          </span>
        </Link>

        {/* GRAPH Button */}
        <Link
          href="/graph"
          className={`flex flex-col items-center justify-center w-24 h-14 active:scale-[0.98] transition-transform outline-none ${
            pathname === "/graph" ? "text-[#abd600]" : "text-[#8e8d8c]"
          }`}
        >
          <div className="mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              {/* Line graph with nodes */}
              <path d="M3 18l6-6 4 4 8-8" />
              <circle cx="9" cy="12" r="1.5" fill="currentColor" />
              <circle cx="13" cy="16" r="1.5" fill="currentColor" />
              <circle cx="21" cy="8" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <span className="text-[10px] font-bold tracking-wider font-inter uppercase">
            GRAPH
          </span>
        </Link>
      </div>
    </nav>
  );
}

