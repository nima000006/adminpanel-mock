import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";
import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { getToken } from "@infra/services/AuthProvider/helper/authUtil";
import {
  GetUserByPhoneOrUserNameRequest,
  GetUserByPhoneOrUserNameResponse,
  RetryEstelaamWithCredRequest,
  RetryEstelaamWithCredResponse,
  UpdateUserByUnitMangerRequest,
  UpdateUserByUnitMangerResponse,
} from "@pages/Business/MyUsers/@types/@myUsers";
import {
  GetStudentListByUsernameAndStudentNumberRequest,
  GetStudentListByUsernameAndStudentNumberResponse,
} from "@pages/Dorm/Requests/helpers/components/ManualRegisterStudentModalContent/@types/@manualRegisterStudentModalContentTypes";
import {
  ReInquiryEmployeeRequest,
  ReInquiryEmployeeResponse,
  ReInquiryStudentRequest,
  ReInquiryStudentResponse,
} from "@pages/management/_shared/UserDetails/ManagementAllInfoDetails/@types/@managementUserAllCustomerDetails";
import {
  UpdateUserInfoRequest,
  UpdateUserInfoResponse,
} from "@pages/management/_shared/UserDetails/ManagementAllInfoDetails/helper/components/ManagementAllDetailsInfo/helper/components/ManagementAllDetailsInfoIdentityInfo/@types/@managementAllDetailsInfoIdentityInfo";
import { GetSajedInquiriesResponse } from "@pages/management/CustomersList/AllCustomersList/@types/@managementUsersAllCustomersListTypes";
import {
  GetConfidentialityAgreementDataResponse,
  SendConfidentialityAgreementDataResponse,
} from "@pages/MyDoctor/Tests/TestsList/AllTestList/@types/@testsList";
import {
  getRoleListRequest,
  getRoleListResponse,
} from "@pages/Ticketing/BasicInfo/BasicInfoDetail/TicketRole/helper/components/ModifyTicketRoleDrawerContent/@types/@modifyTicketRoleDrawerContentTypes";

import {
  GetUserWithTokenResponse,
  UserInquiryNationalCodeResponse,
  UserInquiryStudentNumberResponse,
  UserNationalCodeInquiryResponse,
  UserStudentNumberInquiryResponse,
  getUserStatusResponse,
  setLoginProps,
  setLoginResponse,
} from "./models/authApi.model";
import {
  ChangeUserInquiryStateToFalseRequest,
  ChangeUserInquiryStateToFalseResponse,
  DeleteUserPhoneResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from "../../../../pages/Business/UsersList/@types/@usersList";
import {
  getAllUserWithFirstLastNameRequest,
  getAllUserWithFirstLastNameResponse,
} from "../../../../pages/Committee/History/IndividualInquiry/InquiryUsersList/@types/@inquiryUsersList";
import {
  GetAllUserByUserInfoRequest,
  GetAllUserProps,
  GetAllUserResponse,
} from "../../../../pages/Notification/NotificationUniversitySelector/helper/components/NotificationSingle/@types/@notificationSingle";

export const authApi = createApi({
  reducerPath: "api/auth",
  tagTypes: ["tag/auth"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_AUTH,
    needToken: false,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<setLoginResponse, setLoginProps>({
      query: (data) => ({
        url: "/auth/admin-login",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/auth"],
    }),
    getUsersStatus: builder.query<getUserStatusResponse | undefined, any>({
      query: (token: string) => {
        return {
          url: `/auth/checkToken/${token}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["tag/auth"],
    }),
    getUserWithToken: builder.query<GetUserWithTokenResponse, any>({
      query: (token) => {
        return {
          url: "/auth/getUserWithToken",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["tag/auth"],
    }),
    getAllUser: builder.mutation<GetAllUserResponse, GetAllUserProps>({
      query: (data) => ({
        url: "/user/getAllUser",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["tag/auth"],
    }),
    getAllUserWithFirstLastName: builder.mutation<
      getAllUserWithFirstLastNameResponse,
      getAllUserWithFirstLastNameRequest
    >({
      query: (data) => ({
        url: "/auth/getAllUserAdvancedFilterWithBranchCode",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["tag/auth"],
    }),
    deleteUserPhone: builder.query<DeleteUserPhoneResponse, string>({
      query: (phoneNumber) => {
        return {
          url: `/auth/deleteUser/${phoneNumber}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${getToken()}`,
          },
        };
      },
      // providesTags: ["tag/auth"],
    }),
    updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: (body) => ({
        url: "/auth/updateUser",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["tag/auth"],
    }),
    changeUserInquiryStateToFalse: builder.mutation<
      ChangeUserInquiryStateToFalseResponse,
      ChangeUserInquiryStateToFalseRequest
    >({
      query: (body) => ({
        url: "/user/change-estelam-to-false",
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["tag/auth"],
    }),
    getAllUserByUserInfo: builder.mutation<
      GetAllUserResponse,
      GetAllUserByUserInfoRequest
    >({
      query: (body) => ({
        url: "/user/search-user",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["tag/auth"],
    }),
    userNationalCodeInquiry: builder.query<UserNationalCodeInquiryResponse, string>({
      query: (nationalNumber) => {
        return {
          url: `user/estelam-national-code?nationalNumber=${nationalNumber}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${getToken()}`,
          },
        };
      },
      // providesTags: ["tag/auth"],
    }),
    userInquiryNationalCode: builder.query<
      UserInquiryNationalCodeResponse,
      { nationalCode: string }
    >({
      query: (params) => {
        return {
          url: `/admin/inquiries/national-code${createQueryString(params)}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${getToken()}`,
          },
        };
      },
      // providesTags: ["tag/auth"],
    }),
    userStudentNumberInquiry: builder.query<UserStudentNumberInquiryResponse, string>({
      query: (studentNumber) => {
        return {
          url: `user/estelam-student-number?studentNumber=${studentNumber}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${getToken()}`,
          },
        };
      },
      // providesTags: ["tag/auth"],
    }),
    userInquiryStudentNumber: builder.query<
      UserInquiryStudentNumberResponse,
      { studentNumber: string }
    >({
      query: (params) => {
        return {
          url: `/admin/inquiries/student-number${createQueryString(params)}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${getToken()}`,
          },
        };
      },
      // providesTags: ["tag/auth"],
    }),
    // GET USER BY PHONE OR USERNAME
    getUserByPhoneOrUserName: builder.mutation<
      GetUserByPhoneOrUserNameResponse,
      GetUserByPhoneOrUserNameRequest
    >({
      query: (body) => ({
        url: "/auth/getUserByUnitManager",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    // POST USER'S CRED TO ESTELAAM USER
    retryEstelaamWithCred: builder.mutation<
      RetryEstelaamWithCredResponse,
      RetryEstelaamWithCredRequest
    >({
      query: (body) => ({
        url: "/auth/estelam-user",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    // GET USER'S CRED TO ESTELAAM USER
    // getUserCredEstelaam: builder.query<
    //   GetUserCredEstelaamResponse,
    //   GetUserCredEstelaamRequest
    // >({
    //   query: (phoneNumber) => ({
    //     url: `/user/get-user-estelaam?phoneNumber=${phoneNumber}`,
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       authorization: `Bearer ${getToken()}`,
    //     },
    //   }),
    // }),
    // // GET USER'S CRED TO ESTELAAM USER
    // getUserCredEstelaamByNationalCode: builder.query<
    //   GetUserCredEstelaamByNationalCodeResponse,
    //   GetUserCredEstelaamByNationalCodeRequest
    // >({
    //   query: (nationalCode) => ({
    //     url: `/user/get-user-estelaam-by-national-code?nationalCode=${nationalCode}`,
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       authorization: `Bearer ${getToken()}`,
    //     },
    //   }),
    // }),
    updateUserByUnitManger: builder.mutation<
      UpdateUserByUnitMangerResponse,
      UpdateUserByUnitMangerRequest
    >({
      query: (body) => ({
        url: "/auth/updateUserByUnitManager",
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    getConfidentialityAgreementData: builder.query<
      GetConfidentialityAgreementDataResponse,
      void
    >({
      query: () => {
        return {
          url: `/user/mba`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${getToken()}`,
          },
        };
      },
      // providesTags: ["tag/auth"],
    }),
    sendConfidentialityAgreementData: builder.mutation<
      SendConfidentialityAgreementDataResponse,
      string
    >({
      query: (fatherName) => ({
        url: `/user/mba?fatherName=${fatherName}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    getSajedInquiries: builder.mutation<GetSajedInquiriesResponse, { username: string }>({
      query: (params) => {
        return {
          url: `admin/inquiries/sajed${createQueryString(params)}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": "fa",
            authorization: `Bearer ${getToken()}`,
          },
        };
      },
    }),
    adminChangePassword: builder.mutation<void, { username: string }>({
      query: (params) => ({
        url: `/admin/user/change-password${createQueryString(params)}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    reInquiryStudent: builder.mutation<ReInquiryStudentResponse, ReInquiryStudentRequest>(
      {
        query: (nationalCode) => ({
          url: `/admin/student/re-inquiry/${nationalCode}`,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${getToken()}`,
          },
        }),
      }
    ),
    myReInquiryStudent: builder.mutation<
      ReInquiryStudentResponse,
      ReInquiryStudentRequest
    >({
      query: (nationalCode) => ({
        url: `/manager/student/re-inquiry/${nationalCode}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    reInquiryEmployee: builder.mutation<
      ReInquiryEmployeeResponse,
      ReInquiryEmployeeRequest
    >({
      query: (params) => ({
        url: `/admin/employee/re-inquiry${createQueryString(params)}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    myReInquiryEmployee: builder.mutation<
      ReInquiryEmployeeResponse,
      ReInquiryEmployeeRequest
    >({
      query: (params) => ({
        url: `/manager/employee/re-inquiry${createQueryString(params)}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    updateUserInfo: builder.mutation<UpdateUserInfoResponse, UpdateUserInfoRequest>({
      query: ({ id, body }) => ({
        url: `/admin/users/${id}`,
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    adminChangeActiveDeActiveStatus: builder.mutation<
      void,
      { params: { staffIds: string[] }; status: 1 | 2 }
    >({
      query: ({ params, status }) => ({
        url: `/admin/staff/status/${status}${createQueryString(params)}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
    }),

    managerChangeActiveDeActiveStatus: builder.mutation<
      void,
      { params: { staffIds: string[] }; status: 1 | 2 }
    >({
      query: ({ params, status }) => ({
        url: `/manager/staff/status/${status}${createQueryString(params)}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
    }),

    // get role
    getRoleList: builder.query<getRoleListResponse, getRoleListRequest>({
      query: (params) => ({
        method: "GET",
        url: `admin/active-roles${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
          authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    // search students
    getStudentListByUsernameAndStudentNumber: builder.query<
      GetStudentListByUsernameAndStudentNumberResponse,
      GetStudentListByUsernameAndStudentNumberRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `/manager/student/search${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
          authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLazyGetUserWithTokenQuery,
  useGetAllUserMutation,
  useGetAllUserWithFirstLastNameMutation,
  useLazyDeleteUserPhoneQuery,
  useUpdateUserMutation,
  useChangeUserInquiryStateToFalseMutation,
  useGetAllUserByUserInfoMutation,
  useLazyUserNationalCodeInquiryQuery,
  useLazyUserStudentNumberInquiryQuery,
  useGetUserByPhoneOrUserNameMutation,
  useRetryEstelaamWithCredMutation,
  useUpdateUserByUnitMangerMutation,
  useLazyGetUsersStatusQuery,
  useLazyUserInquiryNationalCodeQuery,
  useLazyUserInquiryStudentNumberQuery,
  useLazyGetConfidentialityAgreementDataQuery,
  useSendConfidentialityAgreementDataMutation,
  useGetSajedInquiriesMutation,
  useAdminChangePasswordMutation,
  useReInquiryStudentMutation,
  useReInquiryEmployeeMutation,
  useMyReInquiryStudentMutation,
  useMyReInquiryEmployeeMutation,
  useUpdateUserInfoMutation,
  useAdminChangeActiveDeActiveStatusMutation,
  useManagerChangeActiveDeActiveStatusMutation,
  useLazyGetRoleListQuery,
  useLazyGetStudentListByUsernameAndStudentNumberQuery,
} = authApi;
