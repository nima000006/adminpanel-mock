import { ScheduleType } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import { AdmissionStepsSchedulingFormType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSchedulingContent/@types/@admissionStepsSchedulingContent";
import { SCHEDULE_TYPE } from "@pages/Dormitory/Admission/_shared/util";

export const getEffectiveScheduleType = (
  values: Pick<AdmissionStepsSchedulingFormType, "scheduleType" | "reservePattern">
): ScheduleType | undefined => {
  if (!values.scheduleType) {
    return undefined;
  }

  if (values.scheduleType === "DAILY") {
    return values.reservePattern ?? SCHEDULE_TYPE.dailyFree;
  }

  if (values.scheduleType === "MONTHLY") {
    return SCHEDULE_TYPE.monthly;
  }

  return SCHEDULE_TYPE.termic;
};
