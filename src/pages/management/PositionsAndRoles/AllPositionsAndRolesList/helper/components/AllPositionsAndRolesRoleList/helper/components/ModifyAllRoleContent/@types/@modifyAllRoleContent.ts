export type AllManagementUpdateOfUserRequest = {
  oldRoleName: string;
  newRoleName?: string;
  description?: string;
  title: string;
  serviceId: number;
};

export type AllManagementUpdateOfUserResponse = {
  success: boolean;
  message: string;
};

export type SelectOptionTypeEditRole = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: {
    id: number;
    title: string;
    value: string;
    color: string;
    icon: string;
    bgGradient: string;
  };
  code: number;
};

export type AllModifyRoleFormValues = {
  oldRoleName: string;
  title: string;
  eName: string;
  serviceName: SelectOptionTypeEditRole;
  eServiceName: string;
};

export type AllManagementCreateOfUserResponse = {
  success: boolean;
  message: string;
};

export type AllManagementCreateOfUserRequest = {
  roleName: string;
  description?: string;
  title: string;
  serviceId: number;
};
