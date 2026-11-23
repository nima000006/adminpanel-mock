// Get start of week (Saturday) for a given date
export function getWeekStart(date: Date): Date {
  const dayOfWeek = (date.getDay() + 1) % 7; // Convert to Persian week (Saturday = 0)
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
}

// Get end of week (Friday) for a given date
export function getWeekEnd(date: Date): Date {
  const dayOfWeek = (date.getDay() + 1) % 7; // Convert to Persian week (Saturday = 0)
  const endOfWeek = new Date(date);
  endOfWeek.setDate(date.getDate() + (6 - dayOfWeek));
  endOfWeek.setHours(23, 59, 59, 999);
  return endOfWeek;
}

// Get array of dates for a week
export function getWeekDates(startDate: Date): Date[] {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push(date);
  }
  return dates;
}

// Check if two dates are the same day
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

// Format time for display in 24-hour format
export function formatTime(timeStr: string): string {
  const [hours, minutes] = timeStr.split(":");
  const hour24 = parseInt(hours);
  const min = parseInt(minutes);

  // Ensure 24-hour format
  return `${hour24.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
}

// Convert 12-hour time to 24-hour format (if needed)
export function convertTo24Hour(timeStr: string): string {
  // If already in 24-hour format, return as is
  if (
    !timeStr.includes("AM") &&
    !timeStr.includes("PM") &&
    !timeStr.includes("ق.ظ") &&
    !timeStr.includes("ب.ظ")
  ) {
    return formatTime(timeStr);
  }

  // Handle 12-hour format conversion
  const timeRegex = /(\d{1,2}):(\d{2})\s*(AM|PM|ق\.ظ|ب\.ظ)/i;
  const match = timeStr.match(timeRegex);

  if (!match) {
    return timeStr; // Return original if no match
  }

  const [, hourStr, minuteStr, period] = match;
  let hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);

  // Convert to 24-hour format
  if (period.toLowerCase() === "pm" || period === "ب.ظ") {
    if (hour !== 12) hour += 12;
  } else if (period.toLowerCase() === "am" || period === "ق.ظ") {
    if (hour === 12) hour = 0;
  }

  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
}

// Generate hourly time slots for display (always 24 hours)
export function generateTimeSlots(startHour = 7): string[] {
  const slots = [];

  for (let i = 0; i < 24; i++) {
    const hour = (startHour + i) % 24;
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
  }
  return slots;
}

// Generate quarter-hour time slots for drag calculations (from 00:00 to 23:45)
export function generateQuarterTimeSlots(): string[] {
  const slots = [];
  for (let hour = 0; hour <= 23; hour++) {
    // Add 15-minute intervals: 00, 15, 30, 45
    for (let quarter = 0; quarter < 4; quarter++) {
      const minutes = quarter * 15;
      slots.push(
        `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
      );
    }
  }
  return slots;
}

// Format hour decimal to time string (for drag selection display)
export function formatHourToTime(hour: number): string {
  const h = Math.floor(hour);
  const minutes = Math.round((hour % 1) * 60);
  return `${h.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

// Day starts at 7:00 AM (default)
export const DAY_START_HOUR = 7;

// Check if event needs to be split into two visual parts
export function shouldSplitEvent(
  startTime: string,
  endTime: string,
  dayStartHour: number = DAY_START_HOUR
): boolean {
  const startHour = parseInt(startTime.split(":")[0]);
  const endHour = parseInt(endTime.split(":")[0]);
  const startMinute = parseInt(startTime.split(":")[1]);
  const endMinute = parseInt(endTime.split(":")[1]);

  const startTimeDecimal = startHour + startMinute / 60;
  const endTimeDecimal = endHour + endMinute / 60;

  // Check if event wraps around midnight
  const wrapsAroundMidnight =
    startHour > endHour || (startHour === endHour && startMinute > endMinute);

  // Don't split midnight-wrapping events
  if (wrapsAroundMidnight) {
    return false;
  }

  // Split if event starts before dayStartHour but ends after it
  return startTimeDecimal < dayStartHour && endTimeDecimal > dayStartHour;
}

// Get split event parts (returns array of position objects)
export function getSplitEventPositions(
  startTime: string,
  endTime: string,
  dayStartHour: number = DAY_START_HOUR
): Array<{ top: number; height: number; startTime: string; endTime: string }> {
  const startHour = parseInt(startTime.split(":")[0]);
  const startMinute = parseInt(startTime.split(":")[1]);
  const endHour = parseInt(endTime.split(":")[0]);
  const endMinute = parseInt(endTime.split(":")[1]);

  const startTimeDecimal = startHour + startMinute / 60;
  const endTimeDecimal = endHour + endMinute / 60;

  // Part 1: From startTime to dayStartHour (shown at end of calendar)
  const part1Duration = dayStartHour - startTimeDecimal;
  const part1StartSlot = startTimeDecimal + 24 - dayStartHour;
  const part1Top = part1StartSlot * 60;
  const part1Height = Math.max(0.25, part1Duration) * 60;

  // Part 2: From dayStartHour to endTime (shown at start of calendar)
  const part2Duration = endTimeDecimal - dayStartHour;
  const part2Top = 0;
  const part2Height = Math.max(0.25, part2Duration) * 60;

  return [
    {
      top: part1Top,
      height: part1Height,
      startTime: startTime,
      endTime: `${dayStartHour.toString().padStart(2, "0")}:00`,
    },
    {
      top: part2Top,
      height: part2Height,
      startTime: `${dayStartHour.toString().padStart(2, "0")}:00`,
      endTime: endTime,
    },
  ];
}

// Convert event time to display position
export function getEventDisplayPosition(
  startTime: string,
  endTime: string,
  dayStartHour: number = DAY_START_HOUR
): { top: number; height: number } {
  const startHour = parseInt(startTime.split(":")[0]);
  const startMinute = parseInt(startTime.split(":")[1]);
  const endHour = parseInt(endTime.split(":")[0]);
  const endMinute = parseInt(endTime.split(":")[1]);

  const startTimeDecimal = startHour + startMinute / 60;
  const endTimeDecimal = endHour + endMinute / 60;

  // Check if event wraps around midnight (e.g., 22:00-06:00)
  const wrapsAroundMidnight =
    startHour > endHour || (startHour === endHour && startMinute > endMinute);

  // CASE 1: Event wraps around midnight (e.g., 22:00-06:00)
  if (wrapsAroundMidnight) {
    // Calculate position from start to end across midnight
    const hoursUntilMidnight = 24 - startTimeDecimal;
    const hoursAfterMidnight = endTimeDecimal;
    const totalDuration = hoursUntilMidnight + hoursAfterMidnight;

    // Position relative to dayStartHour
    let displayStartHour = startTimeDecimal;
    if (displayStartHour < dayStartHour) {
      displayStartHour += 24;
    }
    const startSlotPosition = displayStartHour - dayStartHour;

    const top = startSlotPosition * 60;
    const height = totalDuration * 60;

    return { top, height };
  }

  // CASE 2: Event is completely before dayStartHour (e.g., 02:00-05:00 with dayStartHour=7)
  if (startTimeDecimal < dayStartHour && endTimeDecimal <= dayStartHour) {
    // Show at the end of calendar (after the 24-hour cycle)
    const startSlotPosition = startTimeDecimal + 24 - dayStartHour;
    const duration = endTimeDecimal - startTimeDecimal;

    const top = startSlotPosition * 60;
    const height = Math.max(0.25, duration) * 60;

    return { top, height };
  }

  // CASE 3: Normal event that starts and ends after dayStartHour
  const startSlotPosition = startTimeDecimal - dayStartHour;
  const duration = endTimeDecimal - startTimeDecimal;

  const top = startSlotPosition * 60;
  const height = Math.max(0.25, duration) * 60;

  return { top, height };
}

// Convert display hour (from time slot) to actual time slot index
export function getTimeSlotIndex(
  hour: number,
  dayStartHour: number = DAY_START_HOUR
): number {
  let index = hour - dayStartHour;
  if (index < 0) {
    index += 24;
  }
  return index;
}

// Convert Date to date string in YYYY-MM-DD format
// Uses local date components to avoid timezone issues
export function dateToString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Convert date string (YYYY-MM-DD) to Date object at noon to avoid timezone issues
export function stringToDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day, 12, 0, 0, 0); // Set to noon to avoid timezone issues
  return date;
}

/**
 * بررسی اینکه آیا یک رویداد تکرارشونده باید در یک تاریخ خاص نمایش داده شود
 * با توجه به تاریخ شروع و پایان تکرار
 */
export function shouldShowRecurringEvent(
  recurringStartDate: string | undefined,
  recurringEndDate: string | undefined,
  checkDate: Date
): boolean {
  // اگر تاریخ شروع یا پایان مشخص نشده، نمایش داده نمی‌شود
  if (!recurringStartDate || !recurringEndDate) {
    return false;
  }

  const startDate = stringToDate(recurringStartDate);
  const endDate = stringToDate(recurringEndDate);

  // Set all times to noon for accurate comparison
  const checkDateNoon = new Date(checkDate);
  checkDateNoon.setHours(12, 0, 0, 0);

  // بررسی اینکه checkDate در بازه [startDate, endDate] باشد
  return checkDateNoon >= startDate && checkDateNoon <= endDate;
}
