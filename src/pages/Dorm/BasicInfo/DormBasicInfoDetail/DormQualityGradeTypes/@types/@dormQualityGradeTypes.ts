import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! APIs
export type CreateDormQualityTypesResponse = BPMS_API_RESPONSE<number>;

export type CreateDormQualityTypesRequest = {
  form: "TypeAssignment";
  data: {
    title: string;
    recordStatus: 1;
  };
};

export type UpdateDormQualityTypesResponse = BPMS_API_RESPONSE<number>;

export type UpdateDormQualityTypesRequest = {
  form: "Quality";
  id: "78af90b7fe5f485a8c1237be3bee300e";
  data: {
    title?: string;
    recordStatus?: "1" | "3";
    id: number;
  };
};
