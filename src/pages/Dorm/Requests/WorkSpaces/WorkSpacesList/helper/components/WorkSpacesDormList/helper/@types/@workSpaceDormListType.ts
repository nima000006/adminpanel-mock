import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! API
export type WorkSpaceDormListType = {
  tenant_id: null;
  adminReviewDate: string;
  descriptionRequest: string;
  descRequest?: string;
  AssociationStatus_title: string;
  requestTypeId: number;
  createByUserId: string;
  AssociationUser_AssociationCustomerUser_lastName: string;
  reviewDeactivationDate: string;
  AssociationUser_AssociationCustomerUser_firstName: string;
  statusId: number;
  AssociationRequestType_title: string;
  AssociationCategoryStatus_title: string;
  createTime: string;
  id: number;
  AssociationUser_AssociationStudent_AssociationCategoryBranchid_title: string;
  createDate: string;
  updateDate: string;
  updateTime: string;
  descriptionAdmin?: string;
  AssociationUserStaffNew_AssociationCustomerUser_firstName: string;
  AssociationUserStaffNew_AssociationCustomerUser_lastName: string;
  AssociationBranchid_AssociationCategoryRegion_title: string;
};
export type GetWorkSpaceDormListResponse = BPMS_API_RESPONSE<WorkSpaceDormListType[]>;
export type GetWorkSpaceDormListRequests = {
  maxResults: number;
  firstResult: number;
  branchId?: string;
  requestTypeId?: string;
  statusId?: string;
  waitingTimeId?: { queryParam: string; value: string };
  provinceId?: string;
  cityId?: string;
  name?: string;
  lastName?: string;
  dormitory?: string;
  sortings?: string | undefined;
};

export type GetWorkSpaceDormListCountRequests = {
  branchId?: string;
  requestTypeId?: string;
  statusId?: string;
  waitingTimeId?: { queryParam: string; value: string };
  provinceId?: string;
  cityId?: string;
  name?: string;
  lastName?: string;
  dormitory?: string;
  sortings?: string | undefined;
};
