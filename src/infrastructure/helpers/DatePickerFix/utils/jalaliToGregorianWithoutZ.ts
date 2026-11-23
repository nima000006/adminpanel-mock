import dayjs, { Dayjs } from "dayjs";

export const jalaliToGregorianWithoutZ = (fromDate: Dayjs | string) => {
  return fromDate ? dayjs(fromDate).toISOString().replace("Z", "") : undefined;
};
