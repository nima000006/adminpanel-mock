import { useRef, useEffect, useState } from "react";

import { CalendarEvent } from "../types";
import { SimpleEventCard } from "./SimpleEventCard";
import { useDragSelection, DragSelection } from "../hooks/useDragSelection";
import { cn } from "../utils/cn";
import { isSameDay, generateTimeSlots, dateToString } from "../utils/date-helpers";
import {
  getTimePosition,
  calculateOverlapLayout,
  getEventLayoutStyle,
} from "../utils/event-layout";
import { isOfficialHoliday, getHolidayName } from "../utils/iranian-holidays";
import {
  PERSIAN_WEEKDAYS_SHORT,
  gregorianToPersian,
  englishToPersianNumbers,
} from "../utils/persian-date";

interface WeeklyViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  getEventsForDate: (date: Date) => CalendarEvent[];
  onDateClick?: (date: Date) => void;
  onDayClick?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent, clickedDate?: string) => void;
  onTimeSlotSelect?: (date: Date, startHour: number, endHour: number) => void;
  dayStartHour?: number;
}

export function WeeklyView({
  currentDate,
  getEventsForDate,
  onDateClick,
  onDayClick,
  onEventClick,
  onTimeSlotSelect,
  dayStartHour = 7,
}: WeeklyViewProps) {
  const today = new Date();

  const currentDayOfWeek = (currentDate.getDay() + 1) % 7;
  const weekStartGregorian = new Date(currentDate);
  weekStartGregorian.setDate(currentDate.getDate() - currentDayOfWeek);

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStartGregorian);
    date.setDate(weekStartGregorian.getDate() + i);
    weekDates.push(date);
  }

  const timeSlots = generateTimeSlots(dayStartHour);
  const HOUR_HEIGHT = 60;
  const TIME_SLOT_HEIGHT = 60;
  const containerRef = useRef<HTMLDivElement>(null);

  // Now indicator state
  const [nowPosition, setNowPosition] = useState<number | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      const now = new Date();
      setNowPosition(getTimePosition(now, dayStartHour, HOUR_HEIGHT));
    };

    updatePosition();
    const interval = setInterval(updatePosition, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [dayStartHour, HOUR_HEIGHT]);

  const handleDragComplete = (selection: DragSelection) => {
    if (onTimeSlotSelect) {
      onTimeSlotSelect(selection.startDate, selection.startHour, selection.endHour);
    }
  };

  const {
    isDragging,
    dragSelection,
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
      {/* Week Header - Enhanced with gradients and modern styling */}
      <div className="border-border from-card to-muted/50 grid grid-cols-8 border-b-2 bg-linear-to-b">
        {/* Empty cell for time column */}
        <div className="border-border from-muted to-muted/50 border-l bg-linear-to-br p-3">
          <div className="flex h-full items-center justify-center">
            <svg
              className="text-muted-foreground h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        {weekDates.map((date, index) => {
          const persianDate = gregorianToPersian(date);
          const isToday = isSameDay(date, today);
          const isHoliday = isOfficialHoliday(date);
          const holidayName = getHolidayName(date);
          const isFriday = index === 6;

          return (
            <div
              key={`weekday-${date.getTime()}`}
              className={cn(
                "group border-border relative cursor-pointer border-l px-3 py-4 text-center transition-all duration-300",
                isToday
                  ? "bg-linear-to-br from-blue-500 via-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/30"
                  : "bg-card hover:bg-primary/5 hover:shadow-md",
                isHoliday && !isToday && "bg-linear-to-br from-red-50 to-rose-50",
                isFriday && !isToday && !isHoliday && "bg-muted/50"
              )}
              tabIndex={0}
              role="button"
              aria-label={`${PERSIAN_WEEKDAYS_SHORT[index]} ${englishToPersianNumbers(persianDate.day.toString())}${holidayName ? ` - ${holidayName}` : ""}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (onDayClick) onDayClick(date);
                  else if (onDateClick) onDateClick(date);
                }
              }}
              onClick={() => {
                if (onDayClick) onDayClick(date);
                else if (onDateClick) onDateClick(date);
              }}
            >
              {/* Top accent bar for today */}
              {isToday && (
                <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-yellow-300 via-amber-400 to-yellow-300"></div>
              )}

              {/* Weekday name */}
              <div
                className={cn(
                  "text-[11px] font-bold tracking-wider uppercase",
                  isToday
                    ? "text-white/90"
                    : isHoliday
                      ? "text-red-600"
                      : isFriday
                        ? "text-red-500"
                        : "text-gray-400 group-hover:text-blue-600"
                )}
              >
                {PERSIAN_WEEKDAYS_SHORT[index]}
              </div>

              {/* Day number */}
              <div className="mt-3 flex items-center justify-center">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center text-2xl font-black transition-all duration-300",
                    isToday
                      ? "rounded-full bg-white text-blue-600 shadow-lg ring-4 ring-blue-400/20"
                      : "rounded-xl group-hover:bg-blue-100 group-hover:text-blue-600",
                    !isToday && (isHoliday ? "text-red-600" : "text-gray-800")
                  )}
                >
                  {englishToPersianNumbers(persianDate.day.toString())}
                </div>
              </div>

              {/* Holiday name badge */}
              {holidayName && (
                <div
                  className={cn(
                    "mx-auto mt-2 max-w-full truncate rounded-full px-2 py-0.5 text-[10px] leading-tight font-medium",
                    isToday
                      ? "bg-white/20 text-white backdrop-blur-sm"
                      : "bg-red-100 text-red-700"
                  )}
                  title={holidayName}
                >
                  {holidayName}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 max-h-[600px] overflow-auto">
        <div
          className="grid grid-cols-8"
          ref={containerRef}
          data-calendar-container
          onMouseMove={
            isDragging ? (e) => handleMouseMove(e, containerRef.current!) : undefined
          }
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {/* Time Column */}
          <div className="border-l border-gray-100 bg-linear-to-b from-gray-50 to-white">
            {timeSlots.map((slot, index) => (
              <div
                key={slot}
                className={cn(
                  "flex h-[60px] items-start justify-center border-b border-gray-100 pt-1 transition-colors",
                  index % 2 === 0 ? "bg-gray-50/30" : "bg-white"
                )}
              >
                <span className="rounded-md bg-white px-2 py-0.5 text-xs font-semibold text-gray-500 shadow-sm ring-1 ring-gray-100">
                  {englishToPersianNumbers(slot)}
                </span>
              </div>
            ))}
          </div>

          {/* Day Columns */}
          {weekDates.map((date) => {
            const dayEvents = getEventsForDate(date);
            const dateStr = dateToString(date);
            const isToday = isSameDay(date, today);

            return (
              <div
                key={`day-${date.getTime()}`}
                className={cn(
                  "relative border-l border-gray-100",
                  isToday && "bg-blue-50/20"
                )}
              >
                {/* Time Slots */}
                {timeSlots.map((slot, index) => {
                  const hour = parseInt(slot.split(":")[0]);
                  return (
                    <div
                      key={slot}
                      className={cn(
                        "group relative h-[60px] cursor-pointer border-b border-gray-100 transition-all duration-150",
                        "hover:bg-linear-to-r hover:from-blue-50/50 hover:to-transparent",
                        "focus:bg-blue-50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:ring-inset",
                        index % 2 === 0 ? "bg-gray-50/10" : "bg-white"
                      )}
                      tabIndex={0}
                      role="button"
                      aria-label={`${slot} - برای انتخاب کلیک کنید`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          if (onDateClick) onDateClick(date);
                        }
                      }}
                      onMouseDown={(e) => {
                        const target = e.currentTarget;
                        handleMouseDown(e, date, hour, target);
                      }}
                      onClick={() => {
                        if (!isDragging && onDateClick) {
                          onDateClick(date);
                        }
                      }}
                    >
                      {/* 15 minute markers */}
                      <div className="absolute top-1/4 right-0 h-px w-2 bg-gray-200 transition-colors group-hover:bg-blue-300" />
                      <div className="absolute top-1/4 left-0 h-px w-2 bg-gray-200 transition-colors group-hover:bg-blue-300" />

                      {/* 30 minute dashed divider */}
                      <div className="absolute inset-x-2 top-1/2 border-t border-dashed border-gray-100 transition-colors group-hover:border-blue-200" />

                      {/* 45 minute markers */}
                      <div className="absolute top-3/4 right-0 h-px w-2 bg-gray-200 transition-colors group-hover:bg-blue-300" />
                      <div className="absolute top-3/4 left-0 h-px w-2 bg-gray-200 transition-colors group-hover:bg-blue-300" />

                      {/* Hover indicator */}
                      <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="absolute inset-y-0 right-0 w-0.5 bg-linear-to-b from-blue-400 to-blue-600" />
                      </div>
                    </div>
                  );
                })}

                {/* Events Overlay */}
                <div className="pointer-events-none absolute inset-0">
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
                    </div>
                  )}

                  {/* Drag preview - Enhanced */}
                  {isDragging &&
                    dragSelection &&
                    dragSelection.startDate.getTime() === date.getTime() &&
                    dragPreview && (
                      <div
                        className="pointer-events-none absolute right-1 left-1 z-10"
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
                    // Calculate overlapping layouts for all events in this day
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
                            right: `calc(${layout.left}% + 4px)`,
                            left: undefined,
                            width: `calc(${layout.width}% - ${layout.totalColumns > 1 ? 6 : 8}px)`,
                            minHeight: "30px",
                          }}
                        >
                          <SimpleEventCard
                            event={event}
                            onClick={() => onEventClick && onEventClick(event, dateStr)}
                            compact
                          />
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
