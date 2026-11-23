export type UserResponseDto = {
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
export type ManagementUserData = {
  userResponseDto: UserResponseDto;
  id: number;
  employCode: string;
  branchId: number;
  branchName: number;
  serviceName: string;
  // roleTitle: string;
  recordStatus: number;
  createLocalDateTime: string;
};
export type ManagementUsersMyEmployeesListResponse = {
  content: ManagementUserData[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type MyEmployeeListByAdvanceFilterResponse = {
  content: ManagementUserData[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type MyEmployeeListByAdvanceFilterRequest = {
  firstName?: string;
  lastName?: string;
  nationalCode?: string;
  employeeCode?: string;
  pageSize: number;
  pageNumber: number;
  email?: string;
  mobileNumber?: string;
  branchIds?: number[];
};
