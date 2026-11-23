//! APIs
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
  recordStatus: number;
  createLocalDateTime: string;
  manuallyCreated?: boolean;
  positionTitle?: string;
};
export type ManagementUsersAllEmployeesListResponse = {
  content: ManagementUserData[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
export type AllEmployeeListByAdvanceFilterResponse = {
  content: ManagementUserData[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type AllEmployeeListByAdvanceFilterRequest = {
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

//! LAYOUTs
export type AllManagementUserDataType = ManagementUserData & UserResponseDto;
