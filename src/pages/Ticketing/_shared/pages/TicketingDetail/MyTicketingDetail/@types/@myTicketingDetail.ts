import { IdTitle, IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type TicketingMyDetailsBannerPriority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type TicketingMyDetailsBannerType = "PRIMARY" | "REFERENCED";
export type TicketingMyDetailsBannerStatus =
  | "REPLIED"
  | "USER_CLOSED"
  | "ADMIN_CLOSED"
  | "UNASSIGNED"
  | "WAITING_FOR_REPLY"
  | "AUTO_CLOSED";

export type IdTitleNameLocal<TName = string> = {
  id: number;
  title: string;
  name: TName;
};

export type TicketingMyDetailsBannerInfoRequest = {
  ticketId: string;
};

export type TicketingMyDetailsBannerInfoResponse = {
  title: string;
  ticketNumber: number;
  status: IdTitleNameLocal<TicketingMyDetailsBannerStatus>;
  samimService: IdTitleName;
  ticketUuid: string;
  ticketOrigin: IdTitleNameLocal<TicketingMyDetailsBannerType>;
  priority: IdTitleNameLocal<TicketingMyDetailsBannerPriority>;
  assignedToUserStaff: string;
  assignedToUserStaffId: number;
  internal: boolean;
  topic: IdTitle;
  relatedTicket: { id: string; title: string };
  ticketRating: number;
  ticketRatingComment: string;
  waitingDays: number;
  modifiedBy: string;
  modifiedByUserId: number;
  createdDate: string;
  modifiedDate: string;
};

export type TicketingMyDetailsMessagesRequest = {
  ticketId: string;
};

export type TicketingMyDetailsMessagesResponse = {
  content: string;
  attachmentUrl: string;
  firstname: string;
  lastname: string;
  role: IdTitleName;
  createdUuid: string;
  createDate: string;
  bySelf: boolean;
  dayChange: boolean;
}[];

export type TicketingMyDetailsMessagesAIRequest = {
  ticketId: string;
};
export type TicketingMyDetailsMessagesAIResponse = {
  attachmentUrl: string;
  fromUserFirstname: string;
  fromUserLastname: string;
  content: string;
  fromUserRole: IdTitleName;
  createdDate: string;
}[];

export type TicketingMyDetailsNotesRequest = {
  ticketId: string;
};

export type TicketingMyDetailsNotesResponse = {
  attachmentUrl: string;
  fromUserFirstname: string;
  fromUserLastname: string;
  content: string;
  fromUserRole: IdTitleName;
  createdDate: string;
}[];

export type TicketingMyDetailsCloseTicketRequest = {
  ticketId: string;
  message?: string;
};

export type TicketingMyDetailsAddNoteRequest = {
  ticketId: string;
  content: string;
};

export type TicketingMyDetailsAddFilesRequest = {
  ticketId: string;
  body: FormData;
};

export type TicketingMyDetailsAddFilesResponse = {
  objectName: string;
  title: string;
  url: string;
  uploadFileId: number;
  ticketId: number;
};

export type TicketingMyDetailsAddMessageRequest = {
  ticketId: string;
  body: { message: string };
};

export type TicketingMyDetailsAddFilesMessageRequest = {
  ticketId: string;
  body: FormData;
};

export type TicketingMyDetailsAddFilesMessageResponse = {
  objectName: string;
  title: string;
  url: string;
  uploadFileId: number;
  ticketId: number;
};

export type TicketingMyDetailsReferralsRequest = {
  ticketId: string;
  params: {
    topicId: number;
    description: string;
  };
};

export type TicketingMyDetailsPriorityRequest = {
  id: string;
  params: {
    priority: string;
  };
};

export type TicketingMyDetailsDefaultAnswersResponse = IdTitle[];

export type TicketingMyDetailsSaveDefaultAnswersRequest = {
  message: string;
  uuid?: string;
};

export type TicketingMyDetailsViewDefaultAnswersRequest = {
  defaultAnswerId: string;
};

export type TicketingMyDetailsViewDefaultAnswersResponse = IdTitle;

export type TicketingMyDetailsDeleteDefaultAnswersRequest = {
  id: string;
};

export type TicketingMyDetailsHistoryRequest = {
  ticketId: string;
};

export type TicketingMyDetailsHistoryResponse = {
  ticketUuid: string;
  userRevisionId: number;
  userRevisionName: string;
  revisionDate: string;
  actionType: IdTitleName[];
  oldSamimService: IdTitleName;
  newSamimService: IdTitleName;
  oldStatus: IdTitleName;
  newStatus: IdTitleName;
  oldTopic: IdTitle;
  newTopic: IdTitle;
  oldAssignBy: IdTitleName;
  newAssignBy: IdTitleName;
  details: string;
}[];

export type TicketingMyDetailsInformationRequest = {
  ticketId: string;
};

export type TicketingMyDetailsInformationResponse = {
  ticketId: string;
  ticketNumber: number;
  status: IdTitleNameLocal<TicketingMyDetailsBannerStatus>;
  ticketOrigin: IdTitleName;
  priority: IdTitleName;
  service: IdTitleName;
  ticketRating: number;
  waitingTime: number;
  internal: boolean;
  topicTitle: string;
  createdDate: string;
  closedDate: string;
  cancelableAssign: boolean;
  closedBy: string;
  closedByUserId: number;
  assignedToUserStaffUuid: string;
  assignedToUserStaffId: number;
  assignedToUserStaffName: string;
  relatedTicket: { id: string; title: string };
  userId: number;
};

export type TicketingMyDetailsUserInformationRequest = {
  ticketId: string;
};

export type TicketingMyDetailsUserInformationResponse = {
  staffType: string;
  firstName: string;
  lastName: string;
  username: string;
  personalCode: string;
  studentNumber: string;
  mobileNumber: string;
  studyFieldId: number;
  studyFieldName: string;
  degreeId: number;
  employeePosition: string;
  degreeName: string;
  branchId: number;
  branchName: string;
  cityName: string;
  provinceName: string;
  userId: number;
  businessId: number;
};

export type TicketingMyDetailsExpertInformationRequest = {
  ticketId: string;
};

export type TicketingMyDetailsExpertInformationResponse = {
  assignById: number;
  assignByName: string;
  assignRole: IdTitleName;
  assignBranchId: number;
  assignBranchName: string;
}[];
