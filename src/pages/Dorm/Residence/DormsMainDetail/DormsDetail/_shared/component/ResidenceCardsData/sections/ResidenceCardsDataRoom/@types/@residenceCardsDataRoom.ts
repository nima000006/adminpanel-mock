import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! APIs
export type GetDormResidenceRoomListTypes = {
  id: number;
  floorId: number;
  AssociationRecordStatus_title: string;
  recordStatus: number;
  AssociationGender_title: string;
  NumberOfBeds: number;
  genderId: number;
  title: string;
  AssociationFloor_AssociationBuilding_genderId: number;
  AssociationFloor_AssociationBuilding_AssociationGender_title: string;
};
export type GetDormResidenceRoomListRequest = {
  floorId_IN: number;
  maxResults: number;
  firstResult: number;
};
export type GetDormResidenceRoomListResponse = BPMS_API_RESPONSE<
  GetDormResidenceRoomListTypes[]
>;
