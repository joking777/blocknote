import React from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css"; // Import the stylesheet

function BlockNoteEditor() {
  // Create a new editor instance
  const editor = useCreateBlockNote();

  // Render the editor
  return <BlockNoteView editor={editor} />;
}

export default BlockNoteEditor;