// MultiViewCalendar Examples Index
// This file exports all example components for easy importing

// Example 1: Create Event with Modal on Drag Selection
// Demonstrates: Drag to select time slot → Open modal → Submit to backend
export { Example1_CreateEventWithModal } from "./Example1_CreateEventWithModal";

// Example 2: Load Events from Backend API
// Demonstrates: Fetch events from API → Transform to calendar format → Display with loading states
export { Example2_LoadEventsFromBackend } from "./Example2_LoadEventsFromBackend";

// Example 3: Custom Holidays from Backend
// Demonstrates: Fetch holidays from API → Mark special days → Custom styling
export { Example3_CustomHolidays } from "./Example3_CustomHolidays";

// Example 4: Additional Use Cases
// Demonstrates: Edit/Delete events, Filtering, Export, Search, Statistics
export {
  Example4_EditDeleteEvents,
  Example4_FilterEvents,
  Example4_ExportCalendar,
  Example4_SearchEvents,
  Example4_EventStats,
  Example4_AllUseCases,
} from "./Example4_AdditionalUseCases";

// Re-export types commonly used with examples
export type { CalendarEvent } from "../types";
