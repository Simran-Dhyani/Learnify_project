import React from "react";

function QuizPanel({
  quiz,
  loading,
  quizGenerate,
}) {
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
    <div className="text-center py-12 text-gray-500">
      Click <span className="text-cyan-400 font-bold">Generate Quiz</span> to
      test your understanding.
    </div>
  )}

  {quiz && (
    <>
      <h3 className="text-3xl font-black mb-8">
        {quiz.quizTitle}
      </h3>

      <div className="space-y-8">
        {quiz.questions.map((question, index) => (
          <div
            key={index}
            className="
            border-4
            border-white
            p-6
            bg-[#0b0b0b]
            "
          >
            <h4 className="text-xl font-bold mb-5">
              {index + 1}. {question.question}
            </h4>

            <div className="grid gap-3">
              {question.options.map((option, i) => (
                <button
                  key={i}
                  className="
                  w-full
                  text-left
                  px-5
                  py-4
                  border-2
                  border-white/20
                  hover:border-cyan-400
                  hover:bg-cyan-400/10
                  transition
                  "
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )}

</div>

      <div className="p-8">

      </div>
    </section>
  );
}

export default QuizPanel;