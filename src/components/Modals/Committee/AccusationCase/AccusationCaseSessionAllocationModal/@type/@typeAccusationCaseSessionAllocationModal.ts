import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//!LAYOUT
export type AccusationCaseSessionAllocationModalProps = {
  isModalOpen: {
    isOpen: boolean;
    id: number | string;
  };
  closeModalHandler: () => void;
};

//!API
export type GetPreliminaryMeetingResponse = BPMS_API_RESPONSE<
  {
    topicMeeting: string;
    meetingDate: string;
    id: number;
  }[]
>;
export type OtherFile = {
  AssociationMeeting_id: number;
  studentNumber: string;
  AssociationInfractions_title: string;
  id: number;
  reviewPeriod: string;
};
export type GetOtherFilesResponse = {
  data: OtherFile[];
  msg: string;
  status: number;
};
export type GetOtherFilesRequest = {
  maxResults: number;
  AssociationMeeting_id_EQ: number;
};
export type GetSessionDurationResponse = BPMS_API_RESPONSE<
  {
    id: number;
    time: string;
  }[]
>;
export type FirstMaxRequest = {
  maxResults: number;
  firstResult: number;
};
export type GetPrimaryProviderResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
export type IdTitleResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
export type AllocationPreliminaryMeetingRequest = BPMS_API_REQUEST<
  string,
  {
    needToBePresent: boolean;
    meeting: number;
    reviewPeriod: string;
    primaryProvider: string;
    primaryNotificationType: number;
    primaryNotificationMessage: string;
    id: number;
  }
>;
