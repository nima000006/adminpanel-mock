import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//!LAYOUT
export type SelectInputType = {
  children: string;
  code: number;
  item: {
    id: number;
    title: string;
  };
};
export type ConsultingCenterSessionAllocationType = {
  sessionType: SelectInputType;
  datePicker: string;
  startTime: string;
  endTime: string;
  sessionLocation: SelectInputType;
  consultant: SelectInputType;
  description: string;
  fatherName: string;
  fatherPhone: string;
  motherName: string;
  motherPhone: string;
  notification: SelectInputType;
  sendMessage: string;
};
//! API
export type ConsultingCenterList = {
  AssociationStatusCounselingSession_title: string;
  nationalCode: null;
  AssociationViolationStatus_id: number;
  studentNumber: null;
  statusCounselingSession: number;
  studentName: null;
  eventReport: null;
  id: number;
  AssociationViolationStatus_title: string;
  studentFamily: null;
};
export type GetConsultingCenterResponse = {
  data: ConsultingCenterList[];
  msg: string;
  status: number;
};
export type GetConsultingCenterRequest = {
  firstResult: number;
  maxResults: number;
  type: number;
};
export type SendConsultingSessionAllocationModalRequest = {
  form: "AllocationCounselingSessions";
  id: "2e85823f54b34b809e13997d1dd63a4d";
  _data_: {
    meetingType: number;
    meetingStartTime: string;
    placeMeeting: number;
    meetingDate: string;
    meetingEndTime: string;
    Consultant: number;
    meetingStatus: number;
    desc: string;
    fatherName: string;
    motherName: string;
    fatherPhoneNumber: string;
    motherPhoneNumber: string;
    notificationType: number;
    sentMessage: string;
    id: number | null;
  };
};
export type SendConsultingSessionAllocationModalResponse = BPMS_API_RESPONSE<{
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
    title: string;
    id: number;
  };
  meetingStartTime: string;
  consultantdescription: null;
  meetingDate: string;
  AssociationMeetingStatus: {
    title: string;
    id: number;
  };
  AssociationConsultant: {
    lastName: string;
    firstName: string;
    id: number;
    title: string;
  };
  id: number;
  AssociationNotificationType: {
    title: string;
    id: number;
  };
  createDate: string;
  motherPhoneNumber: string;
  descCancellation: null;
  motherName: string;
  meetingEndTime: string;
  AssociationMeetingPlace: {
    title: string;
    id: number;
  };
  Consultant: number;
  reasonCanceling: null;
  desc: string;
  violationId: number;
  consultantOpinion: null;
}>;
