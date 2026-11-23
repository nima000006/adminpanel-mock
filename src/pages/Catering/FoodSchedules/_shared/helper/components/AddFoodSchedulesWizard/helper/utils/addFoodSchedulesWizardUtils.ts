import dayjs from "dayjs";
import moment from "jalali-moment";

import { isOfficialHoliday } from "@components/Renderers/MultiViewCalendar/utils/iranian-holidays";
import { dayNameGenerator } from "@infra/helpers/utils";
import {
  ADD_FOOD_SCHEDULES_PATTERN,
  AddFoodSchedulesWizardScheduleDateItem,
} from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/@types/@addFoodSchedulesWizard";

/** Max date cards shown before "نمایش همه". */
export const ADD_FOOD_SCHEDULES_DATES_COLLAPSED_COUNT = 9;

export const ADD_FOOD_SCHEDULES_PATTERN_OPTIONS = [
  {
    value: ADD_FOOD_SCHEDULES_PATTERN.WEEKLY,
    label: "تکرار شونده (هفتگی)",
  },
  {
    value: ADD_FOOD_SCHEDULES_PATTERN.ONE_DAY,
    label: "فقط یک روز",
  },
] as const;

/** JS getDay() values: Sunday=0 … Saturday=6 */
export const ADD_FOOD_SCHEDULES_WEEK_DAY_OPTIONS = [
  { id: 6, title: "شنبه" },
  { id: 0, title: "یکشنبه" },
  { id: 1, title: "دوشنبه" },
  { id: 2, title: "سه‌شنبه" },
  { id: 3, title: "چهارشنبه" },
  { id: 4, title: "پنج‌شنبه" },
  { id: 5, title: "جمعه" },
];

export const ADD_FOOD_SCHEDULES_RESERVATION_DAY_OPTIONS = [
  { id: 0, title: "همان روز" },
  { id: 1, title: "یک روز قبل" },
  { id: 2, title: "دو روز قبل" },
  { id: 3, title: "سه روز قبل" },
  { id: 4, title: "چهار روز قبل" },
  { id: 5, title: "پنج روز قبل" },
  { id: 6, title: "شش روز قبل" },
  { id: 7, title: "هفت روز قبل" },
  { id: 8, title: "هشت روز قبل" },
  { id: 9, title: "نه روز قبل" },
  { id: 10, title: "ده روز قبل" },
];

export const ADD_FOOD_SCHEDULES_DATES_STEP_ALERT_DESCRIPTION =
  "در این مرحله لازم است، با توجه به الگوی برنامه غذایی انتخابی، بازه زمانی شروع و پایان رزرو و نیز زمان تحویل غذا تعیین شود.";

export const ADD_FOOD_SCHEDULES_DATES_EMPTY_DESCRIPTION =
  "برنامه‌ای برای نمایش وجود ندارد، لطفاً “روز هفته” و “شروع و پایان برنامه غذایی” را مشخص نمایید.";

export const ADD_FOOD_SCHEDULES_BASIC_SETTINGS_ALERT_DESCRIPTION =
  "در این مرحله لازم است سلف مربوطه و واحدهای دانشگاهی مجاز به رزرو این برنامه غذایی تعیین شود.";

export const ADD_FOOD_SCHEDULES_PERSONALIZATION_ALERT_DESCRIPTION =
  "در صورتی که میخواهید این برنامه غذایی توسط قشر خاصی از کاربران قابل سفارش باشد از این قابلیت استفاده نمایید.";

export const ADD_FOOD_SCHEDULES_ADD_FOOD_ALERT_DESCRIPTION =
  "در این مرحله غذاهایی را که می‌خواهید در برنامه غذایی ارائه شوند، انتخاب کنید.";

const toDateKey = (value: string | dayjs.Dayjs) => dayjs(value).format("YYYY-MM-DD");

const formatScheduleDateLabel = (dateKey: string) => {
  const dayName = dayNameGenerator(dateKey);
  const jalali = moment(dateKey).locale("fa");
  const day = jalali.format("jD");
  const month = jalali.format("jMMMM");
  const year = jalali.format("jYYYY");

  return `${dayName} ${day} ${month} ${year}`;
};

/**
 * Builds the weekly schedule date cards for the selected range + weekdays.
 * Re-runs whenever the user changes range/weekdays; `previousItems` keeps
 * soft-deleted cards (`isDeleted`) and stable ids for dates that still match.
 */
export const buildWeeklyScheduleDates = ({
  startIso,
  endIso,
  weekDays,
  previousItems = [],
}: {
  startIso: string;
  endIso: string;
  weekDays: number[];
  previousItems?: AddFoodSchedulesWizardScheduleDateItem[];
}): AddFoodSchedulesWizardScheduleDateItem[] => {
  if (!startIso || !endIso || weekDays.length === 0) {
    return [];
  }

  const start = dayjs(startIso).startOf("day");
  const end = dayjs(endIso).startOf("day");

  if (!start.isValid() || !end.isValid() || end.isBefore(start)) {
    return [];
  }

  // Index prior cards by calendar day so regenerate can reuse delete state.
  const previousByDate = new Map(
    previousItems.map((item) => [toDateKey(item.dateIso), item])
  );
  // weekDays use JS getDay() numbers (0=Sunday … 6=Saturday), same as dayjs.day().
  const weekDaySet = new Set(weekDays);
  const result: AddFoodSchedulesWizardScheduleDateItem[] = [];

  // Inclusive walk: both start and end dates must be candidates for the list.
  let cursor = start;
  while (cursor.isBefore(end) || cursor.isSame(end, "day")) {
    const jsWeekDay = cursor.day();

    if (weekDaySet.has(jsWeekDay)) {
      const dateKey = toDateKey(cursor);
      const previous = previousByDate.get(dateKey);

      result.push({
        id: previous?.id ?? dateKey,
        dateIso: dateKey,
        label: formatScheduleDateLabel(dateKey),
        isHoliday: isOfficialHoliday(cursor.toDate()),
        // Preserve soft-delete when the same day is rebuilt after range/weekday edits.
        isDeleted: previous?.isDeleted ?? false,
      });
    }

    cursor = cursor.add(1, "day");
  }

  return result;
};

export const countActiveScheduleDates = (
  items: AddFoodSchedulesWizardScheduleDateItem[]
) => items.filter((item) => !item.isDeleted).length;
