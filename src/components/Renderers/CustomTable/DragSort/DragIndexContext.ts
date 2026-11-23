import { createContext, useContext } from "react";

import type { UniqueIdentifier } from "@dnd-kit/core";

// =============================================================================
// Drag Index Context — shared between header and body cells
// =============================================================================

export interface DragIndexState {
  active: UniqueIdentifier;
  over: UniqueIdentifier | undefined;
  direction?: "left" | "right";
}

export const DragIndexContext = createContext<DragIndexState>({
  active: -1,
  over: -1,
});

export const useDragIndex = () => useContext(DragIndexContext);

/**
 * Returns inline styles that highlight the active/over column during drag.
 */
export const getDragActiveStyle = (
  dragState: DragIndexState,
  id: string
): React.CSSProperties => {
  const { active, over } = dragState;
  let style: React.CSSProperties = {};

  if (active && active === id) {
    style = { backgroundColor: "rgba(0,0,0,0.06)", opacity: 0.5 };
  } else if (over && id === over && active !== over) {
    style = { borderInlineStart: "2px dashed #1677ff" };
  }

  return style;
};
