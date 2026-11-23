import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! API
export type CreateDormResidenceTypeResponse = BPMS_API_RESPONSE<number>;
export type CreateDormResidenceTypesRequest = {
  form: "TypeAssignment";
  data: {
    title: string;
    recordStatus: number;
  };
};

export type UpdateDormResidenceTypesResponse = BPMS_API_RESPONSE<number>;
export type UpdateDormResidenceTypesRequest = {
  form: "AccommodationType";
  id: "180754945a6c443e8e61d446f62dba4f";
  data: {
    title?: string;
    id: number;
    recordStatus?: number;
  };
};
