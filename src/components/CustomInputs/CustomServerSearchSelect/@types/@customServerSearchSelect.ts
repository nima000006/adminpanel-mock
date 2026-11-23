import type { ReactElement, ReactNode } from "react";

import { CustomSelectProps } from "../../CustomSelect/@types/@customSelect";

export type CustomServerSearchSelectOption = {
  id: number | string;
  title: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  value?: string;
  code?: number;
};

export type CustomServerSearchSelectFetchParams = {
  search: string;
  pageNo: number;
  pageSize: number;
};

export type CustomServerSearchSelectFetchResult = {
  options: CustomServerSearchSelectOption[];
  total: number;
  /** e.g. `!response.last`; when omitted it is derived from page length and `total` */
  hasMore?: boolean;
};

export type CustomServerSearchSelectProps = Omit<
  CustomSelectProps,
  | "options"
  | "isLoading"
  | "showSearch"
  | "filterOption"
  | "onPopupScroll"
  | "onSearch"
  | "onOpenChange"
  | "onDropdownVisibleChange"
  | "popupRender"
  | "dropdownRender"
> & {
  onOpenChange?: (open: boolean) => void;
  onDropdownVisibleChange?: (open: boolean) => void;
  popupRender?: (menu: ReactElement) => ReactNode;
  dropdownRender?: (menu: ReactElement) => ReactNode;
  /** Memoize with `useCallback`; a new reference resets the loaded list. */
  fetchOptions: (
    params: CustomServerSearchSelectFetchParams
  ) => Promise<CustomServerSearchSelectFetchResult>;
  debounceTimeout?: number;
  /** Defaults to 10 */
  pageSize?: number;
  /** Labels for values not loaded yet, e.g. the current value in edit mode */
  initialOptions?: CustomServerSearchSelectOption[];
  emptyText?: string;
  errorText?: string;
};
