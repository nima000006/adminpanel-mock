/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  GetShopAllOrdersDetailResponse,
  RejectUserOrdersResponse,
} from "../../@types/@shopAllOrdersDetail";

export const GET_SHOP_ALL_ORDERS_DETAIL_RESPONSE_MOCK: GetShopAllOrdersDetailResponse = {
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  supplierUuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  supplierTitle: "نمونه supplierTitle",
  status: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  createdDate: "2026-05-02T10:20:27.741127",
  itemsCount: 10,
  quantity: 10,
  booksPrice: 10,
  shippingCost: 1,
  totalPrice: 10,
  refundedAmount: 10,
  buyerFirstName: "نمونه buyerFirstName",
  buyerLastName: "نمونه buyerLastName",
  nationalCode: "0012345678",
  mobileNumber: "09121234567",
  receiverName: "نمونه receiverName",
  receiverMobileNumber: "09121234567",
  provinceName: "نمونه provinceName",
  cityName: "نمونه cityName",
  postalCode: "0012345678",
  address: "address-mock",
  shippingDescription: "نمونه shippingDescription",
  shippedDate: "2026-05-02T10:20:27.741127",
  items: [{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  bookUuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  title: "نمونه title",
  unitPrice: 10,
  quantity: 10,
  totalPrice: 10,
  status: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  rejected: true,
  rejectReason: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  rejectDescription: "نمونه rejectDescription",
}],
};

export const REJECT_USER_ORDERS_RESPONSE_MOCK: RejectUserOrdersResponse = {
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  bookUuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  title: "نمونه title",
  unitPrice: 10,
  quantity: 10,
  totalPrice: 10,
  status: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  rejected: true,
  rejectReason: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  rejectDescription: "نمونه rejectDescription",
};
