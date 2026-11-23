import { ReactNode, forwardRef } from "react";

import { Checkbox, CheckboxOptionType, ColProps, Form, GetRef } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Rule } from "antd/es/form";
import { FeedbackIcons } from "antd/es/form/FormItem";
import { FormItemTooltipType } from "antd/es/form/FormItemLabel";
import { FormLabelAlign, NamePath, Store } from "antd/es/form/interface";

import { ShouldUpdate } from "../../../infrastructure/helpers/GeneralHelpers/generalModel/generalModel";
import { resolveFormFieldHtmlFor } from "../../../infrastructure/helpers/utils/formUtils";

import "./_customCheckboxGroup.scss";
type CustomCheckboxGroupProps = {
  label?: string;
  containerClassName?: string;
  checkboxClassName?: string;
  options?: CheckboxOptionType[];
  /** Supports nested paths — e.g. `[field.name, "permissions"]` inside `Form.List` */
  name?: NamePath;
  disabled?: boolean;
  rules?: Rule[] | undefined;
  defaultValue?: boolean[] | undefined;
  autoSize?: boolean | object | undefined;
  //Form Item props
  help?: React.ReactNode;
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
  onChange?: ((e: CheckboxChangeEvent) => void) | undefined;
  hasVerticalLabel?: boolean;
};
const CustomCheckboxGroup = forwardRef<
  GetRef<typeof Checkbox.Group>,
  CustomCheckboxGroupProps
>(
  (
    {
      containerClassName,
      checkboxClassName,
      options,
      disabled,
      defaultValue,
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
      hasVerticalLabel = false,
      onChange,
    },
    ref
  ) => {
    // const [value, setValue] = useState<any[]>(defaultValue || []);

    const handleChange = (checkedValues: any[]) => {
      // setValue(checkedValues);
      if (onChange) {
        onChange({
          target: {
            value: checkedValues,
          },
        } as CheckboxChangeEvent);
      }
    };
    return (
      <Form.Item
        className={`checkbox-container ${hasVerticalLabel && "vertical-label"} ${containerClassName}`}
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
        <Checkbox.Group
          className={`${checkboxClassName && checkboxClassName}`}
          disabled={disabled}
          defaultValue={defaultValue}
          options={options}
          onChange={handleChange}
          ref={ref}
        >
          {/* {options?.map((option, indx) => (
            <Checkbox
              key={indx}
              value={option.value}
              onChange={(e) => {
                const isChecked = e.target.checked;
                if (isChecked) setValue((prev) => [...prev, option]);
                else {
                  setValue(
                    value.filter((v: any) => {
                      return v !== option.value;
                    })
                  );
                }
                onChange?.(e);
              }}
            >
              <> {option.label}</>
            </Checkbox>
          ))} */}
        </Checkbox.Group>
      </Form.Item>
    );
  }
);

CustomCheckboxGroup.displayName = "CustomCheckboxGroup";

export default CustomCheckboxGroup;
