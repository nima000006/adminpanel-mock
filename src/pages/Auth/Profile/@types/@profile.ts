export type GetProfileUserInfoResponse = {
  genderId: number;
  genderTitle: string;
  maritalStatusId: null;
  regionId: number;
  nationalCode: string;
  internationalCode: null;
  passportNumber: null;
  uniqueIdentifier: null;
  najaUniversalId: null;
  personalPhoto: string;
  firstName: string;
  enFirstName: string;
  middleName: null;
  lastName: string;
  enLastName: string;
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
      userStaffId: number;
      branchName: string;
      branchId: number;
      userResponseDto: {
        id: number;
        firstName: string;
        enFirstName: null;
        lastName: string;
        enLastName: null;
        username: string;
        mobileNumber: string;
        regionId: number;
        region: string;
        email: string;
        createdDateTime: string;
      };
      employeeDtos: [
        {
          id: number;
          employCode: string;
          serviceName: null;
          roleTitle: null;
          recordStatus: number;
          roles: {
            name: string;
            description: string;
            title: string;
            serviceName: string;
            status: null;
          }[];
          createLocalDateTime: string;
          positionTitle: string;
        },
      ];
    };
  };
};

export type FormTypeModal = {
  email?: string;
  mobile?: string;
  otp: string;
};

//! APIS
export type SendEmailRequest = {
  email: string;
};

export type RegisterEmailRequest = {
  email?: string;
  otpCode: string;
};

export type ChangeMobileNumberRequest = {
  mobileNumber: string;
};

export type UpdateMobileNumberRequest = {
  mobileNumber?: string;
  otpCode: string;
};
export type ChangePasswordRequest = {
  password: string;
  confirmPassword: string;
  oldPassword: string;
};
