import React from "react";

function Step3Report({ report }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold mb-4">Interview Report</h1>
        <p className="text-gray-500 mb-6">
          Step 3 will show score, feedback, and question-wise report.
        </p>
        <pre className="bg-gray-100 text-left text-xs p-4 rounded-xl overflow-auto">
          {JSON.stringify(report, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default Step3Report;