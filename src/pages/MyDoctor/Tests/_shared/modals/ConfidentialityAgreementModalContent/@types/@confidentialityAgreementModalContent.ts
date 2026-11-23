import { FormInstance } from "antd";

export type ConfidentialityAgreementFormType = {
  fatherName: string;
  agreeTerms: boolean[];
};

export type ConfidentialityAgreementModalContentProps = {
  form: FormInstance<ConfidentialityAgreementFormType>;
};
