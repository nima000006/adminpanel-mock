//! GENERAL

import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type SessionRulesStepProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};

export type GuestDataType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  StudentNumber: string;
  preliminaryMeeting: number;
  id: number;
  presence: boolean;
  agenda: number;
};
//! API
export type GetGuestsListResponse = BPMS_API_RESPONSE<
  {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    StudentNumber: string;
    preliminaryMeeting: number;
    id: number;
    presence: boolean;
    agenda: number;
  }[]
>;
export type SendSessionGuestDataRequest = BPMS_API_REQUEST<
  string,
  {
    firstName?: string;
    phoneNumber?: string;
    notificationType?: number;
    presence: boolean;
    lastName?: string;
    StudentNumber?: string;
    preliminaryMeeting: number | null;
    sentMessage?: string;
    nationalCode?: string;
    agenda?: number;
    id?: number;
  }
>;
export type SendSessionGuestDataResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
