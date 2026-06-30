import React from "react";
import { useEffect, useState } from "react";

function QuizPanel({ quiz, loading, quizGenerate }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    if (quiz) {
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setScore(0);
      setQuizFinished(false);
    }
  }, [quiz]);

  const question = quiz?.questions[currentQuestion];
  const isLastQuestion = quiz && currentQuestion === quiz.questions.length - 1;

  const handleAnswer = (option) => {
    if (showResult) return;

    setSelectedAnswer(option);
    setShowResult(true);
    if (option === question.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setQuizFinished(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  return (
    <section
      className="
      bg-[#050505]
      border-[4px]
      border-white
      shadow-neo-brutalist
      "
    >
      {/* Header */}
      <div
        className="
        px-8
        py-6
        border-b
        border-white/10
        flex
        justify-between
        items-center
        "
      >
        <div>
          <p className="text-cyan-400 uppercase tracking-[0.25em] text-xs font-bold">
            AI Assessment
          </p>

          <h2 className="text-4xl font-header font-black mt-2">
            Knowledge Check
          </h2>
        </div>

        <button
          onClick={quizGenerate}
          disabled={loading}
          className="
          px-6
          py-3
          bg-cyan-400
          text-black
          font-black
          uppercase
          border-4
          border-black
          shadow-[4px_4px_0_0_#000]
          hover:translate-x-1
          hover:translate-y-1
          hover:shadow-none
          transition-all
          disabled:opacity-50
          "
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </button>
      </div>

      <div className="p-8">
        {!quiz && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl">
              Generate a quiz after taking notes.
            </p>
          </div>
        )}

        {quiz && (
          <>
            {quizFinished ? (
              <div className="text-center py-12">
                <h2 className="text-5xl font-black text-cyan-400">
                  Quiz Complete 🎉
                </h2>

                <p className="text-xl text-gray-400 mt-4">Your Score</p>

                <div className="text-7xl font-black mt-4">
                  {score} / {quiz.questions.length}
                </div>

                <p className="mt-6 text-2xl">
                  {score === quiz.questions.length
                    ? "🔥 Perfect!"
                    : score >= 4
                      ? "🚀 Excellent!"
                      : score >= 3
                        ? "👍 Good Job!"
                        : "📚 Keep Practicing!"}
                </p>

                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setSelectedAnswer(null);
                    setShowResult(false);
                    setScore(0);
                    setQuizFinished(false);
                  }}
                  className="
                  mt-10
                  px-8
                  py-3
                  bg-cyan-400
                  text-black
                  font-black
                  border-4
                  border-black
                  shadow-[4px_4px_0_0_#000]
                  hover:translate-x-1
                  hover:translate-y-1
                  hover:shadow-none
                  transition-all
                  "
                >
                  Retry Quiz
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="text-cyan-400 uppercase tracking-[0.2em]">
                    Question {currentQuestion + 1} / {quiz.questions.length}
                  </p>

                  <h3 className="text-3xl font-black mt-4">
                    {question.question}
                  </h3>
                </div>

                <div className="space-y-4">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      disabled={showResult}
                      onClick={() => handleAnswer(option)}
                      className={`
                        w-full
                        text-left
                        p-5
                        border-4
                        transition-all
                        ${
                        showResult
                        ? option === question.answer
                        ? "border-green-500 bg-green-500/20"
                        : option === selectedAnswer
                        ? "border-red-500 bg-red-500/20"
                        : "border-white/20 opacity-60"
                        : selectedAnswer === option
                        ? "border-cyan-400 bg-cyan-400/10"
                        : "border-white hover:border-cyan-400"
                        }
                       `}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {showResult && (
                  <>
                    <div className="mt-8 p-6 border-4 border-white">
                      {selectedAnswer === question.answer ? (
                        <div>
                          <h3 className="text-green-400 text-2xl font-black">
                            ✅ Correct!
                          </h3>

                          <p className="text-gray-300 mt-3">Great job!</p>
                        </div>
                      ) : (
                        <div>
                          <h3 className="text-red-400 text-2xl font-black">
                            ❌ Incorrect
                          </h3>

                          <p className="mt-3">
                            Correct answer:
                            <span className="text-cyan-400 font-bold ml-2">
                              {question.answer}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleNext}
                      className="
                      mt-8
                      px-8
                      py-3
                      bg-cyan-400
                      text-black
                      font-black
                      border-4
                      border-black
                      shadow-[4px_4px_0_0_#000]
                      hover:translate-x-1
                      hover:translate-y-1
                      hover:shadow-none
                      transition-all
                      "
                    >
                      {isLastQuestion ? "See Results →" : "Next Question →"}
                    </button>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default QuizPanel;
