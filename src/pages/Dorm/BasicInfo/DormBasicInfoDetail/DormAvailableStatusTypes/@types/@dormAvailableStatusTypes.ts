import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! APIs
export type StatusEntityTypeList = {
  recordStatus: number;
  id: number;
  title: string;
};

export type GetStatusEntityTypeResponse = BPMS_API_RESPONSE<StatusEntityTypeList[]>;
export type GetStatusEntityTypeRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: string;
};

export type CreateDormStatusEntityTypesResponse = BPMS_API_RESPONSE<number>;

export type CreateDormStatusEntityTypesRequest = {
  form: "StatusEntityForm";
  data: {
    title: string;
    recordStatus: 1; // when create the recordStatus must be 1
  };
};

export type UpdateDormStatusEntityTypesResponse = BPMS_API_RESPONSE<number>;

export type UpdateDormStatusEntityTypesRequest = {
  form: "StatusEntityForm";
  id: "27b17724b9d34ba6a631d1a0086f2624";
  data: {
    title?: string;
    id: number;
    recordStatus?: 1 | 3; // 1: active , 3: inactive
  };
};
