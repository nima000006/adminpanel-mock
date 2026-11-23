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
  deactivationDate: string | undefined;
  branchId: number;
  branchName: string;
  updateDate: null;
  appliedEndDate: string;
  description: string;
  appliedStartDate: string;
  tax: number;
  createByUserId: string;
  title: string;
  toll: number;
  AssociationDormitory_title: string;
  currencyTypeId: number;
  isCostActive: number;
  appliedStartTime: string;
  createTime: string;
  id: number;
  appliedEndTime: string;
  createDate: string;
  AssociationUniversityUnit_title: string;
  AssociationCurrencyType_title: string;
};
export type GetTariffBasicInfoDetailResponse = BPMS_API_RESPONSE<
  GetTariffBasicInfoDetailData[]
>;
