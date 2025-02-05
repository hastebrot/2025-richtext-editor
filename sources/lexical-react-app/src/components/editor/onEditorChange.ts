import { $getRoot, $getSelection, EditorState } from "lexical";

export function onEditorChange(editorState: EditorState) {
  editorState.read(() => {
    const root = $getRoot();
    const selection = $getSelection();
    console.log("onChange:", root, selection);
  });
}
