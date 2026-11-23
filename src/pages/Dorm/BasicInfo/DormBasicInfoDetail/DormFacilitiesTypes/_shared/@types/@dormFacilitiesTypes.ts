import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! API
export type CreateDormFacilitiesTypeResponse = BPMS_API_RESPONSE<number>;
export type CreateDormFacilitiesTypeRequest = {
  form: "FacilityList";
  data: {
    title: string;
    facilityTypeId: number;
    unit: string;
    recordStatus: number;
    IsOptional: number;
  };
};

export type UpdateDormFacilitiesResponse = BPMS_API_RESPONSE<number>;
export type UpdateDormFacilitiesRequest = {
  form: "FacilityList";
  id: "500905ef63174e7d8f54ff4c3ea7c526";
  data: {
    title?: string;
    recordStatus?: number;
    unit?: string;
    facilityTypeId: number;
    id: number;
    IsOptional?: number;
  };
};
