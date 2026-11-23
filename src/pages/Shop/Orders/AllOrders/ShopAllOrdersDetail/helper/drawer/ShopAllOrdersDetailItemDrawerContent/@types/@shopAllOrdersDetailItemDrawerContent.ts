import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetShopAllOrdersDetailItem } from "@pages/Shop/Orders/AllOrders/ShopAllOrdersDetail/@types/@shopAllOrdersDetail";

export type ShopAllOrdersDetailItemDrawerContentProps = {
  item: GetShopAllOrdersDetailItem;
  onClose: () => void;
};

// APIs
export type GetPrOrdersProductDetailRequest = {
  uuid: string;
};

export type GetPrOrdersProductDetailLastAction = {
  action: IdTitleName;
  date: string;
  actorName: string;
  actorRole: IdTitleName;
  rejectReason: IdTitleName;
  rejectDescription: string;
  refundedAmount: number;
};

export type GetPrOrdersProductDetailResponse = {
  uuid: string;
  bookUuid: string;
  title: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  paymentStatus: IdTitleName;
  status: IdTitleName;
  lastAction: GetPrOrdersProductDetailLastAction;
};
