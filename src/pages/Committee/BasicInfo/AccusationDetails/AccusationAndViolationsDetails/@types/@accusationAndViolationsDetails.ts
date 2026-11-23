import { BPMS_API_RESPONSE } from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";
//! GENERAL
//! LAYOUT
//! ALI
export type GetAccusationAndViolationsDetailsListResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
    AssociationViiolation_title: string;
    createDate: string;
  }[]
>;
