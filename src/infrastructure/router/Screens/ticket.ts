import { lazy } from "react";

import {
  TICKETS_HOME_PAGE_ROUTE,
  TICKETS_PRIORITY_PAGE_ROUTE,
  TICKET_INSPECTION_PAGE_ROUTE,
} from "../routes/ticket";

const Tickets = lazy(() => import("../../../pages/Tickets/Main/TicketsMain"));
const TicketsPriority = lazy(
  () => import("../../../pages/Tickets/Priority/TicketsPriority")
);
const TicketInspection = lazy(
  () => import("../../../pages/Ticket/Inspection/TicketInspection")
);

export const TicketScreens = [
  {
    component: Tickets,
    path: TICKETS_HOME_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: TicketsPriority,
    path: TICKETS_PRIORITY_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: TicketInspection,
    path: TICKET_INSPECTION_PAGE_ROUTE,
    isBgContentCustom: false,
  },
];
