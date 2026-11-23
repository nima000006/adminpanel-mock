export type ViewRoleDrawerContentProps = {
  closeDrawer: () => void;
  title: string;
  personalNumber: string;
  branchName: string;
  id: number;
  segmentStatus: number;
};

export type ViewUserRoleResponseItem = {
  name: string;
  description: string;
  title: string;
  serviceName: string;
  status: boolean;
};
export type ViewUserRoleResponse = ViewUserRoleResponseItem[];
