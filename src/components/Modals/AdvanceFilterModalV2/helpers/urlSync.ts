import { selectDefaultValueGenerator } from "@infra/helpers/utils";

import {
  FilterItemConfig,
  FormDataValue,
  SelectOptionValue,
} from "../@types/@advanceFilterModalV2";

// ─── Param Key Computation ───────────────────────────────────────────────────

/**
 * Get ALL URL param keys that a single filter item affects.
 * Used for cleanup when resetting or re-submitting filters.
 */
export function getFilterParamKeys(item: FilterItemConfig): string[] {
  const key = String(item.name);
  switch (item.type) {
    case "select": {
      const keys = [`${key}Id`, `${key}Title`];
      if (item.isNeedsName) keys.push(`${key}Name`);
      return keys;
    }
    case "input":
    case "date":
      return [`${key}Title`];
    case "range":
      return [`${key}DateStart`, `${key}DateEnd`];
    case "slider":
      return [`${key}MinAmount`, `${key}MaxAmount`];
    default:
      return [];
  }
}

/**
 * Get ALL URL param keys for a list of filter items.
 */
export function getAllFilterParamKeys(items: FilterItemConfig[]): string[] {
  return items.flatMap(getFilterParamKeys);
}

/**
 * Get ONE primary URL param key per filter item.
 * These are the minimal keys to watch for changes (use in useEffect deps).
 *
 * For select → `${name}Id`
 * For input/date → `${name}Title`
 * For range → `${name}DateStart`
 * For slider → `${name}MinAmount`
 */
export function getPrimaryFilterKeys(items: FilterItemConfig[]): string[] {
  return items.map((item) => {
    const key = String(item.name);
    switch (item.type) {
      case "select":
        return `${key}Id`;
      case "range":
        return `${key}DateStart`;
      case "slider":
        return `${key}MinAmount`;
      default:
        return `${key}Title`;
    }
  });
}

// ─── Form ↔ URL Sync ────────────────────────────────────────────────────────

/**
 * Restore form field values from URL search params.
 * Called when the modal opens to sync form with current URL state.
 */
export function syncFormFromUrl(
  form: any,
  params: Record<string, string>,
  filterItems: FilterItemConfig[]
) {
  const formFields = form.getFieldsValue();

  for (const key in formFields) {
    const currentItemConfig = filterItems.find((item) => item.name === key);

    if (`${key}Id` in params && `${key}Title` in params) {
      // ── SELECT (single or multi) ──
      const idList = params[`${key}Id`]?.split(",");
      const titleList = params[`${key}Title`]?.split("@");
      const nameList = params[`${key}Name`]?.split(",");

      const tempList = idList?.map((item, index) => {
        const tempData: Record<string, string> = {};

        if (currentItemConfig?.isNeedsName && nameList?.[index]) {
          tempData[currentItemConfig.itemOptionName || "name"] = nameList[index];
        }

        return Object.keys(tempData).length > 0
          ? { id: +item, title: titleList[index], ...tempData }
          : { id: +item, title: titleList[index] };
      });

      form.setFieldsValue({
        [key]: selectDefaultValueGenerator(tempList),
      });
    } else if (`${key}DateStart` in params && `${key}DateEnd` in params) {
      // ── RANGE PICKER ──
      form.setFieldsValue({
        [key]: [params[`${key}DateStart`], params[`${key}DateEnd`]],
      });
    } else if (`${key}MinAmount` in params && `${key}MaxAmount` in params) {
      // ── SLIDER ──
      form.setFieldsValue({
        [key]: [Number(params[`${key}MinAmount`]), Number(params[`${key}MaxAmount`])],
      });
    } else if (`${key}Title` in params) {
      // ── INPUT / DATE ──
      form.setFieldsValue({
        [key]: params[`${key}Title`],
      });
    }
  }
}

// ─── Form Data → URL Params ─────────────────────────────────────────────────

/**
 * Convert submitted form data into URL search params.
 * Returns the new params and a count of active filters.
 */
export function formDataToUrlParams(
  formData: Record<string, FormDataValue>,
  filterItems: FilterItemConfig[]
): { params: Record<string, string>; count: number } {
  const newParams: Record<string, string> = {};
  let count = 0;

  Object.entries(formData).forEach(([key, value]) => {
    const currentItemConfig = filterItems.find((item) => item.name === key);

    if (isDateRange(value)) {
      // ── RANGE PICKER ──
      newParams[`${key}DateStart`] = value[0];
      newParams[`${key}DateEnd`] = value[1];
      count++;
    } else if (isNumericRange(value)) {
      // ── SLIDER ──
      newParams[`${key}MinAmount`] = String(value[0]);
      newParams[`${key}MaxAmount`] = String(value[1]);
      count++;
    } else if (isMultiSelect(value)) {
      // ── MULTI SELECT ──
      const titleList = value.map((item: SelectOptionValue) => item.label);
      const idList = value.map((item: SelectOptionValue) => item.code);

      newParams[`${key}Title`] = titleList.join("@");
      newParams[`${key}Id`] = idList.join(",");

      if (currentItemConfig?.isNeedsName) {
        const nameList = value.map((item: SelectOptionValue) => item.item?.name ?? "");
        newParams[`${key}Name`] = nameList.join(",");
      }
      count++;
    } else if (isSingleSelect(value)) {
      // ── SINGLE SELECT ──
      newParams[`${key}Title`] = value.label;
      newParams[`${key}Id`] = String(value.code);
      if (currentItemConfig?.isNeedsName) {
        newParams[`${key}Name`] = value.item?.name ?? "";
      }
      count++;
    } else if (typeof value === "string" && value.trim() !== "") {
      // ── INPUT / DATE ──
      newParams[`${key}Title`] = value;
      count++;
    } else if (typeof value === "number") {
      // ── NUMBER INPUT ──
      newParams[`${key}Title`] = String(value);
      count++;
    }
    // Skip null, undefined, empty array, empty string
  });

  return { params: newParams, count };
}

// ─── Type Guards ─────────────────────────────────────────────────────────────

function isDateRange(value: FormDataValue): value is [string, string] {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    typeof value[0] === "string" &&
    typeof value[1] === "string"
  );
}

function isNumericRange(value: FormDataValue): value is [number, number] {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    typeof value[0] === "number" &&
    typeof value[1] === "number"
  );
}

function isMultiSelect(value: FormDataValue): value is SelectOptionValue[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === "object" &&
    value[0] !== null
  );
}

function isSingleSelect(value: FormDataValue): value is SelectOptionValue {
  return typeof value === "object" && !Array.isArray(value) && value !== null;
}
