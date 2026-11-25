import type { Key } from "react";

import { createMockListRow } from "@infra/mock/referenceMocks";

import type { CustomColumnType } from "./CustomTable";

const ARRAY_FIELD_PATTERN =
  /(list|items|dtos|records|roles|services|branches|children|files|images|tags|ids)$/i;
const DATE_FIELD_PATTERN = /(date|time|created|updated|start|end|from|to|at)$/i;
const NUMBER_FIELD_PATTERN =
  /(amount|price|count|total|capacity|quantity|number|page|size|rate|score|percent)$/i;
const BOOLEAN_FIELD_PATTERN = /^(is|has|can|should|enabled|active|primary)/i;

const normalizeDataIndex = (dataIndex: unknown): Key[] => {
  if (Array.isArray(dataIndex)) {
    return dataIndex.filter(
      (part): part is Key => typeof part === "string" || typeof part === "number"
    );
  }

  if (typeof dataIndex === "string" || typeof dataIndex === "number") {
    return [dataIndex];
  }

  return [];
};

const createValue = (field: Key, rowNumber: number): unknown => {
  const key = String(field);
  const normalizedKey = key.toLowerCase();

  if (normalizedKey === "id") return rowNumber;
  if (normalizedKey.includes("uuid")) return `mock-uuid-${rowNumber}`;
  if (normalizedKey.includes("national")) {
    return `00123456${String(rowNumber).padStart(2, "0")}`;
  }
  if (normalizedKey.includes("student")) return `1405${1200 + rowNumber}`;
  if (normalizedKey.includes("phone") || normalizedKey.includes("mobile")) {
    return `0912000000${rowNumber}`;
  }
  if (normalizedKey.includes("email")) return `mock.user${rowNumber}@example.com`;
  if (DATE_FIELD_PATTERN.test(key)) return "2026-11-24T10:00:00";
  if (BOOLEAN_FIELD_PATTERN.test(key)) return rowNumber % 2 === 1;
  if (ARRAY_FIELD_PATTERN.test(key)) {
    return [{ id: rowNumber, title: `گزینه آزمایشی ${rowNumber}`, name: "ACTIVE" }];
  }
  if (NUMBER_FIELD_PATTERN.test(key)) return rowNumber * 10;
  if (normalizedKey.includes("status")) return 1;
  if (normalizedKey.includes("gender")) return rowNumber % 2 === 0 ? "زن" : "مرد";
  if (normalizedKey.includes("firstname")) return rowNumber % 2 === 0 ? "سارا" : "علی";
  if (normalizedKey.includes("lastname")) {
    return rowNumber % 2 === 0 ? "احمدی" : "محمدی";
  }
  if (normalizedKey.includes("name") || normalizedKey.includes("title")) {
    return `نمونه آزمایشی ${rowNumber}`;
  }

  return `داده آزمایشی ${rowNumber}`;
};

const setNestedValue = (record: Record<string, unknown>, path: Key[], value: unknown) => {
  if (path.length === 0) return;

  let target = record;
  path.slice(0, -1).forEach((part) => {
    const key = String(part);
    const existing = target[key];

    if (!existing || typeof existing !== "object" || Array.isArray(existing)) {
      target[key] = {};
    }

    target = target[key] as Record<string, unknown>;
  });

  const finalKey = String(path[path.length - 1]);
  if (target[finalKey] === undefined) {
    target[finalKey] = value;
  }
};

const collectLeafColumns = <T>(columns: CustomColumnType<T>[]): CustomColumnType<T>[] =>
  columns.flatMap((column) =>
    Array.isArray(column.children) && column.children.length > 0
      ? collectLeafColumns(column.children)
      : column
  );

export const createMockTableRows = <T extends object>(
  columns: CustomColumnType<T>[],
  rowKey: string | undefined,
  count = 5
): T[] => {
  const leafColumns = collectLeafColumns(columns);

  return Array.from({ length: count }, (_, index) => {
    const rowNumber = index + 1;
    const record = {
      ...createMockListRow(rowNumber),
    } as Record<string, unknown>;

    leafColumns.forEach((column) => {
      const path = normalizeDataIndex(column.dataIndex);
      if (path.length > 0) {
        setNestedValue(record, path, createValue(path[path.length - 1], rowNumber));
      }
    });

    if (rowKey && record[rowKey] === undefined) {
      record[rowKey] = rowNumber;
    }

    return record as T;
  });
};
