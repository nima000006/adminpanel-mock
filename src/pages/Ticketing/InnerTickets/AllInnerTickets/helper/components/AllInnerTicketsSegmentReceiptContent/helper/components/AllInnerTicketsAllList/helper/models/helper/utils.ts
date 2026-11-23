import { InnerTicketsAllTypeOfClose } from "../../../@types/@InnerTicketsAllTypes";

export const typeOfCloseMap: Record<
  InnerTicketsAllTypeOfClose,
  { label: string; color: string }
> = {
  customer: { label: "کاربر", color: "blue" },
  system: { label: "سیستم", color: "green" },
  agentOfTicket: { label: "کارشناس تیکت", color: "red" },
};
