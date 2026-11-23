import dayjs, { Dayjs } from "dayjs";

import { DateRange } from "@pages/Finance/BusinessOwners/helpers/utils/utils";

export const makeSearchParams = (data: object) => {
  const params = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    if (!value) return;
    params.append(key, value.toString());
  });

  return "?" + params.toString();
};

export const makeQueryParams = (data: object) => {
  const params = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    params.append(key, value.toString());
  });

  const queryString = params.toString();

  return queryString ? `?${queryString}` : "";
};

//Passing date pickerRage data to url
export const getInitialDatesFromUrl = (searchParams: URLSearchParams): DateRange => {
  const today = dayjs();
  return {
    startDate:
      searchParams.get("startDate") || today.startOf("year").format("YYYY-MM-DD"),
    endDate: searchParams.get("endDate") || today.endOf("year").format("YYYY-MM-DD"),
  };
};

export const updateUrlWithDates = (
  dates: [Dayjs, Dayjs] | null,
  dateStrings: [string, string],
  searchParams: URLSearchParams,
  setSearchParams: (params: URLSearchParams) => void
) => {
  const newParams = new URLSearchParams(searchParams);

  if (dates) {
    const [startDate, endDate] = dateStrings;
    newParams.set("startDate", startDate);
    newParams.set("endDate", endDate);
  } else {
    newParams.delete("startDate");
    newParams.delete("endDate");
  }

  setSearchParams(newParams);
};
