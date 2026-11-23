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

export type ManagementUsersAllStaffInfoResponse = {
  genderId: number;
  maritalStatusId: number;
  regionId: number;
  nationalCode: string;
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
  staff: Record<string, unknown>[];
  roles: RoleType[];
};
