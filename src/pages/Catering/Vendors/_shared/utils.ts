import { CATERING_STATUS_TYPES } from "@pages/Catering/_shared/utils";

export const CATERING_VENDOR_STATUS_TYPES = CATERING_STATUS_TYPES;

export const CATERING_VENDOR_STATUS_TYPES_COLORS: Record<number, string> = {
  [CATERING_VENDOR_STATUS_TYPES.ACTIVE_SHOW]: "green",
  [CATERING_VENDOR_STATUS_TYPES.ACTIVE_NOT_SHOW]: "orange",
  [CATERING_VENDOR_STATUS_TYPES.DE_ACTIVE_NOT_SHOW]: "red",
  [CATERING_VENDOR_STATUS_TYPES.DELETED]: "gray",
};

export type CateringVendorStatusTypeDto = {
  id: number;
  title?: string;
  faTitle?: string;
};

export const getCateringVendorStatusTypeTagConfig = (
  statusType: CateringVendorStatusTypeDto | null | undefined
): { label: string; color?: string } | null => {
  const label = statusType?.faTitle || statusType?.title;
  if (!label) {
    return null;
  }

  return {
    label,
    color: CATERING_VENDOR_STATUS_TYPES_COLORS[statusType.id],
  };
};

/** History revision types — API returns ADD / MOD / DEL */
export const CATERING_VENDOR_HISTORY_REVISION_TYPES = {
  ADD: "ADD",
  MOD: "MOD",
  DEL: "DEL",
} as const;

export const CATERING_VENDOR_HISTORY_REVISION_TYPES_LABELS: Record<string, string> = {
  [CATERING_VENDOR_HISTORY_REVISION_TYPES.ADD]: "افزودن",
  [CATERING_VENDOR_HISTORY_REVISION_TYPES.MOD]: "ویرایش",
  [CATERING_VENDOR_HISTORY_REVISION_TYPES.DEL]: "حذف",
};

export const getCateringVendorHistoryRevisionTypeLabel = (
  revisionType: string | null | undefined
): string => {
  if (!revisionType) {
    return "";
  }

  return CATERING_VENDOR_HISTORY_REVISION_TYPES_LABELS[revisionType] ?? revisionType;
};
