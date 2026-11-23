import { AllUserWithRoles } from "../../../../@types/@allPositionsAndRolesRoleDetail";

export type removeUsersFromAllRoleContentDrawerPropsTypes = {
  onClose: () => void;
  selectedUsers: AllUserWithRoles[];
  fetchUsers: () => void;
};

export type AdminDeleteRoleRequest = { kcId: string[]; role: string };
