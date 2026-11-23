/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  BusinessRequestInformationDetailsResponse,
  BranchBusinessRequestInformationDetailsResponse,
  GetTopChartFilesResponse,
  GetBusinessRequestOwnerInfoResponse,
} from "../../@types/@organizationTypes";

export const BUSINESS_REQUEST_INFORMATION_DETAILS_RESPONSE_MOCK: BusinessRequestInformationDetailsResponse = {
  personalityTypeId: 1,
  personalityTypeTitle: "نمونه personalityTypeTitle",
  businessTempTitle: "نمونه businessTempTitle",
  legalPersonalityGroupTypeId: "30acd599-f0fd-4d67-9593-aab003100e2e",
  businessTempId: 1,
  nationalCodeLegal: "0012345678",
  economicNumberLegal: "economicNumberLegal-mock",
  taxTrackingNumberLegal: "taxTrackingNumberLegal-mock",
  taxType: "taxType-mock",
  businessTitle: "نمونه businessTitle",
  tradeTitle: "نمونه tradeTitle",
  economicNumberNatural: "economicNumberNatural-mock",
  taxTrackingNumberNatural: "taxTrackingNumberNatural-mock",
  licenceNumber: "licenceNumber-mock",
  personalInformation: {
  firstname: "نمونه firstname",
  lastname: "نمونه lastname",
  birthDate: "2026-05-02T10:20:27.741127",
  nationalCode: "0012345678",
  nationality: "0012345678",
  gender: "gender-mock",
  phoneNumber: "09121234567",
},
  filesUrl: {},
};

export const BRANCH_BUSINESS_REQUEST_INFORMATION_DETAILS_RESPONSE_MOCK: BranchBusinessRequestInformationDetailsResponse = {
  branchTitle: "نمونه branchTitle",
  branchType: "branchType-mock",
  branchCode: "0012345678",
  branchMobileNumber: "09121234567",
  branchEmail: "user@example.com",
  branchPhoneNumber: "09121234567",
  province: "province-mock",
  city: "city-mock",
  branchZipCode: "0012345678",
  branchAddress: "branchAddress-mock",
  latitude: 1,
  longitude: 1,
  branchDescription: "نمونه branchDescription",
};

export const GET_TOP_CHART_FILES_RESPONSE_MOCK: GetTopChartFilesResponse = {
  unitMandatoryFileUrl: "https://example.com",
  unitSecondaryFileUrl: "https://example.com",
  branchMandatoryFileUrl: "https://example.com",
  branchSecondaryFileUrl: "https://example.com",
  positionMandatoryFileUrl: "https://example.com",
  positionSecondaryFileUrl: "https://example.com",
  topChartMandatoryFileUrl: "https://example.com",
  topChartSecondaryFileUrl: "https://example.com",
};

export const GET_BUSINESS_REQUEST_OWNER_INFO_RESPONSE_MOCK: GetBusinessRequestOwnerInfoResponse = {
  personalPhoto: "personalPhoto-mock",
  firstName: "نمونه firstName",
  lastName: "نمونه lastName",
  gender: "gender-mock",
  fatherName: "نمونه fatherName",
  birthDate: "2026-05-02T10:20:27.741127",
  nationality: 1,
  nationalCode: "0012345678",
  personalityCode: "0012345678",
  degree: "degree-mock",
  studyField: "studyField-mock",
  mobileNumber: "09121234567",
  email: "user@example.com",
  phoneNumber: "09121234567",
  province: "province-mock",
  city: "city-mock",
  zipCode: "0012345678",
  address: "address-mock",
  activityStartDate: "2026-05-02T10:20:27.741127",
  activityEndDate: "2026-05-02T10:20:27.741127",
};
