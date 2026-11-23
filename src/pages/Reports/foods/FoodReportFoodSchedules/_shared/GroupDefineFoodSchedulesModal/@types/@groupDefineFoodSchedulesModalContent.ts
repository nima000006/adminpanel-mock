import { FormInstance } from "antd";

export type GroupDefineFoodSchedulesModalContentProps = {
  form: FormInstance<{
    multiSelect: number;
  }>;
  hasAlert: boolean;
};
