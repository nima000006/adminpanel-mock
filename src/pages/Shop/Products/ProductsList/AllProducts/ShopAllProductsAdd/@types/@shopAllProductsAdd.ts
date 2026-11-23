import { FormInstance } from "antd";
import { UploadFile } from "antd/es/upload";

import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ShopAllProductsAddCategoryOptionType = {
  uuid?: string;
  title?: string;
  id?: string;
};

export type ShopAllProductsAddCategoryRowType = {
  layer1?: string | SelectType<ShopAllProductsAddCategoryOptionType>;
  layer2?: string | SelectType<ShopAllProductsAddCategoryOptionType>;
  layer3?: Array<string | SelectType<ShopAllProductsAddCategoryOptionType>>;
};

export type ShopAllProductsAddPublisherOptionType = {
  uuid: string;
  title: string;
};

export type ShopAllProductsAddFormType = {
  isbn: string;
  title: string;
  author?: string;
  publisherUuid?: string | SelectType<ShopAllProductsAddPublisherOptionType>;
  subject?: string;
  coverType?: string;
  format?: string;
  volumeCount?: string;
  pageCount?: string;
  description?: string;
  categories: ShopAllProductsAddCategoryRowType[];
  images?: UploadFile[];
};

export type ShopAllProductsAddIsbnInquiryResponse = {
  title?: string;
  author?: string;
  publisher?: string;
  subject?: string;
  coverType?: string;
  format?: string;
  volumeCount?: string;
  pageCount?: string;
  description?: string;
};

export type ShopAllProductsAddCategoryPickerProps = {
  form: FormInstance<ShopAllProductsAddFormType>;
};

//! APIs
export type UploadShopAllProductFileRequest = FormData;

export type UploadShopAllProductFileResponse = {
  uuid: string;
};

export type OnUploadShopAllProductFileSuccess = {
  response: UploadShopAllProductFileResponse;
};

export type CreateShopAllProductUuidTitleType = {
  uuid: string;
  title: string;
};

export type GetShopAllProductsPublishersRequest = {
  pageSize: number;
  pageNumber: number;
  title?: string;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC" | string;
};

export type GetShopAllProductsPublishersResponse = {
  content: CreateShopAllProductUuidTitleType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type CreateShopAllProductRequest = {
  faTitle: string;
  isbn: string;
  author: string;
  publisherUuid: string;
  subject: string;
  coverType: string;
  bookSize: string;
  volumeCount: number;
  pageCount: number;
  faDescription: string;
  coverImageUuid: string;
  categoryUuids: string[];
  imageUuids: string[];
};

export type CreateShopAllProductResponse = {
  uuid: string;
  title: string;
  description: string;
  isbn: string;
  author: string;
  subject: string;
  coverType: string;
  bookSize: string;
  volumeCount: number;
  pageCount: number;
  publisher: CreateShopAllProductUuidTitleType;
  visible: boolean;
  status: IdTitleName;
  reviewReason: string;
  rejectReason: IdTitleName;
  rejectDescription: string;
  coverImageUuid: string;
  imageUuids: string[];
  categories: CreateShopAllProductUuidTitleType[];
};
