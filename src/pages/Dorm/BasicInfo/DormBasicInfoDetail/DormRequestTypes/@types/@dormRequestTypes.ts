import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type DormBasicInfoDataSourceType = {
  id: number;
  type: string;
  status: boolean;
};

//! API
export type DormRequestType = {
  id: number;
  title: string;
  recordStatus: number;
};
export type GetRequestTypeResponse = BPMS_API_RESPONSE<DormRequestType[]>;
export type GetRequestTypeRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: string;
};

export type CreateDormRequestTypesResponse = BPMS_API_RESPONSE<number>;
export type CreateDormRequestTypesRequest = {
  form: "RequestType";
  data: {
    title: string;
    recordStatus: number;
  };
};

export type UpdateDormRequestTypesResponse = BPMS_API_RESPONSE<number>;
export type UpdateDormRequestTypesRequest = {
  form: "RequestType";
  id: "9e64ea8889ae4f619a56d3bd61fbb3af";
  data: {
    title?: string;
    id: number;
    recordStatus?: number;
  };
};
