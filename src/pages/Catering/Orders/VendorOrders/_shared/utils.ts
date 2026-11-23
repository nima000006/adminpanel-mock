import moment from "jalali-moment";

import {
  CATERING_ORDER_DELIVERY_STATUS_LABELS,
  getCateringOrderDeliveryStatusLabel,
  getCateringOrderDeliveryStatusTagColor,
} from "@pages/Catering/Orders/_shared/utils";

export const VENDOR_ORDERS_PERIOD_TABS = {
  TODAY: "today",
  UPCOMING: "upcoming",
  PAST: "past",
  ALL: "all",
} as const;

export type VendorOrdersPeriodTab =
  (typeof VENDOR_ORDERS_PERIOD_TABS)[keyof typeof VENDOR_ORDERS_PERIOD_TABS];

/** Gregorian API date for period tabs (`YYYY-MM-DD`). */
export const getVendorOrdersApiTodayDate = () => moment().format("YYYY-MM-DD");

/** Period-scoped fromDate/toDate for vendor-orders list & analytics bodies. */
export const getVendorOrdersPeriodDateFilter = (
  period: VendorOrdersPeriodTab
): { fromDate?: string; toDate?: string } => {
  const today = getVendorOrdersApiTodayDate();

  if (period === VENDOR_ORDERS_PERIOD_TABS.TODAY) {
    return { fromDate: today, toDate: today };
  }

  if (period === VENDOR_ORDERS_PERIOD_TABS.UPCOMING) {
    return { fromDate: today };
  }

  if (period === VENDOR_ORDERS_PERIOD_TABS.PAST) {
    return { toDate: today };
  }

  return {};
};

export const getVendorOrdersDeliveryStatusTagColor = (deliveryStatus?: number) =>
  getCateringOrderDeliveryStatusTagColor(deliveryStatus);

export const getVendorOrdersDeliveryStatusLabel = (status?: {
  id?: number;
  title?: string;
  faTitle?: string;
}) => {
  if (status?.id != null && CATERING_ORDER_DELIVERY_STATUS_LABELS[status.id]) {
    return getCateringOrderDeliveryStatusLabel(status.id);
  }

  return status?.faTitle || status?.title;
};

const VENDOR_ORDERS_COUNT_UNIT = "سفارش";

/** Builds CountsDetailCard value text: `12 سفارش` or `12 سفارش (30٪)`. */
export const formatVendorOrdersCountCardValue = ({
  quantity,
  percentage,
  isLoading = false,
}: {
  quantity?: number | null;
  percentage?: number | null;
  isLoading?: boolean;
}) => {
  const quantityText = isLoading ? "-" : (quantity?.toString() ?? "-");
  const parts: Array<string | null> = [quantityText, VENDOR_ORDERS_COUNT_UNIT];

  if (!isLoading && percentage != null) {
    parts.push(`(${percentage}٪)`);
  }

  return parts.filter(Boolean).join(" ");
};
