import { Rate } from "antd";

export type TicketRateProps = {
  value?: number | null | string;
  isForTable?: boolean;
  disabled?: boolean;
  allowHalf?: boolean;
  rateProps?: typeof Rate;
  count?: number;
};

export type TicketDetailData = {
  id?: number;
  ribbonStatus?: "answered" | "closed" | "unassigned" | "waiting";
  problemText: string;
  service: string;
  priority: string;
  step?: "basic" | "reject";
  waitingTime?: string;
  assign: string;
  desc: string;
  ticketNumber: string;
  rate: string;
  attachTicket: boolean;
  addTicketDate?: string;
  closeTicketDate?: string;
  role?: string;
  closeReason?: string;
  closeBy?: string;
};
