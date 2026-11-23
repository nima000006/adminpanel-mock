import { useState, useCallback, useRef, useEffect } from "react";

import { formatHourToTime } from "../utils/date-helpers";

export interface DragSelection {
  startDate: Date;
  endDate: Date;
  startHour: number;
  endHour: number;
}

export interface UseDragSelectionProps {
  onDragComplete: (selection: DragSelection) => void;
  timeSlotHeight: number;
  hourHeight: number;
  dayStartHour?: number;
}

export function useDragSelection({
  onDragComplete,
  timeSlotHeight,
  hourHeight,
  dayStartHour = 7,
}: UseDragSelectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragSelection, setDragSelection] = useState<DragSelection | null>(null);
  const [dragPreview, setDragPreview] = useState<{
    top: number;
    height: number;
    left: number;
    width: number;
  } | null>(null);

  const dragStartRef = useRef<{
    date: Date;
    hour: number;
    relativeY: number;
    element: HTMLElement;
  } | null>(null);

  // Store the latest dragSelection in a ref for use in global event handlers
  const dragSelectionRef = useRef<DragSelection | null>(null);
  dragSelectionRef.current = dragSelection;

  // Store onDragComplete in a ref to avoid stale closures
  const onDragCompleteRef = useRef(onDragComplete);
  onDragCompleteRef.current = onDragComplete;

  const snapToQuarter = useCallback((hour: number): number => {
    return Math.round(hour * 4) / 4;
  }, []);

  const getEventDisplayPosition = (
    startTime: string,
    endTime: string,
    dayStart: number
  ) => {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    const dayStartMinutes = dayStart * 60;

    const top = ((startMinutes - dayStartMinutes) / 60) * hourHeight;
    const height = ((endMinutes - startMinutes) / 60) * hourHeight;

    return { top, height };
  };

  const handleMouseDown = useCallback(
    (event: React.MouseEvent, date: Date, hour: number, element: HTMLElement) => {
      event.preventDefault();

      const rect = element.getBoundingClientRect();
      const elementRelativeY = event.clientY - rect.top;
      const hourProgress = elementRelativeY / rect.height;
      const preciseHour = hour + hourProgress;
      const snappedHour = snapToQuarter(preciseHour);

      const container = element.closest("[data-calendar-container]") as HTMLElement;
      const containerRect = container ? container.getBoundingClientRect() : rect;
      const containerRelativeY = event.clientY - containerRect.top;

      dragStartRef.current = {
        date,
        hour: snappedHour,
        relativeY: containerRelativeY,
        element,
      };

      setIsDragging(true);

      setDragSelection({
        startDate: date,
        endDate: date,
        startHour: snappedHour,
        endHour: snappedHour + 0.25,
      });

      const startTimeStr = formatHourToTime(snappedHour);
      const endTimeStr = formatHourToTime(snappedHour + 0.25);
      const { top: initialTop, height: initialHeight } = getEventDisplayPosition(
        startTimeStr,
        endTimeStr,
        dayStartHour
      );

      setDragPreview({
        top: initialTop,
        height: initialHeight,
        left: 0,
        width: rect.width,
      });
    },
    [timeSlotHeight, snapToQuarter, hourHeight, dayStartHour]
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent, containerElement: HTMLElement) => {
      if (!isDragging || !dragStartRef.current) return;

      const rect = containerElement.getBoundingClientRect();
      const currentY = event.clientY - rect.top;
      // const startY = dragStartRef.current.relativeY;

      const pixelsPerHour = timeSlotHeight;
      const currentSlotIndex = currentY / pixelsPerHour;

      function slotIndexToActualHour(slotIndex: number): number {
        const boundedSlot = Math.max(0, Math.min(23.75, slotIndex));
        const slot = Math.floor(boundedSlot);
        const fraction = boundedSlot - slot;
        const actualHour = (dayStartHour + slot + fraction) % 24;
        return actualHour;
      }

      const currentActualHour = slotIndexToActualHour(currentSlotIndex);
      const currentSnappedHour = snapToQuarter(currentActualHour);
      const originalStartHour = dragStartRef.current.hour;

      let finalStartHour, finalEndHour;
      const startHour = originalStartHour;
      const endHour = currentSnappedHour;

      const startSlot =
        startHour >= dayStartHour
          ? startHour - dayStartHour
          : startHour + (24 - dayStartHour);
      const endSlot =
        endHour >= dayStartHour ? endHour - dayStartHour : endHour + (24 - dayStartHour);

      if (startSlot <= endSlot) {
        finalStartHour = startHour;
        finalEndHour = endHour;
      } else {
        finalStartHour = endHour;
        finalEndHour = startHour;
      }

      if (finalStartHour === finalEndHour) {
        finalEndHour = finalStartHour + 0.25;
        if (finalEndHour >= 24) {
          finalEndHour = finalEndHour - 24;
        }
      }

      setDragSelection({
        startDate: dragStartRef.current.date,
        endDate: dragStartRef.current.date,
        startHour: finalStartHour,
        endHour: finalEndHour,
      });

      const startTimeStr = formatHourToTime(finalStartHour);
      const endTimeStr = formatHourToTime(finalEndHour);
      const { top, height } = getEventDisplayPosition(
        startTimeStr,
        endTimeStr,
        dayStartHour
      );

      setDragPreview({
        top: top,
        height: height,
        left: 0,
        width: rect.width,
      });
    },
    [isDragging, timeSlotHeight, dayStartHour, snapToQuarter, hourHeight]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging && dragSelectionRef.current) {
      onDragCompleteRef.current(dragSelectionRef.current);
    }

    setIsDragging(false);
    setDragSelection(null);
    setDragPreview(null);
    dragStartRef.current = null;
  }, [isDragging]);

  // Global mouseup handler to catch releases outside the container
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseUp = () => {
      if (dragSelectionRef.current) {
        onDragCompleteRef.current(dragSelectionRef.current);
      }
      setIsDragging(false);
      setDragSelection(null);
      setDragPreview(null);
      dragStartRef.current = null;
    };

    // Add global listeners when dragging starts
    document.addEventListener("mouseup", handleGlobalMouseUp);
    // Also handle if mouse leaves window entirely
    document.addEventListener("mouseleave", handleGlobalMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("mouseleave", handleGlobalMouseUp);
    };
  }, [isDragging]);

  const handleMouseLeave = useCallback(() => {
    // Don't cancel drag on container leave - global handler will catch mouseup
    // Only reset if user explicitly wants to cancel (could add escape key handler)
  }, []);

  return {
    isDragging,
    dragSelection,
    dragPreview,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
  };
}
