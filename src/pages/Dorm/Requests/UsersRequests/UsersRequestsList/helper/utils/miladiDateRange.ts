import moment from "jalali-moment";

export function miladiDateRange(dateRange?: string): string | undefined {
  if (!dateRange) return undefined;

  return dateRange
    .split(",")
    .map((date) =>
      moment(date.trim(), "jYYYY-jMM-jDD") // Input format: Jalali
        .locale("en") // Convert to Gregorian
        .format("YYYY-MM-DD")
    )
    .join(" , ");
}
