import { AllInnerTicketsSendingStatusDetailResponse } from "@pages/Ticketing/InnerTickets/AllInnerTickets/AllSendingTicketDetail/@types/@allSendingTicketDetailTypes";

export type AllSendingTicketDetailCardProps = {
  data: AllInnerTicketsSendingStatusDetailResponse | undefined;
  loading: boolean;
  onRefreshTicketStatus: () => void;
};

export type innerSendingSubmitRateRequest = {
  ticketId: string;
  rate: number;
};
