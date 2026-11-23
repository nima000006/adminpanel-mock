import { GetMeetingPlaceResponse } from "@pages/Committee/Committees/Meetings/SessionCreation/helper/components/SessionInfo/@types/@sessionInfoStep";
import {
  GetConsultingCenterRequest,
  GetConsultingCenterResponse,
  SendConsultingSessionAllocationModalRequest,
  SendConsultingSessionAllocationModalResponse,
} from "@pages/Committee/ConsultingCenter/ConsultingCenterDocuments/helper/components/DocumentsTable/@types/@documentsTable";
import {
  GetConsultingCenterCountResponse,
  GetConsultingCenterSessionListRequest,
  GetConsultingCenterSessionListResponse,
  SendConsultingRejectSessionRequest,
  SendConsultingRejectSessionResponse,
} from "@pages/Committee/ConsultingCenter/ConsultingCenterSessionList/helper/components/ConsultingCenterSessionListTable/@types/@ConsultingCenterSessionListTable";

import { FirstMaxRequest } from "../../../../../../components/Modals/Committee/AccusationCase/AccusationCaseSessionAllocationModal/@type/@typeAccusationCaseSessionAllocationModal";
import {
  GetConsultingCenterDetailReferralInfoResponse,
  SendConsultingRegisterCommentRequest,
  SendConsultingRegisterCommentResponse,
} from "../../../../../../pages/Committee/ConsultingCenter/ConsultingCenterDetail/ConsultingCenterDetail/@types/@consultingCenterDetail";
import { GetReasonRejectSessionResponse } from "../../../../../../pages/Committee/ConsultingCenter/ConsultingCenterDetail/RejectSessionModalContent/@types/@rejectSessionModalContent";
import {
  GetConsultantResponse,
  GetConsultingCenterChangeSessionRequest,
  GetConsultingCenterChangeSessionResponse,
  GetTypeMeetingResponse,
} from "../../../../../../pages/Committee/ConsultingCenter/ConsultingCenterDetail/SessionAllocationModalContent/@types/@sessionAllocationModalContent";
import { GetOpinionRegisterCommentResponse } from "../../../../../../pages/Committee/ConsultingCenter/ConsultingCenterDetail/SubmitCommentModalContent/@types/@submitCommentModalContent";
import { countTransformResponse } from "../../../../../helpers/NetworkHelpers/CountResponseTransformer/CountResponseTransformer";
import { transformCreateResponse } from "../../../../../helpers/NetworkHelpers/CreateResponseTransformer/transformCreateResponse";
import { transformObjectResponse } from "../../../../../helpers/NetworkHelpers/ResponseObjectTransformer/transformObjectResponse";
import { transformResponse } from "../../../../../helpers/NetworkHelpers/ResponseTransformer/ResponseTransformer";
import { committeeApi } from "../../committeeApi";

export const consultingCenterApi = committeeApi.injectEndpoints({
  endpoints: (builder) => ({
    getConsultingCenterList: builder.query<
      GetConsultingCenterResponse,
      GetConsultingCenterRequest
    >({
      query: ({ firstResult, maxResults, type }) => ({
        url: `/data/form/ConsultationFiles?maxResults=${maxResults}&firstResult=${firstResult}${
          type !== 0 ? `&statusCounselingSession_EQ=${type}` : ""
        }`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetConsultingCenterResponse) => {
        return transformResponse(response);
      },
    }),
    getConsultingCenterListCount: builder.query<
      GetConsultingCenterCountResponse,
      { type: number }
    >({
      query: ({ type }) => ({
        url: `/data/form/ConsultationFiles/count${
          type !== 0 ? `?statusCounselingSession_EQ=${encodeURIComponent(type)}` : ""
        }`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetConsultingCenterCountResponse) => {
        return countTransformResponse(response);
      },
    }),
    getTypeMeeting: builder.query<GetTypeMeetingResponse, FirstMaxRequest>({
      query: ({ firstResult, maxResults }) => ({
        url: `/data/form/SessionType?maxResults=${maxResults}&firstResult=${firstResult}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetTypeMeetingResponse) => {
        return transformResponse(response);
      },
    }),
    getMeetingPlace: builder.query<GetMeetingPlaceResponse, FirstMaxRequest>({
      query: ({ firstResult, maxResults }) => ({
        url: `/data/form/MeetingPlace?maxResults=${maxResults}&firstResult=${firstResult}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetMeetingPlaceResponse) => {
        return transformResponse(response);
      },
    }),
    getConsultant: builder.query<GetConsultantResponse, FirstMaxRequest>({
      query: ({ firstResult, maxResults }) => ({
        url: `/data/form/Consultant?maxResults=${maxResults}&firstResult=${firstResult}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetConsultantResponse) => {
        return transformResponse(response);
      },
    }),
    getNotificationType: builder.query<GetConsultantResponse, FirstMaxRequest>({
      query: ({ firstResult, maxResults }) => ({
        url: `/data/form/NotificationType?maxResults=${maxResults}&firstResult=${firstResult}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetConsultantResponse) => {
        return transformResponse(response);
      },
    }),
    sendConsultingSessionAllocationModal: builder.mutation<
      SendConsultingSessionAllocationModalResponse,
      SendConsultingSessionAllocationModalRequest
    >({
      query: (body) => ({
        url: "/data/form/AllocationCounselingSessions/2e85823f54b34b809e13997d1dd63a4d/save",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendConsultingSessionAllocationModalResponse) => {
        return transformObjectResponse(response);
      },
    }),
    getReasonRejectSession: builder.query<
      GetReasonRejectSessionResponse,
      FirstMaxRequest
    >({
      query: ({ firstResult, maxResults }) => ({
        url: `/data/form/ReasonCancelingSession?maxResults=${maxResults}&firstResult=${firstResult}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetReasonRejectSessionResponse) => {
        return transformResponse(response);
      },
    }),
    sendConsultingRejectSession: builder.mutation<
      SendConsultingRejectSessionResponse,
      SendConsultingRejectSessionRequest
    >({
      query: (body) => ({
        url: "/data/form/CancelCounselingSession/72c23f36c7084c5d978e93f549736533/save",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendConsultingRejectSessionResponse) => {
        return transformCreateResponse(response);
      },
    }),
    getConsultingCenterChangeSession: builder.mutation<
      GetConsultingCenterChangeSessionResponse,
      GetConsultingCenterChangeSessionRequest
    >({
      query: (data) => ({
        url: "/data/form/AllocationCounselingSessions/get?relation=2e85823f54b34b809e13997d1dd63a4d",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: GetConsultingCenterChangeSessionResponse) => {
        return transformObjectResponse(response);
      },
      invalidatesTags: ["tag/committee"],
    }),
    getConsultingCenterSessionList: builder.query<
      GetConsultingCenterSessionListResponse,
      GetConsultingCenterSessionListRequest
    >({
      query: ({ firstResult, maxResults, type }) => ({
        url: `/data/form/ListCounselingSessions?maxResults=${maxResults}&firstResult=${firstResult}${
          type !== 1 ? `&AssociationMeetingStatus_id_EQ=${type}` : ""
        }`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetConsultingCenterSessionListResponse) => {
        return transformResponse(response);
      },
    }),
    getConsultingCenterSessionListCount: builder.query<
      GetConsultingCenterCountResponse,
      { type: number }
    >({
      query: ({ type }) => ({
        url: `/data/form/ListCounselingSessions/count${
          type !== 1 ? `?AssociationMeetingStatus_id_EQ=${type}` : ""
        }`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetConsultingCenterCountResponse) => {
        return countTransformResponse(response);
      },
    }),
    getConsultingCenterDetailReferralInfo: builder.query<
      GetConsultingCenterDetailReferralInfoResponse,
      number
    >({
      query: (id: number) => ({
        url: `/data/form/DetailsConsultationCase?maxResults=50&firstResult=0&id_EQ=${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetConsultingCenterDetailReferralInfoResponse) => {
        return transformResponse(response);
      },
    }),
    getOpinionRegisterComment: builder.query<
      GetOpinionRegisterCommentResponse,
      FirstMaxRequest
    >({
      query: ({ firstResult, maxResults }) => ({
        url: `/data/form/RegisterComment?maxResults=${maxResults}&firstResult=${firstResult}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetOpinionRegisterCommentResponse) => {
        return transformResponse(response);
      },
    }),
    sendConsultingRegisterComment: builder.mutation<
      SendConsultingRegisterCommentResponse,
      SendConsultingRegisterCommentRequest
    >({
      query: (body) => ({
        url: "/data/form/RegisteringOpinionConsultant/cfcf2a7b3c7e4778970a042cdc9fd070/save",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendConsultingRegisterCommentResponse) => {
        return transformCreateResponse(response);
      },
    }),
  }),
});
export const {
  useLazyGetConsultingCenterListQuery,
  useLazyGetConsultingCenterListCountQuery,
  useLazyGetTypeMeetingQuery,
  useLazyGetMeetingPlaceQuery,
  useLazyGetConsultantQuery,
  useLazyGetNotificationTypeQuery,
  useSendConsultingSessionAllocationModalMutation,
  useLazyGetReasonRejectSessionQuery,
  useSendConsultingRejectSessionMutation,
  useGetConsultingCenterChangeSessionMutation,
  useLazyGetConsultingCenterSessionListQuery,
  useLazyGetConsultingCenterSessionListCountQuery,
  useLazyGetConsultingCenterDetailReferralInfoQuery,
  useLazyGetOpinionRegisterCommentQuery,
  useSendConsultingRegisterCommentMutation,
} = consultingCenterApi;
