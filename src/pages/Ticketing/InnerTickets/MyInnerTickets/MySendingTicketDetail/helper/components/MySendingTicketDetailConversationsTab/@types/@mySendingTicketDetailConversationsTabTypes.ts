import { AllInnerTicketsSendingMessageDetailResponse } from "@pages/Ticketing/InnerTickets/AllInnerTickets/AllSendingTicketDetail/@types/@allSendingTicketDetailTypes";

export type MySendingTicketDetailConversationsTabProps = {
  data: AllInnerTicketsSendingMessageDetailResponse | undefined;
  loading: boolean;
};
