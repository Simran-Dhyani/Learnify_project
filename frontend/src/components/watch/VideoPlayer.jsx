import React from "react";
import { useParams } from "react-router-dom";
function VideoPlayer({ videoId,videoTitle }) {
 
return (
   
    <div className="bg-[#050505] border-[4px] border-white shadow-neo-brutalist p-8 space-y-8">
<div className="space-y-3">
    <p className=" text-cyan-400 uppercase tracking-[0.25em] font-bold text-xs">
     Watch Session
    </p>
    <h1 className="text-5xl font-header font-black tracking-tight">
     {videoTitle || "Untitled Video"} </h1>
    <div
  className=" relative overflow-hidden border-[4px] border-white aspect-video z-20 bg-black ">
    
    <iframe className="w-full h-full"
    src={`https://www.youtube.com/embed/${videoId}`}
    allowFullScreen
    title="videoTitle"
    />
    

</div>

</div>

</div>

        
    );

}

export default VideoPlayer;