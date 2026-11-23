import dayjs from "dayjs";
import moment, { Moment } from "jalali-moment";

/*Do not change order of items, because for checking in `MultiFoodMultiDayAllFoodScheduleListsAddFoodTableModel`,
 `MyMultiFoodMultiDayAllFoodScheduleListsAddFoodModalContent` components and also in editing mode of them the order is important. */
export const foodScheduleTypeData = [
  {
    id: 0,
    title: "دانشجویی",
  },
  {
    id: 1,
    title: "آزاد",
  },
  {
    id: 2,
    title: "روزفروش",
  },
];

export const hasLimit = [
  {
    id: 1,
    title: "دارای محدودیت",
  },
  {
    id: 2,
    title: "بدون محدودیت",
  },
];

export const reservationDaysList = [
  {
    id: 0,
    title: "همان روز",
  },
  {
    id: 1,
    title: "یک روز قبل",
  },
  {
    id: 2,
    title: "دو روز قبل",
  },
  {
    id: 3,
    title: "سه روز قبل",
  },
  {
    id: 4,
    title: "چهار روز قبل",
  },
  {
    id: 5,
    title: "پنج روز قبل",
  },
  {
    id: 6,
    title: "شش روز قبل",
  },
  {
    id: 7,
    title: "هفت روز قبل",
  },
  {
    id: 8,
    title: "هشت روز قبل",
  },
  {
    id: 9,
    title: "نه روز قبل",
  },
  {
    id: 10,
    title: "ده روز قبل",
  },
];

export const dateCreator = (data: string | Date | Moment, time: string | dayjs.Dayjs) => {
  return (
    moment(data).format("YYYY-MM-DD") + "T" + dayjs(time).format("HH:mm:ss") + ".00Z"
  );
};

export const hasSpecialTimeDateCreator = (date?: string) => {
  if (date) {
    const time = resetUtc(date);

    if (
      (dayjs(time).get("hour") >= 20 && dayjs(time).get("minute") >= 30) ||
      dayjs(time).get("hour") >= 21
    ) {
      return moment(date).subtract(1, "day");
    } else {
      return moment(date);
    }
  }
};

export const resetUtc = (date: string) => dayjs(date).utcOffset("+00:00");

//! Error messages
export const FOOD_ORDER_MAX_TOTAL_COUNT_PER_PERSON_LESS_THAN_MAX_COUNT_ERR0R_MSG =
  "حداکثر تعداد سفارشات هر نفر باید کمتر از تعداد حداکثر سفارشات باشد.";

export const FOOD_ORDER_MAX_COUNT_MORE_THAN_MAX_TOTAL_COUNT_PER_PERSON_ERR0R_MSG =
  " حداکثر سفارشات باید بزرگتر از حداکثر تعداد سفارشات هر نفر باشد.";

export const CREATE_NEW_FOOD_SUCCESS_MSG = "برنامه غذایی با موفقیت ثبت شد.";

export const FOOD_SCHEDULE_BULK_PLANS_DRAWER_ALERT_MSG =
  "از طریق این صفحه می‌توانید برای چندین روز برنامه غذایی تعریف کنید.";

export const MULTI_FOOD_MULTI_DAY_PLANS_DRAWER_ALERT_MSG =
  "از طریق فرم زیر امکان تعریف غذاهای مختلف در چندین تاریخ مختلف را خواهید داشت.";

export const RESERVE_DATE_AFTER_RESERVATION_END_DATE =
  "تاریخ برنامه غذایی باید بعد از پایان تاریخ رزرو باشد.";

export const RESERVATION_END_DATE_BEFORE_RESERVE_DATE =
  "پایان تاریخ رزرو باید قبل از تاریخ برنامه غذایی باشد.";

export const FOOD_MIN_PRICE_ERROR_MSG = "قیمت وارد شده کمتر از مقدار مجاز می باشد. ";
export const FOOD_MAX_PRICE_ERROR_MSG = "قیمت وارد شده بیشتر از قیمت مجاز می باشد.";
export const UPDATE_FOOD_SUCCESS_MSG = "برنامه غذایی با موفقیت ویرایش شد.";
