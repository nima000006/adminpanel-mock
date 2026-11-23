import React from "react";

import { useSortable } from "@dnd-kit/sortable";

import { useDragIndex, getDragActiveStyle } from "./DragIndexContext";

// =============================================================================
// Header Cell
// =============================================================================

interface HeaderCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  id?: string; // undefined for group header rows that span multiple children
}

/**
 * DragHeaderCell is applied to EVERY <th> in the table by the components override.
 *
 * Three cases:
 *  1. id is undefined  → group-spanning header with no drag role → plain <th>
 *  2. id is a group key → the group title header → draggable at group level
 *  3. id is a child key → a leaf column header → draggable at child level
 *
 * Cases 2 and 3 are handled identically by useSortable because each id is
 * registered in exactly one SortableContext.
 */
export const DragHeaderCell: React.FC<HeaderCellProps> = (props) => {
  // Guard: Ant Design injects a group-spanning header row for the group title
  // (e.g. "اطلاعات تراکنش"). That th has colSpan but no id — skip drag for it.
  if (!props.id) {
    return <th {...props} />;
  }

  return <SortableTh {...(props as HeaderCellProps & { id: string })} />;
};

const SortableTh: React.FC<HeaderCellProps & { id: string }> = (props) => {
  const dragState = useDragIndex();
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({ id: props.id });

  const style: React.CSSProperties = {
    ...props.style,
    cursor: "move",
    ...(isDragging ? { position: "relative", zIndex: 98, userSelect: "none" } : {}),
    ...getDragActiveStyle(dragState, props.id),
  };

  return <th {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};

// =============================================================================
// Body Cell
// =============================================================================

interface BodyCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  id?: string;
}

export const DragBodyCell: React.FC<BodyCellProps> = (props) => {
  const dragState = useDragIndex();

  if (!props.id) return <td {...props} />;

  return (
    <td
      {...props}
      style={{ ...props.style, ...getDragActiveStyle(dragState, props.id) }}
    />
  );
};
