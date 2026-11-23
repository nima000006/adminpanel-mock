import { FormInstance } from "antd";

import {
  ContractsTemplateRulesDescMandatoryFormValues,
  TermsItemsTypes,
} from "../../../@types/@contractsTemplateRulesDescMandatoryProps";

export type OptionType = {
  id: number | string;
  title: string;
  value: string;
  label: string;
};

export type ContractSectionProps = {
  data: TermsItemsTypes;
  form: FormInstance<ContractsTemplateRulesDescMandatoryFormValues>;
  setTermsIds: React.Dispatch<
    React.SetStateAction<{
      COMMITMENT: number;
      GUARANTEE: number;
      LIQUIDATED_DAMAGES: number;
      DISPUTE_RESOLUTION: number;
      ACCOUNTING_SETTLEMENT_CONDITION: number;
      TERMINATION_CONDITION: number;
    }>
  >;
};

export type optionsItemTypes = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: {
    id: number;
    type: string;
    clause: string;
    title: string;
    isDefault: false;
    systematic: true;
  };
  code: number;
};

//! APIs
export type ContractTermListByContractTypeType = {
  id: number;
  type: string;
  clause: string;
  title: string;
  isDefault: boolean;
  systematic: boolean;
};

export type GetContractTermListByContractTypeResponse =
  ContractTermListByContractTypeType[];

// Create contract term
export type CreateContractTermResponse = number;

export type CreateContractTermRequest = {
  type: string;
  clause: string;
  faTitle: string;
  enTitle?: string;
  arTitle?: string;
};
