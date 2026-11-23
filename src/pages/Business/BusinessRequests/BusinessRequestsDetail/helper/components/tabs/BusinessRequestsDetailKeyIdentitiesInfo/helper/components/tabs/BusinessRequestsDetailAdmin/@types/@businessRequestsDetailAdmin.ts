export type BusinessRequestAdminInformationDetailsResponse = {
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

export type GetBusinessRequestAdminInformationDetailsParams = {
  businessTempHistoryId: number | string;
};
