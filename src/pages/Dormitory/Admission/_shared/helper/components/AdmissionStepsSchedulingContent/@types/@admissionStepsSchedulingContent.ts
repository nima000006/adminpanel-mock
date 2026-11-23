import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { ScheduleType } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";

export type DormitoryScheduleTypeResponse = IdTitleName[];

export type GetDormitoryAcademicTermsRequest = {
  pageSize: number;
  pageNumber: number;
  title?: string;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
};

export type GetDormitoryAcademicTermsContent = {
  uuid: string;
  title: string;
};

export type GetDormitoryAcademicTermsResponse = {
  content: GetDormitoryAcademicTermsContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetAllAdmissionSchedulingRequest = string;

export type GetMyAdmissionSchedulingRequest = string;

export type GetAllAdmissionSchedulingPackage = {
  startDate: string;
  endDate: string;
  days: number;
};

export type GetAllAdmissionSchedulingResponse = {
  uuid: string;
  periodType: IdTitleName;
  academicTerm: {
    uuid: string;
    title: string;
  };
  accommodationType: IdTitleName;
  occupancyStartDate: string;
  occupancyEndDate: string;
  reservationStartAt: string;
  reservationEndAt: string;
  bookingMode: IdTitleName;
  minStayPeriods: number;
  maxStayPeriods: number;
  packageDays: number;
  packages: GetAllAdmissionSchedulingPackage[];
};

export type GetMyAdmissionSchedulingResponse = GetAllAdmissionSchedulingResponse;

export type AdmissionStepsSchedulingFormType = {
  scheduleType?: "SEMESTER" | "MONTHLY" | "DAILY";
  term?: SelectType<IdTitle>;
  stayDateRange?: [string, string];
  stayTimeRange?: [string, string];
  reserveDateRange?: [string, string];
  reserveTimeRange?: [string, string];
  reservePattern?: Extract<ScheduleType, "FREE" | "PACKAGE">;
  hasMinStayLimit?: boolean;
  hasMaxStayLimit?: boolean;
  minStayDuration?: number;
  maxStayDuration?: number;
  packageDuration?: number;
};

export type AdmissionStepsPackagesDrawerProps = {
  data: GetAllAdmissionSchedulingPackage[];
  open: boolean;
  onClose: () => void;
};

export type AdmissionStepsSchedulingContentProps = {
  from?: "all" | "my";
  isSubmitAndContinueLoading?: boolean;
  onBack: () => void;
  onSaveDraft: () => void;
  onSubmitAndContinue: (values: AdmissionStepsSchedulingFormType) => void;
};
