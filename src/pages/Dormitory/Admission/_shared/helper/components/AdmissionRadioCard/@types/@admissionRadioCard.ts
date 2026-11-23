import { ReactNode } from "react";

import { FormInstance } from "antd";
import { Rule } from "antd/es/form";
import { FormItemTooltipType } from "antd/es/form/FormItemLabel";
import { NamePath } from "antd/es/form/interface";

export type AdmissionRadioCardOption = {
  value: string | number;
  title?: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
};

export type AdmissionRadioCardProps = {
  disabled?: boolean;
  form: FormInstance;
  name: NamePath;
  label?: string;
  tooltip?: FormItemTooltipType;
  rules?: Rule[];
  options: AdmissionRadioCardOption[];
  className?: string;
  direction?: "horizontal" | "vertical";
  renderAfterOption?: (option: AdmissionRadioCardOption, selected: boolean) => ReactNode;
};
