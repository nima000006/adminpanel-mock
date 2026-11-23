# MultiViewCalendar - Persian Calendar Component

A **production-ready**, beautifully designed Persian (Jalali) calendar component for React projects with monthly, weekly, and daily views.

## ✨ Features

- 📅 **Multiple Views**: Monthly, Weekly, and Daily calendar views with smooth transitions
- 🇮🇷 **Persian Calendar**: Full Jalali (Solar Hijri) calendar support using `jalali-moment` for reliable conversions
- 🎨 **Modern UI Design**:
  - Glassmorphism effects with subtle gradients
  - Smooth animations and micro-interactions
  - Beautiful shadows and depth
  - Color-coded event cards with dynamic styling
  - **Overlapping events layout** - Events that overlap are displayed side-by-side
- 🕐 **Time Management**:
  - Customizable day start hour with 24-hour display
  - Drag-to-select time slots for event creation
  - Real-time "Now" indicator with animated dot
- 🎉 **Holiday Support**:
  - Automatic Iranian solar holidays detection
  - Lunar (Hijri) Islamic holidays included
  - Visual distinction for holidays and Fridays
  - **Custom holiday system** via `useCustomHolidays` hook
- ♿ **Accessibility**:
  - Full ARIA labels for screen readers
  - Keyboard navigation support (Arrow keys, T for today, Alt+M/W/D for views)
  - Focus states and visual indicators
- 📱 **Responsive**: Works beautifully on all screen sizes

## 🚀 Installation

### Step 1: Copy the Folder

Copy this entire `MultiViewCalendar` folder into your project's components directory.

### Step 2: Install Dependencies

```bash
npm install clsx tailwind-merge react-icons jalali-moment
```

### Step 3: Configure Tailwind

Add to your `tailwind.config.js`:

```javascript
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
};
```

## 🎯 Quick Usage

```tsx
import { MultiViewCalendar } from "./components/MultiViewCalendar";

function App() {
  const events = [
    {
      id: "1",
      title: "جلسه تیم",
      startTime: "09:00",
      endTime: "10:30",
      date: "2025-03-21",
      color: "#3b82f6",
    },
    {
      id: "2",
      title: "کلاس آموزش",
      startTime: "14:00",
      endTime: "16:00",
      recurring: {
        type: "weekly",
        dayOfWeek: 0, // Saturday
        startDate: "2025-01-01",
        endDate: "2025-12-31",
      },
      color: "#10b981",
    },
  ];

  return (
    <MultiViewCalendar
      events={events}
      onEventClick={(event, dateStr) => console.log("Event clicked:", event)}
      onDateClick={(date) => console.log("Date clicked:", date)}
      onTimeSlotSelect={(date, startHour, endHour) => {
        console.log("Time slot selected:", date, startHour, endHour);
      }}
    />
  );
}
```

## Props

### MultiViewCalendar

| Prop               | Type                                                       | Required | Default      | Description                                       |
| ------------------ | ---------------------------------------------------------- | -------- | ------------ | ------------------------------------------------- |
| `events`           | `CalendarEvent[]`                                          | Yes      | -            | Array of events to display                        |
| `onEventClick`     | `(event: CalendarEvent, dateStr?: string) => void`         | No       | -            | Callback when an event is clicked                 |
| `onDateClick`      | `(date: Date) => void`                                     | No       | -            | Callback when a date is clicked                   |
| `onDayClick`       | `(date: Date) => void`                                     | No       | -            | Callback when a day header is clicked             |
| `onTimeSlotSelect` | `(date: Date, startHour: number, endHour: number) => void` | No       | -            | Callback when a time slot is selected by dragging |
| `initialView`      | `'daily' \| 'weekly' \| 'monthly'`                         | No       | `'weekly'`   | Initial calendar view                             |
| `initialDate`      | `Date`                                                     | No       | `new Date()` | Initial date to display                           |
| `dayStartHour`     | `number`                                                   | No       | `7`          | Hour to start the day display (0-23)              |
| `showTodayButton`  | `boolean`                                                  | No       | `true`       | Show "Today" button                               |
| `className`        | `string`                                                   | No       | -            | Additional CSS classes                            |

## Event Type

```typescript
interface CalendarEvent {
  id: string;
  title?: string;
  startTime: string; // HH:mm format (e.g., "09:00")
  endTime: string; // HH:mm format (e.g., "10:30")
  date?: string; // YYYY-MM-DD format for single events
  recurring?: {
    // For recurring events
    type: "weekly" | "monthly";
    dayOfWeek?: number; // 0-6 (Saturday is 0)
    dayOfMonth?: number; // 1-31
    startDate?: string; // YYYY-MM-DD
    endDate?: string; // YYYY-MM-DD
  };
  color?: string; // Hex color (e.g., "#3b82f6")
  description?: string;
}
```

## Advanced Usage

### With Recurring Events

```tsx
const recurringEvent = {
  id: "2",
  title: "Weekly Team Meeting",
  startTime: "14:00",
  endTime: "15:00",
  recurring: {
    type: "weekly" as const,
    dayOfWeek: 1, // Sunday
    startDate: "2025-03-21",
    endDate: "2025-06-21",
  },
  color: "#10b981",
};
```

### Custom Day Start Hour

```tsx
<MultiViewCalendar
  events={events}
  dayStartHour={8} // Calendar starts at 8:00 AM
  onEventClick={handleEventClick}
/>
```

### Different Initial View

```tsx
<MultiViewCalendar
  events={events}
  initialView="monthly"
  initialDate={new Date(2025, 2, 21)}
/>
```

## 📚 Backend Integration Examples

The `examples/` folder contains complete integration examples for common use cases:

### Example 1: Create Event with Modal

Drag-to-select time slots → Open modal → Submit to backend API.

```tsx
import { Example1_CreateEventWithModal } from "./examples";

function App() {
  return <Example1_CreateEventWithModal />;
}
```

### Example 2: Load Events from Backend

Fetch events from API → Transform to calendar format → Display with loading states.

```tsx
import { Example2_LoadEventsFromBackend } from "./examples";

function App() {
  return <Example2_LoadEventsFromBackend />;
}
```

### Example 3: Custom Holidays

Fetch holidays from backend API → Mark special days → Custom styling.

```tsx
import { Example3_CustomHolidays } from "./examples";

function App() {
  return <Example3_CustomHolidays />;
}
```

### Example 4: Additional Use Cases

Edit/Delete events, Filtering, Export, Search, Statistics dashboards.

```tsx
import {
  CalendarWithEditDelete,
  CalendarWithFilters,
  CalendarWithExport,
  CalendarWithSearch,
  CalendarWithStats,
} from "./examples";
```

## 🔧 Overlapping Events

The calendar automatically handles overlapping events by displaying them side-by-side:

- Events with overlapping times are grouped together
- Each event gets an equal portion of the available width
- Uses a greedy column assignment algorithm for optimal layout
- Works in both Daily and Weekly views

```
┌───────────┐
│ Event A   │ ← Single event gets full width
└───────────┘

┌─────┬─────┐
│ A   │ B   │ ← Two overlapping events share width
└─────┴─────┘

┌───┬───┬───┐
│ A │ B │ C │ ← Three overlapping events
└───┴───┴───┘
```

## Styling

The calendar uses Tailwind CSS v4 for styling. You can customize the appearance by:

1. **Adding Custom Classes**:

```tsx
<MultiViewCalendar events={events} className="rounded-xl shadow-lg" />
```

2. **Overriding Styles**: Create custom CSS classes and apply them
3. **Modifying Event Colors**: Pass `color` prop in events

## Utilities

The package includes useful utilities you can import:

```tsx
import {
  gregorianToPersian,
  persianToGregorian,
  englishToPersianNumbers,
  formatPersianDate,
  isOfficialHoliday,
  getHolidayName,
} from "./MultiViewCalendar/utils";

// Convert Gregorian to Persian (uses jalali-moment internally)
const persianDate = gregorianToPersian(new Date());
console.log(persianDate); // { year: 1404, month: 1, day: 1 }

// Check if a date is a holiday
const isHoliday = isOfficialHoliday(new Date());

// Get Persian numbers
const persianNum = englishToPersianNumbers("123");
console.log(persianNum); // "۱۲۳"
```

## File Structure

```
MultiViewCalendar/
├── README.md                          # This file
├── index.ts                           # Main exports
├── MultiViewCalendar.tsx              # Main component
├── types.ts                           # TypeScript types
├── components/
│   ├── MonthlyView.tsx               # Monthly calendar view
│   ├── WeeklyView.tsx                # Weekly calendar view (with overlap layout)
│   ├── DailyView.tsx                 # Daily calendar view (with overlap layout)
│   ├── CalendarHeader.tsx            # Calendar header with navigation
│   ├── ViewSelector.tsx              # View switcher buttons
│   └── SimpleEventCard.tsx           # Event display card
├── examples/
│   ├── index.ts                      # Example exports
│   ├── Example1_CreateEventWithModal.tsx
│   ├── Example2_LoadEventsFromBackend.tsx
│   ├── Example3_CustomHolidays.tsx
│   └── Example4_AdditionalUseCases.tsx
├── hooks/
│   ├── useDragSelection.ts           # Drag-to-select hook
│   └── useCustomHolidays.ts          # Custom holiday hook
├── utils/
│   ├── persian-date.ts               # Persian calendar (uses jalali-moment)
│   ├── date-helpers.ts               # Date utility functions
│   ├── event-layout.ts               # Overlapping event layout algorithm
│   ├── iranian-holidays.ts           # Holiday detection
│   ├── hijri-converter.ts            # Islamic calendar conversion
│   └── cn.ts                         # Class name utility
└── styles/
    └── calendar.css                  # Optional CSS styles
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires ES2015+ support

## License

MIT

## Credits

Based on the Persian Calendar implementation with support for Jalali calendar system and Iranian holidays.
