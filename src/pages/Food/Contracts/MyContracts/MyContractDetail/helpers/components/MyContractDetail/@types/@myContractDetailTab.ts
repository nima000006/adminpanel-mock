import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

//! LAYOUT
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
  file1: string;
  file2: string;
  file3: string;
  file4: string;
  file1Title: string;
  file2Title: string;
  file3Title: string;
  file4Title: string;
}>;
