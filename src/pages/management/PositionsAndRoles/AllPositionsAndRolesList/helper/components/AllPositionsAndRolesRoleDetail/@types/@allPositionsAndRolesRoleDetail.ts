export type AllManagementListOfUserWithRolesRequest = {
  pageNo: number;
  pageSize: number;
  roleName: string;
};

export type AllManagementListOfUserWithRolesResponse = {
  content: AllUserWithRoles[];
  pageNumber: number | null;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
type StaffItem = {
  userResponseDto: unknown | null;
  id: number;
  employeeCode: string;
  branchId: number | null;
  branchName: string | null;
  recordStatus: string | null;
  createdDateTime: string | null;
  manuallyCreated: boolean;
  organizationTitle: string;
  positionTitle: string;
  keyCloakId: string;
};

// type Staff = StaffItem[];
export type AllUserWithRoles = {
  roleName: string;
  genderId: number;
  maritalStatusId: number | null;
  regionId: number;
  nationalCode: string;
  internationalCode: string | null;
  passportNumber: string | null;
  uniqueIdentifier: string | null;
  najaUniversalId: string | null;
  personalPhoto: string | null;
  firstName: string;
  enFirstName: string | null;
  middleName: string | null;
  lastName: string;
  enLastName: string | null;
  fatherName: string;
  birthDate: string;
  mobileNumber: string;
  email: string;
  mainImageMinioUrl: string | null;
  username: string;
  staffTypes: string[];
  staff: StaffItem[];
  roles: string[] | null;
  userId: number;
};
