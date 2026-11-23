import { BPMS_API_RESPONSE } from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
//! API
export type GetListPreliminaryMeetingsResponse = BPMS_API_RESPONSE<
  {
    meetingTime: string;
    topicMeeting: string;
    AssociationPersonnel_title: string;
    lastModifiedDate: string;
    AssociationMeetingPlace_title: string;
    AssociationSessionStatus_title: string;
    meetingDate: string;
    id: number;
    meetingEndTime: string;
    uniId: number;
  }[]
>;
export type ListPreliminaryMeetingsRequest = {
  firstResult: number;
  maxResults: number;
  type: number;
};
export type GetListPreliminaryMeetingsCountRequest = {
  type: number;
};
