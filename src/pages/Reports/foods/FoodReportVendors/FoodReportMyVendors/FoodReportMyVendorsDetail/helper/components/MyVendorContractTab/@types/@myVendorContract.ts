import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

//! LAYOUT
export type ContractDtoList = {
  id: number;
  title: string;
  description: string;
  restaurantTitle: string;
  vendorTitle: null;
  createdDate: string;
  modifiedDate: string;
  restaurantId: number;
  vendorId: number;
  startedDate: string;
  endDate: string;
  providerPercentage: number;
  vendorPercentage: number;
  restaurantPercentage: number;
  active: boolean;
  status: null;
  contractUUID: string;
  deleted: boolean;
};

//! API
export type GetMyVendorContractListResponse = GENERAL_RESPONSE<{
  contractDtoList: ContractDtoList[];
}>;
