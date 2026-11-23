import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query/react";

import {
  SendEducationChancellorReferralModalRequest,
  SendEducationChancellorReferralModalResponse,
} from "@pages/Committee/_shared/modals/EducationChancellorReferralModal/@types/@educationChancellorReferralModal";
import { GetCentralCommitteeChangeRecordsTabResponse } from "@pages/Committee/BasicInfo/CentralCommittee/CentralCommitteeTabs/helper/components/CentralCommitteeChangeRecords/@types/@centralCommitteeChangeRecords";
import {
  GetCentralCommitteeInfoTabRequest,
  GetCentralCommitteeInfoTabResponse,
} from "@pages/Committee/BasicInfo/CentralCommittee/CentralCommitteeTabs/helper/components/CentralCommitteeInfo/@types/@centralCommitteeInfo";
import { GetRealizationCommitteeTabResponse } from "@pages/Committee/BasicInfo/CommitteeRealization/CommitteeRealizationTabs/helper/components/CommitteeRealizationChangeRecords/@types/@committeeRealizationChangeRecords";
import { GetCommitteeRevisionChangeRecordsTabResponse } from "@pages/Committee/BasicInfo/CommitteeRevision/CommitteeRevisionTabs/helper/components/CommitteeRevisionChangeRecords/@types/@committeeRevisionChangeRecords";
import {
  GetCommitteeRevisionInfoTabRequest,
  GetCommitteeRevisionInfoTabResponse,
} from "@pages/Committee/BasicInfo/CommitteeRevision/CommitteeRevisionTabs/helper/components/CommitteeRevisionInfo/@types/@committeeRevisionInfo";
import { GetPrimaryCommitteeInfoTabResponse } from "@pages/Committee/BasicInfo/PrimaryCommittee/PrimaryCommitteeTabs/helper/components/PrimaryChangeRecords/@types/@primaryChangeRecords";
import { GetPrimaryCommitteeInfoTabRequest } from "@pages/Committee/BasicInfo/PrimaryCommittee/PrimaryCommitteeTabs/helper/components/PrimaryCommitteeInfo/@types/@primaryCommitteeInfo";
import {
  GetGuestsListResponse,
  SendSessionGuestDataRequest,
  SendSessionGuestDataResponse,
} from "@pages/Committee/Committees/Meetings/SessionCreation/helper/components/SessionGuests/@types/@sessionGuestsStep";
import {
  AddSessionInformationRequest,
  AddSessionInformationResponse,
  GetPersonnelListResponse,
  GetProviderListResponse,
  GetSessionInformationRequest,
  GetSessionInformationResponse,
} from "@pages/Committee/Committees/Meetings/SessionCreation/helper/components/SessionInfo/@types/@sessionInfoStep";
import {
  GetMemberMeetingRequest,
  GetMemberMeetingResponse,
  GetSessionMeetingMembersResponse,
  SendSessionMeetingMembersRequest,
  SendSessionMeetingMembersResponse,
} from "@pages/Committee/Committees/Meetings/SessionCreation/helper/components/SessionMembers/@types/@sessionMembersStep";
import {
  AddNewAgendaRequest,
  AddNewAgendaResponse,
  GetListOfSessionCreationAccusationsCountRequest,
  GetListOfSessionCreationAccusationsResponse,
  ListOfSessionCreationAccusationsRequest,
} from "@pages/Committee/Committees/Meetings/SessionCreation/helper/components/SessionRules/@types/@sessionRulesStep";
import { CountResponse } from "@pages/Committee/HandleProcessing/Reports/CommitteeReport/helper/components/CommitteeReport/@types/@committeeReportTable";
import {
  GetIssuedVotesInfoRequest,
  GetIssuedVotesInfoResponse,
} from "@pages/Committee/History/_shared/components/IssuedVoteStep/@types/@readOnlyIssuedVoteStep";
import {
  GetViolationInfoRequest,
  GetViolationInfoResponse,
} from "@pages/Committee/History/RecordsHistory/ReadOnlyArchive/helper/components/InfringementInformationStep/@types/@readOnlyInfringementInformationStep";
import {
  GetPartiesInfoRequest,
  GetPartiesInfoResponse,
} from "@pages/Committee/History/RecordsHistory/ReadOnlyArchive/helper/components/PartiesInformationStep/@types/@readOnlyPartiesInformationStep";
import {
  GetCommitteeRealizationListCountRequest,
  GetCommitteeRealizationListRequest,
  GetCommitteeRealizationListResponse,
  SendCommitteeRealizationRejectSessionRequest,
  SendCommitteeRealizationRejectSessionResponse,
  SendCommitteeRealizationSessionModalRequest,
  SendCommitteeRealizationSessionModalResponse,
} from "@pages/Committee/RealizationList/CommitteeRealizationList/helper/components/RealizationListTable/@types/@realizationListTable";

import {
  sendChancellorReferralModalRequest,
  sendChancellorReferralModalResponse,
} from "../../../../../../components/Committee/Committee/AdditionalResearch/ResearchChancellor/Modals/ResearchChancellorReferralModal/@types/@researchChancellorReferralModal";
import {
  SendStudentChancellorReferralModalRequest,
  SendStudentChancellorReferralModalResponse,
} from "../../../../../../components/Committee/Committee/AdditionalResearch/StudentChancellor/Modals/StudentChancellorReferralModal/@types/@studentChancellorReferralModal";
import {
  SendWardingReferralRequest,
  SendWardingReferralResponse,
} from "../../../../../../components/Committee/Committee/AdditionalResearch/Warding/Modal/WardingReferralModal/@types/@wardingReferralModal";
import {
  CancellationAttendanceRequest,
  CancellationAttendanceResponse,
  GetAbsentReasonResponse,
} from "../../../../../../components/Committee/Committee/Meetings/SessionDetailGuests/@types/@guests";
import { GetSessionMeetingMembersRawResponse } from "../../../../../../components/Committee/Committee/Meetings/SessionDetailMembers/@types/@members";
import {
  GetListPreliminaryMeetingsCountRequest,
  GetListPreliminaryMeetingsResponse,
  ListPreliminaryMeetingsRequest,
} from "../../../../../../components/Committee/Committee/Meetings/SessionLIstTable/@types/@sessionLIstTable";
import {
  CreateAndEditViolationInfoRequest,
  CreateAndEditViolationInfoResponse,
} from "../../../../../../components/Committee/Committee/RecordsHistory/InfringementInformation/@types/@infringementInformationStep";
import {
  CreateAndEditIssuedVotesRequest,
  CreateAndEditIssuedVotesResponse,
} from "../../../../../../components/Committee/Committee/RecordsHistory/IssuedVote/IssuedVote/@types/@issuedVoteStep";
import {
  GetCreateAndEditOtherDocumentsInfoRequest,
  GetCreateAndEditOtherDocumentsInfoResponse,
} from "../../../../../../components/Committee/Committee/RecordsHistory/IssuedVote/IssuedVoteContent/OtherDocuments/@types/@otherDocumentsStep";
import {
  SendCommitteePartiesInfoRequest,
  SendCommitteePartiesInfoResponse,
} from "../../../../../../components/Committee/Committee/RecordsHistory/PartiesInformation/@types/@partiesInformationStep";
import {
  GetRejectSessionRequest,
  GetRejectSessionResponse,
} from "../../../../../../components/Committee/HandleProcessing/Accusations/AccusationsListTable/@types/@accusationsListTable";
import { getTitleReferralModalResponse } from "../../../../../../components/Modals/Committee/AccusationCase/AccusationCaseReferralModal/@type/@accusationCaseReferralModal";
import {
  FirstMaxRequest,
  GetSessionDurationResponse,
  IdTitleResponse,
} from "../../../../../../components/Modals/Committee/AccusationCase/AccusationCaseSessionAllocationModal/@type/@typeAccusationCaseSessionAllocationModal";
import {
  GetCertaintyListResponse,
  GetExecutionListResponse,
  GetLegalArticleListResponse,
  GetPunishmentsListResponse,
  GetReasonEscalationListResponse,
} from "../../../../../../components/Modals/Committee/AccusationCase/AccusationCaseVoteRegistrationModal/@type/@accusationCaseVoteRegistrationModal";
import { GetAgendaListResponse } from "../../../../../../components/Modals/Committee/SessionCreation/AddNewSessionGuest/@types/@addNewSessionGuestModal";
import {
  ConfirmationVerdictRequest,
  ConfirmationVerdictResponse,
  GetReasonConfirmingVerdictResponse,
} from "../../../../../../components/Modals/Committee/SessionDetailModal/ConfirmationVerdict/@types/@ConfirmationVerdict";
import {
  GetReVotingReasonResponse,
  SessionReVotingRequest,
  SessionReVotingResponse,
} from "../../../../../../components/Modals/Committee/SessionDetailModal/ReVoting/@types/@reVoting";
import {
  CancelingAccusationOfSessionRequest,
  CancelingAccusationOfSessionResponse,
  CancelingSessionRequest,
  CancelingSessionResponse,
} from "../../../../../../components/Modals/Committee/SessionDetailModal/SessionCancel/@types/@sessionCancel";
import {
  AdditionalResearchSendReportRequest,
  AdditionalResearchSendReportResponse,
} from "../../../../../../pages/Committee/AdditionalResearch/EducationChancellor/EducationChancellorRecordReport/@types/@educationChancellorRecordReport";
import {
  GetCentralCommitteeCreateChangeRequest,
  GetCentralCommitteeCreateChangeResponse,
  sendCentralCommitteeRequest,
  sendCentralCommitteeResponse,
} from "../../../../../../pages/Committee/BasicInfo/CentralCommittee/CentralCommitteeCreateChange/@types/@centralCommitteeCreateChange";
import {
  sendCommitteeRealizationRequest,
  sendCommitteeRealizationResponse,
} from "../../../../../../pages/Committee/BasicInfo/CommitteeRealization/CommitteeRealizationCreateChange/@types/@committeeRealizationCreateChange";
import {
  GetCommitteeRevisionCreateChangeRequest,
  GetCommitteeRevisionCreateChangeResponse,
  sendCommitteeRevisionRequest,
  sendCommitteeRevisionResponse,
} from "../../../../../../pages/Committee/BasicInfo/CommitteeRevision/CommitteeRevisionCreateChange/@types/@committeeRevisionCreateChange";
import {
  GetPrimaryCommitteeCreateChangeRequest,
  GetPrimaryCommitteeCreateChangeResponse,
  GetPrimaryCommitteePersonnelInfoResponse,
  sendPrimaryCommitteeRequest,
  sendPrimaryCommitteeResponse,
} from "../../../../../../pages/Committee/BasicInfo/PrimaryCommittee/CreateChange/@types/@createChange";
import {
  CentralAccusationGetMeetingDateResponse,
  SendAccusationEducationChancellorConfirmModalRequest,
  SendAccusationEducationChancellorConfirmModalResponse,
  SendAccusationResearchChancellorRegisterCommentModalRequest,
  SendAccusationResearchChancellorRegisterCommentModalResponse,
  SendAccusationWardingRegisterCommentModalRequest,
  SendAccusationWardingRegisterCommentModalResponse,
  SendReportStudentChancellorRegisterCommentModalRequest,
  SendReportStudentChancellorRegisterCommentModalResponse,
} from "../../../../../../pages/Committee/HandleProcessing/Accusations/AccusationCase/@types/@typesCommitteeAccusationCase";
import {
  SendConfirmModalRequest,
  SendConfirmModalResponse,
  SendEducationChancellorConfirmModalRequest,
  SendEducationChancellorConfirmModalResponse,
  SendRejectingEducationChancellorRequest,
  SendRejectingEducationChancellorResponse,
  SendRejectingResearchChancellorRequest,
  SendRejectingResearchChancellorResponse,
  SendRejectingStudentChancellorRequest,
  SendRejectingStudentChancellorResponse,
  SendRejectingWardingRequest,
  SendRejectingWardingResponse,
  SendReportEducationChancellorRegisterCommentModalRequest,
  SendReportEducationChancellorRegisterCommentModalResponse,
  SendReportResearchChancellorRegisterCommentModalRequest,
  SendReportResearchChancellorRegisterCommentModalResponse,
  SendReportWardingRegisterCommentModalRequest,
  SendReportWardingRegisterCommentModalResponse,
  SendResearchChancellorConfirmModalRequest,
  SendResearchChancellorConfirmModalResponse,
  SendStudentChancellorConfirmModalRequest,
  SendStudentChancellorConfirmModalResponse,
} from "../../../../../../pages/Committee/HandleProcessing/Reports/ReportDetail/@types/@typesCommitteeReportDetail";
import { GetTypePlaintiffResponse } from "../../../../../../pages/Committee/HandleProcessing/Reports/ReportSubmit/@types/@typesCommitteeReportSubmit";
import {
  GetRecordsPriorityResponse,
  GetRecordsTypeViolationResponse,
  GetRecordsViolationDetailResponse,
  GetRecordsViolationListResponse,
} from "../../../../../../pages/Committee/HandleProcessing/Reports/SubmitInfringement/@types/@typesSubmitInfringement";
import {
  GetArchiveListRequest,
  GetArchiveListResponse,
} from "../../../../../../pages/Committee/History/RecordsHistory/Archive/@types/@committeeArchive";
import { ALL_COMMITTEE_REALIZATION_COMMITTEE } from "../../../../../../pages/Committee/RealizationList/CommitteeRealizationList/realizationListStatus";
import {
  GetCommitteeRealizationAllDataChangeMeetingRequest,
  GetCommitteeRealizationAllDataChangeMeetingResponse,
  GetCommitteeRealizationOtherFileRequest,
  GetCommitteeRealizationOtherFileResponse,
  GetCommitteeRealizationPresentationResponse,
  GetSelectionMeetingResponse,
} from "../../../../../../pages/Committee/RealizationList/ModalContents/SessionAllocation/@types/@sessionAllocationModalContent";
import { countTransformResponse } from "../../../../../helpers/NetworkHelpers/CountResponseTransformer/CountResponseTransformer";
import { transformCreateResponse } from "../../../../../helpers/NetworkHelpers/CreateResponseTransformer/transformCreateResponse";
import { sessionMeetingListTransformer } from "../../../../../helpers/NetworkHelpers/GeneralResponseTransformers/Committee/Committee/CommitteeTransformers";
import { noContentResponseTransformer } from "../../../../../helpers/NetworkHelpers/NoContentResponseTransformer/NoContentResponseTransformer";
import { transformObjectResponse } from "../../../../../helpers/NetworkHelpers/ResponseObjectTransformer/transformObjectResponse";
import { transformResponse } from "../../../../../helpers/NetworkHelpers/ResponseTransformer/ResponseTransformer";
import { ALL } from "../../../../../models/sessionListStatus";
import { committeeApi } from "../../committeeApi";

export const committees = committeeApi.injectEndpoints({
  endpoints: (builder) => ({
    getTypePlaintiff: builder.query<GetTypePlaintiffResponse, number | null>({
      query: (type) => ({
        url: `/data/form/TypePlaintiff?maxResults=50${type ? `&type_EQ=${type}` : ""}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetTypePlaintiffResponse) => {
        return transformResponse(response);
      },
    }),
    createAndEditPartiesInfo: builder.mutation<
      SendCommitteePartiesInfoResponse,
      SendCommitteePartiesInfoRequest
    >({
      query: (data) => ({
        url: "/data/form/RegistrationRecordsInformationParties/create",
        // Todo[saman]: Old Version // url: "/data/form/RegistrationRecordsInformationParties/fe18cdef84964b38be424e0ef601ea16/save",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: SendCommitteePartiesInfoResponse) => {
        return transformCreateResponse(response);
      },
      // invalidatesTags: ["tag/committee"],
    }),
    getRecordsTypeViolation: builder.query<GetRecordsTypeViolationResponse, null>({
      query: () => ({
        url: `/data/form/TableTypesViolations?maxResults=50&firstResult=0`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetRecordsTypeViolationResponse) => {
        return transformResponse(response);
      },
    }),
    getRecordsPriority: builder.query<GetRecordsPriorityResponse, null>({
      query: () => ({
        url: `/data/form/Priority?maxResults=50&firstResult=0`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetRecordsPriorityResponse) => {
        return transformResponse(response);
      },
    }),
    getRecordsViolationList: builder.query<GetRecordsViolationListResponse, string>({
      query: (id: string) => ({
        url: `/data/form/ViolationFilter?maxResults=50&firstResult=0&AssociationInfractionType_id_EQ=${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetRecordsViolationListResponse) => {
        return transformResponse(response);
      },
    }),
    getRecordsViolationDetail: builder.query<GetRecordsViolationDetailResponse, string>({
      query: (id: string) => ({
        url: `/data/form/ViolationDetailsFilter?maxResults=50&firstResult=0&AssociationViiolation_id_EQ=${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetRecordsViolationDetailResponse) => {
        return transformResponse(response);
      },
    }),
    createAndEditViolationInfo: builder.mutation<
      CreateAndEditViolationInfoResponse,
      CreateAndEditViolationInfoRequest
    >({
      query: (body) => ({
        url: `/data/form/RegistrationRecordsViolationInformation/d32efc33c18a48d1839ab41a53a4f519/save`,
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) => {
        return transformCreateResponse(response);
      },
      // invalidatesTags: ["tag/committee"],
    }),
    getPartiesInfo: builder.mutation<GetPartiesInfoResponse, GetPartiesInfoRequest>({
      query: (data) => ({
        url: "/data/form/RegistrationRecordsInformationParties/get?relation=fe18cdef84964b38be424e0ef601ea16",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: GetPartiesInfoResponse) => {
        return transformCreateResponse(response);
      },
      invalidatesTags: ["tag/committee"],
    }),
    getViolationInfo: builder.mutation<GetViolationInfoResponse, GetViolationInfoRequest>(
      {
        query: (data) => ({
          url: "/data/form/RegistrationRecordsViolationInformation/get?relation=d32efc33c18a48d1839ab41a53a4f519",
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        }),
        transformResponse: (response: GetViolationInfoResponse) => {
          return transformCreateResponse(response);
        },
        invalidatesTags: ["tag/committee"],
      }
    ),
    getPunishmentsList: builder.query<GetPunishmentsListResponse, void>({
      query: () => ({
        url: `/data/form/punishments?maxResults=50&firstResult=0`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetPunishmentsListResponse) => {
        return transformResponse(response);
      },
    }),
    getCertaintyList: builder.query<GetCertaintyListResponse, void>({
      query: () => ({
        url: `/data/form/Certainty?maxResults=50&firstResult=0`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetCertaintyListResponse) => {
        return transformResponse(response);
      },
    }),
    getExecutionList: builder.query<GetExecutionListResponse, void>({
      query: () => ({
        url: `/data/form/Execution?maxResults=50&firstResult=0`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetExecutionListResponse) => {
        return transformResponse(response);
      },
    }),
    getLegalArticleList: builder.query<GetLegalArticleListResponse, void>({
      query: () => ({
        url: `/data/form/LegalArticle?maxResults=50&firstResult=0`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetLegalArticleListResponse) => {
        return transformResponse(response);
      },
    }),
    getReasonEscalationList: builder.query<GetReasonEscalationListResponse, void>({
      query: () => ({
        url: `/data/form/ReasonEscalation?maxResults=50&firstResult=0`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetReasonEscalationListResponse) => {
        return transformResponse(response);
      },
    }),
    createAndEditIssuedVotes: builder.mutation<
      CreateAndEditIssuedVotesResponse,
      CreateAndEditIssuedVotesRequest
    >({
      query: (data) => ({
        url: "/data/form/IssuedVotes/3723017f08654f79adcbe6d27af04075/save",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) => {
        return transformCreateResponse(response);
      },
      invalidatesTags: ["tag/committee"],
    }),
    //committee realization
    getCommitteeRealizationList: builder.query<
      GetCommitteeRealizationListResponse,
      GetCommitteeRealizationListRequest
    >({
      query: ({ maxResults, firstResult, type }) => ({
        url: `/data/form/ListUnderstandingCommittee?maxResults=${maxResults}&firstResult=${firstResult}${
          type !== ALL_COMMITTEE_REALIZATION_COMMITTEE
            ? `&AssociationUnderstandingMeetingStatus_id_EQ=${type}`
            : ""
        }`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetCommitteeRealizationListResponse) => {
        return transformResponse(response);
      },
    }),
    getCommitteeRealizationListCount: builder.query<
      CountResponse,
      GetCommitteeRealizationListCountRequest
    >({
      query: ({ type }) => ({
        url: `/data/form/ListUnderstandingCommittee/count?${
          type !== ALL_COMMITTEE_REALIZATION_COMMITTEE
            ? `AssociationUnderstandingMeetingStatus_id_EQ=${type}`
            : ""
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
        url: `/data/form/ReasonEscalation?maxResults=${maxResults}&firstResult=${firstResult}`,
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
    sendCommitteeRealizationRejectSession: builder.mutation<
      SendCommitteeRealizationRejectSessionResponse,
      SendCommitteeRealizationRejectSessionRequest
    >({
      query: (body) => ({
        url: "/data/form/CancelSession/6c74f72166994fc7b84fdaa77ee2f26b/save",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendCommitteeRealizationRejectSessionResponse) => {
        return transformCreateResponse(response);
      },
    }),
    // change meeting modal
    getCommitteeRealizationSessionDuration: builder.query<
      GetSessionDurationResponse,
      FirstMaxRequest
    >({
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
    getCommitteeRealizationPresentation: builder.query<
      GetCommitteeRealizationPresentationResponse,
      FirstMaxRequest
    >({
      query: ({ firstResult, maxResults }) => ({
        url: `/data/form/Host?maxResults=${maxResults}&firstResult=${firstResult}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetCommitteeRealizationPresentationResponse) => {
        return transformResponse(response);
      },
    }),
    getCommitteeRealizationSelectionMeeting: builder.query<
      GetSelectionMeetingResponse,
      FirstMaxRequest
    >({
      query: ({ firstResult, maxResults }) => ({
        url: `/data/form/UnderstandingMeeting?maxResults=${maxResults}&firstResult=${firstResult}`,
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
    getNotices: builder.query<IdTitleResponse, FirstMaxRequest>({
      query: ({ firstResult, maxResults }) => ({
        url: `/data/form/NotificationType?maxResults=${maxResults}&firstResult=${firstResult}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: IdTitleResponse) => {
        return transformResponse(response);
      },
    }),
    committeeRealizationGetOtherFiles: builder.query<
      GetCommitteeRealizationOtherFileResponse,
      GetCommitteeRealizationOtherFileRequest
    >({
      query: ({ maxResults, AssociationUnderstandingMeeting_id_EQ }) => ({
        url: `/data/form/UnderstandingMeetingAllocation?maxResults=${maxResults}&AssociationUnderstandingMeeting_id_EQ=${AssociationUnderstandingMeeting_id_EQ}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetCommitteeRealizationOtherFileResponse) => {
        return transformResponse(response);
      },
    }),
    sendCommitteeRealizationSessionModal: builder.mutation<
      SendCommitteeRealizationSessionModalResponse,
      SendCommitteeRealizationSessionModalRequest
    >({
      query: (body) => ({
        url: "/data/form/AllocationUnderstandingMeeting/77bde469539e446cac4e21fe918c6e99/save",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendCommitteeRealizationSessionModalResponse) => {
        return transformCreateResponse(response);
      },
    }),
    getCommitteeRealizationAllDataChangeMeeting: builder.mutation<
      GetCommitteeRealizationAllDataChangeMeetingResponse,
      GetCommitteeRealizationAllDataChangeMeetingRequest
    >({
      query: (body) => ({
        url: "/data/form/AllocationUnderstandingMeeting/get?relation=77bde469539e446cac4e21fe918c6e99",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (
        response: GetCommitteeRealizationAllDataChangeMeetingResponse
      ) => {
        return transformObjectResponse(response);
      },
    }),
    getIssuedVotesInfo: builder.mutation<
      GetIssuedVotesInfoResponse,
      GetIssuedVotesInfoRequest
    >({
      query: (data) => ({
        url: "/data/form/IssuedVotes/get?relation=3723017f08654f79adcbe6d27af04075",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: GetIssuedVotesInfoResponse) => {
        return transformCreateResponse(response);
      },
      invalidatesTags: ["tag/committee"],
    }),
    createAndEditOtherDocumentsInfo: builder.mutation<
      GetCreateAndEditOtherDocumentsInfoResponse,
      GetCreateAndEditOtherDocumentsInfoRequest
    >({
      query: (data) => ({
        url: "/data/form/RecordKeepingOtherDocuments/575a7ec5af0c45d0b593f9ae811b12dc/save",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) => {
        return transformCreateResponse(response);
      },
      invalidatesTags: ["tag/committee"],
    }),

    //! primary committee
    getPrimaryCommitteeInfoTab: builder.query<
      GetPrimaryCommitteeInfoTabResponse,
      GetPrimaryCommitteeInfoTabRequest
    >({
      query: ({ maxResults }) => ({
        url: `/data/form/ListSelectionMembersPreliminaryCommittee?maxResults=${maxResults}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetPrimaryCommitteeInfoTabResponse) => {
        return transformResponse(response);
      },
    }),
    getPrimaryCommitteeCreateChange: builder.mutation<
      GetPrimaryCommitteeCreateChangeResponse,
      GetPrimaryCommitteeCreateChangeRequest
    >({
      query: (data) => ({
        url: "/data/form/ListSelectionMembersPreliminaryCommittee/get?relation=1b6878b3163b4d39a502fc203e53bf39",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: GetPrimaryCommitteeCreateChangeResponse) => {
        return transformObjectResponse(response);
      },
      invalidatesTags: ["tag/committee"],
    }),
    getPrimaryCommitteePersonnelInfo: builder.query<
      GetPrimaryCommitteePersonnelInfoResponse,
      FirstMaxRequest
    >({
      query: ({ maxResults, firstResult }) => ({
        url: `/data/form/Personnel?maxResults=${maxResults}&firstResult=${firstResult}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetPrimaryCommitteePersonnelInfoResponse) => {
        return transformResponse(response);
      },
    }),
    sendPrimaryCommittee: builder.mutation<
      sendPrimaryCommitteeResponse,
      sendPrimaryCommitteeRequest
    >({
      query: (body) => ({
        url: "/data/form/ListSelectionMembersPreliminaryCommittee/1b6878b3163b4d39a502fc203e53bf39/save",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: sendPrimaryCommitteeResponse) => {
        return transformCreateResponse(response);
      },
    }),
    getPrimaryCommitteeChangeRecordsTab: builder.query<
      GetPrimaryCommitteeInfoTabResponse,
      FirstMaxRequest
    >({
      query: ({ maxResults, firstResult }) => ({
        url: `/data/form/ListSelectionMembersPreliminaryCommittee?maxResults=${maxResults}&firstResult=${firstResult}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetPrimaryCommitteeInfoTabResponse) => {
        return transformResponse(response);
      },
    }),

    //! committee revision
    getCommitteeRevisionInfoTab: builder.query<
      GetCommitteeRevisionInfoTabResponse,
      GetCommitteeRevisionInfoTabRequest
    >({
      query: ({ maxResults }) => ({
        url: `/data/form/ListSelectionMembersAppealsCommittee?maxResults=${maxResults}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetCommitteeRevisionInfoTabResponse) => {
        return transformResponse(response);
      },
    }),
    getCommitteeRevisionChangeRecordsTab: builder.query<
      GetCommitteeRevisionChangeRecordsTabResponse,
      FirstMaxRequest
    >({
      query: ({ maxResults, firstResult }) => ({
        url: `/data/form/ListSelectionMembersAppealsCommittee?maxResults=${maxResults}&firstResult=${firstResult}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetCommitteeRevisionChangeRecordsTabResponse) => {
        return transformResponse(response);
      },
    }),
    getCommitteeRevisionCreateChange: builder.mutation<
      GetCommitteeRevisionCreateChangeResponse,
      GetCommitteeRevisionCreateChangeRequest
    >({
      query: (data) => ({
        url: "/data/form/ListSelectionMembersAppealsCommittee/get?relation=c7365a09fb30482e9c0125a157494968",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: GetCommitteeRevisionCreateChangeResponse) => {
        return transformObjectResponse(response);
      },
      invalidatesTags: ["tag/committee"],
    }),
    sendCommitteeRevision: builder.mutation<
      sendCommitteeRevisionResponse,
      sendCommitteeRevisionRequest
    >({
      query: (body) => ({
        url: "/data/form/ListSelectionMembersAppealsCommittee/c7365a09fb30482e9c0125a157494968/save",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: sendCommitteeRevisionResponse) => {
        return transformCreateResponse(response);
      },
    }),

    //! central committee
    getCentralCommitteeInfoTab: builder.query<
      GetCentralCommitteeInfoTabResponse,
      GetCentralCommitteeInfoTabRequest
    >({
      query: ({ maxResults }) => ({
        url: `/data/form/ListSelectionMembersCentralCommittee?maxResults=${maxResults}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetCommitteeRevisionInfoTabResponse) => {
        return transformResponse(response);
      },
    }),
    getCentralCommitteeChangeRecordsTab: builder.query<
      GetCentralCommitteeChangeRecordsTabResponse,
      FirstMaxRequest
    >({
      query: ({ maxResults, firstResult }) => ({
        url: `/data/form/ListSelectionMembersCentralCommittee?maxResults=${maxResults}&firstResult=${firstResult}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetCentralCommitteeChangeRecordsTabResponse) => {
        return transformResponse(response);
      },
    }),
    getCentralCommitteeCreateChange: builder.mutation<
      GetCentralCommitteeCreateChangeResponse,
      GetCentralCommitteeCreateChangeRequest
    >({
      query: (data) => ({
        url: "/data/form/ListSelectionMembersCentralCommittee/get?relation=e3a090c5c77847f79868519812f5869e",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: GetCentralCommitteeCreateChangeResponse) => {
        return transformObjectResponse(response);
      },
      invalidatesTags: ["tag/committee"],
    }),
    //! realization committee
    getRealizationCommitteeInfoTab: builder.query<
      GetRealizationCommitteeTabResponse,
      void
    >({
      query: () => ({
        url: `/data/form/ListSelectionMembersUnderstandingCommittee?maxResults=1&`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetRealizationCommitteeTabResponse) => {
        return transformResponse(response);
      },
    }),
    getRealizationCommitteeRecordsTab: builder.query<
      GetRealizationCommitteeTabResponse,
      FirstMaxRequest
    >({
      query: ({ maxResults, firstResult }) => ({
        url: `/data/form/ListSelectionMembersUnderstandingCommittee?maxResults=${maxResults}&firstResult=${firstResult}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetRealizationCommitteeTabResponse) => {
        return transformResponse(response);
      },
    }),

    sendCentralCommittee: builder.mutation<
      sendCentralCommitteeResponse,
      sendCentralCommitteeRequest
    >({
      query: (body) => ({
        url: "/data/form/ListSelectionMembersCentralCommittee/e3a090c5c77847f79868519812f5869e/save",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: sendCentralCommitteeResponse) => {
        return transformCreateResponse(response);
      },
    }),
    sendCommitteeRealization: builder.mutation<
      sendCommitteeRealizationResponse,
      sendCommitteeRealizationRequest
    >({
      query: (body) => ({
        url: "/data/form/ListSelectionMembersUnderstandingCommittee/119e59924c174398b043b16087735228/save",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: sendCommitteeRealizationResponse) => {
        return transformCreateResponse(response);
      },
    }),
    getListPreliminaryMeetings: builder.query<
      GetListPreliminaryMeetingsResponse,
      ListPreliminaryMeetingsRequest
    >({
      query: ({ maxResults, firstResult, type }) => ({
        url: `/data/form/ListPreliminaryMeetings?maxResults=${maxResults}&firstResult=${firstResult}${
          type !== ALL ? `&AssociationSessionStatus_id_EQ=${type}` : ""
        }`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetListPreliminaryMeetingsResponse) => {
        return transformResponse(response);
      },
    }),
    getListPreliminaryMeetingsCount: builder.query<
      CountResponse,
      GetListPreliminaryMeetingsCountRequest
    >({
      query: ({ type }) => ({
        url: `/data/form/ListPreliminaryMeetings/count${
          type !== ALL ? `?AssociationSessionStatus_id_EQ=${type}` : ""
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
    getListOfSessionCreationAccusations: builder.query<
      GetListOfSessionCreationAccusationsResponse,
      ListOfSessionCreationAccusationsRequest
    >({
      query: ({
        maxResults,
        firstResult,
        name,
        family,
        nationalCode,
        studentNumber,
        mobile,
        id,
        meetingId,
        preliminaryTrue,
        preliminaryNull,
      }) => ({
        url: `/data/form/AddNewAgenda?maxResults=${maxResults}&firstResult=${firstResult}${
          name ? `&studentName_EQ=${name}` : ""
        }${family ? `&studentFamily_EQ=${family}` : ""}${
          nationalCode ? `&nationalCode_EQ=${nationalCode}` : ""
        }${studentNumber ? `&studentNumber_EQ=${studentNumber}` : ""}${
          id ? `&id_EQ=${id}` : ""
        }${mobile ? `&studentPhoneNumber_EQ=${mobile}` : ""}${
          meetingId ? `&meeting_EQ=${meetingId}` : ""
        }${preliminaryTrue ? `&preliminaryProcessing_EQ=true` : ""}${
          preliminaryNull ? `&preliminaryProcessing_null=null` : ""
        }`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetListOfSessionCreationAccusationsResponse) => {
        return transformResponse(response);
      },
    }),
    getListOfSessionCreationAccusationsCount: builder.query<
      CountResponse,
      GetListOfSessionCreationAccusationsCountRequest
    >({
      query: ({ name, family, nationalCode, studentNumber, mobile, id, meetingId }) => ({
        url: `/data/form/AddNewAgenda/count?${name ? `&studentName_EQ=${name}` : ""}${
          family ? `&studentFamily_EQ=${family}` : ""
        }${nationalCode ? `&nationalCode_EQ=${nationalCode}` : ""}${
          studentNumber ? `&studentNumber_EQ=${studentNumber}` : ""
        }${id ? `&id_EQ=${id}` : ""}${mobile ? `&studentPhoneNumber_EQ=${mobile}` : ""}${
          meetingId ? `&meeting_EQ=${meetingId}` : ""
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
    getProviderList: builder.query<GetProviderListResponse, void>({
      query: () => ({
        url: `data/form/Provider?maxResults=50&firstResult=0`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetProviderListResponse) => {
        return transformResponse(response);
      },
    }),
    AddNewAgenda: builder.mutation<AddNewAgendaResponse, AddNewAgendaRequest>({
      query: (body) => ({
        url: "/data/form/AddNewAgenda/2854cc10bd8749e582dc48871aee3fa9/save",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: AddNewAgendaResponse) => {
        return transformCreateResponse(response);
      },
    }),
    getPersonnelList: builder.query<GetPersonnelListResponse, void>({
      query: () => ({
        url: `/data/form/Personnel?maxResults=50&firstResult=0`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetPersonnelListResponse) => {
        return transformResponse(response);
      },
    }),
    AddSessionInformation: builder.mutation<
      AddSessionInformationResponse,
      AddSessionInformationRequest
    >({
      query: (body) => ({
        url: "/data/form/SessionInformation/create",
        // Todo[saman]: OLD VERSION //  url: "/data/form/SessionInformation/886fede1eb5e47948b0fb54e19804e7e/save",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: AddSessionInformationResponse) => {
        return transformCreateResponse(response);
      },
    }),
    EditSessionInformation: builder.mutation<
      AddSessionInformationResponse,
      AddSessionInformationRequest
    >({
      query: (body) => ({
        url: "/data/form/SessionInformation/886fede1eb5e47948b0fb54e19804e7e/save",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: AddSessionInformationResponse) => {
        return transformCreateResponse(response);
      },
    }),
    getSessionMeetingMembers: builder.query<GetSessionMeetingMembersResponse, void>({
      query: () => ({
        url: `/data/form/GetMeetingMembers?maxResults=1&firstResult=0`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetSessionMeetingMembersRawResponse) => {
        return sessionMeetingListTransformer(response);
      },
    }),
    sendSessionMeetingMembers: builder.mutation<
      SendSessionMeetingMembersResponse,
      SendSessionMeetingMembersRequest
    >({
      query: (body) => ({
        url: "/data/form/MemberMeeting/f3766ddc5fa243d98886a8566d48edbd/save",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendSessionMeetingMembersResponse) => {
        return transformCreateResponse(response);
      },
    }),
    getAgendaList: builder.query<GetAgendaListResponse, number>({
      query: (id) => ({
        url: `/data/form/AgendaaList?maxResults=50&firstResult=0&meeting_EQ=${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetAgendaListResponse) => {
        return transformResponse(response);
      },
    }),
    sendSessionGuestData: builder.mutation<
      SendSessionGuestDataResponse,
      SendSessionGuestDataRequest
    >({
      query: (body) => ({
        url: "/data/form/Guests/create",
        // Todo[saman]: OLD VERSION // url: "/data/form/Guests/7032080801fb4ffdb1630a2a98919060/save",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendSessionGuestDataResponse) => {
        return transformCreateResponse(response);
      },
    }),
    getGuestsList: builder.query<GetGuestsListResponse, number>({
      query: (id) => ({
        url: `/data/form/Guests?maxResults=50&firstResult=0&preliminaryMeeting_EQ=${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetGuestsListResponse) => {
        return transformResponse(response);
      },
    }),
    getSessionInformation: builder.mutation<
      GetSessionInformationResponse,
      GetSessionInformationRequest
    >({
      query: (body) => ({
        url: "/data/form/SessionInformation/get?relation=886fede1eb5e47948b0fb54e19804e7e",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: GetSessionInformationResponse) => {
        return transformObjectResponse(response);
      },
    }),
    getMemberMeeting: builder.mutation<GetMemberMeetingResponse, GetMemberMeetingRequest>(
      {
        query: (body) => ({
          url: "/data/form/MemberMeeting/get?relation=f3766ddc5fa243d98886a8566d48edbd",
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json",
          },
        }),
        invalidatesTags: ["tag/committee"],
        transformResponse: (response: GetMemberMeetingResponse) => {
          return transformObjectResponse(response);
        },
      }
    ),
    getAbsentReasons: builder.query<GetAbsentReasonResponse, void>({
      query: () => ({
        url: `/data/form/ReasonAbsence?maxResults=50&firstResult=0`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetAbsentReasonResponse) => {
        return transformResponse(response);
      },
    }),
    cancellationAttendance: builder.mutation<
      CancellationAttendanceResponse,
      CancellationAttendanceRequest
    >({
      query: (body) => ({
        url: "/data/form/CancellationAttendance/850a47bee83c4b0eb0b0b22c81b452ac/save",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: CancellationAttendanceResponse) => {
        return transformObjectResponse(response);
      },
    }),
    getReasonConfirmingVerdict: builder.query<GetReasonConfirmingVerdictResponse, void>({
      query: () => ({
        url: `/data/form/ReasonConfirmingVerdict?maxResults=50&firstResult=0`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // providesTags: ["tag/committee"],
      transformResponse: (response: GetReasonConfirmingVerdictResponse) => {
        return transformResponse(response);
      },
    }),
    ConfirmationVerdict: builder.mutation<
      ConfirmationVerdictResponse,
      ConfirmationVerdictRequest
    >({
      query: (body) => ({
        url: "/data/form/ConfirmationVerdict/f92cf72312e047e9a97692d18fba2df2/save",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: ConfirmationVerdictResponse) => {
        return transformObjectResponse(response);
      },
    }),
    getReVotingReason: builder.query<GetReVotingReasonResponse, void>({
      query: () => ({
        url: `/data/form/ReasonRevoting?maxResults=50&firstResult=0`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // providesTags: ["tag/committee"],
      transformResponse: (response: GetReVotingReasonResponse) => {
        return transformResponse(response);
      },
    }),
    sessionReVoting: builder.mutation<SessionReVotingResponse, SessionReVotingRequest>({
      query: (body) => ({
        url: "/data/form/Revoting/5e77d123766b45c9bab8a2153f2dcc11/save",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: SessionReVotingResponse) => {
        return transformObjectResponse(response);
      },
    }),
    cancelingAccusationOfSession: builder.mutation<
      CancelingAccusationOfSessionResponse,
      CancelingAccusationOfSessionRequest
    >({
      query: (body) => ({
        url: "/data/form/CancelingSession/update-all",
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (_, meta: FetchBaseQueryMeta | undefined) => {
        return noContentResponseTransformer(meta);
      },
    }),
    getArchiveList: builder.query<GetArchiveListResponse, GetArchiveListRequest>({
      query: ({ maxResults, firstResult }) => ({
        url: `/data/form/RecordsPanel?maxResults=${maxResults}&firstResult=${firstResult}&violationStatus_EQ=20`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // providesTags: ["tag/committee"],
      transformResponse: (response: GetArchiveListResponse) => {
        return transformResponse(response);
      },
    }),
    getArchiveListCount: builder.query<CountResponse, void>({
      query: () => ({
        url: `/data/form/RecordsPanel/count?violationStatus_EQ=20`,
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
    cancelingSession: builder.mutation<CancelingSessionResponse, CancelingSessionRequest>(
      {
        query: (body) => ({
          url: "/data/form/ReasonAndExplanationCancelingSession/7e142dbbb603472482113fe618b6ae4b/save",
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json",
          },
        }),
        invalidatesTags: ["tag/committee"],
        transformResponse: (response: CancelingSessionResponse) => {
          return transformObjectResponse(response);
        },
      }
    ),

    additionalResearchSendReport: builder.mutation<
      AdditionalResearchSendReportResponse,
      AdditionalResearchSendReportRequest
    >({
      query: (data) => ({
        url: "/process-definition/mobileReportProces:10:ced078fd-a231-11ee-9ecd-005056936ed7/submit-form",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: AdditionalResearchSendReportResponse) => {
        return transformObjectResponse(response);
      },
    }),
    getTitleChancellorReferralModal: builder.query<getTitleReferralModalResponse, void>({
      query: () => ({
        url: `/data/form/ResearchAssistantReferenceableRoles?maxResults=50&firstResult=0`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: getTitleReferralModalResponse) => {
        return transformResponse(response);
      },
    }),
    getTitleStudentChancellorReferralModal: builder.query<
      getTitleReferralModalResponse,
      void
    >({
      query: () => ({
        url: `/data/form/StudentViceChancellorReferenceableRoles?maxResults=50&firstResult=0`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: getTitleReferralModalResponse) => {
        return transformResponse(response);
      },
    }),
    sendChancellorReferralModal: builder.mutation<
      sendChancellorReferralModalResponse,
      sendChancellorReferralModalRequest
    >({
      query: (body) => ({
        url: "/data/form/RefToOfficeResearchAssis/d5fea3e9c5ea4aecb30e01ca3cccce02/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: sendChancellorReferralModalResponse) => {
        return transformCreateResponse(response);
      },
    }),
    sendStudentChancellorReferralModal: builder.mutation<
      SendStudentChancellorReferralModalResponse,
      SendStudentChancellorReferralModalRequest
    >({
      query: (body) => ({
        url: "/data/form/RefToOfficeStudentVice/96ba6cd241c54a7b9e82b238e048b89d/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendStudentChancellorReferralModalResponse) => {
        return transformCreateResponse(response);
      },
    }),
    sendReportResearchChancellorRegisterCommentModal: builder.mutation<
      SendReportResearchChancellorRegisterCommentModalResponse,
      SendReportResearchChancellorRegisterCommentModalRequest
    >({
      query: (body) => ({
        url: "/data/form/ReportOpinionResearchAssistant/cb522a7f048b491e800b485b36febd61/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (
        response: SendReportResearchChancellorRegisterCommentModalResponse
      ) => {
        return transformObjectResponse(response);
      },
    }),
    sendReportStudentChancellorRegisterCommentModal: builder.mutation<
      SendReportStudentChancellorRegisterCommentModalResponse,
      SendReportStudentChancellorRegisterCommentModalRequest
    >({
      query: (body) => ({
        url: "/data/form/ReportOpinionStudentVice/bf3826e97539474ca3e24c21ee35519c/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (
        response: SendReportStudentChancellorRegisterCommentModalResponse
      ) => {
        return transformObjectResponse(response);
      },
    }),
    sendAccusationStudentChancellorRegisterCommentModal: builder.mutation<
      SendReportStudentChancellorRegisterCommentModalResponse,
      SendReportStudentChancellorRegisterCommentModalRequest
    >({
      query: (body) => ({
        url: "/data/form/RegisteringOpinionStudentDeputy/d71cfe15263d408dbbfc7d0a28e66cbc/save",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (
        response: SendReportStudentChancellorRegisterCommentModalResponse
      ) => {
        return transformObjectResponse(response);
      },
    }),
    sendAccusationResearchChancellorRegisterCommentModal: builder.mutation<
      SendAccusationResearchChancellorRegisterCommentModalResponse,
      SendAccusationResearchChancellorRegisterCommentModalRequest
    >({
      query: (body) => ({
        url: "/data/form/RegisteringOpinionResearchAssistant/f7ba80c282ae4542b185393e20e38344/save",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (
        response: SendAccusationResearchChancellorRegisterCommentModalResponse
      ) => {
        return transformObjectResponse(response);
      },
    }),
    sendConfirmModal: builder.mutation<SendConfirmModalResponse, SendConfirmModalRequest>(
      {
        query: (body) => ({
          url: "/data/form/ApprovalHeadSecurity/6e9ee2d01a034d4c9d72f8bd03450198/save",
          method: "POST",
          body,
        }),
        // invalidatesTags: ["tag/committee"],
        transformResponse: (response: SendConfirmModalResponse) => {
          return transformObjectResponse(response);
        },
      }
    ),
    sendResearchChancellorConfirmModal: builder.mutation<
      SendResearchChancellorConfirmModalResponse,
      SendResearchChancellorConfirmModalRequest
    >({
      query: (body) => ({
        url: "/data/form/ApprovalResearchAssistant/73302b9a22a94b1a8b8c95eb92e4c1f7/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendResearchChancellorConfirmModalResponse) => {
        return transformObjectResponse(response);
      },
    }),
    sendStudentChancellorConfirmModal: builder.mutation<
      SendStudentChancellorConfirmModalResponse,
      SendStudentChancellorConfirmModalRequest
    >({
      query: (body) => ({
        url: "/data/form/ApprovalStudentVicePresident/c4bda5c23760405b86cdbfcd98a1ecf9/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendStudentChancellorConfirmModalResponse) => {
        return transformObjectResponse(response);
      },
    }),
    sendRejectingResearchChancellor: builder.mutation<
      SendRejectingResearchChancellorResponse,
      SendRejectingResearchChancellorRequest
    >({
      query: (body) => ({
        url: "/data/form/ClosingResearchAssistant/d318d3c2a41f40bf9bd375f9dae99748/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendRejectingResearchChancellorResponse) => {
        return transformObjectResponse(response);
      },
    }),
    sendRejectingStudentChancellor: builder.mutation<
      SendRejectingStudentChancellorResponse,
      SendRejectingStudentChancellorRequest
    >({
      query: (body) => ({
        url: "/data/form/ClosingStudentVice/5d6bb116a7784da4a15c35d571ff3c0c/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendRejectingStudentChancellorResponse) => {
        return transformObjectResponse(response);
      },
    }),
    sendWardingReferralModal: builder.mutation<
      SendWardingReferralResponse,
      SendWardingReferralRequest
    >({
      query: (body) => ({
        url: "/data/form/RefToOfficeSecurity/fb582907152549d4a44967e8eece3d88/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendWardingReferralResponse) => {
        return transformObjectResponse(response);
      },
    }),
    sendReportWardingRegisterCommentModal: builder.mutation<
      SendReportWardingRegisterCommentModalResponse,
      SendReportWardingRegisterCommentModalRequest
    >({
      query: (body) => ({
        url: "/data/form/ReportOpinionSecurity/e446f03faecf4088aa6096419d99f4e7/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendReportWardingRegisterCommentModalResponse) => {
        return transformObjectResponse(response);
      },
    }),
    sendAccusationWardingRegisterCommentModal: builder.mutation<
      SendAccusationWardingRegisterCommentModalResponse,
      SendAccusationWardingRegisterCommentModalRequest
    >({
      query: (body) => ({
        url: "/data/form/RegistrationProtectionOpinion/51f4e12d52b744d8bc7c8696ebacc927/save",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (
        response: SendAccusationWardingRegisterCommentModalResponse
      ) => {
        return transformObjectResponse(response);
      },
    }),
    sendRejectingWarding: builder.mutation<
      SendRejectingWardingResponse,
      SendRejectingWardingRequest
    >({
      query: (body) => ({
        url: "/data/form/ClosingSecurity/3903aad7c60d46a9b05dc3efe37280c8/save",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendRejectingWardingResponse) => {
        return transformObjectResponse(response);
      },
    }),
    getTitleEducationChancellorReferralModal: builder.query<
      getTitleReferralModalResponse,
      void
    >({
      query: () => ({
        url: `/data/form/EducationalAssistantReferenceableRoles?maxResults=50&firstResult=0`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: getTitleReferralModalResponse) => {
        return transformResponse(response);
      },
    }),
    sendEducationChancellorReferralModal: builder.mutation<
      SendEducationChancellorReferralModalResponse,
      SendEducationChancellorReferralModalRequest
    >({
      query: (body) => ({
        url: "/data/form/RefToOfficeEducAssis/c596d55a374746a6bd3cc86fc43bbd42/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendEducationChancellorReferralModalResponse) => {
        return transformCreateResponse(response);
      },
    }),
    sendEducationChancellorConfirmModal: builder.mutation<
      SendEducationChancellorConfirmModalResponse,
      SendEducationChancellorConfirmModalRequest
    >({
      query: (body) => ({
        url: "/data/form/ApprovalViceChancellor/ad09ce77e6be42f180dc7e204ee0c515/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendEducationChancellorConfirmModalResponse) => {
        return transformObjectResponse(response);
      },
    }),
    sendReportEducationChancellorRegisterCommentModal: builder.mutation<
      SendReportEducationChancellorRegisterCommentModalResponse,
      SendReportEducationChancellorRegisterCommentModalRequest
    >({
      query: (body) => ({
        url: "/data/form/ReportOpinionStudentVice/bf3826e97539474ca3e24c21ee35519c/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (
        response: SendReportEducationChancellorRegisterCommentModalResponse
      ) => {
        return transformObjectResponse(response);
      },
    }),
    sendRejectingEducationChancellor: builder.mutation<
      SendRejectingEducationChancellorResponse,
      SendRejectingEducationChancellorRequest
    >({
      query: (body) => ({
        url: "/data/form/ClosingEducationalAssistant/703b98a908444a258a44285736b99694/save",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendRejectingEducationChancellorResponse) => {
        return transformObjectResponse(response);
      },
    }),
    sendAccusationEducationChancellorRegisterCommentModal: builder.mutation<
      SendAccusationEducationChancellorConfirmModalResponse,
      SendAccusationEducationChancellorConfirmModalRequest
    >({
      query: (body) => ({
        url: "/data/form/RegisterOpinionViceChancellor/fcaea2b5097e459b99c9b26eb2aaf372/save",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (
        response: SendAccusationEducationChancellorConfirmModalResponse
      ) => {
        return transformObjectResponse(response);
      },
    }),
    CentralAccusationGetMeetingDate: builder.query<
      CentralAccusationGetMeetingDateResponse,
      number
    >({
      query: (id) => ({
        url: `/data/form/CentrulGetMeetingInfoToVote?maxResults=50&firstResult=0&id_EQ=${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: CentralAccusationGetMeetingDateResponse) => {
        return transformResponse(response);
      },
    }),
  }),
});

export const {
  useGetTypePlaintiffQuery,
  useLazyGetTypePlaintiffQuery,
  useCreateAndEditPartiesInfoMutation,
  useGetRecordsTypeViolationQuery,
  useGetRecordsPriorityQuery,
  useLazyGetRecordsViolationListQuery,
  useLazyGetRecordsViolationDetailQuery,
  useCreateAndEditViolationInfoMutation,
  useGetPartiesInfoMutation,
  useGetViolationInfoMutation,
  useGetPunishmentsListQuery,
  useGetCertaintyListQuery,
  useGetExecutionListQuery,
  useGetLegalArticleListQuery,
  useGetReasonEscalationListQuery,
  useCreateAndEditIssuedVotesMutation,
  useLazyGetCommitteeRealizationListQuery,
  useLazyGetCommitteeRealizationListCountQuery,
  useLazyGetRejectSessionQuery,
  useSendCommitteeRealizationRejectSessionMutation,
  useLazyGetCommitteeRealizationSessionDurationQuery,
  useLazyGetCommitteeRealizationPresentationQuery,
  useLazyGetCommitteeRealizationSelectionMeetingQuery,
  useLazyGetNoticesQuery,
  useLazyCommitteeRealizationGetOtherFilesQuery,
  useSendCommitteeRealizationSessionModalMutation,
  useGetCommitteeRealizationAllDataChangeMeetingMutation,
  useCreateAndEditOtherDocumentsInfoMutation,
  useGetIssuedVotesInfoMutation,
  useLazyGetPrimaryCommitteeInfoTabQuery,
  useGetPrimaryCommitteeCreateChangeMutation,
  useLazyGetPrimaryCommitteePersonnelInfoQuery,
  useSendPrimaryCommitteeMutation,
  useLazyGetPrimaryCommitteeChangeRecordsTabQuery,
  useLazyGetCommitteeRevisionInfoTabQuery,
  useLazyGetCommitteeRevisionChangeRecordsTabQuery,
  useGetCommitteeRevisionCreateChangeMutation,
  useSendCommitteeRevisionMutation,
  useLazyGetCentralCommitteeInfoTabQuery,
  useLazyGetCentralCommitteeChangeRecordsTabQuery,
  useLazyGetRealizationCommitteeInfoTabQuery,
  useLazyGetRealizationCommitteeRecordsTabQuery,
  useGetCentralCommitteeCreateChangeMutation,
  useSendCentralCommitteeMutation,
  useSendCommitteeRealizationMutation,
  useLazyGetListPreliminaryMeetingsQuery,
  useLazyGetListPreliminaryMeetingsCountQuery,
  useLazyGetListOfSessionCreationAccusationsQuery,
  useLazyGetListOfSessionCreationAccusationsCountQuery,
  useLazyGetProviderListQuery,
  useAddNewAgendaMutation,
  useLazyGetPersonnelListQuery,
  useAddSessionInformationMutation,
  useEditSessionInformationMutation,
  useLazyGetSessionMeetingMembersQuery,
  useSendSessionMeetingMembersMutation,
  useLazyGetAgendaListQuery,
  useSendSessionGuestDataMutation,
  useLazyGetGuestsListQuery,
  useGetSessionInformationMutation,
  useGetMemberMeetingMutation,
  useLazyGetAbsentReasonsQuery,
  useCancellationAttendanceMutation,
  useLazyGetReasonConfirmingVerdictQuery,
  useConfirmationVerdictMutation,
  useLazyGetReVotingReasonQuery,
  useSessionReVotingMutation,
  useLazyGetArchiveListQuery,
  useLazyGetArchiveListCountQuery,
  useCancelingAccusationOfSessionMutation,
  useCancelingSessionMutation,
  useAdditionalResearchSendReportMutation,
  useLazyGetTitleChancellorReferralModalQuery,
  useSendChancellorReferralModalMutation,
  useSendReportResearchChancellorRegisterCommentModalMutation,
  useSendAccusationResearchChancellorRegisterCommentModalMutation,
  useSendConfirmModalMutation,
  useSendResearchChancellorConfirmModalMutation,
  useSendRejectingResearchChancellorMutation,
  useSendWardingReferralModalMutation,
  useSendReportWardingRegisterCommentModalMutation,
  useSendAccusationWardingRegisterCommentModalMutation,
  useSendRejectingWardingMutation,
  useLazyGetTitleStudentChancellorReferralModalQuery,
  useSendStudentChancellorReferralModalMutation,
  useSendReportStudentChancellorRegisterCommentModalMutation,
  useSendStudentChancellorConfirmModalMutation,
  useSendRejectingStudentChancellorMutation,
  useSendAccusationStudentChancellorRegisterCommentModalMutation,
  useLazyGetTitleEducationChancellorReferralModalQuery,
  useSendEducationChancellorReferralModalMutation,
  useSendEducationChancellorConfirmModalMutation,
  useSendReportEducationChancellorRegisterCommentModalMutation,
  useSendRejectingEducationChancellorMutation,
  useSendAccusationEducationChancellorRegisterCommentModalMutation,
  useLazyCentralAccusationGetMeetingDateQuery,
} = committees;
