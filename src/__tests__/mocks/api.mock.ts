import { vi } from "vitest";

import {
  AuthSignInFirstStepResponse,
  AuthSignInFirstStepRequest,
} from "@pages/Auth/SignIn/FirstPage/@types/@firstPageTypes";
import {
  SignInSecondStepNormalResponse,
  SignInSecondStepFinalResponse,
} from "@pages/Auth/SignIn/SecondPage/@types/@signInSecondPage";

/**
 * Mock API responses
 */
export const mockSignInFirstPageResponse: AuthSignInFirstStepResponse = {
  token: "mock-temp-token-12345",
  mobileNumber: "09123456789",
};

export const mockSignInSecondPageResponseWithoutEmail: SignInSecondStepNormalResponse = {
  accessToken: {
    access_token: "mock-access-token-12345",
    refresh_token: "mock-refresh-token-12345",
  },
  hasEmail: false,
};

export const mockSignInSecondPageResponseWithEmail: SignInSecondStepFinalResponse = {
  accessToken: {
    access_token: "mock-access-token-67890",
    expires_in: 3600,
    refresh_expires_in: 7200,
    refresh_token: "mock-refresh-token",
    token_type: "Bearer",
    id_token: null,
    "not-before-policy": 0,
    session_state: "mock-session-state",
    scope: "openid profile email",
    error: null,
    error_description: null,
    error_uri: null,
  },
  hasEmail: true,
};

/**
 * Create mock mutation hook
 */
export const createMockMutation = <TResponse, _TRequest = unknown>(
  responseData?: TResponse,
  error?: any
) => {
  const mutationFn = vi.fn();

  const unwrap = vi.fn().mockImplementation(() => {
    if (error) {
      return Promise.reject(error);
    }
    return Promise.resolve(responseData);
  });

  mutationFn.mockReturnValue({ unwrap });

  return [
    mutationFn,
    {
      isLoading: false,
      isSuccess: !error,
      isError: !!error,
      error: error || null,
      data: responseData,
      reset: vi.fn(),
    },
  ];
};

/**
 * Mock useSignInFirstPageMutation
 */
export const mockUseSignInFirstPageMutation = (
  response?: AuthSignInFirstStepResponse,
  error?: any
) => {
  return createMockMutation<AuthSignInFirstStepResponse, AuthSignInFirstStepRequest>(
    response || mockSignInFirstPageResponse,
    error
  );
};

/**
 * Mock useSignInSecondPageMutation
 */
export const mockUseSignInSecondPageMutation = (
  response?: SignInSecondStepNormalResponse | SignInSecondStepFinalResponse,
  error?: any,
  isLoading = false
) => {
  const [mutationFn, result] = createMockMutation<
    SignInSecondStepNormalResponse | SignInSecondStepFinalResponse,
    { otpCode: string }
  >(response || mockSignInSecondPageResponseWithoutEmail, error);

  return [mutationFn, { ...result, isLoading }];
};

/**
 * Mock API error response
 */
export const mockApiError = {
  status: 400,
  data: {
    message: "Invalid credentials",
    error: "Bad Request",
  },
};

export const mockNetworkError = {
  status: "FETCH_ERROR",
  error: "Network request failed",
};

export const mockUnauthorizedError = {
  status: 401,
  data: {
    message: "Unauthorized",
    error: "Authentication failed",
  },
};

/**
 * Create loading state mock
 */
export const createLoadingMock = () => {
  const mutationFn = vi.fn();
  const unwrap = vi.fn().mockReturnValue(new Promise(() => {})); // Never resolves

  mutationFn.mockReturnValue({ unwrap });

  return [
    mutationFn,
    {
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: null,
      data: undefined,
      reset: vi.fn(),
    },
  ];
};
