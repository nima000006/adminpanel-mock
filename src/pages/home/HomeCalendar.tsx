import { useState } from "react";

import {
  CalendarEvent,
  MultiViewCalendar,
} from "@components/Renderers/MultiViewCalendar";

const Home = () => {
  const [events] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "جلسه تیمی",
      startTime: "09:00",
      endTime: "10:30",
      date: "2025-10-29",
      color: "#3b82f6",
      description: "جلسه هفتگی تیم",
    },
    {
      id: "2",
      title: "مشاوره",
      startTime: "14:00",
      endTime: "15:00",
      recurring: {
        type: "weekly" as const,
        dayOfWeek: 1, // یکشنبه
        startDate: "2025-10-01",
        endDate: "2025-12-31",
      },
      color: "#10b981",
      description: "جلسه مشاوره هفتگی",
    },
  ]);
  return (
    <>
      <MultiViewCalendar
        events={events}
        onEventClick={(event: CalendarEvent) => {
          console.warn("Event clicked:", event);
          alert(
            `رویداد: ${event.title || "بدون عنوان"}\nزمان: ${event.startTime} - ${
              event.endTime
            }`
          );
        }}
        onDateClick={(date: Date) => {
          console.warn("Date clicked:", date);
        }}
        onTimeSlotSelect={(date: Date, startHour: number, endHour: number) => {
          console.warn("Time slot selected:", { date, startHour, endHour });
          const startTime = `${Math.floor(startHour)}:${Math.round((startHour % 1) * 60)
            .toString()
            .padStart(2, "0")}`;
          const endTime = `${Math.floor(endHour)}:${Math.round((endHour % 1) * 60)
            .toString()
            .padStart(2, "0")}`;
          alert(
            `بازه زمانی انتخاب شده:\nتاریخ: ${date.toLocaleDateString(
              "fa-IR"
            )}\nزمان: ${startTime} - ${endTime}`
          );
        }}
        initialView="weekly"
      />
      {}
    </>
  );
};

export default Home;
