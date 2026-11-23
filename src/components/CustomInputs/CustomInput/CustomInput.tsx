import { forwardRef, useCallback } from "react";

import { Form, GetRef, Input } from "antd";

import { CustomInputProps } from "./@types/@customInput";
import { normalizeArabicPersianToEnglishAndFarsi } from "../../../infrastructure/helpers/utils";
import { resolveFormFieldHtmlFor } from "../../../infrastructure/helpers/utils/formUtils";
import "./_customInput.scss";

const CustomInput = forwardRef<GetRef<typeof Input>, CustomInputProps>(
  (
    {
      type = "text",
      label = "",
      name,
      className,
      placeholder,
      rules,
      size,
      addonBefore,
      maxLength,

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
      // normalize,
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
      rootClassName,
      hasVerticalLabel = true,
      ...otherProps //todo check every component that uses this not properly
    },
    ref
  ) => {
    const handleNormalize = useCallback((value: any) => {
      if (value == null) return "";
      if (typeof value === "string") {
        return normalizeArabicPersianToEnglishAndFarsi(value);
      }
      return value;
    }, []);
    return (
      <div
        className={`custom-input-container ${hasVerticalLabel && "vertical-label"} ${rootClassName ? rootClassName : ""}`}
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
          normalize={handleNormalize}
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
          <Input
            id={name}
            aria-label={label === null ? "لیبل ورودی" : label?.toString()}
            name={name}
            placeholder={placeholder}
            type={type}
            size={size}
            addonBefore={addonBefore}
            maxLength={maxLength}
            ref={ref}
            {...otherProps}
          />
        </Form.Item>
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";
export default CustomInput;
