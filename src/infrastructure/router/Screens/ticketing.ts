import { lazy } from "react";

import {
  TICKETING_TICKET_ALL_DETAIL_PAGE_ROUTE,
  TICKETING_AGENT_TICKET_LIST_PAGE_ROUTE,
  TICKETING_TICKET_MY_DETAIL_PAGE_ROUTE,
  TICKETING_ALL_INNER_TICKET_LIST_PAGE_ROUTE,
  TICKETING_ALL_SENDING_TICKET_DETAIL_PAGE_ROUTE,
  TICKETING_BASIC_INFO_AGENT_PAGE_ROUTE,
  TICKETING_BASIC_INFO_ISSUES_SUBJECT_PAGE_ROUTE,
  TICKETING_BASIC_INFO_LIST_PAGE_ROUTE,
  TICKETING_BASIC_INFO_TICKET_ROLE_PAGE_ROUTE,
  TICKETING_INNER_TICKET_LIST_PAGE_ROUTE,
  TICKETING_SENDING_TICKET_DETAIL_PAGE_ROUTE,
  TICKETING_SMART_ANSWERS_DETAIL_PAGE_ROUTE,
  TICKETING_SMART_ANSWERS_LIST_PAGE_ROUTE,
  TICKETING_SUPER_AGENT_TICKET_LIST_PAGE_ROUTE,
} from "../routes/ticketing";

const TicketingBasicInfoList = lazy(
  () => import("../../../pages/Ticketing/BasicInfo/BasicInfoList/BasicInfoList")
);
const TicketingBasicInfoIssuesSubject = lazy(
  () =>
    import("../../../pages/Ticketing/BasicInfo/BasicInfoDetail/IssuesSubject/IssuesSubject")
);
const TicketingBasicInfoTicketRole = lazy(
  () => import("../../../pages/Ticketing/BasicInfo/BasicInfoDetail/TicketRole/TicketRole")
);
const TicketingBasicInfoAgent = lazy(
  () => import("../../../pages/Ticketing/BasicInfo/BasicInfoDetail/Agent/Agent")
);
const TicketingSmartAnswersList = lazy(
  () => import("../../../pages/Ticketing/SmartAnswers/SmartAnswersList/SmartAnswersList")
);
const TicketingSmartAnswersDetail = lazy(
  () =>
    import("../../../pages/Ticketing/SmartAnswers/SmartAnswerDetail/SmartAnswerDetail")
);
const AgentTicketList = lazy(
  () => import("../../../pages/Ticketing/Agent/AgentTicketList/AgentTicketList")
);
const SuperAgentList = lazy(
  () => import("../../../pages/Ticketing/SuperAgent/SuperAgentList/SuperAgentList")
);
const AllTicketingAgentDetail = lazy(
  () =>
    import("../../../pages/Ticketing/_shared/pages/TicketingDetail/AllTicketingDetail/AllTicketingDetail")
);
const MyTicketingAgentDetail = lazy(
  () =>
    import("../../../pages/Ticketing/_shared/pages/TicketingDetail/MyTicketingDetail/MyTicketingDetail")
);
const InnerTicketsList = lazy(
  () =>
    import("../../../pages/Ticketing/InnerTickets/MyInnerTickets/MyInnerTicketsList/MyInnerTicketsList")
);
const SendingTicketDetail = lazy(
  () =>
    import("../../../pages/Ticketing/InnerTickets/MyInnerTickets/MySendingTicketDetail/MySendingTicketDetail")
);

const AllInnerTicketsList = lazy(
  () =>
    import("../../../pages/Ticketing/InnerTickets/AllInnerTickets/AllInnerTicketsList/AllInnerTicketsList")
);
const AllSendingTicketDetail = lazy(
  () =>
    import("../../../pages/Ticketing/InnerTickets/AllInnerTickets/AllSendingTicketDetail/AllSendingTicketDetail")
);

export const TicketingScreens = [
  {
    component: TicketingBasicInfoList,
    path: TICKETING_BASIC_INFO_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: TicketingBasicInfoIssuesSubject,
    path: TICKETING_BASIC_INFO_ISSUES_SUBJECT_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: TicketingBasicInfoTicketRole,
    path: TICKETING_BASIC_INFO_TICKET_ROLE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: TicketingBasicInfoAgent,
    path: TICKETING_BASIC_INFO_AGENT_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: TicketingSmartAnswersList,
    path: TICKETING_SMART_ANSWERS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: TicketingSmartAnswersDetail,
    path: TICKETING_SMART_ANSWERS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AgentTicketList,
    path: TICKETING_AGENT_TICKET_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: SuperAgentList,
    path: TICKETING_SUPER_AGENT_TICKET_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AllTicketingAgentDetail,
    path: TICKETING_TICKET_ALL_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: MyTicketingAgentDetail,
    path: TICKETING_TICKET_MY_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: InnerTicketsList,
    path: TICKETING_INNER_TICKET_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: SendingTicketDetail,
    path: TICKETING_SENDING_TICKET_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AllInnerTicketsList,
    path: TICKETING_ALL_INNER_TICKET_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AllSendingTicketDetail,
    path: TICKETING_ALL_SENDING_TICKET_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
];
