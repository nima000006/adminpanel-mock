import { FormInstance } from "antd";

export type CostItemElementProps = {
  title: string;
  prefix: number;
  currency: string;
  form: FormInstance<any>;
};
