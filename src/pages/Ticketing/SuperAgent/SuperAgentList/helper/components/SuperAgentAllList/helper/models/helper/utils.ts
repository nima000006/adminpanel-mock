import { SuperAgentAllTypeOfClose } from "../../../@types/@SuperAgentAllListTypes";

export const typeOfCloseMap: Record<
  SuperAgentAllTypeOfClose,
  { label: string; color: string }
> = {
  customer: { label: "کاربر", color: "blue" },
  system: { label: "سیستم", color: "green" },
  agentOfTicket: { label: "کارشناس تیکت", color: "red" },
};
