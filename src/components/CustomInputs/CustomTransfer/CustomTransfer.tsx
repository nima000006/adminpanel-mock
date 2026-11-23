import { Form, Transfer } from "antd";

import { CustomTransferProps } from "./@types/@customTransfer";
import {
  farsiNumberToEnglish,
  normalizeText,
} from "../../../infrastructure/helpers/utils";
import { resolveFormFieldHtmlFor } from "../../../infrastructure/helpers/utils/formUtils";
import "./_customTransfer.scss";

const CustomTransfer = ({
  label = "",
  name,
  className,
  rules,
  // form items props
  // htmlFor,
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
  hasFeedback = true,
  getValueFromEvent,
  extra,
  ...props
}: CustomTransferProps) => {
  return (
    <Form.Item
      label={label}
      htmlFor={name ? resolveFormFieldHtmlFor(name) : undefined}
      className={`custom-transfer-container ${className ? className : ""}`}
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
      normalize={(value: any) => farsiNumberToEnglish(value)}
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
      <Transfer
        aria-label={label === null ? "لیبل ورودی ترنسفر" : label?.toString()}
        filterOption={(input, option) => {
          return (
            normalizeText(option?.title as string)?.includes(
              normalizeText(input)?.toLowerCase()
            ) ?? false
          );
        }}
        {...props}
      />
    </Form.Item>
  );
};

export default CustomTransfer;
