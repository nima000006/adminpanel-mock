import { BPMS_API_RESPONSE } from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
//! API
export type GetGeneralPunishmentListResponse = BPMS_API_RESPONSE<
  {
    selectableAppeal: boolean;
    selectablePrimitive: boolean;
    id: number;
    title: string;
    selectableCentral: boolean;
    createDate: string;
  }[]
>;
