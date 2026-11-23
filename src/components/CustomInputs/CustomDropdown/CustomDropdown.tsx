import { ReactNode } from "react";

import { ColProps, Dropdown, Form, InputProps, MenuProps } from "antd";
import { FeedbackIcons } from "antd/es/form/FormItem";
import { FormItemTooltipType } from "antd/es/form/FormItemLabel";
import { FormLabelAlign, NamePath, Store } from "antd/es/form/interface";

import { ShouldUpdate } from "../../../infrastructure/helpers/GeneralHelpers/generalModel/generalModel";
import { resolveFormFieldHtmlFor } from "../../../infrastructure/helpers/utils/formUtils";

import "./_customDropdown.scss";

type CustomDropDownProps = React.ComponentProps<typeof Dropdown> & {
  label?: string;
  /** Supports nested paths — e.g. `[field.name, "action"]` inside `Form.List` */
  name?: NamePath;
  className?: string;
  rules?: any;
  disabled?: boolean;
  arrow?: boolean | { pointAtCenter: boolean };
  otherProps?: InputProps & { disabled?: boolean };
  items: MenuProps;
  placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
  trigger?: Array<"click" | "hover" | "contextMenu">;
  children: ReactNode;
  //Form Item props
  help?: ReactNode;
  colon?: boolean;
  valuePropName?: string;
  dependencies?: NamePath[];
  validateStatus?: "" | "success" | "warning" | "error" | "validating" | undefined;
  validateFirst?: boolean | "parallel" | undefined;
  validateDebounce?: number | undefined;
  formTrigger?: string | undefined;
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

const CustomDropdown = ({
  className,
  arrow,
  disabled,
  items,
  placement,
  trigger = ["hover"],
  children,
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
  // trigger: formTrigger,
  validateTrigger,
  tooltip,
  shouldUpdate = false,
  required = false,
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
}: CustomDropDownProps) => {
  //! In order for label to be in vertical mode use general class "vertical-label"
  return (
    <div className="custom-dropdown-container">
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
        // trigger={formTrigger}
        validateTrigger={validateTrigger}
        tooltip={tooltip}
        shouldUpdate={shouldUpdate}
        required={required}
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
        <Dropdown
          menu={items}
          trigger={trigger}
          arrow={arrow}
          disabled={disabled}
          placement={placement}
          {...props}
        >
          <a onClick={(e) => e.preventDefault()}>{children}</a>
        </Dropdown>
      </Form.Item>
    </div>
  );
};

export default CustomDropdown;
