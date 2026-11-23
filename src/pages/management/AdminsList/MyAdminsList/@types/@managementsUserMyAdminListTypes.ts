export type userResponseDto = {
  id: number;
  firstName: string;
  enFirstName: string;
  lastName: string;
  enLastName: string;
  username: string;
  mobileNumber: string;
  regionId: number;
  region: string;
  email: string;
  createdDateTime: string;
};

export type MyEmployeeDtos = {
  id: number;
  employCode: string;
  serviceName: null;
  roleTitle: null;
  recordStatus: number;
  roles: {
    name: string;
    description: string;
    title: null;
    serviceName: null;
    status: null;
  }[];
  createLocalDateTime: string;
};

export type ManagementMyAdminData = {
  userResponseDto: userResponseDto;
  id: number;
  employCode: string;
  branchId: number;
  branchName: number;
  serviceName: string;
  roleTitle: string;
  recordStatus: number;
  createLocalDateTime: string;
  userStaffId: number;
  employeeDtos: MyEmployeeDtos[];
};

export type ManagementUsersMyAdminListResponse = {
  content: ManagementMyAdminData[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type ManagementUsersMyAdminListAdvanceFilterResponse = {
  content: ManagementMyAdminData[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type ManagementUsersMyAdminListAdvanceFilterRequest = {
  pageNumber: number;
  pageSize: number;
  username?: string;
  mobileNumber?: string;
  branchIds?: number[];
  employeeCode?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
};

export type MyAdminListByAdvanceFilterRequest = {
  username?: string;
  mobileNumber?: string;
  branchIds?: number[];
  employeeCode?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
};
