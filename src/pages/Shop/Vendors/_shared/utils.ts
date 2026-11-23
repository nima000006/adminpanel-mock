/** Shop vendor order statuses — aligned with /admin/supplier-orders/status-counts **/

import { ShopVendorOrderStatus } from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailOrders/@types/@shopAllVendorsDetailOrders";

export const SHOP_VENDOR_ORDER_STATUS = {
  AWAITING_APPROVAL: 0,
  AWAITING_SHIPMENT: 1,
  DELIVERED: 2,
  NOT_RECEIVED: 3,
  REJECTED: 4,
  SHIPPED: 5,
  CANCELED: 6,
  EXPIRED: 7,
} as const;

export const SHOP_VENDOR_ORDER_STATUS_NAME = {
  AWAITING_APPROVAL: "AWAITING_APPROVAL",
  AWAITING_SHIPMENT: "AWAITING_SHIPMENT",
  DELIVERED: "DELIVERED",
  NOT_RECEIVED: "NOT_RECEIVED",
  REJECTED: "REJECTED",
  SHIPPED: "SHIPPED",
  CANCELED: "CANCELED",
  EXPIRED: "EXPIRED",
} as const;

export const SHOP_VENDOR_ORDER_STATUS_LABELS: Record<ShopVendorOrderStatus, string> = {
  [SHOP_VENDOR_ORDER_STATUS.AWAITING_APPROVAL]: "در انتظار تایید",
  [SHOP_VENDOR_ORDER_STATUS.AWAITING_SHIPMENT]: "آماده ارسال",
  [SHOP_VENDOR_ORDER_STATUS.DELIVERED]: "تحویل شده",
  [SHOP_VENDOR_ORDER_STATUS.NOT_RECEIVED]: "تحویل نگرفتم",
  [SHOP_VENDOR_ORDER_STATUS.REJECTED]: "رد شده",
  [SHOP_VENDOR_ORDER_STATUS.SHIPPED]: "ارسال شد",
  [SHOP_VENDOR_ORDER_STATUS.CANCELED]: "لغو شده",
  [SHOP_VENDOR_ORDER_STATUS.EXPIRED]: "منقضی شده",
};

/** colors **/
export const SHOP_VENDOR_ORDER_STATUS_COLORS: Record<ShopVendorOrderStatus, string> = {
  [SHOP_VENDOR_ORDER_STATUS.AWAITING_APPROVAL]: "orange",
  [SHOP_VENDOR_ORDER_STATUS.AWAITING_SHIPMENT]: "blue",
  [SHOP_VENDOR_ORDER_STATUS.DELIVERED]: "green",
  [SHOP_VENDOR_ORDER_STATUS.NOT_RECEIVED]: "red",
  [SHOP_VENDOR_ORDER_STATUS.REJECTED]: "red",
  [SHOP_VENDOR_ORDER_STATUS.SHIPPED]: "green",
  [SHOP_VENDOR_ORDER_STATUS.CANCELED]: "default",
  [SHOP_VENDOR_ORDER_STATUS.EXPIRED]: "default",
};

export const getShopVendorOrderStatusLabel = (
  statusId: number,
  count?: number
): string => {
  const label = SHOP_VENDOR_ORDER_STATUS_LABELS[statusId as ShopVendorOrderStatus] ?? "";

  if (count != null && count > 0) {
    return `${count} ${label}`.trim();
  }

  return label;
};

export const getShopVendorOrderStatusColor = (statusId: number): string | undefined => {
  return SHOP_VENDOR_ORDER_STATUS_COLORS[statusId as ShopVendorOrderStatus];
};
