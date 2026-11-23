import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ContractTemplateServiceType = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: IdTitleName;
  code: number;
};

export type SelectOptionType = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: IdTitleName;
  code: number;
};

export type PartiFields = {
  [key: `parti${number}`]: SelectOptionType;
};

export type ContractsTemplateInfoFormType = {
  ecosystem: SelectOptionType;
  templateService: SelectOptionType;
  services: SelectOptionType[];
  startDate: string;
  financeConditionType: SelectOptionType[];
  templateTitle: string;
  subject: string;
} & PartiFields;

//! APIs
export type CreateContractTemplateBasicInfoResponse = number;

export type CreateContractTemplateBasicInfoRequest = {
  ecosystemId: number;
  service: string;
  categories: number[];
  parties: number[];
  start: string;
  title: string;
  subject: string;
  partitionCoefficientType: string[];
};

export type UpdateContractTemplateBasicInfoRequest = {
  contractId: number;
  body: CreateContractTemplateBasicInfoRequest;
};

export type getCategoryByServiceListItem = {
  categoryId: number;
  categoryName: string;
  title: string;
  isSelectable: boolean;
  isSellable: boolean;
};
export type getCategoryByServiceListResponse = getCategoryByServiceListItem[];
