export type InnerTicketsAssignedToMeTicketPriority =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW";
export type InnerTicketsAssignedToMeTicketType = "PRIMARY" | "REFERENCED";

export type InnerTicketsAssignedToMeListTypes = {
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
  ticketType: InnerTicketsAssignedToMeTicketType;
  subjectIssue: string;
  service: string;
  priority: InnerTicketsAssignedToMeTicketPriority;
  mobileNumber: string;
};

export type TabMode = "waiting" | "answered";

export type InnerTicketsAssignedToMeAdvanceFilterFormType = {
  province: string[];
  city: string[];
  branch: string[];
  service: string[];
  ticketType: string[];
  subjectIssue: string[];
  priority: string[];
  ticketDate: [string, string];
};
