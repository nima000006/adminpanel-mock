import {
  getHijriHolidaysForPersianYear,
  isHijriHoliday,
  getHijriHolidayName,
} from "./hijri-converter";
import { PersianDate, persianToGregorian, gregorianToPersian } from "./persian-date";

// تعطیلات شمسی ثابت (بر اساس تقویم شمسی)
// این تعطیلات بر اساس تعطیلات رسمی کشور ایران تنظیم شده‌اند
const SOLAR_HOLIDAYS = [
  { month: 1, day: 1, name: "عید نوروز" },
  { month: 1, day: 2, name: "عید نوروز" },
  { month: 1, day: 3, name: "عید نوروز" },
  { month: 1, day: 4, name: "عید نوروز" },
  { month: 1, day: 12, name: "روز جمهوری اسلامی ایران" },
  { month: 1, day: 13, name: "سیزده بدر" },
  { month: 3, day: 14, name: "رحلت حضرت امام خمینی (ره)" },
  { month: 3, day: 15, name: "قیام ۱۵ خرداد" },
  { month: 11, day: 22, name: "پیروزی انقلاب اسلامی" },
  { month: 12, day: 29, name: "روز ملی شدن صنعت نفت ایران" },
];

// چک کردن اینکه آیا روزی جمعه است
export function isFriday(date: Date): boolean {
  return date.getDay() === 5; // Friday in JavaScript Date
}

// چک کردن اینکه آیا روزی تعطیل شمسی است
export function isSolarHoliday(persianDate: PersianDate): boolean {
  return SOLAR_HOLIDAYS.some(
    (holiday) => holiday.month === persianDate.month && holiday.day === persianDate.day
  );
}

// چک کردن اینکه آیا روزی تعطیل قمری است (با استفاده از تبدیل‌گر قمری)
export function isLunarHoliday(persianDate: PersianDate): boolean {
  return isHijriHoliday(persianDate.year, persianDate.month, persianDate.day);
}

// چک کردن اینکه آیا روزی تعطیل رسمی است
export function isOfficialHoliday(date: Date): boolean {
  const persianDate = gregorianToPersian(date);
  return isFriday(date) || isSolarHoliday(persianDate) || isLunarHoliday(persianDate);
}

// گرفتن نام تعطیل (اگر تعطیل باشد)
export function getHolidayName(date: Date): string | null {
  const persianDate = gregorianToPersian(date);

  if (isFriday(date)) {
    return "جمعه";
  }

  // چک کردن تعطیلات شمسی
  const solarHoliday = SOLAR_HOLIDAYS.find(
    (holiday) => holiday.month === persianDate.month && holiday.day === persianDate.day
  );
  if (solarHoliday) {
    return solarHoliday.name;
  }

  // چک کردن تعطیلات قمری
  const hijriHolidayName = getHijriHolidayName(
    persianDate.year,
    persianDate.month,
    persianDate.day
  );
  if (hijriHolidayName) {
    return hijriHolidayName;
  }

  return null;
}

// گرفتن تمام تعطیلات یک ماه
export function getMonthHolidays(
  year: number,
  month: number
): { day: number; name: string; type: "solar" | "lunar" | "friday" }[] {
  const holidays: { day: number; name: string; type: "solar" | "lunar" | "friday" }[] =
    [];

  // تعطیلات شمسی
  SOLAR_HOLIDAYS.forEach((holiday) => {
    if (holiday.month === month) {
      holidays.push({
        day: holiday.day,
        name: holiday.name,
        type: "solar",
      });
    }
  });

  // تعطیلات قمری
  const hijriHolidays = getHijriHolidaysForPersianYear(year);
  hijriHolidays.forEach((holiday) => {
    if (holiday.month === month) {
      holidays.push({
        day: holiday.day,
        name: holiday.name,
        type: "lunar",
      });
    }
  });

  // جمعه‌ها - باید روزهای ماه را چک کنیم
  for (let day = 1; day <= 31; day++) {
    try {
      const gregorianDate = persianToGregorian({ year, month, day });
      if (isFriday(gregorianDate)) {
        holidays.push({
          day,
          name: "جمعه",
          type: "friday",
        });
      }
    } catch {
      // روز نامعتبر، ادامه می‌دهیم
      break;
    }
  }

  return holidays.sort((a, b) => a.day - b.day);
}
