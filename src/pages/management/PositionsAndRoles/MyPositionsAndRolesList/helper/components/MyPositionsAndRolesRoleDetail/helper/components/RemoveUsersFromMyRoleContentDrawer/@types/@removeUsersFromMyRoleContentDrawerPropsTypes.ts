import { MyUserWithRoles } from "../../../../@types/@myPositionsAndRolesRoleDetail";

export type removeUsersFromMyRoleContentDrawerPropsTypes = {
  onClose: () => void;
  selectedUsers: MyUserWithRoles[];
};

export type MyManagementDeleteUserRolesRequest = {
  staffId: 1;
  roles: string[];
};
export interface MyManagementDeleteUserRolesResponse {
  success: boolean;
  message: string;
}
