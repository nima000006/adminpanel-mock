import { forwardRef } from "react";

import { DatePicker, Form, FormInstance, GetProps, GetRef } from "antd";
import { Rule } from "antd/es/form";
import { NamePath } from "antd/es/form/interface";
import dayjs, { Dayjs } from "dayjs";

import { useJalaliLocaleListenerFix } from "@infra/helpers/DatePickerFix/utils/jalali";

import {
  resolveFormFieldHtmlFor,
  resolveFormFieldId,
} from "../../../infrastructure/helpers/utils/formUtils";

import "./_customDatePickerJalali.scss";

type CustomDatePickerJalaliProps = Omit<GetProps<typeof DatePicker>, "form"> & {
  label?: string;
  /** Supports nested paths — e.g. `[field.name, "date"]` inside `Form.List` */
  name: NamePath;
  className?: string;
  defaultValue?: unknown;
  placeholder?: string;
  rules?: Rule[];
  disabled?: boolean;
  allowClear?: boolean;
  autoFocus?: boolean;
  bordered?: boolean;
  disabledDate?: (currentDate: Dayjs) => boolean;
  style?: React.CSSProperties;
  popupStyle?: React.CSSProperties;
  onPanelChange?: GetProps<typeof DatePicker>["onPanelChange"];
  onOpenChange?: GetProps<typeof DatePicker>["onOpenChange"];
  picker?: "date" | "week" | "month" | "quarter" | "year";
  size?: "large" | "middle" | "small";
  customContainerClass?: string;
  form?: FormInstance;
  isLoading?: boolean;
};

const toDayjsValue = (value: unknown): Dayjs | undefined => {
  if (value == null || value === "") return undefined;
  const parsed = dayjs(value as string);
  return parsed.isValid() ? parsed : undefined;
};

const CustomDatePickerJalali = forwardRef<
  GetRef<typeof DatePicker>,
  CustomDatePickerJalaliProps
>(
  (
    {
      label,
      name,
      className,
      placeholder,
      rules,
      disabled,
      allowClear = true,
      autoFocus = false,
      bordered = true,
      disabledDate,
      style = {},
      onPanelChange,
      onOpenChange,
      size,
      popupStyle = {},
      picker = "date",
      form: _form,
      defaultValue: _defaultValue,
      customContainerClass: _customContainerClass,
      isLoading = false,
      ...props
    },
    ref
  ) => {
    useJalaliLocaleListenerFix();

    const fieldId = resolveFormFieldId(name);

    return (
      <Form.Item
        label={label}
        htmlFor={resolveFormFieldHtmlFor(name)}
        className={className}
        name={name}
        rules={rules}
        hasFeedback
        shouldUpdate={isLoading}
        getValueProps={(value) => ({ value: toDayjsValue(value) })}
        getValueFromEvent={(_, dateString) =>
          dateString ? dayjs(dateString as string) : undefined
        }
      >
        <DatePicker
          id={fieldId}
          placeholder={placeholder}
          disabled={disabled}
          allowClear={allowClear}
          autoFocus={autoFocus}
          bordered={bordered}
          disabledDate={disabledDate}
          style={style}
          onPanelChange={onPanelChange}
          onOpenChange={onOpenChange}
          size={size}
          popupStyle={popupStyle}
          picker={picker}
          ref={ref}
          {...props}
        />
      </Form.Item>
    );
  }
);

CustomDatePickerJalali.displayName = "CustomDatePickerJalali";
export default CustomDatePickerJalali;
