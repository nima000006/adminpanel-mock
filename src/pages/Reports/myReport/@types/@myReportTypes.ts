import { MyReportMainServiceDetailParamDtos } from "../StaticReports/MyDoctor/@types/@myDoctorStaticReport";

// Report list item (from get all report API)
export type ReportListItem = {
  id: number;
  title: string;
  key: string;
  description: string;
  type: string;
  typeFaTitle: string;
  typeId: number;
  service: string;
  serviceFaTitle: string;
  serviceId: number;
  counts: number;
};

//  shortcuts
export type ShortcutRecordType = {
  menuItem: string;
  faTitle: string;
};
export type ShortcutListResponse = ShortcutRecordType[];

// Response for first API
export type ReportListResponse = ReportListItem[];

// Request for first API

export type ReportListRequest = {
  typeId: number;
};

// Common structure for "data" in different report types
export type TableReportData = {
  name: string;
  branchcode: string;
  province: string;
};

export type NumberReportData = {
  [key: string]: number;
};

// Detail DTO inside reportDetailDtos array
export type ReportDetailDto = {
  reportTypeId: number;
  reportTypeTitle: "TABLE" | "NUMBER" | string;
  section: number;
  title: string | null;
  key: string;
  reportTitle: string;
  reportId: number;
  data: unknown;
  sectionTitle?: string;
};

// Full Detail Response
export type ReportDetailResponse = {
  title: string;
  description: string;
  paramDtos: MyReportMainServiceDetailParamDtos[]; // Adjust if you know the shape
  reportDetailDtos: ReportDetailDto[];
};

// Request for detail report API
export type ReportDetailRequest = {
  id: number;
  params?:
    | {
        [x: number]: any;
      }
    | undefined;
  service?: number;
};

//for export excel API
export type ReportExportRequest = number;

export type ReportExportResponse = Blob;
