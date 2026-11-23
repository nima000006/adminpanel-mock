import { GENERAL_RESPONSE } from "../../../../../../infrastructure/models/modules/GeneralTypes/GeneralTypes";

//! LAYOUT
export type ViewClickType = {
  contractId: number;
  selfId: number;
  vendorId: number;
  title: string;
};

//!APIs
export type AllContractsListItem = {
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

export type GetAllContractsListResponse = GENERAL_RESPONSE<{
  contractDtoList: AllContractsListItem[];
  totalElements: number;
}>;

export type GetAllContractsListRequest = {
  pageNo: number;
  pageSize: number;
};

export type CreateCopyContractResponse = {
  id: string;
};
