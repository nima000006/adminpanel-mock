import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
//! API
export type CreateOrEditGeneralPunishmentResponse = BPMS_API_RESPONSE<{
  tenant_id: null;
  selectableAppeal: boolean;
  description: string;
  selectablePrimitive: boolean;
  id: number;
  title: string;
  selectableCentral: boolean;
  createDate: string;
}>;
export type CreateOrEditGeneralPunishmentRequest = BPMS_API_REQUEST<
  string,
  {
    title: string;
    createDate: string;
    selectablePrimitive: boolean;
    selectableAppeal: boolean;
    selectableCentral: boolean;
    description: string;
    id: number | null;
  }
>;
