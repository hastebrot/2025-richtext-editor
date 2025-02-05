import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalEditor } from "lexical";

export type EditorRefPluginProps = {
  editorRef: React.RefObject<LexicalEditor | null>;
};

export const EditorRefPlugin = ({ editorRef }: EditorRefPluginProps) => {
  const [editor] = useLexicalComposerContext();
  editorRef.current = editor;

  return null;
};
