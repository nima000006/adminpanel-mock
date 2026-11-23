export type FormType = {
  userName: string;
  password: string;
};

export type AuthSignInFirstStepResponse = {
  token: string;
  mobileNumber: string;
};
export type AuthSignInFirstStepRequest = {
  username: string;
  password: string;
};
