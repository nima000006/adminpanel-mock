import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! API
export type WorkSpaceTariffListType = {
  tenant_id: null;
  adminReviewDate: string;
  descRequest: string;
  descriptionRequest?: string;
  AssociationStatus_title: string;
  AssociationCategoryStatus_title: string;
  requestTypeId: number;
  createByUserId: string;
  AssociationUser_AssociationCustomerUser_lastName: string;
  reviewDeactivationDate: string;
  AssociationUser_AssociationCustomerUser_firstName: string;
  statusId: number;
  AssociationRequestType_title: string;
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
export type GetWorkSpaceTariffResponse = BPMS_API_RESPONSE<WorkSpaceTariffListType[]>;
export type GetWorkSpaceTariffRequests = {
  maxResults: number;
  firstResult: number;
  branchId?: string;
  requestTypeId?: string;
  statusId?: string;
  waitingTimeId?: { queryParam: string; value: string };
  provinceId: string;
  cityId: string;
  dormitory?: string;
  sortings?: string | undefined;
  name?: string;
  lastName?: string;
};

export type GetWorkSpaceTariffCountRequests = {
  branchId?: string;
  requestTypeId?: string;
  statusId?: string;
  waitingTimeId?: { queryParam: string; value: string };
  provinceId: string;
  cityId: string;
  dormitory?: string;
  sortings?: string | undefined;
  name?: string;
  lastName?: string;
};
