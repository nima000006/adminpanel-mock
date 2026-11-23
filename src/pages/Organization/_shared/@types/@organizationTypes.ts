export type BusinessRequestInformationDetailsResponse = {
  personalityTypeId: number;
  personalityTypeTitle: string;
  businessTempTitle: string;
  legalPersonalityGroupTypeId: string;
  businessTempId: number;
  nationalCodeLegal: string;
  economicNumberLegal: string;
  taxTrackingNumberLegal: string;
  taxType: string;
  businessTitle: string;
  tradeTitle: string;
  economicNumberNatural: string;
  taxTrackingNumberNatural: string;
  licenceNumber: string;
  personalInformation: {
    firstname: string;
    lastname: string;
    birthDate: string;
    nationalCode: string;
    nationality: string;
    gender: string;
    phoneNumber: string;
  };
  filesUrl: {
    [key: string]: string;
  };
};

export type BusinessRequestInformationDetailsRequest = {
  businessTempHistoryId: number;
};

export type BranchBusinessRequestInformationDetailsResponse = {
  branchTitle: string;
  branchType: string;
  branchCode: string;
  branchMobileNumber: string;
  branchEmail: string;
  branchPhoneNumber: string;
  province: string;
  city: string;
  branchZipCode: string;
  branchAddress: string;
  latitude: number;
  longitude: number;
  branchDescription: string;
};
export type BranchBusinessRequestInformationDetailsRequest = {
  businessTempHistoryId: number;
};

export type GetTopChartFilesResponse = {
  unitMandatoryFileUrl: string;
  unitSecondaryFileUrl: string;
  branchMandatoryFileUrl: string;
  branchSecondaryFileUrl: string;
  positionMandatoryFileUrl: string;
  positionSecondaryFileUrl: string;
  topChartMandatoryFileUrl: string;
  topChartSecondaryFileUrl: string;
};
export type GetTopChartFilesRequest = {
  businessTempHistoryId: number;
};

export type GetBusinessRequestOwnerInfoResponse = {
  personalPhoto: string;
  firstName: string;
  lastName: string;
  gender: string;
  fatherName: string;
  birthDate: string;
  nationality: number;
  nationalCode: string;
  personalityCode: string;
  degree: string;
  studyField: string;
  mobileNumber: string;
  email: string;
  phoneNumber: string;
  province: string;
  city: string;
  zipCode: string;
  address: string;
  activityStartDate: string;
  activityEndDate: string;
};
export type GetBusinessRequestOwnerInfoRequest = {
  businessTempHistoryId: number;
};
