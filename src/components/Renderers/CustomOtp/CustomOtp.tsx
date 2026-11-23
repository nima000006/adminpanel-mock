import { forwardRef, useCallback } from "react";

import { GetRef } from "antd";
import FormItem from "antd/es/form/FormItem";
import OTP from "antd/es/input/OTP";

import { CustomOTPProps } from "./@types/@customOtp";

import "./_customOtp.scss";
import { farsiNumberToEnglish } from "@infra/helpers/utils";

const CustomOTP = forwardRef<GetRef<typeof OTP>, CustomOTPProps>(
  (
    {
      type = "text",
      label = "",
      name,
      className,
      rules,
      size,
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
      rootClassName,
      ...otherProps //todo check every component that uses this not properly
    },
    ref
  ) => {
    const handleNormalize = useCallback((value: any) => {
      if (value == null) return "";
      if (typeof value === "string") {
        return farsiNumberToEnglish(value);
      }
      return value;
    }, []);
    return (
      <FormItem
        label={label}
        className={`${className ? className : ""} custom-otp`}
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
        // normalize={handleNormalize}
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
        normalize={handleNormalize}
      >
        <OTP
          className="text-text-400"
          aria-label={label === null ? "entry label" : label?.toString()}
          //   name={name}
          type={type}
          size={size}
          //   addonBefore={addonBefore}
          //   maxLength={maxLength}
          ref={ref}
          {...otherProps}
        />
      </FormItem>
    );
  }
);

CustomOTP.displayName = "CustomOTP";
export default CustomOTP;
