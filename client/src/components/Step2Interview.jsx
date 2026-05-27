import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import axios from "axios";
import { BsArrowRight } from "react-icons/bs";
import { ServerUrl } from "../App";
import Timer from "./Timer";

function Step2Interview({ interviewData, onFinish }) {
  const { interviewId, questions = [] } = interviewData || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (!currentQuestion) return;

    setTimeLeft(currentQuestion.timeLimit || 60);
    setAnswer("");
    setFeedback("");
  }, [currentIndex, currentQuestion]);

  useEffect(() => {
    if (!currentQuestion || feedback) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, feedback]);

  useEffect(() => {
    if (timeLeft === 0 && !feedback && !isSubmitting) {
      submitAnswer();
    }
  }, [timeLeft]);

  const submitAnswer = async () => {
    if (isSubmitting || !currentQuestion) return;

    setIsSubmitting(true);

    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/submit-answer",
        {
          interviewId,
          questionIndex: currentIndex,
          answer,
          timeTaken: currentQuestion.timeLimit - timeLeft,
        },
        { withCredentials: true }
      );

      setFeedback(result.data.feedback);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const finishInterview = async () => {
    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/finish",
        { interviewId },
        { withCredentials: true }
      );

      onFinish(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      finishInterview();
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">No questions found</h1>
          <p className="text-gray-500">Please start a new interview.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-6xl min-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-200 grid lg:grid-cols-[320px_1fr] overflow-hidden">
        <aside className="bg-white border-r border-gray-200 p-6 flex flex-col gap-6">
          <div>
            <p className="text-sm text-gray-500">Interview Progress</p>
            <h2 className="text-2xl font-bold text-emerald-600">
              Question {currentIndex + 1}
            </h2>
            <p className="text-sm text-gray-400">of {questions.length}</p>
          </div>

          <div className="flex justify-center">
            <Timer
              timeLeft={timeLeft}
              totalTime={currentQuestion.timeLimit}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-2xl font-bold text-emerald-600">
                {currentQuestion.difficulty}
              </p>
              <p className="text-xs text-gray-500">Difficulty</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-2xl font-bold text-emerald-600">
                {currentQuestion.timeLimit}s
              </p>
              <p className="text-xs text-gray-500">Limit</p>
            </div>
          </div>
        </aside>

        <main className="p-5 sm:p-8 flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            AI Smart Interview
          </h1>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 mb-6">
            <p className="text-xs sm:text-sm text-gray-400 mb-2">
              Question {currentIndex + 1} of {questions.length}
            </p>
            <p className="text-base sm:text-lg font-semibold text-gray-800 leading-relaxed">
              {currentQuestion.question}
            </p>
          </div>

          <textarea
            placeholder="Type your answer here..."
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            disabled={Boolean(feedback)}
            className="flex-1 min-h-64 bg-gray-100 p-4 sm:p-6 rounded-2xl resize-none outline-none border border-gray-200 focus:ring-2 focus:ring-emerald-500 transition text-gray-800 disabled:opacity-70"
          />

          {!feedback ? (
            <motion.button
              onClick={submitAnswer}
              disabled={isSubmitting}
              whileTap={{ scale: 0.98 }}
              className="mt-6 w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-4 rounded-2xl shadow-lg hover:opacity-90 transition font-semibold disabled:bg-gray-500"
            >
              {isSubmitting ? "Submitting..." : "Submit Answer"}
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 bg-emerald-50 border border-emerald-200 p-5 rounded-2xl shadow-sm"
            >
              <p className="text-emerald-700 font-medium mb-4">{feedback}</p>

              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 rounded-xl shadow-md hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                {currentIndex + 1 >= questions.length
                  ? "Finish Interview"
                  : "Next Question"}
                <BsArrowRight size={18} />
              </button>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Step2Interview;
