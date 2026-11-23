export const SUPER_AGENT_TICKET_STATUS = {
  notAssigned: "1", //  تخصیص نیافته‌ها
  assignedToOthers: "2", //  تخصیص  یافته ها
  assignedToMe: "3", //  تخصیص یافته به من
  closed: "4", //  بسته شده‌ها
  allTickets: "5", //  همه تیکت‌ها
};

export const SuperAgentAssignedTicketStatus = [
  { id: 1, title: "در انتظار پاسخ", name: "WAITING_FOR_REPLY" },
  { id: 2, title: "پاسخ داده شده", name: "REPLIED" },
];
