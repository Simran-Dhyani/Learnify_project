import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  saveNotes,
  getNotes,
  updateNote,
  deleteNote,
} from "@/services/noteService";

import { generateQuiz } from "@/services/aiQuizService";
import { fetchVideoTitle } from "@/services/youtubeService";

function Watch() {
  const { id } = useParams();
  const location = useLocation();

  const [videoTitle, setVideoTitle] = useState(location.state?.videoTitle || "");
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadWatchData = async () => {
      const fetchedNotes = await fetchNotes();

      if (location.state?.videoTitle) {
        setVideoTitle(location.state.videoTitle);
        return;
      }

      if (fetchedNotes.length > 0 && fetchedNotes[0].videoTitle) {
        setVideoTitle(fetchedNotes[0].videoTitle);
        return;
      }

      try {
        const title = await fetchVideoTitle(id);
        setVideoTitle(title || `YouTube Video ${id}`);
      } catch (error) {
        console.log(error);
        setVideoTitle(`YouTube Video ${id}`);
      }
    };

    loadWatchData();
  }, [id, location.state?.videoTitle]);

  const fetchNotes = async () => {
    try {
      const data = await getNotes(id);
      setNotes(data);
      return data;
    } catch (error) {
      console.log(error);
      setNotes([]);
      return [];
    }
  };

  const handleSave = async () => {
    try {
      if (!note.trim()) return;

      if (editingId) {
        await updateNote(editingId, note);
        setEditingId(null);
      } else {
        await saveNotes({
          videoId: id,
          videoTitle: videoTitle || `YouTube Video ${id}`,
          content: note,
        });
      }

      setNote("");
      await fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      await deleteNote(noteId);
      await fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (selectedNote) => {
    setNote(selectedNote.content);
    setEditingId(selectedNote._id);
  };

  const quizGenerate = async () => {
    try {
      const noteText = notes.map((savedNote) => savedNote.content).join("\n").trim();
      const title = videoTitle || `YouTube Video ${id}`;

      setLoading(true);

      const quizData = await generateQuiz({
        videoTitle: title,
        notes: noteText,
      });

      setQuiz(quizData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="overflow-hidden rounded-3xl border-0 shadow-2xl p-5">
          <h1 className="text-3xl font-bold mb-5">{videoTitle || "Video"}</h1>

          <iframe
            className="w-full aspect-video rounded-2xl"
            src={`https://www.youtube.com/embed/${id}`}
            title={videoTitle || "YouTube Video Player"}
            allowFullScreen
          />
        </Card>

        <Card className="mt-8 p-6 rounded-3xl bg-white/70 backdrop-blur-xl border-0 shadow-xl">
          <h2 className="text-2xl text-slate-950 font-bold mb-4">Take Notes</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Capture key concepts, ideas and insights..."
              className="w-full text-slate-950 h-52 p-5 rounded-2xl border border-gray-200 resize-none outline-none focus:ring-2 focus:ring-purple-500"
            />

            <Button type="submit" className="mt-4 w-full h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500">
              {editingId ? "Update Note" : "Save Note"}
            </Button>
          </form>
        </Card>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Saved Notes</h2>

          <div className="grid md:grid-cols-2 gap-5">
            {notes.map((savedNote) => (
              <Card
                key={savedNote._id}
                className="p-5 rounded-3xl bg-white/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-purple-300/40 transition"
              >
                <p className="text-gray-700 leading-relaxed">{savedNote.content}</p>

                <div className="flex gap-3 mt-5">
                  <Button variant="outline" onClick={() => handleEdit(savedNote)}>
                    Edit
                  </Button>

                  <Button  className="bg-slate-950 text-white px-5 py-2 rounded-md"  onClick={() => handleDelete(savedNote._id)}>
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card className="mt-10 p-6 rounded-3xl bg-white shadow-xl">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold text-slate-950">AI Quiz</h2>

            <Button className="bg-purple-600 text-white px-5 py-2 rounded" onClick={quizGenerate} disabled={loading || !videoTitle}>
              {loading ? "Generating..." : "Generate Quiz"}
            </Button>
          </div>

          {quiz && (
            <div className="space-y-6 ">
              <h3 className="text-xl font-semibold  text-slate-950">{quiz.quizTitle}</h3>

              {quiz.questions.map((question, index) => (
                <div key={index} className="border rounded-2xl p-4  text-slate-950">
                  <p className="font-medium mb-3">
                    {index + 1}. {question.question}
                  </p>

                  <div className="grid gap-2">
                    {question.options.map((option, idx) => (
                      <Button key={idx} variant="outline" className="justify-start text-white ">
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Watch;
