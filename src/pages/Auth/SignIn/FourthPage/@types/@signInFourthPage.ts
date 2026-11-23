export type FormType = {
  email: string;
  otp: string;
};
export type AuthSignInFourthStepResponse = {
  token: string;
};
export type AuthSignInFourthStepRequest = {
  email?: string;
  otpCode: string;
};
