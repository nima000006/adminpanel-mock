//! GENERAL

import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type ReviewTabProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};
export type UserInfoType = {
  respondentOrganization: string;
  inquirerOrganization: string;
  inquirerPost: string;
  inquirerLastName: string;
  respondentLastName: string;
  inquirerDateRequest: string;
  inquirerFirstName: string;
  id: number;
  respondentFirstName: string;
  inquirerNumber: string;
  respondentPost: string;
};
//! API
export type FinalRequestConfirmationResponse = BPMS_API_RESPONSE<{ id: number }>;
export type FinalRequestConfirmationRequest = BPMS_API_REQUEST<
  string,
  {
    id: number;
    dateFinalAnswer: string;
    status: 3;
  }
>;
