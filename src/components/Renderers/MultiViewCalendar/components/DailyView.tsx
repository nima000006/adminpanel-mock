import { useRef, useEffect, useState } from "react";

import { CalendarEvent } from "../types";
import { SimpleEventCard } from "./SimpleEventCard";
import { useDragSelection, DragSelection } from "../hooks/useDragSelection";
import { cn } from "../utils/cn";
import { generateTimeSlots, isSameDay, dateToString } from "../utils/date-helpers";
import {
  getTimePosition,
  calculateOverlapLayout,
  getEventLayoutStyle,
} from "../utils/event-layout";
import { isOfficialHoliday, getHolidayName } from "../utils/iranian-holidays";
import {
  PERSIAN_WEEKDAYS,
  gregorianToPersian,
  englishToPersianNumbers,
  formatPersianDate,
} from "../utils/persian-date";

interface DailyViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  getEventsForDate: (date: Date) => CalendarEvent[];
  onDateClick?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent, clickedDate?: string) => void;
  onTimeSlotSelect?: (date: Date, startHour: number, endHour: number) => void;
  dayStartHour?: number;
}

export function DailyView({
  currentDate,
  getEventsForDate,
  onDateClick,
  onEventClick,
  onTimeSlotSelect,
  dayStartHour = 7,
}: DailyViewProps) {
  const today = new Date();
  const persianDate = gregorianToPersian(currentDate);
  const dayEvents = getEventsForDate(currentDate);
  const timeSlots = generateTimeSlots(dayStartHour);
  const isToday = isSameDay(currentDate, today);
  const dayOfWeek = (currentDate.getDay() + 1) % 7;
  const isHoliday = isOfficialHoliday(currentDate);
  const holidayName = getHolidayName(currentDate);
  const dateStr = dateToString(currentDate);

  const HOUR_HEIGHT = 60;
  const TIME_SLOT_HEIGHT = 60;
  const containerRef = useRef<HTMLDivElement>(null);

  // Now indicator state
  const [nowPosition, setNowPosition] = useState<number | null>(null);

  useEffect(() => {
    if (isToday) {
      const updatePosition = () => {
        const now = new Date();
        setNowPosition(getTimePosition(now, dayStartHour, HOUR_HEIGHT));
      };

      updatePosition();
      const interval = setInterval(updatePosition, 60000); // Update every minute
      return () => clearInterval(interval);
    } else {
      setNowPosition(null);
    }
  }, [isToday, dayStartHour, HOUR_HEIGHT]);

  const handleDragComplete = (selection: DragSelection) => {
    if (onTimeSlotSelect) {
      onTimeSlotSelect(selection.startDate, selection.startHour, selection.endHour);
    }
  };

  const {
    isDragging,
    dragPreview,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
  } = useDragSelection({
    onDragComplete: handleDragComplete,
    timeSlotHeight: TIME_SLOT_HEIGHT,
    hourHeight: HOUR_HEIGHT,
    dayStartHour: dayStartHour,
  });

  return (
    <div
      className="border-border bg-card shadow-border/10 overflow-hidden rounded-2xl border shadow-xl transition-all duration-300"
      dir="rtl"
    >
      {/* Day Header - Enhanced with modern styling */}
      <div
        className={cn(
          "border-border relative overflow-hidden border-b p-6",
          isHoliday
            ? "bg-linear-to-br from-red-50 via-rose-50 to-pink-50"
            : "from-muted via-card bg-linear-to-br to-blue-50/30"
        )}
      >
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-linear-to-br from-blue-400/10 to-indigo-400/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-linear-to-br from-emerald-400/10 to-cyan-400/10 blur-2xl" />

        <div className="relative text-center">
          {/* Weekday name */}
          <div
            className={cn(
              "text-sm font-bold tracking-widest uppercase",
              isHoliday ? "text-red-500" : "text-gray-400"
            )}
          >
            {PERSIAN_WEEKDAYS[dayOfWeek]}
          </div>

          {/* Date display */}
          <div className="mt-2! flex items-center justify-center gap-3">
            <h2
              className={cn(
                "text-3xl font-black tracking-tight transition-colors",
                isToday
                  ? "bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                  : "text-foreground"
              )}
            >
              {formatPersianDate(persianDate)}
            </h2>

            {/* Today indicator */}
            {isToday && (
              <div className="flex items-center gap-2 rounded-full bg-linear-to-r from-blue-500 to-indigo-600 px-3! py-1! shadow-lg shadow-blue-500/30">
                <span className="relative flex h-2! w-2!">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                </span>
                <span className="text-xs font-bold text-white">امروز</span>
              </div>
            )}
          </div>

          {/* Holiday badge */}
          {holidayName && (
            <div className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-1.5 shadow-sm">
              <svg
                className="h-4 w-4 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-bold text-red-700">{holidayName}</span>
            </div>
          )}
        </div>
      </div>

      {/* Time Grid */}
      <div className="scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 max-h-[600px] overflow-auto">
        <div
          className="relative"
          ref={containerRef}
          data-calendar-container
          onMouseMove={
            isDragging ? (e) => handleMouseMove(e, containerRef.current!) : undefined
          }
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {timeSlots.map((slot, index) => {
            const hour = parseInt(slot.split(":")[0]);
            return (
              <div
                key={slot}
                className={cn(
                  "group relative cursor-pointer border-b border-gray-100 transition-all duration-150",
                  "hover:bg-linear-to-r hover:from-blue-50/50 hover:to-transparent",
                  "focus:bg-blue-50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:ring-inset",
                  index % 2 === 0 ? "bg-gray-50/30" : "bg-white"
                )}
                style={{ height: "60px" }}
                tabIndex={0}
                role="button"
                aria-label={`${slot} - برای انتخاب کلیک کنید`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (onDateClick) onDateClick(currentDate);
                  }
                }}
                onMouseDown={(e) => {
                  const target = e.currentTarget;
                  handleMouseDown(e, currentDate, hour, target);
                }}
                onClick={() => {
                  if (!isDragging && onDateClick) {
                    onDateClick(currentDate);
                  }
                }}
              >
                {/* Time Label - Enhanced */}
                <div className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                  <span className="rounded-lg bg-white px-3 py-1.5 text-sm font-bold text-gray-500 shadow-sm ring-1 ring-gray-100 transition-all duration-200 group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/25 group-hover:ring-blue-500">
                    {englishToPersianNumbers(slot)}
                  </span>
                </div>

                {/* 15 min markers */}
                <div className="absolute top-1/4 right-0 h-px w-3 bg-gray-200 transition-colors group-hover:bg-blue-300"></div>
                <div className="absolute top-1/4 left-0 h-px w-3 bg-gray-200 transition-colors group-hover:bg-blue-300"></div>

                {/* 30 min divider */}
                <div className="absolute inset-x-4 top-1/2 border-t border-dashed border-gray-100 transition-colors group-hover:border-blue-200"></div>

                {/* 45 min markers */}
                <div className="absolute top-3/4 right-0 h-px w-3 bg-gray-200 transition-colors group-hover:bg-blue-300"></div>
                <div className="absolute top-3/4 left-0 h-px w-3 bg-gray-200 transition-colors group-hover:bg-blue-300"></div>

                {/* Hover accent */}
                <div className="absolute inset-y-0 right-0 w-1 bg-linear-to-b from-blue-400 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            );
          })}

          {/* Events Overlay */}
          <div className="pointer-events-none absolute inset-0 right-24">
            {/* Now Indicator - Enhanced */}
            {isToday && nowPosition !== null && nowPosition >= 0 && (
              <div
                className="pointer-events-none absolute right-0 left-0 z-20"
                style={{ top: `${nowPosition}px` }}
              >
                <div className="h-0.5 w-full bg-linear-to-r from-red-500 via-rose-500 to-red-500 shadow-lg shadow-red-500/30" />
                <div className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 shadow-lg ring-2 shadow-red-500/50 ring-white">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                </div>
                {/* Time badge */}
                <div className="absolute -top-3 left-2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-lg">
                  {englishToPersianNumbers(
                    `${new Date().getHours().toString().padStart(2, "0")}:${new Date().getMinutes().toString().padStart(2, "0")}`
                  )}
                </div>
              </div>
            )}

            {/* Drag preview - Enhanced */}
            {isDragging && dragPreview && (
              <div
                className="pointer-events-none absolute right-2 left-2 z-10"
                style={{
                  top: `${dragPreview.top}px`,
                  height: `${dragPreview.height}px`,
                }}
              >
                <div className="h-full w-full rounded-xl border-2 border-dashed border-blue-400 bg-linear-to-br from-blue-100/80 to-blue-200/60 backdrop-blur-sm" />
              </div>
            )}

            {/* Events - Enhanced with Overlapping Layout */}
            {(() => {
              // Calculate overlapping layouts for all events
              const eventLayouts = calculateOverlapLayout(
                dayEvents.map((e) => ({
                  id: e.id,
                  startTime: e.startTime,
                  endTime: e.endTime,
                })),
                dayStartHour,
                HOUR_HEIGHT
              );

              return dayEvents.map((event) => {
                const layout = eventLayouts.get(event.id);
                if (!layout) return null;

                const style = getEventLayoutStyle(layout);

                return (
                  <div
                    key={event.id}
                    className="pointer-events-auto"
                    style={{
                      ...style,
                      // Override right with left for proper column ordering in RTL
                      right: `calc(${layout.left}% + 8px)`,
                      left: undefined,
                      width: `calc(${layout.width}% - ${layout.totalColumns > 1 ? 12 : 16}px)`,
                      minHeight: "40px",
                    }}
                  >
                    <SimpleEventCard
                      event={event}
                      onClick={() => onEventClick && onEventClick(event, dateStr)}
                      showTime={true}
                    />
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
