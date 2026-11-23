import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! APIs
export type GetDormResidenceFloorListTypes = {
  recordStatus: number;
  AssociationGender_title: string;
  genderId: number;
  NumberOfRooms: number;
  id: number;
  title: string;
  AssociationActiveStatus_title: string;
  buildingId: number;
  AssociationBuilding_genderId: number;
  AssociationBuilding_AssociationGender_title: string;
};
export type GetDormResidenceFloorListRequest = {
  buildingId_IN: string | number;
  maxResults: number;
  firstResult: number;
};

export type GetDormResidenceFloorListResponse = BPMS_API_RESPONSE<
  GetDormResidenceFloorListTypes[]
>;
