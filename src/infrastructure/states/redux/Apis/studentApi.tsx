import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";

import {
  AdvancedFilterRequest,
  BulkStudentUpdateRequest,
  GetAllFieldByLevelCodeResponse,
  GetAllLevelResponse,
  GetAllRequestStatusResponse,
} from "./models/studentApi.model";
import { GetStudentDateHistoryInfoResponse } from "../../../../components/Modals/StudentModule/StatusHistory/@types/@statusHistoryModal";
import {
  GetStudentPrevOrNextRequest,
  UpdateStudentCardStatusRequest,
  UpdateStudentCardStatusResponse,
  getStudentInfoResponse,
} from "../../../../components/StudentCardModal/@types/@studentCardModal";
import {
  BulkStudentUpdateResponse,
  getAllStudentCardRequest,
  getAllStudentCardResponse,
} from "../../../../components/StudentModules/@types/@requests";
import { GetAllBranchResponse } from "../../../../pages/Notification/NotificationUniversitySelector/helper/components/NotificationGroup/@types/@notificationGroup";
import { AdvancedFilterResponse } from "../../../models/general.model";

const baseQuery = customBaseQuery({
  baseUrl: import.meta.env.VITE_URL_STUDENT,
});
export const studentApi = createApi({
  reducerPath: "api/student",
  tagTypes: ["api/student"],
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAllStudentCard: builder.mutation<
      getAllStudentCardResponse,
      getAllStudentCardRequest
    >({
      query: ({ status, requestType = 2 }) => ({
        url: "/student/GetAllStudentCard",
        method: "POST",
        body: JSON.stringify({
          page: 0,
          pageSize: 300,
          statusId: status,
          requestType: requestType,
          cardType: 1,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["api/student"],
    }),
    getStudentInfo: builder.mutation<getStudentInfoResponse, string>({
      query: (id) => ({
        url: `/student/GetAllStudentCardWithId/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["api/student"],
    }),
    getStudentDateHistoryInfo: builder.mutation<
      GetStudentDateHistoryInfoResponse,
      string
    >({
      query: (id) => ({
        url: `/student/getAllRequestStatusByStudentCardId/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["api/student"],
    }),
    getAllRequestStatus: builder.query<GetAllRequestStatusResponse, any>({
      query: () => ({
        url: "/student/getAllRequestStatus",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    updateStudentCardStatus: builder.mutation<
      UpdateStudentCardStatusResponse,
      UpdateStudentCardStatusRequest
    >({
      query: (data) => ({
        url: "/student/updateStudentCardStatus",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["api/student"],
    }),
    getStudentPrevOrNext: builder.mutation<
      getStudentInfoResponse,
      GetStudentPrevOrNextRequest
    >({
      query: (data) => ({
        url: "/student/GetStudentPrevOrNext",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["api/student"],
    }),
    bulkStudentUpdate: builder.mutation<
      BulkStudentUpdateResponse,
      BulkStudentUpdateRequest
    >({
      query: (data) => ({
        url: "/student/updateBulkRequest",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["api/student"],
    }),
    advancedFilter: builder.mutation<AdvancedFilterResponse, AdvancedFilterRequest>({
      query: (data) => ({
        url: "/student/StudentCardAdvancedFilter",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["api/student"],
    }),
    getAllBranch: builder.mutation<GetAllBranchResponse, null>({
      query: () => ({
        url: "/branch/getAllBranch",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getAllLevel: builder.query<GetAllLevelResponse, null>({
      query: () => ({
        url: "/level/getAllLevel",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getAllFieldByLevelCode: builder.mutation<GetAllFieldByLevelCodeResponse, number>({
      query: (id) => ({
        url: `/field/getAllFieldByLevelCode/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["api/student"],
    }),
    // GetAllRequestStatusByStudentCardId: builder.mutation<
    //   GetAllRequestStatusByStudentCardIdResponse,
    //   string
    // >({
    //   query: (id) => ({
    //     url: `/student/getAllRequestStatusByStudentCardId/${id}`,
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }),
    //   invalidatesTags: ["api/student"],
    // }),
  }),
});

export const {
  useGetAllStudentCardMutation,
  useGetStudentInfoMutation,
  useGetAllRequestStatusQuery,
  useUpdateStudentCardStatusMutation,
  useGetStudentPrevOrNextMutation,
  useBulkStudentUpdateMutation,
  useAdvancedFilterMutation,
  useGetStudentDateHistoryInfoMutation,
  useGetAllBranchMutation,
  useLazyGetAllLevelQuery,
  useGetAllFieldByLevelCodeMutation,
} = studentApi;
