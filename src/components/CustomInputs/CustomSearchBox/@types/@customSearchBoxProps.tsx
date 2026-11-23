import { Rule } from "antd/es/form";
import { NamePath } from "antd/es/form/interface";

import { FormInstance } from "@components/Renderers/CustomForm/CustomForm";

export type CustomSearchBoxProps<T> = {
  placeholder?: string;
  mode?: "client" | "url";
  onChange?: (value: string) => void;
  urlKey?: NamePath;
  debounceTime?: number;
  disabled?: boolean;
  rules?: Rule[] | undefined;
  onPressEnter?: () => void;
  hasUrlSync?: boolean;
  form?: FormInstance<T>;
  resetDependency?: unknown;
  className?: string;
  inputClassName?: string;
};
