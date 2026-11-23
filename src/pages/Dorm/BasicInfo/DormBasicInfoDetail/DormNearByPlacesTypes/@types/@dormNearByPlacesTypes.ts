import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! API
export type CreateDormNearByPlacesTypeResponse = BPMS_API_RESPONSE<number>;
export type CreateDormNearByPlacesTypesRequest = {
  form: "PlacesAroundDormitory";
  data: {
    title: string;
    recordStatus: number;
  };
};

export type UpdateDormNearByPlacesTypesResponse = BPMS_API_RESPONSE<number>;
export type UpdateDormNearByPlacesTypesRequest = {
  form: "PlacesAroundDormitory";
  id: "dc566d78f8304a14a11ffcb52d05d4e7";
  data: {
    title?: string;
    id: number;
    recordStatus?: number;
  };
};
