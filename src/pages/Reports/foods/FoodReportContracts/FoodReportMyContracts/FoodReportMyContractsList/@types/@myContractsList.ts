import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

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
