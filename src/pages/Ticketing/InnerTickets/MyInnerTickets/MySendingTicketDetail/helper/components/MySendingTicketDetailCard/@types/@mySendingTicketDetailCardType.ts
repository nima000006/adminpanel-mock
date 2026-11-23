import { AllInnerTicketsSendingStatusDetailResponse } from "@pages/Ticketing/InnerTickets/AllInnerTickets/AllSendingTicketDetail/@types/@allSendingTicketDetailTypes";

export type MySendingTicketDetailCardProps = {
  data: AllInnerTicketsSendingStatusDetailResponse | undefined;
  loading: boolean;
  onRefreshTicketStatus: () => void;
};
