import { memo, useEffect, useState } from "react";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const TEHRAN_TIME_ZONE = "Asia/Tehran";

const formatCurrentTime = () => dayjs().tz(TEHRAN_TIME_ZONE).format("HH:mm");

const CustomClock = memo(() => {
  const [currentTime, setCurrentTime] = useState(formatCurrentTime);

  useEffect(() => {
    let timeoutId: number;

    const scheduleNextTick = () => {
      const now = Date.now();
      const delayUntilNextSecond = 1000 - (now % 1000);

      timeoutId = window.setTimeout(() => {
        setCurrentTime(formatCurrentTime());
        scheduleNextTick();
      }, delayUntilNextSecond);
    };

    setCurrentTime(formatCurrentTime());
    scheduleNextTick();

    return () => window.clearTimeout(timeoutId);
  }, []);

  return <time dateTime={currentTime}>{currentTime}</time>;
});

CustomClock.displayName = "CustomClock";

export default CustomClock;
