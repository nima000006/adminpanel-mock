import { ShopAllSendingSettingsListRecordType } from "@pages/Shop/BasicInfo/SendingSettings/AllSendingSettings/AllSendingSettingsList/@types/@shopAllSendingSettingsList";

export type ShopAllSendingSettingsDefineFormType = {
  supplierUuid?: string;
  tehranShippingCost?: number | null;
  tehranMinDeliveryDays?: number | null;
  tehranMaxDeliveryDays?: number | null;
  townshipShippingCost?: number | null;
  townshipMinDeliveryDays?: number | null;
  townshipMaxDeliveryDays?: number | null;
};

export type ShopAllSendingSettingsDefineModalProps = {
  open: boolean;
  onCancel: () => void;
  onSuccess?: () => void;
  record?: ShopAllSendingSettingsListRecordType | null;
};

//! APIs
export type GetAdminSuppliersRequest = {
  pageSize: number;
  pageNumber: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC" | string;
  title?: string;
  branchId?: number;
  businessId?: number;
  bookCountFrom?: number;
  bookCountTo?: number;
  openOrderCountFrom?: number;
  openOrderCountTo?: number;
  closedOrderCountFrom?: number;
  closedOrderCountTo?: number;
};

export type GetAdminSuppliersResponse = {
  content: {
    uuid: string;
    title: string;
    bookCount: number;
    openOrderCount: number;
    closedOrderCount: number;
  }[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type UpdateAllSendingSettingsRequest = {
  uuid: string;
  body: {
    tehranEnabled: boolean;
    tehranCost: number;
    tehranMinDeliveryDays: number;
    tehranMaxDeliveryDays: number;
    otherCitiesEnabled: boolean;
    otherCitiesCost: number;
    otherCitiesMinDeliveryDays: number;
    otherCitiesMaxDeliveryDays: number;
  };
};

export type UpdateAllSendingSettingsResponse = {
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
