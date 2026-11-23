type UserResponseDto = {
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

type EmployeeResponseDto = {
  userResponseDto: UserResponseDto;
  id: number;
  employeeCode: string;
  branchId: number;
  branchName: string;
  recordStatus: number;
  createdDateTime: string;
};

type ContentItem = {
  id: number;
  message: string;
  reason: string;
  status: string;
  adminStaffId: number;
  createdDate: string;
  modifiedDate: string;
  modifiedByName: string;
  employeeResponseDto: EmployeeResponseDto[];
};

export type ManagementRoleRequestResponse = {
  content: ContentItem[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type ManagementRoleRequestDataSourceType = {
  contentId: number;
  message: string;
  status: string;
} & EmployeeResponseDto &
  UserResponseDto;

export type ManagementRoleRequestAdvancedSearchRequest = {
  nationalCode?: string;
  branchCode?: string;
  mobileNumber?: string;
  firstName?: string;
  lastName?: string;
  statusId?: number;
  pageNo: number;
  pageSize: number;
  employeeCode?: string;
};

export type ManagementRoleRequestAdvancedSearchUserResponseDto = {
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
export type ManagementRoleRequestAdvancedSearchEmployeeResponseDto = {
  userResponseDto: ManagementRoleRequestAdvancedSearchUserResponseDto;
  id: number;
  userStaffId: number;
  employeeCode: string;
  branchId: number;
  branchName: string;
  recordStatus: number;
  createdDateTime: string;
  manuallyCreated: boolean;
};
export type ManagementRoleRequestAdvancedSearchResponse = {
  content: {
    id: number;
    employeeResponseDto: ManagementRoleRequestAdvancedSearchEmployeeResponseDto[];
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
