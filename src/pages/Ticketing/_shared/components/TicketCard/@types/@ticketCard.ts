import { ticketStatusMap } from "@pages/Ticketing/_shared/utils/utils";
import {
  AgentTicketAllTicketPriority,
  AgentTicketAllTicketType,
} from "@pages/Ticketing/Agent/AgentTicketList/helper/components/AgentTicketAllList/@types/@agentTicketAllTypes";

import { TicketRateProps } from "../../TicketRate/@types/ticket-rate.types";

export type TicketCardProps = {
  ticketNumber: number;
  title: string;
  description: string;
  userName?: string | React.ReactNode;
  userCode?: string;
  date: string;
  ribbonStatus?: keyof typeof ticketStatusMap;
  priority?: AgentTicketAllTicketPriority;
  topTag: string;
  service: string;
  step?: AgentTicketAllTicketType;
  stepIcon?: React.ReactNode;
  waitingTime?: string;
  actionButtons?: React.ReactNode;
  rate?: TicketRateProps;
  assign?: string | React.ReactNode;
  closedBy?: string | React.ReactNode;
  borderColor?: string;
};
