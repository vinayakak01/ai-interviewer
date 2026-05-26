import React from "react";

function Step2Interview({ interviewData, onFinish }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold mb-4">Interview Session</h1>
        <p className="text-gray-500 mb-6">
          Step 2 will show questions, timer, and answer input.
        </p>
        <button
          onClick={() => onFinish({ finalScore: 8, interviewData })}
          className="bg-black text-white px-6 py-3 rounded-full"
        >
          Finish Demo Interview
        </button>
      </div>
    </div>
  );
}

export default Step2Interview;