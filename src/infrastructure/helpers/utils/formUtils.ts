import { NamePath } from "antd/es/form/interface";

type SelectFnInput = {
  id?: number | string;
  title?: string | null;
  disabled?: boolean;
};

type Primitive = string | number | boolean | null | undefined;

// Strips non-primitive properties (e.g. React components) so `item` is
// compatible with form field types that only expect serializable values.
// For the `id` key specifically, only preserves the type when it is numeric
// (same rule as `key`/`code`), so string ids don't conflict with form types
// that declare `item.id?: number`.
type SelectItem<T> = {
  [K in keyof T as T[K] extends Primitive ? K : never]: K extends "id"
    ? NonNullable<T[K]> extends number
      ? T[K]
      : undefined
    : T[K];
};

/** Stable DOM id for nested Form.List names — e.g. `[0, "time"]` → `"0-time"`. */
export const resolveFormFieldId = (name: NamePath): string =>
  Array.isArray(name) ? name.map(String).join("-") : String(name);

/** `htmlFor` only works with simple string names; nested paths return `undefined`. */
export const resolveFormFieldHtmlFor = (name: NamePath): string | undefined =>
  Array.isArray(name) ? undefined : String(name);

type SelectDefaultValue<T extends SelectFnInput = SelectFnInput> = T & {
  label: string | undefined;
  value: string | undefined;
  // `key` is intentionally omitted from the type: form types define it
  // inconsistently (string vs number), and setFieldsValue's RecursivePartial
  // makes it optional either way. The runtime value is still set for antd.
  code: "id" extends keyof T
    ? NonNullable<T["id"]> extends number
      ? T["id"]
      : undefined
    : undefined;
  children: string | undefined;
  disabled: boolean | undefined;
  item: SelectItem<T>;
};

type SelectDefaultValueOutput<T extends SelectFnInput | SelectFnInput[] | undefined> =
  T extends undefined
    ? undefined
    : T extends readonly (infer U)[]
      ? U extends SelectFnInput
        ? SelectDefaultValue<U>[]
        : never
      : T extends SelectFnInput
        ? SelectDefaultValue<T>
        : never;

export function selectDefaultValueGenerator<
  T extends SelectFnInput | SelectFnInput[] | undefined,
>(data: T): SelectDefaultValueOutput<T> {
  if (!data) {
    return undefined as SelectDefaultValueOutput<T>;
  }

  if (Array.isArray(data)) {
    return data.map((item) => ({
      ...item,
      label: item.title,
      value: item.id?.toString(),
      key: item.id,
      code: item.id,
      children: item.title,
      disabled: item.disabled,
      item,
    })) as unknown as SelectDefaultValueOutput<T>;
  }

  return {
    ...data,
    label: data.title,
    value: data.id?.toString(),
    key: data.id,
    code: data.id,
    children: data.title,
    disabled: data.disabled,
    item: data,
  } as unknown as SelectDefaultValueOutput<T>;
}

export const defaultSelectTransformOptions = (
  data:
    | { title: string; id: number | string; disabled?: boolean; className?: string }[]
    | undefined
) => {
  // Return an empty array if no data is provided
  if (!data || !Array.isArray(data)) {
    return [];
  }

  // Transform the options into desired form, filter out invalid items
  return data
    .filter((item) => item != null && item.id != null && item.title != null)
    .map((item) => ({
      label: item.title || "",
      value: item.id != null ? String(item.id) : "",
      key: item.id,
      code: item.id,
      disabled: item.disabled,
      className: item.className,
      title: item.title || "",
      item,
    }));
};

export const CheckBoxFormGenerator = (condition: boolean, name: string) => {
  return condition ? name : "";
};
