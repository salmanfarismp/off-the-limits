import React from "react";

interface TimelineBadgeProps {
  badgeType: "better" | "waiting" | "almost" | "done" | "progressing";
  badgeText: string;
}

export default function TimelineBadge({ badgeType, badgeText }: TimelineBadgeProps) {
  const containerClass = `flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-extrabold tracking-wider font-inter uppercase ${
    badgeType === "waiting"
      ? "text-[#8e8d8c] border-[#2a2a2a] bg-transparent"
      : "text-blue-400 border-blue-500/20 bg-blue-500/[0.03]"
  }`;

  return (
    <div className={containerClass}>
      {badgeType === "better" && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-2.5 h-2.5"
          >
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
          </svg>
          <span>{badgeText}</span>
        </>
      )}
      {badgeType === "waiting" && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="w-2.5 h-2.5"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>{badgeText}</span>
        </>
      )}
      {badgeType === "almost" && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="w-2.5 h-2.5"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>{badgeText}</span>
        </>
      )}
      {badgeType === "done" && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="w-2.5 h-2.5"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{badgeText}</span>
        </>
      )}
      {badgeType === "progressing" && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-2.5 h-2.5"
          >
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
          </svg>
          <span>{badgeText}</span>
        </>
      )}
    </div>
  );
}
