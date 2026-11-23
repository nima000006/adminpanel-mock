import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";
//! GENERAL
//! LAYOUT

//! API
export type ConsultingCenterSessionList = {
  AssociationConsultant_title: string;
  meetingStartTime: string;
  AssociationMeetingPlace_title: string;
  meetingDate: string;
  AssociationMeetingStatus_title: string;
  id: number;
  AssociationMeetingStatus_id: number;
  AssociationMeetingType_title: string;
  meetingEndTime: string;
};
export type GetConsultingCenterSessionListResponse = {
  data: ConsultingCenterSessionList[];
  msg: string;
  status: number;
};
export type GetConsultingCenterSessionListRequest = {
  firstResult: number;
  maxResults: number;
  type: number;
};
export type GetConsultingCenterCountResponse = {
  data: number;
  msg: string;
  status: number;
};
export type SendConsultingRejectSessionRequest = {
  form: "CancelCounselingSession";
  id: "72c23f36c7084c5d978e93f549736533";
  _data_: {
    descCancellation: string;
    meetingStatus: number;
    reasonCanceling: string;
    id: number | null;
  };
};
export type SendConsultingRejectSessionResponse = BPMS_API_RESPONSE<{
  descCancellation: string;
  meetingStatus: number;
  reasonCanceling: string;
  id: number;
}>;
