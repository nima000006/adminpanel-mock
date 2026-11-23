export type RequestRoleDrawerContentProps = {
  closeDrawer: () => void;
  title: string;
  personalNumber: string;
  branchName: string;
  id: number;
};

type employeeResponseDtoType = {
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
  manuallyCreated: boolean;
};

export type GetAdminRequestListItem = {
  id: number;
  employeeResponseDto: employeeResponseDtoType[];
  message: string;
  reason: string;
  status: string;
  createdDate: string;
  modifiedDate: string;
  modifiedByName: string;
  adminStaffId: number;
  description: string;
};

export type GetAdminRequestListResponse = GetAdminRequestListItem[];
