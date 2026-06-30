import AnimatedBackground from "@/components/background/AnimatedBackground";
import VideoPlayer from "@/components/watch/VideoPlayer";
import { useEffect,useState } from "react";
import { useParams,useLocation } from "react-router-dom";
import WorkspaceHeader from "@/components/watch/WorkspaceHeader";
import { Container } from "@/components";
import NoteEditor from "@/components/watch/NoteEditor";
//import Workspace from "@/components/watch/Workspace";
//import SavedNotes from "@/components/watch/SavedNotes";

function Watch() {
const {id}=useParams();
const location = useLocation();
const [videoTitle, setVideoTitle] = useState(location.state?.videoTitle || "");
const [note, setNote] = useState("");
const[editingId,setEditingId]=useState("");

useEffect(()=>{
          if (location.state?.videoTitle) {
        setVideoTitle(location.state.videoTitle);
        return;
      }},[])

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
    return (

        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-gray-950 ">

           <Container>

        <WorkspaceHeader />
        {/* <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 space-y-16">*/}
            <VideoPlayer
             videoId={id}
             videoTitle={videoTitle}
            />
  
               <NoteEditor 
               note={note}
               setNote={setNote}
               handleSave={handleSave}

               />

               {/*<SavedNotes />*/}

           {/* </div> */}

    </Container>



           

        </div>

    );

}

export default Watch;