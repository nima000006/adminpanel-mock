import dayjs, { Dayjs } from "dayjs";

type Input = {
  from?: string;
  to?: string;
  /** When true, keeps trailing `Z`; when false, strips it. */
  isPost?: boolean;
  /** When true, converts to real UTC; when false, keeps local wall-clock hours. */
  isUTC?: boolean;
};

type Output = {
  from?: string;
  to?: string;
};

const isSameDay = (date: Dayjs, compare: Dayjs) =>
  date.year() === compare.year() &&
  date.month() === compare.month() &&
  date.date() === compare.date();

const formatDateHours = (date: Dayjs, isUTC: boolean, isPost: boolean): string => {
  const iso = isUTC ? date.toISOString() : date.utc(true).toISOString();

  return isPost ? iso : iso.replace("Z", "");
};

export const formatDateRangeHoursForApi = ({
  from,
  to,
  isPost = false,
  isUTC = false,
}: Input): Output => {
  let formattedFrom: string | undefined;
  let formattedTo: string | undefined;

  if (from) {
    const fromDate = dayjs(from).startOf("day");
    formattedFrom = formatDateHours(fromDate, isUTC, isPost);
  }

  if (to) {
    const now = dayjs();
    const endDate = dayjs(to);
    const finalTo = isSameDay(endDate, now) ? now : endDate.endOf("day");

    formattedTo = formatDateHours(finalTo, isUTC, isPost);
  }

  return {
    ...(formattedFrom && { from: formattedFrom }),
    ...(formattedTo && { to: formattedTo }),
  };
};
