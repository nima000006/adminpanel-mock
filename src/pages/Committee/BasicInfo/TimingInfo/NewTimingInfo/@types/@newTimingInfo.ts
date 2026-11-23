import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
export type ValuesType = {
  createDate: string;
  desc: string;
  time: string;
  title: string;
};
//! LAYOUT
//! API
export type CreateOrEditTimingInfoResponse = BPMS_API_RESPONSE<{
  tenant_id: null;
  id: number;
  time: string;
  title: string;
  createDate: string;
  desc: string;
}>;
export type CreateOrEditTimingInfoRequest = BPMS_API_REQUEST<
  string,
  {
    title: string;
    time: string;
    createDate: string;
    desc: string;
    id: number | null;
  }
>;
