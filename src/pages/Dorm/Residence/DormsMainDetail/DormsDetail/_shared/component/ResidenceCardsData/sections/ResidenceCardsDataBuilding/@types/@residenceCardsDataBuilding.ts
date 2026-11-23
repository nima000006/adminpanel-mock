import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! APIs
export type GetDormResidenceBuildingListTypes = {
  recordStatus: number;
  AssociationGender_title: string;
  genderId: number;
  dormitoryId: number;
  id: number;
  title: string;
  NumberOfFloors: number;
  AssociationActiveStatus_title: string;
};

export type GetDormResidenceBuildingListRequest = {
  dormitoryId_IN: number;
  firstResult: number;
  maxResults: number;
};
export type GetDormResidenceBuildingListResponse = BPMS_API_RESPONSE<
  GetDormResidenceBuildingListTypes[]
>;
