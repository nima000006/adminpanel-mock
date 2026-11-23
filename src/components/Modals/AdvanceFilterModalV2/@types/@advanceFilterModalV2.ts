import { ColProps, FormInstance, SelectProps } from "antd";
import { Rule } from "antd/es/form";
import { NamePath } from "antd/es/form/interface";
import { BaseOptionType, DefaultOptionType } from "antd/es/select";

// ─── Filter Item Configuration ───────────────────────────────────────────────

export type FilterItemConfig = {
  label: string;
  name: NamePath;
  type: "select" | "input" | "date" | "range" | "slider";
  mode?: SelectProps["mode"];
  options?: { id: number; title: string }[];
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  onChange?: (
    value: unknown,
    option?:
      | BaseOptionType
      | DefaultOptionType
      | (BaseOptionType | DefaultOptionType)[]
      | undefined
  ) => void;
  sliderOnChange?: (value: number | number[]) => void;
  onClick?: () => void;
  notFoundContent?: string | undefined;
  picker?: "date" | "week" | "month" | "quarter" | "year";
  rules?: Rule[] | undefined;
  col?: ColProps;
  // Slider-specific
  min?: number;
  max?: number;
  labelMin?: string;
  labelMax?: string;
  defaultValue?: [number, number];
  // Select extras
  isNeedsName?: boolean;
  itemOptionName?: string;
};

// ─── Select Option Value (what antd's labelInValue produces) ─────────────────

export type SelectOptionValue = {
  key: string;
  value: string;
  label: string;
  title: string;
  name: string;
  code: number;
  item: {
    id: number;
    title: string;
    name?: string;
  };
};

// ─── Form Data ───────────────────────────────────────────────────────────────

export type FormDataValue =
  | SelectOptionValue[]
  | SelectOptionValue
  | string
  | number
  | [string, string]
  | [number, number]
  | null
  | undefined;

// ─── Hook ────────────────────────────────────────────────────────────────────

export type UseAdvanceFilterOptions<T extends Record<string, any>> = {
  filterItems: FilterItemConfig[];
  form: FormInstance<T>;
  /**
   * "url" = sync filters with URL search params (default)
   * "local" = keep filters in form state only, use onSubmit/onReset callbacks
   */
  mode?: "url" | "local";
  /** Called when modal opens (e.g. to fetch select options) */
  onOpen?: () => void;
  /** Called on submit in "local" mode with form data and active filter count */
  onSubmit?: (formData: Record<string, FormDataValue>, count: number) => void;
  /** Called on reset in "local" mode */
  onReset?: () => void;
};

export type UseAdvanceFilterReturn<T extends Record<string, any>> = {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Open the modal (also calls onOpen if provided) */
  openModal: () => void;
  /** Close the modal and reset form fields */
  closeModal: () => void;
  /** The antd form instance */
  form: FormInstance<T>;
  /** Number of active filters */
  badgeCount: number;
  /**
   * Primary URL param keys for each filter - use in useEffect deps:
   * `...advanceFilter.filterDeps.map(key => params?.[key])`
   */
  filterDeps: string[];
  /**
   * ALL URL param keys affected by filters (used internally for cleanup).
   * Includes Id, Title, Name, DateStart, DateEnd, MinAmount, MaxAmount keys.
   */
  allFilterParamKeys: string[];
  /** Current URL params (from useQueryParams) */
  params: Record<string, string>;
  /** React Router's setSearchParams */
  setSearchParams: (params: Record<string, string>) => void;
  /** Submit filters to URL or call onSubmit */
  submitFilters: (formData: Record<string, FormDataValue>) => void;
  /** Clear all filter params and reset form */
  resetFilters: () => void;
};

// ─── Modal Props ─────────────────────────────────────────────────────────────

export type AdvanceFilterModalV2Props<T extends Record<string, any>> = {
  title?: string;
  width?: number;
  filterItems: FilterItemConfig[];
  advanceFilter: UseAdvanceFilterReturn<T>;
};
