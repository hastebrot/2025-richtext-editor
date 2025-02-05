import { InitialEditorStateType } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, EditorUpdateOptions, LexicalEditor } from "lexical";

export type EditorStatePluginProps = {
  initialEditorState: InitialEditorStateType;
};

export const EditorStatePlugin = ({ ...props }: EditorStatePluginProps) => {
  const [editor] = useLexicalComposerContext();
  initializeEditor(editor, props.initialEditorState);

  return null;
};

const initializeEditor = (
  editor: LexicalEditor,
  initialEditorState?: InitialEditorStateType
): void => {
  editor.update(
    () => {
      const root = $getRoot();
      if (root.isEmpty() && initialEditorState) {
        switch (typeof initialEditorState) {
          case "function": {
            initializeEditorState(editor, initialEditorState, { tag: "history-merge" });
            break;
          }

          case "object": {
            editor.setEditorState(initialEditorState, { tag: "history-merge" });
            break;
          }

          case "string": {
            const editorState = editor.parseEditorState(initialEditorState);
            editor.setEditorState(editorState, { tag: "history-merge" });
            break;
          }
        }
      }
    },
    { tag: "history-merge" }
  );
};

// copied from `lexical/packages/lexical-react/src/shared/useYjsCollaboration.tsx`.
const initializeEditorState = (
  editor: LexicalEditor,
  initialEditorState: (editor: LexicalEditor) => void,
  options?: EditorUpdateOptions
): void => {
  editor.update(() => {
    const root = $getRoot();
    if (root.isEmpty()) {
      initialEditorState(editor);
    }
  }, options);
};
