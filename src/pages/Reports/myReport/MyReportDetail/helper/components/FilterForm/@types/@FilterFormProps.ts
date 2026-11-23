import { FormInstance } from "antd";

import { MyReportMainServiceDetailParamDtos } from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

export type FilterFormProps = {
  paramDtos?: MyReportMainServiceDetailParamDtos[];
  selectOptions: Record<string, { id: number; title: string }[]>;
  form: FormInstance;
  onSelectChange: (key: string, value: string) => void;
  onParamDetailLoad: (item: MyReportMainServiceDetailParamDtos) => void;
  onFilterChange?: () => void;
};
