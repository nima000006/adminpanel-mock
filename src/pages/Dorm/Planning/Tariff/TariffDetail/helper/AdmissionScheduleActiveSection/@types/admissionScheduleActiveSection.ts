import { getTariffAdmissionScheduleTabData } from "../../../TariffDetailActiveTab/helpers/AdmissionScheduleTab/@types/@admissionScheduleTab";

export type AdmissionSchedulePropsType = {
  loading: boolean;
  countData: number | undefined;
  dataSource: getTariffAdmissionScheduleTabData[] | [];
};
