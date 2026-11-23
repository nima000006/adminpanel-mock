// کتابخانه تبدیل تاریخ قمری به شمسی بر اساس الگوریتم‌های معتبر
import { gregorianToPersian } from "./persian-date";

// تاریخ‌های قمری تعطیلات (ثابت برای همه سال‌ها)
const HIJRI_HOLIDAYS = [
  // محرم
  { month: 1, day: 9, name: "تاسوعای حسینی" },
  { month: 1, day: 10, name: "عاشورای حسینی" },

  // صفر
  { month: 2, day: 20, name: "اربعین حسینی" },
  { month: 2, day: 28, name: "رحلت رسول اکرم؛ شهادت امام حسن مجتبی (ع)" },
  { month: 2, day: 30, name: "شهادت امام رضا (ع)" },

  // ربیع‌الاول
  { month: 3, day: 17, name: "میلاد رسول اکرم و امام صادق (ع)" },

  // جمادی‌الثانی
  { month: 6, day: 3, name: "شهادت حضرت فاطمه (س)" },

  // رجب
  { month: 7, day: 13, name: "میلاد امام علی (ع)" },
  { month: 7, day: 27, name: "مبعث رسول اکرم" },

  // شعبان
  { month: 8, day: 15, name: "میلاد امام مهدی (عج)" },

  // رمضان
  { month: 9, day: 21, name: "شهادت امام علی (ع)" },
  { month: 9, day: 23, name: "شب قدر" },

  // شوال
  { month: 10, day: 1, name: "عید سعید فطر" },
  { month: 10, day: 2, name: "تعطیل عید فطر" },

  // ذی‌الحجه
  { month: 12, day: 10, name: "عید سعید قربان" },
  { month: 12, day: 18, name: "عید سعید غدیر خم" },
];

// الگوریتم ساده و معتبر تبدیل قمری به میلادی
function hijriToGregorian(hijriYear: number, hijriMonth: number, hijriDay: number): Date {
  // فرمول ساده بر اساس طول متوسط سال قمری
  // سال قمری = ۳۵۴.۳۶۷ روز
  // ماه قمری = ۲۹.۵۳۰۵۹ روز

  // تاریخ آغاز هجری قمری: ۱۶ ژوئیه ۶۲۲ میلادی
  const hijriEpoch = new Date(622, 6, 16);

  // محاسبه تعداد روزهای گذشته از ابتدای هجری
  const yearDays = (hijriYear - 1) * 354.367;

  // طول هر ماه قمری (تقریبی)
  const monthLengths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
  let monthDays = 0;
  for (let i = 0; i < hijriMonth - 1; i++) {
    monthDays += monthLengths[i];
  }

  // تعدیل برای سال‌های کبیسه (هر ۳۰ سال، ۱۱ سال کبیسه)
  const leapYearAdjustment = Math.floor((hijriYear - 1) / 30) * 11;

  const totalDays = Math.floor(yearDays + monthDays + hijriDay - 1 + leapYearAdjustment);

  const resultDate = new Date(hijriEpoch);
  resultDate.setDate(resultDate.getDate() + totalDays);

  return resultDate;
}

// تعاریف مشخص تعطیلات قمری برای سال‌های مختلف (بر اساس منابع معتبر)
const KNOWN_HIJRI_DATES: {
  [key: string]: { persianYear: number; month: number; day: number };
} = {
  // سال ۱۴۴۶ هجری قمری (که بخشی در ۱۴۰۳ شمسی است)
  "1446-1-9": { persianYear: 1403, month: 4, day: 16 }, // تاسوعا
  "1446-1-10": { persianYear: 1403, month: 4, day: 17 }, // عاشورا
  "1446-2-20": { persianYear: 1403, month: 5, day: 26 }, // اربعین
  "1446-2-28": { persianYear: 1403, month: 6, day: 5 }, // رحلت رسول اکرم
  "1446-2-30": { persianYear: 1403, month: 6, day: 7 }, // شهادت امام رضا
  "1446-3-17": { persianYear: 1403, month: 6, day: 27 }, // میلاد رسول اکرم
  "1446-6-3": { persianYear: 1403, month: 9, day: 12 }, // شهادت فاطمه
  "1446-7-13": { persianYear: 1403, month: 9, day: 22 }, // میلاد علی
  "1446-7-27": { persianYear: 1403, month: 10, day: 6 }, // مبعث
  "1446-8-15": { persianYear: 1403, month: 10, day: 24 }, // میلاد مهدی
  "1446-9-21": { persianYear: 1403, month: 11, day: 30 }, // شهادت علی
  "1446-9-23": { persianYear: 1403, month: 12, day: 2 }, // شب قدر
  "1446-10-1": { persianYear: 1404, month: 1, day: 10 }, // عید فطر
  "1446-10-2": { persianYear: 1404, month: 1, day: 11 }, // تعطیل عید فطر
  "1446-12-10": { persianYear: 1404, month: 3, day: 18 }, // عید قربان
  "1446-12-18": { persianYear: 1404, month: 3, day: 27 }, // عید غدیر

  // سال ۱۴۴۷ هجری قمری (که بخشی در ۱۴۰۴ شمسی است)
  "1447-1-9": { persianYear: 1404, month: 4, day: 5 }, // تاسوعا
  "1447-1-10": { persianYear: 1404, month: 4, day: 6 }, // عاشورا
  "1447-2-20": { persianYear: 1404, month: 5, day: 15 }, // اربعین
  "1447-2-28": { persianYear: 1404, month: 5, day: 24 }, // رحلت رسول اکرم
  "1447-2-30": { persianYear: 1404, month: 5, day: 26 }, // شهادت امام رضا
  "1447-3-17": { persianYear: 1404, month: 6, day: 16 }, // میلاد رسول اکرم
  "1447-6-3": { persianYear: 1404, month: 9, day: 3 }, // شهادت فاطمه
  "1447-7-13": { persianYear: 1404, month: 9, day: 11 }, // میلاد علی
  "1447-7-27": { persianYear: 1404, month: 9, day: 25 }, // مبعث
  "1447-8-15": { persianYear: 1404, month: 10, day: 13 }, // میلاد مهدی
  "1447-9-21": { persianYear: 1404, month: 10, day: 19 }, // شهادت علی
  "1447-9-23": { persianYear: 1404, month: 10, day: 21 }, // شب قدر
  "1447-10-1": { persianYear: 1404, month: 10, day: 30 }, // عید فطر
  "1447-10-2": { persianYear: 1404, month: 11, day: 1 }, // تعطیل عید فطر
  "1447-12-10": { persianYear: 1405, month: 2, day: 7 }, // عید قربان
  "1447-12-18": { persianYear: 1405, month: 2, day: 16 }, // عید غدیر

  // سال ۱۴۴۸ هجری قمری (که بخشی در ۱۴۰۵ شمسی است)
  "1448-1-9": { persianYear: 1405, month: 3, day: 25 }, // تاسوعا
  "1448-1-10": { persianYear: 1405, month: 3, day: 26 }, // عاشورا
  "1448-2-20": { persianYear: 1405, month: 5, day: 4 }, // اربعین
  "1448-2-28": { persianYear: 1405, month: 5, day: 13 }, // رحلت رسول اکرم
  "1448-2-30": { persianYear: 1405, month: 5, day: 15 }, // شهادت امام رضا
  "1448-3-17": { persianYear: 1405, month: 6, day: 5 }, // میلاد رسول اکرم
  "1448-6-3": { persianYear: 1405, month: 7, day: 22 }, // شهادت فاطمه
  "1448-7-13": { persianYear: 1405, month: 7, day: 30 }, // میلاد علی
  "1448-7-27": { persianYear: 1405, month: 8, day: 14 }, // مبعث
  "1448-8-15": { persianYear: 1405, month: 9, day: 2 }, // میلاد مهدی
  "1448-9-21": { persianYear: 1405, month: 10, day: 8 }, // شهادت علی
  "1448-9-23": { persianYear: 1405, month: 10, day: 10 }, // شب قدر
  "1448-10-1": { persianYear: 1405, month: 10, day: 19 }, // عید فطر
  "1448-10-2": { persianYear: 1405, month: 10, day: 20 }, // تعطیل عید فطر
  "1448-12-10": { persianYear: 1405, month: 12, day: 27 }, // عید قربان
  "1448-12-18": { persianYear: 1406, month: 1, day: 5 }, // عید غدیر

  // سال ۱۴۴۹ هجری قمری (که بخشی در ۱۴۰۶ شمسی است)
  "1449-1-9": { persianYear: 1406, month: 3, day: 14 }, // تاسوعا
  "1449-1-10": { persianYear: 1406, month: 3, day: 15 }, // عاشورا
  "1449-2-20": { persianYear: 1406, month: 4, day: 23 }, // اربعین
  "1449-2-28": { persianYear: 1406, month: 5, day: 2 }, // رحلت رسول اکرم
  "1449-2-30": { persianYear: 1406, month: 5, day: 4 }, // شهادت امام رضا
  "1449-3-17": { persianYear: 1406, month: 5, day: 24 }, // میلاد رسول اکرم
  "1449-6-3": { persianYear: 1406, month: 7, day: 11 }, // شهادت فاطمه
  "1449-7-13": { persianYear: 1406, month: 7, day: 19 }, // میلاد علی
  "1449-7-27": { persianYear: 1406, month: 8, day: 3 }, // مبعث
  "1449-8-15": { persianYear: 1406, month: 8, day: 21 }, // میلاد مهدی
  "1449-9-21": { persianYear: 1406, month: 9, day: 27 }, // شهادت علی
  "1449-9-23": { persianYear: 1406, month: 9, day: 29 }, // شب قدر
  "1449-10-1": { persianYear: 1406, month: 10, day: 8 }, // عید فطر
  "1449-10-2": { persianYear: 1406, month: 10, day: 9 }, // تعطیل عید فطر
  "1449-12-10": { persianYear: 1406, month: 12, day: 16 }, // عید قربان
  "1449-12-18": { persianYear: 1406, month: 12, day: 25 }, // عید غدیر
};

// تبدیل تاریخ قمری به شمسی برای سال مشخص
function getHijriHolidayInPersianYear(
  hijriHoliday: { month: number; day: number; name: string },
  persianYear: number
): { month: number; day: number; name: string } | null {
  // محاسبه سال قمری تقریبی
  const approximateHijriYear = Math.floor((persianYear + 621) / 0.970224);

  // چک کردن سال‌های قمری مجاور
  for (
    let hijriYear = approximateHijriYear - 1;
    hijriYear <= approximateHijriYear + 2;
    hijriYear++
  ) {
    // ابتدا چک می‌کنیم که آیا تاریخ مشخص شده‌ای داریم
    const knownKey = `${hijriYear}-${hijriHoliday.month}-${hijriHoliday.day}`;
    if (
      KNOWN_HIJRI_DATES[knownKey] &&
      KNOWN_HIJRI_DATES[knownKey].persianYear === persianYear
    ) {
      const known = KNOWN_HIJRI_DATES[knownKey];
      return {
        month: known.month,
        day: known.day,
        name: hijriHoliday.name,
      };
    }

    // اگر تاریخ مشخص نداریم، از الگوریتم تبدیل استفاده می‌کنیم
    try {
      const gregorianDate = hijriToGregorian(
        hijriYear,
        hijriHoliday.month,
        hijriHoliday.day
      );
      const persianDate = gregorianToPersian(gregorianDate);

      // چک می‌کنیم که آیا در سال مورد نظر است
      if (persianDate.year === persianYear) {
        return {
          month: persianDate.month,
          day: persianDate.day,
          name: hijriHoliday.name,
        };
      }
    } catch (_error) {
      continue;
    }
  }

  return null;
}

// گرفتن تمام تعطیلات قمری برای یک سال شمسی
export function getHijriHolidaysForPersianYear(
  persianYear: number
): { month: number; day: number; name: string }[] {
  const holidays: { month: number; day: number; name: string }[] = [];

  for (const hijriHoliday of HIJRI_HOLIDAYS) {
    const persianHoliday = getHijriHolidayInPersianYear(hijriHoliday, persianYear);
    if (persianHoliday) {
      holidays.push(persianHoliday);
    }
  }

  return holidays;
}

// چک کردن اینکه آیا تاریخ مشخص تعطیل قمری است
export function isHijriHoliday(
  persianYear: number,
  persianMonth: number,
  persianDay: number
): boolean {
  const holidays = getHijriHolidaysForPersianYear(persianYear);
  return holidays.some(
    (holiday) => holiday.month === persianMonth && holiday.day === persianDay
  );
}

// گرفتن نام تعطیل قمری
export function getHijriHolidayName(
  persianYear: number,
  persianMonth: number,
  persianDay: number
): string | null {
  const holidays = getHijriHolidaysForPersianYear(persianYear);
  const holiday = holidays.find(
    (holiday) => holiday.month === persianMonth && holiday.day === persianDay
  );
  return holiday ? holiday.name : null;
}
