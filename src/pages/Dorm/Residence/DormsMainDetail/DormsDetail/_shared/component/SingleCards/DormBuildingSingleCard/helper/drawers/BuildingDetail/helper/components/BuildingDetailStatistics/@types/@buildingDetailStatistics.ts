import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! APIs
export type GetDormResidenceBuildingCapacityResponse = BPMS_API_RESPONSE<
  {
    AssociationCategoryDormitory_id: number;
    fullBedsInBuilding: number;
    OpenBedsInBuilding: number;
    bedCountInBuilding: number;
    id: number;
    ActiveBedsInBuilding: number;
  }[]
>;
export type GetDormResidenceBuildingCapacityRequest = {
  maxResults: number;
  firstResult: number;
  id_EQ: number;
};
