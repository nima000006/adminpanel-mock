import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";

export const CATERING_GENDER_TYPES = {
  MALE: 0,
  FEMALE: 1,
  UNISEX: 2,
};

export const CATERING_GENDER_TYPES_LABELS = {
  [CATERING_GENDER_TYPES.MALE]: "آقایان",
  [CATERING_GENDER_TYPES.FEMALE]: "بانوان",
  [CATERING_GENDER_TYPES.UNISEX]: "مختلط",
};

export const CATERING_GENDER_TYPES_COLORS = {
  [CATERING_GENDER_TYPES.MALE]: "purple",
  [CATERING_GENDER_TYPES.FEMALE]: "orange",
  [CATERING_GENDER_TYPES.UNISEX]: "magenta",
};

/** Shared entity statusType across Foods / Vendors / Selfs / Contracts / BasicInfo */
export const CATERING_STATUS_TYPES = {
  ACTIVE_SHOW: 0,
  ACTIVE_NOT_SHOW: 1,
  DE_ACTIVE_NOT_SHOW: 2,
  DELETED: 3,
} as const;

/** Active + inactive items for main lists */
export const CATERING_STATUS_TYPES_MAIN_LIST: number[] = [
  CATERING_STATUS_TYPES.ACTIVE_SHOW,
  CATERING_STATUS_TYPES.ACTIVE_NOT_SHOW,
];

/** Archived / deactivated items */
export const CATERING_STATUS_TYPES_ARCHIVE_LIST: number[] = [
  CATERING_STATUS_TYPES.DE_ACTIVE_NOT_SHOW,
];

/** Product categories — main food / side dish **/
export const CATERING_PRODUCT_CATEGORIES = {
  MAIN_FOOD: 0,
  SIDE_DISH: 1,
} as const;

export const CATERING_PRODUCT_CATEGORIES_LABELS: Record<number, string> = {
  [CATERING_PRODUCT_CATEGORIES.MAIN_FOOD]: "غذای اصلی",
  [CATERING_PRODUCT_CATEGORIES.SIDE_DISH]: "مخلفات",
};

export const CATERING_PRODUCT_CATEGORIES_COLORS: Record<number, string> = {
  [CATERING_PRODUCT_CATEGORIES.MAIN_FOOD]: "cyan",
  [CATERING_PRODUCT_CATEGORIES.SIDE_DISH]: "orange",
};

export const getCateringProductCategoryTagConfig = (
  categoryId?: number | null
): { label: string; color: string } | null => {
  if (categoryId == null) {
    return null;
  }

  const label = CATERING_PRODUCT_CATEGORIES_LABELS[categoryId];

  if (!label) {
    return null;
  }

  return {
    label,
    color: CATERING_PRODUCT_CATEGORIES_COLORS[categoryId],
  };
};

export const renderCateringProductCategoryCustomTag = (categoryId?: number | null) => {
  const config = getCateringProductCategoryTagConfig(categoryId);

  if (!config) {
    return dataPlaceHolder({ data: null });
  }

  return (
    <CustomTag color={config.color} className="w-fit">
      {config.label}
    </CustomTag>
  );
};
