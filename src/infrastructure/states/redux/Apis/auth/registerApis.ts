import { getFromLocalStorage } from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import {
  AuthRegistrationFifthStepRequest,
  AuthRegistrationFifthStepResponse,
  AuthRegistrationFirstStepRequest,
  AuthRegistrationFirstStepResponse,
  AuthRegistrationFourthStepRequest,
  AuthRegistrationFourthStepResponse,
  AuthRegistrationSecondStepRequest,
  AuthRegistrationSecondStepResponse,
  AuthRegistrationSixthStepResponse,
  AuthRegistrationThirdStepRequest,
  AuthRegistrationThirdStepResponse,
} from "@pages/Auth/Register/@types/@authRegisterTypes";

import { authenticationApi } from "../authenticationApi";

export const registerApis = authenticationApi.injectEndpoints({
  endpoints: (builder) => ({
    registerStepFirst: builder.mutation<
      AuthRegistrationFirstStepResponse,
      AuthRegistrationFirstStepRequest
    >({
      query: (body) => ({
        url: "/auth/register/send-otp",
        method: "POST",
        body,
      }),
    }),
    registerStepSecond: builder.mutation<
      AuthRegistrationSecondStepResponse,
      AuthRegistrationSecondStepRequest
    >({
      query: (body) => ({
        url: "/auth/register/check-otp",
        method: "PUT",
        body,
        headers: {
          "X-Temporary-Token": getFromLocalStorage("tempInfo") ?? "",
        },
      }),
    }),
    registerStepThird: builder.mutation<
      AuthRegistrationThirdStepResponse,
      AuthRegistrationThirdStepRequest
    >({
      query: (body) => ({
        url: "/auth/register/basic-information/national",
        method: "PUT",
        body,
        headers: {
          "X-Temporary-Token": getFromLocalStorage("tempInfo") ?? "",
        },
      }),
    }),
    registerStepFourth: builder.mutation<
      AuthRegistrationFourthStepResponse,
      AuthRegistrationFourthStepRequest
    >({
      query: (body) => ({
        url: "/auth/register/basic-information/birthdate",
        method: "PUT",
        body,
        headers: {
          "X-Temporary-Token": getFromLocalStorage("tempInfo") ?? "",
        },
      }),
    }),
    registerStepFifth: builder.mutation<
      AuthRegistrationFifthStepResponse,
      AuthRegistrationFifthStepRequest
    >({
      query: (body) => ({
        url: "/auth/register/set-password",
        method: "PUT",
        body,
        headers: {
          "X-Temporary-Token": getFromLocalStorage("tempInfo") ?? "",
        },
      }),
    }),
    registerStepSixth: builder.query<AuthRegistrationSixthStepResponse, void>({
      query: () => ({
        url: "/user-staff/user-info",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getFromLocalStorage("mainToken")}`,
        },
      }),
    }),
  }),
});
export const {
  useRegisterStepFirstMutation,
  useRegisterStepSecondMutation,
  useRegisterStepThirdMutation,
  useRegisterStepFourthMutation,
  useRegisterStepFifthMutation,
  useLazyRegisterStepSixthQuery,
} = registerApis;
