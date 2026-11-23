import type { userType } from "@infra/services/AuthProvider/auth-provider.types";
import type { AuthSignInFirstStepResponse } from "@pages/Auth/SignIn/FirstPage/@types/@firstPageTypes";
import type { AuthSignInSecondStepResponse } from "@pages/Auth/SignIn/SecondPage/@types/@signInSecondPage";
import type {
  LoginResponse,
  SignInGetAdminStaffResponse,
} from "@pages/Auth/SignIn/FifthPage/@types/@signInFifthPage";

/** Mock admin login credentials (VITE_USE_MOCK=true). */
export const MOCK_AUTH_CREDENTIALS = {
  /** National code / username used on sign-in first page */
  userName: "0012345678",
  password: "Mock@1234",
  otp: "123456",
  mobileNumber: "09123456789",
} as const;

export const MOCK_ACCESS_TOKEN = "mock-admin-access-token";
export const MOCK_REFRESH_TOKEN = "mock-admin-refresh-token";
export const MOCK_TEMP_TOKEN = "mock-admin-temp-token";

export const createMockSignInFirstResponse = (): AuthSignInFirstStepResponse => ({
  token: MOCK_TEMP_TOKEN,
  mobileNumber: MOCK_AUTH_CREDENTIALS.mobileNumber,
});

export const createMockSignInSecondResponse = (): AuthSignInSecondStepResponse => ({
  accessToken: {
    access_token: MOCK_ACCESS_TOKEN,
    refresh_token: MOCK_REFRESH_TOKEN,
  },
  hasEmail: true,
});

export const createMockLoginResponse = (): LoginResponse => ({
  access_token: MOCK_ACCESS_TOKEN,
  expires_in: 28800,
  refresh_expires_in: 2592000,
  refresh_token: MOCK_REFRESH_TOKEN,
  token_type: "Bearer",
  id_token: null,
  "not-before-policy": 0,
  session_state: "mock-session",
  scope: "openid profile",
  error: null,
  error_description: null,
  error_uri: null,
});

export const createMockRefreshResponse = () => ({
  access_token: `${MOCK_ACCESS_TOKEN}-refreshed`,
  refresh_token: MOCK_REFRESH_TOKEN,
});

export const MOCK_ADMIN_STAFF_LIST: SignInGetAdminStaffResponse = [
  {
    id: 1,
    branchId: 10,
    branchName: "شعبه تهران",
    recordStatus: { id: 1, name: "ACTIVE", title: "فعال" },
    employeeDetails: [{ code: "EMP-1001", title: "کارشناس سامانه" }],
    status: "ACTIVE",
    requestId: 0,
  },
];

export const MOCK_USER_INFO: userType = {
  genderId: 1,
  maritalStatusId: null,
  regionId: 10,
  nationalCode: MOCK_AUTH_CREDENTIALS.userName,
  internationalCode: null,
  passportNumber: null,
  uniqueIdentifier: null,
  najaUniversalId: null,
  personalPhoto: null,
  firstName: "علی",
  enFirstName: null,
  middleName: null,
  lastName: "محمدی",
  enLastName: null,
  fatherName: "حسین",
  birthDate: "1990-01-01",
  mobileNumber: MOCK_AUTH_CREDENTIALS.mobileNumber,
  email: "admin.mock@example.com",
  mainImageMinioUrl: null,
  username: MOCK_AUTH_CREDENTIALS.userName,
  staff: {
    type: null,
    employee: null,
    student: null,
    admin: {
      id: 1,
      branchName: "شعبه تهران",
      branchId: 10,
      employeeDtos: [
        {
          id: 1,
          employCode: "EMP-1001",
          serviceName: null,
          roleTitle: null,
          recordStatus: 1,
          roles: [
            {
              name: "ADMIN",
              description: "مدیر سامانه",
              title: null,
              serviceName: null,
              status: null,
            },
            {
              name: "OPERATOR",
              description: "اپراتور",
              title: null,
              serviceName: null,
              status: null,
            },
          ],
          createLocalDateTime: "2026-01-01T00:00:00",
        },
      ],
    },
  },
  staffType: 1,
};
