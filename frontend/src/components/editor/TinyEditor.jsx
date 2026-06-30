import { Editor } from "@tinymce/tinymce-react";


function TinyEditor({ note, setNote }) {
  return (
    <Editor
      apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
      value={note}                        // editor shows whatever is in react state
      onEditorChange={(content) => setNote(content)}
      init={{
        height: 500,
        menubar: false,

        plugins: [
          "lists",
          "link",
          "table",
          "code",
          "wordcount",
          "autolink",
        ],

        toolbar:
          "undo redo | blocks | bold italic underline | bullist numlist | link table | code",

        placeholder:
          "Start taking notes while watching the lecture...",

        skin: "oxide-dark",

        content_css: "dark",
      }}
    />
  );
}

export default TinyEditor;