import { forwardRef } from "react";

import { DatePicker, Form, FormInstance, GetRef } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import { Rule } from "antd/es/form";
import { FormItemTooltipType } from "antd/es/form/FormItemLabel";
import { NamePath } from "antd/es/form/interface";
import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { JalaliLocaleListenerFix } from "@infra/helpers/DatePickerFix/utils/jalali";
import { NoUndefinedRangeValueType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import {
  resolveFormFieldHtmlFor,
  resolveFormFieldId,
} from "../../../infrastructure/helpers/utils/formUtils";
import Div from "../../Renderers/Div/Div";
import "./_customRangePicker.scss";

type CustomRangePickerOnChange = {
  bivarianceHack(
    dates: NoUndefinedRangeValueType<Dayjs> | null,
    dateStrings: [string, string]
  ): void;
}["bivarianceHack"];

type CustomRangePickerProps = {
  label?: string;
  /** Supports nested paths — e.g. `[field.name, "dateRange"]` inside `Form.List` */
  name: NamePath;
  className?: string;
  defaultValue?: unknown;
  placeholder?: [string, string];
  rules?: Rule[];
  disabled?: boolean;
  variant?: "filled" | "outlined" | "borderless" | undefined;
  allowClear?: boolean;
  autoFocus?: boolean;
  disabledDate?: (currentDate: Dayjs) => boolean | undefined;
  style?: React.CSSProperties;
  popupStyle?: React.CSSProperties;
  onPanelChange?: RangePickerProps["onPanelChange"];
  onOpenChange?: RangePickerProps["onOpenChange"];
  picker?: "date" | "week" | "month" | "quarter" | "year";
  size?: "large" | "middle" | "small";
  customContainerClass?: string;
  form?: FormInstance;
  isLoading?: boolean;
  hasVerticalLabel?: boolean;
  onChange?: CustomRangePickerOnChange;
  presets?: RangePickerProps["presets"];
  tooltip?: FormItemTooltipType;
};

dayjs.extend(utc);
dayjs.extend(timezone);

const toDayjsRangeValue = (value: unknown): [Dayjs, Dayjs] | undefined => {
  if (!Array.isArray(value) || value.length < 2) return undefined;

  const start = dayjs(value[0]);
  const end = dayjs(value[1]);

  if (!start.isValid() || !end.isValid()) return undefined;

  return [start, end];
};

const formatRangeForForm = (dates: NoUndefinedRangeValueType<Dayjs> | null) => {
  if (!dates) return undefined;

  return dates.map((date) => dayjs(date).utcOffset(0, true).startOf("day").toISOString());
};

const CustomRangePicker = forwardRef<
  GetRef<typeof DatePicker.RangePicker>,
  CustomRangePickerProps
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
      disabledDate,
      style = {},
      variant,
      onPanelChange,
      onOpenChange,
      size,
      popupStyle = {},
      picker = "date",
      form: _form,
      customContainerClass,
      isLoading = false,
      hasVerticalLabel = true,
      onChange,
      defaultValue,
      presets,
      tooltip,
      ...rest
    },
    ref
  ) => {
    const fieldId = resolveFormFieldId(name);

    return (
      <Div
        className={`date-range-pick-container ${
          customContainerClass ? customContainerClass : " "
        }`}
        loading={isLoading}
      >
        <JalaliLocaleListenerFix />
        <Form.Item
          label={label}
          htmlFor={resolveFormFieldHtmlFor(name)}
          className={`${hasVerticalLabel && "vertical-label"} ${className ? className : ""}`}
          name={name}
          rules={rules}
          hasFeedback
          shouldUpdate={isLoading}
          tooltip={tooltip}
          getValueProps={(value) => ({ value: toDayjsRangeValue(value) })}
          getValueFromEvent={formatRangeForForm}
        >
          <DatePicker.RangePicker
            id={fieldId}
            placeholder={placeholder}
            disabled={disabled}
            allowClear={allowClear}
            autoFocus={autoFocus}
            disabledDate={
              disabledDate ? (current) => disabledDate(current) ?? false : undefined
            }
            style={style}
            onPanelChange={onPanelChange}
            onOpenChange={onOpenChange}
            size={size}
            popupStyle={popupStyle}
            picker={picker}
            variant={variant}
            defaultValue={toDayjsRangeValue(defaultValue)}
            presets={presets}
            onChange={(dates, dateStrings) => {
              onChange?.(dates, dateStrings);
            }}
            ref={ref}
            {...rest}
          />
        </Form.Item>
      </Div>
    );
  }
);

CustomRangePicker.displayName = "CustomRangePicker";

export default CustomRangePicker;
