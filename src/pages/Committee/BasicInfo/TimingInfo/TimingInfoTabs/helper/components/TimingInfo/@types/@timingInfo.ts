import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT

//! API
export type GetTimingInfoDetailResponse = BPMS_API_RESPONSE<
  {
    id: number;
    time: string;
    title: string;
    createDate: string;
    desc: string;
  }[]
>;
