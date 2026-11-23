import { IdTitle, IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type TicketingAllDetailsBannerPriority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type TicketingAllDetailsBannerType = "PRIMARY" | "REFERENCED";
export type TicketingAllDetailsBannerStatus =
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

export type TicketingAllDetailsBannerInfoRequest = {
  ticketId: string;
};

export type TicketingAllDetailsBannerInfoResponse = {
  title: string;
  ticketNumber: number;
  status: IdTitleNameLocal<TicketingAllDetailsBannerStatus>;
  samimService: IdTitleName;
  ticketUuid: string;
  ticketOrigin: IdTitleNameLocal<TicketingAllDetailsBannerType>;
  priority: IdTitleNameLocal<TicketingAllDetailsBannerPriority>;
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

export type TicketingAllDetailsMessagesRequest = {
  ticketId: string;
};

export type TicketingAllDetailsMessagesResponse = {
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

export type TicketingAllDetailsMessagesAIRequest = {
  ticketId: string;
};
export type TicketingAllDetailsMessagesAIResponse = {
  attachmentUrl: string;
  fromUserFirstname: string;
  fromUserLastname: string;
  content: string;
  fromUserRole: IdTitleName;
  createdDate: string;
}[];

export type TicketingAllDetailsNotesRequest = {
  ticketId: string;
};

export type TicketingAllDetailsNotesResponse = {
  attachmentUrl: string;
  fromUserFirstname: string;
  fromUserLastname: string;
  content: string;
  fromUserRole: IdTitleName;
  createdDate: string;
}[];

export type TicketingAllDetailsCloseTicketRequest = {
  ticketId: string;
  message?: string;
};

export type TicketingAllDetailsAddNoteRequest = {
  ticketId: string;
  content: string;
};

export type TicketingAllDetailsAddFilesRequest = {
  ticketId: string;
  body: FormData;
};

export type TicketingAllDetailsAddFilesResponse = {
  objectName: string;
  title: string;
  url: string;
  uploadFileId: number;
  ticketId: number;
};

export type TicketingAllDetailsAddMessageRequest = {
  ticketId: string;
  body: { message: string };
};

export type TicketingAllDetailsAddFilesMessageRequest = {
  ticketId: string;
  body: FormData;
};

export type TicketingAllDetailsAddFilesMessageResponse = {
  objectName: string;
  title: string;
  url: string;
  uploadFileId: number;
  ticketId: number;
};

export type TicketingAllDetailsReferralsRequest = {
  ticketId: string;
  params: {
    topicId: number;
    description: string;
  };
};

export type TicketingAllDetailsPriorityRequest = {
  id: string;
  params: {
    priority: string;
  };
};

export type TicketingAllDetailsDefaultAnswersResponse = IdTitle[];

export type TicketingAllDetailsSaveDefaultAnswersRequest = {
  message: string;
  uuid?: string;
};

export type TicketingAllDetailsViewDefaultAnswersRequest = {
  defaultAnswerId: string;
};

export type TicketingAllDetailsViewDefaultAnswersResponse = IdTitle;

export type TicketingAllDetailsDeleteDefaultAnswersRequest = {
  id: string;
};

export type TicketingAllDetailsHistoryRequest = {
  ticketId: string;
};

export type TicketingAllDetailsHistoryResponse = {
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

export type TicketingAllDetailsInformationRequest = {
  ticketId: string;
};

export type TicketingAllDetailsInformationResponse = {
  ticketId: string;
  ticketNumber: number;
  status: IdTitleNameLocal<TicketingAllDetailsBannerStatus>;
  ticketOrigin: IdTitleName;
  priority: IdTitleName;
  service: IdTitleName;
  ticketRating: number;
  waitingTime: number;
  internal: boolean;
  topicTitle: string;
  createdDate: string;
  closedDate: string | null;
  cancelableAssign: boolean;
  closedBy: string;
  closedByUserId: number;
  assignedToUserStaffUuid: string;
  assignedToUserStaffId: number;
  assignedToUserStaffName: string;
  relatedTicket: { id: string; title: string };
  userId: number;
};

export type TicketingAllDetailsUserInformationRequest = {
  ticketId: string;
};

export type TicketingAllDetailsUserInformationResponse = {
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
export type TicketingAllDetailsExpertInformationRequest = {
  ticketId: string;
};

export type TicketingAllDetailsExpertInformationResponse = {
  assignById: number;
  assignByName: string;
  assignRole: IdTitleName;
  assignBranchId: number;
  assignBranchName: string;
}[];
