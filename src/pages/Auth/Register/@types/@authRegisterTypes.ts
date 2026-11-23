export type FirstFormType = {
  mobileNumber: string;
};
export type AuthRegistrationFirstStepRequest = {
  mobileNumber: string;
};
export type AuthRegistrationFirstStepResponse = {
  token: string;
};
export type SecondFormType = {
  otp: string;
};
export type AuthRegistrationSecondStepRequest = {
  otpCode: string;
};
export type AuthRegistrationSecondStepResponse = {
  token: string;
};

export type ThirdFormType = {
  nationalCode: string;
  citizensTypeId: number;
  internationalCode?: string;
};
export type AuthRegistrationThirdStepRequest = {
  nationalCode: string;
  citizensTypeId: number;
  internationalCode?: string;
};
export type AuthRegistrationThirdStepResponse = {
  token: string;
};
export type FourthFormType = {
  birthDate: string;
};
export type AuthRegistrationFourthStepRequest = {
  birthDate: string | undefined;
};
export type AuthRegistrationFourthStepResponse = {
  token: string;
};

export type FifthFormType = {
  password: string;
  confirmPassword: string;
};
export type AuthRegistrationFifthStepRequest = {
  password: string;
  confirmPassword: string;
};
export type AuthRegistrationFifthStepResponse = {
  access_token: string;
};
export type AuthRegistrationSixthStepResponse = {
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
  staff: Record<string, unknown>;
};
