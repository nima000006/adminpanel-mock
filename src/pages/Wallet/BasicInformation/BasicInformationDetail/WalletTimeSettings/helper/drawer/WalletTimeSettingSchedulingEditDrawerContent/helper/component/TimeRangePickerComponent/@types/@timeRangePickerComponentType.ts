import dayjs from "dayjs";

export type TimeRangePickerComponentProps = {
  id: number;
  day: string;
  startTime: dayjs.Dayjs;
  endTime: dayjs.Dayjs;
};
