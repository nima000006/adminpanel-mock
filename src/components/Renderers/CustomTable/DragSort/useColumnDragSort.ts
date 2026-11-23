import { useState, useEffect, useCallback, useMemo, useRef } from "react";

import { arrayMove } from "@dnd-kit/sortable";

import {
  getColumnOrder,
  setColumnOrder,
  deleteColumnOrder,
} from "@infra/services/IndexedDB/operations";

import type { CustomColumnType } from "../CustomTable";
import type { DragIndexState } from "./DragIndexContext";
import type { DragEndEvent, DragOverEvent } from "@dnd-kit/core";

// =============================================================================
// Types
// =============================================================================

/** Internal augmented column type that carries a resolved drag key */
type AnyColumn<T> = CustomColumnType<T> & {
  children?: AnyColumn<T>[];
  _dragKey?: string;
};

/**
 * What we store in IndexedDB for grouped tables.
 * Serialised as a single-element string[] so the existing IDB schema is unchanged.
 */
interface GroupedColumnOrder {
  __grouped: true;
  groupOrder: string[];
  childOrder: Record<string, string[]>;
}

function isGroupedOrder(value: unknown): value is GroupedColumnOrder {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as GroupedColumnOrder).__grouped === true
  );
}

// =============================================================================
// Column-key helpers
// =============================================================================

function getColumnKey<T>(col: AnyColumn<T>, index: number): string {
  if (col.key != null) return String(col.key);
  if (col.dataIndex != null) {
    return Array.isArray(col.dataIndex) ? col.dataIndex.join(".") : String(col.dataIndex);
  }
  return String(index);
}

function isGrouped<T>(col: AnyColumn<T>): boolean {
  return Array.isArray(col.children) && col.children.length > 0;
}

function hasGroupedColumns<T>(columns: AnyColumn<T>[]): boolean {
  return columns.some(isGrouped);
}

// =============================================================================
// Hook interface
// =============================================================================

interface UseColumnDragSortOptions<T> {
  columns: CustomColumnType<T>[];
  tableId: string;
  enabled?: boolean;
}

export interface UseColumnDragSortReturn<T> {
  orderedColumns: CustomColumnType<T>[];
  dragIndex: DragIndexState;
  onDragEnd: (event: DragEndEvent) => void;
  onDragOver: (event: DragOverEvent) => void;
  /** Top-level sortable keys (group keys for grouped tables, leaf keys for flat) */
  sortableKeys: string[];
  /**
   * Per-group child keys — defined only for grouped tables.
   * Pass each entry's value to a nested <SortableContext> inside the group header.
   */
  groupChildKeys: Record<string, string[]> | undefined;
  resetOrder: () => void;
}

// =============================================================================
// Hook
// =============================================================================

export function useColumnDragSort<T>({
  columns,
  tableId,
  enabled = true,
}: UseColumnDragSortOptions<T>): UseColumnDragSortReturn<T> {
  const [isHydrated, setIsHydrated] = useState(false);
  const hydrationSignatureRef = useRef<string>("");

  // Cast to our internal type once — avoids repeated `as any` casts everywhere
  const internalColumns = columns as AnyColumn<T>[];

  const grouped = useMemo(() => hasGroupedColumns(internalColumns), [internalColumns]);

  // ── Keyed top-level columns ───────────────────────────────────────────────
  const keyedTopLevel = useMemo(
    () => internalColumns.map((col, i) => ({ ...col, _dragKey: getColumnKey(col, i) })),
    [internalColumns]
  );

  // ── Keyed children per group ──────────────────────────────────────────────
  const keyedChildrenByGroup = useMemo<Record<string, AnyColumn<T>[]>>(() => {
    if (!grouped) return {};
    const map: Record<string, AnyColumn<T>[]> = {};
    for (const col of keyedTopLevel) {
      if (isGrouped(col)) {
        map[col._dragKey!] = (col.children as AnyColumn<T>[]).map((child, i) => ({
          ...child,
          _dragKey: getColumnKey(child, i),
        }));
      }
    }
    return map;
  }, [keyedTopLevel, grouped]);

  // ── Change-detection signature ────────────────────────────────────────────
  const currentSignature = useMemo(() => {
    const topPart = keyedTopLevel.map((c) => c._dragKey).join("|");
    if (!grouped) return topPart;
    const childPart = Object.entries(keyedChildrenByGroup)
      .map(([gk, ch]) => `${gk}:[${ch.map((c) => c._dragKey).join(",")}]`)
      .join("|");
    return `${topPart}||${childPart}`;
  }, [keyedTopLevel, keyedChildrenByGroup, grouped]);

  // ── Order state ───────────────────────────────────────────────────────────
  const [groupOrder, setGroupOrder] = useState<string[]>(() =>
    keyedTopLevel.map((c) => c._dragKey!)
  );

  const [childOrder, setChildOrder] = useState<Record<string, string[]>>(() => {
    const init: Record<string, string[]> = {};
    for (const [gk, children] of Object.entries(keyedChildrenByGroup)) {
      init[gk] = children.map((c) => c._dragKey!);
    }
    return init;
  });

  const [dragIndex, setDragIndex] = useState<DragIndexState>({ active: -1, over: -1 });

  // ── Sync when column structure changes (prop diff) ────────────────────────
  useEffect(() => {
    if (hydrationSignatureRef.current === currentSignature) return;
    hydrationSignatureRef.current = currentSignature;

    const incomingTop = keyedTopLevel.map((c) => c._dragKey!);
    setGroupOrder((prev) => {
      const kept = prev.filter((k) => incomingTop.includes(k));
      const added = incomingTop.filter((k) => !prev.includes(k));
      return [...kept, ...added];
    });

    if (grouped) {
      setChildOrder((prev) => {
        const next = { ...prev };
        for (const [gk, children] of Object.entries(keyedChildrenByGroup)) {
          const incomingChild = children.map((c) => c._dragKey!);
          const prevOrder = prev[gk] ?? [];
          const kept = prevOrder.filter((k) => incomingChild.includes(k));
          const added = incomingChild.filter((k) => !prevOrder.includes(k));
          next[gk] = [...kept, ...added];
        }
        return next;
      });
    }
  }, [currentSignature, keyedTopLevel, keyedChildrenByGroup, grouped]);

  // ── IndexedDB: load on mount / tableId change ─────────────────────────────
  useEffect(() => {
    if (!enabled || !tableId) {
      setIsHydrated(true);
      return;
    }
    setIsHydrated(false);

    getColumnOrder(tableId)
      .then((raw) => {
        if (!raw) return;

        if (grouped) {
          // We stored it as a single JSON string in a string[]
          let saved: GroupedColumnOrder | null = null;
          try {
            const parsed = JSON.parse(raw[0] ?? "");
            if (isGroupedOrder(parsed)) saved = parsed;
          } catch {
            /* malformed — ignore, start fresh */
          }

          if (saved) {
            const topKeys = keyedTopLevel.map((c) => c._dragKey!);
            const keptGroups = saved.groupOrder.filter((k) => topKeys.includes(k));
            const addedGroups = topKeys.filter((k) => !saved!.groupOrder.includes(k));
            setGroupOrder([...keptGroups, ...addedGroups]);

            setChildOrder((prev) => {
              const next = { ...prev };
              for (const [gk, children] of Object.entries(keyedChildrenByGroup)) {
                const savedChildren = saved!.childOrder[gk] ?? [];
                const childKeys = children.map((c) => c._dragKey!);
                const kept = savedChildren.filter((k) => childKeys.includes(k));
                const added = childKeys.filter((k) => !savedChildren.includes(k));
                next[gk] = [...kept, ...added];
              }
              return next;
            });
          }
        } else {
          // Flat table — raw is a plain string[]
          const topKeys = keyedTopLevel.map((c) => c._dragKey!);
          const kept = raw.filter((k) => topKeys.includes(k));
          const added = topKeys.filter((k) => !raw.includes(k));
          setGroupOrder([...kept, ...added]);
        }
      })
      .catch((err) => console.warn("Failed to load column order:", err))
      .finally(() => setIsHydrated(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableId, enabled]);

  // ── IndexedDB: persist ────────────────────────────────────────────────────
  useEffect(() => {
    if (!enabled || !tableId || !isHydrated) return;

    const toStore: string[] = grouped
      ? [
          JSON.stringify({
            __grouped: true,
            groupOrder,
            childOrder,
          } satisfies GroupedColumnOrder),
        ]
      : groupOrder;

    setColumnOrder(tableId, toStore).catch((err) =>
      console.warn("Failed to save column order:", err)
    );
  }, [groupOrder, childOrder, tableId, enabled, isHydrated, grouped]);

  // ── Build orderedColumns ──────────────────────────────────────────────────
  const orderedColumns = useMemo<CustomColumnType<T>[]>(() => {
    const topMap = new Map(keyedTopLevel.map((c) => [c._dragKey!, c]));

    return groupOrder
      .map((gKey) => topMap.get(gKey))
      .filter((c): c is AnyColumn<T> & { _dragKey: string } => c != null)
      .map((group) => {
        if (!isGrouped(group)) {
          // Top-level leaf (e.g. fixed "actions" column)
          return {
            ...group,
            onHeaderCell: () => ({ id: group._dragKey }),
            onCell: () => ({ id: group._dragKey }),
          } as CustomColumnType<T>;
        }

        // Grouped: reorder children, inject drag handlers on each child
        const childMap = new Map(
          (keyedChildrenByGroup[group._dragKey] ?? []).map((c) => [c._dragKey!, c])
        );
        const orderedChildKeys = childOrder[group._dragKey] ?? [];
        const orderedChildren = orderedChildKeys
          .map((ck) => childMap.get(ck))
          .filter((c): c is AnyColumn<T> & { _dragKey: string } => c != null)
          .map((child) => ({
            ...child,
            onHeaderCell: () => ({ id: child._dragKey }),
            onCell: () => ({ id: child._dragKey }),
          })) as CustomColumnType<T>[];

        return {
          ...group,
          // Group header also gets an id so group-level DnD works
          onHeaderCell: () => ({ id: group._dragKey }),
          children: orderedChildren,
        } as CustomColumnType<T>;
      });
  }, [groupOrder, childOrder, keyedTopLevel, keyedChildrenByGroup]);

  // ── Drag: which keys belong to which level ────────────────────────────────
  const allGroupKeySet = useMemo(
    () => new Set(keyedTopLevel.map((c) => c._dragKey!)),
    [keyedTopLevel]
  );

  // ── onDragEnd ─────────────────────────────────────────────────────────────
  const onDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (active.id !== over?.id) {
        const activeId = String(active.id);
        const overId = String(over?.id ?? "");

        if (allGroupKeySet.has(activeId)) {
          // Top-level group drag
          setGroupOrder((prev) => {
            const ai = prev.indexOf(activeId);
            const oi = prev.indexOf(overId);
            if (ai === -1 || oi === -1) return prev;
            return arrayMove(prev, ai, oi);
          });
        } else {
          // Child drag — find the owner group
          const ownerGroup = Object.entries(childOrder).find(([, keys]) =>
            keys.includes(activeId)
          )?.[0];
          if (ownerGroup) {
            setChildOrder((prev) => {
              const prevChildren = prev[ownerGroup] ?? [];
              const ai = prevChildren.indexOf(activeId);
              const oi = prevChildren.indexOf(overId);
              if (ai === -1 || oi === -1) return prev;
              return { ...prev, [ownerGroup]: arrayMove(prevChildren, ai, oi) };
            });
          }
        }
      }
      setDragIndex({ active: -1, over: -1 });
    },
    [allGroupKeySet, childOrder]
  );

  // ── onDragOver ────────────────────────────────────────────────────────────
  const allFlatKeys = useMemo(
    () => [...groupOrder, ...Object.values(childOrder).flat()],
    [groupOrder, childOrder]
  );

  const onDragOver = useCallback(
    ({ active, over }: DragOverEvent) => {
      const activeIdx = allFlatKeys.indexOf(String(active.id));
      const overIdx = allFlatKeys.indexOf(String(over?.id ?? ""));
      setDragIndex({
        active: active.id,
        over: over?.id,
        direction: overIdx > activeIdx ? "right" : "left",
      });
    },
    [allFlatKeys]
  );

  // ── Reset ─────────────────────────────────────────────────────────────────
  const resetOrder = useCallback(() => {
    setGroupOrder(keyedTopLevel.map((c) => c._dragKey!));
    const defaultChild: Record<string, string[]> = {};
    for (const [gk, children] of Object.entries(keyedChildrenByGroup)) {
      defaultChild[gk] = children.map((c) => c._dragKey!);
    }
    setChildOrder(defaultChild);
    if (tableId && enabled) deleteColumnOrder(tableId).catch(console.warn);
  }, [keyedTopLevel, keyedChildrenByGroup, tableId, enabled]);

  // ── groupChildKeys exposed for SortableContext per group ──────────────────
  const groupChildKeys = useMemo(
    () => (grouped ? childOrder : undefined),
    [grouped, childOrder]
  );

  return {
    orderedColumns,
    dragIndex,
    onDragEnd,
    onDragOver,
    sortableKeys: groupOrder,
    groupChildKeys,
    resetOrder,
  };
}
