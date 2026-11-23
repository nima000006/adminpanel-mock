import { TicketingAllDetailsUserInformationResponse } from "@pages/Ticketing/_shared/pages/TicketingDetail/AllTicketingDetail/@types/@allTicketingDetail";
import { TicketingMyDetailsUserInformationResponse } from "@pages/Ticketing/_shared/pages/TicketingDetail/MyTicketingDetail/@types/@myTicketingDetail";

export type UserInfoSegmentContentProps = {
  detailUserInfoData?:
    | TicketingMyDetailsUserInformationResponse
    | TicketingAllDetailsUserInformationResponse;
  isDetailUserInfoLoading?: boolean;
  onDetailUserInfo?: (params: { ticketId: string }) => Promise<unknown> | void;
};
