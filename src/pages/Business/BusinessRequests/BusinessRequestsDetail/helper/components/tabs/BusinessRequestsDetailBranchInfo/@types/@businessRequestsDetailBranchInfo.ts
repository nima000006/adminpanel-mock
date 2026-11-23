export type BusinessRequestBranchInformationDetailsResponse = {
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
export type BusinessRequestBranchInformationDetailsParams = {
  businessTempHistoryId: number;
};
