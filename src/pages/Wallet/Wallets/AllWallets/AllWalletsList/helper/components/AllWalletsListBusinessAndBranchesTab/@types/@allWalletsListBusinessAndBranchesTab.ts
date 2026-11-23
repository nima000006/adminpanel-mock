//!LAYOUTs
export type WalletsListBusinessAndBranchesByAdvanceFilterRequest = {
  businessId?: string;
  branchId?: string;
  samimServices?: string;
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

export type UseAllWalletsListBusinessAndBranchesAdvanceFilterFormType = {
  businessId: SelectTypes;
  branch: SelectTypes;
  serviceName: SelectTypes[];
};

//! APIs
export type BusinessAndBranchesWalletsRecordDataType = {
  uuid: string;
  branchCode: null;
  branchName: string;
  description: string;
  walletStatus: {
    walletStatusId: number;
    walletStatusTitle: string;
  };
  walletType: {
    walletTypeId: number;
    walletTypeTitle: string;
  };
  allServices: boolean;
  services: {
    serviceId: number;
    serviceName: string;
  }[];
  walletGroup: {
    walletGroupId: number;
    walletGroupTitle: string;
  };
  balance: {
    totalAmount: number;
    currency: string;
    moneyType: string;
  };
  firstName: string;
  lastName: string;
  username: string;
  businessTitle: string;
  businessId: null;
  createdDate: string;
  modifiedDate: string;
};

export type GetBusinessAndBranchesWalletsListResponse = {
  content: BusinessAndBranchesWalletsRecordDataType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetBusinessAndBranchesWalletsListByAdvanceFilterRequest = {
  pageNo: number;
  pageSize: number;
  businessId?: string;
  branchId?: string;
  samimServices?: string;
};
