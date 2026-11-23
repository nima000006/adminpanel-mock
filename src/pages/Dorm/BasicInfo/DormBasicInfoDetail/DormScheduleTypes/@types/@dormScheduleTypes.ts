import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type DormBasicInfoDataSourceType = {
  id: number;
  type: string;
  status: boolean;
};

//! API
export type CreateDormScheduleTypesResponse = BPMS_API_RESPONSE<number>;
export type CreateDormScheduleTypesRequest = {
  form: "SchedulingType";
  data: {
    title: string;
    recordStatus: number;
  };
};

export type UpdateDormScheduleTypesResponse = BPMS_API_RESPONSE<number>;
export type UpdateDormScheduleTypesRequest = {
  form: "SchedulingType";
  id: "7abdabb3b62744b5a905fc7a319d3751";
  data: {
    title?: string;
    id: number;
    recordStatus?: number;
  };
};
