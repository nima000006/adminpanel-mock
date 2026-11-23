import { Dayjs } from "dayjs";

import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "@infra/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
export type SessionInfoStepProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};

export type SessionInfoDataType = {
  sessionTitle: string;
  meetingDate: string;
  startTime: string;
  endTime: string;
  sessionLocation: { item: { id: number } };
  sessionSecretary: { item: { id: number } };
  sessionDesc: string;
};
//! API
export type GetPersonnelListResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
export type GetMeetingPlaceResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
export type GetProviderListResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
export type AddSessionInformationRequest = BPMS_API_REQUEST<
  string,
  {
    topicMeeting: string;
    meetingDate: string;
    meetingTime?: Dayjs;
    meetingEndTime?: Dayjs;
    placeMeeting: number;
    secretary: number;
    desc: string;
    id: string | null;
  }
>;
export type AddSessionInformationResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type GetSessionInformationRequest = {
  _data_: {
    id: string;
  };
};
export type GetSessionInformationResponse = BPMS_API_RESPONSE<{
  topicMeeting: string;
  meetingDate: string;
  meetingTime: string;
  meetingEndTime: string;
  AssociationMeetingPlace: {
    id: number;
    title: string;
  };
  AssociationPersonnel: {
    firstName: string;
    lastName: string;
    nationalCode: string;
    personnelNumber: string;
    mobile: string;
    id: number;
    title: string;
  };
  desc: string;
  id: number;
}>;
