import { GetContractsDetailRulesBeneficiariesContentItem } from "@pages/Contract/ContractsList/ContractsDetail/helper/components/ContractsDetailFinancialRules/@types/@getContractsDetailRulesBeneficiaries";

export type EditingRecordExtended = GetContractsDetailRulesBeneficiariesContentItem & {
  username?: string;
  user?: string;
  branch?: string;
};
