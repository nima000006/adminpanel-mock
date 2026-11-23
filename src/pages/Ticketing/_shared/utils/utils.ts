import {
  AgentTicketAllTicketPriority,
  AgentTicketAllTicketType,
  AgentTicketAllTypeOfClose,
} from "@pages/Ticketing/Agent/AgentTicketList/helper/components/AgentTicketAllList/@types/@agentTicketAllTypes";

export const priorityMap: Record<
  AgentTicketAllTicketPriority,
  { label: string; color: string }
> = {
  LOW: { label: "کم", color: "green" },
  MEDIUM: { label: "متوسط", color: "orange" },
  HIGH: { label: "زیاد", color: "volcano" },
  CRITICAL: { label: "خیلی زیاد", color: "red" },
};

export const ticketTypeMap: Record<
  AgentTicketAllTicketType,
  { label: string; color: string }
> = {
  PRIMARY: { label: "اولیه", color: "blue" },
  REFERENCED: { label: "ارجاعی", color: "orange" },
};

export const typeOfCloseMap: Record<
  AgentTicketAllTypeOfClose,
  { label: string; color: string }
> = {
  customer: { label: "کاربر", color: "blue" },
  system: { label: "سیستم", color: "green" },
  agentOfTicket: { label: "کارشناس تیکت", color: "red" },
};

export const ticketStatusMap = {
  UNASSIGNED: {
    label: "تخصیص‌نیافته",
    color: "orange",
  },
  WAITING_FOR_REPLY: {
    label: "در انتظار پاسخ",
    color: "default",
  },
  REPLIED: {
    label: "پاسخ داده شد",
    color: "green",
  },
  USER_CLOSED: {
    label: "بسته شده توسط کاربر",
    color: "red",
  },
  ADMIN_CLOSED: {
    label: "بسته شده توسط کارشناس",
    color: "red",
  },
  AUTO_CLOSED: {
    label: "بسته شده توسط سیستم",
    color: "magenta",
  },
};

export const closedBy = [
  {
    id: 1,
    name: "USER_CLOSED",
    title: "بسته شده توسط کاربر",
  },
  {
    id: 2,
    name: "ADMIN_CLOSED",
    title: "بسته شده توسط کارشناس",
  },
  {
    id: 3,
    name: "AUTO_CLOSED",
    title: "به‌صورت خودکار بسته شد",
  },
  {
    id: 4,
    name: "AI_AUTO_CLOSED",
    title: "بسته شده توسط هوش مصنوعی",
  },
];

export const closeTypesOptions = [
  {
    id: 5,
    name: "AUTO_CLOSED",
    title: "بسته شده توسط سیستم",
  },
  {
    id: 4,
    name: "ADMIN_CLOSED",
    title: "بسته شده توسط کارشناس",
  },
  {
    id: 3,
    name: "USER_CLOSED",
    title: "بسته شده توسط کاربر",
  },
];
