import type { AddFoodSchedulesWizardAddFoodItem } from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/helper/components/AddFoodSchedulesWizardAddFoodStep/@types/@addFoodSchedulesWizardAddFoodStep";
import type { CreateAllFoodScheduleRequest } from "@pages/Catering/FoodSchedules/AllFoodSchedules/AllAddFoodSchedules/@types/@allAddFoodSchedules";
import type { CreateMyFoodScheduleRequest } from "@pages/Catering/FoodSchedules/MyFoodSchedules/MyAddFoodSchedules/@types/@myAddFoodSchedules";

import type { Dayjs } from "dayjs";

export const ADD_FOOD_SCHEDULES_WIZARD_SCOPE = {
  ALL: "all",
  MY: "my",
} as const;

export type AddFoodSchedulesWizardScope =
  (typeof ADD_FOOD_SCHEDULES_WIZARD_SCOPE)[keyof typeof ADD_FOOD_SCHEDULES_WIZARD_SCOPE];

export type AddFoodSchedulesWizardCreateRequest =
  CreateAllFoodScheduleRequest | CreateMyFoodScheduleRequest;

export type AddFoodSchedulesWizardProps = {
  scope: AddFoodSchedulesWizardScope;
  onCancel: () => void;
  onContinue?: (payload: AddFoodSchedulesWizardContinuePayload) => void;
  createFoodSchedule: (body: AddFoodSchedulesWizardCreateRequest) => Promise<unknown>;
  isCreateFoodScheduleLoading?: boolean;
};

export type AddFoodSchedulesWizardContinuePayload = {
  mealType: number;
  datesStep: AddFoodSchedulesWizardDatesFormValues;
  scheduleDates: AddFoodSchedulesWizardScheduleDateItem[];
  basicSettingsStep: AddFoodSchedulesWizardBasicSettingsFormValues;
  foods: AddFoodSchedulesWizardAddFoodItem[];
};

export const ADD_FOOD_SCHEDULES_STEP_INDEX = {
  SELECT_MEAL: 0, // انتخاب وعده
  DATES: 1, // تاریخ های برنامه غذایی
  BASIC_SETTINGS: 2, // تنظیمات پایه
  ADD_FOOD: 3, // افزودن غذا
  FINAL_REVIEW: 4, // بررسی نهایی
} as const;

export type AddFoodSchedulesStepIndex =
  (typeof ADD_FOOD_SCHEDULES_STEP_INDEX)[keyof typeof ADD_FOOD_SCHEDULES_STEP_INDEX];

export const ADD_FOOD_SCHEDULES_STEP_ITEMS = [
  { title: "انتخاب وعده" },
  { title: "تاریخ های برنامه غذایی" },
  { title: "تنظیمات پایه" },
  { title: "افزودن غذا" },
  { title: "بررسی نهایی" },
] as const;

export const ADD_FOOD_SCHEDULES_PATTERN = {
  WEEKLY: "weekly", // تکرار شونده (هفتگی)
  ONE_DAY: "oneDay", // فقط یک روز
} as const;

export type AddFoodSchedulesPattern =
  (typeof ADD_FOOD_SCHEDULES_PATTERN)[keyof typeof ADD_FOOD_SCHEDULES_PATTERN];

export type AddFoodSchedulesWizardDatesFormValues = {
  pattern: AddFoodSchedulesPattern;
  contractId?: number;
  weekDays?: number[];
  scheduleDateRange?: [string, string];
  scheduleDate?: string;
  deliveryTimeRange?: [Dayjs, Dayjs];
  reservationStartDay?: number;
  reservationStartTime?: Dayjs;
  reservationEndDay?: number;
  reservationEndTime?: Dayjs;
};

export type AddFoodSchedulesWizardScheduleDateItem = {
  id: string;
  dateIso: string;
  label: string;
  isHoliday: boolean;
  isDeleted: boolean;
};

export type AddFoodSchedulesWizardBasicSettingsFormValues = {
  cafeteriaId?: number;
  agreementUnitIds?: number[];
  isPersonalized?: boolean;
  educationLevelIds?: number[];
  fieldOfStudyIds?: number[];
  entryYearIds?: number[];
};
