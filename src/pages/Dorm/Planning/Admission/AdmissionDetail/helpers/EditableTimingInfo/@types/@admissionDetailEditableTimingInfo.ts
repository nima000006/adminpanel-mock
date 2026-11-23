import { FormInstance } from "antd";

import { AdmissionModifyFormData } from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";

export type AdmissionDetailEditableTimingInfoProps = {
  dataSource: {
    title: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    id: number;
    stringId: string;
    isDisabled: boolean;
  }[];
  form: FormInstance<AdmissionModifyFormData>;
};
