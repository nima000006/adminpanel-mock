import { getFromLocalStorage } from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import {
  AuthOtpForgetPasswordFirstStepRequest,
  AuthOtpForgetPasswordFirstStepResponse,
  AuthOtpForgetPasswordSecondStepRequest,
  AuthOtpForgetPasswordSecondStepResponse,
  AuthOtpForgetPasswordThirdStepRequest,
  AuthOtpForgetPasswordThirdStepResponse,
  AuthOtpForgetPasswordFourthStepResponse,
  AuthOtpForgetPasswordFourthStepRequest,
} from "@pages/Auth/ForgetPassword/@types/@authForgetPasswordTypes";

import { authenticationApi } from "../authenticationApi";

export const forgetPasswordApis = authenticationApi.injectEndpoints({
  endpoints: (builder) => ({
    forgetPasswordFirst: builder.mutation<
      AuthOtpForgetPasswordFirstStepResponse,
      AuthOtpForgetPasswordFirstStepRequest
    >({
      query: (body) => ({
        url: "/otp/forget-password/phone",
        method: "POST",
        body,
      }),
    }),
    forgetPasswordSecond: builder.mutation<
      AuthOtpForgetPasswordSecondStepResponse,
      AuthOtpForgetPasswordSecondStepRequest
    >({
      query: (body) => ({
        url: "/otp/forget-password/admin/email",
        method: "POST",
        body,
        headers: {
          "X-Temporary-Token": getFromLocalStorage("tempInfo") ?? "",
        },
      }),
    }),
    forgetPasswordThird: builder.mutation<
      AuthOtpForgetPasswordThirdStepResponse,
      AuthOtpForgetPasswordThirdStepRequest
    >({
      query: (body) => ({
        url: "/otp/forget-password/admin/email-validate",
        method: "POST",
        body,
        headers: {
          "X-Temporary-Token": getFromLocalStorage("tempInfo") ?? "",
        },
      }),
    }),
    forgetPasswordFourth: builder.mutation<
      AuthOtpForgetPasswordFourthStepResponse,
      AuthOtpForgetPasswordFourthStepRequest
    >({
      query: (body) => ({
        url: "/otp/forget-password/admin/set-new-password",
        method: "POST",
        body,
        headers: {
          "X-Temporary-Token": getFromLocalStorage("tempInfo") ?? "",
        },
      }),
    }),
  }),
});

export const {
  useForgetPasswordFirstMutation,
  useForgetPasswordSecondMutation,
  useForgetPasswordThirdMutation,
  useForgetPasswordFourthMutation,
} = forgetPasswordApis;
