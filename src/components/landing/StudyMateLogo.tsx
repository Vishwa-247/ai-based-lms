import { Cpu, Layers, GitBranch } from "lucide-react";

const StudyMateLogo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Hexagonal brain/circuit pattern representing AI + Engineering + Thinking */}
      <path
        d="M16 2L28 9V23L16 30L4 23V9L16 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Inner circuit nodes */}
      <circle cx="16" cy="10" r="2" fill="currentColor" />
      <circle cx="10" cy="16" r="1.5" fill="currentColor" />
      <circle cx="22" cy="16" r="1.5" fill="currentColor" />
      <circle cx="16" cy="22" r="2" fill="currentColor" />
      {/* Connection lines */}
      <path
        d="M16 12V20M12 16H20M13 13L19 19M19 13L13 19"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.6"
      />
      {/* Central processor dot */}
      <circle cx="16" cy="16" r="3" fill="currentColor" />
    </svg>
  );
};

export default StudyMateLogo;
