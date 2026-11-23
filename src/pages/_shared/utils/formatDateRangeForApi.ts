// utils/formatDateRangeForApi.ts

import dayjs from "dayjs";

import { jalaliToGregorianWithoutZ } from "@infra/helpers/DatePickerFix/utils/jalaliToGregorianWithoutZ";

type Input = {
  from?: string;
  to?: string;
  isPost?: boolean;
};

type Output = {
  from?: string;
  to?: string;
};

export const formatDateRangeForApi = ({ from, to, isPost = false }: Input): Output => {
  let formattedFrom: string | undefined;
  let formattedTo: string | undefined;

  if (from) {
    const fromDate = dayjs(from).startOf("day");

    formattedFrom = isPost
      ? fromDate.toISOString()
      : jalaliToGregorianWithoutZ(fromDate.utc(true).toISOString());
  }

  if (to) {
    const now = dayjs();
    const endDate = dayjs(to);

    const isToday =
      endDate.year() === now.year() &&
      endDate.month() === now.month() &&
      endDate.date() === now.date();

    if (isToday) {
      formattedTo = isPost
        ? now.toISOString()
        : jalaliToGregorianWithoutZ(now.utc(true).toISOString());
    } else {
      const finalTo = endDate.endOf("day");

      formattedTo = isPost
        ? finalTo.toISOString()
        : jalaliToGregorianWithoutZ(finalTo.utc(true).toISOString());
    }
  }

  return {
    ...(formattedFrom && { from: formattedFrom }),
    ...(formattedTo && { to: formattedTo }),
  };
};
