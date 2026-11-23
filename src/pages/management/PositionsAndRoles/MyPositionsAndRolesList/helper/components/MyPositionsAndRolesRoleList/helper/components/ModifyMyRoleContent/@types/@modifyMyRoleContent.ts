export type MyManagementUpdateOfUserRequest = {
  oldRoleName: string;
  newRoleName?: string;
  description: string;
  title: string;
  serviceId: 1;
};

export type MyManagementUpdateOfUserResponse = {
  success: boolean;
  message: string;
};

export type MyModifyRoleFormValues = {
  oldRoleName: string;
  newRoleName?: string;
  description: string;
  title: string;
  serviceId: 1;
  eName?: string;
  serviceName?: string;
};
