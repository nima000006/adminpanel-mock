import { forwardRef } from "react";

import { DatePicker, Form, FormInstance, GetProps, GetRef } from "antd";
import { Rule } from "antd/es/form";
import { NamePath } from "antd/es/form/interface";
import dayjs, { Dayjs } from "dayjs";
import moment from "jalali-moment";
import momentOriginal from "moment";

import { JalaliLocaleListenerFix } from "@infra/helpers/DatePickerFix/utils/jalali";

import {
  resolveFormFieldHtmlFor,
  resolveFormFieldId,
} from "../../../infrastructure/helpers/utils/formUtils";
import Div from "../../Renderers/Div/Div";
import "./_customDatePicker.scss";

type CustomDatePickerProps = Omit<
  GetProps<typeof DatePicker>,
  "form" | "disabledDate"
> & {
  label?: string;
  /** Supports nested paths — e.g. `[field.name, "time"]` inside `Form.List` */
  name: NamePath;
  className?: string;
  defaultValue?: unknown;
  placeholder?: string;
  rules?: Rule[];
  disabled?: boolean;
  allowClear?: boolean;
  autoFocus?: boolean;
  bordered?: boolean;
  disabledDate?: (currentDate: Dayjs) => boolean | undefined;
  style?: React.CSSProperties;
  popupStyle?: React.CSSProperties;
  onPanelChange?: GetProps<typeof DatePicker>["onPanelChange"];
  onOpenChange?: GetProps<typeof DatePicker>["onOpenChange"];
  picker?: "date" | "week" | "month" | "quarter" | "year";
  size?: "large" | "middle" | "small";
  customContainerClass?: string;
  form?: FormInstance;
  isLoading?: boolean;
  hasFeedback?: boolean;
  isGregorian?: boolean;
  hasNullInitiator?: boolean;
  forceRerender?: boolean;
  validateTrigger?: string | string[] | false;
  hasVerticalLabel?: boolean;
  formDateFormat?: string;
};

const toDayjsValue = (value: unknown): Dayjs | Dayjs[] | undefined => {
  if (value == null || value === "") return undefined;
  if (Array.isArray(value)) {
    return value.map((item) => dayjs(item));
  }
  const parsed = dayjs(value as string);
  return parsed.isValid() ? parsed : undefined;
};

const CustomDatePicker = forwardRef<GetRef<typeof DatePicker>, CustomDatePickerProps>(
  (
    {
      label,
      name,
      className,
      placeholder,
      rules,
      disabled,
      allowClear = true,
      hasFeedback = true,
      autoFocus = false,
      disabledDate,
      style = {},
      onPanelChange,
      onOpenChange,
      size,
      popupStyle = {},
      picker = "date",
      customContainerClass,
      isLoading = false,
      isGregorian = false,
      onChange,
      validateTrigger = undefined,
      variant = "outlined",
      hasNullInitiator = false,
      hasVerticalLabel = true,
      formDateFormat = "YYYY-MM-DDTHH:mm:ss.SSSZ",
      form: _form,
      defaultValue: _defaultValue,
      forceRerender: _forceRerender,
      ...props
    },
    ref
  ) => {
    const fieldId = resolveFormFieldId(name);

    const formatForForm = (date: Dayjs | null, dateString: string | string[]) => {
      const normalizedDateString = Array.isArray(dateString) ? dateString[0] : dateString;

      if (!normalizedDateString) {
        return undefined;
      }

      if (isGregorian && date) {
        return momentOriginal(date.toDate()).format("YYYY-MM-DDT00:00:00.000+03:30");
      }

      return moment.from(normalizedDateString, "fa", "YYYY-MM-DD").format(formDateFormat);
    };

    return (
      <Div
        className={`date-pick-container ${
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
          hasFeedback={hasFeedback}
          shouldUpdate={isLoading}
          validateTrigger={validateTrigger}
          getValueProps={(value) => {
            const parsed = toDayjsValue(value);

            if (hasNullInitiator && !parsed) {
              return { value: dayjs() };
            }

            return { value: parsed };
          }}
          getValueFromEvent={formatForForm}
        >
          <DatePicker
            id={fieldId}
            aria-label={label === null ? "لیبل تاریخ" : label?.toString()}
            placeholder={placeholder}
            disabled={disabled}
            allowClear={allowClear}
            autoFocus={autoFocus}
            variant={variant}
            disabledDate={
              disabledDate ? (current) => disabledDate(current) ?? false : undefined
            }
            style={style}
            onPanelChange={onPanelChange}
            onOpenChange={onOpenChange}
            size={size}
            popupStyle={popupStyle}
            picker={picker}
            onChange={(date, dateString) => {
              onChange?.(date, dateString);
            }}
            ref={ref}
            {...props}
          />
        </Form.Item>
      </Div>
    );
  }
);

CustomDatePicker.displayName = "CustomDatePicker";
export default CustomDatePicker;
