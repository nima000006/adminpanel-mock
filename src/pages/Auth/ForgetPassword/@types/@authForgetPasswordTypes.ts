export type FirstFormType = {
  username: string;
};
export type AuthOtpForgetPasswordFirstStepRequest = {
  username: string;
};

export type AuthOtpForgetPasswordFirstStepResponse = {
  token: string;
  mobileNumber: string;
};
export type SecondFormType = {
  otp: string;
};
export type AuthOtpForgetPasswordSecondStepRequest = {
  otp: string;
};

export type AuthOtpForgetPasswordSecondStepResponse = {
  token: string;
  email: string;
};
export type ThirdFormType = {
  otp: string;
};
export type AuthOtpForgetPasswordThirdStepRequest = {
  otp: string;
};

export type AuthOtpForgetPasswordThirdStepResponse = {
  token: string;
};
export type FourthFormType = {
  password: string;
  confirmPassword: string;
};
export type AuthOtpForgetPasswordFourthStepRequest = {
  password: string;
  confirmPassword: string;
};

export type AuthOtpForgetPasswordFourthStepResponse = {
  token: string;
};
