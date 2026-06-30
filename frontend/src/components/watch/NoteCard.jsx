import { Pencil, Trash2 } from "lucide-react";

function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div
      className="
      bg-[#050505]
      border-[4px]
      border-white
      shadow-neo-brutalist
      p-6
      space-y-5
      hover:-translate-y-1
      transition-all
      "
    >
      {/* Note Preview */}

      <div
        className="
        text-gray-300
        leading-7
        line-clamp-5
        "
        dangerouslySetInnerHTML={{
          __html: note.content,
        }}
      />

      {/* Footer */}

      <div
        className="
        flex
        justify-between
        items-center
        border-t
        border-white/10
        pt-4
        "
      >
        <span
          className="
          text-xs
          uppercase
          tracking-[0.2em]
          text-gray-500
          "
        >
          Saved Note
        </span>

        <div className="flex gap-3">
          <button
            onClick={() => onEdit(note)}
            className="
            flex
            items-center
            gap-2
            px-4
            py-2
            border
            border-cyan-400
            text-cyan-400
            hover:bg-cyan-400
            hover:text-black
            transition
            "
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            onClick={() => onDelete(note._id)}
            className="
            flex
            items-center
            gap-2
            px-4
            py-2
            border
            border-red-500
            text-red-400
            hover:bg-red-500
            hover:text-white
            transition
            "
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
