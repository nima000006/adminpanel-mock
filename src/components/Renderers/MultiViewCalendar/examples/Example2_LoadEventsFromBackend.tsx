/**
 * Example 2: Loading Events from Backend API
 *
 * This example shows how to:
 * 1. Fetch events from your backend API
 * 2. Transform backend response to CalendarEvent format
 * 3. Display events in all views (daily, weekly, monthly)
 * 4. Handle loading and error states
 * 5. Refresh events when needed
 */

import { useState, useEffect, useCallback } from "react";

import { MultiViewCalendar } from "../MultiViewCalendar";
import { CalendarEvent } from "../types";

// ============================================================================
// Types for Backend API Response
// ============================================================================

// This is what your backend might return - adjust to match your API
interface BackendEvent {
  id: string | number;
  title: string;
  description?: string;
  // Backend might send date in different formats
  date?: string; // "2024-12-15" or "1403-09-25" (Persian)
  start_time: string; // "09:00" or "09:00:00"
  end_time: string; // "10:30" or "10:30:00"
  color?: string;
  // For recurring events
  is_recurring?: boolean;
  recurrence_type?: "weekly" | "monthly";
  day_of_week?: number; // 0-6
  day_of_month?: number; // 1-31
  recurrence_start?: string;
  recurrence_end?: string;
}

export interface BackendResponse {
  data: BackendEvent[];
  total: number;
  page: number;
  per_page: number;
}

// ============================================================================
// Transform Backend Event to Calendar Event
// ============================================================================

function transformBackendEvent(backendEvent: BackendEvent): CalendarEvent {
  // Normalize time format (remove seconds if present)
  const normalizeTime = (time: string): string => {
    const parts = time.split(":");
    return `${parts[0].padStart(2, "0")}:${parts[1].padStart(2, "0")}`;
  };

  const calendarEvent: CalendarEvent = {
    id: String(backendEvent.id),
    title: backendEvent.title,
    description: backendEvent.description,
    startTime: normalizeTime(backendEvent.start_time),
    endTime: normalizeTime(backendEvent.end_time),
    color: backendEvent.color,
  };

  // Handle single date events
  if (backendEvent.date && !backendEvent.is_recurring) {
    calendarEvent.date = backendEvent.date;
  }

  // Handle recurring events
  if (backendEvent.is_recurring && backendEvent.recurrence_type) {
    calendarEvent.recurring = {
      type: backendEvent.recurrence_type,
      dayOfWeek: backendEvent.day_of_week,
      dayOfMonth: backendEvent.day_of_month,
      startDate: backendEvent.recurrence_start,
      endDate: backendEvent.recurrence_end,
    };
  }

  return calendarEvent;
}

// ============================================================================
// API Service
// ============================================================================

// Replace with your actual API endpoint
// const API_BASE_URL = "/api";

async function fetchEventsFromBackend(params?: {
  startDate?: string;
  endDate?: string;
  page?: number;
  perPage?: number;
}): Promise<CalendarEvent[]> {
  // Build query string
  const queryParams = new URLSearchParams();
  if (params?.startDate) queryParams.append("start_date", params.startDate);
  if (params?.endDate) queryParams.append("end_date", params.endDate);
  if (params?.page) queryParams.append("page", String(params.page));
  if (params?.perPage) queryParams.append("per_page", String(params.perPage));

  //   const queryString = queryParams.toString();
  //   const url = `${API_BASE_URL}/events${queryString ? `?${queryString}` : ""}`;

  /*
  // Actual API call - uncomment and use:
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${yourAuthToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.statusText}`);
  }

  const data: BackendResponse = await response.json();
  return data.data.map(transformBackendEvent);
  */

  // Mock implementation for demo
  await new Promise((resolve) => setTimeout(resolve, 800));

  const mockBackendEvents: BackendEvent[] = [
    // Single date events
    {
      id: 1,
      title: "جلسه تیم فنی",
      description: "بررسی پیشرفت پروژه",
      date: getTodayDateString(),
      start_time: "09:00",
      end_time: "10:30",
      color: "#3b82f6",
    },
    {
      id: 2,
      title: "ناهار کاری",
      date: getTodayDateString(),
      start_time: "12:00",
      end_time: "13:00",
      color: "#10b981",
    },
    {
      id: 3,
      title: "کارگاه آموزشی",
      description: "آموزش React",
      date: getTomorrowDateString(),
      start_time: "14:00",
      end_time: "16:00",
      color: "#f59e0b",
    },
    // Weekly recurring event
    {
      id: 4,
      title: "استندآپ روزانه",
      description: "جلسه کوتاه تیم",
      start_time: "08:30",
      end_time: "09:00",
      color: "#8b5cf6",
      is_recurring: true,
      recurrence_type: "weekly",
      day_of_week: 0, // Saturday (in Persian calendar)
      recurrence_start: "2024-01-01",
      recurrence_end: "2025-12-31",
    },
    {
      id: 5,
      title: "استندآپ روزانه",
      description: "جلسه کوتاه تیم",
      start_time: "08:30",
      end_time: "09:00",
      color: "#8b5cf6",
      is_recurring: true,
      recurrence_type: "weekly",
      day_of_week: 1, // Sunday
      recurrence_start: "2024-01-01",
      recurrence_end: "2025-12-31",
    },
    {
      id: 6,
      title: "استندآپ روزانه",
      description: "جلسه کوتاه تیم",
      start_time: "08:30",
      end_time: "09:00",
      color: "#8b5cf6",
      is_recurring: true,
      recurrence_type: "weekly",
      day_of_week: 2, // Monday
      recurrence_start: "2024-01-01",
      recurrence_end: "2025-12-31",
    },
    {
      id: 7,
      title: "استندآپ روزانه",
      description: "جلسه کوتاه تیم",
      start_time: "08:30",
      end_time: "09:00",
      color: "#8b5cf6",
      is_recurring: true,
      recurrence_type: "weekly",
      day_of_week: 3, // Tuesday
      recurrence_start: "2024-01-01",
      recurrence_end: "2025-12-31",
    },
    {
      id: 8,
      title: "استندآپ روزانه",
      description: "جلسه کوتاه تیم",
      start_time: "08:30",
      end_time: "09:00",
      color: "#8b5cf6",
      is_recurring: true,
      recurrence_type: "weekly",
      day_of_week: 4, // Wednesday
      recurrence_start: "2024-01-01",
      recurrence_end: "2025-12-31",
    },
    // Monthly recurring event
    {
      id: 9,
      title: "جلسه ماهانه مدیران",
      description: "گزارش عملکرد ماهانه",
      start_time: "10:00",
      end_time: "12:00",
      color: "#ec4899",
      is_recurring: true,
      recurrence_type: "monthly",
      day_of_month: 15,
      recurrence_start: "2024-01-01",
      recurrence_end: "2025-12-31",
    },
  ];

  return mockBackendEvents.map(transformBackendEvent);
}

// Helper functions for mock data
function getTodayDateString(): string {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
}

function getTomorrowDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;
}

// ============================================================================
// Example Component
// ============================================================================

export function Example2_LoadEventsFromBackend() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ============================================================================
  // Load Events
  // ============================================================================

  const loadEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const fetchedEvents = await fetchEventsFromBackend();
      setEvents(fetchedEvents);
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در دریافت رویدادها");
      console.error("Failed to load events:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load events on mount
  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  // ============================================================================
  // Event Handlers
  // ============================================================================

  const handleEventClick = (event: CalendarEvent, dateStr?: string) => {
    console.warn("Event clicked:", event);
    console.warn("On date:", dateStr);
    // Open event detail modal or navigate to event page
  };

  const handleDateClick = (date: Date) => {
    console.warn("Date clicked:", date);
    // Navigate to daily view or open create event modal
  };

  // ============================================================================
  // Render
  // ============================================================================

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
          <p className="mt-4 text-gray-600">در حال بارگذاری رویدادها...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="mt-4 font-medium text-gray-900">{error}</p>
          <button
            onClick={loadEvents}
            className="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Refresh Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={loadEvents}
          className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          بروزرسانی
        </button>
      </div>

      {/* Calendar */}
      <MultiViewCalendar
        events={events}
        onEventClick={handleEventClick}
        onDateClick={handleDateClick}
        initialView="weekly"
        dayStartHour={7}
      />

      {/* Events Summary */}
      <div className="mt-4 rounded-lg bg-gray-50 p-4" dir="rtl">
        <p className="text-sm text-gray-600">
          <span className="font-medium">{events.length}</span> رویداد بارگذاری شد (
          {events.filter((e) => e.recurring).length} تکرارشونده)
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Alternative: Using React Query (TanStack Query)
// ============================================================================

/*
import { useQuery } from '@tanstack/react-query';

export function Example2_WithReactQuery() {
  const {
    data: events = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['calendar-events'],
    queryFn: () => fetchEventsFromBackend(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;

  return (
    <MultiViewCalendar
      events={events}
      onEventClick={handleEventClick}
    />
  );
}
*/

// ============================================================================
// Alternative: Using SWR
// ============================================================================

/*
import useSWR from 'swr';

const fetcher = () => fetchEventsFromBackend();

export function Example2_WithSWR() {
  const { data: events, error, isLoading, mutate } = useSWR(
    'calendar-events',
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorState error={error} onRetry={() => mutate()} />;

  return (
    <MultiViewCalendar
      events={events || []}
      onEventClick={handleEventClick}
    />
  );
}
*/

// ============================================================================
// Alternative: Date Range Based Fetching
// ============================================================================

/*
// Fetch events based on visible date range (more efficient for large datasets)
export function Example2_WithDateRangeFetching() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  // Calculate date range based on current view
  const getDateRange = useCallback(() => {
    const start = new Date(currentDate);
    const end = new Date(currentDate);

    if (view === 'daily') {
      // Just the current day
    } else if (view === 'weekly') {
      const dayOfWeek = (start.getDay() + 1) % 7;
      start.setDate(start.getDate() - dayOfWeek);
      end.setDate(start.getDate() + 6);
    } else {
      // Monthly - get full month
      start.setDate(1);
      end.setMonth(end.getMonth() + 1);
      end.setDate(0);
    }

    return {
      startDate: formatDate(start),
      endDate: formatDate(end),
    };
  }, [currentDate, view]);

  useEffect(() => {
    const { startDate, endDate } = getDateRange();
    fetchEventsFromBackend({ startDate, endDate }).then(setEvents);
  }, [getDateRange]);

  return <MultiViewCalendar events={events} />;
}
*/
