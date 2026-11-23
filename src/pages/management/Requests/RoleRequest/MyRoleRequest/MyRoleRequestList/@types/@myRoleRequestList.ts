type MyUserResponseDto = {
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

type MyEmployeeResponseDto = {
  userResponseDto: MyUserResponseDto;
  id: number;
  userStaffId: number;
  employeeCode: string;
  branchId: number;
  branchName: string;
  recordStatus: number;
  createdDateTime: string;
};

type MyContentItem = {
  id: number;
  message: string;
  reason: string;
  status: string;
  adminStaffId: number;
  createdDate: string;
  modifiedDate: string;
  modifiedByName: string;
  employeeResponseDto: MyEmployeeResponseDto[];
};

export type MyManagementRoleRequestResponse = {
  content: MyContentItem[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type MyManagementRoleRequestDataSourceType = {
  contentId: number;
  message: string;
  status: string;
} & MyEmployeeResponseDto &
  MyUserResponseDto;

export type MyManagementRoleRequestAdvancedSearchRequest = {
  nationalCode?: string;
  branchCode?: number[];
  mobileNumber?: string;
  firstName?: string;
  lastName?: string;
  statusId?: number;
  pageNo: number;
  pageSize: number;
  employeeCode?: string;
};

export type MyManagementRoleRequestAdvancedSearchUserResponseDto = {
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
export type MyManagementRoleRequestAdvancedSearchEmployeeResponseDto = {
  userResponseDto: MyManagementRoleRequestAdvancedSearchUserResponseDto;
  id: number;
  userStaffId: number;
  employeeCode: string;
  branchId: number;
  branchName: string;
  recordStatus: number;
  createdDateTime: string;
  manuallyCreated: boolean;
};
export type MyManagementRoleRequestAdvancedSearchResponse = {
  content: {
    id: number;
    employeeResponseDto: MyManagementRoleRequestAdvancedSearchEmployeeResponseDto[];
    message: string;
    reason: string;
    status: string;
    createdDate: string;
    modifiedDate: string;
    modifiedByName: string;
    description: string;
    adminStaffId: number;
  }[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
