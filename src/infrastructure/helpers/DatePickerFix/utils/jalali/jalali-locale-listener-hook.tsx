import React, { useContext } from "react";

import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import jalaliday from "jalali-plugin-dayjs";

/**
 * Subscribes to the ConfigProvider locale changes and updates the dayjs calendar based on current locale.
 */
const useJalaliLocaleListenerFix = () => {
  dayjs.extend(calendar);
  dayjs.extend(jalaliday);

  const { locale } = useContext(ConfigProvider.ConfigContext);
  React.useEffect(() => {
    if (locale?.locale == "fa") {
      dayjs["calendar"]?.("jalali");
    } else {
      dayjs["calendar"]?.(undefined as any);
    }
  }, [locale]);
};

export default useJalaliLocaleListenerFix;
