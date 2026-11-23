//! LAYOUTs

import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ContractsTemplateRulesDescMandatoryFormValues = {
  // Select fields
  commitment?: string;
  guarantee?: string;
  liquidatedDamages?: string;
  disputeResolution?: string;
  accountingSettlementCondition?: string;
  terminationCondition?: string;
  // Textarea fields
  obligations?: string;
  warrantyObligations?: string;
  crimesAndDamages?: string;
  crimesAndDamagesDifferences?: string;
  paymentAndSettlementConditions?: string;
  cancellationConditions?: string;
};

export type TermsItemsTypes = {
  dividerText: string;
  select: {
    name: string;
    label: string;
    placeholder: string;
    className: string;
    options: IdTitle[];
  };
  textArea: {
    name: string;
    label: string;
    placeholder: string;
    rows: number;
    defaultValue: string;
  };
  termType: string;
};

//! APIs
type ContractDefaultTermType = {
  id: number;
  type: string;
  clause: string;
  title: string;
  isDefault: boolean;
  systematic: boolean;
};

export type GetContractDefaultTermListResponse = {
  commitment: ContractDefaultTermType;
  guarantee: ContractDefaultTermType;
  liquidatedDamages: ContractDefaultTermType;
  disputeResolution: ContractDefaultTermType;
  accountingSettlementCondition: ContractDefaultTermType;
  terminationCondition: ContractDefaultTermType;
  specialCondition: ContractDefaultTermType;
};

export type AddRequiredTermsToContractRequest = {
  body: {
    commitments: number;
    guarantees: number;
    liquidatedDamages: number;
    disputedResolution: number;
    accountingSettlementConditions: number;
    terminationConditions: number;
  };
  id: number;
};
