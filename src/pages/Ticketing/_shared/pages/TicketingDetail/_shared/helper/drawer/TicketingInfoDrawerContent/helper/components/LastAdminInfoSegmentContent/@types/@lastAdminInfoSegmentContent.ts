import { TicketingAllDetailsExpertInformationResponse } from "@pages/Ticketing/_shared/pages/TicketingDetail/AllTicketingDetail/@types/@allTicketingDetail";
import { TicketingMyDetailsExpertInformationResponse } from "@pages/Ticketing/_shared/pages/TicketingDetail/MyTicketingDetail/@types/@myTicketingDetail";

export type LastAdminInfoSegmentContentProps = {
  isDetailExpertInfoLoading: boolean;
  detailExpertInfoData?:
    | TicketingMyDetailsExpertInformationResponse
    | TicketingAllDetailsExpertInformationResponse;
  onDetailExpertInfo: (params: { ticketId: string }) => Promise<unknown> | void;
};
