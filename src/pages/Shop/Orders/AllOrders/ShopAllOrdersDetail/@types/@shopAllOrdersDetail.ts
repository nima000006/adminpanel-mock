import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

// APIs
export type GetShopAllOrdersDetailRequest = {
  uuid: string;
};

export type GetShopAllOrdersDetailItem = {
  uuid: string;
  bookUuid: string;
  title: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  status: IdTitleName;
  rejected: boolean;
  rejectReason: IdTitleName;
  rejectDescription: string;
};

export type GetShopAllOrdersDetailResponse = {
  uuid: string;
  supplierUuid: string;
  supplierTitle: string;
  status: IdTitleName;
  createdDate: string;
  itemsCount: number;
  quantity: number;
  booksPrice: number;
  shippingCost: number;
  totalPrice: number;
  refundedAmount: number;
  buyerFirstName: string;
  buyerLastName: string;
  nationalCode: string;
  mobileNumber: string;
  receiverName: string;
  receiverMobileNumber: string;
  provinceName: string;
  cityName: string;
  postalCode: string;
  address: string;
  shippingDescription: string;
  shippedDate: string;
  items: GetShopAllOrdersDetailItem[];
};

export type RejectUserOrdersRequest = {
  uuid: string;
  body: {
    rejectReason: string;
    rejectDescription: string;
  };
};

export type RejectUserOrdersResponse = {
  uuid: string;
  bookUuid: string;
  title: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  status: IdTitleName;
  rejected: boolean;
  rejectReason: IdTitleName;
  rejectDescription: string;
};

export type ConfirmShopOrdersRequest = {
  uuid: string;
};

export type ConfirmShopOrdersResponse = GetShopAllOrdersDetailResponse;

export type ConfirmShipOrdersRequest = {
  uuid: string;
  body: {
    shippingDescription: string;
  };
};

export type ConfirmShipOrdersResponse = GetShopAllOrdersDetailResponse;
