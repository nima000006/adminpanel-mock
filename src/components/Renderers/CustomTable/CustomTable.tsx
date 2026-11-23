import { forwardRef, useMemo, useState, useRef, useEffect, useCallback } from "react";

// Drag-sort imports
import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { GetProps, GetRef, Table, InputRef } from "antd";
import { PaginationConfig } from "antd/es/pagination";

import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { GetColumnSearchProps } from "@infra/helpers/TableHelpers/TableHelpers";

import {
  DragIndexContext,
  DragHeaderCell,
  DragBodyCell,
  useColumnDragSort,
} from "./DragSort";
import CustomEmpty from "../CustomEmpty/CustomEmpty";

import type { ColumnType as AntdColumnType } from "antd/es/table";

import "./_customTable.scss";

type TableRef = GetRef<typeof Table>;
type AntdTableProps<T = any> = GetProps<typeof Table<T>>;

// =============================================================================
// Types
// =============================================================================

export type CustomColumnType<T> = AntdColumnType<T> & {
  /** Hide this column */
  hidden?: boolean;
  /** Enable default client-side search/filter for this column */
  searchable?: boolean;
  /** Enable default client-side sort/filter for this column */
  sortable?: boolean;
  /**
   * Ant Design grouped columns — typed as CustomColumnType so that
   * searchable / sortable / hidden are recognised on child columns too.
   */
  children?: CustomColumnType<T>[];
};

export interface CustomTableProps<T = any> extends Omit<AntdTableProps<T>, "columns"> {
  /** Data source array */
  dataSource?: T[];
  /** Table columns (supports hidden, searchable, sortable, and children) */
  columns?: CustomColumnType<T>[];
  /** Loading state */
  loading?: boolean;
  /** Additional class name */
  className?: string;

  // =========== Custom Features ===========
  /** Custom empty description text (overrides default) */
  emptyDescription?: string;

  /**
   * Apply default table props (size, bordered, scroll, etc.)
   * defined in TABLE_PROPS. Default: true
   */
  useDefaultProps?: boolean;

  // =========== Draggable Columns ===========
  /**
   * Enable drag-and-drop column reordering.
   * Requires a unique `draggableId` to persist order in IndexedDB.
   * When falsy / omitted, drag is disabled — zero overhead, no wrappers.
   */
  draggableColumns?: boolean;

  /**
   * Unique identifier used to persist column order in IndexedDB.
   * Required when `draggableColumns` is true.
   * Example: "food-report-vendors" or "student-card-list"
   */
  draggableId?: string;

  /**
   * Optional control to trigger a reset of the column order from the parent.
   * Incremented number or unique string. When changed, columns reset to default.
   */
  resetDraggableOrderTrigger?: string | number;

  // =========== Simplified Pagination ===========
  /** Total number of items (for server-side pagination). If provided, enables manual pagination. */
  total?: number;
  /** Current page number (1-based) */
  pageNumber?: number;
  /** Default page size */
  pageSize?: number;
  /** Callback for page change (required if total is provided) */
  onPageChange?: PaginationConfig["onChange"];
}

function CustomTableInner<T extends object = any>(
  {
    dataSource = [],
    columns = [],
    loading = false,
    className,
    emptyDescription = "داده‌ای وجود ندارد",
    useDefaultProps = true,
    draggableColumns = false,
    draggableId,
    resetDraggableOrderTrigger,
    total,
    pageNumber,
    pageSize,
    onPageChange,
    pagination,
    // Rest antd props
    ...restProps
  }: CustomTableProps<T>,
  ref: React.Ref<TableRef>
) {
  // Search State (internal management)
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  // ---- Drag-sort hook (no-op when disabled) ----
  const isDraggable = draggableColumns && !!draggableId;

  const {
    orderedColumns: dragOrderedColumns,
    dragIndex,
    onDragEnd,
    onDragOver,
    sortableKeys,
    resetOrder,
  } = useColumnDragSort<T>({
    columns,
    tableId: draggableId || "__noop__",
    enabled: isDraggable,
  });

  // Listen for reset trigger
  useEffect(() => {
    if (resetDraggableOrderTrigger && isDraggable) {
      resetOrder();
    }
  }, [resetDraggableOrderTrigger, isDraggable, resetOrder]);

  // Use drag-ordered columns when enabled, otherwise original columns
  const columnsToProcess = isDraggable ? dragOrderedColumns : columns;

  // ---------------------------------------------------------------------------
  // processColumn — recursive helper
  //
  // Walks the column tree depth-first:
  //   • Group columns (those with `children`): recurse into children, apply
  //     `hidden` filtering, then return early — no search/sort on a header group.
  //   • Leaf columns: apply `searchable` and `sortable` as before.
  // ---------------------------------------------------------------------------
  const processColumn = useCallback(
    (col: CustomColumnType<T>): CustomColumnType<T> => {
      const column = { ...col };

      // ---- Group column: recurse into children ----
      if (Array.isArray(column.children) && column.children.length > 0) {
        column.children = column.children
          .filter((child) => !child.hidden)
          .map((child) => processColumn(child));

        // Group header columns don't get search / sort themselves
        return column;
      }

      // ---- Leaf column: Search ----
      if (column.searchable && column.dataIndex) {
        Object.assign(
          column,
          GetColumnSearchProps({
            dataIndex: column.dataIndex,
            searchInput,
            searchedColumn,
            setSearchedColumn,
            searchText,
            setSearchText,
          })
        );
      }

      // ---- Leaf column: Sort ----
      if (column.sortable && column.dataIndex) {
        column.sorter = (a: T, b: T) => {
          const key = column.dataIndex as keyof T;

          const firstValue = a[key];
          const secondValue = b[key];

          // null | undefined
          if (firstValue == null && secondValue == null) return 0;
          if (firstValue == null) return -1;
          if (secondValue == null) return 1;

          // Numbers
          if (typeof firstValue === "number" && typeof secondValue === "number") {
            if (Number.isNaN(firstValue) && Number.isNaN(secondValue)) {
              console.warn("Both values are NaN");
              return 0;
            }
            if (Number.isNaN(firstValue)) {
              console.warn("First value is NaN");
              return -1;
            }
            if (Number.isNaN(secondValue)) {
              console.warn("Second value is NaN");
              return 1;
            }
            if (!Number.isFinite(firstValue) || !Number.isFinite(secondValue)) {
              console.warn("Infinity detected", { firstValue, secondValue });
            }
            return firstValue - secondValue;
          }

          // Strings
          if (typeof firstValue === "string" && typeof secondValue === "string") {
            const firstDate = Date.parse(firstValue);
            const secondDate = Date.parse(secondValue);
            if (!Number.isNaN(firstDate) && !Number.isNaN(secondDate)) {
              return firstDate - secondDate;
            }
            return firstValue.localeCompare(secondValue, "fa");
          }

          // Array detection
          if (Array.isArray(firstValue) || Array.isArray(secondValue)) {
            console.warn("Array value detected", { firstValue, secondValue });
          }

          // Object detection
          if (typeof firstValue === "object" || typeof secondValue === "object") {
            console.warn("Object value detected", { firstValue, secondValue });
          }

          return String(firstValue).localeCompare(String(secondValue), "fa");
        };

        column.sortDirections = ["ascend", "descend"];
      }

      return column;
    },
    [searchText, searchedColumn]
  );

  // ---------------------------------------------------------------------------
  // processedColumns
  //
  // Top-level hidden filter + processColumn (which recurses into children).
  // ---------------------------------------------------------------------------
  const processedColumns = useMemo(() => {
    return columnsToProcess.filter((col) => !col.hidden).map((col) => processColumn(col));
  }, [columnsToProcess, processColumn]);

  // Pagination Logic
  const paginationConfigInfo = useMemo(() => {
    // 1. Explicit pagination passed as prop takes precedence
    if (pagination) return pagination;
    // 2. Explicitly disabled
    if (pagination === false) return false;

    // 3. Simplified server-side pagination (manualPaginationConfig)
    if (total !== undefined && onPageChange) {
      return manualPaginationConfig({
        total,
        onChange: onPageChange,
        pageNumber: pageNumber || 1,
        defaultPageSize: pageSize || 8,
      });
    }

    // 4. Default behavior (let Antd handle it or undefined)
    return paginationConfig;
  }, [pagination, total, onPageChange, pageNumber, pageSize]);

  // Empty component with Persian default
  const locale = useMemo(() => {
    return {
      emptyText: <CustomEmpty description={emptyDescription} />,
    };
  }, [emptyDescription]);

  // Default Props Integration
  const defaultTableProps = useDefaultProps ? TABLE_PROPS(dataSource?.length || 0) : {};

  // Build class names
  const tableClassName = ["custom-table-container", className].filter(Boolean).join(" ");

  // ---- DnD sensors (only created when needed) ----
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 1 },
    })
  );

  // ---- Merge components prop for drag cells ----
  const dragComponents = isDraggable
    ? {
        header: { cell: DragHeaderCell },
        body: { cell: DragBodyCell },
      }
    : undefined;

  // ---- The core table element ----
  const tableElement = (
    <Table<T>
      ref={ref as any}
      dataSource={dataSource}
      columns={processedColumns as any}
      loading={loading}
      className={tableClassName}
      locale={locale}
      pagination={paginationConfigInfo}
      {...defaultTableProps}
      {...restProps}
      {...(dragComponents ? { components: dragComponents } : {})}
    />
  );

  // ---- Wrap with DnD when draggable ----
  if (!isDraggable) {
    return tableElement;
  }

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      collisionDetection={closestCenter}
    >
      <SortableContext items={sortableKeys} strategy={horizontalListSortingStrategy}>
        <DragIndexContext.Provider value={dragIndex}>
          {tableElement}
        </DragIndexContext.Provider>
      </SortableContext>
      <DragOverlay>
        <th
          style={{
            backgroundColor: "rgba(0,0,0,0.06)",
            padding: 16,
            borderRadius: 4,
            whiteSpace: "nowrap",
          }}
        >
          {
            processedColumns.find(
              (c: any) => c.onHeaderCell?.()?.id === String(dragIndex.active)
            )?.title as React.ReactNode
          }
        </th>
      </DragOverlay>
    </DndContext>
  );
}

// ForwardRef with generic support
const CustomTable = forwardRef(CustomTableInner) as <T extends object = any>(
  props: CustomTableProps<T> & { ref?: React.Ref<TableRef> }
) => React.ReactElement;

(CustomTable as any).displayName = "CustomTable";

export default CustomTable;
