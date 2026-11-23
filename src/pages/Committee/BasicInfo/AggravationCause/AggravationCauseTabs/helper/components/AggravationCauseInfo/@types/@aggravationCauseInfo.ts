import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";
//! GENERAL
//! LAYOUT
//! API
export type GetAggravationDetailResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
    createDate: string;
    desc: string;
  }[]
>;
