import { GetContractsDetailRulesBeneficiariesContentItem } from "@pages/Contract/ContractsList/ContractsDetail/helper/components/ContractsDetailFinancialRules/@types/@getContractsDetailRulesBeneficiaries";

import { addNewContractBeneficiaryOptionTypes } from "../../../../@types/@contractTemplateFinanceCondition";

export type AddFinancialRuleDrawerContentProps = {
  closeDrawerHandler: () => void;
  selectedType: addNewContractBeneficiaryOptionTypes;
  onTypeChange?: (type: addNewContractBeneficiaryOptionTypes) => void;
  onSuccess: () => void;
  editingRecord: GetContractsDetailRulesBeneficiariesContentItem | null;
};
