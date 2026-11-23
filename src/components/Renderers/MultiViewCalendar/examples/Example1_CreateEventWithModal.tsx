/**
 * Example 1: Creating Events with Modal + Backend Integration
 *
 * This example shows how to:
 * 1. Capture drag selection on calendar (time slot selection)
 * 2. Open a modal with a form to collect event details
 * 3. Submit the data to your backend API
 * 4. Update the calendar with the new event
 */

import { useState, useCallback } from "react";

import { MultiViewCalendar } from "../MultiViewCalendar";
import { CalendarEvent } from "../types";

// ============================================================================
// Types for your backend API
// ============================================================================

interface CreateEventPayload {
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  color?: string;
}

interface CreateEventResponse {
  id: string;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  color?: string;
}

// ============================================================================
// Modal State Type
// ============================================================================

interface ModalState {
  isOpen: boolean;
  date: Date | null;
  startHour: number;
  endHour: number;
}

// ============================================================================
// Example Component
// ============================================================================

export function Example1_CreateEventWithModal() {
  // Calendar events state
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Modal state
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    date: null,
    startHour: 0,
    endHour: 0,
  });

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    color: "#3b82f6",
  });

  // Loading state for API calls
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============================================================================
  // Handler: When user drags to select a time slot
  // ============================================================================

  const handleTimeSlotSelect = useCallback(
    (date: Date, startHour: number, endHour: number) => {
      // Open modal with the selected time information
      setModal({
        isOpen: true,
        date,
        startHour,
        endHour,
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        color: "#3b82f6",
      });
    },
    []
  );

  // ============================================================================
  // Helper: Format hour number to HH:mm string
  // ============================================================================

  const formatHourToTime = (hour: number): string => {
    const h = Math.floor(hour);
    const m = Math.round((hour - h) * 60);
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  // ============================================================================
  // Helper: Format date to YYYY-MM-DD
  // ============================================================================

  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // ============================================================================
  // API Call: Create event in backend
  // ============================================================================

  const createEventInBackend = async (
    payload: CreateEventPayload
  ): Promise<CreateEventResponse> => {
    // Replace this with your actual API call
    // Example using fetch:

    /*
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${yourAuthToken}`,
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create event');
    }
    
    return response.json();
    */

    // Mock implementation for demo:
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

    return {
      id: `event-${Date.now()}`,
      ...payload,
    };
  };

  // ============================================================================
  // Handler: Submit form and create event
  // ============================================================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!modal.date || !formData.title.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: CreateEventPayload = {
        title: formData.title,
        description: formData.description || undefined,
        date: formatDateToString(modal.date),
        startTime: formatHourToTime(modal.startHour),
        endTime: formatHourToTime(modal.endHour),
        color: formData.color,
      };

      // Call your backend API
      const createdEvent = await createEventInBackend(payload);

      // Add the new event to calendar
      const newEvent: CalendarEvent = {
        id: createdEvent.id,
        title: createdEvent.title,
        description: createdEvent.description,
        date: createdEvent.date,
        startTime: createdEvent.startTime,
        endTime: createdEvent.endTime,
        color: createdEvent.color,
      };

      setEvents((prev) => [...prev, newEvent]);

      // Close modal
      setModal({ isOpen: false, date: null, startHour: 0, endHour: 0 });

      // Optional: Show success toast/notification
      console.warn("Event created successfully:", createdEvent);
    } catch (error) {
      console.error("Failed to create event:", error);
      // Handle error - show toast/notification
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================================================
  // Handler: Close modal
  // ============================================================================

  const handleCloseModal = () => {
    setModal({ isOpen: false, date: null, startHour: 0, endHour: 0 });
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div className="relative">
      {/* Calendar Component */}
      <MultiViewCalendar
        events={events}
        onTimeSlotSelect={handleTimeSlotSelect}
        onEventClick={(event) => {
          console.warn("Event clicked:", event);
          // You can open an edit modal here
        }}
        initialView="weekly"
        dayStartHour={7}
      />

      {/* Create Event Modal */}
      {modal.isOpen && modal.date && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" dir="rtl">
            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">ایجاد رویداد جدید</h2>
              <button
                onClick={handleCloseModal}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Selected Time Info */}
            <div className="mb-6 rounded-xl bg-blue-50 p-4">
              <div className="text-sm text-blue-600">
                <span className="font-medium">تاریخ: </span>
                {modal.date.toLocaleDateString("fa-IR")}
              </div>
              <div className="mt-1 text-sm text-blue-600">
                <span className="font-medium">ساعت: </span>
                {formatHourToTime(modal.startHour)} - {formatHourToTime(modal.endHour)}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  عنوان رویداد *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="مثال: جلسه تیم"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  required
                  autoFocus
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  توضیحات
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="توضیحات اختیاری..."
                  rows={3}
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>

              {/* Color Picker */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  رنگ
                </label>
                <div className="flex gap-2">
                  {["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"].map(
                    (color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, color }))}
                        className={`h-8 w-8 rounded-full transition-transform hover:scale-110 ${
                          formData.color === color ? "ring-2 ring-offset-2" : ""
                        }`}
                        style={{
                          backgroundColor: color,
                          // Use CSS variable for ring color when selected
                          ["--tw-ring-color" as string]:
                            formData.color === color ? color : undefined,
                        }}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.title.trim()}
                  className="flex-1 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "در حال ذخیره..." : "ذخیره رویداد"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-xl border border-gray-200 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Usage with React Query (TanStack Query) - Alternative Implementation
// ============================================================================

/*
import { useMutation, useQueryClient } from '@tanstack/react-query';

// In your component:
const queryClient = useQueryClient();

const createEventMutation = useMutation({
  mutationFn: createEventInBackend,
  onSuccess: (newEvent) => {
    // Invalidate and refetch events
    queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
    
    // Or optimistically update the cache
    queryClient.setQueryData(['calendar-events'], (old: CalendarEvent[]) => 
      [...old, newEvent]
    );
    
    handleCloseModal();
  },
  onError: (error) => {
    console.error('Failed to create event:', error);
    // Show error toast
  },
});

// In handleSubmit:
createEventMutation.mutate(payload);
*/

// ============================================================================
// Usage with Axios - Alternative API Call
// ============================================================================

/*
import axios from 'axios';

const createEventInBackend = async (payload: CreateEventPayload) => {
  const { data } = await axios.post<CreateEventResponse>('/api/events', payload);
  return data;
};
*/
