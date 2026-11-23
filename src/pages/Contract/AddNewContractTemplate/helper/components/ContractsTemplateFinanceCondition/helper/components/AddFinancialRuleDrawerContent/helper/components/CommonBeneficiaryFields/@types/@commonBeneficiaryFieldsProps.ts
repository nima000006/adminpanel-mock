import {
  getAllBeneficiarySupportResponse,
  getAllPartitionCoefficientTypeByContractIdResponse,
} from "@pages/Contract/AddNewContractTemplate/helper/components/ContractsTemplateFinanceCondition/@types/@contractTemplateFinanceCondition";

export type CommonBeneficiaryFieldsProps = {
  allBeneficiarySupport?: getAllBeneficiarySupportResponse;
  partitionCoefficientType?: getAllPartitionCoefficientTypeByContractIdResponse;
  isGetContractBeneficiaryLoading?: boolean;
  isGetAllPartitionCoefficientTypeByContractIdLoading?: boolean;
};
