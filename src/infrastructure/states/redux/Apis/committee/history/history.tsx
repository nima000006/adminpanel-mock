import { CountResponse } from "@pages/Committee/HandleProcessing/Reports/CommitteeReport/helper/components/CommitteeReport/@types/@committeeReportTable";
import {
  GetRemoveHistoryOtherDocumentsResponse,
  GetRemoveReasonResponse,
  SendRegistrationDeletionRequest,
  SendRegistrationDeletionResponse,
} from "@pages/Committee/History/RecordsHistory/ReadOnlyArchive/helper/components/OtherDocumentsStep/@types/@readOnlyOtherDocumentsStep";
import {
  SendRemoveHistoryAgreementRequestModalRequest,
  SendRemoveHistoryAgreementRequestModalResponse,
  SendRemoveHistoryOppositionRequestModalRequest,
  SendRemoveHistoryOppositionRequestModalResponse,
} from "@pages/Committee/History/Requests/ConfirmerRequests/ConfirmerRequestsDetail/RemoveHistory/helper/components/RemoveHistoryOtherDocumentsStep/@types/@removeHistoryOtherDocumentsStep";
import {
  GetSubmitterRequestListRequest,
  GetSubmitterRequestListResponse,
} from "@pages/Committee/History/Requests/ConfirmerRequests/ConfirmerRequestsDetail/RemoveHistory/helper/components/RequestDetail/@ytypes/@requestDetail";
import {
  SendSignatoryLetterInformationRequest,
  SendSignatoryLetterInformationResponse,
} from "@pages/Committee/History/Requests/ConfirmerRequests/ConfirmerRequestsDetail/Reporting/helper/components/PacketInformationTab/@types/@packetInformationTab";
import {
  FinalRequestConfirmationRequest,
  FinalRequestConfirmationResponse,
} from "@pages/Committee/History/Requests/ConfirmerRequests/ConfirmerRequestsDetail/Reporting/helper/components/ReviewTab/@types/@reviewTab";
import {
  GetViolationsInquirySelectedListResponse,
  SendViolationsInquirySelectedListRequest,
  SendViolationsInquirySelectedListResponse,
} from "@pages/Committee/History/Requests/ConfirmerRequests/ConfirmerRequestsDetail/Reporting/helper/components/SelectAccusationTab/@types/@selectAccusationTab";
import {
  GetSubmitterAddAccusationRequestRequest,
  GetSubmitterAddAccusationRequestResponse,
  GetSubmitterAddReasonRequestResponse,
  GetSubmitterAddTypeInformationResponse,
  SendSubmitterAddAccusationRequestRequest,
  SendSubmitterAddAccusationRequestResponse,
} from "@pages/Committee/History/Requests/SubmitterRequests/SubmitterRequestsAdd/helper/components/AccusationAndRequestStep/@types/@accusationAndRequestStep";
import {
  GetSubmitterAddPacketInfoResponse,
  SendSubmitterAddPacketInfoRequest,
  SendSubmitterAddPacketInfoResponse,
} from "@pages/Committee/History/Requests/SubmitterRequests/SubmitterRequestsAdd/helper/components/PacketInfoStep/@types/@packetInfoStep";
import {
  GetSubmitterHistoryRequestListRequest,
  GetSubmitterHistoryRequestListResponse,
} from "@pages/Committee/History/Requests/SubmitterRequests/SubmitterRequestsList/helper/components/CommitteeSubmitList/@types/@committeeSubmitList";
import {
  GetSubmitterRequestLetterDetailRequest,
  GetSubmitterRequestLetterDetailResponse,
} from "@pages/Committee/History/Requests/SubmitterRequests/SubmitterRequestsListDetail/helper/components/PacketInformationTab/@types/@packetInformationTab";
import { GetSubmitterDetailRejectReasonResponse } from "@pages/Committee/History/Requests/SubmitterRequests/SubmitterRequestsListDetail/helper/components/PacketResultTab/@types/@packetResultTab";
import {
  GetSubmitterRequestInformationDetailRequest,
  GetSubmitterRequestInformationDetailResponse,
} from "@pages/Committee/History/Requests/SubmitterRequests/SubmitterRequestsListDetail/helper/components/RequestInfoTab/@types/@requestInfoTab";

import {
  GetSubmitterDetailLetterInformationResponse,
  GetSubmitterDetailTableInformationResponse,
} from "../../../../../../components/Committee/Committee/Inquiry/IndividualInquiry/InquiryUserReport/EnvelopeReviewStep/@types/@envelopeReviewStep";
import {
  GetConfirmerDetailCheckInquiryRequest,
  GetConfirmerDetailCheckInquiryResponse,
  GetReasonRejectingInquiryRequestResponse,
  SendConfirmerDetailCheckInquiryRequest,
  SendConfirmerDetailCheckInquiryResponse,
} from "../../../../../../pages/Committee/History/Requests/ConfirmerRequests/ConfirmerRequestsDetail/CheckInquiry/@types/@checkInquiry";
import { GetViolationsInquiryResponse } from "../../../../../../pages/Committee/History/Requests/ConfirmerRequests/ConfirmerRequestsDetail/Information/@types/@information";
import { countTransformResponse } from "../../../../../helpers/NetworkHelpers/CountResponseTransformer/CountResponseTransformer";
import { transformCreateResponse } from "../../../../../helpers/NetworkHelpers/CreateResponseTransformer/transformCreateResponse";
import { transformObjectResponse } from "../../../../../helpers/NetworkHelpers/ResponseObjectTransformer/transformObjectResponse";
import { transformResponse } from "../../../../../helpers/NetworkHelpers/ResponseTransformer/ResponseTransformer";
import { committeeApi } from "../../committeeApi";

export const committeeHistoryApis = committeeApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubmitterRequestList: builder.query<
      GetSubmitterRequestListResponse,
      GetSubmitterRequestListRequest
    >({
      query: ({ type, firstResult, maxResults, uniCode }) => {
        return {
          url: `/data/form/InquiryRequestList?maxResults=${maxResults}&firstResult=${firstResult}&UniCode_EQ=${uniCode}&AssociationInquiryRequestStatus_id_IN=${type}`,
          method: "GET",
        };
      },
      transformResponse: (response: GetSubmitterRequestListResponse) =>
        transformResponse(response),
    }),
    getSubmitterRequestListCount: builder.query<
      CountResponse,
      {
        type: "1,2,3" | "1" | "2" | "3";
        uniCode?: number;
      }
    >({
      query: ({ type, uniCode }) => {
        return {
          url: `/data/form/InquiryRequestList/count?AssociationInquiryRequestStatus_id_IN=${type}${uniCode ? `&UniCode_EQ=${uniCode}` : ""} `,
          method: "GET",
        };
      },
      providesTags: ["tag/committee"],
      transformResponse: (baseQueryReturnValue) => {
        return countTransformResponse(baseQueryReturnValue);
      },
    }),
    getSubmitterHistoryRequestList: builder.query<
      GetSubmitterHistoryRequestListResponse,
      GetSubmitterHistoryRequestListRequest
    >({
      query: ({ type, firstResult, maxResults, nationalCode }) => {
        return {
          url: `/data/form/ListApplicants?maxResults=${maxResults}&firstResult=${firstResult}${nationalCode ? `&inquirerNationalCode_EQ=${nationalCode}` : ""}&status_IN=${type}`,
          method: "GET",
        };
      },
      transformResponse: (response: GetSubmitterHistoryRequestListResponse) =>
        transformResponse(response),
    }),
    getSubmitterHistoryRequestListCount: builder.query<
      CountResponse,
      {
        type: "1,2,3" | "1" | "2" | "3";
        nationalCode?: string;
      }
    >({
      query: ({ type, nationalCode }) => {
        return {
          url: `/data/form/ListApplicants/count?${nationalCode ? `&inquirerNationalCode_EQ=${nationalCode}` : ""}&status_IN=${type}`,
          method: "GET",
        };
      },
      providesTags: ["tag/committee"],
      transformResponse: (baseQueryReturnValue) => {
        return countTransformResponse(baseQueryReturnValue);
      },
    }),
    getSubmitterDetailRequestInformation: builder.mutation<
      GetSubmitterRequestInformationDetailResponse,
      GetSubmitterRequestInformationDetailRequest
    >({
      query: (body) => ({
        url: "/data/form/GetRequestInformation/get?relation=9dcec50a7f53425dadc3363871eecd49",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: GetSubmitterRequestInformationDetailResponse) => {
        return transformObjectResponse(response);
      },
    }),
    getSubmitterDetailRequestLetter: builder.mutation<
      GetSubmitterRequestLetterDetailResponse,
      GetSubmitterRequestLetterDetailRequest
    >({
      query: (body) => ({
        url: "/data/form/GetRequestLetterInformation/get?relation=bb917aeaf4d0484bb54918e39d96a2cb",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: GetSubmitterRequestLetterDetailResponse) => {
        return transformObjectResponse(response);
      },
    }),
    getSubmitterDetailRejectReason: builder.query<
      GetSubmitterDetailRejectReasonResponse,
      string
    >({
      query: (id) => ({
        url: `/data/form/ReceiveReasonRejectingInquiry?maxResults=50&firstResult=0&id_EQ=${id}`,
        method: "GET",
      }),
      transformResponse: (response: GetSubmitterDetailRejectReasonResponse) =>
        transformResponse(response),
    }),
    getSubmitterDetailLetterInformation: builder.query<
      GetSubmitterDetailLetterInformationResponse,
      string
    >({
      query: (id) => ({
        url: `/data/form/ReceiveLetterInformation?maxResults=50&firstResult=0&id_EQ=${id}`,
        method: "GET",
      }),
      transformResponse: (response: GetSubmitterDetailLetterInformationResponse) =>
        transformResponse(response),
    }),
    getSubmitterDetailTableInformation: builder.query<
      GetSubmitterDetailTableInformationResponse,
      string
    >({
      query: (id) => ({
        url: `/data/form/ReceiveEffectiveRecordsNew?maxResults=50&firstResult=0&RequestInquiryId_EQ=${id}`,
        method: "GET",
      }),
      transformResponse: (response: GetSubmitterDetailTableInformationResponse) =>
        transformResponse(response),
    }),
    getSubmitterAddTypeInformation: builder.query<
      GetSubmitterAddTypeInformationResponse,
      void
    >({
      query: () => ({
        url: `/data/form/TypeInformation?maxResults=50&firstResult=0`,
        method: "GET",
      }),
      transformResponse: (response: GetSubmitterAddTypeInformationResponse) =>
        transformResponse(response),
    }),
    getSubmitterAddReasonRequest: builder.query<
      GetSubmitterAddReasonRequestResponse,
      number
    >({
      query: (id) => ({
        url: `/data/form/ReasonRequest?maxResults=50&firstResult=0&typeInformationId_EQ=${id}`,
        method: "GET",
      }),
      transformResponse: (response: GetSubmitterAddReasonRequestResponse) =>
        transformResponse(response),
    }),
    getRemoveReasonRequest: builder.query<GetRemoveReasonResponse, number>({
      query: (id) => ({
        url: `/data/form/ReasonRequest?maxResults=50&firstResult=0&requestType_EQ=${id}`,
        method: "GET",
      }),
      transformResponse: (response: GetRemoveReasonResponse) =>
        transformResponse(response),
    }),
    sendSubmitterAddAccusationRequest: builder.mutation<
      SendSubmitterAddAccusationRequestResponse,
      SendSubmitterAddAccusationRequestRequest
    >({
      query: (body) => ({
        url: "/data/form/StudentInformationAndRequest/create",
        // Todo[saman]: OLD VERSION // url: "/data/form/StudentInformationAndRequest/43c8dabc53f14dfa89d4f2dede58d52a/save",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendSubmitterAddAccusationRequestResponse) => {
        return transformCreateResponse(response);
      },
    }),
    getSubmitterAddAccusationRequest: builder.mutation<
      GetSubmitterAddAccusationRequestResponse,
      GetSubmitterAddAccusationRequestRequest
    >({
      query: (body) => ({
        url: "/data/form/GetInformationAccused/get?relation=9fabf6608d204b35929481e85f33a58f",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: GetSubmitterAddAccusationRequestResponse) => {
        return transformObjectResponse(response);
      },
    }),
    sendSubmitterAddPacketInfo: builder.mutation<
      SendSubmitterAddPacketInfoResponse,
      SendSubmitterAddPacketInfoRequest
    >({
      query: (body) => ({
        url: "/data/form/RequestLetterInformation/e9cd991764ae4e909b256b42a21a4f56/save",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendSubmitterAddPacketInfoResponse) => {
        return transformCreateResponse(response);
      },
    }),
    getSubmitterAddPacketInfo: builder.query<GetSubmitterAddPacketInfoResponse, string>({
      query: (id) => ({
        url: `/data/form/RequestLetterInformation?maxResults=50&firstResult=0&id_EQ=${id}`,
        method: "GET",
      }),
      transformResponse: (response: GetSubmitterAddPacketInfoResponse) =>
        transformResponse(response),
    }),
    getConfirmerDetailCheckInquiry: builder.mutation<
      GetConfirmerDetailCheckInquiryResponse,
      GetConfirmerDetailCheckInquiryRequest
    >({
      query: (body) => ({
        url: "/data/form/CheckInquiryRequest/get?relation=f78836e6ce184744bf6400254469c46d",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: GetConfirmerDetailCheckInquiryResponse) => {
        return transformCreateResponse(response);
      },
    }),
    getReasonRejectingInquiryRequest: builder.query<
      GetReasonRejectingInquiryRequestResponse,
      void
    >({
      query: () => ({
        url: `/data/form/ReasonRejectingInquiryRequest?maxResults=50&firstResult=0`,
        method: "GET",
      }),
      transformResponse: (response: GetReasonRejectingInquiryRequestResponse) =>
        transformResponse(response),
    }),
    sendReasonRejectingInquiryRequest: builder.mutation<
      SendConfirmerDetailCheckInquiryResponse,
      SendConfirmerDetailCheckInquiryRequest
    >({
      query: (body) => ({
        url: "/data/form/RejectionInquiryRequest/cd77cedfcafb4cbb9b84bd4864745430/save",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendConfirmerDetailCheckInquiryResponse) => {
        return transformCreateResponse(response);
      },
    }),
    getViolationsInquiryRequest: builder.query<GetViolationsInquiryResponse, string>({
      query: (nationalCode) => ({
        url: `/data/form/ViewViolationsWithNationalCodeFilter?maxResults=50&firstResult=0&AssociationViolationStudent_nationalCode_EQ=${nationalCode}`,
        method: "GET",
      }),
      transformResponse: (response: GetViolationsInquiryResponse) =>
        transformResponse(response),
    }),
    getViolationsInquirySelectedList: builder.query<
      GetViolationsInquirySelectedListResponse,
      string
    >({
      query: (id) => ({
        url: `/data/form/GetSelected?maxResults=50&firstResult=0&RequestInquiryId_EQ=${id}`,
        method: "GET",
      }),
      transformResponse: (response: GetViolationsInquirySelectedListResponse) =>
        transformResponse(response),
    }),
    sendViolationsInquirySelectedList: builder.mutation<
      SendViolationsInquirySelectedListResponse,
      SendViolationsInquirySelectedListRequest
    >({
      query: (body) => ({
        url: "/data/form/InquiryRequestViolation/646edbfe3f2040e39d55d8847e834e5a/save",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendViolationsInquirySelectedListResponse) => {
        return transformCreateResponse(response);
      },
    }),
    sendSignatoryLetterInformation: builder.mutation<
      SendSignatoryLetterInformationResponse,
      SendSignatoryLetterInformationRequest
    >({
      query: (body) => ({
        url: "/data/form/RegisteringInformationSignatoryLetter/952aa9ed16834c5fac1995b60de09a18/save",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendSignatoryLetterInformationResponse) => {
        return transformCreateResponse(response);
      },
    }),
    finalRequestConfirmation: builder.mutation<
      FinalRequestConfirmationResponse,
      FinalRequestConfirmationRequest
    >({
      query: (body) => ({
        url: "/data/form/ConfirmationAndFinalSubmission/634d16e465464eecaa7f2f5cc45f1be0/save",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: FinalRequestConfirmationResponse) => {
        return transformCreateResponse(response);
      },
    }),
    getRemoveHistoryRequestDetails: builder.query<
      GetSubmitterRequestListResponse,
      number
    >({
      query: (id) => ({
        url: `/data/form/InquiryRequestList?maxResults=50&firstResult=0&id_EQ=${id}`,
        method: "GET",
      }),
      transformResponse: (response: GetSubmitterRequestListResponse) =>
        transformResponse(response),
    }),
    // getRemoveHistoryInfringementInfoStep: builder.mutation<
    //   GetRemoveHistoryInfringementInfoStepResponse,
    //   GetRemoveHistoryInfringementInfoStepRequest
    // >({
    //   query: (body) => ({
    //     url: "/data/form/RegistrationRecordsViolationInformation/get?relation=d32efc33c18a48d1839ab41a53a4f519",
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["tag/committee"],
    //   transformResponse: (response: GetRemoveHistoryInfringementInfoStepResponse) => {
    //     return transformCreateResponse(response);
    //   },
    // }),
    sendRemoveHistoryAgreementRequestModal: builder.mutation<
      SendRemoveHistoryAgreementRequestModalResponse,
      SendRemoveHistoryAgreementRequestModalRequest
    >({
      query: (body) => ({
        url: "/data/form/AgreeRemovalRequestRecord/016b8b100dbb4ba6aa2d4a65946edca6/save",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendRemoveHistoryAgreementRequestModalResponse) => {
        return transformCreateResponse(response);
      },
    }),
    sendRemoveHistoryOppositionRequestModal: builder.mutation<
      SendRemoveHistoryOppositionRequestModalResponse,
      SendRemoveHistoryOppositionRequestModalRequest
    >({
      query: (body) => ({
        url: "/data/form/OpposedDeletingRecord/2798765f4db6488a93946bdb0a769a58/save",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendRemoveHistoryOppositionRequestModalResponse) => {
        return transformCreateResponse(response);
      },
    }),
    getRemoveHistoryOtherDocuments: builder.query<
      GetRemoveHistoryOtherDocumentsResponse,
      number
    >({
      query: (violationId) => ({
        url: `/data/form/GetAttachedFiles?maxResults=50&firstResult=0&violationId_EQ=${violationId}`,
        method: "GET",
      }),
      transformResponse: (response: GetRemoveHistoryOtherDocumentsResponse) =>
        transformResponse(response),
    }),
    sendRegistrationDeletionRequest: builder.mutation<
      SendRegistrationDeletionResponse,
      SendRegistrationDeletionRequest
    >({
      query: (body) => ({
        url: "/data/form/RegistrationDeletionRequest/93177c9aa85149e0a019f54607bc2b17/save",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendRegistrationDeletionResponse) => {
        return transformCreateResponse(response);
      },
    }),
  }),
});
export const {
  useLazyGetSubmitterRequestListQuery,
  useLazyGetSubmitterRequestListCountQuery,
  useGetSubmitterDetailRequestInformationMutation,
  useGetSubmitterDetailRequestLetterMutation,
  useLazyGetSubmitterDetailRejectReasonQuery,
  useLazyGetSubmitterDetailLetterInformationQuery,
  useLazyGetSubmitterDetailTableInformationQuery,
  useLazyGetSubmitterAddTypeInformationQuery,
  useLazyGetSubmitterAddReasonRequestQuery,
  useLazyGetRemoveReasonRequestQuery,
  useSendSubmitterAddAccusationRequestMutation,
  useSendSubmitterAddPacketInfoMutation,
  useLazyGetSubmitterAddPacketInfoQuery,
  useGetSubmitterAddAccusationRequestMutation,
  useGetConfirmerDetailCheckInquiryMutation,
  useLazyGetReasonRejectingInquiryRequestQuery,
  useSendReasonRejectingInquiryRequestMutation,
  useLazyGetViolationsInquiryRequestQuery,
  useLazyGetViolationsInquirySelectedListQuery,
  useSendViolationsInquirySelectedListMutation,
  useSendSignatoryLetterInformationMutation,
  useFinalRequestConfirmationMutation,
  useLazyGetSubmitterHistoryRequestListQuery,
  useLazyGetSubmitterHistoryRequestListCountQuery,
  useLazyGetRemoveHistoryRequestDetailsQuery,
  // useGetRemoveHistoryInfringementInfoStepMutation,
  useSendRemoveHistoryAgreementRequestModalMutation,
  useSendRemoveHistoryOppositionRequestModalMutation,
  useLazyGetRemoveHistoryOtherDocumentsQuery,
  useSendRegistrationDeletionRequestMutation,
} = committeeHistoryApis;
