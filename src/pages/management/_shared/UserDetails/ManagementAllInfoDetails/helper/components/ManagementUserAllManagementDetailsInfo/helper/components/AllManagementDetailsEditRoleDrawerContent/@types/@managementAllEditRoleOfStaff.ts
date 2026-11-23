export type ManagementAllEditRoleOfStaffRequest = {
  staffId: number;
  roles: string[];
};
export type ManagementAllEditRoleItem = {
  name: string;
  title?: string;
  description?: string;
};
export type ManagementAllRoleGroup = {
  id: string;
  groupId: string;
  groupName?: string;
  item: {
    roles: ManagementAllEditRoleItem[];
  };
};
export type ManagementAllServiceItem = {
  id: string;
  title: string;
  name: string;
  item: {
    id: number;
    title: string;
    name: string;
  };
};

//! APIs
export type ManagementOverRideUsersRolesRequest = {
  staffId: number;
  roles: string[];
};
