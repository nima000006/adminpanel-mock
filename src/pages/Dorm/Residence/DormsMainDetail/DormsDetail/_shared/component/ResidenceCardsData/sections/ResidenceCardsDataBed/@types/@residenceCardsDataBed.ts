import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! APIs
export type GetDormResidenceBedListTypes = {
  id: number;
  recordStatus: number;
  AssociationCategoryRecordStatus_title: string;
  AssociationCategoryBedType_title: string;
  title: string;
  bedNumber: number;
  qualityId: number;
  AssociationCategorRoom_numberStandardBedInRoom: number;
  roomId: number;
};
export type GetDormResidenceBedListRequest = {
  roomId_EQ: number;
  maxResults: number;
  firstResult: number;
};
export type GetDormResidenceBedListResponse = BPMS_API_RESPONSE<
  GetDormResidenceBedListTypes[]
>;

export type GetRoomCapacityResponse = BPMS_API_RESPONSE<
  {
    tenant_id: null;
    mainOrExtra: number;
    id: number;
  }[]
>;
export type GetRoomCapacityRequest = {
  id_EQ: number;
  firstResult: number;
  maxResults: number;
};
