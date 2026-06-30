import NoteCard from "./NoteCard";

function NotesList({ notes, onEdit, onDelete }) {

    return (

        <section className="space-y-8">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-cyan-400 uppercase tracking-[0.25em] text-xs font-bold">
                        Saved Notes
                    </p>

                    <h2 className="text-4xl font-black font-header mt-2">
                        Learning Library
                    </h2>

                </div>

                <span
                    className="
                    border
                    border-white/10
                    px-4
                    py-2
                    text-gray-400
                    text-sm
                    "
                >
                    {notes.length} Notes
                </span>

            </div>

            {
                notes.length === 0 ? (

                    <div
                        className="
                        bg-[#050505]
                        border-[4px]
                        border-white
                        shadow-neo-brutalist
                        p-16
                        text-center
                        "
                    >

                        <h3 className="text-2xl font-black">
                            No Notes Yet
                        </h3>

                        <p className="text-gray-500 mt-4">
                            Save your first note while watching the lecture.
                        </p>

                    </div>

                ) : (

                    <div className="grid lg:grid-cols-2 gap-8">

                        {notes.map((note) => (

                            <NoteCard
                                key={note._id}
                                note={note}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />

                        ))}

                    </div>

                )
            }

        </section>

    );

}

export default NotesList;