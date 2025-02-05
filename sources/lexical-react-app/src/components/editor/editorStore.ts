import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialState = {
  root: null as any,
  selection: null as any,
  nodeMap: null as any,
};

export { produce };

export const useEditorStore = create(
  devtools(
    immer(() => initialState),
    { name: "EditorStore", anonymousActionType: "EditorStore" }
  )
);
