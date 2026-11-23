import { CalendarEvent } from "../types";
import { SimpleEventCard } from "./SimpleEventCard";
import { cn } from "../utils/cn";
import { isOfficialHoliday, getHolidayName } from "../utils/iranian-holidays";
import {
  PERSIAN_WEEKDAYS,
  PERSIAN_MONTHS,
  gregorianToPersian,
  englishToPersianNumbers,
  getPersianMonthDays,
  persianToGregorian,
} from "../utils/persian-date";

interface MonthlyViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  getEventsForDate: (date: Date) => CalendarEvent[];
  onEventClick: (event: CalendarEvent, clickedDate?: string) => void;
  onDayClick?: (date: Date) => void;
}

export function MonthlyView({
  currentDate,
  getEventsForDate,
  onEventClick,
  onDayClick,
}: MonthlyViewProps) {
  const today = new Date();
  const persianDate = gregorianToPersian(currentDate);
  const todayPersian = gregorianToPersian(today);

  // Get first day of the Persian month
  const firstDayOfMonth = persianToGregorian({ ...persianDate, day: 1 });
  const firstDayWeekday = (firstDayOfMonth.getDay() + 1) % 7; // Convert to Persian week (Saturday = 0)

  // Get number of days in current Persian month
  const daysInMonth = getPersianMonthDays(persianDate.year, persianDate.month);

  // Get previous month info
  const prevMonth = persianDate.month === 1 ? 12 : persianDate.month - 1;
  const prevYear = persianDate.month === 1 ? persianDate.year - 1 : persianDate.year;
  const daysInPrevMonth = getPersianMonthDays(prevYear, prevMonth);

  // Generate calendar days (6 weeks = 42 days)
  const calendarDays = [];

  // Previous month's trailing days
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const date = persianToGregorian({ year: prevYear, month: prevMonth, day });
    calendarDays.push({
      date,
      day,
      persianDate: { year: prevYear, month: prevMonth, day },
      isCurrentMonth: false,
    });
  }

  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = persianToGregorian({ ...persianDate, day });
    calendarDays.push({
      date,
      day,
      persianDate: { ...persianDate, day },
      isCurrentMonth: true,
    });
  }

  // Next month's leading days
  const nextMonth = persianDate.month === 12 ? 1 : persianDate.month + 1;
  const nextYear = persianDate.month === 12 ? persianDate.year + 1 : persianDate.year;
  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    const date = persianToGregorian({ year: nextYear, month: nextMonth, day });
    calendarDays.push({
      date,
      day,
      persianDate: { year: nextYear, month: nextMonth, day },
      isCurrentMonth: false,
    });
  }

  return (
    <div
      className="border-border bg-card shadow-border/10 overflow-hidden rounded-2xl border shadow-xl transition-all duration-300"
      dir="rtl"
    >
      {/* Month header - Enhanced with modern styling */}
      <div className="border-border from-muted via-card relative overflow-hidden border-b bg-linear-to-br to-blue-50/30 p-6">
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-linear-to-br from-blue-400/10 to-indigo-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-linear-to-br from-emerald-400/10 to-cyan-400/10 blur-2xl" />

        <div className="relative flex items-center justify-center gap-3">
          <h2 className="text-foreground text-center text-2xl font-black tracking-tight">
            {PERSIAN_MONTHS[persianDate.month - 1]}{" "}
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {englishToPersianNumbers(persianDate.year.toString())}
            </span>
          </h2>
        </div>
      </div>

      {/* Weekday headers - Enhanced */}
      <div className="border-border from-muted to-card grid grid-cols-7 border-b bg-linear-to-b">
        {PERSIAN_WEEKDAYS.map((weekday, index) => (
          <div
            key={weekday}
            className={cn(
              "border-border border-l p-3 text-center text-sm font-bold transition-colors last:border-l-0",
              index === 6
                ? "bg-red-50/50 text-red-600"
                : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
            )}
          >
            {weekday}
          </div>
        ))}
      </div>

      {/* Calendar grid - Enhanced */}
      <div className="p-4!">
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((calendarDay, index) => {
            const isToday =
              calendarDay.persianDate.year === todayPersian.year &&
              calendarDay.persianDate.month === todayPersian.month &&
              calendarDay.persianDate.day === todayPersian.day;
            const dayEvents = getEventsForDate(calendarDay.date);
            const isHoliday = isOfficialHoliday(calendarDay.date);
            const holidayName = getHolidayName(calendarDay.date);
            const weekdayIndex = (calendarDay.date.getDay() + 1) % 7;
            const isWeekend = weekdayIndex === 6; // Friday only

            return (
              <div
                key={index}
                className={cn(
                  "group relative min-h-[120px] cursor-pointer overflow-hidden rounded-xl border p-2! transition-all duration-200",
                  calendarDay.isCurrentMonth
                    ? "bg-card hover:shadow-border/5 hover:shadow-lg"
                    : "bg-muted/50 hover:bg-muted/80",
                  isToday &&
                    "border-blue-500 bg-blue-50/50 shadow-lg ring-2 shadow-blue-500/10 ring-blue-500/20",
                  isHoliday &&
                    !isToday &&
                    "border-red-200 bg-linear-to-br from-red-50 to-rose-50",
                  isWeekend && !isHoliday && !isToday && "bg-red-50/30"
                )}
                role="button"
                tabIndex={0}
                aria-label={`${englishToPersianNumbers(calendarDay.day.toString())} ${PERSIAN_MONTHS[calendarDay.persianDate.month - 1]}${holidayName ? ` - ${holidayName}` : ""}${dayEvents.length > 0 ? ` - ${englishToPersianNumbers(dayEvents.length.toString())} رویداد` : ""}`}
                onClick={() => onDayClick?.(calendarDay.date)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onDayClick?.(calendarDay.date);
                  }
                }}
              >
                {/* Date number with improved styling */}
                <div className="mb-1 flex items-center justify-between">
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-lg text-sm font-bold transition-all",
                      !calendarDay.isCurrentMonth && "text-gray-400",
                      isToday &&
                        "bg-linear-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30",
                      !isToday && isHoliday && "bg-red-100 text-red-600",
                      !isToday && isWeekend && !isHoliday && "text-red-500",
                      !isToday &&
                        !isHoliday &&
                        !isWeekend &&
                        calendarDay.isCurrentMonth &&
                        "group-hover:bg-blue-100 group-hover:text-blue-600"
                    )}
                  >
                    {englishToPersianNumbers(calendarDay.day.toString())}
                  </span>

                  {/* Today indicator */}
                  {isToday && (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                    </span>
                  )}
                </div>

                {/* Holiday name badge */}
                {isHoliday && holidayName && (
                  <div className="mb-1 truncate rounded-md bg-red-100 px-1.5 py-0.5 text-[10px] font-medium text-red-700">
                    {holidayName}
                  </div>
                )}

                {/* Events - Enhanced */}
                <div className="space-y-1">
                  {dayEvents.slice(0, 1).map((event) => {
                    const dateStr = `${calendarDay.date.getFullYear()}-${String(
                      calendarDay.date.getMonth() + 1
                    ).padStart(2, "0")}-${String(calendarDay.date.getDate()).padStart(
                      2,
                      "0"
                    )}`;

                    return (
                      <SimpleEventCard
                        key={event.id}
                        event={event}
                        onClick={(e) => {
                          e?.stopPropagation();
                          onEventClick(event, dateStr);
                        }}
                        showTime={true}
                        compact={true}
                        className="h-auto!"
                      />
                    );
                  })}

                  {/* More events indicator - Enhanced */}
                  {dayEvents.length > 1 && (
                    <div className="flex items-center justify-end gap-1 rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600 transition-colors group-hover:bg-blue-100 group-hover:text-blue-700">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <span>
                        {englishToPersianNumbers((dayEvents.length - 1).toString())} مورد
                        دیگر
                      </span>
                    </div>
                  )}
                </div>

                {/* Hover effect overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-br from-blue-500/0 via-transparent to-blue-500/0 opacity-0 transition-opacity group-hover:opacity-5" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
