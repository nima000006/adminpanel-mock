import { FormInstance } from "antd";

import { UpdateDormFactorFormProps } from "../../../../../../../@types/@dormFactors";

//! LAYOUT
export type InputFactorSectionProps = {
  totalValue?: number;
  form: FormInstance<UpdateDormFactorFormProps>;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
};
