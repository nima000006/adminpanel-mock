import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type DormBasicInfoDataSourceType = {
  id: number;
  type: string;
  status: boolean;
};

//! API
export type CreateDormUserGroupTypesResponse = BPMS_API_RESPONSE<number>;
export type CreateDormUserGroupTypesRequest = {
  form: "UserGroup";
  data: {
    title: string;
    recordStatus: number;
  };
};

export type UpdateDormUserGroupTypesResponse = BPMS_API_RESPONSE<number>;
export type UpdateDormUserGroupTypesRequest = {
  form: "UserGroup";
  id: "30bc5ceedca24261a0d07ddf8e657d8f";
  data: {
    title?: string;
    id: number;
    recordStatus?: number;
  };
};
