export interface EventPosition {
  top: number;
  height: number;
}

/**
 * Extended event position including horizontal layout for overlapping events
 */
export interface EventLayoutPosition extends EventPosition {
  left: number; // Percentage from left (0-100)
  width: number; // Width percentage (0-100)
  column: number; // Column index for the event
  totalColumns: number; // Total columns in this overlap group
}

/**
 * Event with timing information for layout calculation
 */
export interface LayoutEvent {
  id: string;
  startTime: string; // HH:mm
  endTime: string; // HH:mm
}

/**
 * Calculates the vertical position and height of an event in the calendar grid.
 *
 * @param startTime - Event start time in "HH:mm" format
 * @param endTime - Event end time in "HH:mm" format
 * @param dayStartHour - The hour the calendar day starts (e.g., 7 for 7:00 AM)
 * @param hourHeight - The height in pixels of one hour slot
 * @returns Object containing top position and height in pixels
 */
export function getEventPosition(
  startTime: string,
  endTime: string,
  dayStartHour: number,
  hourHeight: number
): EventPosition {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;
  const dayStartMinutes = dayStartHour * 60;

  const top = ((startMinutes - dayStartMinutes) / 60) * hourHeight;
  const height = ((endMinutes - startMinutes) / 60) * hourHeight;

  return { top, height };
}

/**
 * Calculates the vertical position for a specific time.
 * Useful for the "Now" indicator.
 *
 * @param date - The date object containing the time
 * @param dayStartHour - The hour the calendar day starts
 * @param hourHeight - The height in pixels of one hour slot
 * @returns Top position in pixels
 */
export function getTimePosition(
  date: Date,
  dayStartHour: number,
  hourHeight: number
): number {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const currentMinutes = hours * 60 + minutes;
  const dayStartMinutes = dayStartHour * 60;

  return ((currentMinutes - dayStartMinutes) / 60) * hourHeight;
}

// ============================================================================
// Overlapping Events Layout Algorithm
// ============================================================================

/**
 * Convert time string to minutes from midnight
 */
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

/**
 * Check if two events overlap
 */
function eventsOverlap(event1: LayoutEvent, event2: LayoutEvent): boolean {
  const start1 = timeToMinutes(event1.startTime);
  const end1 = timeToMinutes(event1.endTime);
  const start2 = timeToMinutes(event2.startTime);
  const end2 = timeToMinutes(event2.endTime);

  // Events overlap if one starts before the other ends
  return start1 < end2 && start2 < end1;
}

/**
 * Find all overlapping groups of events
 * Events in the same group all overlap with at least one other event in the group
 */
function findOverlapGroups(events: LayoutEvent[]): LayoutEvent[][] {
  if (events.length === 0) return [];

  // Sort events by start time, then by end time
  const sorted = [...events].sort((a, b) => {
    const startDiff = timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
    if (startDiff !== 0) return startDiff;
    return timeToMinutes(a.endTime) - timeToMinutes(b.endTime);
  });

  const groups: LayoutEvent[][] = [];
  const assigned = new Set<string>();

  for (const event of sorted) {
    if (assigned.has(event.id)) continue;

    // Start a new group with this event
    const group: LayoutEvent[] = [event];
    assigned.add(event.id);

    // Find all events that overlap with any event in this group
    let groupChanged = true;
    while (groupChanged) {
      groupChanged = false;
      for (const other of sorted) {
        if (assigned.has(other.id)) continue;

        // Check if this event overlaps with any event in the group
        const overlapsWithGroup = group.some((groupEvent) =>
          eventsOverlap(groupEvent, other)
        );

        if (overlapsWithGroup) {
          group.push(other);
          assigned.add(other.id);
          groupChanged = true;
        }
      }
    }

    groups.push(group);
  }

  return groups;
}

/**
 * Assign columns to events within an overlap group
 * Uses a greedy algorithm to minimize the number of columns
 */
function assignColumns(group: LayoutEvent[]): Map<string, number> {
  // Sort by start time
  const sorted = [...group].sort(
    (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
  );

  const columns = new Map();
  const columnEndTimes: number[] = []; // Track when each column becomes free

  for (const event of sorted) {
    const startMinutes = timeToMinutes(event.startTime);
    const endMinutes = timeToMinutes(event.endTime);

    // Find the first column where this event can fit
    let assignedColumn = -1;
    for (let col = 0; col < columnEndTimes.length; col++) {
      if (columnEndTimes[col] <= startMinutes) {
        assignedColumn = col;
        break;
      }
    }

    // If no existing column fits, create a new one
    if (assignedColumn === -1) {
      assignedColumn = columnEndTimes.length;
      columnEndTimes.push(0);
    }

    // Assign the event to this column
    columns.set(event.id, assignedColumn);
    columnEndTimes[assignedColumn] = endMinutes;
  }

  return columns;
}

/**
 * Calculate layout positions for overlapping events
 * Returns a map of event ID to layout position (left offset and width)
 *
 * @param events - Array of events with id, startTime, and endTime
 * @param dayStartHour - Hour the calendar day starts
 * @param hourHeight - Height in pixels of one hour
 * @returns Map of event ID to EventLayoutPosition
 */
export function calculateOverlapLayout(
  events: LayoutEvent[],
  dayStartHour: number,
  hourHeight: number
): Map<string, EventLayoutPosition> {
  const layouts = new Map<string, EventLayoutPosition>();

  if (events.length === 0) return layouts;

  // Find overlap groups
  const groups = findOverlapGroups(events);

  // Process each group
  for (const group of groups) {
    // Assign columns within the group
    const columns = assignColumns(group);

    // Find total number of columns in this group
    const totalColumns = Math.max(...Array.from(columns.values())) + 1;

    // Calculate width for each event
    const widthPerColumn = 100 / totalColumns;

    // Set layout for each event
    for (const event of group) {
      const column = columns.get(event.id) || 0;
      const { top, height } = getEventPosition(
        event.startTime,
        event.endTime,
        dayStartHour,
        hourHeight
      );

      layouts.set(event.id, {
        top,
        height,
        left: column * widthPerColumn,
        width: widthPerColumn,
        column,
        totalColumns,
      });
    }
  }

  return layouts;
}

/**
 * Simplified helper: Get layout for a single event considering overlaps
 * Call this once for all events in a day, then use the results
 */
export function getEventLayoutStyle(
  layout: EventLayoutPosition
  // containerWidth?: number
): React.CSSProperties {
  // Apply slight padding between overlapping events
  const padding = layout.totalColumns > 1 ? 2 : 0;

  return {
    position: "absolute",
    top: `${layout.top}px`,
    height: `${Math.max(layout.height, 20)}px`, // Minimum height
    right: `${layout.left + padding}%`, // RTL: use right instead of left
    width: `calc(${layout.width}% - ${padding * 2}px)`,
    zIndex: layout.column + 1, // Later columns on top
  };
}
