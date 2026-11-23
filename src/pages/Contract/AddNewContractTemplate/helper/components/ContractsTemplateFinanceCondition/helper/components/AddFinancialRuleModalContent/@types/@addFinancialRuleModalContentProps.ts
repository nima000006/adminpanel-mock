import { addNewContractBeneficiaryOptionTypes } from "../../../../@types/@contractTemplateFinanceCondition";

export type AddFinancialRuleModalContentProps = {
  selectedType?: addNewContractBeneficiaryOptionTypes;
  onTypeChange?: (type: addNewContractBeneficiaryOptionTypes) => void;
};
