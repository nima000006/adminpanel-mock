import BranchSelect from "../BranchSelect/BranchSelect";
import BranchTypeSelect from "../BranchTypeSelect/BranchTypeSelect";
import BusinessSelect from "../BusinessSelect/BusinessSelect";
import { LegalBeneficiaryFieldsProps } from "./@types/@legalBeneficiaryFieldsProps";

const LegalBeneficiaryFields = ({
  contractBusiness,
  contractBranchType,
  contractBranch,
  isGetContractBusinessLoading,
  isGetContractBranchLoading,
  isGetContractBranchIdLoading,
  isBranchTypeDisabled,
  isBranchIdDisabled,
  onBusinessChange,
  onBranchTypeChange,
  showBranch = false,
}: LegalBeneficiaryFieldsProps) => {
  return (
    <>
      <BusinessSelect
        options={contractBusiness}
        loading={isGetContractBusinessLoading}
        onChange={onBusinessChange}
      />
      <BranchTypeSelect
        options={contractBranchType}
        loading={isGetContractBranchLoading}
        disabled={isBranchTypeDisabled}
        onChange={onBranchTypeChange}
      />
      {showBranch && (
        <BranchSelect
          options={contractBranch}
          loading={isGetContractBranchIdLoading}
          disabled={isBranchIdDisabled}
        />
      )}
    </>
  );
};

export default LegalBeneficiaryFields;
