//! GENERAL

import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type ExtraContentResidentsInfoDrawerPropsType = {
  closeDrawerHandler: () => void;
  id: number | undefined;
};

export type DisplacementDrawerPropsType = {
  closeDrawerHandler: () => void;
  setNewRoomIdHandler: (roomId: number) => void;
  dormId: string;
};

//! API
export type HabitantsRoomData = {
  AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title: string;
  AssociationCategoryDeliverPlan_title: string;
  AssociationBed_roomId: number;
  residenceEndDate: string;
  AssociationCustomer_AssociationStudent_AssociationGrade_title: string;
  AssociationCategoryDeliverPlan_schedulingId: number;
  AssociationCustomer_AssociationCustomerUser_lastName: string;
  AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_branchCode: number;
  AssociationCustomer_AssociationStudent_studentNumber: string;
  AssociationCustomer_AssociationUserGroup_id: number;
  AssociationCustomer_AssociationUserGroup_title: string;
  AssociationCustomer_AssociationStudent_enCode: string;
  AssociationCustomer_AssociationCustomerUser_firstName: string;
  AssociationCustomer_AssociationCustomerUser_AssociationGender_title: string;
  AssociationCustomer_AssociationStudent_fieldId: number;
  AssociationCustomer_AssociationStudent_AssociationGrade_id: number;
  id: number;
  AssociationCustomer_AssociationCustomerUser_AssociationGender_id: number;
  AssociationCustomer_AssociationStudent_fieldTitle: string;
  AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title: string;
  residenceStartDate: string;
  AssociationCustomer_AssociationCustomerUser_nationalCode: string;
};

export type GetHabitantsRoomResponse = BPMS_API_RESPONSE<HabitantsRoomData[]>;
export type GetHabitantsRoomRequest = {
  maxResults: number;
  firstResult: number;
  AssociationBed_roomId_EQ: number;
  AssociationCustomer_AssociationCustomerUser_firstName_LIKE?: string;
  AssociationCustomer_AssociationCustomerUser_lastName_LIKE?: string;
  AssociationCustomer_AssociationCustomerUser_nationalCode_LIKE?: string;
  AssociationCustomer_AssociationStudent_studentNumber_LIKE?: string;
};

export type GetHabitantNewIdAfterMovingResponse = BPMS_API_RESPONSE<
  {
    tenant_id: null;
    id: number;
    parentId: number;
  }[]
>;
export type GetHabitantNewIdAfterMovingRequest = {
  maxResults: number;
  firstResult: number;
  parentId_EQ: string;
};
