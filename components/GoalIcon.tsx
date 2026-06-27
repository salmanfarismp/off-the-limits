import React from "react";

interface GoalIconProps extends React.SVGProps<SVGSVGElement> {
  type: string;
}

export default function GoalIcon({ type, className = "w-5 h-5 text-white", ...props }: GoalIconProps) {
  switch (type) {
    case "dumbbell":
      return (
        <svg
          className={`${className} rotate-45`}
          fill="currentColor"
          viewBox="0 0 24 24"
          {...props}
        >
          <path d="M6 3h2v18H6zm10 0h2v18h-2zM2 8h4v8H2zm16 0h4v8h-4zM6 11h10v2H6z" />
        </svg>
      );
    case "runner":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          {...props}
        >
          <path d="M18 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
          <path d="M14 9.5 12 8.2l-3 3.6H4" />
          <path d="M9 13.5v5l3-3 2.5 1 2-5" />
        </svg>
      );
    case "sprinter":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          {...props}
        >
          <line x1="2" y1="8" x2="6" y2="8" />
          <line x1="2" y1="12" x2="5" y2="12" />
          <line x1="2" y1="16" x2="7" y2="16" />
          <circle cx="17" cy="5" r="1.5" />
          <path d="M15 9.5 13 8l-2 3H8" />
          <path d="M12 11v4.5l2-2.5 2 0.5 1.5-3" />
        </svg>
      );
    case "timer":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          {...props}
        >
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9v4l2.5 1.5" />
          <path d="M10 2h4" />
          <path d="M12 2v3" />
        </svg>
      );
    case "graph":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          {...props}
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case "water":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          {...props}
        >
          <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7Z" />
        </svg>
      );
    default:
      return null;
  }
}
