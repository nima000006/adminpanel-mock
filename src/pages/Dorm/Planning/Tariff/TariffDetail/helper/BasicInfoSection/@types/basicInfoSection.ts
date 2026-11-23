import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
export type CreateInActiveTariffFormData = { id: string; description: string };
//! API
export type GetConnectionWithTariffData = {
  AssociationPriceList_RecordStatus: number;
  priceListId: number;
  id: number;
  AssociationPriceList_appliedEndDate: string;
};
export type GetConnectionWithTariffResponse = BPMS_API_RESPONSE<
  GetConnectionWithTariffData[]
>;
export type GetConnectionWithTariffRequest = {
  maxResults: number;
  firstResult: number;
  priceListId_EQ: string;
};
export type CreateInActiveTariffRequest = {
  form: string;
  data: {
    id: string;
    descDeactivateRequest: string;
  };
};
export type CreateInActiveTariffResponse = BPMS_API_RESPONSE<null>;
