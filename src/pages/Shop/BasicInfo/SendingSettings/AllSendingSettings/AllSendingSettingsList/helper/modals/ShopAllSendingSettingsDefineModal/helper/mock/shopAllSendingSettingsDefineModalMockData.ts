/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  GetAdminSuppliersResponse,
  UpdateAllSendingSettingsResponse,
} from "../../@types/@shopAllSendingSettingsDefineModal";

export const GET_ADMIN_SUPPLIERS_RESPONSE_MOCK: GetAdminSuppliersResponse = {
  content: [{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  title: "نمونه title",
  bookCount: 10,
  openOrderCount: 10,
  closedOrderCount: 10,
}],
  pageNumber: 0,
  pageSize: 0,
  first: true,
  last: true,
  totalElements: 10,
  totalPages: 0,
  size: 10,
};

export const UPDATE_ALL_SENDING_SETTINGS_RESPONSE_MOCK: UpdateAllSendingSettingsResponse = {
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  supplierUuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  supplierTitle: "نمونه supplierTitle",
  tehranEnabled: true,
  tehranCost: 1,
  tehranMinDeliveryDays: 1,
  tehranMaxDeliveryDays: 1,
  otherCitiesEnabled: true,
  otherCitiesCost: 1,
  otherCitiesMinDeliveryDays: 1,
  otherCitiesMaxDeliveryDays: 1,
};
