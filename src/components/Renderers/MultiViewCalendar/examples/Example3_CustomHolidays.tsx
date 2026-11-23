/**
 * Example 3: Custom Holidays from Backend API
 *
 * This example shows how to:
 * 1. Fetch custom holidays from your backend
 * 2. Extend the calendar's holiday system
 * 3. Display organization-specific holidays
 * 4. Combine with default Iranian holidays
 */

import { useState, useEffect, useCallback, useMemo } from "react";

import { MultiViewCalendar } from "../MultiViewCalendar";
import { CalendarEvent } from "../types";

// ============================================================================
// Types for Custom Holidays
// ============================================================================

export interface CustomHoliday {
  id: string | number;
  date: string; // YYYY-MM-DD (Gregorian) or Persian date
  name: string;
  type: "official" | "organizational" | "optional";
  description?: string;
  isRecurringYearly?: boolean;
  // For Persian date holidays
  persianMonth?: number; // 1-12
  persianDay?: number; // 1-31
}

export interface HolidaysResponse {
  holidays: CustomHoliday[];
  year: number;
}

// ============================================================================
// Holiday Context/Provider (Optional - for app-wide holiday access)
// ============================================================================

// You can create a React Context to share holidays across components
/*
import { createContext, useContext, ReactNode } from 'react';

interface HolidayContextType {
  holidays: CustomHoliday[];
  isHoliday: (date: Date) => boolean;
  getHolidayName: (date: Date) => string | null;
  isLoading: boolean;
}

const HolidayContext = createContext<HolidayContextType | null>(null);

export function HolidayProvider({ children }: { children: ReactNode }) {
  const [holidays, setHolidays] = useState<CustomHoliday[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHolidaysFromBackend().then(setHolidays).finally(() => setIsLoading(false));
  }, []);

  const isHoliday = useCallback((date: Date) => {
    const dateStr = formatDateToString(date);
    return holidays.some(h => h.date === dateStr);
  }, [holidays]);

  const getHolidayName = useCallback((date: Date) => {
    const dateStr = formatDateToString(date);
    const holiday = holidays.find(h => h.date === dateStr);
    return holiday?.name || null;
  }, [holidays]);

  return (
    <HolidayContext.Provider value={{ holidays, isHoliday, getHolidayName, isLoading }}>
      {children}
    </HolidayContext.Provider>
  );
}

export const useHolidays = () => {
  const context = useContext(HolidayContext);
  if (!context) throw new Error('useHolidays must be used within HolidayProvider');
  return context;
};
*/

// ============================================================================
// API Service
// ============================================================================

async function fetchHolidaysFromBackend(year?: number): Promise<CustomHoliday[]> {
  const currentYear = year || new Date().getFullYear();

  /*
  // Actual API call - uncomment and use:
  const response = await fetch(`/api/holidays?year=${currentYear}`, {
    headers: {
      'Authorization': `Bearer ${yourAuthToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch holidays');
  }

  const data: HolidaysResponse = await response.json();
  return data.holidays;
  */

  // Mock implementation
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Example: Organization-specific holidays
  const mockHolidays: CustomHoliday[] = [
    // Fixed Gregorian date holidays
    {
      id: 1,
      date: `${currentYear}-12-25`,
      name: "تعطیلات سازمانی",
      type: "organizational",
      description: "تعطیلات پایان سال",
    },
    {
      id: 2,
      date: `${currentYear}-12-31`,
      name: "آخرین روز سال میلادی",
      type: "optional",
    },
    // Dynamic dates based on current month (for demo)
    {
      id: 3,
      date: getDateInCurrentMonth(10),
      name: "روز آموزش سازمان",
      type: "organizational",
      description: "کارگاه‌های آموزشی داخلی",
    },
    {
      id: 4,
      date: getDateInCurrentMonth(20),
      name: "جلسه عمومی ماهانه",
      type: "optional",
      description: "جلسه همه کارکنان",
    },
    // Persian calendar holidays (recurring yearly)
    {
      id: 5,
      date: "", // Will be calculated
      name: "سالگرد تاسیس شرکت",
      type: "organizational",
      persianMonth: 7, // Mehr
      persianDay: 1,
      isRecurringYearly: true,
    },
  ];

  return mockHolidays;
}

// Helper to get a date in current month
function getDateInCurrentMonth(day: number): string {
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth(), day);
  return formatDateToString(date);
}

function formatDateToString(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// ============================================================================
// Custom Hook for Holiday Management
// ============================================================================

interface UseCustomHolidaysReturn {
  holidays: CustomHoliday[];
  isLoading: boolean;
  error: string | null;
  isHoliday: (date: Date) => boolean;
  getHolidayInfo: (date: Date) => CustomHoliday | null;
  holidayEvents: CalendarEvent[];
  refetch: () => Promise<void>;
}

export function useCustomHolidays(year?: number): UseCustomHolidaysReturn {
  const [holidays, setHolidays] = useState<CustomHoliday[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHolidays = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchHolidaysFromBackend(year);
      setHolidays(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در دریافت تعطیلات");
    } finally {
      setIsLoading(false);
    }
  }, [year]);

  useEffect(() => {
    loadHolidays();
  }, [loadHolidays]);

  // Check if a date is a custom holiday
  const isHoliday = useCallback(
    (date: Date): boolean => {
      const dateStr = formatDateToString(date);
      return holidays.some((h) => h.date === dateStr);
    },
    [holidays]
  );

  // Get holiday info for a specific date
  const getHolidayInfo = useCallback(
    (date: Date): CustomHoliday | null => {
      const dateStr = formatDateToString(date);
      return holidays.find((h) => h.date === dateStr) || null;
    },
    [holidays]
  );

  // Convert holidays to calendar events for display
  const holidayEvents: CalendarEvent[] = useMemo(() => {
    return holidays
      .filter((h) => h.date) // Only holidays with dates
      .map((holiday) => ({
        id: `holiday-${holiday.id}`,
        title: `🎉 ${holiday.name}`,
        description: holiday.description,
        date: holiday.date,
        startTime: "00:00",
        endTime: "23:59",
        color:
          holiday.type === "official"
            ? "#ef4444"
            : holiday.type === "organizational"
              ? "#f59e0b"
              : "#10b981",
      }));
  }, [holidays]);

  return {
    holidays,
    isLoading,
    error,
    isHoliday,
    getHolidayInfo,
    holidayEvents,
    refetch: loadHolidays,
  };
}

// ============================================================================
// Example Component
// ============================================================================

export function Example3_CustomHolidays() {
  // Regular events
  const [events] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "جلسه تیم",
      date: formatDateToString(new Date()),
      startTime: "10:00",
      endTime: "11:30",
      color: "#3b82f6",
    },
  ]);

  // Custom holidays from backend
  const { holidays, holidayEvents, isLoading, error, getHolidayInfo, refetch } =
    useCustomHolidays();

  // Combine regular events with holiday events
  const allEvents = useMemo(() => {
    return [...events, ...holidayEvents];
  }, [events, holidayEvents]);

  // Handle event click - show holiday info if it's a holiday
  const handleEventClick = (event: CalendarEvent) => {
    if (event.id.startsWith("holiday-")) {
      // It's a holiday event
      const holidayId = event.id.replace("holiday-", "");
      const holiday = holidays.find((h) => String(h.id) === holidayId);
      if (holiday) {
        alert(
          `🎉 ${holiday.name}\n\nنوع: ${
            holiday.type === "official"
              ? "رسمی"
              : holiday.type === "organizational"
                ? "سازمانی"
                : "اختیاری"
          }${holiday.description ? `\n\nتوضیحات: ${holiday.description}` : ""}`
        );
      }
    } else {
      // Regular event
      console.warn("Event clicked:", event);
    }
  };

  // Handle date click - check if it's a holiday
  const handleDateClick = (date: Date) => {
    const holidayInfo = getHolidayInfo(date);
    if (holidayInfo) {
      console.warn("Clicked on holiday:", holidayInfo.name);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-center text-red-600">
        <p>{error}</p>
        <button
          onClick={refetch}
          className="mt-2 rounded bg-red-600 px-4 py-2 text-white"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Holiday Legend */}
      <div className="mb-4 flex flex-wrap gap-4 rounded-lg bg-gray-50 p-4" dir="rtl">
        <div className="text-sm font-medium text-gray-700">راهنمای تعطیلات:</div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="text-sm text-gray-600">رسمی</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-amber-500" />
          <span className="text-sm text-gray-600">سازمانی</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-500" />
          <span className="text-sm text-gray-600">اختیاری</span>
        </div>
      </div>

      {/* Calendar */}
      <MultiViewCalendar
        events={allEvents}
        onEventClick={handleEventClick}
        onDateClick={handleDateClick}
        initialView="monthly"
      />

      {/* Holiday List */}
      <div className="mt-6 rounded-lg border border-gray-200 p-4" dir="rtl">
        <h3 className="mb-4 text-lg font-bold text-gray-900">
          تعطیلات سازمانی ({holidays.length})
        </h3>
        <div className="space-y-2">
          {holidays.map((holiday) => (
            <div
              key={holiday.id}
              className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`h-2 w-2 rounded-full ${
                    holiday.type === "official"
                      ? "bg-red-500"
                      : holiday.type === "organizational"
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                  }`}
                />
                <span className="font-medium text-gray-900">{holiday.name}</span>
              </div>
              <span className="text-sm text-gray-500">
                {holiday.date
                  ? new Date(holiday.date).toLocaleDateString("fa-IR")
                  : "تاریخ متغیر"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Alternative: Extending the Calendar's Built-in Holiday System
// ============================================================================

/*
// If you want to modify the calendar's internal holiday detection,
// you can create a wrapper that overrides the holiday utilities:

import { isOfficialHoliday as defaultIsOfficialHoliday } from '../utils/iranian-holidays';

function createCustomHolidayChecker(customHolidays: CustomHoliday[]) {
  return (date: Date): boolean => {
    // Check default Iranian holidays first
    if (defaultIsOfficialHoliday(date)) {
      return true;
    }
    
    // Check custom holidays
    const dateStr = formatDateToString(date);
    return customHolidays.some(h => h.date === dateStr && h.type !== 'optional');
  };
}
*/

// ============================================================================
// Alternative: Syncing with Google Calendar / Outlook Holidays
// ============================================================================

/*
async function fetchGoogleCalendarHolidays(calendarId: string): Promise<CustomHoliday[]> {
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?` +
    new URLSearchParams({
      timeMin: new Date().toISOString(),
      timeMax: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      singleEvents: 'true',
    }),
    {
      headers: {
        'Authorization': `Bearer ${googleAccessToken}`,
      },
    }
  );

  const data = await response.json();
  
  return data.items.map((item: any) => ({
    id: item.id,
    date: item.start.date || item.start.dateTime.split('T')[0],
    name: item.summary,
    type: 'official',
    description: item.description,
  }));
}
*/
