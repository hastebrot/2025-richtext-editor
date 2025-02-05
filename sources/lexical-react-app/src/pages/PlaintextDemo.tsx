import { type InitialConfigType } from "@lexical/react/LexicalComposer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  EditorState,
  LexicalEditor,
} from "lexical";
import { useEffect, useRef, useState } from "react";
import {
  CarbonBreadcrumb,
  CarbonBreadcrumbs,
  CarbonLink,
} from "../components/breadcrumbs/CarbonBreadcrumbs";
import { DebugView } from "../components/editor/DebugView";
import { useEditorStore } from "../components/editor/editorStore";
import { EditorView } from "../components/editor/EditorView";
import { CarbonTheme, CarbonThemeLayer } from "../components/theme/CarbonTheme";
import { fakeSentences } from "../helpers/faker";
import { getSelectedNode } from "../helpers/lexical";
import { AutoFocusPlugin } from "../plugins/AutoFocusPlugin";
import { EditorRefPlugin } from "../plugins/EditorRefPlugin";
import { EditorStatePlugin } from "../plugins/EditorStatePlugin";

export const PlaintextDemo = () => {
  const editorId = `editor-${Date.now()}`;
  const editorConfig: InitialConfigType = {
    onError(error: Error, _editor: LexicalEditor) {
      throw error;
    },
    namespace: editorId,
    editorState: null,
    theme: {},
  };
  const config = {
    ...editorConfig,
    nodes: [HeadingNode],
  };
  const { root, selection, nodeMap } = useEditorStore();
  const [focusPath, setFocusPath] = useState<{ type: string; key: string }[]>([]);
  const onEditorUpdate = (editorState: EditorState) => {
    const selection = editorState.read(() => $getDebugSelection());
    const focusPath = editorState.read(() => $getDebugFocusPath());
    setFocusPath(focusPath);

    const nodeTree = editorState.toJSON();
    const nodeMap = editorState.read(() => $getDebugNodeMap(editorState));
    useEditorStore.setState({ selection, ...nodeTree, nodeMap });
  };
  const editorRef = useRef<LexicalEditor>(null);
  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      return mergeRegister(
        editor.registerUpdateListener((event) => {
          onEditorUpdate(event.editorState);
        })
      );
    }
  }, [editorRef]);

  return (
    <CarbonTheme theme="g10" className="grid min-h-dvh">
      <div className="p-6 gap-6 grid grid-cols-[1fr_1fr]">
        <section className="flex flex-col gap-4">
          <h4 className="px-4 h-[var(--token-size-medium)] flex items-center text-token-text-primary font-[600] text-[14px] leading-[20px]">
            Editor
          </h4>

          <div className="px-4 h-[var(--token-size-small)] flex items-center">
            <CarbonBreadcrumbs>
              {focusPath.map((item, index) => (
                <CarbonBreadcrumb key={index}>
                  <CarbonLink>
                    <a tabIndex={0}>
                      {item.type} ({item.key})
                    </a>
                  </CarbonLink>
                </CarbonBreadcrumb>
              ))}
            </CarbonBreadcrumbs>
          </div>

          <CarbonThemeLayer layer="01" className="flex flex-col [&_p]:mb-4">
            <EditorView initialConfig={config as InitialConfigType}>
              <HistoryPlugin />
              <AutoFocusPlugin />
              <EditorRefPlugin editorRef={editorRef} />
              <EditorStatePlugin initialEditorState={initialEditorState} />
            </EditorView>
          </CarbonThemeLayer>
        </section>

        <section className="grid">
          <CarbonThemeLayer layer="01">
            <DebugView selection={{ selection, focusPath }} nodetree={root} nodemap={nodeMap} />
          </CarbonThemeLayer>
        </section>
      </div>
    </CarbonTheme>
  );
};

function initialEditorState() {
  const root = $getRoot();
  root.clear();

  root.append($createParagraphNode().append($createTextNode(fakeSentences(2, 5, true))));
  root.append($createParagraphNode().append($createTextNode(fakeSentences(2, 10, true))));
  root.append($createParagraphNode().append($createTextNode(fakeSentences(2, 15, true))));

  root.selectStart();
}

function $getDebugSelection() {
  const selection = $getSelection();

  return $isRangeSelection(selection) ? selection : null;
}

function $getDebugFocusPath() {
  const selection = $getSelection();
  const selectedNode = $isRangeSelection(selection) ? getSelectedNode(selection) : null;

  let node = selectedNode;
  const focusPath = [];
  while (node) {
    focusPath.push({ type: node.getType(), key: node.getKey() });
    node = node.getParent();
  }
  return focusPath.reverse();
}

function $getDebugNodeMap(editorState: EditorState) {
  const nodeMap = editorState._nodeMap;

  return Object.fromEntries(
    Object.entries(Object.fromEntries(nodeMap)).map((entry) => {
      const { __key: key, __type: type } = entry[1];
      return [key, { key, type }];
    })
  );
}
