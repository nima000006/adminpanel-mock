import { useState } from "react";

import { CalendarHeader } from "./components/CalendarHeader";
import { DailyView } from "./components/DailyView";
import { MonthlyView } from "./components/MonthlyView";
import { WeeklyView } from "./components/WeeklyView";
import { CalendarEvent, CalendarView } from "./types";
import {
  getWeekStart,
  dateToString,
  shouldShowRecurringEvent,
} from "./utils/date-helpers";

export interface MultiViewCalendarProps {
  /** Array of events to display */
  events: CalendarEvent[];

  /** Callback when an event is clicked */
  onEventClick?: (event: CalendarEvent, dateStr?: string) => void;

  /** Callback when a date cell is clicked */
  onDateClick?: (date: Date) => void;

  /** Callback when a day header is clicked (switches to daily view) */
  onDayClick?: (date: Date) => void;

  /** Callback when a time slot is selected by dragging */
  onTimeSlotSelect?: (date: Date, startHour: number, endHour: number) => void;

  /** Initial view mode */
  initialView?: CalendarView;

  /** Initial date to display */
  initialDate?: Date;

  /** Hour to start the day (0-23) */
  dayStartHour?: number;

  /** Show today button */
  showTodayButton?: boolean;

  /** Additional CSS classes */
  className?: string;
}

export function MultiViewCalendar({
  events,
  onEventClick,
  onDateClick,
  onDayClick,
  onTimeSlotSelect,
  initialView = "weekly",
  initialDate = new Date(),
  dayStartHour = 7,
  showTodayButton = true,
  className = "",
}: MultiViewCalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [view, setView] = useState<CalendarView>(initialView);
  // const [settings] = useState<CalendarSettings>({ dayStartHour });

  // Helper function to get events for a specific date
  const getEventsForDate = (date: Date): CalendarEvent[] => {
    const dateStr = dateToString(date);

    return events.filter((event) => {
      // Single date events
      if (event.date) {
        return event.date === dateStr;
      }

      // Recurring events
      if (event.recurring) {
        // Check if event should be shown on this date
        if (
          !shouldShowRecurringEvent(
            event.recurring.startDate,
            event.recurring.endDate,
            date
          )
        ) {
          return false;
        }

        // Check day of week for weekly recurring
        if (
          event.recurring.type === "weekly" &&
          event.recurring.dayOfWeek !== undefined
        ) {
          const dayOfWeek = (date.getDay() + 1) % 7; // Convert to Persian week
          return dayOfWeek === event.recurring.dayOfWeek;
        }

        // Check day of month for monthly recurring
        if (
          event.recurring.type === "monthly" &&
          event.recurring.dayOfMonth !== undefined
        ) {
          return date.getDate() === event.recurring.dayOfMonth;
        }
      }

      return false;
    });
  };

  // Navigation handlers
  const handlePrevious = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (view === "daily") {
        newDate.setDate(prev.getDate() - 1);
      } else if (view === "weekly") {
        newDate.setDate(prev.getDate() - 7);
      } else {
        newDate.setMonth(prev.getMonth() - 1);
      }
      return newDate;
    });
  };

  const handleNext = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (view === "daily") {
        newDate.setDate(prev.getDate() + 1);
      } else if (view === "weekly") {
        newDate.setDate(prev.getDate() + 7);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleViewChange = (newView: CalendarView) => {
    setView(newView);
    if (newView === "weekly") {
      setCurrentDate(getWeekStart(currentDate));
    }
  };

  const handleEventClickInternal = (event: CalendarEvent, dateStr?: string) => {
    if (onEventClick) {
      onEventClick(event, dateStr);
    }
  };

  const handleDateClickInternal = (date: Date) => {
    if (onDateClick) {
      onDateClick(date);
    }
  };

  const handleDayClickInternal = (date: Date) => {
    if (onDayClick) {
      onDayClick(date);
    } else {
      // Default behavior: switch to daily view
      setCurrentDate(date);
      setView("daily");
    }
  };

  return (
    <div
      className={`mx-auto flex w-full max-w-7xl flex-col gap-4 p-1! font-[DanaFaNum]! ${className}`}
      role="application"
      aria-label="تقویم فارسی"
    >
      <CalendarHeader
        currentDate={currentDate}
        view={view}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={handleToday}
        onViewChange={handleViewChange}
        showTodayButton={showTodayButton}
      />

      {/* TODO: Import and use the view components after copying them */}

      {view === "monthly" && (
        <MonthlyView
          currentDate={currentDate}
          events={events}
          getEventsForDate={getEventsForDate}
          onEventClick={handleEventClickInternal}
          onDayClick={handleDayClickInternal}
        />
      )}

      {view === "weekly" && (
        <WeeklyView
          currentDate={currentDate}
          events={events}
          getEventsForDate={getEventsForDate}
          onEventClick={handleEventClickInternal}
          onDayClick={handleDayClickInternal}
          onDateClick={handleDateClickInternal}
          onTimeSlotSelect={onTimeSlotSelect}
          dayStartHour={dayStartHour}
        />
      )}

      {view === "daily" && (
        <DailyView
          currentDate={currentDate}
          events={events}
          getEventsForDate={getEventsForDate}
          onEventClick={handleEventClickInternal}
          onDateClick={handleDateClickInternal}
          onTimeSlotSelect={onTimeSlotSelect}
          dayStartHour={dayStartHour}
        />
      )}
    </div>
  );
}
