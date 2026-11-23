import { Dayjs } from "dayjs";

//! LAYOUT
type SelectType = {
  key: string;
  value: string;
  title: string;
  name: string;
  code: number;
  item: {
    id: number;
    title: string;
  };
};

export type DormTariffModifyFormType = {
  title: string;
  uni: SelectType;
  dormitory: SelectType;
  currency: SelectType;
  tax?: number;
  toll?: number;
  desc?: string;
  startDate?: string;
  startTime?: Dayjs;
  endDate?: string;
  endTime?: Dayjs;
  price: number;
  description?: string;
  timingType: SelectType;
  semester?: SelectType;
};
