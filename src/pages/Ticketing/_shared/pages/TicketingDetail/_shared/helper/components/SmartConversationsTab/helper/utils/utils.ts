import { ChatMessageModelType } from "@pages/Ticketing/_shared/components/MessageBox/@types/@messageBox";
import { AIItem } from "@pages/Ticketing/_shared/pages/TicketingDetail/_shared/helper/components/SmartConversationsTab/@types/@smartConversationsTabTypes";
import { TicketingAllDetailsMessagesAIResponse } from "@pages/Ticketing/_shared/pages/TicketingDetail/AllTicketingDetail/@types/@allTicketingDetail";
import { TicketingMyDetailsMessagesAIResponse } from "@pages/Ticketing/_shared/pages/TicketingDetail/MyTicketingDetail/@types/@myTicketingDetail";

export const mapAIToChat = (
  aiData:
    | TicketingMyDetailsMessagesAIResponse
    | TicketingAllDetailsMessagesAIResponse
    | undefined
): ChatMessageModelType[] | undefined => {
  if (!aiData) return undefined;

  return aiData.map((m: AIItem) => ({
    content: m?.content,
    attachmentUrl: m?.attachmentUrl,
    firstname: m?.fromUserFirstname,
    lastname: m?.fromUserLastname,
    role: m?.fromUserRole,
    createdUuid: m?.createdDate,
    createDate: m?.createdDate,
    bySelf: false,
    dayChange: false,
  }));
};
