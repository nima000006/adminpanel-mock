import { BPMS_API_RESPONSE } from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
export type NotifType = { id: number; title: string };
//! API
export type GetTypeMeetingResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
export type GetConsultantResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
export type GetConsultingCenterChangeSessionRequest = {
  _data_: {
    id: string;
  };
};

export type GetConsultingCenterChangeSessionResponse = BPMS_API_RESPONSE<{
  placeMeeting: number;
  tenant_id: null;
  fatherName: string;
  topicMeeting: null;
  meetingStatus: number;
  sentMessage: string;
  holdingMeeting: boolean;
  notificationType: number;
  meetingType: number;
  resultCounselingSession: null;
  fatherPhoneNumber: string;
  AssociationMeetingType: {
    tenant_id: null;
    id: number;
    title: string;
  };
  meetingStartTime: string;
  consultantdescription: null;
  meetingDate: string;
  AssociationMeetingStatus: {
    tenant_id: null;
    id: number;
    title: string;
  };
  id: number;
  AssociationConsultant: {
    tenant_id: null;
    lastName: string;
    firstName: string;
    id: number;
    title: string;
  };
  AssociationNotificationType: {
    tenant_id: null;
    id: number;
    title: string;
  };
  createDate: string;
  motherPhoneNumber: string;
  descCancellation: null;
  motherName: string;
  meetingEndTime: string;
  AssociationMeetingPlace: {
    tenant_id: null;
    id: number;
    title: string;
  };
  Consultant: number;
  reasonCanceling: null;
  desc: string;
  violationId: number;
  consultantOpinion: null;
}>;
