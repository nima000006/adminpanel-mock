import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//!LAYOUT
//! API
export type GetAbsentReasonResponse = BPMS_API_RESPONSE<
  {
    title: string;
    id: number;
  }[]
>;
export type CancellationAttendanceRequest = BPMS_API_REQUEST<
  string,
  {
    reasonAbsence: string;
    presence: boolean;
    descAbsence: string;
    id: number;
  }
>;
export type CancellationAttendanceResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
