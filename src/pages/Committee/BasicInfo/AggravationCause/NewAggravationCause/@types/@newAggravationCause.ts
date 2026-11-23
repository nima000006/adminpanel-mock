import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";
//! GENERAL
//! LAYOUT
//! API
export type CreateOrEditAggravationCauseResponse = BPMS_API_RESPONSE<{
  tenant_id: null;
  id: number;
  title: string;
  createDate: string;
  desc: string;
}>;
export type CreateOrEditAggravationCauseRequest = BPMS_API_REQUEST<
  string,
  {
    title: string;
    createDate: string;
    desc: string;
    id: number | null;
  }
>;
