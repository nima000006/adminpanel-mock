import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "@infra/states/redux/Apis/models/committeeApi.model";

//! GENERAL

//! LAYOUT
export type SessionMembersStepProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  mode?: string;
};
//! API
export type GetSessionMeetingMembersResponse = BPMS_API_RESPONSE<
  {
    key: string;
    name: string;
    familyName: string;
    role: string;
    userNumber: string;
    mobile: string;
    presence: boolean;
  }[]
>;
export type GetMemberMeetingRequest = {
  _data_: {
    id: string;
  };
};
export type GetMemberMeetingResponse = BPMS_API_RESPONSE<{
  chairmanPresence: boolean;
  CulturalMemberPresence: boolean;
  legalMemberPresence: boolean;
  facultyMemberPresence: boolean;
  studentMemberPresence: boolean;
  secretaryPresence: boolean;
  sendMessage: string;
  AssociationNotificationType: {
    id: number;
    title: string;
  };
  id: number;
}>;
export type SendSessionMeetingMembersRequest = BPMS_API_REQUEST<
  string,
  {
    chairmanPresence: boolean;
    legalMemberPresence: boolean;
    studentMemberPresence: boolean;
    notificationType: number;
    CulturalMemberPresence: boolean;
    facultyMemberPresence: boolean;
    secretaryPresence: boolean;
    sendMessage: string;
    id: number;
  }
>;
export type SendSessionMeetingMembersResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
