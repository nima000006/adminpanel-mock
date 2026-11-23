import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
//! API
export type GetReportAdditionalPunishmentDetailResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
    createDate: string;
    desc: string;
  }[]
>;
export type CreateOrEditSupplementaryPunishmentResponse = BPMS_API_RESPONSE<{
  tenant_id: null;
  id: number;
  title: string;
  createDate: string;
  desc: string;
}>;
export type CreateOrEditSupplementaryPunishmentRequest = BPMS_API_REQUEST<
  string,
  {
    title: string;
    createDate: string;
    desc: string;
    id: number | null;
  }
>;
export type BasicInfoNewSupplementaryPunishmentSubmitType = {
  title: string;
  createDate: string;
  desc: string;
};
