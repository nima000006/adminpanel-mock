import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { GeneralResponse } from "@pages/Business/UsersList/@types/@usersList";

//! LAYOUT
export type DetailItemType = {
  label: string;
  data?: string;
  isDate?: boolean;
  isPrice?: boolean;
  isTime?: boolean;
};

//! APIs
export type AllContractListData = {
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
};
export type GetContractDetailResponse = GENERAL_RESPONSE<AllContractListData>;

export type AllContractEditDrawerContentProps = {
  onCloseDrawer: () => void;
  refreshData: () => void;
  isDrawerOpen: boolean;
  contractData: AllContractListData | undefined;
};

export type AdminContractUpdateResponse = GeneralResponse<number>;
export type AdminContractUpdateRequest = {
  active: boolean;
  contractUUID: string;
  description: string;
  endDate: string;
  id: number;
  providerPercentage: number;
  restaurantPercentage: number;
  startedDate: string;
  title: string;
  vendorPercentage: number;
  file1: string | null;
  file2: string | null;
  file3: string | null;
  file4: string | null;
};

export type ContractEditFormType = {
  title: string;
  vendor: {
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
  self: {
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
  contractNo: string;
  contractStartDate: string;
  contractEndDate: string;
  vendorPercentage: number;
  providerPercentage: number;
  restaurantPercentage: number;
  description: string;
};
