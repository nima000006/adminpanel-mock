import { ReactNode, forwardRef, useState } from "react";

import { ColProps, Form, GetProps, GetRef, Switch } from "antd";
import { Rule } from "antd/es/form";
import { FeedbackIcons } from "antd/es/form/FormItem";
import { FormItemTooltipType } from "antd/es/form/FormItemLabel";
import { FormLabelAlign, NamePath, Store } from "antd/es/form/interface";

import { ShouldUpdate } from "../../../infrastructure/helpers/GeneralHelpers/generalModel/generalModel";
import "./_customSwitch.scss";

type CustomSwitchProps = GetProps<typeof Switch> & {
  className?: string;
  rules?: Rule[];
  valuePropName: string;
  label?: React.ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  loading?: boolean;
  onChange?: any;
  onClick?: any;

  //Form item props
  help?: React.ReactNode;
  /** Supports nested paths — e.g. `[field.name, "enabled"]` inside `Form.List` */
  name?: NamePath;
  placeholder?: string;
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
const CustomSwitch = forwardRef<GetRef<typeof Switch>, CustomSwitchProps>(
  (
    {
      className,
      rules,
      valuePropName,
      label,
      defaultChecked = false,
      disabled = false,
      autoFocus = false,
      loading = false,
      onChange,
      onClick,
      //Form Item props
      // name,
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
      ...props
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = useState<boolean>();

    return (
      <Form.Item
        className={`custom-switch-container ${className ? className : ""}`}
        rules={rules}
        label={label}
        valuePropName={valuePropName}
        name={valuePropName}
        colon={colon}
        dependencies={dependencies}
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
        <Switch
          id={valuePropName}
          defaultChecked={defaultChecked}
          checked={isChecked}
          disabled={disabled}
          autoFocus={autoFocus}
          loading={loading}
          onChange={(checked: boolean) => {
            onChange?.(checked);
            setIsChecked(checked);
          }}
          onClick={onClick}
          ref={ref}
          {...props}
        />
      </Form.Item>
    );
  }
);

CustomSwitch.displayName = "CustomSwitch";

export default CustomSwitch;
