export type ShopAllSendingSettingsListRecordType = {
  uuid: string;
  supplierUuid: string;
  supplierTitle: string;
  tehranEnabled: boolean;
  tehranCost: number;
  tehranMinDeliveryDays: number;
  tehranMaxDeliveryDays: number;
  otherCitiesEnabled: boolean;
  otherCitiesCost: number;
  otherCitiesMinDeliveryDays: number;
  otherCitiesMaxDeliveryDays: number;
};

//! APIs
export type GetAllSendingSettingsListRequest = {
  pageSize: number;
  pageNumber: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC" | string;
  branchId?: number;
  supplierUuids?: string[];
  supplierTitle?: string;
};

export type GetAllSendingSettingsListResponse = {
  content: ShopAllSendingSettingsListRecordType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type CreateAllSendingSettingsRequest = {
  tehranEnabled: boolean;
  tehranCost: number;
  tehranMinDeliveryDays: number;
  tehranMaxDeliveryDays: number;
  otherCitiesEnabled: boolean;
  otherCitiesCost: number;
  otherCitiesMinDeliveryDays: number;
  otherCitiesMaxDeliveryDays: number;
  supplierUuid: string;
};

export type CreateAllSendingSettingsResponse = {
  uuid: string;
  supplierUuid: string;
  supplierTitle: string;
  tehranEnabled: boolean;
  tehranCost: number;
  tehranMinDeliveryDays: number;
  tehranMaxDeliveryDays: number;
  otherCitiesEnabled: boolean;
  otherCitiesCost: number;
  otherCitiesMinDeliveryDays: number;
  otherCitiesMaxDeliveryDays: number;
};
