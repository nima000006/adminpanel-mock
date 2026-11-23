import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! APIs
export type GetDormResidenceFloorCapacityResponse = BPMS_API_RESPONSE<
  {
    AssociationBuilding_id: number;
    bedCountInFloor: number;
    id: number;
    ActiveBedsInFloor: number;
    fullBedsInFloor: number;
    OpenBedsInFloor: number;
  }[]
>;
export type GetDormResidenceFloorCapacityRequest = {
  maxResults: number;
  firstResult: number;
  id_EQ: number;
};
