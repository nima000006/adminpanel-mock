import { getContractBranchTypeResponse } from "@pages/Contract/AddNewContractTemplate/helper/components/ContractsTemplateFinanceCondition/@types/@contractTemplateFinanceCondition";

export type BranchTypeSelectProps = {
  options?: getContractBranchTypeResponse;
  loading?: boolean;
  disabled?: boolean;
  onChange?: (value: unknown) => void;
};
