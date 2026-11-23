export const SHOP_PRODUCT_STATUSES = [
  { id: 0, name: "AWAITING_APPROVAL", title: "در انتظار تأیید", color: "orange" },
  { id: 1, name: "ACCEPTED", title: "تایید شده", color: "green" },
  { id: 2, name: "REJECTED", title: "رد شده", color: "red" },
] as const;

export const SHOP_PRODUCT_STATUS = {
  AWAITING_APPROVAL: "AWAITING_APPROVAL",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
} as const;

export type ShopProductStatusName = (typeof SHOP_PRODUCT_STATUSES)[number]["name"];

export const getShopProductStatusColor = (name?: string) =>
  SHOP_PRODUCT_STATUSES.find((status) => status.name === name)?.color;
