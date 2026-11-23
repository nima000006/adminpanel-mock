import CalculationMethodSelect from "../CalculationMethodSelect/CalculationMethodSelect";
import PartitionCoefficientInput from "../PartitionCoefficientInput/PartitionCoefficientInput";
import ShareHolderServiceSelect from "../ShareHolderServiceSelect/ShareHolderServiceSelect";
import { CommonBeneficiaryFieldsProps } from "./@types/@commonBeneficiaryFieldsProps";

const CommonBeneficiaryFields = ({
  allBeneficiarySupport,
  partitionCoefficientType,
  isGetContractBeneficiaryLoading,
  isGetAllPartitionCoefficientTypeByContractIdLoading,
}: CommonBeneficiaryFieldsProps) => {
  return (
    <>
      <ShareHolderServiceSelect
        options={allBeneficiarySupport}
        loading={isGetContractBeneficiaryLoading}
      />
      <CalculationMethodSelect
        options={partitionCoefficientType}
        loading={isGetAllPartitionCoefficientTypeByContractIdLoading}
      />
      <PartitionCoefficientInput />
    </>
  );
};

export default CommonBeneficiaryFields;
