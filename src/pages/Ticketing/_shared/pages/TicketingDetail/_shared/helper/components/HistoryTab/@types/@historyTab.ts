import { TicketingAllDetailsHistoryResponse } from "@pages/Ticketing/_shared/pages/TicketingDetail/AllTicketingDetail/@types/@allTicketingDetail";
import { TicketingMyDetailsHistoryResponse } from "@pages/Ticketing/_shared/pages/TicketingDetail/MyTicketingDetail/@types/@myTicketingDetail";

export type HistoryTabProps = {
  data:
    | TicketingMyDetailsHistoryResponse
    | TicketingAllDetailsHistoryResponse
    | undefined;
  loading: boolean;
};
