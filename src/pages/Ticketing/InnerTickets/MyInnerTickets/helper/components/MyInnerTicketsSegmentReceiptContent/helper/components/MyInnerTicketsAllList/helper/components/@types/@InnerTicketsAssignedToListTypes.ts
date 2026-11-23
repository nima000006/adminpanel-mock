export type InnerTicketsAssignedToTicketPriority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type InnerTicketsAssignedToTicketType = "PRIMARY" | "REFERENCED";

export type InnerTicketsAssignedToListTypes = {
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
  ticketType: InnerTicketsAssignedToTicketType;
  subjectIssue: string;
  service: string;
  priority: InnerTicketsAssignedToTicketPriority;
  mobileNumber: string;
  asignTo: string;
  status: "waiting" | "answered";
};

export type InnerTicketsAssignedToAdvanceFilterFormType = {
  province: string[];
  city: string[];
  branch: string[];
  service: string[];
  ticketType: string[];
  subjectIssue: string[];
  priority: string[];
  ticketDate: [string, string];
};
