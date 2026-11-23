import {
  getContractBranchTypeResponse,
  getContractBranchIdResponse,
} from "@pages/Contract/AddNewContractTemplate/helper/components/ContractsTemplateFinanceCondition/@types/@contractTemplateFinanceCondition";
import { GetContractPartiesResponse } from "@pages/Contract/ContractsTemplateList/ContractsTemplateList/@types/ContractsTemplateListTypes";

export type LegalBeneficiaryFieldsProps = {
  contractBusiness?: GetContractPartiesResponse;
  contractBranchType?: getContractBranchTypeResponse;
  contractBranch?: getContractBranchIdResponse;
  isGetContractBusinessLoading?: boolean;
  isGetContractBranchLoading?: boolean;
  isGetContractBranchIdLoading?: boolean;
  isBranchTypeDisabled?: boolean;
  isBranchIdDisabled?: boolean;
  onBusinessChange?: (value: unknown) => void;
  onBranchTypeChange?: (value: unknown) => void;
  showBranch?: boolean;
};
