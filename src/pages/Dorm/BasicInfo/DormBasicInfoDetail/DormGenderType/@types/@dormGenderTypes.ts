import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! APIs
export type CreateDormGenderTypesResponse = BPMS_API_RESPONSE<number>;

export type CreateDormGenderTypesRequest = {
  form: "TypeAssignment";
  data: {
    title: string;
    recordStatus: number;
  };
};

export type UpdateDormGenderTypesResponse = BPMS_API_RESPONSE<number>;

export type UpdateDormGenderTypesRequest = {
  form: "Gender";
  id: "257320b489ce4607bc77bafd4e12d6b3";
  data: {
    title?: string;
    recordStatus?: string;
    id: number;
  };
};
