//! GENERAL
//! LAYOUT

import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! API
export type GetGeneralPunishmentDetailResponse = BPMS_API_RESPONSE<
  {
    id: number;
    selectableAppeal: boolean;
    selectablePrimitive: boolean;
    description: string;
    title: string;
    selectableCentral: boolean;
    createDate: string;
  }[]
>;
