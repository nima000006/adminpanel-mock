import { AllInnerTicketsSendingMessageDetailResponse } from "@pages/Ticketing/InnerTickets/AllInnerTickets/AllSendingTicketDetail/@types/@allSendingTicketDetailTypes";

export type AllSendingTicketDetailConversationsTabProps = {
  data: AllInnerTicketsSendingMessageDetailResponse | undefined;
  loading: boolean;
};
