/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  ShopAllProductsAddIsbnInquiryResponse,
  UploadShopAllProductFileResponse,
  GetShopAllProductsPublishersResponse,
  CreateShopAllProductResponse,
} from "../../@types/@shopAllProductsAdd";

export const SHOP_ALL_PRODUCTS_ADD_ISBN_INQUIRY_RESPONSE_MOCK: ShopAllProductsAddIsbnInquiryResponse = {
  title: "نمونه title",
  author: "author-mock",
  publisher: "publisher-mock",
  subject: "subject-mock",
  coverType: "coverType-mock",
  format: "2026-05-02T10:20:27.741127",
  volumeCount: "volumeCount-mock",
  pageCount: "pageCount-mock",
  description: "نمونه description",
};

export const UPLOAD_SHOP_ALL_PRODUCT_FILE_RESPONSE_MOCK: UploadShopAllProductFileResponse = {
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
};

export const GET_SHOP_ALL_PRODUCTS_PUBLISHERS_RESPONSE_MOCK: GetShopAllProductsPublishersResponse = {
  content: [{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  title: "نمونه title",
}],
  pageNumber: 0,
  pageSize: 0,
  first: true,
  last: true,
  totalElements: 10,
  totalPages: 0,
  size: 10,
};

export const CREATE_SHOP_ALL_PRODUCT_RESPONSE_MOCK: CreateShopAllProductResponse = {
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  title: "نمونه title",
  description: "نمونه description",
  isbn: "isbn-mock",
  author: "author-mock",
  subject: "subject-mock",
  coverType: "coverType-mock",
  bookSize: "bookSize-mock",
  volumeCount: 10,
  pageCount: 0,
  publisher: {
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  title: "نمونه title",
},
  visible: true,
  status: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  reviewReason: "نمونه reviewReason",
  rejectReason: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  rejectDescription: "نمونه rejectDescription",
  coverImageUuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  imageUuids: ["30acd599-f0fd-4d67-9593-aab003100e2e"],
  categories: [{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  title: "نمونه title",
}],
};

export const CREATE_SHOP_ALL_PRODUCT_UUID_TITLE_TYPE_LIST_MOCK: CreateShopAllProductUuidTitleType[] = [
{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  title: "نمونه title",
},
{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  title: "نمونه title",
},
];
