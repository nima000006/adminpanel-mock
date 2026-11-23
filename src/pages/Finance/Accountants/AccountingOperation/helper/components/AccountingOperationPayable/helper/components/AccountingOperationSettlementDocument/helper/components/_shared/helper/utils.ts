import dayjs from "dayjs";

import { jalaliToGregorianWithoutZ } from "@infra/helpers/DatePickerFix/utils/jalaliToGregorianWithoutZ";

export const getToDate = (date: dayjs.ConfigType) => {
  const now = dayjs();
  const targetDate = dayjs(date);

  const value = targetDate.isSame(now, "day") ? now.utc() : targetDate.endOf("day").utc();

  return jalaliToGregorianWithoutZ(value) ?? "";
};
