import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! APIs
export type DormUserRecordsList = {
  updateDate: string;
  requestTypeId: number;
  AssociationCategoryDeliverPlan_title: string;
  AssociationCategoryRequestType_title: string;
  AssociationCategoryDeliverPlan_reservationTypeId: number;
  AssociationCategoryDeliverPlan_schedulingId: number;
  updateTime: string;
  AssociationBed_AssociationCategoryDormitory_title: string;
  createTime: string;
  AssociationCategoryDeliverPlan_AssociationCategoryReservationType_title: string;
  id: number;
  AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title: string;
  AssociationCustomer_AssociationCustomerUser_nationalCode: string;
  createDate: string;
  AssociationCategoryDeliverPlan_dormitoryId: number;
  AssociationCategoryRequestType_id: number;
  AssociationCategoryDeliverPlan_priceListId: number;
  deliverPlanId: number;
  AssociationCategoryDeliverPlan_AssociationDormitory_title: string;
  AssociationBed_roomId: number;
  AssociationCustomer_AssociationUserGroup_title: string;
  cancellationRequestStatus: number;
  statusId: number;
};

export type GetDormUserRecordsListResponse = BPMS_API_RESPONSE<DormUserRecordsList[]>;

export type GetDormUserRecordsListRequests = {
  maxResults: number;
  firstResult: number;
  nationalCode: string;
  dormitory?: string;
  sortings?: string | undefined;
};
