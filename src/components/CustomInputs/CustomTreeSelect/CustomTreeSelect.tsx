import React, { ReactNode, forwardRef } from "react";

import { ColProps, GetRef, TreeSelect } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import Form, { Rule } from "antd/es/form";
import { FeedbackIcons } from "antd/es/form/FormItem";
import { FormItemTooltipType } from "antd/es/form/FormItemLabel";
import { FormLabelAlign, NamePath, Store } from "antd/es/form/interface";

import { ShouldUpdate } from "../../../infrastructure/helpers/GeneralHelpers/generalModel/generalModel";
import { resolveFormFieldHtmlFor } from "../../../infrastructure/helpers/utils/formUtils";
import "./_customTreeSelect.scss";

type CustomTreeSelectProps = React.ComponentProps<typeof TreeSelect> & {
  label?: string;
  /** Supports nested paths — e.g. `[field.name, "category"]` inside `Form.List` */
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
  // required?: boolean;
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
  help?: ReactNode;
  //
  treeCheckable?: boolean;
  hasVerticalLabel?: boolean;
  treeClassName?: string;
};

const CustomTreeSelect = forwardRef<GetRef<typeof TreeSelect>, CustomTreeSelectProps>(
  (
    {
      label = "",
      name,
      className,
      rules,
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
      //
      treeCheckable = true,
      treeClassName,
      hasVerticalLabel = true,
      ...otherProps
    },
    ref
  ) => {
    return (
      <div className="custom-select-tree-outer-container">
        <Form.Item
          label={label}
          htmlFor={name ? resolveFormFieldHtmlFor(name) : undefined}
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
          <TreeSelect
            treeCheckable={treeCheckable}
            className={`${treeClassName} tree-select-class`}
            ref={ref}
            {...otherProps}
          />
        </Form.Item>
      </div>
    );
  }
);
CustomTreeSelect.displayName = "CustomTreeSelect";
export default CustomTreeSelect;
