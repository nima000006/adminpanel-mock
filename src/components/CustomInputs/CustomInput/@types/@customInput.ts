import { FormItemProps, InputProps } from "antd";

// Separate Input and Form.Item props to avoid conflicts
type InputOnlyProps = Omit<InputProps, "name">;

type FormItemOnlyProps = Pick<
  FormItemProps,
  | "label"
  | "name"
  | "rules"
  | "dependencies"
  | "validateStatus"
  | "validateFirst"
  | "validateDebounce"
  | "validateTrigger"
  | "tooltip"
  | "shouldUpdate"
  | "preserve"
  | "noStyle"
  | "messageVariables"
  | "labelCol"
  | "labelAlign"
  | "initialValue"
  | "hidden"
  | "help"
  | "hasFeedback"
  | "getValueProps"
  | "extra"
  | "getValueFromEvent"
  | "colon"
  | "valuePropName"
  | "trigger"
>;

export interface CustomInputProps extends InputOnlyProps, FormItemOnlyProps {
  /** Whether to display label above the input */
  hasVerticalLabel?: boolean;
  /** Custom class name for the container */
  rootClassName?: string;
  /** Convert Farsi/Persian digits to English digits */
  normalizeFarsiNumbers?: boolean;
  /** Custom aria-label when label is not provided */
  ariaLabel?: string;
  className?: string;
}
