import { TicketVariants } from "@pages/Ticketing/_shared/pages/TicketingDetail/_shared/@types/@ticketingDetailTypes";
import { TicketingMyDetailsBannerInfoResponse } from "@pages/Ticketing/_shared/pages/TicketingDetail/MyTicketingDetail/@types/@myTicketingDetail";

export type TicketingInfoDrawerContentProps = {
  closeDrawerHandler: () => void;
  data?: TicketingMyDetailsBannerInfoResponse | undefined;
  variant: TicketVariants;
  sectionRoute?: string;
};
