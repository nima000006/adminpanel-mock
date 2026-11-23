import { BPMS_API_RESPONSE } from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";
//! GENERAL
//! LAYOUT
export type stepItemProp = {
  date: string;
  generalDate: string;
  desc: string;
  label: string;
};
//!API
export type GetStudentDefenseTabResponse = BPMS_API_RESPONSE<
  {
    date: string;
    generalDate: string;
    desc: string;
    label: string;
  }[]
>;
export type GetStudentDefenseTabRequest = {
  maxResults: number | string;
  id: number | string;
};
export type GetStudentDefenseTabRawResponse = {
  defenseText: string;
  centralDefenseText: string;
  defenseRegistrationDate: string;
  dateCentralReferralForDefense: string;
  appealDefenseText: string;
  centralDefenseRegistrationDate: string;
  dateAppealReferralForDefense: string;
  dateReferralForDefense: string;
  id: number;
  appealDefenseRegistrationDate: string;
};
