import { BlockNoteSchema, filterSuggestionItems } from "@blocknote/core";
import {
  FormattingToolbar,
  FormattingToolbarController,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { createWeather, insertWeatherItem } from "./blocks/WeatherBlock";
import "@blocknote/mantine/style.css";
import { en } from "@blocknote/core/locales";
import { en as aiEn } from "@blocknote/xl-ai/locales";
import {
  AIMenuController,
  AIToolbarButton,
  createAIExtension,
  getAISlashMenuItems,
} from "@blocknote/xl-ai";
import { DefaultChatTransport } from "ai";
import "@blocknote/xl-ai/style.css";

const BASE_URL = "https://localhost:3000/ai";
// process.env.BLOCKNOTE_AI_SERVER_BASE_URL || "https://localhost:3000/ai";

const schema = BlockNoteSchema.create().extend({
  blockSpecs: {
    weather: createWeather(),
  },
});

const getCustomSlashMenuItems = (editor) => [
  ...getDefaultReactSlashMenuItems(editor),
  insertWeatherItem(editor),
];

function BlockNoteEditor() {
  // Create a new editor instance
  const editor = useCreateBlockNote({
    schema,
    dictionary: {
      ...en,
      ai: aiEn, // add default translations for the AI extension
    },
    extensions: [
      createAIExtension({
        transport: new DefaultChatTransport({
          // URL to your backend API, see example source in `packages/xl-ai-server/src/routes/regular.ts`
          api: `${BASE_URL}/regular/streamText`,
        }),
      }),
    ],
  });

  // Render the editor
  return (
    <BlockNoteView editor={editor} formattingToolbar={false} slashMenu={false}>
      <AIMenuController />
      <FormattingToolbarWithAI />
      <SuggestionMenuWithAI editor={editor} />
    </BlockNoteView>
  );
}

// Formatting toolbar with the `AIToolbarButton` added
function FormattingToolbarWithAI() {
  return (
    <FormattingToolbarController
      formattingToolbar={() => (
        <FormattingToolbar>
          ...getFormattingToolbarItems()
          <AIToolbarButton />
        </FormattingToolbar>
      )}
    />
  );
}

// Slash menu with the AI option added
function SuggestionMenuWithAI(props) {
  return (
    <SuggestionMenuController
      triggerCharacter="/"
      getItems={async (query) =>
        filterSuggestionItems(
          [
            ...getCustomSlashMenuItems(props.editor),
            // add the default AI slash menu items, or define your own
            ...getAISlashMenuItems(props.editor),
          ],
          query
        )
      }
    />
  );
}

export default BlockNoteEditor;
