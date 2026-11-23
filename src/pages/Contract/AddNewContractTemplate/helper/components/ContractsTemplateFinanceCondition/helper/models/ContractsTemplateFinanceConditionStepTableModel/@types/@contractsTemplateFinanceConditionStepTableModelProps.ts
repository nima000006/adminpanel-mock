import { GetContractsDetailRulesBeneficiariesContentItem } from "@pages/Contract/ContractsList/ContractsDetail/helper/components/ContractsDetailFinancialRules/@types/@getContractsDetailRulesBeneficiaries";

export type ContractsTemplateFinanceConditionStepTableModelProps = {
  onEdit: (record: GetContractsDetailRulesBeneficiariesContentItem) => void;
  onDelete: (record: GetContractsDetailRulesBeneficiariesContentItem) => void;
};
