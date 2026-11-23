import { AllManagementRolesGroupsResponse } from "../../../../../@types/@allPositionsAndRolesRoleGroupList";

export type AllManagementOverRideOfUserGroupRequest = {
  groupName: string;
  roles: string[];
};

export type AllManagementOverRideOfUserGroupResponse = void;
export type AllRolesOfGroupsProps = {
  onClose: () => void;
  onSuccess: () => void;
  dataRoleGroups: AllManagementRolesGroupsResponse;
};
