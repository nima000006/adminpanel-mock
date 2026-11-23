import { TicketingAllDetailsNotesResponse } from "@pages/Ticketing/_shared/pages/TicketingDetail/AllTicketingDetail/@types/@allTicketingDetail";
import { TicketingMyDetailsNotesResponse } from "@pages/Ticketing/_shared/pages/TicketingDetail/MyTicketingDetail/@types/@myTicketingDetail";

export type NotesTabProps = {
  data: TicketingMyDetailsNotesResponse | TicketingAllDetailsNotesResponse | undefined;
  loading?: boolean;
};
