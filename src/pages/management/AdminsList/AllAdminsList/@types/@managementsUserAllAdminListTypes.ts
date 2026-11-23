//! LAYOUTs
export type CreateAdminFormType = {
  phone: string;
  username: string;
  personnelCode: string;
  email: string;
  birthdate: string;
  branch: {
    label: string;
    title: string;
    value: string;
    key: number;
    item: {
      id: number;
      title: string;
    };
    code: number;
  };
  hireDate: string;
  terminationDate: string;
  password: string;
  confirmPassword: string;
  adminRole: string;
};

//! APIs
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

export type EmployeeDtos = {
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

export type ManagementAllAdminData = {
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
  employeeDtos: EmployeeDtos[];
};

export type ManagementUsersAllAdminListResponse = {
  content: ManagementAllAdminData[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type ManagementUsersAllAdminListAdvanceFilterResponse = {
  content: ManagementAllAdminData[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type ManagementUsersAllAdminListAdvanceFilterRequest = {
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

export type AdminListByAdvanceFilterRequest = {
  username?: string;
  mobileNumber?: string;
  branchIds?: number[];
  employeeCode?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
};

export type ManagementListOfUserWithRolesRequest = {
  password: string;
  confirmPassword: string;
  email: string;
  nationalCode: string;
  branchId: number;
  birthDate: string;
  phoneNumber: string;
  roles: string[];
  hireDate: string;
  terminationDate: string;
  employeeCode: string;
};
