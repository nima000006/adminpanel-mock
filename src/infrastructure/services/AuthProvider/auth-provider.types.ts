export type GetUserInfoResponse = {
  genderId: number;
  maritalStatusId: number;
  regionId: number;
  nationalCode: string;
  internationalCode: number;
  passportNumber: number;
  uniqueIdentifier: number;
  najaUniversalId: number;
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
    userListResponseDto: {
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
    employeeCode: string;
    branchId: number;
    branchName: string;
    recordStatus: number;
    createdDateTime: string;
  };
};

export type userType = {
  genderId: number;
  maritalStatusId: null;
  regionId: number;
  nationalCode: string;
  internationalCode: null;
  passportNumber: null;
  uniqueIdentifier: null;
  najaUniversalId: null;
  personalPhoto: null;
  firstName: string;
  enFirstName: null;
  middleName: null;
  lastName: string;
  enLastName: null;
  fatherName: string;
  birthDate: string;
  mobileNumber: string;
  email: string;
  mainImageMinioUrl: null;
  username: string;
  staff: {
    type: null;
    employee: null;
    student: null;
    admin: {
      id: number;
      branchName: string;
      branchId: number;
      employeeDtos: [
        {
          id: number;
          employCode: string;
          serviceName: null;
          roleTitle: null;
          recordStatus: number;
          roles: [
            {
              name: string;
              description: string;
              title: null;
              serviceName: null;
              status: null;
            },
            {
              name: string;
              description: string;
              title: null;
              serviceName: null;
              status: null;
            },
          ];
          createLocalDateTime: string;
        },
      ];
    };
  };
  staffType: number;
};

// LoginParams
export interface LoginParams {
  token: string;
  refreshToken?: string;
  originalPathName?: string;
  needNavigate?: boolean;
}
