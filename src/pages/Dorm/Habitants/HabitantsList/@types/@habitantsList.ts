import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! APIs
export type HabitantsListData = {
  AssociationBed_dormitoryid: number;
  AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title: string;
  AssociationCustomer_userGroupID: number;
  residenceEndDate: string;
  AssociationCustomer_AssociationStudent_AssociationGrade_title: string;
  AssociationCustomer_AssociationCustomerUser_lastName: string;
  AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_id: number;
  AssociationBed_buildingid: number;
  AssociationBed_AssociationCategoryDormitory_title: string;
  AssociationCustomer_AssociationCustomerUser_AssociationGender_title: string;
  AssociationBed_AssociationCategoryBuliding_title: string;
  AssociationCustomer_AssociationStudent_fieldId: number;
  id: number;
  AssociationBed_floorId: number;
  AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title: string;
  residenceStartDate: string;
  AssociationCustomer_AssociationCustomerUser_nationalCode: string;
  AssociationCustomer_AssociationCustomerUser_genderId: number;
  AssociationCustomer_AssociationStudent_gradeId: number;
  AssociationBed_roomId: number;
  AssociationCategoryDeliverPlan_schedulingId: number;
  AssociationCustomer_AssociationStudent_studentNumber: string;
  AssociationCustomer_AssociationUserGroup_title: string;
  AssociationCustomer_AssociationStudent_enCode: string;
  AssociationBed_AssociationCategoryFloor_title: string;
  AssociationCustomer_AssociationCustomerUser_firstName: string;
  AssociationBed_AssociationCategorRoom_title: string;
  AssociationCustomer_AssociationStudent_fieldTitle: string;
  AssociationCategoryDeliverPlan_priceListId: number;
  deliverPlanId: number;
  AssociationBed_title: string;
};

export type GetHabitantsListResponse = BPMS_API_RESPONSE<HabitantsListData[]>;

export type GetHabitantsListRequest = {
  maxResults: number;
  firstResult: number;
  AssociationCustomer_AssociationCustomerUser_genderId_IN?: string;
  AssociationCustomer_userGroupID_IN?: string;
  AssociationCategoryDeliverPlan_branchId?: string;
  AssociationBed_dormitoryid_IN?: string;
  AssociationCustomer_AssociationStudent_gradeId_IN?: string;
  AssociationCategoryDeliverPlan_schedulingId_IN?: string;
  AssociationCustomer_AssociationCustomerUser_firstName_IN?: string;
  AssociationCustomer_AssociationCustomerUser_lastName_IN?: string;
  AssociationCustomer_AssociationStudent_studentNumber_IN?: string;
  AssociationCategoryDeliverPlan_AssociationCategoryBranch_AssociationCategoryRegion_parentId_IN?: string;
  AssociationCategoryDeliverPlan_AssociationCategoryBranch_regionId_IN?: string;
  AssociationBed_buildingid_IN?: string;
  AssociationBed_floorId_IN?: string;
  AssociationBed_roomId_IN?: string;
  sortings?: string | undefined;
};

export type GetHabitantsListCountRequest = Omit<
  GetHabitantsListRequest,
  "maxResults" | "firstResult"
>;

//! LAYOUTs
export type HabitantsRejectDrawerDataTypes = {
  isOpen: boolean;
  data: null | HabitantsListData;
};
