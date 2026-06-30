import { Brain } from "lucide-react";

function WorkspaceHeader( ) {
  return (
    <div className="space-y-5 mb-16">

      <div className="inline-flex items-center gap-3">

        <Brain className="w-5 h-5 text-cyan-400" />

        <span
          className="
          uppercase
          tracking-[0.25em]
          text-xs
          font-black
          text-cyan-400
          "
        >
          AI Workspace
        </span>

      </div>

      <h1
        className="
        font-header
        font-black
        text-6xl
        md:text-8xl
        tracking-tighter
        leading-[0.9]
        uppercase
        "
      >
        Learn.
        <br />

        <span className="text-cyan-400">
          Build.
        </span>

        <br />

        Remember.
      </h1>

      <p className="max-w-3xl text-xl text-gray-400 leading-relaxed">

        Watch your lecture, take structured notes,
        save everything automatically and generate quizzes
        whenever you're ready.

      </p>
    </div>
  );
}

export default WorkspaceHeader;