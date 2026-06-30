import React from "react";

function Workspace(){
    <div className="grid lg:grid-cols-12 gap-8">

    <div className="lg:col-span-8">

        <NoteEditor/>

    </div>

    <div className="lg:col-span-4 space-y-8">

        <AISummary/>

        <QuizPanel/>

    </div>

</div>

}
export default Workspace;