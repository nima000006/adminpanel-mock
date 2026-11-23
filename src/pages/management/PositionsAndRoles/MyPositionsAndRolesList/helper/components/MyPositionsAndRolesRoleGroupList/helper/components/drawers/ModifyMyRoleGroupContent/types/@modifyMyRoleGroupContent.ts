export type MyManagementUpdateOfUserGroupRequest = {
  groupName: string;
  serviceId: 1;
  title: string;
};

export type MyManagementUpdateOfUserGroupResponse = {
  success: boolean;
  message: string;
};

export type MyModifyRoleFormGroupValues = {
  groupName: string;
  serviceId: 1;
  title: string;
  eName: string;
};
