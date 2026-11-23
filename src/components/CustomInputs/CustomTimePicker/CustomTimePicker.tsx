import { ReactNode, forwardRef } from "react";

import { ColProps, Form, GetRef, TimePicker } from "antd";
import { Rule } from "antd/es/form";
import { FeedbackIcons } from "antd/es/form/FormItem";
import { FormItemTooltipType } from "antd/es/form/FormItemLabel";
import { FormLabelAlign, NamePath, Store } from "antd/es/form/interface";
import dayjs from "dayjs";

import { ShouldUpdate } from "../../../infrastructure/helpers/GeneralHelpers/generalModel/generalModel";
import { resolveFormFieldHtmlFor } from "../../../infrastructure/helpers/utils/formUtils";

import "./_customTimePicker.scss";

type CustomTimePickerProps = React.ComponentProps<typeof TimePicker> & {
  /** Supports nested paths — e.g. `[field.name, "startTime"]` inside `Form.List` */
  name: NamePath;
  className?: string;
  label?: ReactNode;
  help?: ReactNode;
  rules?: Rule[];
  autoFocus?: boolean;
  onChange?: (value: dayjs.Dayjs | null, dateString: string) => void;
  defaultValue?: any;
  use12Hours?: boolean;
  disabled?: boolean;
  //Form Item props
  colon?: boolean;
  valuePropName?: string;
  dependencies?: NamePath[];
  validateStatus?: "" | "success" | "warning" | "error" | "validating" | undefined;
  validateFirst?: boolean | "parallel" | undefined;
  validateDebounce?: number | undefined;
  trigger?: string | undefined;
  validateTrigger?: string | false | string[] | undefined;
  tooltip?: FormItemTooltipType;
  shouldUpdate?: ShouldUpdate<any>;
  required?: boolean;
  preserve?: boolean;
  noStyle?: boolean;
  hidden?: boolean;
  normalize?: ((value: any, prevValue: any, allValues: Store) => any) | undefined;
  messageVariables?: Record<string, string>;
  labelCol?: ColProps;
  labelAlign?: FormLabelAlign;
  initialValue?: any;
  hasFeedback?:
    | boolean
    | {
        icons: FeedbackIcons;
      };
  getValueProps?: (value: any) => Record<string, unknown>;
  getValueFromEvent?: (...args: any) => any;
  extra?: ReactNode;
  hasVerticalLabel?: boolean;
};
const CustomTimePicker = forwardRef<GetRef<typeof TimePicker>, CustomTimePickerProps>(
  (
    {
      className,
      placeholder,
      size,
      autoFocus,
      use12Hours,
      disabled,
      //Form Item props
      name,
      rules,
      label,
      colon = false,
      dependencies,
      valuePropName,
      validateStatus,
      validateFirst = false,
      validateDebounce,
      trigger,
      validateTrigger,
      tooltip,
      shouldUpdate = false,
      // required = false,
      preserve = true,
      noStyle = false,
      normalize,
      messageVariables,
      labelCol,
      labelAlign = "right",
      initialValue,
      hidden = false,
      help,
      getValueProps,
      hasFeedback = false,
      getValueFromEvent,
      extra,
      hasVerticalLabel = true,
      ...props
    },
    ref
  ) => {
    return (
      <div className="custom-time-picker">
        <Form.Item
          label={label}
          htmlFor={resolveFormFieldHtmlFor(name)}
          className={`${hasVerticalLabel && "vertical-label"} ${className ? className : ""}`}
          name={name}
          rules={rules}
          colon={colon}
          dependencies={dependencies}
          valuePropName={valuePropName}
          validateStatus={validateStatus}
          validateFirst={validateFirst}
          validateDebounce={validateDebounce}
          trigger={trigger}
          validateTrigger={validateTrigger}
          tooltip={tooltip}
          shouldUpdate={shouldUpdate}
          // required={required}
          preserve={preserve}
          noStyle={noStyle}
          normalize={normalize}
          messageVariables={messageVariables}
          labelCol={labelCol}
          labelAlign={labelAlign}
          initialValue={initialValue}
          hidden={hidden}
          help={help}
          hasFeedback={hasFeedback}
          getValueProps={getValueProps}
          extra={extra}
          getValueFromEvent={getValueFromEvent}
        >
          <TimePicker
            aria-label={label === null ? "لیبل ورودی زمان" : label?.toString()}
            format="HH:mm"
            placeholder={placeholder}
            use12Hours={use12Hours}
            autoFocus={autoFocus}
            ref={ref}
            size={size}
            disabled={disabled}
            needConfirm={false}
            className="custom-time-picker-inner"
            // changeOnScroll
            {...props}
          />
        </Form.Item>
      </div>
    );
  }
);
CustomTimePicker.displayName = "CustomTimePicker";
export default CustomTimePicker;
