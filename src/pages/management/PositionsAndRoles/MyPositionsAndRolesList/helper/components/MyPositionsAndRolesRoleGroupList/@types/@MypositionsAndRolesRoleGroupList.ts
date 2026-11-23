export type MyRole = {
  name: string;
  description: string | null;
  title: string | null;
  serviceName: string | null;
  status: boolean;
};

export type MyRoleGroup = {
  groupId: string;
  groupName: string;
  title: string;
  roles: MyRole[];
};

export type MyPositionsAndRolesRoleGroupListProps = {
  activeTab: number;
};

export type MyManagementRolesGroupsResponse = MyRoleGroup[];
