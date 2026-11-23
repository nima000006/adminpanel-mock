import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//!APIs
export type CreateDormManagementTypesResponse = BPMS_API_RESPONSE<number>;

export type CreateDormManagementTypesRequest = {
  form: "ManagementType";
  data: {
    title: string;
    recordStatus: 1;
  };
};

export type UpdateDormManagementTypesResponse = BPMS_API_RESPONSE<number>;

export type UpdateDormManagementTypesRequest = {
  form: "ManagementType";
  id: "73f5330174f249d2b9828b8ec1252fa2";
  data: {
    title?: string;
    recordStatus?: "1" | "3";
    id: number;
  };
};
