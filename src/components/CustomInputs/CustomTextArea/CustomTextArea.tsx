import { forwardRef } from "react";

import { Form, Input } from "antd";
import { TextAreaRef } from "antd/es/input/TextArea";

import { CustomTextAreaProps } from "./@types/@customTextArea";
import { resolveFormFieldHtmlFor } from "../../../infrastructure/helpers/utils/formUtils";

import "./_customTextArea.scss";

const CustomTextArea = forwardRef<TextAreaRef, CustomTextAreaProps>(
  (
    {
      className,
      placeholder,
      autoSize,
      disabled = false,
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
      maxLength,
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
    const { TextArea } = Input;

    return (
      <div className="custom-text-area-container">
        <Form.Item
          label={label}
          htmlFor={name ? resolveFormFieldHtmlFor(name) : undefined}
          name={name}
          className={`${hasVerticalLabel && "vertical-label"} ${className ? className : ""}`}
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
          <TextArea
            id={name}
            name={name}
            aria-label={label}
            placeholder={placeholder}
            disabled={disabled}
            autoSize={autoSize}
            ref={ref}
            maxLength={maxLength}
            {...props}
          />
        </Form.Item>
      </div>
    );
  }
);

CustomTextArea.displayName = "CustomTextArea";
export default CustomTextArea;
