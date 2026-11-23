export type RoleItem = {
  name: string;
  description: string;
  title: string;
  serviceName: string;
  status: boolean;
  id: number;
};

export type ManagementMyRolesCustomerResponse = RoleItem[];
