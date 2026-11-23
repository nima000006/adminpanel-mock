import jalaliMoment from "jalali-moment";
import moment from "moment";
export const convertDateToPersianDate = (date: string) => {
  return new Date(date).toLocaleDateString("fa-IR");
};

export const getHoursAndMinutesFromDate = (date: string) => {
  return new Date(date).getHours() + ":" + new Date(date).getMinutes();
};

export const convertTimezoneToStartOfDayISO = (isoDate: string): string => {
  return moment(isoDate).startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS");
};

/**
 * Converts a date string to Persian (Jalali) format with month name and time.
 * Example output: ۱۸ مهر ۱۴۰۴ , ۱۰:۲۰
 */
export const convertDateToPersianTextDateWithTime = (date: string) => {
  return jalaliMoment(date).locale("fa").format("D MMMM YYYY , HH:mm");
};

/**
 * Converts a date string to Persian (Jalali) format with month name and time.
 * Example output: ۱۸ مهر ۱۴۰۴
 */
export const convertDateToPersianTextDateWithoutHours = (date: string) => {
  return jalaliMoment(date).locale("fa").format("D MMMM YYYY");
};

/**
 * Converts a date string to Persian (Jalali) format with weekday and month name.
 * Example output: جمعه ۳۰ بهمن ۱۴۰۴
 */
export const convertDateToPersianTextDateWithWeekday = (date: string) => {
  return jalaliMoment(date).locale("fa").format("dddd D MMMM YYYY");
};
