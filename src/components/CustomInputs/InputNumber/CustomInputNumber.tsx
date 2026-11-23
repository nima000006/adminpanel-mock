import { ReactNode, forwardRef, useState } from "react";

import { ColProps, Form, GetRef, InputNumber } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Rule } from "antd/es/form";
import { FeedbackIcons } from "antd/es/form/FormItem";
import { FormItemTooltipType } from "antd/es/form/FormItemLabel";
import { FormLabelAlign, NamePath, Store } from "antd/es/form/interface";
import dayjs from "dayjs";

import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";

import { ShouldUpdate } from "../../../infrastructure/helpers/GeneralHelpers/generalModel/generalModel";
import { numberToWordConvertor } from "../../../infrastructure/helpers/NumericHelpers/numericHelper";
import { PriceSeparator } from "../../../infrastructure/helpers/utils";
import { resolveFormFieldHtmlFor } from "../../../infrastructure/helpers/utils/formUtils";

import "./_customInputNumber.scss";

type CustomInputProps = React.ComponentProps<typeof InputNumber> & {
  size?: SizeType;
  isPrice?: boolean;
  addonBefore?: React.ReactNode;
  maxLength?: number | undefined;
  min?: number | undefined;
  autoFocus?: boolean;
  controls?:
    | boolean
    | {
        upIcon?: ReactNode;
        downIcon?: ReactNode;
      }
    | undefined;
  // onChange?: (value: dayjs.Dayjs | null, dateString: string) => void;
  defaultValue?: dayjs.Dayjs;
  use12Hours?: boolean;
  disabled?: boolean;
  //Form Item props
  help?: React.ReactNode;
  label?: string;
  /** Supports nested paths — e.g. `[field.name, "amount"]` inside `Form.List` */
  name?: NamePath;
  placeholder?: string;
  className?: string;
  rules?: Rule[] | undefined;
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
  hasVerticalLabel?: boolean;
};

const CustomInputNumber = forwardRef<GetRef<typeof InputNumber>, CustomInputProps>(
  (
    {
      type = "text",
      className,
      placeholder,
      size,
      addonBefore,
      isPrice,
      maxLength = 16,
      min,
      controls = false,
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
      hasVerticalLabel = true,
      ...props
    },
    ref
  ) => {
    //! In order for label to be in vertical mode use general class "vertical-label"

    const [value, setValue] = useState<number>(initialValue ? initialValue : 0);

    return (
      <div className="custom-input-number-container">
        <CustomTooltip
          trigger={["focus"]}
          title={isPrice ? numberToWordConvertor(value / 10) + " تومان" : ""}
          placement="bottomRight"
          overlayInnerStyle={{
            fontFamily: "DanaFaNum",
          }}
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
            extra={
              isPrice ? (
                <div className="flex flex-col gap-1">
                  <span className="body-regular">
                    {numberToWordConvertor(value / 10) + " تومان"}
                  </span>
                  {extra}
                </div>
              ) : (
                extra
              )
            }
            getValueFromEvent={getValueFromEvent}
          >
            <InputNumber
              formatter={(value: any) => {
                if (isPrice) return PriceSeparator(value);
                return value;
              }}
              id={name}
              aria-label={label === null ? "لیبل ورودی" : label?.toString()}
              name={name}
              placeholder={placeholder}
              type={type}
              size={size}
              controls={controls}
              addonBefore={addonBefore}
              // value={value}
              onChange={(e: any) => (isPrice ? setValue(e) : null)}
              maxLength={maxLength}
              min={min}
              ref={ref}
              {...props}
            />
          </Form.Item>
        </CustomTooltip>
      </div>
    );
  }
);

CustomInputNumber.displayName = "CustomInputNumber";

export default CustomInputNumber;
