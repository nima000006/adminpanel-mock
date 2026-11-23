import {
  ChangeMobileNumberRequest,
  ChangePasswordRequest,
  GetProfileUserInfoResponse,
  RegisterEmailRequest,
  SendEmailRequest,
  UpdateMobileNumberRequest,
} from "@pages/Auth/Profile/@types/@profile";

import { authenticationApi } from "../authenticationApi";

export const profileApis = authenticationApi.injectEndpoints({
  endpoints: (builder) => ({
    profileUserInfo: builder.query<GetProfileUserInfoResponse, void>({
      query: () => ({
        url: `/user-staff/user-info`,
        method: "GET",
      }),
    }),
    sendEmail: builder.mutation<void, SendEmailRequest>({
      query: (body) => ({
        url: "/otp/new-email",
        method: "POST",
        body,
      }),
    }),
    registerEmail: builder.mutation<number, RegisterEmailRequest>({
      query: (body) => ({
        url: "/user/email/update",
        method: "PUT",
        body,
      }),
    }),
    changeMobileNumber: builder.mutation<void, ChangeMobileNumberRequest>({
      query: (body) => ({
        url: "/otp/phone-number/update/send-otp",
        method: "PUT",
        body,
      }),
    }),
    updateMobileNumber: builder.mutation<number, UpdateMobileNumberRequest>({
      query: (body) => ({
        url: "/user/phone-number/update",
        method: "PUT",
        body,
      }),
    }),
    changePassword: builder.mutation<void, ChangePasswordRequest>({
      query: (body) => ({
        url: "/otp/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLazyProfileUserInfoQuery,
  useSendEmailMutation,
  useRegisterEmailMutation,
  useChangeMobileNumberMutation,
  useUpdateMobileNumberMutation,
  useChangePasswordMutation,
} = profileApis;
