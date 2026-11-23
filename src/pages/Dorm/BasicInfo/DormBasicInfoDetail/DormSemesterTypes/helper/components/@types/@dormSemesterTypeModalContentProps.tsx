import { FormInstance } from "antd";
import dayjs from "dayjs";

export type DormSemesterTypeModalContentProps = {
  form: FormInstance<{
    title: string;
    dateRange: [dayjs.Dayjs, dayjs.Dayjs];
  }>;
};
