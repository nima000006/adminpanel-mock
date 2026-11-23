export const SHOP_ORDERS_STATUS_MAP: Record<string, string> = {
  awaitingApproval: "AWAITING_APPROVAL", // در انتظار تایید
  awaitingShipment: "AWAITING_SHIPMENT", // آماده ارسال
  shipped: "SHIPPED", // ارسال شد
  delivered: "DELIVERED", // تحویل شده
  notReceived: "NOT_RECEIVED", // تحویل نگرفتم
  rejected: "REJECTED", // رد شد
  canceled: "CANCELED", // لغو شد
  expired: "EXPIRED", // منقضی شد
} as const;

export const SHOP_ORDERS_STATUS_COLORS: Record<string, string> = {
  [SHOP_ORDERS_STATUS_MAP.awaitingApproval]: "orange",
  [SHOP_ORDERS_STATUS_MAP.awaitingShipment]: "blue",
  [SHOP_ORDERS_STATUS_MAP.shipped]: "green",
  [SHOP_ORDERS_STATUS_MAP.delivered]: "green",
  [SHOP_ORDERS_STATUS_MAP.notReceived]: "red",
  [SHOP_ORDERS_STATUS_MAP.rejected]: "red",
  [SHOP_ORDERS_STATUS_MAP.canceled]: "red",
  [SHOP_ORDERS_STATUS_MAP.expired]: "red",
} as const;
