import { FormInstance } from "antd";
import { Dayjs } from "dayjs";

import { NoUndefinedRangeValueType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { GetAllBranchesResponse } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { DormSemesterResponse } from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormSemesterTypes/@types/@dormSemesterTypes";
import {
  GetEducationGradeResponse,
  GetFeasibilityResponse,
  GetManagementTypeResponse,
  GetNationalityResponse,
  GetPaymentMethodResponse,
  GetPaymentTypeResponse,
  GetReservationTypeResponse,
  GetSchedulingTypeResponse,
  GetSpecialStatusResponse,
  GetUserGroupResponse,
} from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";
import {
  GetApplicationReviewDeadlineResponse,
  GetPaymentDeadlineResponse,
} from "@pages/Dorm/Planning/Admission/AdmissionModify/helpers/AdmissionModifyBasicInfoStep/@types/@admissionModifyBasicInfoStep";

export type DataStates = {
  university: { data: GetAllBranchesResponse | undefined; loading: boolean };
  managementType: { data: GetManagementTypeResponse | undefined; loading: boolean };
  schedulingType: { data: GetSchedulingTypeResponse | undefined; loading: boolean };
  reservationType: { data: GetReservationTypeResponse | undefined; loading: boolean };
  paymentType: { data: GetPaymentTypeResponse | undefined; loading: boolean };
  paymentMethod: { data: GetPaymentMethodResponse | undefined; loading: boolean };
  userGroup: { data: GetUserGroupResponse | undefined; loading: boolean };
  educationGrade: { data: GetEducationGradeResponse | undefined; loading: boolean };
  nationality: { data: GetNationalityResponse | undefined; loading: boolean };
  specialStatus: { data: GetSpecialStatusResponse | undefined; loading: boolean };
  feasibility: { data: GetFeasibilityResponse | undefined; loading: boolean };
  semester: { data: DormSemesterResponse | undefined; loading: boolean };
  applicationReviewDeadline: {
    data: GetApplicationReviewDeadlineResponse | undefined;
    loading: boolean;
  };
  paymentDeadline: { data: GetPaymentDeadlineResponse | undefined; loading: boolean };
};

export type Handlers = {
  getAllUniversity: () => void;
  getManagementType: () => void;
  getSchedulingType: () => void;
  getReservationType: () => void;
  getPaymentType: () => void;
  getPaymentMethod: () => void;
  getUserGroup: () => void;
  getEducationGrade: () => void;
  getNationality: () => void;
  getSpecialStatus: () => void;
  getFeasibility: () => void;
  getApplicationReviewDeadline: () => void;
  getPaymentDeadline: () => void;
  scheduleTypeOnChange: (value: unknown) => void;
  handleRangePickerChange: (
    dates: NoUndefinedRangeValueType<Dayjs> | null,
    dateStrings: [string, string]
  ) => void;
  canDebtOnChange: (value: unknown) => void;
  applyingForAnotherChange: (value: unknown) => void;
  handleTimePicker: (_: any, value: any) => void;
  getSemesterData: () => void;
};

export type workSpacesAdmissionBasicInfoStepInfoTypes = {
  form: FormInstance;
  schedule: string;
  canDebtState: number | null;
  setIsCanDebt: React.Dispatch<React.SetStateAction<number | null>>;
  dataStates: DataStates;
  handlers: Handlers;
  applyingForAnother: number | null;
  setApplyingForAnother: React.Dispatch<React.SetStateAction<number | null>>;
  setIsSchedule: React.Dispatch<React.SetStateAction<string | undefined>>;
};
