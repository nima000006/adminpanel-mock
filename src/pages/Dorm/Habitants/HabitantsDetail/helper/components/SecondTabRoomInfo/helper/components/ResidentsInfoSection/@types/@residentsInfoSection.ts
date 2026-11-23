import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type HabitantResidenceInfoData = {
  AssociationBed_AssociationCategoryFloor_title: string;
  AssociationBed_AssociationCategorRoom_AssociationGender_title: string;
  AssociationBed_AssociationCategoryBuliding_title: string;
  AssociationCategoryDeliverPlan_AssociationDormitory_title: string;
  AssociationBed_AssociationCategoryDormitory_title: string;
  AssociationBed_AssociationCategorRoom_title: string;
  CountActiveBeds: number;
  id: number;
  AssociationBed_AssociationCategorRoom_numberStandardBedInRoom: number;
  AssociationBed_roomId: number;
  CountOpenBeds: number;
  AssociationBed_title: string;
};

export type GetHabitantResidenceInfoResponse = BPMS_API_RESPONSE<
  HabitantResidenceInfoData[]
>;
export type GetHabitantResidenceInfoRequest = {
  maxResults: number;
  firstResult: number;
  id_EQ: number;
};
