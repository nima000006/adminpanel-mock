import { FormInstance } from "antd";
import { Rule } from "antd/es/form";

export type CustomSliderWithInputProps = {
  name: string;
  leftSideLabel?: string;
  rightSideLabel?: string;
  minValue: number;
  maxValue: number;
  step?: number;
  form?: FormInstance<any>;
  label?: string;
  className?: string;
  rules?: Rule[];
};
