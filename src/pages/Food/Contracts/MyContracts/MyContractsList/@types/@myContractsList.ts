import { GENERAL_RESPONSE } from "../../../../../../infrastructure/models/modules/GeneralTypes/GeneralTypes";

//! LAYOUT
export type ViewClickType = {
  contractId: number;
  selfId: number;
  vendorId: number;
  title: string;
};

//!APIs
export type MyContractsListItem = {
  id: number;
  title: string;
  restaurantTitle: string;
  vendorTitle: string;
  startedDate: string;
  endDate: string;
  active: boolean;
  restaurantId: number;
  vendorId: number;
};

export type GetMyContractsListResponse = GENERAL_RESPONSE<{
  contractDtoList: MyContractsListItem[];
  totalElements: number;
}>;

export type GetMyContractsListRequest = {
  pageNo: number;
  pageSize: number;
};

export type GetMyContractsListWithFilterRequestType = {
  active?: "true" | "false";
  contractTitle?: string;
  contractUUID?: string;
  pageNo?: number;
  pageSize?: number;
  restaurantId?: number;
  vendorId?: number;
  branchCode?: number;
};

export type UseContactListAdvanceFilterFormType = {
  restaurantId: SelectTypes[] | [];
  vendorId: SelectTypes[] | [];
};
type SelectTypes = {
  label: string;
  value: string;
  key: number;
  code: number;
  children: string;
  item: {
    id: number;
    title: string;
  };
};
