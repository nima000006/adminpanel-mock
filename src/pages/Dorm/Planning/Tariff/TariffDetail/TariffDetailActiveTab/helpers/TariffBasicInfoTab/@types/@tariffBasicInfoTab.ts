import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";
//! GENERAL
//! LAYOUT
export type DetailItemType = {
  label: string;
  data?: string;
  isDate?: boolean;
  isPrice?: boolean;
  isTime?: boolean;
};

//!APIS
export type GetTariffBasicInfoDetailData = {
  deactivationDate: string;
  appliedEndDate: string;
  description: string;
  appliedStartDate: string;
  tax: number;
  createByUserId: string;
  title: string;
  toll: number;
  AssociationCurrencyId_title: string;
  AssociationDormitory_title: string;
  appliedStartTime: string;
  recordStatus: number;
  createTime: string;
  id: number;
  appliedEndTime: string;
  AssociationBranchid_title: string;
  createDate: string;
  AssociationCategoryRecordStatus_title: string;
  AssociationUserStaffNew_AssociationCustomerUser_firstName: string;
  AssociationUserStaffNew_AssociationCustomerUser_lastName: string;
};
export type GetTariffBasicInfoCopyDetailResponse = BPMS_API_RESPONSE<
  GetTariffBasicInfoDetailData[]
>;
export type GetTariffBasicInfoCopyDetailRequest = {
  id_EQ: number;
  firstResult?: number;
  maxResults?: number;
};
