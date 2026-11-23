import { FormInstance } from "antd";

export type CustomSliderProps = {
  onChange?: ((value: number[]) => void) | undefined;
  min?: number;
  max?: number;
  labelMin?: string;
  labelMax?: string;
  name: string;
  form: FormInstance<any>;
};
