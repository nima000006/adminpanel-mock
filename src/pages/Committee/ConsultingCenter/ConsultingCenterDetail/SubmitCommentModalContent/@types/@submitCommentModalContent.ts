import { BPMS_API_RESPONSE } from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
//! API
export type GetOpinionRegisterCommentResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
