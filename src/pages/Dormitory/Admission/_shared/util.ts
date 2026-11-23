import { IconType } from "react-icons";
import { PiBed, PiBuildings, PiDoor, PiGenderFemale, PiGenderMale } from "react-icons/pi";

export const MY_ADMISSION_STATUS = {
  waiting: "waiting",
  returned: "returned",
  rejected: "rejected",
  cancelled: "cancelled",
  accepted: "accepted",
  active: "active",
  draft: "draft",
} as const;

export const MY_ADMISSION_STATUS_CONFIG = {
  [MY_ADMISSION_STATUS.waiting]: {
    title: "در انتظار بررسی",
    color: "gold",
  },
  [MY_ADMISSION_STATUS.returned]: {
    title: "عودت شده",
    color: "orange",
  },
  [MY_ADMISSION_STATUS.rejected]: {
    title: "رد شده",
    color: "red",
  },
  [MY_ADMISSION_STATUS.cancelled]: {
    title: "لغو شده",
    color: "volcano",
  },
  [MY_ADMISSION_STATUS.accepted]: {
    title: "تایید شده",
    color: "green",
  },
  [MY_ADMISSION_STATUS.active]: {
    title: "فعال",
    color: "blue",
  },
  [MY_ADMISSION_STATUS.draft]: {
    title: "پیش‌نویس",
    color: "gray",
  },
} as const;

export const ADMISSION_STATUS_CAPACITIES_TABS = {
  DRAFT: { id: 1, name: "DRAFT", title: "پیش‌نویس", color: "gray" },
  PENDING_APPROVAL: {
    id: 2,
    name: "PENDING_APPROVAL",
    title: "در انتظار بررسی",
    color: "gold",
  },
  RETURNED: { id: 3, name: "RETURNED", title: "عودت‌شده", color: "orange" },
  ACTIVE: { id: 5, name: "ACTIVE", title: "فعال", color: "blue" },
} as const;

export type AdmissionDetailStatusFlags = {
  isWaiting: boolean;
  isReturned: boolean;
  isRejected: boolean;
  isCancelled: boolean;
  isAwaitingReReview: boolean;
  isAccepted: boolean;
};

export const getAdmissionDetailStatusFlags = (
  status: (typeof MY_ADMISSION_STATUS)[keyof typeof MY_ADMISSION_STATUS],
  returnDate?: string | null
): AdmissionDetailStatusFlags => {
  const isWaiting = status === MY_ADMISSION_STATUS.waiting;
  const isReturned = status === MY_ADMISSION_STATUS.returned;
  const isRejected = status === MY_ADMISSION_STATUS.rejected;
  const isCancelled = status === MY_ADMISSION_STATUS.cancelled;
  const isAccepted = status === MY_ADMISSION_STATUS.accepted;
  const isAwaitingReReview = isWaiting && Boolean(returnDate);

  return {
    isWaiting,
    isReturned,
    isRejected,
    isCancelled,
    isAwaitingReReview,
    isAccepted,
  };
};

export const MY_ADMISSION_DETAIL_TABS = {
  statistics: "statistics", // آمار
  programInfo: "programInfo", // اطلاعات برنامه
  scheduling: "scheduling", // زمان‌بندی
  rules: "rules", // قوانین پذیرش
  capacities: "capacities", // ظرفیت‌ها
  financial: "financial", // شرایط مالی
  settings: "settings", // تنظیمات تکمیلی
} as const;

export const ALL_ADMISSION_STEPS_EDIT_TABS = [
  MY_ADMISSION_DETAIL_TABS.programInfo,
  MY_ADMISSION_DETAIL_TABS.scheduling,
  MY_ADMISSION_DETAIL_TABS.rules,
  MY_ADMISSION_DETAIL_TABS.capacities,
  MY_ADMISSION_DETAIL_TABS.financial,
  MY_ADMISSION_DETAIL_TABS.settings,
] as const;

export type AllAdmissionStepsEditTab = (typeof ALL_ADMISSION_STEPS_EDIT_TABS)[number];

export const isAllAdmissionStepsEditTab = (
  tab: string | undefined
): tab is AllAdmissionStepsEditTab =>
  ALL_ADMISSION_STEPS_EDIT_TABS.includes(tab as AllAdmissionStepsEditTab);

export const ADMISSION_STEPS = [
  {
    key: MY_ADMISSION_DETAIL_TABS.programInfo,
    title: "اطلاعات برنامه",
  },
  {
    key: MY_ADMISSION_DETAIL_TABS.scheduling,
    title: "زمان‌بندی",
  },
  {
    key: MY_ADMISSION_DETAIL_TABS.rules,
    title: "قوانین پذیرش",
  },
  {
    key: MY_ADMISSION_DETAIL_TABS.capacities,
    title: "ظرفیت",
  },
  {
    key: MY_ADMISSION_DETAIL_TABS.financial,
    title: "شرایط مالی",
  },
  {
    key: MY_ADMISSION_DETAIL_TABS.settings,
    title: "تنظیمات تکمیلی",
  },
] as const;

export type AdmissionStep = (typeof ADMISSION_STEPS)[number];

export const RESERVABLE_CAPACITY_TYPE = {
  bed: "BED",
  unit: "ROOM",
  building: "BUILDING",
} as const;

export const RESERVABLE_CAPACITY_LABEL = {
  [RESERVABLE_CAPACITY_TYPE.bed]: "تخت",
  [RESERVABLE_CAPACITY_TYPE.unit]: "واحد اقامتی",
  [RESERVABLE_CAPACITY_TYPE.building]: "ساختمان",
} as const;

export const RESERVABLE_CAPACITY_LIST = [
  {
    id: 5,
    name: RESERVABLE_CAPACITY_TYPE.bed,
    title: "تخت",
  },
  {
    id: 4,
    name: RESERVABLE_CAPACITY_TYPE.unit,
    title: "واحد اقامتی",
  },
  {
    id: 2,
    name: RESERVABLE_CAPACITY_TYPE.building,
    title: "ساختمان",
  },
];

export const SCHEDULE_TYPE = {
  termic: "SEMESTER",
  monthly: "MONTHLY",
  dailyFree: "FREE",
  dailyPackage: "PACKAGE",
  daily: "DAILY",
} as const;

export const PERIOD_TYPE = {
  termic: "SEMESTER",
  monthly: "MONTHLY",
  daily: "DAILY",
  dailyFree: "FREE",
  dailyPackage: "PACKAGE",
} as const;

export const SCHEDULE_TYPE_TAG_LABEL = {
  [SCHEDULE_TYPE.termic]: "ترمیک / دوره‌ای",
  [SCHEDULE_TYPE.monthly]: "ماهانه",
  [SCHEDULE_TYPE.dailyFree]: "روزانه",
  [SCHEDULE_TYPE.dailyPackage]: "روزانه",
  [SCHEDULE_TYPE.daily]: "روزانه",
} as const;

export const SCHEDULE_TYPE_TAG_COLOR = {
  [SCHEDULE_TYPE.termic]: "blue",
  [SCHEDULE_TYPE.monthly]: "blue",
  [SCHEDULE_TYPE.dailyFree]: "purple",
  [SCHEDULE_TYPE.dailyPackage]: "purple",
  [SCHEDULE_TYPE.daily]: "purple",
} as const;

export const ADMISSION_VISIBILITY = {
  visible: "visible",
  hidden: "hidden",
} as const;

export const ADMISSION_VISIBILITY_CONFIG = {
  [ADMISSION_VISIBILITY.visible]: {
    label: "قابل نمایش",
    color: "green",
  },
  [ADMISSION_VISIBILITY.hidden]: {
    label: "غیر قابل نمایش",
    color: "orange",
  },
} as const;

export const ADMISSION_GENDER = {
  male: "male",
  female: "female",
  both: "both",
} as const;

export const ADMISSION_GENDER_CONFIG: Record<
  (typeof ADMISSION_GENDER)[keyof typeof ADMISSION_GENDER],
  { label: string; color: string; icons: IconType[] }
> = {
  [ADMISSION_GENDER.male]: {
    label: "آقایان",
    color: "blue",
    icons: [PiGenderMale],
  },
  [ADMISSION_GENDER.female]: {
    label: "بانوان",
    color: "magenta",
    icons: [PiGenderFemale],
  },
  [ADMISSION_GENDER.both]: {
    label: "آقایان و بانوان",
    color: "default",
    icons: [PiGenderMale, PiGenderFemale],
  },
};

export const RESERVABLE_CAPACITY_CONFIG: Record<
  (typeof RESERVABLE_CAPACITY_TYPE)[keyof typeof RESERVABLE_CAPACITY_TYPE],
  { label: string; icon: IconType; color: string }
> = {
  [RESERVABLE_CAPACITY_TYPE.bed]: {
    label: RESERVABLE_CAPACITY_LABEL[RESERVABLE_CAPACITY_TYPE.bed],
    icon: PiBed,
    color: "default",
  },
  [RESERVABLE_CAPACITY_TYPE.unit]: {
    label: RESERVABLE_CAPACITY_LABEL[RESERVABLE_CAPACITY_TYPE.unit],
    icon: PiDoor,
    color: "default",
  },
  [RESERVABLE_CAPACITY_TYPE.building]: {
    label: RESERVABLE_CAPACITY_LABEL[RESERVABLE_CAPACITY_TYPE.building],
    icon: PiBuildings,
    color: "default",
  },
};

export type CapacitiesMode =
  (typeof RESERVABLE_CAPACITY_TYPE)[keyof typeof RESERVABLE_CAPACITY_TYPE];

export type CapacitiesScheduleType = (typeof SCHEDULE_TYPE)[keyof typeof SCHEDULE_TYPE];

/** Normalizes API/form sale-unit name (`string`) to wizard capacities mode. */
export const toCapacitiesMode = (value?: string | null): CapacitiesMode => {
  if (value === RESERVABLE_CAPACITY_TYPE.unit) return RESERVABLE_CAPACITY_TYPE.unit;
  if (value === RESERVABLE_CAPACITY_TYPE.building)
    return RESERVABLE_CAPACITY_TYPE.building;
  return RESERVABLE_CAPACITY_TYPE.bed;
};

export const getCapacitiesEntityLabel = (mode: CapacitiesMode) =>
  RESERVABLE_CAPACITY_LABEL[mode];

export const getCapacitiesPricePeriodLabel = (scheduleType?: CapacitiesScheduleType) => {
  if (scheduleType === SCHEDULE_TYPE.termic) return "ترم";
  if (scheduleType === SCHEDULE_TYPE.monthly) return "ماه";
  return "روز";
};

export const hasActiveCapacitiesFilter = (values?: Record<string, unknown> | null) => {
  if (!values) return false;

  return Object.values(values).some((value) => Array.isArray(value) && value.length > 0);
};
export const ADMISSION_CAPACITY_OCCUPANCY_STATUS = {
  vacant: "vacant",
  reserved: "reserved",
  occupied: "occupied",
} as const;

export const ADMISSION_CAPACITY_OCCUPANCY_STATUS_CONFIG = {
  [ADMISSION_CAPACITY_OCCUPANCY_STATUS.vacant]: {
    label: "بدون ساکن",
    color: "default",
  },
  [ADMISSION_CAPACITY_OCCUPANCY_STATUS.reserved]: {
    label: "رزرو شده",
    color: "gold",
  },
  [ADMISSION_CAPACITY_OCCUPANCY_STATUS.occupied]: {
    label: "دارای ساکن",
    color: "green",
  },
} as const;

//  Schedule Type based on API
export const ADMISSION_SCHEDULE_TYPE_DATA = [
  {
    id: 1,
    name: "SEMESTER",
    title: "ترمیک (دوره‌ای)",
  },
  {
    id: 2,
    name: "MONTHLY",
    title: "ماهانه",
  },
  {
    id: 3,
    name: "DAILY",
    title: "روزانه",
  },
];
