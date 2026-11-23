//! GENERAL

import { BPMS_API_RESPONSE } from "../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type SessionAllocationModalType = {
  isModalOpen: {
    isOpen: boolean;
    id: number;
  };
  setIsModalOpen: ({ isOpen, id }: { isOpen: boolean; id: number }) => void;
};
export type RejectSessionAllocationForm = {
  needtobepresent: boolean;
  ReasonPreliminaryMeeting: string;
  meeting: string;
  reviewPeriod: string;
};
//! API
export type GetSelectionMeetingRequest = {
  firstResult: number;
  maxResults: number;
  meetingDate_GTEQ: string;
};
export type GetSessionPresentationReasonResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
export type SendSessionAllocationResponse = {
  data: {
    ReasonPreliminaryMeeting: number;
    needToBePresent: boolean;
    id: number;
    meeting: number;
    reviewPeriod: string;
  };
  msg: string;
  status: number;
};
export type SendSessionAllocationRequest = {
  form: string;
  id: string;
  _data_: {
    reviewPeriod: string;
    needToBePresent: boolean;
    id: number;
    meeting: number;
    ReasonPreliminaryMeeting: number;
  };
};
