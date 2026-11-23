import { TicketingAllDetailsMessagesAIResponse } from "@pages/Ticketing/_shared/pages/TicketingDetail/AllTicketingDetail/@types/@allTicketingDetail";
import { TicketingMyDetailsMessagesAIResponse } from "@pages/Ticketing/_shared/pages/TicketingDetail/MyTicketingDetail/@types/@myTicketingDetail";

export type SmartConversationsTabProps = {
  data:
    | TicketingMyDetailsMessagesAIResponse
    | TicketingAllDetailsMessagesAIResponse
    | undefined;
  loading?: boolean;
};
export type AIItem =
  | TicketingMyDetailsMessagesAIResponse[number]
  | TicketingAllDetailsMessagesAIResponse[number];
