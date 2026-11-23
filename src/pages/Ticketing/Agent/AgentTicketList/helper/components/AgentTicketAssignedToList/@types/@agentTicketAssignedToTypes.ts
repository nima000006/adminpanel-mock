export type AgentTicketAssignedToTicketPriority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type AgentTicketAssignedToTicketType = "PRIMARY" | "REFERENCED";

export type AgentTicketAssignedToTypes = {
  id: number;
  title: string;
  description: string;
  ticketNumber: string;
  lastResponseDate: string;
  registrationDate: string;
  city: string;
  province: string;
  branch: string;
  originBranch: string;
  studentOrPersonnelNumber: string;
  nationalCode: string;
  userName: string;
  ticketType: AgentTicketAssignedToTicketType;
  subjectIssue: string;
  service: string;
  priority: AgentTicketAssignedToTicketPriority;
  mobileNumber: string;
};

export type ViewMode = "card" | "table";
export type SortOrder = "none" | "asc" | "desc";
export type TabMode = "waiting" | "answered";

export type AgentTicketAssignedToAdvanceFilterFormType = {
  province: string[];
  city: string[];
  branch: string[];
  service: string[];
  ticketType: string[];
  subjectIssue: string[];
  priority: string[];
  ticketDate: [string, string];
};
