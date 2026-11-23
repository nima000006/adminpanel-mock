import { ColProps, FormInstance, SelectProps } from "antd";
import { Rule } from "antd/es/form";
import { NamePath } from "antd/es/form/interface";
import { BaseOptionType, DefaultOptionType } from "antd/es/select";
import { Dayjs } from "dayjs";

//! LAYOUT

export type AdvanceFilterItemsListType = {
  label: string;
  name?: NamePath;
  mode?: SelectProps["mode"];
  options?: { id: number; title: string; name?: string }[];
  placeHolder?: string;
  type: "select" | "input" | "date" | "range" | "slider" | "divider";
  loading?: boolean;
  onChange?: (
    value: unknown,
    option?:
      | BaseOptionType
      | DefaultOptionType
      | (BaseOptionType | DefaultOptionType)[]
      | undefined
  ) => void;
  sliderOnChange?: (value: number | number[]) => void; // مخصوص slider
  onClick?: () => void;
  notFoundContent?: string | undefined;
  disabled?: boolean;
  disabledDate?: (currentDate: Dayjs) => boolean | undefined;
  //Todo[Atefeh]: use this key if type==="range"
  picker?: "date" | "week" | "month" | "quarter" | "year";
  rules?: Rule[] | undefined;
  labelMin?: string;
  labelMax?: string;
  min?: number;
  max?: number;
  defaultValue?: [number, number];
  className?: string;
  range?: [number, number];
  col?: ColProps; // برای تنظیم اندازه Col در Grid (lg, md, xs, sm, span و ...)
  isNeedsName?: boolean;
  itemOptionName?: string;
};

export type AdvanceFilterModalProps<T extends Record<string, any>> = {
  title?: string;
  isModalOpen: boolean;
  closeModalHandler: () => void;
  badgeCounter?: (count: number) => void;
  width?: number;
  mode?: "formSet" | "urlSet";
  form: FormInstance<T>;
  filterItemsList: AdvanceFilterItemsListType[];
  defaultParams?: Record<string, string>;
};

export type AdvanceModalSelectType = {
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

export type FormDataValueType =
  AdvanceModalSelectType[] | AdvanceModalSelectType | string;
