import { TicketVariants } from "@pages/Ticketing/_shared/pages/TicketingDetail/_shared/@types/@ticketingDetailTypes";
import {
  TicketingAllDetailsBannerInfoResponse,
  TicketingAllDetailsReferralsRequest,
} from "@pages/Ticketing/_shared/pages/TicketingDetail/AllTicketingDetail/@types/@allTicketingDetail";
import { TicketingMyDetailsBannerInfoResponse } from "@pages/Ticketing/_shared/pages/TicketingDetail/MyTicketingDetail/@types/@myTicketingDetail";
import { TicketingMyDetailsReferralsRequest } from "@pages/Ticketing/_shared/pages/TicketingDetail/MyTicketingDetail/@types/@myTicketingDetail";

export type TicketBannerProps = {
  data:
    | TicketingMyDetailsBannerInfoResponse
    | TicketingAllDetailsBannerInfoResponse
    | undefined;
  loading?: boolean;
  variant: TicketVariants;
  refreshBannerInfo: () => void;
  onCloseTicket?: (ticketId: string) => Promise<unknown> | void;
  onReferralTicket?:
    | ((args: TicketingMyDetailsReferralsRequest) => Promise<unknown> | void)
    | ((args: TicketingAllDetailsReferralsRequest) => Promise<unknown> | void);
  onPriorityChange?: (priority: string) => Promise<unknown> | void;
  onAssignToMe?: (ticketId: string) => Promise<unknown> | void;
  onAssignToMeAdmin?: (ticketId: string) => void;
  isCloseTicketLoading?: boolean;
  isReferralTicketLoading?: boolean;
  isPriorityTicketLoading?: boolean;
  isAssignToMeLoading?: boolean;
  isAdmin: boolean;
  sectionRoute?: string;
};

export type TicketingManagerCancelAllocationRequest = {
  ticketId: string | undefined;
};

export type TicketingAdminCancelAllocationRequest = {
  ticketId: string | undefined;
};
