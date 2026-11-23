import { useEffect } from "react";

import { BsCalendar, BsCalendarWeek, BsGrid3X3Gap } from "react-icons/bs";

import { CalendarView } from "../types";
import { cn } from "../utils/cn";

interface ViewSelectorProps {
  currentView: CalendarView;
  onViewChange: (view: CalendarView) => void;
}

export function ViewSelector({ currentView, onViewChange }: ViewSelectorProps) {
  // Keyboard shortcuts for view switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        return;
      }

      // Alt/Option + M/W/D for switching views
      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case "m":
            e.preventDefault();
            onViewChange("monthly");
            break;
          case "w":
            e.preventDefault();
            onViewChange("weekly");
            break;
          case "d":
            e.preventDefault();
            onViewChange("daily");
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onViewChange]);

  const options = [
    {
      label: "ماهانه",
      icon: BsGrid3X3Gap,
      value: "monthly" as CalendarView,
      title: "نمای ماهانه (Alt+M)",
      gradient: "from-purple-500 to-indigo-600",
      shadowColor: "shadow-purple-500/25",
    },
    {
      label: "هفتگی",
      icon: BsCalendarWeek,
      value: "weekly" as CalendarView,
      title: "نمای هفتگی (Alt+W)",
      gradient: "from-blue-500 to-cyan-600",
      shadowColor: "shadow-blue-500/25",
    },
    {
      label: "روزانه",
      icon: BsCalendar,
      value: "daily" as CalendarView,
      title: "نمای روزانه (Alt+D)",
      gradient: "from-emerald-500 to-teal-600",
      shadowColor: "shadow-emerald-500/25",
    },
  ];

  return (
    <div
      className="bg-card/80 shadow-border/10 ring-border relative inline-flex gap-1 rounded-2xl p-1.5 shadow-md ring-1 backdrop-blur-sm"
      role="tablist"
      aria-label="انتخاب نمای تقویم"
    >
      {options.map((option) => {
        const isSelected = currentView === option.value;
        const Icon = option.icon;

        return (
          <button
            key={option.value}
            onClick={() => onViewChange(option.value)}
            title={option.title}
            role="tab"
            aria-selected={isSelected}
            aria-controls={`calendar-${option.value}-view`}
            className={cn(
              "group relative flex min-w-[100px] cursor-pointer items-center justify-center gap-2.5 rounded-xl px-4! py-2.5! text-sm font-semibold transition-all duration-300",
              isSelected
                ? `bg-linear-to-r ${option.gradient} text-white shadow-lg ${option.shadowColor}`
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {/* Icon with animation */}
            <Icon
              size={17}
              className={cn(
                "transition-all duration-300",
                isSelected
                  ? "text-white"
                  : "text-gray-400 group-hover:scale-110 group-hover:text-gray-600"
              )}
            />

            {/* Label */}
            <span className="relative">
              {option.label}
              {/* Underline animation for non-selected */}
              {!isSelected && (
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-gray-400 transition-all duration-300 group-hover:w-full" />
              )}
            </span>

            {/* Active indicator dot */}
            {isSelected && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-50"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-white shadow-sm"></span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
