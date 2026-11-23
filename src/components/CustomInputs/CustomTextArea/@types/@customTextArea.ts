import { ReactNode } from "react";

import { ColProps } from "antd";
import { FeedbackIcons } from "antd/es/form/FormItem";
import { FormItemTooltipType } from "antd/es/form/FormItemLabel";
import { FormLabelAlign, NamePath, Store } from "antd/es/form/interface";
import TextArea from "antd/es/input/TextArea";

import { ShouldUpdate } from "../../../../infrastructure/helpers/GeneralHelpers/generalModel/generalModel";

export type CustomTextAreaProps = React.ComponentProps<typeof TextArea> & {
  label?: string;
  /** Supports nested paths — e.g. `[field.name, "description"]` inside `Form.List` */
  name?: NamePath;
  className?: string;
  placeholder?: string;
  rules?: any;
  disabled?: boolean;
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
  hasVerticalLabel?: boolean;
};
