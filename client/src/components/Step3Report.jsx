import React from "react";
import { motion } from "motion/react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Step3Report({ report }) {
  const navigate = useNavigate();

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading Report...</p>
      </div>
    );
  }

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "Significant improvement required.";
  let shortTagline = "Work on clarity, structure, and confidence.";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
  }

  const percentage = Math.max(0, Math.min(100, (finalScore / 10) * 100));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 px-4 sm:px-6 lg:px-10 py-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="w-full flex items-start gap-4 flex-wrap">
          <button
            onClick={() => navigate("/history")}
            className="mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Interview Analytics Dashboard
            </h1>
            <p className="text-gray-500 mt-2">
              AI-powered performance insights
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl shadow-lg p-8 text-center"
          >
            <h3 className="text-gray-500 mb-6">Overall Performance</h3>

            <div
              className="w-28 h-28 rounded-full mx-auto flex items-center justify-center"
              style={{
                background: `conic-gradient(#10b981 ${percentage}%, #e5e7eb ${percentage}%)`,
              }}
            >
              <div className="w-22 h-22 rounded-full bg-white flex items-center justify-center">
                <span className="text-2xl font-bold text-red-500">
                  {Number(finalScore).toFixed(1)}/10
                </span>
              </div>
            </div>

            <div className="mt-5">
              <p className="font-semibold text-gray-800">{performanceText}</p>
              <p className="text-gray-500 text-sm mt-1">{shortTagline}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl shadow-lg p-8"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-6">
              Skill Evaluation
            </h3>

            <div className="space-y-5">
              {skills.map((skill) => (
                <div key={skill.label}>
                  <div className="flex justify-between mb-2">
                    <span>{skill.label}</span>
                    <span className="font-semibold text-green-600">
                      {skill.value}
                    </span>
                  </div>

                  <div className="bg-gray-200 h-3 rounded-full">
                    <div
                      className="bg-green-500 h-full rounded-full"
                      style={{ width: `${Math.min(skill.value * 10, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl shadow-lg p-8"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-6">
              Question Scores
            </h3>

            <div className="space-y-4">
              {questionWiseScore.map((question, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">
                      Question {index + 1}
                    </span>
                    <span className="font-semibold text-emerald-600">
                      {question.score || 0}/10
                    </span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{
                        width: `${Math.min((question.score || 0) * 10, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl shadow-lg p-8"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-6">
              Question Breakdown
            </h3>

            <div className="space-y-6">
              {questionWiseScore.map((question, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-5 rounded-2xl border border-gray-200"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                    <div>
                      <p className="text-xs text-gray-400">
                        Question {index + 1}
                      </p>
                      <p className="font-semibold text-gray-800 leading-relaxed">
                        {question.question || "Question not available"}
                      </p>
                    </div>

                    <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full font-bold text-sm w-fit">
                      {question.score || 0}/10
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <p className="text-xs text-green-600 font-semibold mb-1">
                      AI Feedback
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {question.feedback && question.feedback.trim() !== ""
                        ? question.feedback
                        : "No feedback available for this question."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Step3Report;
