import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../states/redux/Apis/models/committeeApi.model";

//! values type

export type ConfirmRegisterVoteValuesType = {
  numberPreliminaryPunishments: {
    value: string;
  };
  numberVotesFavorpPrimitive: {
    value: string;
  };
  sentenceIntensificationDescription: string;
};
export type clarificationCommitteeTransferValuesType = {
  referralRemovalItems: string;
};

export type OtherFilesItemType = {
  id: number;
  AssociationInfractions_title: string;
  studentNumber: string;
  reviewPeriod: string;
};
export type RegisterCommentValuesType = {
  registerComment: {
    children: string;
  };
  registerDescription: string;
};

//! API
export type AccusationCentralList = {
  AssociationReferral_CentralReferralToResearchAssistant: boolean;
  nationalCode: string;
  AssociationCentrulMeeting_meetingDate: string;
  AssociationReferral_CentralReferralToCustody: boolean;
  AssociationTblPriiority_title: string;
  studentNumber: string;
  AssociationStatusCentrulCommittee_id: number;
  AssociationReferral_CentralReferralToStudentVice: boolean;
  AssociationCentrulMeeting_meetingTime: string;
  centralTypeUnderstanding: string;
  studentName: string;
  AssociationCentrulMeeting_meetingNumber: string;
  AssociationInfractions_title: string;
  AssociationInfractionType_title: string;
  AssociationPlaintiffType_title: string;
  id: number;
  AssociationReferral_CentralReferralToEducAssistant: boolean;
  studentFamily: string;
  AssociationStatusCentrulCommittee_title: string;
  createDate: string;
  dateLastStatusChange: string;
};
export type GetAccusationCentralListResponse = BPMS_API_RESPONSE<AccusationCentralList[]>;
export type GetCentralAccusationSelectionMeetingResponse = BPMS_API_RESPONSE<
  {
    topicMeeting: string;
    meetingDate: string;
    id: number;
  }[]
>;
export type GetCentralAccusationSelectionMeetingRequest = {
  firstResult: number;
  maxResults: number;
};
export type GetCommitteeCentralAccusationOtherFileResponse = BPMS_API_RESPONSE<
  {
    studentNumber: string;
    centrulReviewPeriod: string;
    AssociationInfractions_title: string;
    AssociationCentrulMeeting_id: number;
    id: number;
  }[]
>;
export type GetCommitteeCentralAccusationOtherFileRequest = {
  maxResults: number;
  AssociationCentrulMeeting_id_EQ: number;
};
export type SendCentralAccusationSessionAllocationModalRequest = BPMS_API_REQUEST<
  string,
  {
    centrulNeedToBePresent: boolean;
    centrulMeeting: number;
    centrulReviewPeriod: string;
    centrulProvider: string;
    primaryNotificationType: number;
    primaryNotificationMessage: string;
    id: number | null;
  }
>;

export type SendCentralAccusationSessionAllocationModalResponse = BPMS_API_RESPONSE<{
  centrulNeedToBePresent: boolean;
  centrulReviewPeriod: string;
  centrulProvider: string;
  id: number;
  primaryNotificationMessage: string;
  centrulMeeting: number;
}>;

export type GetCentralAccusationChangeMeetingModalAllDataResponse = BPMS_API_RESPONSE<{
  centrulNeedToBePresent: boolean;
  AssociationCentrulMeeting: {
    topicMeeting: string;
    id: number;
  };
  centrulReviewPeriod: string;
  centrulProvider: string;
  AssociationPrimaryNotification: {
    id: number;
    title: string;
  };
  primaryNotificationMessage: string;
}>;
export type GetCentralAccusationChangeMeetingModalAllDataRequest = {
  _data_: {
    id: string;
  };
};
