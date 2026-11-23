import {
  CountResponse,
  GetCommitteeReportRequest,
  GetCommitteeReportResponse,
} from "@pages/Committee/HandleProcessing/Reports/CommitteeReport/helper/components/CommitteeReport/@types/@committeeReportTable";

import {
  GetAccusationsRequest,
  GetAccusationsResponse,
  GetRejectSessionRequest,
  GetRejectSessionResponse,
  SendRejectSessionRequest,
  SendRejectSessionResponse,
} from "../../../../../../components/Committee/HandleProcessing/Accusations/AccusationsListTable/@types/@accusationsListTable";
import {
  GetSecurityDataInResearchSectionResponse,
  GetTotalDataInResearchSectionRawResponse,
  MaxResultAndIdType,
} from "../../../../../../components/Committee/HandleProcessing/Accusations/AdditionalResearch/@types/@additionalResearchTab";
import { GetInfoInvestigationChargesResponse } from "../../../../../../components/Committee/HandleProcessing/Accusations/Information/@types/@accusedAndReporterInformationTab";
import {
  GetChargesInfoThirdTabResponse,
  RequestWithId,
} from "../../../../../../components/Committee/HandleProcessing/Accusations/InfringementInfo/@types/@infringementInfoTab";
import {
  InvestigationAccusationsVoteIssuedRawResponse,
  InvestigationAccusationsVoteIssuedRequest,
  InvestigationAccusationsVoteIssuedResponse,
} from "../../../../../../components/Committee/HandleProcessing/Accusations/IssuedVote/@types/@issuedVoteTab";
import { GetAccusationDetailFirstTabReportResponse } from "../../../../../../components/Committee/HandleProcessing/Accusations/Report/@types/@report";
import {
  GetStudentDefenseTabRawResponse,
  GetStudentDefenseTabRequest,
  GetStudentDefenseTabResponse,
} from "../../../../../../components/Committee/HandleProcessing/Accusations/StudentDefense/@types/@studentDefenseTab";
import { GetAccusationAppealListResponse } from "../../../../../../components/Committee/HandleProcessing/AppealAccusation/AccusationsAppealListTable/@types/@accusationsAppealListTable";
import {
  SendAccusationReferralAppealRequest,
  SendAccusationReferralAppealResponse,
} from "../../../../../../components/Committee/HandleProcessing/AppealAccusation/AppealAccusationUtils/@types/@accusationCaseReferralModal";
import {
  GetAppealMeetingInfoToVoteResponse,
  SendAppealRegistrationVoteRequest,
  SendAppealRegistrationVoteResponse,
} from "../../../../../../components/Committee/HandleProcessing/AppealAccusation/AppealAccusationUtils/@types/@accusationCaseVoteRegistrationModal";
import {
  GetAppealMeetingOtherFilesResponse,
  GetAppealMeetingSelectSessionListResponse,
  GetAppealMeetingSessionAllocationModalRequest,
  GetAppealMeetingSessionAllocationModalResponse,
  SendAppealMeetingSessionAllocationModalRequest,
  SendAppealMeetingSessionAllocationModalResponse,
} from "../../../../../../components/Committee/HandleProcessing/AppealAccusation/AppealAccusationUtils/@types/@allocationModal";
import {
  GetReasonsReferralResponse,
  SendReferralRequest,
  SendReferralResponse,
  getTitleReferralModalResponse,
} from "../../../../../../components/Modals/Committee/AccusationCase/AccusationCaseReferralModal/@type/@accusationCaseReferralModal";
import {
  AllocationPreliminaryMeetingRequest,
  FirstMaxRequest,
  GetOtherFilesRequest,
  GetOtherFilesResponse,
  GetPreliminaryMeetingResponse,
  GetPrimaryProviderResponse,
  GetSessionDurationResponse,
} from "../../../../../../components/Modals/Committee/AccusationCase/AccusationCaseSessionAllocationModal/@type/@typeAccusationCaseSessionAllocationModal";
import {
  RegisterPrimaryVoteRequest,
  RegisterPrimaryVoteResponse,
} from "../../../../../../components/Modals/Committee/AccusationCase/AccusationCaseVoteRegistrationModal/@type/@accusationCaseVoteRegistrationModal";
import {
  GetAmendmentDataRequest,
  GetAmendmentDataResponse,
} from "../../../../../../components/Modals/Committee/AccusationCase/EditAccusationModal/@type/@typeEditAccusationModal";
import {
  SendReportAmendmentRequest,
  SendReportAmendmentResponse,
  getReportAmendmentRequest,
  getReportAmendmentResponse,
} from "../../../../../../components/Modals/Committee/ReportDetail/EditReportModal/@types/@editReportModal";
import {
  SendReferralReportRequest,
  SendReferralReportResponse,
} from "../../../../../../components/Modals/Committee/ReportDetail/ReferralReportModal/@types/@referralReportModal";
import {
  GetSelectionMeetingRequest,
  GetSessionPresentationReasonResponse,
  SendSessionAllocationRequest,
  SendSessionAllocationResponse,
} from "../../../../../../components/Modals/Committee/SessionAllocation/@types/@sessionAllocationModal";
import {
  GetAppealReferralRemovalResponse,
  MoveToClarificationCommitteeAppealRequest,
  MoveToClarificationCommitteeAppealResponse,
  MoveToReadyMeetingAppealCommitteeRequest,
  MoveToReadyMeetingAppealCommitteeResponse,
  RecordOpinionSecretaryAppealRequest,
  RecordOpinionSecretaryAppealResponse,
  SendAppealCancelMoveToReadyMeetingRequest,
  SendAppealCancelMoveToReadyMeetingResponse,
  SendAppealReferralRemovalRequest,
  SendAppealReferralRemovalResponse,
} from "../../../../../../pages/Committee/HandleProcessing/AccusationAppeal/AccusationAppealDetail/@types/@typesAccusationAppealDetail";
import {
  CentralAccusationSendCancelMoveToReadyMeetingRequest,
  CentralAccusationSendCancelMoveToReadyMeetingResponse,
  CentralAccusationSendMoveToClarificationCommitteeRequest,
  CentralAccusationSendMoveToClarificationCommitteeResponse,
  CentralAccusationSendMoveToReadyMeetingRequest,
  CentralAccusationSendMoveToReadyMeetingResponse,
  CentralAccusationSendRecordOpinionRequest,
  CentralAccusationSendRecordOpinionResponse,
  CentralAccusationSendReferralModalRequest,
  CentralAccusationSendReferralModalResponse,
  CentralAccusationSendReferralRemovalRequest,
  CentralAccusationSendReferralRemovalResponse,
  CentralAccusationSendRegisterVoteRequest,
  CentralAccusationSendRegisterVoteResponse,
  CentralAccusationSendSessionAllocationRequest,
  CentralAccusationSendSessionAllocationResponse,
  getCentralAccusationReferralRemovalResponse,
} from "../../../../../../pages/Committee/HandleProcessing/AccusationCentral/AccusationCentralDetail/@types/@centralAccusationDetail";
import {
  CancelMoveToReadyMeetingRequest,
  GetAccusedUserByIdRequest,
  GetAccusedUserByIdResponse,
  GetReasonsRejectChargeResponse,
  GetRegisterCommentResponse,
  MoveToReadyMeetingRequest,
  ReasonsRejectionChargeRequest,
  ReasonsRejectionChargeResponse,
  RecordOpinionSecretaryPreliminaryRequest,
  RecordOpinionSecretaryPreliminaryResponse,
  ReferralRemovalRequest,
  moveToClarificationCommitteeRequest,
} from "../../../../../../pages/Committee/HandleProcessing/Accusations/AccusationCase/@types/@typesCommitteeAccusationCase";
import {
  GetRemovalReportReferenceRequest,
  GetRemovalReportReferenceResponse,
  GetReportDetailRequest,
  GetReportDetailResponse,
  SendRegisteringOpinionReportSecretaryRequest,
  SendRegisteringOpinionReportSecretaryResponse,
  SendRejectingChargeRequest,
  SendRejectingChargeResponse,
  SendRemovalReportReferenceRequest,
  SendRemovalReportReferenceResponse,
} from "../../../../../../pages/Committee/HandleProcessing/Reports/ReportDetail/@types/@typesCommitteeReportDetail";
import {
  SendCommitteeReportRequest,
  SendCommitteeReportResponse,
} from "../../../../../../pages/Committee/HandleProcessing/Reports/ReportSubmit/@types/@typesCommitteeReportSubmit";
import {
  SendAmendmentDataRequest,
  SendAmendmentDataResponse,
} from "../../../../../../pages/Committee/HandleProcessing/Reports/SubmitInfringement/@types/@typesSubmitInfringement";
import { GetSelectionMeetingResponse } from "../../../../../../pages/Committee/RealizationList/ModalContents/SessionAllocation/@types/@sessionAllocationModalContent";
import { countTransformResponse } from "../../../../../helpers/NetworkHelpers/CountResponseTransformer/CountResponseTransformer";
import { transformCreateResponse } from "../../../../../helpers/NetworkHelpers/CreateResponseTransformer/transformCreateResponse";
import {
  GetEducationalDataInResearchSectionResponse,
  GetResearchDataInResearchSectionResponse,
  GetSecurityDataInResearchSection,
  GetStudentDataInResearchSectionResponse,
  getEducationalDataInResearchSectionTransformer,
  getResearchDataInResearchSectionTransformer,
  getSecurityDataInResearchSectionTransformer,
  getStudentDataInResearchSectionTransformer,
  getStudentDefenseTabTransformer,
  getTotalDataInResearchSectionTransformer,
} from "../../../../../helpers/NetworkHelpers/CustomResponseTransformers/CustomResponseTransformers";
import { accusationCaseIssuedVoteTransformer } from "../../../../../helpers/NetworkHelpers/GeneralResponseTransformers/Committee/HandleProcessings/HandleProcessingTransformers";
import { transformObjectResponse } from "../../../../../helpers/NetworkHelpers/ResponseObjectTransformer/transformObjectResponse";
import { transformResponse } from "../../../../../helpers/NetworkHelpers/ResponseTransformer/ResponseTransformer";
import {
  GetAccusationCentralListResponse,
  GetCentralAccusationChangeMeetingModalAllDataRequest,
  GetCentralAccusationChangeMeetingModalAllDataResponse,
  GetCentralAccusationSelectionMeetingRequest,
  GetCentralAccusationSelectionMeetingResponse,
  GetCommitteeCentralAccusationOtherFileRequest,
  GetCommitteeCentralAccusationOtherFileResponse,
  SendCentralAccusationSessionAllocationModalRequest,
  SendCentralAccusationSessionAllocationModalResponse,
} from "../../../../../models/modules/committee/handleProcessing/accusationCenteral/accusationCenteral";
import { committeeApi } from "../../committeeApi";

export const handleProcessing = committeeApi.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query<GetCommitteeReportResponse, GetCommitteeReportRequest>({
      query: ({ sortBy = "id", sortOrder = "desc", firstResult, maxResults, type }) => ({
        url: `/data/form/AllReports?sortBy=${sortBy}&sortOrder=${sortOrder}&firstResult=${firstResult}&maxResults=${maxResults}${
          type !== "همه" ? `&violationStatus_EQ=${encodeURIComponent(type)}` : ""
        }`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (baseQueryReturnValue) => {
        return transformResponse(baseQueryReturnValue);
      },
    }),
    getReportsCount: builder.query<
      CountResponse,
      { type: string; sortOrder?: string; sortBy?: string }
    >({
      query: ({ sortBy = "id", sortOrder = "desc", type }) => ({
        url: `/data/form/AllReports/count?sortBy=${sortBy}&sortOrder=${sortOrder}${
          type !== "همه" ? `&violationStatus_EQ=${encodeURIComponent(type)}` : ""
        }`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (baseQueryReturnValue) => {
        return countTransformResponse(baseQueryReturnValue);
      },
    }),
    sendReport: builder.mutation<SendCommitteeReportResponse, SendCommitteeReportRequest>(
      {
        query: (data) => ({
          url: "/process-definition/reportProces:9:1ff0cc22-9662-11ee-9ecd-005056936ed7/submit-form",
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        }),
        invalidatesTags: ["tag/committee"],
        transformResponse: (response: SendCommitteeReportResponse) => {
          return transformObjectResponse(response);
        },
      }
    ),
    getReportDetail: builder.query<GetReportDetailResponse, GetReportDetailRequest>({
      query: ({ id }) => ({
        url: `/data/form/ReportDetails?maxResults=1&id_EQ=${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (baseQueryReturnValue) => {
        return transformResponse(baseQueryReturnValue);
      },
    }),
    getAccusationsList: builder.query<GetAccusationsResponse, GetAccusationsRequest>({
      query: ({ firstResult, maxResults, type }) => ({
        url: `/data/form/ChargeList?maxResults=${maxResults}&firstResult=${firstResult}${
          type !== "همه" ? `&violationStatus_EQ=${encodeURIComponent(type)}` : ""
        }`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetAccusationsResponse) => {
        return transformResponse(response);
      },
    }),
    getAccusationsListCount: builder.query<CountResponse, { type: string }>({
      query: ({ type }) => ({
        url: `/data/form/ChargeList/count?${
          type !== "همه" ? `violationStatus_EQ=${encodeURIComponent(type)}` : ""
        }`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: CountResponse) => {
        return countTransformResponse(response);
      },
    }),
    getRejectSession: builder.query<GetRejectSessionResponse, GetRejectSessionRequest>({
      query: ({ firstResult, maxResults }) => ({
        url: `/data/form/ReasonsReturningMeeting?maxResults=${maxResults}&firstResult=${firstResult}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetRejectSessionResponse) => {
        return transformResponse(response);
      },
    }),
    sendRejectSession: builder.mutation<
      SendRejectSessionResponse,
      SendRejectSessionRequest
    >({
      query: (body) => ({
        url: "/data/form/ReturnPreliminarySession/c7ab00eef1334dba8b48d1515b75ea81/save",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendRejectSessionResponse) => {
        return transformCreateResponse(response);
      },
    }),
    //! SessionAllocation modal
    getSelectionMeeting: builder.query<
      GetSelectionMeetingResponse,
      GetSelectionMeetingRequest
    >({
      query: ({ firstResult, maxResults, meetingDate_GTEQ }) => ({
        url: `/data/form/PreliminaryMeeting?maxResults=${maxResults}&firstResult=${firstResult}&meetingDate_GTEQ=${meetingDate_GTEQ}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetSelectionMeetingResponse) => {
        return transformResponse(response);
      },
    }),
    getSessionPresentationReason: builder.query<
      GetSessionPresentationReasonResponse,
      FirstMaxRequest
    >({
      query: ({ firstResult, maxResults }) => ({
        url: `/data/form/ReasonHoldingMeeting?maxResults=${maxResults}&firstResult=${firstResult}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetSessionPresentationReasonResponse) => {
        return transformResponse(response);
      },
    }),
    getSessionDuration: builder.query<GetSessionDurationResponse, FirstMaxRequest>({
      query: ({ firstResult, maxResults }) => ({
        url: `/data/form/SessionDuration?maxResults=${maxResults}&firstResult=${firstResult}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetSessionDurationResponse) => {
        return transformResponse(response);
      },
    }),
    getOtherFiles: builder.query<GetOtherFilesResponse, GetOtherFilesRequest>({
      query: ({ maxResults, AssociationMeeting_id_EQ }) => ({
        url: `/data/form/ChargesMeetingAllocation?maxResults=${maxResults}&AssociationMeeting_id_EQ=${AssociationMeeting_id_EQ}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetOtherFilesResponse) => {
        return transformResponse(response);
      },
    }),
    sendSessionAllocation: builder.mutation<
      SendSessionAllocationResponse,
      SendSessionAllocationRequest
    >({
      query: (body) => ({
        url: "/data/form/AllocationPreliminarySession/dafdee9f6c3d4d9183de15c4f84f563a/save",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendSessionAllocationResponse) => {
        return transformCreateResponse(response);
      },
    }),
    getAccusationDetailFirstTabReport: builder.query<
      GetAccusationDetailFirstTabReportResponse,
      MaxResultAndIdType
    >({
      query: ({ maxResults, id }) => ({
        url: `/data/form/ReportInvestigationCharges?maxResults=${maxResults}&id_EQ=${id}`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetAccusationDetailFirstTabReportResponse) => {
        return transformResponse(response);
      },
    }),
    getInfoInvestigationChargesSecondTab: builder.query<
      GetInfoInvestigationChargesResponse,
      MaxResultAndIdType
    >({
      query: ({ maxResults, id }) => ({
        url: `/data/form/InfoPartiesInvestigationCharges?maxResults=${maxResults}&id_EQ=${id}`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetInfoInvestigationChargesResponse) => {
        return transformResponse(response);
      },
    }),
    getChargesInfoThirdTab: builder.mutation<
      GetChargesInfoThirdTabResponse,
      RequestWithId
    >({
      query: (body) => ({
        url: "data/form/ChargeInfoInvestigationCharges/get?relation=245a806c9d33408993d443165918b720",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: GetChargesInfoThirdTabResponse) => {
        return transformObjectResponse(response);
      },
    }),
    getSecurityDataInResearchSection: builder.query<
      GetSecurityDataInResearchSectionResponse,
      MaxResultAndIdType
    >({
      query: ({ maxResults, id }) => ({
        url: `/data/form/ChargeInfoInvestigationAdditionalResearch?maxResults=${maxResults}&id_EQ=${id}`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetSecurityDataInResearchSection) => {
        return getSecurityDataInResearchSectionTransformer(response);
      },
    }),
    getEducationalDataInResearchSection: builder.query<
      GetSecurityDataInResearchSectionResponse,
      MaxResultAndIdType
    >({
      query: ({ maxResults, id }) => ({
        url: `/data/form/ChargeInfoInvestigationAdditionalResearchEducAssistant?maxResults=${maxResults}&id_EQ=${id}`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetEducationalDataInResearchSectionResponse) => {
        return getEducationalDataInResearchSectionTransformer(response);
      },
    }),
    getResearchDataInResearchSection: builder.query<
      GetSecurityDataInResearchSectionResponse,
      MaxResultAndIdType
    >({
      query: ({ maxResults, id }) => ({
        url: `/data/form/ChargeInfoInvestigationAdditionalResearchResearchAssistant?maxResults=${maxResults}&id_EQ=${id}`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetResearchDataInResearchSectionResponse) => {
        return getResearchDataInResearchSectionTransformer(response);
      },
    }),
    getStudentDataInResearchSection: builder.query<
      GetSecurityDataInResearchSectionResponse,
      MaxResultAndIdType
    >({
      query: ({ maxResults, id }) => ({
        url: `/data/form/ChargeInfoInvestigationAdditionalResearchStudentVice?maxResults=${maxResults}&id_EQ=${id}`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetStudentDataInResearchSectionResponse) => {
        return getStudentDataInResearchSectionTransformer(response);
      },
    }),
    getTotalDataInResearchSection: builder.query<
      GetSecurityDataInResearchSectionResponse,
      MaxResultAndIdType
    >({
      query: ({ maxResults, id }) => ({
        url: `/data/form/ChargeInfoInvestigationAdditionalResearchMain?maxResults=${maxResults}&id_EQ=${id}`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetTotalDataInResearchSectionRawResponse) => {
        return getTotalDataInResearchSectionTransformer(response);
      },
    }),
    GetStudentDefenseTab: builder.query<
      GetStudentDefenseTabResponse,
      GetStudentDefenseTabRequest
    >({
      query: ({ maxResults, id }) => ({
        url: `/data/form/InvestigationAccusationsStudentDefense?maxResults=${maxResults}&id_EQ=${id}`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetStudentDefenseTabRawResponse[]) => {
        return getStudentDefenseTabTransformer(response);
      },
    }),
    getAccusedUserById: builder.query<
      GetAccusedUserByIdResponse,
      GetAccusedUserByIdRequest
    >({
      query: ({ maxResults, id }) => ({
        url: `/data/form/InvestigationChargesAccusationInformation?maxResults=${maxResults}&id_EQ=${id}`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetAccusedUserByIdResponse) => {
        return transformResponse(response);
      },
    }),
    getRegisterComment: builder.query<GetRegisterCommentResponse, any>({
      query: () => ({
        url: "/data/form/RegisterComment?maxResults=50&firstResult=0",
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetRegisterCommentResponse) => {
        return transformResponse(response);
      },
    }),
    sendRecordOpinionSecretaryPreliminary: builder.mutation<
      RecordOpinionSecretaryPreliminaryResponse,
      RecordOpinionSecretaryPreliminaryRequest
    >({
      query: (body) => ({
        url: "/data/form/RecordOpinionSecretaryPreliminary/85cc99e2566f41cfb1d34ef5b74074ed/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: RecordOpinionSecretaryPreliminaryResponse) => {
        return transformObjectResponse(response);
      },
    }),
    cancelMoveToReadyMeeting: builder.mutation<any, CancelMoveToReadyMeetingRequest>({
      query: (body) => ({
        url: "/data/form/CancelMoveToReadyMeeting/1527c664c5784124836fe1a91b652b45/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: any) => {
        return transformObjectResponse(response);
      },
    }),
    moveToReadyMeeting: builder.mutation<any, MoveToReadyMeetingRequest>({
      query: (body) => ({
        url: "/data/form/MoveToReadyMeeting/4b2db2af0e5742d2811d469d36a481ef/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: any) => {
        return transformObjectResponse(response);
      },
    }),
    moveToClarificationCommittee: builder.mutation<
      any,
      moveToClarificationCommitteeRequest
    >({
      query: (body) => ({
        url: "/data/form/TransferToUnderstanding/83639abb705942ff92cb98426793d9a7/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: any) => {
        return transformObjectResponse(response);
      },
    }),
    getReferralRemoval: builder.query<any, string>({
      query: (id) => ({
        url: `/data/form/RemovalChargeReference?maxResults=1&id_EQ=${id}`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: any) => {
        return transformResponse(response);
      },
    }),
    getCentralAccusationReferralRemoval: builder.query<
      getCentralAccusationReferralRemovalResponse,
      number
    >({
      query: (id) => ({
        url: `/data/form/CentrulRemovalChargeReference?maxResults=50&firstResult=0&id_EQ=${id}`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: getCentralAccusationReferralRemovalResponse) => {
        return transformResponse(response);
      },
    }),
    referralRemoval: builder.mutation<any, ReferralRemovalRequest>({
      query: (body) => ({
        url: "/data/form/RemovalChargeReference/a036b0a734534600913d75875b0475bd/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: any) => {
        return transformObjectResponse(response);
      },
    }),
    getPreliminaryMeeting: builder.query<GetPreliminaryMeetingResponse, void>({
      query: () => ({
        url: `/data/form/PreliminaryMeeting?maxResults=50&firstResult=0`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetPreliminaryMeetingResponse) => {
        return transformResponse(response);
      },
    }),
    getPrimaryProvider: builder.query<GetPrimaryProviderResponse, void>({
      query: () => ({
        url: `/data/form/PrimaryHost?maxResults=50&firstResult=0`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetPrimaryProviderResponse) => {
        return transformResponse(response);
      },
    }),
    allocationPreliminaryMeeting: builder.mutation<
      any,
      AllocationPreliminaryMeetingRequest
    >({
      query: (body) => ({
        url: "/data/form/AllocationPreliminaryMeeting/bd98b974316c44a1a8d11f9a048d018b/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: any) => {
        return transformObjectResponse(response);
      },
    }),
    getReasonsReferral: builder.query<GetReasonsReferralResponse, void>({
      query: () => ({
        url: `/data/form/ReasonsReferral?maxResults=50&firstResult=0`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetReasonsReferralResponse) => {
        return transformResponse(response);
      },
    }),
    sendReferral: builder.mutation<SendReferralResponse, SendReferralRequest>({
      query: (body) => ({
        url: "/data/form/ReferralCharges/26ba82ea702c4838b6390d16db1e76a8/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendReferralResponse) => {
        return transformObjectResponse(response);
      },
    }),

    registerPrimaryVote: builder.mutation<
      RegisterPrimaryVoteResponse,
      RegisterPrimaryVoteRequest
    >({
      query: (body) => ({
        url: "/data/form/RegistrationPrimaryVote/190d06e5b15d42eb8de0fd995131a31a/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: RegisterPrimaryVoteResponse) => {
        return transformObjectResponse(response);
      },
    }),
    getReasonsRejectionCharge: builder.query<GetReasonsRejectChargeResponse, void>({
      query: () => ({
        url: `/data/form/ReasonRejectingCharge?maxResults=50&firstResult=0`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetReasonsRejectChargeResponse) => {
        return transformResponse(response);
      },
    }),
    sendReasonsRejectionCharge: builder.mutation<
      ReasonsRejectionChargeResponse,
      ReasonsRejectionChargeRequest
    >({
      query: (body) => ({
        url: "/data/form/RejectingCharge/339ce5755dc942eba4f8ad99f64eadfe/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: ReasonsRejectionChargeResponse) => {
        return transformObjectResponse(response);
      },
    }),
    getAmendmentData: builder.mutation<GetAmendmentDataResponse, GetAmendmentDataRequest>(
      {
        query: (body) => ({
          url: "/data/form/AmendmentCharge/get?relation=fcf128ff56ef4e10a35f88c8a70a015f",
          method: "POST",
          body,
        }),
        invalidatesTags: ["tag/committee"],
        transformResponse: (response: GetAmendmentDataResponse) => {
          return transformObjectResponse(response);
        },
      }
    ),
    sendAmendmentData: builder.mutation<
      SendAmendmentDataResponse,
      SendAmendmentDataRequest
    >({
      query: (body) => ({
        url: "/data/form/AmendmentCharge/fcf128ff56ef4e10a35f88c8a70a015f/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendAmendmentDataResponse) => {
        return transformObjectResponse(response);
      },
    }),
    getInvestigationAccusationsVoteIssued: builder.mutation<
      InvestigationAccusationsVoteIssuedResponse,
      InvestigationAccusationsVoteIssuedRequest
    >({
      query: (body) => ({
        url: "/data/form/InvestigationAccusationsVoteIssued/get?relation=b726869f5b6c417d9130c11c393b03b9",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: InvestigationAccusationsVoteIssuedRawResponse) => {
        // todo[Atefeh]: check this type and the logic of transformer
        return accusationCaseIssuedVoteTransformer(response) as any;
      },
    }),
    getRemovalReportReference: builder.mutation<
      GetRemovalReportReferenceResponse,
      GetRemovalReportReferenceRequest
    >({
      query: (body) => ({
        url: "/data/form/RemovalReportReference/get?relation=4f82d21da05b4dbbbccd4bd7023c929e",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: GetRemovalReportReferenceResponse) => {
        return transformObjectResponse(response);
      },
    }),
    sendRemovalReportReference: builder.mutation<
      SendRemovalReportReferenceResponse,
      SendRemovalReportReferenceRequest
    >({
      query: (body) => ({
        url: "/data/form/RemovalReportReference/4f82d21da05b4dbbbccd4bd7023c929e/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendRemovalReportReferenceResponse) => {
        return transformObjectResponse(response);
      },
    }),
    sendRejectingCharge: builder.mutation<
      SendRejectingChargeResponse,
      SendRejectingChargeRequest
    >({
      query: (body) => ({
        url: "/data/form/RejectingCharge/339ce5755dc942eba4f8ad99f64eadfe/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendRejectingChargeResponse) => {
        return transformObjectResponse(response);
      },
    }),
    sendReferralReport: builder.mutation<
      SendReferralReportResponse,
      SendReferralReportRequest
    >({
      query: (body) => ({
        url: "/data/form/ReferralReport/dbdf2bad2182421fa4620c93a2dbb0c9/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendReferralReportResponse) => {
        return transformObjectResponse(response);
      },
    }),
    sendRegisteringOpinionReportSecretary: builder.mutation<
      SendRegisteringOpinionReportSecretaryResponse,
      SendRegisteringOpinionReportSecretaryRequest
    >({
      query: (body) => ({
        url: "/data/form/RegisteringOpinionReportSecretary/45c76760312444d8bd4114101bf92fa2/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendRegisteringOpinionReportSecretaryResponse) => {
        return transformObjectResponse(response);
      },
    }),
    getReportAmendment: builder.mutation<
      getReportAmendmentResponse,
      getReportAmendmentRequest
    >({
      query: (body) => ({
        url: "/data/form/ReportAmendment/get?relation=b6a748e3025a4f2c8936d04cc3ca2470",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: getReportAmendmentResponse) => {
        return transformObjectResponse(response);
      },
    }),
    sendReportAmendment: builder.mutation<
      SendReportAmendmentResponse,
      SendReportAmendmentRequest
    >({
      query: (body) => ({
        url: "/data/form/ReportAmendment/b6a748e3025a4f2c8936d04cc3ca2470/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendReportAmendmentResponse) => {
        return transformObjectResponse(response);
      },
    }),

    getTitleReferralModal: builder.query<getTitleReferralModalResponse, void>({
      query: () => ({
        url: `/data/form/SecurityReferenceableRoles?maxResults=50&firstResult=0`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: getTitleReferralModalResponse) => {
        return transformResponse(response);
      },
    }),
    getAccusationAppealList: builder.query<
      GetAccusationAppealListResponse,
      {
        firstResult: number;
        maxResults: number;
        type: "1,2,3,4,5,6,7,8,9" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
      }
    >({
      query: ({ firstResult, maxResults, type }) => ({
        url: `/data/form/ChargeAppealsList?maxResults=${maxResults}&firstResult=${firstResult}&AssociationStatusAppealsCommittee_id_IN=${type}`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetAccusationAppealListResponse) => {
        return transformResponse(response);
      },
    }),
    getAccusationAppealListCount: builder.query<
      CountResponse,
      {
        type: "1,2,3,4,5,6,7,8,9" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
      }
    >({
      query: ({ type }) => ({
        url: `/data/form/ChargeAppealsList/count?AssociationStatusAppealsCommittee_id_IN=${type}`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (baseQueryReturnValue) => {
        return countTransformResponse(baseQueryReturnValue);
      },
    }),
    getAccusationCentralList: builder.query<
      GetAccusationCentralListResponse,
      {
        firstResult: number;
        maxResults: number;
        type: "1,2,3,4,5,7,8,9" | 1 | 2 | 3 | 4 | 5 | 7 | 8 | 9;
      }
    >({
      query: ({ firstResult, maxResults, type }) => ({
        url: `/data/form/ChargeCentralList?maxResults=${maxResults}&firstResult=${firstResult}&AssociationStatusCentrulCommittee_id_IN=${type}`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetAccusationCentralListResponse) => {
        return transformResponse(response);
      },
    }),
    getAccusationCentralListCount: builder.query<
      CountResponse,
      {
        type: "1,2,3,4,5,7,8,9" | 1 | 2 | 3 | 4 | 5 | 7 | 8 | 9;
      }
    >({
      query: ({ type }) => ({
        url: `/data/form/ChargeCentralList/count?AssociationStatusCentrulCommittee_id_IN=${type}`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (baseQueryReturnValue) => {
        return countTransformResponse(baseQueryReturnValue);
      },
    }),
    getCentralAccusationSelectionMeeting: builder.query<
      GetCentralAccusationSelectionMeetingResponse,
      GetCentralAccusationSelectionMeetingRequest
    >({
      query: ({ firstResult, maxResults }) => {
        return {
          url: `/data/form/CenrtulMeeting?maxResults=${maxResults}&firstResult=${firstResult}`,
          // ! &meetingDate_GTEQ=${meetingDate_GTEQ}
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      providesTags: ["tag/committee"],
      transformResponse: (response: GetCentralAccusationSelectionMeetingResponse) => {
        return transformResponse(response);
      },
    }),
    getCentralAccusationGetOtherFiles: builder.query<
      GetCommitteeCentralAccusationOtherFileResponse,
      GetCommitteeCentralAccusationOtherFileRequest
    >({
      query: ({ maxResults, AssociationCentrulMeeting_id_EQ }) => ({
        url: `/data/form/CentrulMeetingOtherFiles?maxResults=${maxResults}&AssociationCentrulMeeting_id_EQ=${AssociationCentrulMeeting_id_EQ}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetCommitteeCentralAccusationOtherFileResponse) => {
        return transformResponse(response);
      },
    }),
    sendCentralAccusationSessionAllocationModal: builder.mutation<
      SendCentralAccusationSessionAllocationModalResponse,
      SendCentralAccusationSessionAllocationModalRequest
    >({
      query: (body) => ({
        url: "/data/form/AllocationCentrulMeeting/e726b299999e47d3835ff6fcc1c15486/save",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (
        response: SendCentralAccusationSessionAllocationModalResponse
      ) => {
        return transformObjectResponse(response);
      },
    }),
    getCentralAccusationChangeMeetingModalAllData: builder.mutation<
      GetCentralAccusationChangeMeetingModalAllDataResponse,
      GetCentralAccusationChangeMeetingModalAllDataRequest
    >({
      query: (body) => ({
        url: "/data/form/AllocationCentrulMeeting/get?relation=e726b299999e47d3835ff6fcc1c15486",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (
        response: GetCentralAccusationChangeMeetingModalAllDataResponse
      ) => {
        return transformObjectResponse(response);
      },
    }),
    centralAccusationSendReferralModal: builder.mutation<
      CentralAccusationSendReferralModalResponse,
      CentralAccusationSendReferralModalRequest
    >({
      query: (body) => ({
        url: "/data/form/CentrulReferralCharges/6d6b95b5dca34c888d190505f281b28c/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: CentralAccusationSendReferralModalResponse) => {
        return transformObjectResponse(response);
      },
    }),
    centralAccusationSendReferralRemoval: builder.mutation<
      CentralAccusationSendReferralRemovalResponse,
      CentralAccusationSendReferralRemovalRequest
    >({
      query: (body) => ({
        url: "/data/form/CentrulRemovalChargeReference/a325f230559e41ca9b6dfe2c7bc22d50/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: CentralAccusationSendReferralRemovalResponse) => {
        return transformObjectResponse(response);
      },
    }),
    centralAccusationSendMoveToClarificationCommittee: builder.mutation<
      CentralAccusationSendMoveToClarificationCommitteeResponse,
      CentralAccusationSendMoveToClarificationCommitteeRequest
    >({
      query: (body) => ({
        url: "/data/form/CentrulTransferToUnderstanding/bdedfb5107cf47319d9cd842a172ed08/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (
        response: CentralAccusationSendMoveToClarificationCommitteeResponse
      ) => {
        return transformObjectResponse(response);
      },
    }),
    centralAccusationSendMoveToReadyMeeting: builder.mutation<
      CentralAccusationSendMoveToReadyMeetingResponse,
      CentralAccusationSendMoveToReadyMeetingRequest
    >({
      query: (body) => ({
        url: "/data/form/CentrulMoveToReadyMeeting/840068e66b0f487c96a8c2d11cc5574d/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: CentralAccusationSendMoveToReadyMeetingResponse) => {
        return transformObjectResponse(response);
      },
    }),
    centralAccusationSendSessionAllocation: builder.mutation<
      CentralAccusationSendSessionAllocationResponse,
      CentralAccusationSendSessionAllocationRequest
    >({
      query: (body) => ({
        url: "/data/form/AllocationCentrulMeeting/e726b299999e47d3835ff6fcc1c15486/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: CentralAccusationSendSessionAllocationResponse) => {
        return transformObjectResponse(response);
      },
    }),
    centralAccusationSendCancelMoveToReadyMeeting: builder.mutation<
      CentralAccusationSendCancelMoveToReadyMeetingResponse,
      CentralAccusationSendCancelMoveToReadyMeetingRequest
    >({
      query: (body) => ({
        url: "/data/form/CentrulCancelMoveToReadyMeeting/31dcf2640a1343d89e3cf73b9169a70a/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (
        response: CentralAccusationSendCancelMoveToReadyMeetingResponse
      ) => {
        return transformObjectResponse(response);
      },
    }),
    centralAccusationSendRecordOpinion: builder.mutation<
      CentralAccusationSendRecordOpinionResponse,
      CentralAccusationSendRecordOpinionRequest
    >({
      query: (body) => ({
        url: "/data/form/RecordOpinionSecretaryCentrul/435b909a499d4c288ad305432d7c682a/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: CentralAccusationSendRecordOpinionResponse) => {
        return transformObjectResponse(response);
      },
    }),
    centralAccusationSendRegisterVote: builder.mutation<
      CentralAccusationSendRegisterVoteResponse,
      CentralAccusationSendRegisterVoteRequest
    >({
      query: (body) => ({
        url: "/data/form/RegistrationCentrulVote/234e85c9fd0c4cbe9721e8d411e66ad5/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: CentralAccusationSendRegisterVoteResponse) => {
        return transformObjectResponse(response);
      },
    }),
    getAppealMeetingSelectSessionList: builder.query<
      GetAppealMeetingSelectSessionListResponse,
      void
    >({
      query: () => ({
        url: `/data/form/AppealMeeting?maxResults=50&firstResult=0`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetAppealMeetingSelectSessionListResponse) => {
        return transformResponse(response);
      },
    }),
    getAppealMeetingOtherFiles: builder.query<GetAppealMeetingOtherFilesResponse, number>(
      {
        query: (id) => ({
          url: `/data/form/AppealMeetingOtherFiles?maxResults=50&firstResult=0&AssociationMeetingAppealsCommittee_id_EQ=${id}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }),
        providesTags: ["tag/committee"],
        transformResponse: (response: GetAppealMeetingOtherFilesResponse) => {
          return transformResponse(response);
        },
      }
    ),
    getAppealMeetingSessionAllocationModal: builder.mutation<
      GetAppealMeetingSessionAllocationModalResponse,
      GetAppealMeetingSessionAllocationModalRequest
    >({
      query: (body) => ({
        url: "/data/form/AllocationAppealMeeting/get?relation=ac3e1f0a07b047209177f4db4ae3179b",
        method: "POST",
        body,
      }),
      transformResponse: (response: GetAppealMeetingSessionAllocationModalResponse) => {
        return transformObjectResponse(response);
      },
    }),
    sendAppealMeetingSessionAllocationModal: builder.mutation<
      SendAppealMeetingSessionAllocationModalResponse,
      SendAppealMeetingSessionAllocationModalRequest
    >({
      query: (body) => ({
        url: "/data/form/AllocationAppealMeeting/ac3e1f0a07b047209177f4db4ae3179b/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendAppealMeetingSessionAllocationModalResponse) => {
        return transformObjectResponse(response);
      },
    }),
    sendAppealCancelMoveToReadyMeeting: builder.mutation<
      SendAppealCancelMoveToReadyMeetingResponse,
      SendAppealCancelMoveToReadyMeetingRequest
    >({
      query: (body) => ({
        url: "/data/form/AppealCancelMoveToReadyMeeting/65384266af3d4670b43187b78eb4bef2/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendAppealCancelMoveToReadyMeetingResponse) => {
        return transformObjectResponse(response);
      },
    }),
    moveToClarificationAppealCommittee: builder.mutation<
      MoveToClarificationCommitteeAppealResponse,
      MoveToClarificationCommitteeAppealRequest
    >({
      query: (body) => ({
        url: "/data/form/AppealTransferToUnderstanding/899c29d140b949c18a6c34372f7200ab/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: MoveToClarificationCommitteeAppealResponse) => {
        return transformObjectResponse(response);
      },
    }),
    moveToReadyMeetingAppealCommittee: builder.mutation<
      MoveToReadyMeetingAppealCommitteeResponse,
      MoveToReadyMeetingAppealCommitteeRequest
    >({
      query: (body) => ({
        url: "/data/form/AppealMoveToReadyMeeting/c61aecb4b4e048948500fec322db2152/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: MoveToReadyMeetingAppealCommitteeResponse) => {
        return transformObjectResponse(response);
      },
    }),
    sendRecordOpinionSecretaryAppeal: builder.mutation<
      RecordOpinionSecretaryAppealResponse,
      RecordOpinionSecretaryAppealRequest
    >({
      query: (body) => ({
        url: "/data/form/RecordOpinionSecretaryAppeal/54698e8ee80b435d9597711bc73bacb2/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: RecordOpinionSecretaryAppealResponse) => {
        return transformObjectResponse(response);
      },
    }),
    sendAccusationReferralAppeal: builder.mutation<
      SendAccusationReferralAppealResponse,
      SendAccusationReferralAppealRequest
    >({
      query: (body) => ({
        url: "/data/form/AppealReferralCharges/f893e39a15bf45b180f0163703049a15/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendAccusationReferralAppealResponse) => {
        return transformObjectResponse(response);
      },
    }),
    getAppealReferralRemoval: builder.query<GetAppealReferralRemovalResponse, string>({
      query: (id) => ({
        url: `/data/form/ReceiveRemovalReferralAppeal?maxResults=50&firstResult=0&id_EQ=${id}`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetAppealReferralRemovalResponse) => {
        return transformResponse(response);
      },
    }),
    sendAppealReferralRemoval: builder.mutation<
      SendAppealReferralRemovalResponse,
      SendAppealReferralRemovalRequest
    >({
      query: (body) => ({
        url: "/data/form/AppealRemovalChargeReference/1f5e1db9522a488cb0291e5d83226b57/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendAppealReferralRemovalResponse) => {
        return transformObjectResponse(response);
      },
    }),
    getAppealMeetingInfoToVote: builder.query<GetAppealMeetingInfoToVoteResponse, number>(
      {
        query: (id) => ({
          url: `data/form/AppealGetMeetingInfoToVote?maxResults=50&firstResult=0&id_EQ=${id}`,
          method: "GET",
        }),
        providesTags: ["tag/committee"],
        transformResponse: (response: GetAppealMeetingInfoToVoteResponse) => {
          return transformResponse(response);
        },
      }
    ),
    sendAppealRegistrationVote: builder.mutation<
      SendAppealRegistrationVoteResponse,
      SendAppealRegistrationVoteRequest
    >({
      query: (body) => ({
        url: "/data/form/RegistrationAppealVote/d11b190351d94a1b90683f2506ce56e8/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendAppealRegistrationVoteResponse) => {
        return transformObjectResponse(response);
      },
    }),
  }),
});

export const {
  useLazyGetReportsQuery,
  useLazyGetReportDetailQuery,
  useSendReportMutation,
  useLazyGetReportsCountQuery,
  useLazyGetAccusationsListQuery,
  useLazyGetAccusationsListCountQuery,
  useLazyGetRejectSessionQuery,
  useSendRejectSessionMutation,
  useLazyGetSelectionMeetingQuery,
  useLazyGetSessionPresentationReasonQuery,
  useLazyGetSessionDurationQuery,
  useLazyGetOtherFilesQuery,
  useSendSessionAllocationMutation,
  useLazyGetAccusationDetailFirstTabReportQuery,
  useLazyGetInfoInvestigationChargesSecondTabQuery,
  useGetChargesInfoThirdTabMutation,
  useLazyGetSecurityDataInResearchSectionQuery,
  useLazyGetEducationalDataInResearchSectionQuery,
  useLazyGetStudentDataInResearchSectionQuery,
  useLazyGetResearchDataInResearchSectionQuery,
  useLazyGetStudentDefenseTabQuery,
  useLazyGetTotalDataInResearchSectionQuery,
  useLazyGetAccusedUserByIdQuery,
  useLazyGetRegisterCommentQuery,
  useSendRecordOpinionSecretaryPreliminaryMutation,
  useCancelMoveToReadyMeetingMutation,
  useMoveToReadyMeetingMutation,
  useMoveToClarificationCommitteeMutation,
  useLazyGetReferralRemovalQuery,
  useReferralRemovalMutation,
  useLazyGetPreliminaryMeetingQuery,
  useLazyGetPrimaryProviderQuery,
  useAllocationPreliminaryMeetingMutation,
  useLazyGetReasonsReferralQuery,
  useSendReferralMutation,
  useRegisterPrimaryVoteMutation,
  useLazyGetReasonsRejectionChargeQuery,
  useSendReasonsRejectionChargeMutation,
  useGetAmendmentDataMutation,
  useSendAmendmentDataMutation,
  useGetInvestigationAccusationsVoteIssuedMutation,
  useGetRemovalReportReferenceMutation,
  useSendRemovalReportReferenceMutation,
  useSendRejectingChargeMutation,
  useSendReferralReportMutation,
  useSendRegisteringOpinionReportSecretaryMutation,
  useGetReportAmendmentMutation,
  useSendReportAmendmentMutation,
  useLazyGetTitleReferralModalQuery,
  useLazyGetAccusationAppealListQuery,
  useLazyGetAccusationAppealListCountQuery,
  useLazyGetAccusationCentralListQuery,
  useLazyGetAccusationCentralListCountQuery,
  useLazyGetCentralAccusationSelectionMeetingQuery,
  useLazyGetCentralAccusationGetOtherFilesQuery,
  useSendCentralAccusationSessionAllocationModalMutation,
  useGetCentralAccusationChangeMeetingModalAllDataMutation,
  useCentralAccusationSendReferralModalMutation,
  useCentralAccusationSendReferralRemovalMutation,
  useCentralAccusationSendMoveToClarificationCommitteeMutation,
  useCentralAccusationSendMoveToReadyMeetingMutation,
  useCentralAccusationSendSessionAllocationMutation,
  useCentralAccusationSendCancelMoveToReadyMeetingMutation,
  useCentralAccusationSendRecordOpinionMutation,
  useCentralAccusationSendRegisterVoteMutation,
  useLazyGetAppealMeetingSelectSessionListQuery,
  useLazyGetAppealMeetingOtherFilesQuery,
  useGetAppealMeetingSessionAllocationModalMutation,
  useSendAppealMeetingSessionAllocationModalMutation,
  useSendAppealCancelMoveToReadyMeetingMutation,
  useMoveToClarificationAppealCommitteeMutation,
  useMoveToReadyMeetingAppealCommitteeMutation,
  useSendRecordOpinionSecretaryAppealMutation,
  useSendAccusationReferralAppealMutation,
  useLazyGetAppealReferralRemovalQuery,
  useSendAppealReferralRemovalMutation,
  useLazyGetAppealMeetingInfoToVoteQuery,
  useSendAppealRegistrationVoteMutation,
  useLazyGetCentralAccusationReferralRemovalQuery,
} = handleProcessing;
