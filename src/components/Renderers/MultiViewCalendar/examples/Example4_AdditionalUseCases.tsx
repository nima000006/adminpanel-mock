/**
 * Example 4: Additional Use Cases
 *
 * This example covers:
 * 1. Edit existing events
 * 2. Delete events
 * 3. Drag to reschedule (future)
 * 4. Filter events by category/color
 * 5. Export calendar data
 * 6. Event reminders/notifications
 * 7. Multi-select events
 */

import { useState, useMemo } from "react";

import { MultiViewCalendar } from "../MultiViewCalendar";
import { CalendarEvent } from "../types";

// ============================================================================
// Types
// ============================================================================

interface EventCategory {
  id: string;
  name: string;
  color: string;
}

// ============================================================================
// Sample Data
// ============================================================================

const CATEGORIES: EventCategory[] = [
  { id: "meeting", name: "جلسات", color: "#3b82f6" },
  { id: "task", name: "وظایف", color: "#10b981" },
  { id: "reminder", name: "یادآوری", color: "#f59e0b" },
  { id: "personal", name: "شخصی", color: "#8b5cf6" },
];

function getTodayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getTomorrowStr(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const INITIAL_EVENTS: (CalendarEvent & { categoryId?: string })[] = [
  {
    id: "1",
    title: "جلسه تیم فنی",
    description: "بررسی پیشرفت پروژه",
    date: getTodayStr(),
    startTime: "09:00",
    endTime: "10:30",
    color: "#3b82f6",
    categoryId: "meeting",
  },
  {
    id: "2",
    title: "تحویل گزارش",
    date: getTodayStr(),
    startTime: "14:00",
    endTime: "15:00",
    color: "#10b981",
    categoryId: "task",
  },
  {
    id: "3",
    title: "تماس با مشتری",
    date: getTomorrowStr(),
    startTime: "11:00",
    endTime: "11:30",
    color: "#f59e0b",
    categoryId: "reminder",
  },
];

// ============================================================================
// API Functions (Mock)
// ============================================================================

async function updateEventInBackend(event: CalendarEvent): Promise<CalendarEvent> {
  await new Promise((r) => setTimeout(r, 300));
  console.warn("Updated event:", event);
  return event;
}

async function deleteEventInBackend(eventId: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 300));
  console.warn("Deleted event:", eventId);
}

// ============================================================================
// Use Case 1 & 2: Edit and Delete Events
// ============================================================================

export function Example4_EditDeleteEvents() {
  const [events, setEvents] =
    useState<(CalendarEvent & { categoryId?: string })[]>(INITIAL_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setEditForm({
      title: event.title || "",
      description: event.description || "",
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedEvent) return;

    const updated = {
      ...selectedEvent,
      title: editForm.title,
      description: editForm.description,
    };

    await updateEventInBackend(updated);
    setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    setIsEditModalOpen(false);
    setSelectedEvent(null);
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;

    if (window.confirm("آیا از حذف این رویداد مطمئن هستید؟")) {
      await deleteEventInBackend(selectedEvent.id);
      setEvents((prev) => prev.filter((e) => e.id !== selectedEvent.id));
      setIsEditModalOpen(false);
      setSelectedEvent(null);
    }
  };

  return (
    <div>
      <MultiViewCalendar
        events={events}
        onEventClick={handleEventClick}
        initialView="weekly"
      />

      {/* Edit Modal */}
      {isEditModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6" dir="rtl">
            <h2 className="mb-4 text-lg font-bold">ویرایش رویداد</h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">عنوان</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))}
                  className="w-full rounded-lg border px-3 py-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">توضیحات</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm((p) => ({ ...p, description: e.target.value }))
                  }
                  className="w-full rounded-lg border px-3 py-2"
                  rows={3}
                />
              </div>

              <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
                <div>تاریخ: {selectedEvent.date}</div>
                <div>
                  ساعت: {selectedEvent.startTime} - {selectedEvent.endTime}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={handleSaveEdit}
                className="flex-1 rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
              >
                ذخیره
              </button>
              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-100 px-4 py-2 text-red-600 hover:bg-red-200"
              >
                حذف
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-lg border px-4 py-2 hover:bg-gray-50"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Use Case 3: Filter Events by Category
// ============================================================================

export function Example4_FilterEvents() {
  const [events] = useState<(CalendarEvent & { categoryId?: string })[]>(INITIAL_EVENTS);
  const [activeFilters, setActiveFilters] = useState<string[]>(
    CATEGORIES.map((c) => c.id)
  );

  const toggleFilter = (categoryId: string) => {
    setActiveFilters((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredEvents = useMemo(() => {
    return events.filter((e) => !e.categoryId || activeFilters.includes(e.categoryId));
  }, [events, activeFilters]);

  return (
    <div>
      {/* Filter Bar */}
      <div className="mb-4 flex flex-wrap gap-2" dir="rtl">
        <span className="py-2 text-sm font-medium text-gray-700">فیلتر:</span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => toggleFilter(cat.id)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeFilters.includes(cat.id)
                ? "text-white shadow-md"
                : "bg-gray-100 text-gray-500"
            }`}
            style={{
              backgroundColor: activeFilters.includes(cat.id) ? cat.color : undefined,
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: cat.color }}
            />
            {cat.name}
          </button>
        ))}
      </div>

      <MultiViewCalendar events={filteredEvents} initialView="weekly" />

      <p className="mt-4 text-sm text-gray-500" dir="rtl">
        نمایش {filteredEvents.length} از {events.length} رویداد
      </p>
    </div>
  );
}

// ============================================================================
// Use Case 4: Export Calendar Data
// ============================================================================

export function Example4_ExportCalendar() {
  const [events] = useState<CalendarEvent[]>(INITIAL_EVENTS);

  // Export to JSON
  const exportToJSON = () => {
    const data = JSON.stringify(events, null, 2);
    downloadFile(data, "calendar-events.json", "application/json");
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["id", "title", "date", "startTime", "endTime", "description"];
    const rows = events.map((e) =>
      headers.map((h) => `"${(e as any)[h] || ""}"`).join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    downloadFile(csv, "calendar-events.csv", "text/csv");
  };

  // Export to ICS (iCalendar format)
  const exportToICS = () => {
    const icsEvents = events
      .map((e) => {
        if (!e.date) return "";
        const dateStr = e.date.replace(/-/g, "");
        const startTime = e.startTime.replace(":", "") + "00";
        const endTime = e.endTime.replace(":", "") + "00";

        return `BEGIN:VEVENT
UID:${e.id}@calendar
DTSTART:${dateStr}T${startTime}
DTEND:${dateStr}T${endTime}
SUMMARY:${e.title || ""}
DESCRIPTION:${e.description || ""}
END:VEVENT`;
      })
      .filter(Boolean)
      .join("\n");

    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Your App//Calendar//FA
${icsEvents}
END:VCALENDAR`;

    downloadFile(ics, "calendar-events.ics", "text/calendar");
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Export Buttons */}
      <div className="mb-4 flex gap-2" dir="rtl">
        <button
          onClick={exportToJSON}
          className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
        >
          خروجی JSON
        </button>
        <button
          onClick={exportToCSV}
          className="rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-200"
        >
          خروجی CSV
        </button>
        <button
          onClick={exportToICS}
          className="rounded-lg bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-200"
        >
          خروجی ICS (Outlook/Google)
        </button>
      </div>

      <MultiViewCalendar events={events} initialView="monthly" />
    </div>
  );
}

// ============================================================================
// Use Case 5: Search Events
// ============================================================================

export function Example4_SearchEvents() {
  const [events] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return events;

    const query = searchQuery.toLowerCase();
    return events.filter(
      (e) =>
        e.title?.toLowerCase().includes(query) ||
        e.description?.toLowerCase().includes(query)
    );
  }, [events, searchQuery]);

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-4" dir="rtl">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو در رویدادها..."
            className="w-full rounded-xl border border-gray-200 py-3 pr-12 pl-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
          />
          <svg
            className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {searchQuery && (
          <p className="mt-2 text-sm text-gray-500">
            {filteredEvents.length} نتیجه برای "{searchQuery}"
          </p>
        )}
      </div>

      <MultiViewCalendar events={filteredEvents} initialView="weekly" />
    </div>
  );
}

// ============================================================================
// Use Case 6: Event Statistics Dashboard
// ============================================================================

export function Example4_EventStats() {
  const [events] = useState<(CalendarEvent & { categoryId?: string })[]>(INITIAL_EVENTS);

  const stats = useMemo(() => {
    const totalEvents = events.length;
    const todayStr = getTodayStr();
    const todayEvents = events.filter((e) => e.date === todayStr).length;

    // Calculate total hours
    const totalMinutes = events.reduce((sum, e) => {
      const [sh, sm] = e.startTime.split(":").map(Number);
      const [eh, em] = e.endTime.split(":").map(Number);
      return sum + (eh * 60 + em) - (sh * 60 + sm);
    }, 0);

    // Events by category
    const byCategory = CATEGORIES.map((cat) => ({
      ...cat,
      count: events.filter((e) => e.categoryId === cat.id).length,
    }));

    return {
      totalEvents,
      todayEvents,
      totalHours: Math.round((totalMinutes / 60) * 10) / 10,
      byCategory,
    };
  }, [events]);

  return (
    <div>
      {/* Stats Cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4" dir="rtl">
        <div className="rounded-xl bg-blue-50 p-4">
          <div className="text-2xl font-bold text-blue-600">{stats.totalEvents}</div>
          <div className="text-sm text-blue-600/70">کل رویدادها</div>
        </div>
        <div className="rounded-xl bg-green-50 p-4">
          <div className="text-2xl font-bold text-green-600">{stats.todayEvents}</div>
          <div className="text-sm text-green-600/70">رویدادهای امروز</div>
        </div>
        <div className="rounded-xl bg-amber-50 p-4">
          <div className="text-2xl font-bold text-amber-600">{stats.totalHours}</div>
          <div className="text-sm text-amber-600/70">ساعت برنامه‌ریزی شده</div>
        </div>
        <div className="rounded-xl bg-purple-50 p-4">
          <div className="text-2xl font-bold text-purple-600">
            {stats.byCategory.filter((c) => c.count > 0).length}
          </div>
          <div className="text-sm text-purple-600/70">دسته‌بندی فعال</div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="mb-6 rounded-xl border p-4" dir="rtl">
        <h3 className="mb-3 font-bold text-gray-900">تفکیک بر اساس دسته‌بندی</h3>
        <div className="space-y-2">
          {stats.byCategory.map((cat) => (
            <div key={cat.id} className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <span className="flex-1 text-sm text-gray-700">{cat.name}</span>
              <span className="font-medium text-gray-900">{cat.count}</span>
            </div>
          ))}
        </div>
      </div>

      <MultiViewCalendar events={events} initialView="weekly" />
    </div>
  );
}

// ============================================================================
// Combined Example Component
// ============================================================================

type UseCase = "edit-delete" | "filter" | "export" | "search" | "stats";

export function Example4_AllUseCases() {
  const [activeUseCase, setActiveUseCase] = useState<UseCase>("edit-delete");

  const useCases: { id: UseCase; label: string }[] = [
    { id: "edit-delete", label: "ویرایش و حذف" },
    { id: "filter", label: "فیلتر" },
    { id: "export", label: "خروجی" },
    { id: "search", label: "جستجو" },
    { id: "stats", label: "آمار" },
  ];

  return (
    <div>
      {/* Use Case Selector */}
      <div className="mb-6 flex flex-wrap gap-2" dir="rtl">
        {useCases.map((uc) => (
          <button
            key={uc.id}
            onClick={() => setActiveUseCase(uc.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              activeUseCase === uc.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {uc.label}
          </button>
        ))}
      </div>

      {/* Render Active Use Case */}
      {activeUseCase === "edit-delete" && <Example4_EditDeleteEvents />}
      {activeUseCase === "filter" && <Example4_FilterEvents />}
      {activeUseCase === "export" && <Example4_ExportCalendar />}
      {activeUseCase === "search" && <Example4_SearchEvents />}
      {activeUseCase === "stats" && <Example4_EventStats />}
    </div>
  );
}
