//! LAYOUTs
export type WalletsListUsersByAdvanceFilterRequest = {
  username?: string;
  firstName?: string;
  lastName?: string;
};

//!APIs
export type PersonalWalletsRecordDataType = {
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
  services: [];
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

export type GetPersonalWalletsListResponse = {
  content: PersonalWalletsRecordDataType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetPersonalWalletsListByAdvanceFilterRequest = {
  pageNumber: number;
  pageSize: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  samimServices?: string;
  branchId?: string;
};
