import { MyManagementRolesGroupsResponse } from "../../../../../@types/@MypositionsAndRolesRoleGroupList";

export type MyManagementOverRideOfUserGroupRequest = {
  groupName: string;
  roles: string[];
};

export type MyManagementOverRideOfUserGroupResponse = void;
export type MyRolesOfGroupsProps = {
  onClose: () => void;
  onSuccess: () => void;
  dataRoleGroups: MyManagementRolesGroupsResponse;
};
