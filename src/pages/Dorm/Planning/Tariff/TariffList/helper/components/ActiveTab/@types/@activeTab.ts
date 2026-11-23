import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";
//! GENERAL
//! LAYOUT
export type TariffListTabProps = {
  type: 1 | 3 | 4;
};
//! API
export type GetTariffListRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ: number;
  title_LIKE?: string;
  AssociationDormitory_title_LIKE?: string;
  sortings?: string;
  AssociationBranchid_AssociationCategoryRegion_parentId_IN?: string;
  AssociationBranchid_regionId_IN?: string;
  branchId_IN?: string;
  dormitoryId_IN?: string;
};

export type GetTariffListData = {
  appliedEndDate: string;
  appliedStartDate: string;
  requestTypeId: number;
  createByUserId: string;
  title: string;
  AssociationDormitory_title: string;
  appliedStartTime: string;
  recordStatus: number;
  statusId: number;
  AssociationRequestType_title: string;
  createTime: string;
  id: number;
  appliedEndTime: string;
  createDate: string;
  priceListId: number;
  AssociationUserStaffNew_AssociationCustomerUser_firstName: string;
  AssociationUserStaffNew_AssociationCustomerUser_lastName: string;
};
export type GetTariffListResponse = BPMS_API_RESPONSE<GetTariffListData[]>;

export type CountDormResponse = {
  data: number;
  msg: string;
  status: number;
};
export type GetTariffAdmissionScheduleTabCountRequest = {
  priceListId_EQ: number;
  title_LIKE?: string;
};
