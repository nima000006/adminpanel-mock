import { UserOption } from "../../UserSelect/@types/@userSelectProps";

export type PersonalBeneficiaryFieldsProps = {
  userOptions?: UserOption[];
  isGetAllUsersListLoading?: boolean;
  onUserSearch?: (value: string) => void;
};
