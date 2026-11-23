import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! API
export type GetAdmissionListRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: 1 | 3 | 4;
  priceListId_EQ?: number;
  branchId_IN?: string;
  dormitoryId_IN?: string;
  schedulingId_IN?: string;
  reservationTypeId_IN?: string;
  managementTypeId_IN?: string;
  AssociationDeliverPlanPaymetMethod_paymentMethodId_IN?: string;
  AssociationCategoryBranch_AssociationCategoryRegion_parentId_IN?: string;
  AssociationCategoryBranch_regionId_IN?: string;
  title_LIKE?: string;
  AssociationDormitory_title_LIKE?: string;
  sortings?: string | undefined;
};

export type GetAdmissionAwaitingReviewListRequest = {
  maxResults: number;
  firstResult: number;
  statusId_EQ?: 1 | 3 | 4;
  branchId_IN?: string;
  dormitoryId_IN?: string;
  requestTypeId_IN?: string;
  reservationTypeId_IN?: string;
  waitingTimeId?: { queryParam: string; value: string };
  title_LIKE?: string;
  AssociationDormitory_title_LIKE?: string;
  AssociationCategoryBranch_AssociationCategoryRegion_parentId_IN?: string;
  AssociationCategoryBranch_regionId_IN?: string;
  sortings?: string;
};

export type GetAdmissionAwaitingReviewListCountRequest = {
  statusId_EQ?: 1 | 3 | 4;
  branchId_IN?: string;
  dormitoryId_IN?: string;
  requestTypeId_IN?: string;
  reservationTypeId_IN?: string;
  waitingTimeId?: { queryParam: string; value: string };
  title_LIKE?: string;
  AssociationDormitory_title_LIKE?: string;
  sortings?: string;
  AssociationCategoryBranch_AssociationCategoryRegion_parentId_IN?: string;
  AssociationCategoryBranch_regionId_IN?: string;
};

export type GetAdmissionListCountRequest = {
  recordStatus_EQ?: number;
  priceId?: number;
  branchId_IN?: string;
  dormitoryId_IN?: string;
  schedulingId_IN?: string;
  reservationTypeId_IN?: string;
  managementTypeId_IN?: string;
  AssociationDeliverPlanPaymetMethod_paymentMethodId_IN?: string;
  AssociationCategoryBranch_AssociationCategoryRegion_parentId_IN?: string;
  AssociationCategoryBranch_regionId_IN?: string;
  title_LIKE?: string;
  AssociationDormitory_title_LIKE?: string;
  sortings?: string | undefined;
};

export type AdmissionListData = {
  branchId: number;
  title_AssociationCategoryBranch: string;
  reservationTypeId: number;
  appliedEndDate: string;
  schedulingId: number;
  appliedStartDate: string;
  managementTypeId: number;
  title: string;
  AssociationDormitory_title: string;
  appliedStartTime: string;
  createTime: string;
  id: number;
  priceListId: number;
  appliedEndTime: string;
  createDate: string;
  requestType: number;
  AssociationCategoryReservationType_title: string;
};

export type GetAdmissionListResponse = BPMS_API_RESPONSE<AdmissionListData[]>;
