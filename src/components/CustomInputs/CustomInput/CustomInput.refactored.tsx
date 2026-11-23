import { ComponentRef, forwardRef, useCallback, useId, useMemo } from "react";

import { Form, Input } from "antd";

import { CustomInputProps } from "./@types/@customInput";
import { farsiNumberToEnglish } from "../../../infrastructure/helpers/utils";

import type { InputProps } from "antd";

import "./_customInput.scss";

/**
 * A wrapper around Ant Design's Input and Form.Item components with additional features:
 * - Automatic Farsi number normalization (optional)
 * - Proper accessibility with stable IDs
 * - Vertical/horizontal label layout
 * - Type-safe prop separation
 */
const CustomInput = forwardRef<ComponentRef<typeof Input>, CustomInputProps>(
  (
    {
      // Form.Item props
      label,
      name,
      rules,
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
      messageVariables,
      labelCol,
      labelAlign = "right",
      initialValue,
      hidden = false,
      help,
      hasFeedback = false,
      getValueProps,
      extra,
      getValueFromEvent,

      // Input props
      type = "text",
      placeholder,
      size,
      addonBefore,
      maxLength,
      autoComplete,
      allowClear,
      prefix,
      suffix,
      disabled,
      readOnly,
      onPressEnter,
      onFocus,
      onBlur,
      onChange,

      // Custom props
      hasVerticalLabel = true,
      rootClassName,
      normalizeFarsiNumbers = true,
      ariaLabel,

      ...otherProps
    },
    ref
  ) => {
    const inputId = useId();
    const errorId = `${inputId}-error`;
    const descriptionId = help ? `${inputId}-description` : undefined;

    // Stable normalize function
    const normalizeFunction = useCallback(
      (value: unknown): string => {
        if (value == null) return "";
        const stringValue = String(value);
        return normalizeFarsiNumbers ? farsiNumberToEnglish(stringValue) : stringValue;
      },
      [normalizeFarsiNumbers]
    );

    // Auto-detect inputMode for better mobile UX
    const inputMode = useMemo((): InputProps["inputMode"] => {
      switch (type) {
        case "number":
          return "numeric";
        case "tel":
          return "tel";
        case "email":
          return "email";
        case "url":
          return "url";
        case "search":
          return "search";
        default:
          return undefined;
      }
    }, [type]);

    // Container classes
    const containerClasses = useMemo(
      () =>
        ["custom-input-container", hasVerticalLabel && "vertical-label", rootClassName]
          .filter(Boolean)
          .join(" "),
      [hasVerticalLabel, rootClassName]
    );

    // Accessibility attributes
    const hasError = validateStatus === "error";
    const ariaDescribedBy =
      [hasError ? errorId : undefined, descriptionId].filter(Boolean).join(" ") ||
      undefined;

    return (
      <div className={containerClasses}>
        <Form.Item
          label={label}
          htmlFor={inputId}
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
          normalize={normalizeFarsiNumbers ? normalizeFunction : undefined}
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
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            placeholder={placeholder}
            size={size}
            maxLength={maxLength}
            addonBefore={addonBefore}
            autoComplete={autoComplete}
            allowClear={allowClear}
            prefix={prefix}
            suffix={suffix}
            disabled={disabled}
            readOnly={readOnly}
            inputMode={inputMode}
            onPressEnter={onPressEnter}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            // Accessibility
            aria-label={label ? undefined : ariaLabel || "Input field"}
            aria-labelledby={label ? `${inputId}-label` : undefined}
            aria-invalid={hasError}
            aria-describedby={ariaDescribedBy}
            {...otherProps}
          />
        </Form.Item>
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
