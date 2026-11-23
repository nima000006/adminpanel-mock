import { forwardRef } from "react";

import { Form, GetRef, Select } from "antd";

import { CustomSelectProps, SelectedOption } from "./@types/@customSelect";
import {
  defaultSelectTransformOptions,
  normalizeText,
} from "../../../infrastructure/helpers/utils";
import { resolveFormFieldHtmlFor } from "../../../infrastructure/helpers/utils/formUtils";
import "./_customSelect.scss";

const CustomSelect = forwardRef<GetRef<typeof Select>, CustomSelectProps>(
  (
    {
      label,
      name,
      className,
      options = [],
      onChange,
      rules,
      isLoading,
      onClick,
      mode,
      disabled = false,
      transformOptions = defaultSelectTransformOptions,
      form,
      maxTagCount,

      // Form Items
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
      // Select props
      placeholder = "انتخاب کنید",
      notFoundContent,
      hasVerticalLabel = true,
      skipFormOnChange = false,
      // emptyText = "داده‌ای یافت نشد",
      ...otherProps
    },
    ref
  ) => {
    return (
      <Form.Item
        label={label}
        htmlFor={resolveFormFieldHtmlFor(name)}
        className={`custom-select-container ${hasVerticalLabel && "vertical-label"} ${className ? className : ""}`}
        name={name}
        rules={rules}
        // Form Items

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
        <Select
          notFoundContent={notFoundContent}
          placeholder={placeholder}
          aria-label={typeof label === "string" ? label : name}
          // labelRender={(props) => {
          //   console.log({ props });
          //   console.log({ form: form?.getFieldsValue() });
          //   const label = skipFormOnChange ? props?.label : "saman";
          //   console.log({ label });
          //   return label;
          // }}
          onChange={
            ((_: any, option: SelectedOption[] | SelectedOption) => {
              if (!skipFormOnChange && form) {
                form.setFieldValue(name, option);
              }

              onChange?.(_, option);
            }) as any
          }
          loading={isLoading}
          onClick={onClick}
          mode={mode}
          showSearch
          disabled={disabled}
          maxTagCount={maxTagCount}
          filterOption={(input, option) => {
            if (!option?.label || !input) return false;
            const normalizedLabel = normalizeText(String(option.label));
            const normalizedInput = normalizeText(String(input).toLowerCase());
            if (!normalizedLabel || !normalizedInput) return false;
            return normalizedLabel.includes(normalizedInput);
          }}
          options={transformOptions(options)?.map(
            ({ value, label, key, item, disabled, className, title, code }) => {
              return {
                // children, // built in into antd
                className, // built in into antd
                disabled, // built in into antd
                label, // built in into antd
                title, // built in into antd
                value, // built in into antd
                key, //! added by us
                item, //! added  by us
                code, //! added  by us
              };
            }
          )}
          ref={ref}
          {...otherProps}
        >
          {/* {transformOptions(options)?.map(({ value, label, key, item, disabled }) => {
            return (
              <Select.Option
                name={name}
                key={value}
                value={value}
                code={key}
                item={item}
                disabled={disabled}
              >
                {label}
              </Select.Option>
            );
          })} */}
        </Select>
      </Form.Item>
    );
  }
);

CustomSelect.displayName = "CustomSelect";
export default CustomSelect;
