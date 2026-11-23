import { forwardRef, ReactNode } from "react";

import { Cascader, ColProps, Form, GetRef } from "antd";
import { DefaultOptionType } from "antd/es/cascader";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Rule } from "antd/es/form";
import { FeedbackIcons } from "antd/es/form/FormItem";
import { FormItemTooltipType } from "antd/es/form/FormItemLabel";
import { FormLabelAlign, NamePath, Store } from "antd/es/form/interface";

import { ShouldUpdate } from "../../../infrastructure/helpers/GeneralHelpers/generalModel/generalModel";
import { resolveFormFieldHtmlFor } from "../../../infrastructure/helpers/utils/formUtils";
import "./_customCascader.scss";

type CustomCascaderProps = React.ComponentProps<typeof Cascader> & {
  label?: string;
  /** Supports nested paths — e.g. `[field.name, "region"]` inside `Form.List` */
  name?: NamePath;
  placeholder?: string;
  className?: string;
  rules?: Rule[] | undefined;
  size?: SizeType;
  addonBefore?: React.ReactNode;
  maxLength?: number | undefined;

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
  options?: DefaultOptionType[];
  help?: ReactNode;
  onChange?: any;
  hasVerticalLabel?: boolean;
  value?: any;
};

const CustomCascader = forwardRef<GetRef<typeof Cascader>, CustomCascaderProps>(
  (
    {
      label,
      name,
      className,
      rules,
      value,
      // form items props
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
      options,
      extra,
      onChange,
      placeholder,
      rootClassName,
      hasVerticalLabel = true,
      ...otherProps
    },
    ref
  ) => {
    return (
      <Form.Item
        label={label}
        htmlFor={name ? resolveFormFieldHtmlFor(name) : undefined}
        className={`custom-cascader-container ${hasVerticalLabel && "vertical-label"} ${className}`}
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
        <Cascader
          id={name}
          options={options}
          onChange={onChange}
          placeholder={placeholder}
          ref={ref}
          rootClassName={`cascader-root-class-name ${rootClassName}`}
          value={value}
          // tagRender={(props) => {
          //   console.log({ props });
          //   return <div>{props.label}</div>;
          // }}
          // defaultValue={[[105, 88, 216]]}
          // ["105", "88", "216"]
          {...otherProps}
        />
      </Form.Item>
    );
  }
);

CustomCascader.displayName = "CustomCascader";

export default CustomCascader;
