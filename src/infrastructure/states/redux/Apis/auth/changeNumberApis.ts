import { getFromLocalStorage } from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import {
  AuthChangeNumberFirstStepRequest,
  AuthChangeNumberFirstStepResponse,
} from "@pages/Auth/ChangePhoneNumber/FirstPage/@types/@changeNumberFirstPage";
import {
  AuthChangeNumberSecondStepRequest,
  AuthChangeNumberSecondStepResponse,
} from "@pages/Auth/ChangePhoneNumber/SecondPage/@types/@changeNumberSecondPage";
import { AuthChangeNumberThirdStepRequest } from "@pages/Auth/ChangePhoneNumber/ThirdPage/@types/@changeNumberThirdPage.scss";

import { authenticationApi } from "../authenticationApi";

export const changeNumberApis = authenticationApi.injectEndpoints({
  endpoints: (builder) => ({
    changeNumberFirstPage: builder.mutation<
      AuthChangeNumberFirstStepResponse,
      AuthChangeNumberFirstStepRequest
    >({
      query: (body) => ({
        url: "/auth/phone-number/change/username",
        method: "PUT",
        body,
      }),
    }),
    changeNumberSecondPage: builder.mutation<
      AuthChangeNumberSecondStepResponse,
      AuthChangeNumberSecondStepRequest
    >({
      query: (body) => ({
        url: "/auth/phone-number/change/new-phone-number",
        method: "PUT",
        body,
        headers: {
          "X-Temporary-Token": getFromLocalStorage("tempInfo") ?? "",
        },
      }),
    }),
    changeNumberThirdPage: builder.mutation<number, AuthChangeNumberThirdStepRequest>({
      query: (body) => ({
        url: "/auth/phone-number/change/confirm-otp",
        method: "PUT",
        body,
        headers: {
          "X-Temporary-Token": getFromLocalStorage("tempInfo") ?? "",
        },
      }),
    }),
  }),
});

export const {
  useChangeNumberFirstPageMutation,
  useChangeNumberSecondPageMutation,
  useChangeNumberThirdPageMutation,
} = changeNumberApis;
