import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! APIs
export type BedStatusTypeList = {
  recordStatus: number;
  id: number;
  title: string;
};
export type GetBedStatusTypeResponse = BPMS_API_RESPONSE<BedStatusTypeList[]>;
export type GetBedStatusTypeRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: string;
};

export type CreateDormBedStatusTypesResponse = BPMS_API_RESPONSE<number>;

export type CreateDormBedStatusTypesRequest = {
  form: "TypeAssignment";
  data: {
    title: string;
    recordStatus: 1; // when create the recordStatus must be 1 for active mode
  };
};

export type UpdateDormBedStatusTypesResponse = BPMS_API_RESPONSE<number>;

export type UpdateDormBedStatusTypesRequest = {
  form: "BedState";
  id: "fe957cfa4f1f47c3bd01b732991214de";
  data: {
    title?: string;
    id: number;
    recordStatus?: 1 | 3; // 1: active mode , 3: inactive mode
  };
};
