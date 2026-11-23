export type InnerTicketsNotAssignedTicketPriority =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW";
export type InnerTicketsNotAssignedTicketType = "PRIMARY" | "REFERENCED";

export type InnerTicketsNotAssignedListTypes = {
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
  ticketType: InnerTicketsNotAssignedTicketType;
  subjectIssue: string;
  service: string;
  priority: InnerTicketsNotAssignedTicketPriority;
  mobileNumber: string;
};

export type InnerTicketsNotAssignedAdvanceFilterFormType = {
  province: string[];
  city: string[];
  branch: string[];
  service: string[];
  ticketType: string[];
  subjectIssue: string[];
  priority: string[];
  waitingTime: string[];
  ticketDate: [string, string];
};
