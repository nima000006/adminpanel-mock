import { TicketVariants } from "@pages/Ticketing/_shared/pages/TicketingDetail/_shared/@types/@ticketingDetailTypes";
import { TicketingAllDetailsInformationResponse } from "@pages/Ticketing/_shared/pages/TicketingDetail/AllTicketingDetail/@types/@allTicketingDetail";
import { TicketingMyDetailsInformationResponse } from "@pages/Ticketing/_shared/pages/TicketingDetail/MyTicketingDetail/@types/@myTicketingDetail";

export type TicketInfoSegmentContentProps = {
  variant: TicketVariants;
  detailInfoData?:
    | TicketingMyDetailsInformationResponse
    | TicketingAllDetailsInformationResponse;
  isDetailInfoLoading?: boolean;
  onDetailInfo?: (params: { ticketId: string }) => Promise<unknown> | void;
  closeDrawerHandler: () => void;
};
