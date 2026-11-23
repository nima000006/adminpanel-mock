import UserSelect from "../UserSelect/UserSelect";
import { PersonalBeneficiaryFieldsProps } from "./@types/@personalBeneficiaryFieldsProps";

const PersonalBeneficiaryFields = ({
  userOptions,
  isGetAllUsersListLoading,
  onUserSearch,
}: PersonalBeneficiaryFieldsProps) => {
  return (
    <UserSelect
      options={userOptions}
      loading={isGetAllUsersListLoading}
      onSearch={onUserSearch}
    />
  );
};

export default PersonalBeneficiaryFields;
