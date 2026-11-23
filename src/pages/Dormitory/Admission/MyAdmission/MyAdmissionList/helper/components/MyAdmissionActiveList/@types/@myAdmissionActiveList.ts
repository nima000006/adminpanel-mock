import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  ADMISSION_GENDER,
  RESERVABLE_CAPACITY_TYPE,
  SCHEDULE_TYPE,
} from "@pages/Dormitory/Admission/_shared/util";
import {
  PAYMENT_OPTION,
  RESERVE_TYPE,
} from "@pages/Dormitory/Residence/ActiveResidence/_shared/util";

export type MyAdmissionActiveListItem = {
  id: number;
  programTitle: string;
  isVisibleToUsers: boolean;
  residence: string;
  branch: string;
  managementType: string;
  gender: (typeof ADMISSION_GENDER)[keyof typeof ADMISSION_GENDER];
  reservableCapacity: (typeof RESERVABLE_CAPACITY_TYPE)[keyof typeof RESERVABLE_CAPACITY_TYPE];
  scheduleType: (typeof SCHEDULE_TYPE)[keyof typeof SCHEDULE_TYPE];
  reserveType: keyof typeof RESERVE_TYPE;
  paymentOption: keyof typeof PAYMENT_OPTION;
  allowedStayEndDate: string;
  contractId: string;
  creator: string;
  createDate: string;
};

export type MyAdmissionActiveListAdvanceFilterFormType = {
  admissionProgram: SelectType<IdTitle>[];
  visibility: SelectType<IdTitleName>;
  managementType: SelectType<IdTitle>[];
  residence: SelectType<IdTitle>[];
  gender: SelectType<IdTitleName>[];
  reservableCapacity: SelectType<IdTitleName>;
  scheduleType: SelectType<IdTitleName>;
  reserveType: SelectType<IdTitleName>;
  paymentOption: SelectType<IdTitleName>;
};
