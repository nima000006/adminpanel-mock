import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! API
export type RelationTypeData = {
  recordStatus: number;
  id: number;
  title: string;
};
export type GetRelationTypeResponse = BPMS_API_RESPONSE<RelationTypeData[]>;
export type GetRelationTypeRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: string;
};

export type CreateDormRelationTypesResponse = BPMS_API_RESPONSE<number>;
export type CreateDormRelationTypesRequest = {
  form: "Kinship";
  data: {
    title: string;
    recordStatus: number;
  };
};

export type UpdateDormRelationTypesResponse = BPMS_API_RESPONSE<number>;
export type UpdateDormRelationTypesRequest = {
  form: "Kinship";
  id: "8fc8af7f4a694cfa9553f98c8bfa3ee7";
  data: {
    title?: string;
    id: number;
    recordStatus?: number;
  };
};
