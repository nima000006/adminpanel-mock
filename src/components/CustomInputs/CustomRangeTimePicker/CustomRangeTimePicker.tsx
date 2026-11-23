import { ReactNode, forwardRef } from "react";

import { ColProps, Form, GetRef, TimePicker } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Rule } from "antd/es/form";
import { FeedbackIcons } from "antd/es/form/FormItem";
import { FormItemTooltipType } from "antd/es/form/FormItemLabel";
import { FormLabelAlign, NamePath, Store } from "antd/es/form/interface";
import dayjs from "dayjs";

import {
  EventValue,
  RangeValue,
  ShouldUpdate,
} from "../../../infrastructure/helpers/GeneralHelpers/generalModel/generalModel";
import {
  resolveFormFieldHtmlFor,
  resolveFormFieldId,
} from "../../../infrastructure/helpers/utils/formUtils";
import Div from "../../Renderers/Div/Div";
import "./_customRangeTimePicker.scss";

type CustomTimePickerProps = {
  /** Supports nested paths — e.g. `[field.name, "timeRange"]` inside `Form.List` */
  name?: NamePath;
  className?: string;
  customContainerClass?: string;
  isLoading?: boolean;
  label?: ReactNode;
  help?: ReactNode;
  rules?: Rule[];
  autoFocus?: boolean;
  onChange?:
    | ((values: RangeValue<dayjs.Dayjs>, formatString: [string, string]) => void)
    | undefined;
  // defaultValue: RangeValue<dayjs.Dayjs> | undefined;
  defaultValue: any;
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
  use12Hours?: boolean | undefined;
  required?: boolean;
  preserve?: boolean;
  noStyle?: boolean;
  hidden?: boolean;
  placeholder?: [string, string] | undefined;
  format?: string;
  disabledDate?: ((date: dayjs.Dayjs) => boolean) | undefined;
  disabledTime?: ((date: EventValue<dayjs.Dayjs>, type: any) => any) | undefined;
  normalize?: ((value: any, prevValue: any, allValues: Store) => any) | undefined;
  messageVariables?: Record<string, string>;
  labelCol?: ColProps;
  labelAlign?: FormLabelAlign;
  initialValue?: any;
  size?: SizeType;
  allowClear?:
    | boolean
    | {
        clearIcon?: ReactNode;
      };
  hasFeedback?:
    | boolean
    | {
        icons: FeedbackIcons;
      };
  getValueProps?: (value: any) => Record<string, unknown>;
  getValueFromEvent?: (...args: any) => any;
  key?: any;
  extra: ReactNode;
};
const CustomRangeTimePicker = forwardRef<
  GetRef<typeof TimePicker.RangePicker>,
  CustomTimePickerProps
>(
  (
    {
      className,
      placeholder,
      format = "HH:mm",
      size,
      autoFocus,
      onChange,
      defaultValue,
      use12Hours,
      disabled,
      customContainerClass,
      isLoading,
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
      disabledDate,
      disabledTime,
      allowClear,
      key,
      extra,
    },
    ref
  ) => {
    const fieldId = name ? resolveFormFieldId(name) : undefined;

    return (
      <Div
        className={`range-time-pick-container ${
          customContainerClass ? customContainerClass : " "
        }`}
        loading={isLoading}
      >
        <Form.Item
          label={label}
          htmlFor={name ? resolveFormFieldHtmlFor(name) : undefined}
          className={className}
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
          <TimePicker.RangePicker
            onChange={onChange}
            defaultValue={defaultValue}
            autoFocus={autoFocus}
            size={size}
            placeholder={placeholder}
            format={format}
            use12Hours={use12Hours}
            disabled={disabled}
            id={fieldId}
            disabledDate={disabledDate}
            disabledTime={disabledTime}
            allowClear={allowClear}
            key={key}
            ref={ref}
          />
        </Form.Item>
      </Div>
    );
  }
);
CustomRangeTimePicker.displayName = "CustomRangeTimePicker";
export default CustomRangeTimePicker;
