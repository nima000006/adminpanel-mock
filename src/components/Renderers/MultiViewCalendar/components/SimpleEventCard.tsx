import React from "react";

import { IoTimeOutline, IoRepeatOutline } from "react-icons/io5";

import { CalendarEvent } from "../types";
import { cn } from "../utils/cn";
import { englishToPersianNumbers } from "../utils/persian-date";

interface SimpleEventCardProps {
  event: CalendarEvent;
  onClick?: (e: React.MouseEvent) => void;
  showTime?: boolean;
  compact?: boolean;
  className?: string;
  showBadge?: boolean;
}

export function SimpleEventCard({
  event,
  onClick,
  showTime = true,
  compact = false,
  className = "",
  showBadge = false,
}: SimpleEventCardProps) {
  const eventColor = event.color || "#3b82f6"; // Default blue-500

  // Determine event status based on time
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
  const isActive = currentTime >= event.startTime && currentTime <= event.endTime;

  return (
    <div
      className={cn(
        "group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border-0 transition-all duration-300",
        "hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl",
        "focus:ring-2 focus:ring-offset-2 focus:outline-none",
        className
      )}
      style={
        {
          background: `linear-gradient(135deg, ${eventColor}15 0%, ${eventColor}08 100%)`,
          boxShadow: `0 4px 16px -4px ${eventColor}30, inset 0 1px 0 ${eventColor}20`,
          "--tw-ring-color": eventColor,
        } as React.CSSProperties
      }
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${event.title || "رویداد"} از ${englishToPersianNumbers(event.startTime)} تا ${englishToPersianNumbers(event.endTime)}${event.recurring ? ` - ${event.recurring.type === "weekly" ? "هفتگی" : "ماهانه"}` : ""}`}
      title={`${event.title} (${englishToPersianNumbers(event.startTime)} - ${englishToPersianNumbers(event.endTime)})`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(e as unknown as React.MouseEvent);
        }
      }}
    >
      {/* Accent Bar with gradient (Right side for RTL) */}
      <div
        className="absolute top-0 right-0 bottom-0 w-1 transition-all duration-300 group-hover:w-1.5"
        style={{
          background: `linear-gradient(to bottom, ${eventColor}, ${eventColor}cc)`,
          boxShadow: `2px 0 8px ${eventColor}40`,
        }}
      />

      {/* Glass morphism overlay on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${eventColor}10, transparent 50%, ${eventColor}05)`,
        }}
      />

      {/* Content Container */}
      <div
        className={cn(
          "relative flex flex-col px-3 py-2",
          compact ? "gap-0.5" : "gap-1.5"
        )}
      >
        {/* Header: Time & Status Indicators */}
        <div className="flex items-center justify-between">
          {showTime && (
            <div
              className={cn(
                "flex items-center gap-1.5 rounded-full px-2 py-0.5 font-semibold backdrop-blur-sm",
                compact ? "text-[10px]" : "text-xs"
              )}
              style={{
                backgroundColor: `${eventColor}15`,
                color: eventColor,
              }}
            >
              <IoTimeOutline className={compact ? "text-[10px]" : "text-xs"} />
              <span className="tracking-tight">
                {englishToPersianNumbers(event.startTime)}
                {!compact && (
                  <span className="opacity-60">
                    {" "}
                    ← {englishToPersianNumbers(event.endTime)}
                  </span>
                )}
              </span>
            </div>
          )}

          {/* Status/Recurring Indicators */}
          <div className="flex items-center gap-1.5">
            {event.recurring && (
              <div
                className="flex items-center justify-center rounded-full p-1"
                style={{ backgroundColor: `${eventColor}15` }}
                title={
                  event.recurring.type === "weekly" ? "رویداد هفتگی" : "رویداد ماهانه"
                }
              >
                <IoRepeatOutline style={{ color: eventColor }} size={compact ? 10 : 12} />
              </div>
            )}
            {showBadge && isActive && (
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: eventColor }}
                ></span>
                <span
                  className="relative inline-flex h-2.5 w-2.5 rounded-full ring-2 ring-white"
                  style={{ backgroundColor: eventColor }}
                ></span>
              </span>
            )}
          </div>
        </div>

        {/* Title with better typography */}
        <h3
          className={cn(
            "truncate leading-tight font-bold text-gray-800 transition-colors",
            compact ? "text-xs" : "text-sm",
            "group-hover:text-gray-900"
          )}
        >
          {event.title || "بدون عنوان"}
        </h3>

        {/* Description (Only if not compact) */}
        {!compact && event.description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-gray-500 group-hover:text-gray-600">
            {event.description}
          </p>
        )}
      </div>

      {/* Bottom gradient accent on hover */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(to right, transparent, ${eventColor}60, transparent)`,
        }}
      />
    </div>
  );
}
