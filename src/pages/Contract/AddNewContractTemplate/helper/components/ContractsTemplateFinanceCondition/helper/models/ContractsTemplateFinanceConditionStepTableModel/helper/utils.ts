import { addNewContractBeneficiaryOptionTypes } from "../../../../@types/@contractTemplateFinanceCondition";

export enum BeneficiaryTypeEnum {
  REAL = "REAL",
  LEGAL = "LEGAL",
}
export const BENEFICIARY_RULE_TO_TYPE: Record<
  addNewContractBeneficiaryOptionTypes,
  BeneficiaryTypeEnum
> = {
  PERSONAL_DETERMINED: BeneficiaryTypeEnum.REAL,
  PERSONAL_UNDETERMINED: BeneficiaryTypeEnum.REAL,
  GROUPING: BeneficiaryTypeEnum.REAL,
  LEGAL_DETERMINED: BeneficiaryTypeEnum.LEGAL,
  LEGAL_UNDETERMINED: BeneficiaryTypeEnum.LEGAL,
};

export const BENEFICIARY_TYPE_CONFIG: Record<
  BeneficiaryTypeEnum,
  { label: string; color: string }
> = {
  REAL: { label: "حقیقی", color: "orange" },
  LEGAL: { label: "حقوقی", color: "blue" },
};
