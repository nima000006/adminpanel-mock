// Standalone Calendar Types - Simplified for general use

export interface CalendarEvent {
  id: string;
  title?: string;
  startTime: string; // HH:mm format (e.g., "09:00")
  endTime: string; // HH:mm format (e.g., "10:30")
  date?: string; // YYYY-MM-DD format for single events
  recurring?: {
    // For recurring events
    type: "weekly" | "monthly";
    dayOfWeek?: number; // 0-6 (Saturday is 0 in Persian calendar)
    dayOfMonth?: number; // 1-31
    startDate?: string; // YYYY-MM-DD format
    endDate?: string; // YYYY-MM-DD format
  };
  color?: string; // Hex color for the event
  description?: string;
}

export type CalendarView = "daily" | "weekly" | "monthly";

export interface CalendarSettings {
  dayStartHour: number; // 0-23, calendar always shows 24 hours starting from this hour
}

export interface PersianDate {
  year: number;
  month: number;
  day: number;
}
