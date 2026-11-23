// Persian Solar Calendar Utilities
// Uses jalali-moment for reliable date conversions
import moment from "jalali-moment";

export interface PersianDate {
  year: number;
  month: number;
  day: number;
}

export const PERSIAN_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export const PERSIAN_WEEKDAYS = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
];

export const PERSIAN_WEEKDAYS_SHORT = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

// Check if Persian year is leap year using jalali-moment
export function isPersianLeapYear(year: number): boolean {
  return moment(`${year}/1/1`, "jYYYY/jM/jD").jIsLeapYear();
}

// Get number of days in Persian month
export function getPersianMonthDays(year: number, month: number): number {
  // Create a moment for the first day of the month and get days in month
  const m = moment(`${year}/${month}/1`, "jYYYY/jM/jD");
  return m.jDaysInMonth();
}

// Convert Gregorian to Persian using jalali-moment
export function gregorianToPersian(gDate: Date): PersianDate {
  const m = moment(gDate);
  return {
    year: m.jYear(),
    month: m.jMonth() + 1, // jalali-moment months are 0-indexed
    day: m.jDate(),
  };
}

// Convert Persian to Gregorian using jalali-moment
export function persianToGregorian(pDate: PersianDate): Date {
  const { year, month, day } = pDate;
  const m = moment(`${year}/${month}/${day}`, "jYYYY/jM/jD");
  return m.toDate();
}

// Format Persian date as string
export function formatPersianDate(pDate: PersianDate): string {
  return `${pDate.day} ${PERSIAN_MONTHS[pDate.month - 1]} ${pDate.year}`;
}

// Get Persian weekday from Date
export function getPersianWeekday(date: Date): number {
  // Saturday is 0 in Persian calendar (not Sunday like Gregorian)
  // JavaScript: Sunday=0, Monday=1, Tuesday=2, Wednesday=3, Thursday=4, Friday=5, Saturday=6
  // Persian: Saturday=0, Sunday=1, Monday=2, Tuesday=3, Wednesday=4, Thursday=5, Friday=6
  const jsDay = date.getDay();
  return jsDay === 6 ? 0 : jsDay + 1;
}

// Convert Persian numbers to English
export function persianToEnglishNumbers(str: string): string {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  let result = str;
  for (let i = 0; i < persianNumbers.length; i++) {
    result = result.replace(new RegExp(persianNumbers[i], "g"), englishNumbers[i]);
  }
  return result;
}

// Convert English numbers to Persian
export function englishToPersianNumbers(str: string | number): string {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  // Convert to string if it's a number
  let result = typeof str === "number" ? str.toString() : str;

  for (let i = 0; i < englishNumbers.length; i++) {
    result = result.replace(new RegExp(englishNumbers[i], "g"), persianNumbers[i]);
  }
  return result;
}

/**
 * تبدیل رشته تاریخ میلادی (YYYY-MM-DD) به فرمت شمسی قابل خواندن
 * مثال: "2024-10-28" -> "۷ آبان ۱۴۰۳"
 */
export function gregorianToReadablePersian(dateString: string): string {
  try {
    // Parse the date string
    const parts = dateString.split("-");
    if (parts.length !== 3) {
      return dateString; // Return original if format is invalid
    }

    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // JavaScript months are 0-indexed
    const day = parseInt(parts[2]);

    // Create date at noon to avoid timezone issues
    const gregorianDate = new Date(year, month, day, 12, 0, 0, 0);

    // Convert to Persian
    const persianDate = gregorianToPersian(gregorianDate);

    // Format: "روز ماه سال" with Persian numbers
    const dayPersian = englishToPersianNumbers(persianDate.day);
    const monthName = PERSIAN_MONTHS[persianDate.month - 1];
    const yearPersian = englishToPersianNumbers(persianDate.year);

    return `${dayPersian} ${monthName} ${yearPersian}`;
  } catch (error) {
    console.error("Error converting date to Persian:", error);
    return dateString;
  }
}

/**
 * تبدیل رشته تاریخ میلادی به فرمت شمسی کوتاه
 * مثال: "2024-10-28" -> "۱۴۰۳/۰۸/۰۷"
 */
export function gregorianToShortPersian(dateString: string): string {
  try {
    const parts = dateString.split("-");
    if (parts.length !== 3) {
      return dateString;
    }

    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const day = parseInt(parts[2]);

    const gregorianDate = new Date(year, month, day, 12, 0, 0, 0);
    const persianDate = gregorianToPersian(gregorianDate);

    const yearStr = persianDate.year.toString();
    const monthStr = persianDate.month.toString().padStart(2, "0");
    const dayStr = persianDate.day.toString().padStart(2, "0");

    return englishToPersianNumbers(`${yearStr}/${monthStr}/${dayStr}`);
  } catch (error) {
    console.error("Error converting date to short Persian:", error);
    return dateString;
  }
}
