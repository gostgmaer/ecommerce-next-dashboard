"use client";
// import React, { useEffect } from "react";
// import { useQuill } from "react-quilljs";
// // or const { useQuill } = require('react-quilljs');
// import "quill/dist/quill.snow.css"; // Add css for snow theme
// // or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

// const TextEditor = () => {
//   const { quill, quillRef } = useQuill();
//   //console.log(quillRef);
//   const changeValue = (e) => {
//     //console.log(e);
//   };

//   useEffect(() => {
//     //console.log(quill);
//   }, [quill]);
//   return (
//     <div style={{ height: 300 }} className="flex flex-col justify-center px-40">
//       <div ref={quillRef} onChange={changeValue}  />
//     </div>
//   );
// };

// export default TextEditor;

// TinyMCE so the global var exists
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Editor, EditorState } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <Editor
    
      onEditorStateChange={onEditorStateChange}
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      toolbarClassName="toolbar-class"
    />
  );
};

export default RichTextEditor