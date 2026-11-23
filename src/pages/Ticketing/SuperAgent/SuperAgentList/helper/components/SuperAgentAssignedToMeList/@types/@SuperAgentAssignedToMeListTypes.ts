export type SuperAgentAssignedToMeTicketPriority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type SuperAgentAssignedToMeTicketType = "PRIMARY" | "REFERENCED";

export type SuperAgentAssignedToMeListTypes = {
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
  ticketType: SuperAgentAssignedToMeTicketType;
  subjectIssue: string;
  service: string;
  priority: SuperAgentAssignedToMeTicketPriority;
  mobileNumber: string;
};

export type TabMode = "waiting" | "answered";

export type SuperAgentAssignedToMeAdvanceFilterFormType = {
  province: string[];
  city: string[];
  branch: string[];
  service: string[];
  ticketType: string[];
  subjectIssue: string[];
  priority: string[];
  ticketDate: [string, string];
};
