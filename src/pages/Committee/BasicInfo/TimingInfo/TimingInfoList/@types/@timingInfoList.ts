import { BPMS_API_RESPONSE } from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
//! API
export type GetTimingInfosListResponse = BPMS_API_RESPONSE<
  {
    id: number;
    time: string;
    title: string;
    createDate: string;
    desc: string;
  }[]
>;
