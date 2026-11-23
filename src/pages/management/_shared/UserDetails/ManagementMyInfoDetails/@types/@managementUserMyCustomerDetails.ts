export type StaffType = {
  id: number;
  name: string;
  title: string;
};

export type RoleType = {
  name: string;
  description: string;
  title: string;
  serviceName: string;
  status: boolean;
};
export type UserResponseDto = {
  id: number;
  firstName: string;
  enFirstName: string | null;
  lastName: string;
  enLastName: string | null;
  username: string;
  mobileNumber: string;
  regionId: number | null;
  region: string | null;
  email: string | null;
  createdDateTime: string | null;
};

export type StaffMember = {
  userResponseDto: UserResponseDto;
  id: number;
  studentNumber: string;
  studyFieldId: number;
  studyFieldName: string | null;
  degreeId: number | null;
  degreeName: string | null;
  branchId: number;
  branchName: string | null;
  recordStatus: number;
  admissionYear: string;
  nationalCode: string | null;
  birthDate: string | null;
  manuallyCreated: boolean;
};

export type ManagementMyStaffInfoListResponse = {
  genderId: number;
  maritalStatusId: number;
  regionId: number;
  nationalCode: string;
  createdDate: string;
  internationalCode: string;
  passportNumber: string;
  uniqueIdentifier: string;
  najaUniversalId: string;
  personalPhoto: string;
  firstName: string;
  enFirstName: string;
  middleName: string;
  lastName: string;
  enLastName: string;
  fatherName: string;
  birthDate: string;
  mobileNumber: string;
  email: string;
  mainImageMinioUrl: string;
  username: string;
  staffTypes: StaffType[];
  staff: (StaffMember | null)[];
  roles: RoleType[];
};
export type ManagementMyStaffTypesInfoListsResponse = [{ id: number; title: string }];
