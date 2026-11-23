import { getToken } from "@infra/services/AuthProvider/helper/authUtil";
import {
  EducationalCheckingStatusRequest,
  EducationalCheckingStatusResponse,
  GetDemandDetailRequestsHistoryResponse,
  GetDemandDetailResponse,
  GetInternationalRequestReasonsResponse,
} from "@pages/International/Requests/Demands/Detail/@types/@demandDetail";
import { GetInterviewDetailResponse } from "@pages/International/Requests/Interview/Detail/@types/@interviewDetail";
import {
  InterviewSubmitRejectOrAcceptModalRequest,
  InterviewSubmitRejectOrAcceptModalResponse,
} from "@pages/International/Requests/Interview/Detail/InterviewDetail/InterviewPendingResultDetail/@types/@interviewPendingResultDetail";
import { GetInterviewReasonsWithTypeIdResponse } from "@pages/International/Requests/Interview/Detail/InterviewDetail/InterviewPendingResultDetail/helper/modals/InterviewDetailRejectModalContent/@types/@interviewDetailRejectModalContent";
import {
  GetInterviewListByStatusRequest,
  GetInterviewListByStatusResponse,
} from "@pages/International/Requests/Interview/List/@types/@interviewList";
import {
  GetInterviewDurationListResponse,
  GetInterviewerListResponse,
} from "@pages/International/Requests/Interview/List/helper/components/PendingHold/helper/modals/InterviewDetailEditModalContent/@types/@interviewDetailEditModalContent";

import {
  GetAllActiveSemestersResponse,
  GetDemandListByStatusAndSemesterRequest,
  GetDemandListByStatusAndSemesterResponse,
} from "../../../../../../pages/International/Requests/Demands/List/@types/@demandsList";
import { internationalApi } from "../../internationalApi";

export const requestApi = internationalApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllActiveSemesters: builder.query<GetAllActiveSemestersResponse, void>({
      query: () => ({
        url: "/course/allActiveSemesters",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // providesTags: ["tag/international"],
    }),
    getDemandListByStatusAndSemester: builder.mutation<
      GetDemandListByStatusAndSemesterResponse,
      GetDemandListByStatusAndSemesterRequest
    >({
      query: (body) => ({
        url: "/admin/getAllRequestsByStatusAndSemester",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["tag/international"],
    }),
    getDemandDetail: builder.query<GetDemandDetailResponse, string>({
      query: (id) => ({
        url: `/request/preview/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["tag/international"],
    }),
    getDemandDetailRequestsHistory: builder.query<
      GetDemandDetailRequestsHistoryResponse,
      string
    >({
      query: (id) => ({
        url: `/admin/requests/${id}/requestHistories`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["tag/international"],
    }),
    getInternationalRequestReasons: builder.query<
      GetInternationalRequestReasonsResponse,
      number
    >({
      query: (id) => ({
        url: `/admin/reasons/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["tag/international"],
    }),
    educationalCheckingStatus: builder.mutation<
      EducationalCheckingStatusResponse,
      EducationalCheckingStatusRequest
    >({
      query: (body) => ({
        url: "/admin/requests/educational-checking-status",
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["tag/international"],
    }),

    getInterviewListByStatus: builder.mutation<
      GetInterviewListByStatusResponse,
      GetInterviewListByStatusRequest
    >({
      query: (body) => ({
        url: `/admin/interviews`,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["tag/international"],
    }),
    getInterviewDetail: builder.query<GetInterviewDetailResponse, string>({
      query: (id) => ({
        url: `/admin/interview/detail/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["tag/international"],
    }),
    getInterviewReasonsWithTypeId: builder.query<
      GetInterviewReasonsWithTypeIdResponse,
      string
    >({
      query: (id) => ({
        url: `/admin/reasons/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["tag/international"],
    }),
    interviewSubmitRejectOrAcceptModal: builder.mutation<
      InterviewSubmitRejectOrAcceptModalResponse,
      InterviewSubmitRejectOrAcceptModalRequest
    >({
      query: (body) => ({
        url: "/admin/requests/pending-interview-status",
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["tag/international"],
    }),
    getInterviewerList: builder.query<GetInterviewerListResponse, void>({
      query: () => ({
        url: "/admin/interviewer/name-id/list",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["tag/international"],
    }),
    getInterviewDurationList: builder.query<GetInterviewDurationListResponse, void>({
      query: () => ({
        url: "/admin/interview/duration/list",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["tag/international"],
    }),
  }),
});

export const {
  useLazyGetAllActiveSemestersQuery,
  useGetDemandListByStatusAndSemesterMutation,
  useLazyGetDemandDetailQuery,
  useLazyGetDemandDetailRequestsHistoryQuery,
  useLazyGetInternationalRequestReasonsQuery,
  useEducationalCheckingStatusMutation,
  useGetInterviewListByStatusMutation,
  useLazyGetInterviewDetailQuery,
  useLazyGetInterviewReasonsWithTypeIdQuery,
  useInterviewSubmitRejectOrAcceptModalMutation,
  useLazyGetInterviewerListQuery,
  useLazyGetInterviewDurationListQuery,
} = requestApi;
