export type AuthSignInSecondStepResponse = SignInSecondStepNormalResponse;

export type SignInSecondStepNormalResponse = {
  accessToken: {
    access_token: string;
    refresh_token: string;
  };
  hasEmail: boolean;
};
export type SignInSecondStepFinalResponse = {
  accessToken: {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: string;
    id_token: null;
    "not-before-policy": number;
    session_state: string;
    scope: string;
    error: null;
    error_description: null;
    error_uri: null;
  };
  hasEmail: boolean;
};

export type AuthSignInSecondStepRequest = {
  otpCode: string;
};

export type FormType = {
  otp: string;
};
