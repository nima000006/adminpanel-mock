import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { ScheduleType } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";

export type AllAdmissionStepsEditDetailSchedulingFormType = {
  scheduleType: SelectType<IdTitle>;
  term?: string;
  reserveDateRange?: [string, string];
  reserveTimeRange?: [string, string];
  reservePattern?: ScheduleType;
  hasMinStayLimit?: boolean;
  hasMaxStayLimit?: boolean;
  minStayDuration?: number;
  maxStayDuration?: number;
  packageDuration?: number;
};
