import { InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ReactElement, ReactNode } from "react";
import { classNames } from "../../helpers/clsx";

export type EditorViewProps = {
  children?: ReactNode;
  initialConfig: InitialConfigType;
  disabledFocus?: boolean;
};

export const EditorView = (props: EditorViewProps) => {
  return (
    <LexicalComposer initialConfig={props.initialConfig}>
      <PlainTextPlugin
        contentEditable={
          <ContentEditable
            className={classNames(
              !props.disabledFocus
                ? "focus:outline-2 outline-token-focus -outline-offset-2"
                : "outline-none",
              "p-4 bg-token-layer min-h-[200px] resize-y overflow-y-auto",
              "text-[16px] leading-[24px] tracking-[-0.011em] font-[400] text-token-text-primary"
            )}
          />
        }
        placeholder={null}
        ErrorBoundary={LexicalErrorBoundary}
      />
      {props.children as ReactElement}
    </LexicalComposer>
  );
};
