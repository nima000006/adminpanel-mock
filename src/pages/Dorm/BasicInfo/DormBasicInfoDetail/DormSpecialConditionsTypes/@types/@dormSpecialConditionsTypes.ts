import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type DormBasicInfoDataSourceType = {
  id: number;
  type: string;
  status: boolean;
};

//! API
export type CreateDormSpecialConditionsTypesResponse = BPMS_API_RESPONSE<number>;
export type CreateDormSpecialConditionsTypesRequest = {
  form: "SpecialStatus";
  data: {
    title: string;
    recordStatus: number;
  };
};

export type UpdateDormSpecialConditionsTypesResponse = BPMS_API_RESPONSE<number>;
export type UpdateDormSpecialConditionsTypesRequest = {
  form: "SpecialStatus";
  id: "e791ccc088864511a6fc741f963473a6";
  data: {
    title?: string;
    id: number;
    recordStatus?: number;
  };
};
