import { CATERING_STATUS_TYPES } from "@pages/Catering/_shared/utils";
import { CateringFoodStatusTypeDto } from "@pages/Catering/Foods/_shared/@types/@sharedTypes";

/** Ant Design tag preset **/
export const CATERING_FOOD_STATUS_TYPES_COLORS: Record<number, string> = {
  [CATERING_STATUS_TYPES.ACTIVE_SHOW]: "green",
  [CATERING_STATUS_TYPES.ACTIVE_NOT_SHOW]: "orange",
  [CATERING_STATUS_TYPES.DE_ACTIVE_NOT_SHOW]: "red",
  [CATERING_STATUS_TYPES.DELETED]: "gray",
};

export const getCateringFoodStatusTypeTagConfig = (
  statusType: CateringFoodStatusTypeDto | null | undefined
): { label: string; color?: string } | null => {
  if (!statusType?.faTitle) {
    return null;
  }

  return {
    label: statusType.faTitle,
    color: CATERING_FOOD_STATUS_TYPES_COLORS[statusType.id],
  };
};

/** History revision types — API returns ADD / MOD / DEL */
export const CATERING_FOOD_HISTORY_REVISION_TYPES = {
  ADD: "ADD",
  MOD: "MOD",
  DEL: "DEL",
} as const;

export const CATERING_FOOD_HISTORY_REVISION_TYPES_LABELS: Record<string, string> = {
  [CATERING_FOOD_HISTORY_REVISION_TYPES.ADD]: "افزودن",
  [CATERING_FOOD_HISTORY_REVISION_TYPES.MOD]: "ویرایش",
  [CATERING_FOOD_HISTORY_REVISION_TYPES.DEL]: "حذف",
};

export const getCateringFoodHistoryRevisionTypeLabel = (
  revisionType: string | null | undefined
): string => {
  if (!revisionType) {
    return "";
  }

  return CATERING_FOOD_HISTORY_REVISION_TYPES_LABELS[revisionType] ?? revisionType;
};
