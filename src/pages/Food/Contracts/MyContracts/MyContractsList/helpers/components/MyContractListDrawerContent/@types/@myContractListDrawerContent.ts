import { UploadFile } from "antd";

import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { FoodUploadFileResponse } from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";

//! LAYOUT
type SelectType = {
  key: string;
  value: string;
  title: string;
  name: string;
  code: number;
  item: {
    id: number;
    title: string;
  };
};

export type FormDataDrawer = {
  activeMode: boolean;
  contractTitle: string;
  vendor: SelectType;
  self: SelectType;
  contractNo: string;
  contractStart: string;
  contractEnd: string;
  vendorPercentage: string;
  providerPercentage: string;
  restaurantPercentage: string;
  contractDescription: string;
  upload: UploadFile[];
};

export type MyContractListDrawerContentProps = {
  closeDrawerHandler: () => void;
  getListData: () => void;
};

export type onUploadFileSuccess = {
  setImage: React.Dispatch<React.SetStateAction<string>>;
  response: FoodUploadFileResponse;
};

//! APIs
export type CreateNewMyContractResponse = GENERAL_RESPONSE<number>;
export type CreateNewMyContractRequest = {
  active: boolean;
  contractUUID: string;
  description: string;
  endDate: string;
  file1?: string | null;
  file2?: string | null;
  file3?: string | null;
  file4?: string | null;
  providerPercentage: number;
  restaurantId: number;
  restaurantPercentage: number;
  startedDate: string;
  title: string;
  vendorId: number;
  vendorPercentage: number;
};
