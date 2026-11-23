import dayjs from "dayjs";
import moment from "jalali-moment";

export const dateParseToPersianDate = (
  date: string | number | undefined | null,
  customFormat?: string,
  hasSpecialTime?: boolean
) => {
  if (!date) return "";
  try {
    if (!hasSpecialTime) {
      return moment(date)
        .locale("fa")
        .format(customFormat ? customFormat : "YYYY/M/D");
    } else {
      return moment(date)
        .utcOffset("+00:00")
        .locale("fa")
        .format(customFormat ? customFormat : "YYYY/M/D");
    }
  } catch (_) {
    return "";
  }
};

export const dateGenerator: (date?: Date) => string = (date = new Date()) =>
  moment(date).utcOffset(0, true).format();

export const rawTimeConvertor = (time?: string) => {
  if (!time) return;
  return dayjs(time, "HH:mm")?.add(3, "hour")?.add(30, "minute");
};

export const timeDefaultValueGenerator = (time?: string) => {
  if (!time) return;
  return dayjs(time, "HH:mm");
};

export const intlDate = (date: string) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "Invalid Date"; // تاریخ نامعتبر
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(d);
};

const weekday = ["یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"];
export const dayNameGenerator = (date: string) => {
  return weekday?.[moment(date)?.weekday()];
};

export const getPersianDateText = (date?: string | null) => {
  if (!date || !moment(date).isValid()) {
    return "تاریخ نامعتبر";
  }

  const m = moment(date).locale("fa");
  const day = m.jDate();
  const month = m.format("jMMMM");

  return `${day} ${month}`;
};
