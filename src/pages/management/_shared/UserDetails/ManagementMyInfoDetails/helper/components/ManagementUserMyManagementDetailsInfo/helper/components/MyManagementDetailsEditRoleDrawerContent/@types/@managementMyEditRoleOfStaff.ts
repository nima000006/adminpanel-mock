export type ManagementMyEditRoleOfStaffRequest = {
  staffId: number;
  roles: string[];
};
export type ManagementMyEditRoleItem = {
  name: string;
  title?: string;
  description?: string;
};
export type ManagementMyRoleGroup = {
  id: string;
  groupId: string;
  groupName?: string;
  item: {
    roles: ManagementMyEditRoleItem[];
  };
};
export type ManagementMyServiceItem = {
  id: string;
  name: string;
  item: {
    id: number;
    title: string;
    name: string;
  };
};

//! APIs
export type MyManagementOverRideUsersRolesRequest = {
  staffId: number;
  roles: string[];
};
