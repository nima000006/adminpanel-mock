import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  GetAllSamimServiceResponse,
  GetAllTicketOriginResponse,
  GetAllTopicBySamimServicesRequest,
  GetAllTopicBySamimServicesResponse,
  GetPriorityResponse,
} from "@pages/Ticketing/_shared/@ticketingTypes";
import {
  TicketingAdminCancelAllocationRequest,
  TicketingManagerCancelAllocationRequest,
} from "@pages/Ticketing/_shared/pages/TicketingDetail/_shared/helper/components/TicketBanner/@types/@ticketBanner";
import {
  TicketingAllDetailsAddFilesMessageRequest,
  TicketingAllDetailsAddFilesMessageResponse,
  TicketingAllDetailsAddFilesRequest,
  TicketingAllDetailsAddFilesResponse,
  TicketingAllDetailsAddMessageRequest,
  TicketingAllDetailsAddNoteRequest,
  TicketingAllDetailsBannerInfoRequest,
  TicketingAllDetailsBannerInfoResponse,
  TicketingAllDetailsCloseTicketRequest,
  TicketingAllDetailsExpertInformationRequest,
  TicketingAllDetailsExpertInformationResponse,
  TicketingAllDetailsHistoryRequest,
  TicketingAllDetailsHistoryResponse,
  TicketingAllDetailsInformationRequest,
  TicketingAllDetailsInformationResponse,
  TicketingAllDetailsMessagesAIRequest,
  TicketingAllDetailsMessagesAIResponse,
  TicketingAllDetailsMessagesRequest,
  TicketingAllDetailsMessagesResponse,
  TicketingAllDetailsNotesRequest,
  TicketingAllDetailsNotesResponse,
  TicketingAllDetailsPriorityRequest,
  TicketingAllDetailsReferralsRequest,
  TicketingAllDetailsUserInformationRequest,
  TicketingAllDetailsUserInformationResponse,
} from "@pages/Ticketing/_shared/pages/TicketingDetail/AllTicketingDetail/@types/@allTicketingDetail";
import {
  TicketingMyDetailsAddNoteRequest,
  TicketingMyDetailsBannerInfoRequest,
  TicketingMyDetailsBannerInfoResponse,
  TicketingMyDetailsCloseTicketRequest,
  TicketingMyDetailsExpertInformationRequest,
  TicketingMyDetailsExpertInformationResponse,
  TicketingMyDetailsHistoryRequest,
  TicketingMyDetailsHistoryResponse,
  TicketingMyDetailsInformationRequest,
  TicketingMyDetailsInformationResponse,
  TicketingMyDetailsMessagesAIRequest,
  TicketingMyDetailsMessagesAIResponse,
  TicketingMyDetailsMessagesRequest,
  TicketingMyDetailsMessagesResponse,
  TicketingMyDetailsNotesRequest,
  TicketingMyDetailsNotesResponse,
  TicketingMyDetailsUserInformationRequest,
  TicketingMyDetailsUserInformationResponse,
} from "@pages/Ticketing/_shared/pages/TicketingDetail/MyTicketingDetail/@types/@myTicketingDetail";
import {
  TicketingMyDetailsAddFilesMessageRequest,
  TicketingMyDetailsAddFilesMessageResponse,
  TicketingMyDetailsAddFilesRequest,
  TicketingMyDetailsAddFilesResponse,
  TicketingMyDetailsAddMessageRequest,
  TicketingMyDetailsDefaultAnswersResponse,
  TicketingMyDetailsDeleteDefaultAnswersRequest,
  TicketingMyDetailsPriorityRequest,
  TicketingMyDetailsReferralsRequest,
  TicketingMyDetailsSaveDefaultAnswersRequest,
  TicketingMyDetailsViewDefaultAnswersRequest,
  TicketingMyDetailsViewDefaultAnswersResponse,
} from "@pages/Ticketing/_shared/pages/TicketingDetail/MyTicketingDetail/@types/@myTicketingDetail";
import { GetTicketingAgentCountOfticketsResponse } from "@pages/Ticketing/Agent/AgentTicketList/@types/@agentTicketList";
import {
  TicketAllAdvancedFilterByExpertRequest,
  TicketAllAdvancedFilterByExpertResponse,
} from "@pages/Ticketing/Agent/AgentTicketList/helper/components/AgentTicketAllList/@types/@agentTicketAllTypes";
import {
  TicketingAgentAssignedToMeAnsweredListRequest,
  TicketingAgentAssignedToMeAnsweredListResponse,
} from "@pages/Ticketing/Agent/AgentTicketList/helper/components/AgentTicketAssignedToList/helper/components/AgentTicketAssignedToMeAnsweredList/@types/@agentTicketAssignedToMeAnsweredList";
import {
  TicketingAgentAssignedToMeWaitingListRequest,
  TicketingAgentAssignedToMeWaitingListResponse,
} from "@pages/Ticketing/Agent/AgentTicketList/helper/components/AgentTicketAssignedToList/helper/components/AgentTicketAssignedToMeWaitingList/@types/@agentTicketAssignedToMeWaitingList";
import {
  AgentClosedListAndAdvanceFilterRequest,
  AgentClosedListAndAdvanceFilterResponse,
} from "@pages/Ticketing/Agent/AgentTicketList/helper/components/AgentTicketClosedList/@types/@agentTicketClosedTypes";
import {
  AgentTicketNotAssignedListAndAdvanceFilterRequest,
  AgentTicketNotAssignedListAndAdvanceFilterResponse,
} from "@pages/Ticketing/Agent/AgentTicketList/helper/components/AgentTicketNotAssignedList/@types/@agentTicketNotAssignedTypes";
import {
  TicketIssuesSubjectListRequest,
  TicketIssuesSubjectListResponse,
} from "@pages/Ticketing/BasicInfo/BasicInfoDetail/IssuesSubject/@types/@ticketingIssuesSubject";
import {
  BasicInfoCreateTopicRequest,
  EditTopicInfoRequest,
  getTopicInfoRequest,
  getTopicInfoResponse,
} from "@pages/Ticketing/BasicInfo/BasicInfoDetail/IssuesSubject/helper/components/AddIssueSubjectDrawerContent/@types/@AddIssueSubjectDrawerContentProps";
import {
  TicketRolesListRequest,
  TicketRolesListResponse,
} from "@pages/Ticketing/BasicInfo/BasicInfoDetail/TicketRole/@types/@ticketRoleListType";
import {
  basicInfoModifyRoleRequest,
  viewRoleListResponse,
} from "@pages/Ticketing/BasicInfo/BasicInfoDetail/TicketRole/helper/components/ModifyTicketRoleDrawerContent/@types/@modifyTicketRoleDrawerContentTypes";
import {
  GetInnerTopicBySamimServicesRequest,
  GetInnerTopicBySamimServicesResponse,
} from "@pages/Ticketing/InnerTickets/_shared/@innerTicketsTypes";
import {
  AllInnerTicketsSendingMessageDetailResponse,
  AllInnerTicketsSendingOnlySendMessageRequest,
  AllInnerTicketsSendingSendMessageAndFileRequest,
  AllInnerTicketsSendingSendMessageAndFileResponse,
  AllInnerTicketsSendingStatusDetailResponse,
} from "@pages/Ticketing/InnerTickets/AllInnerTickets/AllSendingTicketDetail/@types/@allSendingTicketDetailTypes";
import { innerSendingSubmitRateRequest } from "@pages/Ticketing/InnerTickets/AllInnerTickets/AllSendingTicketDetail/helper/components/AllSendingTicketDetailCard/@types/@allSendingTicketDetailCardType";
import { GetAllInnerTicketsReceivedBannerStatsResponse } from "@pages/Ticketing/InnerTickets/AllInnerTickets/helper/components/AllInnerTicketsSegmentReceiptContent/@types/@allInnerTicketsSegmentReceiptContent";
import {
  AllInnerTicketReceivedAllListRequest,
  AllInnerTicketReceivedAllListResponse,
} from "@pages/Ticketing/InnerTickets/AllInnerTickets/helper/components/AllInnerTicketsSegmentReceiptContent/helper/components/AllInnerTicketsAllList/@types/@InnerTicketsAllTypes";
import {
  AllInnerTicketReceivedAssignedToMeAnsweredRequest,
  AllInnerTicketReceivedAssignedToMeAnsweredResponse,
} from "@pages/Ticketing/InnerTickets/AllInnerTickets/helper/components/AllInnerTicketsSegmentReceiptContent/helper/components/AllInnerTicketsAssignedToMeList/helper/components/AllInnerTicketsAssignedToMeListAnswered/@types/@allInnerTicketsAssignedToMeListAnswered";
import {
  TicketingAllReceivedAssignedToMeWaitingListRequest,
  TicketingAllReceivedAssignedToMeWaitingListResponse,
} from "@pages/Ticketing/InnerTickets/AllInnerTickets/helper/components/AllInnerTicketsSegmentReceiptContent/helper/components/AllInnerTicketsAssignedToMeList/helper/components/AllInnerTicketsAssignedToMeListWaiting/@types/@allInnerTicketsAssignedToMeListWaiting";
import {
  AllInnerTicketsClosedListAndAdvanceFilterRequest,
  AllInnerTicketsClosedListAndAdvanceFilterResponse,
  InnerTicketCloseTypesResponse,
} from "@pages/Ticketing/InnerTickets/AllInnerTickets/helper/components/AllInnerTicketsSegmentReceiptContent/helper/components/AllInnerTicketsClosedList/@types/@allInnerTicketsClosedListTypes";
import {
  AllInnerTicketReceivedUnAssignedListAndAdvanceFilterRequest,
  AllInnerTicketReceivedUnAssignedListAndAdvanceFilterResponse,
} from "@pages/Ticketing/InnerTickets/AllInnerTickets/helper/components/AllInnerTicketsSegmentReceiptContent/helper/components/AllInnerTicketsNotAssignedList/@types/@InnerTicketsNotAssignedListTypes";
import {
  AddInnerTicketRequest,
  GetAttachTicketResponse,
} from "@pages/Ticketing/InnerTickets/AllInnerTickets/helper/components/AllInnerTicketsSegmentSubmittedContent/helper/modal/AddTicketsModalContent/@types/@addTicketsModalContentTypes";
import { GetInnerTicketsReceivedBannerStatsResponse } from "@pages/Ticketing/InnerTickets/MyInnerTickets/helper/components/MyInnerTicketsSegmentReceiptContent/@types/@innerTicketsSegmentReceiptContent";
import {
  InnerTicketReceivedAllListRequest,
  InnerTicketReceivedAllListResponse,
} from "@pages/Ticketing/InnerTickets/MyInnerTickets/helper/components/MyInnerTicketsSegmentReceiptContent/helper/components/MyInnerTicketsAllList/@types/@InnerTicketsAllTypes";
import {
  InnerTicketReceivedAssignedToMeAnsweredRequest,
  InnerTicketReceivedAssignedToMeAnsweredResponse,
} from "@pages/Ticketing/InnerTickets/MyInnerTickets/helper/components/MyInnerTicketsSegmentReceiptContent/helper/components/MyInnerTicketsAssignedToMeList/helper/components/MyInnerTicketsAssignedToMeListAnswered/@types/@innerTicketsAssignedToMeListAnswered";
import {
  TicketingReceivedAssignedToMeWaitingListRequest,
  TicketingReceivedAssignedToMeWaitingListResponse,
} from "@pages/Ticketing/InnerTickets/MyInnerTickets/helper/components/MyInnerTicketsSegmentReceiptContent/helper/components/MyInnerTicketsAssignedToMeList/helper/components/MyInnerTicketsAssignedToMeListWaiting/@types/@myInnerTicketsAssignedToMeListWaiting";
import {
  MyInnerTicketsClosedListAndAdvanceFilterRequest,
  MyInnerTicketsClosedListAndAdvanceFilterResponse,
} from "@pages/Ticketing/InnerTickets/MyInnerTickets/helper/components/MyInnerTicketsSegmentReceiptContent/helper/components/MyInnerTicketsClosedList/@types/@innerTicketsClosedListTypes";
import {
  InnerTicketReceivedUnAssignedListAndAdvanceFilterRequest,
  InnerTicketReceivedUnAssignedListAndAdvanceFilterResponse,
} from "@pages/Ticketing/InnerTickets/MyInnerTickets/helper/components/MyInnerTicketsSegmentReceiptContent/helper/components/MyInnerTicketsNotAssignedList/@types/@InnerTicketsNotAssignedListTypes";
import { InnerTicketSendingCountOfticketsResponse } from "@pages/Ticketing/InnerTickets/MyInnerTickets/helper/components/MyInnerTicketsSegmentSubmittedContent/@types/@innerTicketsSegmentSubmittedContent";
import {
  InnerTicketSendingAllListAndAdvanceFilterRequest,
  InnerTicketSendingAllListAndAdvanceFilterResponse,
  InnerTicketStatusResponse,
} from "@pages/Ticketing/InnerTickets/MyInnerTickets/helper/components/MyInnerTicketsSegmentSubmittedContent/helper/components/MyInnerTicketSubmittedAllList/@types/@innerTicketSubmittedAllList";
import {
  GetInnerTicketSubmittedAnsweredRequest,
  GetInnerTicketSubmittedAnsweredResponse,
} from "@pages/Ticketing/InnerTickets/MyInnerTickets/helper/components/MyInnerTicketsSegmentSubmittedContent/helper/components/MyInnerTicketSubmittedAnsweredList/@types/@innerTicketSubmittedAnsweredList";
import {
  InnerTicketSendingClosedListAndAdvanceFilterRequest,
  InnerTicketSendingClosedListAndAdvanceFilterResponse,
} from "@pages/Ticketing/InnerTickets/MyInnerTickets/helper/components/MyInnerTicketsSegmentSubmittedContent/helper/components/MyInnerTicketSubmittedClosed/@types/@innerTicketSubmittedClosedTypes";
import {
  GetInnerTicketSendingUnAssignedListRequest,
  GetInnerTicketSendingUnAssignedListResponse,
} from "@pages/Ticketing/InnerTickets/MyInnerTickets/helper/components/MyInnerTicketsSegmentSubmittedContent/helper/components/MyInnerTicketSubmittedNotAssignedList/@types/@innerTicketSubmittedNotAssignedList";
import {
  InnerTicketSendingPendingListAndAdvanceFilterRequest,
  InnerTicketSendingPendingListAndAdvanceFilterResponse,
} from "@pages/Ticketing/InnerTickets/MyInnerTickets/helper/components/MyInnerTicketsSegmentSubmittedContent/helper/components/MyInnerTicketSubmittedWaitingList/@types/@innerTicketSubmittedWaitingListTypes";
import { GetTicketingSuperAgentCountOfTicketsResponse } from "@pages/Ticketing/SuperAgent/SuperAgentList/@types/@superAgentListTypes";
import {
  TicketingSuperAgentAllListRequest,
  TicketingSuperAgentAllListResponse,
} from "@pages/Ticketing/SuperAgent/SuperAgentList/helper/components/SuperAgentAllList/@types/@SuperAgentAllListTypes";
import {
  SuperAgentAssignedListAndAdvanceFilterRequest,
  SuperAgentAssignedListAndAdvanceFilterResponse,
} from "@pages/Ticketing/SuperAgent/SuperAgentList/helper/components/SuperAgentAssignedToList/@types/@SuperAgentAssignedToListTypes";
import {
  GetTicketSuperAgentAssignedToMeAnsweredRequest,
  GetTicketSuperAgentAssignedToMeAnsweredResponse,
} from "@pages/Ticketing/SuperAgent/SuperAgentList/helper/components/SuperAgentAssignedToMeList/helper/components/SuperAgentAssignedToMeAnsweredList/@types/@superAgentAssignedToMeAnsweredList";
import {
  GetTicketSuperAgentAssignedToMeWaitingRequest,
  GetTicketSuperAgentAssignedToMeWaitingResponse,
} from "@pages/Ticketing/SuperAgent/SuperAgentList/helper/components/SuperAgentAssignedToMeList/helper/components/SuperAgentAssignedToMeWaitingList/@types/@superAgentAssignedToMeWaitingList";
import {
  SuperAgentClosedListAndAdvanceFilterRequest,
  SuperAgentClosedListAndAdvanceFilterResponse,
} from "@pages/Ticketing/SuperAgent/SuperAgentList/helper/components/SuperAgentClosedList/@types/@SuperAgentClosedListTypes";
import {
  SuperAgentUnAssignedListAndAdvanceFilterRequest,
  SuperAgentUnAssignedListAndAdvanceFilterResponse,
} from "@pages/Ticketing/SuperAgent/SuperAgentList/helper/components/SuperAgentNotAssignedList/@types/@SuperAgentNotAssignedListTypes";
import { GetTicketingAgentsListByTopicIdAndBranchIdResponse } from "@pages/Ticketing/SuperAgent/SuperAgentList/helper/components/SuperAgentNotAssignedList/helper/modals/AssignSuperAgentTicket/@types/@assignSuperAgentTicketModal";

import { ticketingApi } from "../../ticketingApi";

export const ticketingApis = ticketingApi.injectEndpoints({
  endpoints: (builder) => ({
    // list of tickets of customer all tickets tab (agent)
    ticketAllAdvancedFilterByExpert: builder.query<
      TicketAllAdvancedFilterByExpertResponse,
      TicketAllAdvancedFilterByExpertRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `/manager/tickets/search/all${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    // agent/not assigned/list & advance filter
    ticketAgentAnAssignedListAndAdvanceFilter: builder.query<
      AgentTicketNotAssignedListAndAdvanceFilterResponse,
      AgentTicketNotAssignedListAndAdvanceFilterRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `/manager/tickets/search/unassigned${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    getAllTopicBySamimServices: builder.query<
      GetAllTopicBySamimServicesResponse,
      GetAllTopicBySamimServicesRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `/management/topics/samim-services${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    getAllSamimService: builder.query<GetAllSamimServiceResponse, void>({
      query: () => ({
        method: "GET",
        url: `/enum/samim-service`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    getAllTicketOrigin: builder.query<GetAllTicketOriginResponse, void>({
      query: () => ({
        method: "GET",
        url: `/enum/ticket-origin`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    getPriority: builder.query<GetPriorityResponse, void>({
      query: () => ({
        method: "GET",
        url: `/enum/ticket-priority`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    getInnerTicketSendingUnAssignedList: builder.query<
      GetInnerTicketSendingUnAssignedListResponse,
      GetInnerTicketSendingUnAssignedListRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `/management/tickets/search/submitted/unassigned${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    // inner tickets/recieved/replied /list & advance filter
    getInnerTicketSubmittedAnswered: builder.query<
      GetInnerTicketSubmittedAnsweredResponse,
      GetInnerTicketSubmittedAnsweredRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `/management/tickets/search/submitted/replied${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    getTicketingAgentCountOftickets: builder.query<
      GetTicketingAgentCountOfticketsResponse,
      void
    >({
      query: () => ({
        method: "GET",
        url: `/manager/tickets/banner`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    // inner tickets/sending/closed /list & advance filter
    innerTicketSendingClosedListAndAdvanceFilter: builder.query<
      InnerTicketSendingClosedListAndAdvanceFilterResponse,
      InnerTicketSendingClosedListAndAdvanceFilterRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `/management/tickets/search/submitted/closed${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    // inner tickets/sending/pending /list & advance filter
    innerTicketSendingPendingListAndAdvanceFilter: builder.query<
      InnerTicketSendingPendingListAndAdvanceFilterResponse,
      InnerTicketSendingPendingListAndAdvanceFilterRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `/management/tickets/search/submitted/waiting-reply${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    // inner tickets/sending/all /list & advance filter
    innerTicketSendingAllListAndAdvanceFilter: builder.query<
      InnerTicketSendingAllListAndAdvanceFilterResponse,
      InnerTicketSendingAllListAndAdvanceFilterRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `/management/tickets/search/submitted/all${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    // inner tickets/sending/count of tickets
    innerTicketSendingCountOftickets: builder.query<
      InnerTicketSendingCountOfticketsResponse,
      void
    >({
      query: () => ({
        method: "GET",
        url: `/management/tickets/submitted/banner`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    TicketStatus: builder.query<InnerTicketStatusResponse, void>({
      query: () => ({
        method: "GET",
        url: `/enum/ticket-status`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    getInnerTicketsReceivedBannerStats: builder.query<
      GetInnerTicketsReceivedBannerStatsResponse,
      void
    >({
      query: () => ({
        method: "GET",
        url: "manager/tickets/internal/received/banner",
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    getAllInnerTicketsReceivedBannerStats: builder.query<
      GetAllInnerTicketsReceivedBannerStatsResponse,
      void
    >({
      query: () => ({
        method: "GET",
        url: "admin/tickets/internal/received/banner",
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    innerTicketReceivedAllList: builder.query<
      InnerTicketReceivedAllListResponse,
      InnerTicketReceivedAllListRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `/manager/tickets/search/received-internal-tickets/all${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    allInnerTicketReceivedAllList: builder.query<
      AllInnerTicketReceivedAllListResponse,
      AllInnerTicketReceivedAllListRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `/admin/tickets/search/received-internal-tickets/all${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    // inner tickets/received/un assigned /list & advance filter
    innerTicketReceivedUnAssignedListAndAdvanceFilter: builder.query<
      InnerTicketReceivedUnAssignedListAndAdvanceFilterResponse,
      InnerTicketReceivedUnAssignedListAndAdvanceFilterRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `/manager/tickets/search/received-internal-tickets/unassigned${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    allInnerTicketReceivedUnAssignedListAndAdvanceFilter: builder.query<
      AllInnerTicketReceivedUnAssignedListAndAdvanceFilterResponse,
      AllInnerTicketReceivedUnAssignedListAndAdvanceFilterRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `/admin/tickets/search/received-internal-tickets/unassigned${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    // inner tickets/received/assigned to me /answered
    innerTicketReceivedAssignedToMeAnswered: builder.query<
      InnerTicketReceivedAssignedToMeAnsweredResponse,
      InnerTicketReceivedAssignedToMeAnsweredRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `/manager/tickets/search/received-internal-tickets/my-assign/replied${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    allInnerTicketReceivedAssignedToMeAnswered: builder.query<
      AllInnerTicketReceivedAssignedToMeAnsweredResponse,
      AllInnerTicketReceivedAssignedToMeAnsweredRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `/admin/tickets/search/received-internal-tickets/my-assign/replied${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    // super agent tickets/assigned to me /waiting
    getTicketSuperAgentAssignedToMeWaiting: builder.query<
      GetTicketSuperAgentAssignedToMeWaitingResponse,
      GetTicketSuperAgentAssignedToMeWaitingRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `/admin/tickets/search/my-assign/waiting-reply${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    // super agent tickets/assigned to me /answered
    getTicketSuperAgentAssignedToMeAnswered: builder.query<
      GetTicketSuperAgentAssignedToMeAnsweredResponse,
      GetTicketSuperAgentAssignedToMeAnsweredRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `/admin/tickets/search/my-assign/replied${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    // super agent/un assigned /list & advance filter
    superAgentUnAssignedListAndAdvanceFilter: builder.query<
      SuperAgentUnAssignedListAndAdvanceFilterResponse,
      SuperAgentUnAssignedListAndAdvanceFilterRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `/admin/tickets/search/unassigned${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    ticketingSuperAgentAllList: builder.query<
      TicketingSuperAgentAllListResponse,
      TicketingSuperAgentAllListRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `admin/tickets/search/all${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    // agent/assigned to me /waiting/ list & advance filter
    ticketingAgentAssignedToMeWaitingList: builder.query<
      TicketingAgentAssignedToMeWaitingListResponse,
      TicketingAgentAssignedToMeWaitingListRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `manager/tickets/search/my-assign/waiting-reply${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    // agent /closed /list & advance filter
    agentClosedListAndAdvanceFilter: builder.query<
      AgentClosedListAndAdvanceFilterResponse,
      AgentClosedListAndAdvanceFilterRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `/manager/tickets/search/closed${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    // super agent/assigned /list & advance filter
    superAgentAssignedListAndAdvanceFilter: builder.query<
      SuperAgentAssignedListAndAdvanceFilterResponse,
      SuperAgentAssignedListAndAdvanceFilterRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `admin/tickets/search/assigned${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    // agent/assigned to me /answered/ list & advance filter
    ticketingAgentAssignedToMeAnsweredList: builder.query<
      TicketingAgentAssignedToMeAnsweredListResponse,
      TicketingAgentAssignedToMeAnsweredListRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `manager/tickets/search/my-assign/replied${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    // super agent/closed /list & advance filter
    superAgentClosedListAndAdvanceFilter: builder.query<
      SuperAgentClosedListAndAdvanceFilterResponse,
      SuperAgentClosedListAndAdvanceFilterRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `admin/tickets/search/closed${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    //my inner ticketing/assigned to me /waiting/list & advance filter
    ticketingReceivedAssignedToMeWaitingList: builder.query<
      TicketingReceivedAssignedToMeWaitingListResponse,
      TicketingReceivedAssignedToMeWaitingListRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `manager/tickets/search/received-internal-tickets/my-assign/waiting-reply${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    // all inner ticket/closed /list & advance filter
    allInnerTicketsClosedListAndAdvanceFilter: builder.query<
      AllInnerTicketsClosedListAndAdvanceFilterResponse,
      AllInnerTicketsClosedListAndAdvanceFilterRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `admin/tickets/search/received-internal-tickets/closed${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    //all inner ticketing/assigned to me /waiting/list & advance filter
    ticketingAllReceivedAssignedToMeWaitingList: builder.query<
      TicketingAllReceivedAssignedToMeWaitingListResponse,
      TicketingAllReceivedAssignedToMeWaitingListRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `admin/tickets/search/received-internal-tickets/my-assign/waiting-reply${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    // my inner ticket/closed /list & advance filter
    myInnerTicketsClosedListAndAdvanceFilter: builder.query<
      MyInnerTicketsClosedListAndAdvanceFilterResponse,
      MyInnerTicketsClosedListAndAdvanceFilterRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `manager/tickets/search/received-internal-tickets/closed${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    // close type
    TicketCloseTypes: builder.query<InnerTicketCloseTypesResponse, void>({
      query: () => ({
        method: "GET",
        url: `/management/tickets/close-types`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    ticketBasicInfoListCount: builder.query<
      { topicCount: number; roleCount: number },
      void
    >({
      query: () => ({
        method: "GET",
        url: "admin/topics/basic-info/count",
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    ticketIssuesSubjectList: builder.query<
      TicketIssuesSubjectListResponse,
      TicketIssuesSubjectListRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `management/topic/search${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    // super agent /banner
    getTicketingSuperAgentCountOfTickets: builder.query<
      GetTicketingSuperAgentCountOfTicketsResponse,
      void
    >({
      query: () => ({
        method: "GET",
        url: `/admin/tickets/banner`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    ticketingMyAssignToMe: builder.mutation<number, string>({
      query: (ticketId) => ({
        url: `manager/tickets/${ticketId}/assign-to-self`,
        method: "PUT",
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    getTicketingAgentsListByTopicIdAndBranchId: builder.query<
      GetTicketingAgentsListByTopicIdAndBranchIdResponse,
      { topicIds: number; branchIds: number }
    >({
      query: (params) => ({
        method: "GET",
        url: `management/experts/topics/branches${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    // inner tickets/sending/all/ status card detail
    allInnerTicketsSendingStatusDetail: builder.query<
      AllInnerTicketsSendingStatusDetailResponse,
      string
    >({
      query: (ticketId) => ({
        method: "GET",
        url: `management/tickets/${ticketId}/submitted`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    ticketingAllAssignToOther: builder.mutation<
      number,
      { ticketId: string; userId: string }
    >({
      query: ({ ticketId, userId }) => ({
        url: `admin/tickets/${ticketId}/assign-to-other/${userId}`,
        method: "PUT",
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    ticketingAllAssignToMe: builder.mutation<number, string>({
      query: (ticketId) => ({
        url: `admin/tickets/${ticketId}/assign-to-self`,
        method: "PUT",
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),

    // inner tickets/sending/all/ message detail
    allInnerTicketsSendingMessageDetail: builder.query<
      AllInnerTicketsSendingMessageDetailResponse,
      string
    >({
      query: (ticketId) => ({
        method: "GET",
        url: `management/tickets/${ticketId}/submitted/messages`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    // inner tickets/ sending/ all / close ticket
    innerSendingCloseTicket: builder.mutation<number, string>({
      query: (ticketId) => ({
        method: "PUT",
        url: `management/tickets/submitted/${ticketId}/close`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),

    // inner tickets/ sending/ all / submit rate
    innerSendingSubmitRate: builder.mutation<number, innerSendingSubmitRateRequest>({
      query: ({ ticketId, rate }) => ({
        method: "PATCH",
        url: `management/submitted/${ticketId}/rate?rate=${rate}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),

    // inner tickets/sending/all/ send only note
    allInnerTicketsSendingOnlySendMessage: builder.mutation<
      string,
      AllInnerTicketsSendingOnlySendMessageRequest
    >({
      query: ({ ticketId, body }) => ({
        method: "POST",
        body,
        url: `management/tickets/${ticketId}/submitted/messages`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),

    // inner tickets/sending/all/ send file and note
    allInnerTicketsSendingSendMessageAndFile: builder.mutation<
      AllInnerTicketsSendingSendMessageAndFileResponse,
      AllInnerTicketsSendingSendMessageAndFileRequest
    >({
      query: ({ ticketId, body }) => ({
        method: "POST",
        body,
        url: `management/tickets/${ticketId}/submitted/files`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),

    //ticketing details manager/ banner info top of page
    ticketingMyDetailsBannerInfo: builder.query<
      TicketingMyDetailsBannerInfoResponse,
      TicketingMyDetailsBannerInfoRequest
    >({
      query: ({ ticketId }) => ({
        method: "GET",
        url: `manager/tickets/${ticketId}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    //All ticketing details/ banner info top of page
    ticketingAllDetailsBannerInfo: builder.query<
      TicketingAllDetailsBannerInfoResponse,
      TicketingAllDetailsBannerInfoRequest
    >({
      query: ({ ticketId }) => ({
        method: "GET",
        url: `admin/tickets/${ticketId}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    //ticketing details manager/ first tab
    ticketingMyDetailsMessages: builder.query<
      TicketingMyDetailsMessagesResponse,
      TicketingMyDetailsMessagesRequest
    >({
      query: ({ ticketId }) => ({
        method: "GET",
        url: `manager/tickets/${ticketId}/messages`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    //All ticketing details/ first tab
    ticketingAllDetailsMessages: builder.query<
      TicketingAllDetailsMessagesResponse,
      TicketingAllDetailsMessagesRequest
    >({
      query: ({ ticketId }) => ({
        method: "GET",
        url: `admin/tickets/${ticketId}/messages`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    //ticketing details manager/ second tab
    ticketingMyDetailsMessagesAI: builder.query<
      TicketingMyDetailsMessagesAIResponse,
      TicketingMyDetailsMessagesAIRequest
    >({
      query: ({ ticketId }) => ({
        method: "GET",
        url: `manager/tickets/${ticketId}/ai-messages`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    //All ticketing details/ second tab
    ticketingAllDetailsMessagesAI: builder.query<
      TicketingAllDetailsMessagesAIResponse,
      TicketingAllDetailsMessagesAIRequest
    >({
      query: ({ ticketId }) => ({
        method: "GET",
        url: `admin/tickets/${ticketId}/ai-messages`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    //ticketing details manager/ third tab
    ticketingMyDetailsNotes: builder.query<
      TicketingMyDetailsNotesResponse,
      TicketingMyDetailsNotesRequest
    >({
      query: ({ ticketId }) => ({
        method: "GET",
        url: `manager/tickets/${ticketId}/notes`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    //All ticketing details/ third tab
    ticketingAllDetailsNotes: builder.query<
      TicketingAllDetailsNotesResponse,
      TicketingAllDetailsNotesRequest
    >({
      query: ({ ticketId }) => ({
        method: "GET",
        url: `admin/tickets/${ticketId}/notes`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    //ticketing details manager/ close ticket
    ticketingMyDetailsCloseTicket: builder.mutation<
      void,
      TicketingMyDetailsCloseTicketRequest
    >({
      query: ({ ticketId }) => ({
        method: "PUT",
        url: `manager/tickets/${ticketId}/close`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    // inner tickets/sending/all/ send file and note
    basicInfoCreateTopic: builder.mutation<number, BasicInfoCreateTopicRequest>({
      query: ({ body }) => ({
        method: "POST",
        body,
        url: `admin/topic`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    //All ticketing details/ close ticket
    ticketingAllDetailsCloseTicket: builder.mutation<
      void,
      TicketingAllDetailsCloseTicketRequest
    >({
      query: ({ ticketId }) => ({
        method: "PUT",
        url: `admin/tickets/${ticketId}/close`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    //ticketing details manager/ sending note
    ticketingMyDetailsAddNote: builder.mutation<number, TicketingMyDetailsAddNoteRequest>(
      {
        query: (body) => ({
          method: "POST",
          url: `manager/tickets/note`,
          body,
          headers: {
            "Accept-Language": "fa",
          },
        }),
      }
    ),
    //All ticketing details/ sending note
    ticketingAllDetailsAddNote: builder.mutation<
      number,
      TicketingAllDetailsAddNoteRequest
    >({
      query: (body) => ({
        method: "POST",
        url: `admin/tickets/note`,
        body,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    // ticketing details manager / sending files
    ticketingMyDetailsAddFiles: builder.mutation<
      TicketingMyDetailsAddFilesResponse,
      TicketingMyDetailsAddFilesRequest
    >({
      query: ({ ticketId, body }) => ({
        method: "POST",
        url: `manager/tickets/${ticketId}/note/files`,
        body,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    //All ticketing details / sending files
    ticketingAllDetailsAddFiles: builder.mutation<
      TicketingAllDetailsAddFilesResponse,
      TicketingAllDetailsAddFilesRequest
    >({
      query: ({ ticketId, body }) => ({
        method: "POST",
        url: `admin/tickets/${ticketId}/note/files`,
        body,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    //ticketing details manager/ sending message
    ticketingMyDetailsAddMessage: builder.mutation<
      string,
      TicketingMyDetailsAddMessageRequest
    >({
      query: ({ ticketId, body }) => ({
        method: "POST",
        url: `manager/tickets/${ticketId}/messages`,
        body,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    //All ticketing details/ sending message
    ticketingAllDetailsAddMessage: builder.mutation<
      string,
      TicketingAllDetailsAddMessageRequest
    >({
      query: ({ ticketId, body }) => ({
        method: "POST",
        url: `admin/tickets/${ticketId}/messages`,
        body,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    // ticketing details manager / sending files message
    ticketingMyDetailsAddFilesMessage: builder.mutation<
      TicketingMyDetailsAddFilesMessageResponse,
      TicketingMyDetailsAddFilesMessageRequest
    >({
      query: ({ ticketId, body }) => ({
        method: "POST",
        url: `manager/tickets/${ticketId}/files`,
        body,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    //All ticketing details / sending files message
    ticketingAllDetailsAddFilesMessage: builder.mutation<
      TicketingAllDetailsAddFilesMessageResponse,
      TicketingAllDetailsAddFilesMessageRequest
    >({
      query: ({ ticketId, body }) => ({
        method: "POST",
        url: `admin/tickets/${ticketId}/files`,
        body,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    // ticketing details manager / sending referrals
    ticketingMyDetailsReferrals: builder.mutation<
      void,
      TicketingMyDetailsReferralsRequest
    >({
      query: ({ ticketId, params }) => ({
        method: "PATCH",
        url: `manager/tickets/${ticketId}/referral${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    //All ticketing details / sending referrals
    ticketingAllDetailsReferrals: builder.mutation<
      void,
      TicketingAllDetailsReferralsRequest
    >({
      query: ({ ticketId, params }) => ({
        method: "PATCH",
        url: `admin/tickets/${ticketId}/referral${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    // ticketing details priority / changing priority
    ticketingMyDetailsPriority: builder.mutation<void, TicketingMyDetailsPriorityRequest>(
      {
        query: ({ id, params }) => ({
          method: "PUT",
          url: `manager/tickets/${id}/priority${createQueryString(params)}`,
          headers: {
            "Accept-Language": "fa",
          },
        }),
      }
    ),
    //All ticketing details priority / changing priority
    ticketingAllDetailsPriority: builder.mutation<
      void,
      TicketingAllDetailsPriorityRequest
    >({
      query: ({ id, params }) => ({
        method: "PUT",
        url: `admin/tickets/${id}/priority${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    // ticketing details history / forth tab
    ticketingMyDetailsHistory: builder.query<
      TicketingMyDetailsHistoryResponse,
      TicketingMyDetailsHistoryRequest
    >({
      query: ({ ticketId }) => ({
        method: "GET",
        url: `manager/tickets/${ticketId}/history`,
        headers: {
          "Accept-Language": "fa",
        },
        providesTags: ["tag/ticketing"],
      }),
    }),
    //All ticketing details history / forth tab
    ticketingAllDetailsHistory: builder.query<
      TicketingAllDetailsHistoryResponse,
      TicketingAllDetailsHistoryRequest
    >({
      query: ({ ticketId }) => ({
        method: "GET",
        url: `admin/tickets/${ticketId}/history`,
        headers: {
          "Accept-Language": "fa",
        },
        providesTags: ["tag/ticketing"],
      }),
    }),
    // ticketing details list of default answers
    ticketingMyDetailsDefaultAnswers: builder.query<
      TicketingMyDetailsDefaultAnswersResponse,
      void
    >({
      query: () => ({
        method: "GET",
        url: `management/default-answers`,
        headers: {
          "Accept-Language": "fa",
        },
        providesTags: ["tag/ticketing"],
      }),
    }),
    // ticketing details save message as default answer
    ticketingMyDetailsSaveDefaultAnswers: builder.mutation<
      void,
      TicketingMyDetailsSaveDefaultAnswersRequest
    >({
      query: (body) => ({
        method: "POST",
        url: `management/default-answer`,
        body,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    // ticketing details view one default answer
    ticketingMyDetailsViewDefaultAnswers: builder.query<
      TicketingMyDetailsViewDefaultAnswersResponse,
      TicketingMyDetailsViewDefaultAnswersRequest
    >({
      query: ({ defaultAnswerId }) => ({
        method: "GET",
        url: `management/default-answer/${defaultAnswerId}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    // ticketing details delete one default answer
    ticketingMyDetailsDeleteDefaultAnswers: builder.mutation<
      void,
      TicketingMyDetailsDeleteDefaultAnswersRequest
    >({
      query: ({ id }) => ({
        method: "DELETE",
        url: `management/default-answer/${id}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    // ticketing details information drawer manager first tab
    ticketingMyDetailsInformation: builder.query<
      TicketingMyDetailsInformationResponse,
      TicketingMyDetailsInformationRequest
    >({
      query: ({ ticketId }) => ({
        method: "GET",
        url: `manager/tickets/${ticketId}/view-information`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    // ticketing details information drawer manager second tab
    ticketingMyDetailsUserInformation: builder.query<
      TicketingMyDetailsUserInformationResponse,
      TicketingMyDetailsUserInformationRequest
    >({
      query: ({ ticketId }) => ({
        method: "GET",
        url: `manager/tickets/${ticketId}/view-information/user`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    // ticketing details information drawer admin first tab
    ticketingAllDetailsInformation: builder.query<
      TicketingAllDetailsInformationResponse,
      TicketingAllDetailsInformationRequest
    >({
      query: ({ ticketId }) => ({
        method: "GET",
        url: `admin/tickets/${ticketId}/view-information`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    // ticketing details information drawer admin second tab
    ticketingAllDetailsUserInformation: builder.query<
      TicketingAllDetailsUserInformationResponse,
      TicketingAllDetailsUserInformationRequest
    >({
      query: ({ ticketId }) => ({
        method: "GET",
        url: `admin/tickets/${ticketId}/view-information/user`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    // ticketing details information drawer manager third tab
    ticketingMyDetailsExpertInformation: builder.query<
      TicketingMyDetailsExpertInformationResponse,
      TicketingMyDetailsExpertInformationRequest
    >({
      query: ({ ticketId }) => ({
        method: "GET",
        url: `manager/tickets/${ticketId}/experts`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    // ticketing details information drawer manager third tab
    ticketingAllDetailsExpertInformation: builder.query<
      TicketingAllDetailsExpertInformationResponse,
      TicketingAllDetailsExpertInformationRequest
    >({
      query: ({ ticketId }) => ({
        method: "GET",
        url: `admin/tickets/${ticketId}/experts`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),

    // basic info ticket roles
    ticketRolesList: builder.query<TicketRolesListResponse, TicketRolesListRequest>({
      query: (params) => ({
        method: "GET",
        url: `admin/topics/roles/search${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    // basic info modify role
    basicInfoModifyRole: builder.mutation<void, basicInfoModifyRoleRequest>({
      query: ({ role, topicIds }) => ({
        method: "PUT",
        url: `admin/topics/roles/${role}${createQueryString({
          topicIds,
        })}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),

    // basic info view
    viewRoleList: builder.query<viewRoleListResponse, string>({
      query: (role) => ({
        method: "GET",
        url: `admin/topics/${role}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    getAttachTicket: builder.query<GetAttachTicketResponse, void>({
      query: () => ({
        method: "GET",
        url: `management/user/closed-ticket`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),

    // add inner ticket
    addInnerTicket: builder.mutation<string, AddInnerTicketRequest>({
      query: ({ body }) => ({
        method: "POST",
        body,
        url: `management/tickets/submit`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    //topic info base information
    getTopicInfo: builder.query<getTopicInfoResponse, getTopicInfoRequest>({
      query: ({ topicId }) => ({
        method: "GET",
        url: `admin/topic/${topicId}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    // edit topic info
    editTopicInfo: builder.mutation<number, EditTopicInfoRequest>({
      query: ({ params, body }) => ({
        method: "PUT",
        url: `admin/topic${createQueryString(params)}`,
        body,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    getInnerTopicBySamimServices: builder.query<
      GetInnerTopicBySamimServicesResponse,
      GetInnerTopicBySamimServicesRequest
    >({
      query: (params) => ({
        method: "GET",
        url: `/management/topics/internal/samim-service${createQueryString(params)}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/ticketing"],
    }),
    // cancel allocation manager
    ticketingManagerCancelAllocation: builder.mutation<
      void,
      TicketingManagerCancelAllocationRequest
    >({
      query: ({ ticketId }) => ({
        method: "PUT",
        url: `manager/tickets/${ticketId}/unassign`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    // cancel allocation admin
    ticketingAdminCancelAllocation: builder.mutation<
      void,
      TicketingAdminCancelAllocationRequest
    >({
      query: ({ ticketId }) => ({
        method: "PUT",
        url: `admin/tickets/${ticketId}/unassign`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
  }),
});

export const {
  useLazyTicketAllAdvancedFilterByExpertQuery,
  useLazyTicketAgentAnAssignedListAndAdvanceFilterQuery,
  useLazyGetAllTopicBySamimServicesQuery,
  useLazyGetAllSamimServiceQuery,
  useLazyGetAllTicketOriginQuery,
  useLazyGetInnerTicketSendingUnAssignedListQuery,
  useLazyGetTicketingAgentCountOfticketsQuery,
  useLazyGetPriorityQuery,
  useLazyGetInnerTicketSubmittedAnsweredQuery,
  useLazyInnerTicketSendingClosedListAndAdvanceFilterQuery,
  useLazyInnerTicketSendingPendingListAndAdvanceFilterQuery,
  useLazyInnerTicketSendingAllListAndAdvanceFilterQuery,
  useLazyTicketStatusQuery,
  useLazyInnerTicketSendingCountOfticketsQuery,
  useLazyGetInnerTicketsReceivedBannerStatsQuery,
  useLazyGetAllInnerTicketsReceivedBannerStatsQuery,
  useLazyInnerTicketReceivedAllListQuery,
  useLazyAllInnerTicketReceivedAllListQuery,
  useLazyInnerTicketReceivedUnAssignedListAndAdvanceFilterQuery,
  useLazyAllInnerTicketReceivedUnAssignedListAndAdvanceFilterQuery,
  useLazyInnerTicketReceivedAssignedToMeAnsweredQuery,
  useLazyAllInnerTicketReceivedAssignedToMeAnsweredQuery,
  useLazyGetTicketSuperAgentAssignedToMeWaitingQuery,
  useLazySuperAgentUnAssignedListAndAdvanceFilterQuery,
  useLazyTicketingSuperAgentAllListQuery,
  useLazyGetTicketSuperAgentAssignedToMeAnsweredQuery,
  useLazyTicketingAgentAssignedToMeWaitingListQuery,
  useLazyAgentClosedListAndAdvanceFilterQuery,
  useLazySuperAgentAssignedListAndAdvanceFilterQuery,
  useLazyTicketingAgentAssignedToMeAnsweredListQuery,
  useLazySuperAgentClosedListAndAdvanceFilterQuery,
  useLazyTicketingReceivedAssignedToMeWaitingListQuery,
  useLazyTicketingAllReceivedAssignedToMeWaitingListQuery,
  useLazyAllInnerTicketsClosedListAndAdvanceFilterQuery,
  useLazyMyInnerTicketsClosedListAndAdvanceFilterQuery,
  useLazyTicketCloseTypesQuery,
  useLazyTicketIssuesSubjectListQuery,
  useLazyTicketBasicInfoListCountQuery,
  useLazyGetTicketingSuperAgentCountOfTicketsQuery,
  useTicketingMyAssignToMeMutation,
  useLazyGetTicketingAgentsListByTopicIdAndBranchIdQuery,
  useTicketingAllAssignToOtherMutation,
  useTicketingAllAssignToMeMutation,
  useLazyAllInnerTicketsSendingStatusDetailQuery,
  useLazyAllInnerTicketsSendingMessageDetailQuery,
  useInnerSendingCloseTicketMutation,
  useInnerSendingSubmitRateMutation,
  useAllInnerTicketsSendingOnlySendMessageMutation,
  useAllInnerTicketsSendingSendMessageAndFileMutation,
  useLazyTicketingMyDetailsBannerInfoQuery,
  useLazyTicketingMyDetailsMessagesQuery,
  useLazyTicketingMyDetailsMessagesAIQuery,
  useLazyTicketingMyDetailsNotesQuery,
  useTicketingMyDetailsCloseTicketMutation,
  useBasicInfoCreateTopicMutation,
  useTicketingMyDetailsAddNoteMutation,
  useTicketingMyDetailsAddFilesMutation,
  useTicketingMyDetailsAddMessageMutation,
  useTicketingMyDetailsAddFilesMessageMutation,
  useTicketingMyDetailsReferralsMutation,
  useTicketingMyDetailsPriorityMutation,
  useLazyTicketingMyDetailsHistoryQuery,
  useLazyTicketingMyDetailsDefaultAnswersQuery,
  useTicketingMyDetailsSaveDefaultAnswersMutation,
  useLazyTicketingMyDetailsViewDefaultAnswersQuery,
  useTicketingMyDetailsDeleteDefaultAnswersMutation,
  useLazyTicketingAllDetailsBannerInfoQuery,
  useLazyTicketingAllDetailsMessagesQuery,
  useLazyTicketingAllDetailsMessagesAIQuery,
  useLazyTicketingAllDetailsNotesQuery,
  useTicketingAllDetailsCloseTicketMutation,
  useTicketingAllDetailsAddNoteMutation,
  useTicketingAllDetailsAddFilesMutation,
  useTicketingAllDetailsAddMessageMutation,
  useTicketingAllDetailsAddFilesMessageMutation,
  useTicketingAllDetailsReferralsMutation,
  useTicketingAllDetailsPriorityMutation,
  useLazyTicketingAllDetailsHistoryQuery,
  useLazyTicketingMyDetailsInformationQuery,
  useLazyTicketingMyDetailsUserInformationQuery,
  useLazyTicketingAllDetailsUserInformationQuery,
  useLazyTicketingAllDetailsInformationQuery,
  useLazyTicketingMyDetailsExpertInformationQuery,
  useLazyTicketingAllDetailsExpertInformationQuery,
  useLazyTicketRolesListQuery,
  useBasicInfoModifyRoleMutation,
  useLazyViewRoleListQuery,
  useLazyGetAttachTicketQuery,
  useLazyGetTopicInfoQuery,
  useAddInnerTicketMutation,
  useEditTopicInfoMutation,
  useLazyGetInnerTopicBySamimServicesQuery,
  useTicketingAdminCancelAllocationMutation,
  useTicketingManagerCancelAllocationMutation,
} = ticketingApis;
