import { FormInstance } from "antd";

type SelectType = {
  key: string;
  value: string;
  title: string;
  name: string;
  code: number;
  item: {
    id: number;
    title: string;
  };
};

export type CreateBranchStepProps = {
  nextStep: () => void;
  prevStep: () => void;
};

export type BranchInfoSectionProps = {
  form: FormInstance<any>;
};
export type CallInfoSectionProps = {
  form: FormInstance<any>;
};

export type CreateBranchInBusinessResponse = { businessTempId: number };
export type CreateBranchInBusinessRequest = {
  branchTitle: string;
  businessTempId: number;
  code: string;
  branchMobileNumber: string;
  branchEmail: string;
  branchPhoneNumber: string;
  regionId: number;
  branchZipCode: string;
  branchAddress: string;
  branchLatitude: number;
  branchLongitude: number;
  branchDescription: string;
};

export type BranchFormType = {
  branchTitle: string;
  branchCode: string;
  mobile: string;
  email: string;
  branchPhone: string;
  city: SelectType;
  postalCode: string;
  address: string;
  description: string;
};
