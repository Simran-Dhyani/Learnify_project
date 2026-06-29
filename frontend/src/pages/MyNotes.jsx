import React, { useEffect, useState } from "react";
import { getNotes } from "@/services/myNotesService";
import { Link } from "react-router-dom";
import { NotebookPen } from "lucide-react";

function MyNotes() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setVideos(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  from-slate-900 via-slate-950 to-gray-950 ">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <NotebookPen className="text-purple-600" size={36} />
            My Notes
          </h1>

          <p className="text-gray-500 mt-2">Continue learning from where you left off.</p>
        </div>

        {videos.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 text-center shadow-lg">
            <h2 className="text-2xl font-semibold">No Notes Yet</h2>

            <p className="text-gray-500 mt-3">
              Start watching videos and save notes to build your learning library.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div
                key={video._id}
                className="group overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl shadow-lg hover:-translate-y-2 hover:shadow-purple-400/30 transition-all duration-500"
              >
                <div className="relative">
                  <img
                    src={`https://img.youtube.com/vi/${video._id}/hqdefault.jpg`}
                    alt={video.videoTitle || "Video thumbnail"}
                    className="w-full h-56 object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg font-bold line-clamp-2">
                      {video.videoTitle || `YouTube Video ${video._id}`}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-500">Notes Taken</span>

                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-semibold">
                      {video.notesCount}
                    </span>
                  </div>

                  <Link
                    to={`/watch/${video._id}`}
                    state={{
                      videoTitle: video.videoTitle,
                    }}
                    className="flex justify-center items-center rounded-2xl bg-gradient-to-r from-purple-950 to-cyan-900 text-white font-semibold py-3 hover:scale-105 transition"
                  >
                    Continue Learning
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyNotes;
