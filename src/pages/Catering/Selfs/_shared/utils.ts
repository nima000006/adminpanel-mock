import { ExcelCodes } from "@infra/config/excel-codes";
import {
  CATERING_MY_SELF_ARCHIVES_LIST_PAGE_ROUTE,
  CATERING_MY_SELF_LIST_PAGE_ROUTE,
  CATERING_SELF_ARCHIVES_LIST_PAGE_ROUTE,
  CATERING_SELF_LIST_PAGE_ROUTE,
} from "@infra/router/routes/catering";
import { CATERING_STATUS_TYPES } from "@pages/Catering/_shared/utils";
import {
  CateringSelfAccessMode,
  CateringSelfStatusTypeDto,
} from "@pages/Catering/Selfs/_shared/@types/@cateringSelfList";

export const CATERING_SELF_PAGE_CONFIG = {
  all: {
    listRoute: CATERING_SELF_LIST_PAGE_ROUTE,
    archiveRoute: CATERING_SELF_ARCHIVES_LIST_PAGE_ROUTE,
    listExcelCode: ExcelCodes.CATERING_ALL_SELF_LIST_TABLE,
    archiveExcelCode: ExcelCodes.CATERING_ALL_SELF_ARCHIVES_LIST_TABLE,
  },
  my: {
    listRoute: CATERING_MY_SELF_LIST_PAGE_ROUTE,
    archiveRoute: CATERING_MY_SELF_ARCHIVES_LIST_PAGE_ROUTE,
    listExcelCode: ExcelCodes.CATERING_MY_SELF_LIST_TABLE,
    archiveExcelCode: ExcelCodes.CATERING_MY_SELF_ARCHIVES_LIST_TABLE,
  },
} as const satisfies Record<
  CateringSelfAccessMode,
  {
    listRoute: string;
    archiveRoute: string;
    listExcelCode: ExcelCodes;
    archiveExcelCode: ExcelCodes;
  }
>;

/** Ant Design tag preset **/
export const CATERING_SELF_STATUS_TYPES_COLORS: Record<number, string> = {
  [CATERING_STATUS_TYPES.ACTIVE_SHOW]: "green",
  [CATERING_STATUS_TYPES.ACTIVE_NOT_SHOW]: "orange",
  [CATERING_STATUS_TYPES.DE_ACTIVE_NOT_SHOW]: "red",
  [CATERING_STATUS_TYPES.DELETED]: "gray",
};

export const getCateringSelfStatusTypeTagConfig = (
  statusType: CateringSelfStatusTypeDto | null | undefined
): { label: string; color?: string } | null => {
  if (!statusType?.faTitle) {
    return null;
  }

  return {
    label: statusType.faTitle,
    color: CATERING_SELF_STATUS_TYPES_COLORS[statusType.id],
  };
};

/** Food schedule request types **/
export const CATERING_FOOD_SCHEDULE_REQUEST_TYPES = {
  STUDENT: 0, // SUBSIDIZED
  FREE: 1, // NO_LIMIT
  SALES_DAY: 2, // DAILY
} as const;

export const CATERING_FOOD_SCHEDULE_REQUEST_TYPES_LABELS: Record<number, string> = {
  [CATERING_FOOD_SCHEDULE_REQUEST_TYPES.STUDENT]: "دانشجویی",
  [CATERING_FOOD_SCHEDULE_REQUEST_TYPES.FREE]: "آزاد",
  [CATERING_FOOD_SCHEDULE_REQUEST_TYPES.SALES_DAY]: "روز فروش",
};

export const CATERING_FOOD_SCHEDULE_REQUEST_TYPES_COLORS: Record<number, string> = {
  [CATERING_FOOD_SCHEDULE_REQUEST_TYPES.STUDENT]: "green",
  [CATERING_FOOD_SCHEDULE_REQUEST_TYPES.FREE]: "geekblue",
  [CATERING_FOOD_SCHEDULE_REQUEST_TYPES.SALES_DAY]: "purple",
};

export const getCateringFoodScheduleRequestTypeTagConfig = (
  requestType: number | null | undefined,
  requestTitle?: string | null
): { label: string; color?: string } | null => {
  if (requestType == null) {
    return null;
  }

  return {
    label: requestTitle || CATERING_FOOD_SCHEDULE_REQUEST_TYPES_LABELS[requestType] || "",
    color: CATERING_FOOD_SCHEDULE_REQUEST_TYPES_COLORS[requestType],
  };
};

/** Meal types **/
export const CATERING_FOOD_SCHEDULE_MEALS = {
  BREAKFAST: 0,
  LUNCH: 1,
  DINNER: 2,
  IFTAR: 3,
  SUHOOR: 4,
} as const;

export const CATERING_FOOD_SCHEDULE_MEALS_LABELS: Record<number, string> = {
  [CATERING_FOOD_SCHEDULE_MEALS.BREAKFAST]: "صبحانه",
  [CATERING_FOOD_SCHEDULE_MEALS.LUNCH]: "ناهار",
  [CATERING_FOOD_SCHEDULE_MEALS.DINNER]: "شام",
  [CATERING_FOOD_SCHEDULE_MEALS.IFTAR]: "افطاری",
  [CATERING_FOOD_SCHEDULE_MEALS.SUHOOR]: "سحری",
};

export const CATERING_FOOD_SCHEDULE_MEALS_COLORS: Record<number, string> = {
  [CATERING_FOOD_SCHEDULE_MEALS.BREAKFAST]: "geekblue",
  [CATERING_FOOD_SCHEDULE_MEALS.LUNCH]: "green",
  [CATERING_FOOD_SCHEDULE_MEALS.DINNER]: "red",
  [CATERING_FOOD_SCHEDULE_MEALS.IFTAR]: "gold",
  [CATERING_FOOD_SCHEDULE_MEALS.SUHOOR]: "magenta",
};

/** Persian meal title **/
export const CATERING_FOOD_SCHEDULE_MEAL_COLORS: Record<string, string> = {
  [CATERING_FOOD_SCHEDULE_MEALS_LABELS[CATERING_FOOD_SCHEDULE_MEALS.BREAKFAST]]:
    CATERING_FOOD_SCHEDULE_MEALS_COLORS[CATERING_FOOD_SCHEDULE_MEALS.BREAKFAST],
  [CATERING_FOOD_SCHEDULE_MEALS_LABELS[CATERING_FOOD_SCHEDULE_MEALS.LUNCH]]:
    CATERING_FOOD_SCHEDULE_MEALS_COLORS[CATERING_FOOD_SCHEDULE_MEALS.LUNCH],
  [CATERING_FOOD_SCHEDULE_MEALS_LABELS[CATERING_FOOD_SCHEDULE_MEALS.DINNER]]:
    CATERING_FOOD_SCHEDULE_MEALS_COLORS[CATERING_FOOD_SCHEDULE_MEALS.DINNER],
  [CATERING_FOOD_SCHEDULE_MEALS_LABELS[CATERING_FOOD_SCHEDULE_MEALS.IFTAR]]:
    CATERING_FOOD_SCHEDULE_MEALS_COLORS[CATERING_FOOD_SCHEDULE_MEALS.IFTAR],
  [CATERING_FOOD_SCHEDULE_MEALS_LABELS[CATERING_FOOD_SCHEDULE_MEALS.SUHOOR]]:
    CATERING_FOOD_SCHEDULE_MEALS_COLORS[CATERING_FOOD_SCHEDULE_MEALS.SUHOOR],
};

export const getCateringFoodScheduleMealTagColor = (
  mealName: string | null | undefined
): string | undefined => {
  if (!mealName) {
    return undefined;
  }

  return CATERING_FOOD_SCHEDULE_MEAL_COLORS[mealName];
};

/** History revision types — API returns ADD / MOD / DEL */
export const CATERING_SELF_HISTORY_REVISION_TYPES = {
  ADD: "ADD",
  MOD: "MOD",
  DEL: "DEL",
} as const;

export const CATERING_SELF_HISTORY_REVISION_TYPES_LABELS: Record<string, string> = {
  [CATERING_SELF_HISTORY_REVISION_TYPES.ADD]: "افزودن",
  [CATERING_SELF_HISTORY_REVISION_TYPES.MOD]: "ویرایش",
  [CATERING_SELF_HISTORY_REVISION_TYPES.DEL]: "حذف",
};

export const getCateringSelfHistoryRevisionTypeLabel = (
  revisionType: string | null | undefined
): string => {
  if (!revisionType) {
    return "";
  }

  return CATERING_SELF_HISTORY_REVISION_TYPES_LABELS[revisionType] ?? revisionType;
};
