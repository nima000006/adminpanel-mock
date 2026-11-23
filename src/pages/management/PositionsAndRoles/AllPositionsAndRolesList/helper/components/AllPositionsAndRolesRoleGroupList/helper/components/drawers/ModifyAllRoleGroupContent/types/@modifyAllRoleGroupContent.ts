export type AllManagementUpdateOfUserGroupRequest = {
  groupName: string;
  serviceId: 1;
  title: string;
};

export type AllManagementUpdateOfUserGroupResponse = {
  success: boolean;
  message: string;
};

export type AllModifyRoleFormGroupValues = {
  groupName: string;
  serviceId: 1;
  title: string;
  eName: string;
};
