import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

export type MyVendorContractsContentProps = {
  id: number;
  closeDrawerHandler: () => void;
};
//! APIs
export type GetMyContractDetailResponse = GENERAL_RESPONSE<{
  id: number;
  title: string;
  description: string;
  restaurantTitle: string;
  vendorTitle: string;
  createdDate: string;
  modifiedDate: string;
  restaurantId: number;
  vendorId: number;
  startedDate: string;
  endDate: string;
  providerPercentage: number;
  vendorPercentage: number;
  restaurantPercentage: number;
  active: true;
  status: number;
  deleted: null;
  contractUUID: string;
}>;
