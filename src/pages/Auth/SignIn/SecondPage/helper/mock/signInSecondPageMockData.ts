/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  SignInSecondStepNormalResponse,
  SignInSecondStepFinalResponse,
} from "../../@types/@signInSecondPage";

export const SIGN_IN_SECOND_STEP_NORMAL_RESPONSE_MOCK: SignInSecondStepNormalResponse = {
  accessToken: {
  access_token: "access_token-mock",
  refresh_token: "refresh_token-mock",
},
  hasEmail: true,
};

export const SIGN_IN_SECOND_STEP_FINAL_RESPONSE_MOCK: SignInSecondStepFinalResponse = {
  accessToken: {
  access_token: "access_token-mock",
  expires_in: 1,
  refresh_expires_in: 1,
  refresh_token: "refresh_token-mock",
  token_type: "token_type-mock",
  id_token: null,
  session_state: "session_state-mock",
  scope: "scope-mock",
  error: null,
  error_description: null,
  error_uri: null,
},
  hasEmail: true,
};
