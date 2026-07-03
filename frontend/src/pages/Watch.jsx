import {
  saveNotes,
  updateNote,
  deleteNote,
  getNotes,
} from "@/services/noteService";
import VideoPlayer from "@/components/watch/VideoPlayer";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import WorkspaceHeader from "@/components/watch/WorkspaceHeader";
import NotesList from "@/components/watch/NotesList";
import { Container } from "@/components";
import NoteEditor from "@/components/watch/NoteEditor";
import QuizPanel from "@/components/watch/QuizPanel";
import { generateQuiz } from "@/services/aiQuizService";
import authService from "@/services/authService";

function Watch() {
  const { id } = useParams();
  const location = useLocation();
  const thumbnail = location.state?.thumbnail;
  const [videoTitle, setVideoTitle] = useState(
    location.state?.videoTitle || "",
  );
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
  if (!videoTitle || !thumbnail) return;

  authService.addToWatchHistory({
    videoId: id,
    videoTitle,
    thumbnail,
  });
}, [id, videoTitle, thumbnail]);
 

  useEffect(() => {
    if (location.state?.videoTitle) {
      setVideoTitle(location.state.videoTitle);
      return;
    }
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await getNotes(id);

      setNotes(response);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, [id]);

  const handleEdit = (selectedNote) => {
    setNote(selectedNote.content);
    setEditingId(selectedNote._id);
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

  const quizGenerate = async () => {
    try {
      const noteText = notes
        .map((savedNote) => savedNote.content)
        .join("\n")
        .trim();
      const title = videoTitle || `YouTube Video ${id}`;

      setLoading(true);

      const quizData = await generateQuiz({
        videoTitle: title,
        notes: noteText,
      });

      setQuiz(quizData);
      console.log("Quiz Data:", quizData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log("Quiz State:", quiz);
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-gray-950 ">
      <Container>
        <WorkspaceHeader />
        {/* <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 space-y-16">*/}
        <VideoPlayer videoId={id} videoTitle={videoTitle} />

        <div className="my-16">
          <NoteEditor
            note={note}
            setNote={setNote}
            handleSave={handleSave}
            editingId={editingId}
          />
        </div>
        <div className="my-20">
          <NotesList
            notes={notes}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <QuizPanel quiz={quiz} loading={loading} quizGenerate={quizGenerate} />
      </Container>
    </div>
  );
}

export default Watch;
