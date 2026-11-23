import { FormInstance } from "antd";

export type CreateDormFourthTabProps = {
  form: FormInstance<any>;
  isLoading?: boolean;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  setInstallmentType: React.Dispatch<React.SetStateAction<SelectInstallmentType>>;
  installmentType: SelectInstallmentType;
};

export type SelectInstallmentType = {
  id: number;
  title: string;
};
export type DormPaymentStatusProps = {
  installment: number;
};
export type FourthTabSubmitValues = {
  installment: string;
  firstInstallment: string;
  installmentFirstDate: string;
  secondInstallment: string;
  installmentSecondDate: string;
  thirdInstallment: string;
  installmentThirdDate: string;
};
