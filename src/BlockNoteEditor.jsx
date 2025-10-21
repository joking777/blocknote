import React from "react";
import { BlockNoteSchema, filterSuggestionItems } from "@blocknote/core";
import {
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { createWeather, insertWeatherItem } from "./blocks/WeatherBlock";
import "@blocknote/mantine/style.css"; // Import the stylesheet

// const schema = BlockNoteSchema.create().extend({
//   blockSpecs: {
//     weather: createWeather(),
//   },
// });

// const getCustomSlashMenuItems = (
//   editor,
// ) => [
//   ...getDefaultReactSlashMenuItems(editor),
//   insertWeatherItem(editor),
// ];

function BlockNoteEditor() {

  // Create a new editor instance
  const editor = useCreateBlockNote();
  
  // Render the editor
  return <BlockNoteView editor={editor} />
  //   <SuggestionMenuController
  //       triggerCharacter={"/"}
  //       // Replaces the default Slash Menu items with our custom ones.
  //       getItems={async (query) =>
  //         filterSuggestionItems(getCustomSlashMenuItems(editor), query)
  //       }
  //     />
  // </BlockNoteView>;
}

export default BlockNoteEditor;