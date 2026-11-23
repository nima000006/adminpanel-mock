/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  MyReportMainServiceDetailResponse,
  MyReportParamDetailResponse,
  MyReportDetailsResponse,
} from "../../@types/@myDoctorStaticReport";

export const MY_REPORT_MAIN_SERVICE_DETAIL_RESPONSE_MOCK: MyReportMainServiceDetailResponse = {
  title: "نمونه title",
  description: "نمونه description",
  paramDtos: [{
  paramId: 1,
  order: null,
  title: null,
  key: "default",
  paramDto: {
  paramId: null,
  order: null,
  title: null,
  key: "default",
  paramDto: null,
  paramType: 1,
  paramTitle: "نمونه paramTitle",
},
  paramType: 1,
  paramTitle: "نمونه paramTitle",
  required: true,
}],
  reportDetailDtos: [{
  reportTypeId: 1,
  reportTypeTitle: "نمونه reportTypeTitle",
  section: 1,
  title: null,
  key: "default",
  reportTitle: "نمونه reportTitle",
  reportId: 1,
  data: [null],
}],
};

export const MY_REPORT_PARAM_DETAIL_RESPONSE_MOCK: MyReportParamDetailResponse = {
  id: 1,
  title: "نمونه title",
};

export const MY_REPORT_DETAILS_RESPONSE_MOCK: MyReportDetailsResponse = {
  reportTypeId: 1,
  reportTypeTitle: "نمونه reportTypeTitle",
  section: null,
  title: null,
  key: "default",
  reportTitle: "نمونه reportTitle",
  reportId: 1,
  data: null,
};
