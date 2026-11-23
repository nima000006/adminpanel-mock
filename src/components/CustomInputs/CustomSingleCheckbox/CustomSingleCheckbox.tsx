import { ReactNode, forwardRef } from "react";

import { Checkbox, ColProps, Form, GetProps, GetRef } from "antd";
import { Rule } from "antd/es/form";
import { FeedbackIcons } from "antd/es/form/FormItem";
import { FormItemTooltipType } from "antd/es/form/FormItemLabel";
import { FormLabelAlign, NamePath, Store } from "antd/es/form/interface";

import { ShouldUpdate } from "../../../infrastructure/helpers/GeneralHelpers/generalModel/generalModel";
import { resolveFormFieldHtmlFor } from "../../../infrastructure/helpers/utils/formUtils";

import "./_customSingleCheckbox.scss";

type CustomSingleCheckboxProps = GetProps<typeof Checkbox> & {
  label?: ReactNode;
  /** Supports nested paths — e.g. `[field.name, "isActive"]` inside `Form.List` */
  name?: NamePath;
  rules?: Rule[];
  containerClassName?: string;
  checkboxClassName?: string;
  hasVerticalLabel?: boolean;
  valuePropName?: string;

  // Form Item props
  help?: React.ReactNode;
  colon?: boolean;
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
};

const CustomSingleCheckbox = forwardRef<
  GetRef<typeof Checkbox>,
  CustomSingleCheckboxProps
>(
  (
    {
      label,
      name,
      rules,
      containerClassName,
      checkboxClassName,
      hasVerticalLabel = false,
      valuePropName = "checked",

      // Form Item props
      help,
      colon = false,
      dependencies,
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
      hidden = false,
      normalize,
      messageVariables,
      labelCol,
      labelAlign = "right",
      initialValue,
      hasFeedback = false,
      getValueProps,
      getValueFromEvent,
      extra,
      className,
      ...checkboxProps
    },
    ref
  ) => {
    return (
      <Form.Item
        className={`custom-single-checkbox-container ${hasVerticalLabel && "vertical-label"} ${containerClassName ? containerClassName : ""}`}
        label={label}
        htmlFor={name ? resolveFormFieldHtmlFor(name) : undefined}
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
        <Checkbox
          id={name}
          className={`${checkboxClassName ? checkboxClassName : ""} ${className ? className : ""}`}
          ref={ref}
          {...checkboxProps}
        />
      </Form.Item>
    );
  }
);

CustomSingleCheckbox.displayName = "CustomSingleCheckbox";

export default CustomSingleCheckbox;
