import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { getToken } from "@infra/services/AuthProvider/helper/authUtil";
import { getFromLocalStorage } from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import {
  LoginResponse,
  SignInGetAdminStaffResponse,
} from "@pages/Auth/SignIn/FifthPage/@types/@signInFifthPage";
import { CreateRoleRequest } from "@pages/Auth/SignIn/FifthPage/helper/components/RoleCard/@types/@roleCard";
import { GetAdminRequestListResponse } from "@pages/Auth/SignIn/FifthPage/helper/components/RoleCard/helper/drawer/RequestRoleDrawerContent/@types/@requestRoleDrawerContentType";
import { ViewUserRoleResponse } from "@pages/Auth/SignIn/FifthPage/helper/components/RoleCard/helper/drawer/ViewRoleDrawerContent/@types/@viewRoleDrawerContentProps";
import { GetRolesStaffListResponse } from "@pages/Auth/SignIn/FifthPage/helper/components/RoleCard/helper/modal/RequestRoleModalContent/@types/@requestRoleModalContentProps";
import {
  GetSajedPositionRequestListResponse,
  SubmitRequestRoleFirstStepRequest,
  SubmitRequestRoleFirstStepResponse,
} from "@pages/Auth/SignIn/FifthPage/helper/drawer/RequestRoleDrawerContent/@types/@requestRoleDrawerContentTypes";
import {
  AuthRequestPositionUploadFileResponse,
  DeleteUploadFileRequest,
} from "@pages/Auth/SignIn/FifthPage/helper/drawer/RequestRoleDrawerContent/helper/modals/SubmitRequestModalContent/helper/steps/UploadDocStep/@types/@uploadDocStepTypes";
import { GetViewRequestResponse } from "@pages/Auth/SignIn/FifthPage/helper/drawer/RequestRoleDrawerContent/helper/modals/ViewRequestModalContent/@types/@viewRequestModalContentTypes";
import {
  AuthSignInFirstStepRequest,
  AuthSignInFirstStepResponse,
} from "@pages/Auth/SignIn/FirstPage/@types/@firstPageTypes";
import {
  AuthSignInFourthStepRequest,
  AuthSignInFourthStepResponse,
} from "@pages/Auth/SignIn/FourthPage/@types/@signInFourthPage";
import {
  AuthSignInSecondStepRequest,
  AuthSignInSecondStepResponse,
} from "@pages/Auth/SignIn/SecondPage/@types/@signInSecondPage";
import { AuthSignInThirdStepRequest } from "@pages/Auth/SignIn/ThirdPage/@types/@signThirdPage";

import { authenticationApi } from "../authenticationApi";

export const signInApis = authenticationApi.injectEndpoints({
  endpoints: (builder) => ({
    signInFirstPage: builder.mutation<
      AuthSignInFirstStepResponse,
      AuthSignInFirstStepRequest
    >({
      query: (body) => ({
        url: "/auth/admin-login/send-otp",
        method: "PUT",
        body,
        headers: {
          Authorization: undefined,
        },
      }),
    }),
    signInSecondPage: builder.mutation<
      AuthSignInSecondStepResponse,
      AuthSignInSecondStepRequest
    >({
      query: (body) => ({
        url: "/auth/admin-login/check-otp",
        method: "PUT",
        body,
        headers: {
          "X-Temporary-Token": getFromLocalStorage("tempInfo") ?? "",
        },
      }),
    }),
    signInThirdPage: builder.mutation<void, AuthSignInThirdStepRequest>({
      query: (body) => ({
        url: "/otp/new-email",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getFromLocalStorage("mainToken")}`,
        },
      }),
    }),
    signInFourthPage: builder.mutation<
      AuthSignInFourthStepResponse,
      AuthSignInFourthStepRequest
    >({
      query: (body) => ({
        url: "/user/email/update",
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getFromLocalStorage("mainToken")}`,
        },
      }),
    }),
    // signInFifthPage: builder.mutation<
    //   AuthSignInFifthStepResponse,
    //   AuthSignInFifthStepRequest
    // >({
    //   query: (body) => ({
    //     url: "/user/email/update",
    //     method: "PUT",
    //     body,
    //     headers: {
    //       "X-Temporary-Token": getFromLocalStorage("tempFourthInfo") ?? "",
    //     },
    //   }),
    // }),
    // GET STAFF
    signInGetAdminStaff: builder.query<SignInGetAdminStaffResponse, { status: number }>({
      query: ({ status }) => ({
        url: `/user-staff/admin-staffs/${status?.toString()}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getFromLocalStorage("mainToken")}`,
        },
      }),
    }),
    signInGetLoginStaff: builder.query<LoginResponse, { staffId: string }>({
      query: ({ staffId }) => ({
        url: `/user/staff/admin/login/${staffId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getFromLocalStorage("mainToken")}`,
        },
      }),
    }),
    createRole: builder.mutation<number, CreateRoleRequest>({
      query: (body) => ({
        url: "/user-staff/send-admin-access-requests",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getFromLocalStorage("mainToken")}`,
        },
      }),
    }),
    viewUserRoleList: builder.query<ViewUserRoleResponse, { id: number }>({
      query: ({ id }) => ({
        url: `/manager/user-roles/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getFromLocalStorage("mainToken")}`,
        },
      }),
    }),
    getAdminRequestList: builder.query<GetAdminRequestListResponse, { staffId: number }>({
      query: ({ staffId }) => ({
        url: `/admin/requests/${staffId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getFromLocalStorage("mainToken")}`,
        },
      }),
    }),

    getViewRequest: builder.query<GetViewRequestResponse, { id: number }>({
      query: ({ id }) => ({
        url: `/employee/request/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(getToken()
            ? { Authorization: `Bearer ${getToken()}` }
            : { Authorization: `Bearer ${getFromLocalStorage("mainToken")}` }),
        },
      }),
    }),

    submitRequestRoleFirstStep: builder.mutation<
      SubmitRequestRoleFirstStepResponse,
      SubmitRequestRoleFirstStepRequest
    >({
      query: (body) => ({
        url: "/employee/request",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getFromLocalStorage("mainToken")}`,
        },
      }),
    }),

    authRequestPositionUploadFile: builder.mutation<
      AuthRequestPositionUploadFileResponse,
      { formData: FormData; id: number }
    >({
      query: ({ formData, id }) => ({
        url: `/employee/request/${id}/upload-file`,
        method: "POST",
        body: formData,
        headers: {
          "Accept-Language": "fa",
          ...(getToken()
            ? { Authorization: `Bearer ${getToken()}` }
            : { Authorization: `Bearer ${getFromLocalStorage("mainToken")}` }),
        },
      }),
    }),

    submitRequestRoleSecondStep: builder.mutation<number, number>({
      query: (id) => ({
        url: `/employee/request/${id}/submit`,
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getFromLocalStorage("mainToken")}`,
        },
      }),
    }),

    authReEstelamSajed: builder.mutation<number, void>({
      query: () => ({
        url: `/user-staff/re-inquiry/sajed`,
        method: "POST",
        headers: {
          ...(getToken()
            ? { Authorization: `Bearer ${getToken()}` }
            : { Authorization: `Bearer ${getFromLocalStorage("mainToken")}` }),
        },
      }),
    }),
    getSajedPositionRequestList: builder.query<GetSajedPositionRequestListResponse, void>(
      {
        query: () => ({
          url: "/employee/request/sajed-self/list",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(getToken()
              ? { Authorization: `Bearer ${getToken()}` }
              : { Authorization: `Bearer ${getFromLocalStorage("mainToken")}` }),
          },
        }),
      }
    ),
    deleteUploadFile: builder.mutation<number, DeleteUploadFileRequest>({
      query: (params) => ({
        url: `/employee/upload-file${createQueryString(params)}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(getToken()
            ? { Authorization: `Bearer ${getToken()}` }
            : { Authorization: `Bearer ${getFromLocalStorage("mainToken")}` }),
        },
      }),
    }),
    getRolesStaffList: builder.query<GetRolesStaffListResponse, { id: number }>({
      query: ({ id }) => ({
        url: `user-staff/non-admin-employee/list/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(getToken()
            ? { Authorization: `Bearer ${getToken()}` }
            : { Authorization: `Bearer ${getFromLocalStorage("mainToken")}` }),
        },
      }),
    }),
  }),
});

export const {
  useSignInFirstPageMutation,
  useSignInSecondPageMutation,
  useSignInThirdPageMutation,
  useSignInFourthPageMutation,
  useLazySignInGetAdminStaffQuery,
  useLazySignInGetLoginStaffQuery,
  useCreateRoleMutation,
  useLazyViewUserRoleListQuery,
  useLazyGetAdminRequestListQuery,
  useLazyGetViewRequestQuery,
  useSubmitRequestRoleFirstStepMutation,
  useAuthRequestPositionUploadFileMutation,
  useSubmitRequestRoleSecondStepMutation,
  useAuthReEstelamSajedMutation,
  useLazyGetSajedPositionRequestListQuery,
  useDeleteUploadFileMutation,
  useLazyGetRolesStaffListQuery,
} = signInApis;
