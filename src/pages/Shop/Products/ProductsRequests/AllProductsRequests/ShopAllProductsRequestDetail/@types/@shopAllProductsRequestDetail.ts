import { Dispatch, SetStateAction } from "react";

import { FormInstance, UploadFile } from "antd";

import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  GetShopAllProductsDetailResponse,
  ShopAllProductsDetailUuidTitleType,
} from "@pages/Shop/Products/ProductsList/AllProducts/ShopAllProductsDetail/@types/@shopAllProductsDetail";

export type ShopAllProductsRequestDetailProductFormType = {
  productId?: number | null;
};

export type ShopAllProductsRequestDetailProductFieldsProps = {
  detail: GetShopAllProductsDetailResponse;
  imageFileList: UploadFile[];
  setImageFileList: Dispatch<SetStateAction<UploadFile[]>>;
  form: FormInstance<ShopAllProductsRequestDetailProductFormType>;
  isProductIdEditable?: boolean;
};

export type ShopAllProductsRequestDetailAcceptModalContentProps = {
  title?: string;
  supplierTitle?: string;
};

export type RejectShopAllProductsRequestRequest = {
  uuid: string;
  rejectReason: string;
  rejectDescription: string;
};

export type RejectShopAllProductsRequestResponse = {
  rejectReason: string;
  rejectDescription: string;
};

export type AcceptShopAllProductsRequestRequest = {
  uuid: string;
  productId: number;
};

export type AcceptShopAllProductsRequestResponse = {
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
  publisher: ShopAllProductsDetailUuidTitleType;
  visible: boolean;
  status: IdTitleName;
  reviewReason: string;
  rejectReason: IdTitleName;
  rejectDescription: string;
  coverImageUuid: string;
  imageUuids: string[];
  categories: ShopAllProductsDetailUuidTitleType[];
};
