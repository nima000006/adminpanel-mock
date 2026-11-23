import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//!API
export type GetAccusationDetailResponse = BPMS_API_RESPONSE<{
  sourceId: number;
  tenant_id: null;
  id: number;
  title: string;
  AssociationRegulation: {
    date: string;
    tenant_id: null;
    number: string;
    lastModifiedDate: string;
    id: number;
    attach: null;
    title: string;
  };
  createDate: string;
  desc: string;
}>;
export type GetAccusationDetailRequest = {
  _data_: {
    id: string;
  };
};
