export type AllRole = {
  name: string;
  description: string | null;
  title: string | null;
  serviceName: string | null;
  status: boolean;
};

export type AllRoleGroup = {
  groupId: string;
  groupName: string;
  title: string;
  roles: AllRole[];
};

export type AllPositionsAndRolesRoleGroupListProps = {
  activeTab: number;
};

export type AllManagementRolesGroupsResponse = AllRoleGroup[];
