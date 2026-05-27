import React from "react";

function Timer({ timeLeft, totalTime }) {
  const safeTotal = totalTime || 60;
  const percentage = Math.max(0, Math.min(100, (timeLeft / safeTotal) * 100));

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center"
        style={{
          background: `conic-gradient(#10b981 ${percentage}%, #e5e7eb ${percentage}%)`,
        }}
      >
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
          <span className="text-xl font-bold text-red-500">{timeLeft}s</span>
        </div>
      </div>

      <p className="text-xs text-gray-500">Time left</p>
    </div>
  );
}

export default Timer;
