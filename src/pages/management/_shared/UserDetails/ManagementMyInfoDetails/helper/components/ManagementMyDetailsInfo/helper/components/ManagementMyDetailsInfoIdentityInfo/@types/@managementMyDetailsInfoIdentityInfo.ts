export type ManagementMyStaffInfoIdentityInfoListResponse = {
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
  staff: {
    type: number;
    employee: {
      userResponseDto: UserResponseDto;
      id: number;
      employeeCode: string;
      branchId: number;
      branchName: string;
      recordStatus: number;
      createdDateTime: string;
      organizationTitle: string;
      positionTitle: string;
    };
    student: {
      userResponseDto: UserResponseDto;
      id: number;
      studentNumber: string;
      studyFieldId: number;
      studyFieldName: string;
      degreeId: number;
      degreeName: string;
      branchId: number;
      branchName: string;
      recordStatus: number;
      admissionYear: string;
      nationalCode: string;
      birthDate: string;
      admissionTermName: string;
      admissionTermCode: number;
      manuallyCreated: boolean;
      facultyName: string;
    };
    admin: {
      id: number;
      branchName: string;
      branchId: number;
      userResponseDto: UserResponseDto;
      employeeDtos: EmployeeDto[];
    };
  };
  staffType: number;
};

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

export type EmployeeDto = {
  id: number;
  employCode: string;
  serviceName: string;
  positionTitle: string;
  roleTitle: string;
  recordStatus: number;
  roles: Role[];
  createLocalDateTime: string;
};

export type Role = {
  name: string;
  description: string;
  title: string;
  serviceName: string;
  status: boolean;
};
