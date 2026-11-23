export type SignInGetAdminStaffResponse = AdminStaffType[];
// export type AuthSignInFifthhStepRequest={}

export type AdminStaffType = {
  id: number;
  branchId: number;
  branchName: string;
  recordStatus: {
    id: number;
    name: string;
    title: string;
  };
  employeeDetails: {
    code: string;
    title: string;
  }[];
  status: string;
  requestId: number;
};

export type LoginResponse = {
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
