import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//!LAYOUT
export type SessionAllocationModalPropsType = {
  isModalOpen: {
    isOpen: boolean;
    id: number;
  };
  accusationType?: number | string;
  setIsModalOpen: ({ isOpen, id }: { isOpen: boolean; id: number }) => void;
};
//!API
export type GetAppealMeetingOtherFilesResponse = BPMS_API_RESPONSE<
  {
    appealReviewPeriod: string;
    AssociationMeetingAppealsCommittee_id: number;
    studentNumber: string;
    AssociationInfractions_title: string;
    id: number;
  }[]
>;
export type GetAppealMeetingSelectSessionListResponse = BPMS_API_RESPONSE<
  {
    topicMeeting: string;
    meetingDate: string;
    id: number;
  }[]
>;
export type GetAppealMeetingSessionAllocationModalResponse = BPMS_API_RESPONSE<{
  AssociationMeetingAppealsCommittee: {
    topicMeeting: string;
    meetingDate: string;
    id: number;
  };
  appealNeedToBePresent: boolean;
  appealProvider: string;
  appealReviewPeriod: string;
  id: number;
  primaryNotificationMessage: string;
  primaryNotificationType: number;
}>;
export type GetAppealMeetingSessionAllocationModalRequest = {
  _data_: {
    id: string;
  };
};
export type SendAppealMeetingSessionAllocationModalResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type SendAppealMeetingSessionAllocationModalRequest = BPMS_API_REQUEST<
  string,
  {
    appealMeeting: number;
    appealNeedToBePresent: boolean;
    appealProvider: string;
    appealReviewPeriod: string;
    id: number;
    primaryNotificationMessage: string;
    primaryNotificationType: number;
  }
>;
export type RegisterSessionAllocationFormData = {
  needToBePresent: boolean;
  meeting: {
    key: string;
  };
  period: string;
  provider: string;
  notifType: string;
  sendingMessage: string;
};
