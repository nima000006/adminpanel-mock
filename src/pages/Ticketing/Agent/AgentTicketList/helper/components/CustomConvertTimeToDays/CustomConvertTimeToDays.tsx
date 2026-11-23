import { memo, useEffect, useMemo, useRef, useState } from "react";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";

type CustomConvertTimeToDaysProps = {
  seconds?: number | null;
  startedAt?: string | Date | null;
  daysOnly?: boolean;
};

const formatDuration = (totalSeconds: number, daysOnly = false) => {
  const safeSeconds = Math.max(0, totalSeconds);
  const days = Math.floor(safeSeconds / 86400);

  if (daysOnly) {
    return {
      text: `${days} روز`,
      color: days <= 1 ? "green" : days === 2 ? "orange" : "red",
    };
  }

  if (safeSeconds === 0) {
    return {
      text: "همین الان",
      color: "green",
    };
  }

  if (safeSeconds < 3600) {
    const minutes = Math.floor(safeSeconds / 60);
    const remainingSeconds = safeSeconds % 60;

    return {
      text:
        remainingSeconds > 0
          ? `${minutes} دقیقه و ${remainingSeconds} ثانیه`
          : `${minutes} دقیقه`,
      color: "green",
    };
  }

  if (safeSeconds < 86400) {
    const hours = Math.floor(safeSeconds / 3600);
    const remainingMinutes = Math.floor((safeSeconds % 3600) / 60);

    return {
      text:
        remainingMinutes > 0
          ? `${hours} ساعت و ${remainingMinutes} دقیقه`
          : `${hours} ساعت`,
      color: "green",
    };
  }

  const remainingHours = Math.floor((safeSeconds % 86400) / 3600);

  return {
    text: remainingHours > 0 ? `${days} روز و ${remainingHours} ساعت` : `${days} روز`,
    color: days === 1 ? "green" : days === 2 ? "orange" : "red",
  };
};

const toTimestamp = (value?: string | Date | null) => {
  if (!value) return null;

  const parsedValue = value instanceof Date ? value.getTime() : new Date(value).getTime();

  return Number.isNaN(parsedValue) ? null : parsedValue;
};

const CustomConvertTimeToDaysView = ({
  seconds,
  startedAt,
  daysOnly = false,
}: CustomConvertTimeToDaysProps) => {
  const baseSeconds = Math.max(0, seconds ?? 0);
  const baseTimestampRef = useRef<number>(Date.now());
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    baseTimestampRef.current = toTimestamp(startedAt) ?? Date.now();
    setNow(Date.now());

    let timeoutId: number;

    const scheduleNextTick = () => {
      const delayUntilNextSecond = 1000 - (Date.now() % 1000);

      timeoutId = window.setTimeout(() => {
        setNow(Date.now());
        scheduleNextTick();
      }, delayUntilNextSecond);
    };

    scheduleNextTick();

    return () => window.clearTimeout(timeoutId);
  }, [seconds, startedAt]);

  const totalSeconds = useMemo(() => {
    const elapsedSeconds = Math.floor((now - baseTimestampRef.current) / 1000);

    return baseSeconds + Math.max(0, elapsedSeconds);
  }, [baseSeconds, now]);

  const { text, color } = formatDuration(totalSeconds, daysOnly);

  return <CustomTag color={color}>{text}</CustomTag>;
};

const CustomConvertTimeToDays = memo(CustomConvertTimeToDaysView);

CustomConvertTimeToDays.displayName = "CustomConvertTimeToDays";

export default CustomConvertTimeToDays;
