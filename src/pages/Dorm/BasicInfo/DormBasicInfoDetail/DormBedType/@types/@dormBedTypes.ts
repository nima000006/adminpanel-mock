import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! APIs
export type CreateDormBedTypesResponse = BPMS_API_RESPONSE<number>;

export type CreateDormBedTypesRequest = {
  form: "TypeAssignment";
  data: {
    title: string;
    recordStatus: number;
  };
};

export type UpdateDormBedTypesResponse = BPMS_API_RESPONSE<number>;

export type UpdateDormBedTypesRequest = {
  form: "BedType";
  id: "8d82d16ff3914062a017c959f6bd58ab";
  data: {
    recordStatus?: number;
    title?: string;
    id: number;
  };
};
