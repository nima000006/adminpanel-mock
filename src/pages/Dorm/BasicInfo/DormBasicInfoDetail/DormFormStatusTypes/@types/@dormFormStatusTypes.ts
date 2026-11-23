import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! API
export type DormStatusTypes = {
  recordStatus: number;
  id: number;
  title: string;
};
export type GetDormStatusTypesResponse = BPMS_API_RESPONSE<DormStatusTypes[]>;
export type GetDormStatusTypesRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: string;
};

export type CreateDormStatusTypesResponse = BPMS_API_RESPONSE<number>;
export type CreateDormStatusTypesRequest = {
  form: "TypeAssignment";
  data: {
    title: string;
    recordStatus: number;
  };
};

export type UpdateDormStatusTypesResponse = BPMS_API_RESPONSE<number>;

export type UpdateDormStatusTypesRequest = {
  form: "Status";
  id: "34158107112c4f08bc0cdb57770194a5";
  data: {
    title?: string;
    id: number;
    recordStatus?: number;
  };
};
