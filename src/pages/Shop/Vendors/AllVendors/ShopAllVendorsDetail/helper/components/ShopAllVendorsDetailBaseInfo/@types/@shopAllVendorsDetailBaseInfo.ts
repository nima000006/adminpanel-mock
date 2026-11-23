export type GetVendorProfileDetailShippingMethodType = {
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
export type GetVendorProfileDetailRequest = {
  supplierUuid: string;
};

export type GetVendorProfileDetailResponse = {
  uuid: string;
  title: string;
  shippingMethods: GetVendorProfileDetailShippingMethodType[];
};

export type EditShippingSettingsRequest = {
  uuid: string;
  tehranEnabled: boolean;
  tehranCost: number;
  tehranMinDeliveryDays: number;
  tehranMaxDeliveryDays: number;
  otherCitiesEnabled: boolean;
  otherCitiesCost: number;
  otherCitiesMinDeliveryDays: number;
  otherCitiesMaxDeliveryDays: number;
};

export type EditShippingSettingsResponse = {
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
