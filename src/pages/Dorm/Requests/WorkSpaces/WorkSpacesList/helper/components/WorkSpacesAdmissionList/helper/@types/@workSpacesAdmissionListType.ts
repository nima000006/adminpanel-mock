import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! API
export type WorkSpaceAdmissionListType = {
  tenant_id: null;
  adminReviewDate: string;
  descriptionRequest: string;
  AssociationStatus_title: string;
  requestTypeId: number;
  createByUserId: string;
  AssociationUser_AssociationCustomerUser_lastName: string;
  reviewDeactivationDate: string;
  AssociationUser_AssociationCustomerUser_firstName: string;
  statusId: number;
  AssociationRequestType_title: string;
  AssociationCategoryStatus_title: string;
  descRequest: string;
  descriptionAdmin: string;
  createTime: string;
  id: number;
  AssociationUser_AssociationStudent_AssociationCategoryBranchid_title: string;
  createDate: string;
  updateDate: string;
  updateTime: string;
  AssociationUserStaffNew_AssociationCustomerUser_firstName: string;
  AssociationUserStaffNew_AssociationCustomerUser_lastName: string;
  AssociationBranchid_AssociationCategoryRegion_title: string;
};
export type GetWorkSpaceAdmissionResponse = BPMS_API_RESPONSE<
  WorkSpaceAdmissionListType[]
>;
export type GetWorkSpaceAdmissionRequests = {
  maxResults: number;
  firstResult: number;
  branchId?: string;
  requestTypeId?: string;
  statusId?: string;
  waitingTimeId?: { queryParam: string; value: string };
  provinceId?: string;
  cityId?: string;
  dormitory?: string;
  lastName?: string;
  name?: string;
  sortings?: string | undefined;
};

export type GetWorkSpaceAdmissionCountRequests = {
  branchId?: string;
  requestTypeId?: string;
  statusId?: string;
  waitingTimeId?: { queryParam: string; value: string };
  provinceId?: string;
  cityId?: string;
  dormitory?: string;
  lastName?: string;
  name?: string;
  sortings?: string | undefined;
};
