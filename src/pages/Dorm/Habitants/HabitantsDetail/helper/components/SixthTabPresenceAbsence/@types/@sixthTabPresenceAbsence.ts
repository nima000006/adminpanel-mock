import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! Api
export type CalendarPresenceAbsenceResponseData = {
  requestDormitoryId: number;
  AssociationPresenceAbsence_title: string;
  PresenceAbsenceId: number;
  id: number;
  date: string;
};
export type CalendarAbsence = CalendarPresenceAbsenceResponseData[];
export type GetCalendarPresenceAbsenceResponse = BPMS_API_RESPONSE<CalendarAbsence>;
export type GetCalendarPresenceAbsenceRequest = {
  maxResults: number;
  firstResult: number;
  requestDormitoryId_EQ: number;
  date_BTW: string | string[];
};

export type SendAbsencePresenceDrawerRequest = {
  form: "EnterAttendance";
  data: {
    PresenceAbsenceId: string;
    description: string;
    userNationalcode: string;
    requestDormitoryId: string;
    date: string | undefined;
    id: number;
  };
};
export type SendAbsencePresenceDrawerResponse = BPMS_API_RESPONSE<null>;
