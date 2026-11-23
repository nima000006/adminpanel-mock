import { Form, Radio } from "antd";

import { CustomRadioGroupProps } from "./@types/@customRadioGroup";
import { resolveFormFieldHtmlFor } from "../../../infrastructure/helpers/utils/formUtils";
import Div from "../../Renderers/Div/Div";
import "./_customRadioGroup.scss";

const CustomRadioGroup = ({
  label,
  containerClassName,
  radioClassName,
  options,
  value,
  onChange,
  // hasCustomOptionsTransformer,
  // customOptionsTransformer,
  name,
  className,
  rules,
  isLoading,
  defaultValue,
  disabled,
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
  hasVerticalLabel = false,
  optionType,
  ...otherProps
}: CustomRadioGroupProps) => {
  return (
    <Div
      loading={isLoading}
      className={`radio-container ${containerClassName ? containerClassName : ""}`}
    >
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
        <Radio.Group
          className={`${radioClassName && radioClassName}`}
          options={options}
          name={name}
          defaultValue={defaultValue}
          disabled={disabled}
          value={value}
          onChange={onChange}
          optionType={optionType}
          {...otherProps}
        />
      </Form.Item>
    </Div>
  );
};

export default CustomRadioGroup;
