/**
 * Test fixtures for authentication flows
 */

export const validCredentials = {
  userName: "1234567890",
  password: "Test@123456",
};

export const invalidCredentials = {
  userName: "",
  password: "",
};

export const validOtp = {
  otp: "1234",
};

export const invalidOtp = {
  otp: "123", // Too short
};

export const mockPhoneNumbers = {
  valid: "09123456789",
  validFormatted: "0912 345 6789",
  withCountryCode: "+989123456789",
};

export const mockTokens = {
  tempToken: "mock-temp-token-12345",
  accessToken: "mock-access-token-67890",
  refreshToken: "mock-refresh-token-abcde",
};

export const mockUserData = {
  withEmail: {
    username: "1234567890",
    email: "user@example.com",
    mobileNumber: "09123456789",
    hasEmail: true,
  },
  withoutEmail: {
    username: "0987654321",
    email: null,
    mobileNumber: "09187654321",
    hasEmail: false,
  },
};

/**
 * Form validation test cases
 */
export const signInFormTestCases = [
  {
    description: "empty username",
    input: { userName: "", password: "Test@123" },
    expectedError: "userName",
  },
  {
    description: "empty password",
    input: { userName: "1234567890", password: "" },
    expectedError: "password",
  },
  {
    description: "both fields empty",
    input: { userName: "", password: "" },
    expectedErrors: ["userName", "password"],
  },
];

/**
 * OTP validation test cases
 */
export const otpTestCases = [
  {
    description: "valid 4-digit OTP",
    input: "1234",
    isValid: true,
  },
  {
    description: "3-digit OTP (too short)",
    input: "123",
    isValid: false,
  },
  {
    description: "5-digit OTP (too long)",
    input: "12345",
    isValid: false,
  },
  {
    description: "non-numeric OTP",
    input: "12a4",
    isValid: false,
  },
  {
    description: "empty OTP",
    input: "",
    isValid: false,
  },
];

/**
 * Navigation test scenarios
 */
export const navigationScenarios = {
  signIn: {
    firstPage: {
      route: "/signin",
      nextPage: "/signin/verify",
    },
    secondPage: {
      route: "/signin/verify",
      nextPageWithEmail: "/signin/final",
      nextPageWithoutEmail: "/signin/email",
      backPage: "/signin",
    },
  },
  register: {
    route: "/register",
  },
  forgotPassword: {
    route: "/forgot-password",
  },
  changeNumber: {
    route: "/change-number",
  },
};

/**
 * localStorage keys used in auth flow
 */
export const storageKeys = {
  tempInfo: "tempInfo",
  tempUser: "tempUser",
  mainToken: "mainToken",
  currentPage: "currentPage",
};

/**
 * Query parameters
 */
export const queryParams = {
  logout: "?reason=logout",
  unauthorized: "?reason=unauthorized",
  mobileNumber: (number: string) => `?mobileNumber=${number}`,
};
