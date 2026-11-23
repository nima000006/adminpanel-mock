import { ReactNode } from "react";

import { CheckboxOptionType, ColProps, GetProps, Radio, RadioChangeEvent } from "antd";
import { Rule } from "antd/es/form";
import { FeedbackIcons } from "antd/es/form/FormItem";
import { FormItemTooltipType } from "antd/es/form/FormItemLabel";
import { FormLabelAlign, NamePath, Store } from "antd/es/form/interface";
import { RadioGroupButtonStyle, RadioGroupOptionType } from "antd/es/radio";

import { ShouldUpdate } from "../../../../infrastructure/helpers/GeneralHelpers/generalModel/generalModel";

export type CustomRadioGroupProps = {
  label?: string;
  containerClassName?: string;
  radioClassName?: string;
  options?: (string | number | CheckboxOptionType)[];
  name?: NamePath;
  className?: string;
  rules?: Rule[];
  isLoading?: boolean;
  disabled?: boolean;
  otherProps?: GetProps<typeof Radio.Group>;
  defaultValue?: any;

  //Form Item props
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
  help?: ReactNode;
  // hasCustomOptionsTransformer?: boolean;
  // customOptionsTransformer?: () => { value: string; label: string };
  value?: any;
  onChange?: (e: RadioChangeEvent) => void;
  hasVerticalLabel?: boolean;
  block?: boolean;
  optionType?: RadioGroupOptionType | undefined;
  buttonStyle?: RadioGroupButtonStyle | undefined;
};
