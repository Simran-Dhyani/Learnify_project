import React from "react";
import TinyEditor from "../editor/TinyEditor";
import { useState,useEffect } from "react";


function NoteEditor({note,setNote,handleSave,editingId}){
const [editor, setEditor] = useState(null);
useEffect(() => {

    if(editor){

        setEditor(editor);

    }

}, [editor]);
    return (
        <div
className="
bg-[#050505]
border-[4px]
border-white
shadow-neo-brutalist
h-full
min-h-[700px]
flex
flex-col
"
>

    <div
    className="
    px-8
    py-5
    border-b
    border-white/20
    flex
    justify-between
    "
    >

        <div>

            <p className="text-cyan-400 uppercase tracking-[0.25em] text-xs font-bold">

                Notes

            </p>

            <h2 className="text-2xl font-black mt-2">

                Workspace

            </h2>

        </div>

    </div>
<div className="p-8">

  <TinyEditor
  
  note={note}

setNote={setNote}

setEditor={setEditor}

    placeholder="Capture important concepts while watching..."
    className="
    w-full
    min-h-[450px]
    bg-transparent
    resize-none
    outline-none
    text-lg
    leading-8
    text-white
    placeholder:text-gray-500
    "
/>

</div>
<div
className="
border-t
border-white/10
px-8
py-5
flex
justify-between
items-center
"
>
    <button
    onClick={handleSave}
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
    ">
        {editingId ? "Update Note" : "Save Note"}
    </button>

    

</div>
</div>
    )

}
export default NoteEditor;