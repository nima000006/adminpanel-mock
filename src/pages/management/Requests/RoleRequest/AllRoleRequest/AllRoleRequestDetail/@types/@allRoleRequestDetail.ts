//! APIs
export type ManagementRoleRequestDetailEmployeeDto = {
  userResponseDto: {
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
  id: number;
  userStaffId: number;
  employeeCode: string;
  branchId: number;
  branchName: string;
  recordStatus: number;
  createdDateTime: string;
  positionTitle: string;
};

export type GetManagementRoleRequestDetailResponse = {
  id: number;
  employeeResponseDto: ManagementRoleRequestDetailEmployeeDto[];
  message: string;
  description: string;
  reason: string;
  status: string;
  adminStaffId: number;
  createdDate: string;
  modifiedDate: string;
  modifiedByName: string;
};
