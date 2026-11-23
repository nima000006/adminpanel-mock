import { useMemo, useEffect } from "react";

import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

import { CalendarView } from "../types";
import { ViewSelector } from "./ViewSelector";
import {
  PERSIAN_MONTHS,
  englishToPersianNumbers,
  formatPersianDate,
  gregorianToPersian,
} from "../utils/persian-date";

interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarView;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewChange: (view: CalendarView) => void;
  showTodayButton?: boolean;
}

export function CalendarHeader({
  currentDate,
  view,
  onPrevious,
  onNext,
  onToday,
  onViewChange,
  showTodayButton = true,
}: CalendarHeaderProps) {
  const persianDate = gregorianToPersian(currentDate);
  const today = useMemo(() => gregorianToPersian(new Date()), []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if no input/textarea is focused
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          onPrevious();
          break;
        case "ArrowRight":
          e.preventDefault();
          onNext();
          break;
        case "t":
        case "T":
          if (!e.ctrlKey && !e.metaKey && !e.altKey) {
            e.preventDefault();
            onToday();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrevious, onToday]);

  // Check if current view is showing today
  const isShowingToday = useMemo(() => {
    if (view === "daily") {
      return (
        persianDate.year === today.year &&
        persianDate.month === today.month &&
        persianDate.day === today.day
      );
    } else if (view === "monthly") {
      return persianDate.year === today.year && persianDate.month === today.month;
    }
    // For weekly view, check if current week contains today
    if (view === "weekly") {
      const todayDate = new Date();
      const weekStart = new Date(currentDate);
      const currentDayOfWeek = (currentDate.getDay() + 1) % 7;
      weekStart.setDate(currentDate.getDate() - currentDayOfWeek);
      weekStart.setHours(0, 0, 0, 0);

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      const todayTime = todayDate.getTime();
      return todayTime >= weekStart.getTime() && todayTime <= weekEnd.getTime();
    }
    return false;
  }, [persianDate, today, view, currentDate]);

  const getDateLabel = () => {
    if (view === "daily") {
      return formatPersianDate(persianDate);
    } else {
      return `${PERSIAN_MONTHS[persianDate.month - 1]} ${englishToPersianNumbers(
        persianDate.year.toString()
      )}`;
    }
  };

  const getNavigationLabel = () => {
    switch (view) {
      case "daily":
        return { prev: "روز قبل", next: "روز بعد" };
      case "weekly":
        return { prev: "هفته قبل", next: "هفته بعد" };
      case "monthly":
        return { prev: "ماه قبل", next: "ماه بعد" };
      default:
        return { prev: "قبلی", next: "بعدی" };
    }
  };

  const navLabels = getNavigationLabel();

  return (
    <div
      className="border-border from-muted via-card sticky top-0 z-50 mb-6 overflow-hidden rounded-2xl border bg-linear-to-br to-blue-50/30 px-6 pt-5 pb-5 shadow-lg shadow-blue-500/5 backdrop-blur-xl transition-all"
      dir="rtl"
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-linear-to-br from-blue-400/10 to-purple-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 -bottom-12 h-32 w-32 rounded-full bg-linear-to-br from-emerald-400/10 to-cyan-400/10 blur-2xl" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Date Display */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center gap-3">
            {/* Calendar Icon with gradient background */}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-foreground m-0 font-[DanaFaNum] text-2xl font-black tracking-tight sm:text-3xl">
                {getDateLabel()}
              </h1>
              <p className="mt-0.5 text-sm font-medium text-gray-500">
                {view === "daily"
                  ? "نمای روزانه"
                  : view === "weekly"
                    ? "نمای هفتگی"
                    : "نمای ماهانه"}
              </p>
            </div>

            {isShowingToday && (
              <div className="flex items-center gap-2 rounded-full bg-linear-to-r from-emerald-500 to-green-600 px-3! py-1.5! shadow-lg shadow-emerald-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                </span>
                <span className="text-xs font-bold text-white">امروز</span>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-end gap-3">
          {/* Navigation Controls */}
          <div className="flex items-center gap-1 rounded-2xl bg-white/80 p-1.5! shadow-md ring-1 shadow-gray-200/50 ring-gray-100 backdrop-blur-sm">
            <button
              onClick={onPrevious}
              aria-label={navLabels.prev}
              title={navLabels.prev}
              className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-gray-500 transition-all duration-200 hover:bg-linear-to-br hover:from-blue-500 hover:to-indigo-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/25 focus:ring-2 focus:ring-blue-500/20 focus:outline-none active:scale-95"
            >
              <IoChevronForwardOutline className="text-lg transition-transform group-hover:scale-110" />
            </button>

            {showTodayButton && (
              <button
                onClick={onToday}
                aria-label="برو به امروز (T)"
                title="برو به امروز (T)"
                className="h-10! cursor-pointer rounded-xl bg-linear-to-r from-gray-50 to-gray-100 px-5! text-sm font-bold text-gray-700 ring-1 ring-gray-200/50 transition-all duration-200 hover:from-blue-500 hover:to-indigo-600 hover:text-white hover:shadow-lg hover:ring-0 hover:shadow-blue-500/25 focus:ring-2 focus:ring-blue-500/20 focus:outline-none active:scale-95"
              >
                برو به امروز
              </button>
            )}

            <button
              onClick={onNext}
              aria-label={navLabels.next}
              title={navLabels.next}
              className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-gray-500 transition-all duration-200 hover:bg-linear-to-br hover:from-blue-500 hover:to-indigo-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/25 focus:ring-2 focus:ring-blue-500/20 focus:outline-none active:scale-95"
            >
              <IoChevronBackOutline className="text-lg transition-transform group-hover:scale-110" />
            </button>
          </div>

          {/* Divider */}
          <div className="mx-1! hidden h-10 w-px bg-linear-to-b from-transparent via-gray-200 to-transparent sm:block"></div>

          {/* View Selector */}
          <ViewSelector currentView={view} onViewChange={onViewChange} />
        </div>
      </div>
    </div>
  );
}
