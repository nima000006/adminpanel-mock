import {
  ADMISSION_GENDER,
  RESERVABLE_CAPACITY_TYPE,
  SCHEDULE_TYPE,
} from "@pages/Dormitory/Admission/_shared/util";
import {
  PAYMENT_OPTION,
  RESERVE_TYPE,
} from "@pages/Dormitory/Residence/ActiveResidence/_shared/util";

export type MyAdmissionRejectedListItem = {
  id: number;
  requestNumber: string;
  requestType: string;
  programTitle: string;
  residence: string;
  branch: string;
  gender: (typeof ADMISSION_GENDER)[keyof typeof ADMISSION_GENDER];
  reservableCapacity: (typeof RESERVABLE_CAPACITY_TYPE)[keyof typeof RESERVABLE_CAPACITY_TYPE];
  scheduleType: (typeof SCHEDULE_TYPE)[keyof typeof SCHEDULE_TYPE];
  reserveType: keyof typeof RESERVE_TYPE;
  paymentOption: keyof typeof PAYMENT_OPTION;
  creator: string;
  createDate: string;
  lastActionDate: string;
};
