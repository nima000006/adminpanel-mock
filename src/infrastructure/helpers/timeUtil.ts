import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const timeConvertor = (time: unknown, fallback = ""): string => {
  // 1. Check if input is falsy or not a string
  if (!time || typeof time !== "string") {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Invalid time input: ${time}`);
    }
    return fallback;
  }

  // 2. Trim and sanitize the input
  const sanitizedTime = time.trim();

  // 3. Try parsing with different formats (strictly)
  const formatsToTry = [
    "HH:mm:ss.SSS", // "11:29:40.000"
    "HH:mm:ss", // "11:29:40"
    "HH:mm", // "11:29"
    "HH", // "11"
    "H:mm", // "9:30"
    "H", // "9"
  ];

  for (const format of formatsToTry) {
    const parsed = dayjs(sanitizedTime, format, true); // `true` enables strict parsing
    if (parsed.isValid()) {
      return parsed.format("HH:mm");
    }
  }

  // 4. If parsing fails, return fallback (and warn in dev mode)
  if (process.env.NODE_ENV === "development") {
    console.warn(`Failed to parse time: "${sanitizedTime}"`);
  }
  return fallback;
};
