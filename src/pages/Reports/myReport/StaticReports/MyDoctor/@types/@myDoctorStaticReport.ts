export type MyReportMainServiceDetailParamDtos = {
  paramId: number;
  order: null;
  title: null;
  key: string;
  paramDto: {
    paramId: null;
    order: null;
    title: null;
    key: string;
    paramDto: null;
    paramType: number;
    paramTitle: string;
  };
  paramType: number;
  paramTitle: string;
  required?: boolean;
};

export type MyReportMainServiceDetailResponse = {
  title: string;
  description: string;
  paramDtos: MyReportMainServiceDetailParamDtos[];
  reportDetailDtos: {
    reportTypeId: number;
    reportTypeTitle: string;
    section: number;
    title: null;
    key: string;
    reportTitle: string;
    reportId: number;
    data: [];
  }[];
};
export type MyReportMainServiceDetailRequest = {
  id?: number;
  params?:
    | {
        [x: number]: string | number;
      }
    | undefined;
  service: number;
};

export type MyReportParamDetailResponse = { id: number; title: string }[];

export type MyReportParamDetailRequest = {
  id: number;
  params?:
    | {
        [x: number]: string | number;
      }
    | undefined;
  service?: number;
};

export type TotalParticipantsData = [
  {
    amount: number;
  },
];
export type TotalBranchesData = [
  {
    amount: number;
  },
];

export type ParticipantsStatisticsLineChartData = {
  date: string;
  p1: number;
  p2: number;
  p1_title: string;
  p2_title: string;
}[];

export type RequestStatusPieChartData = {
  id: number;
  title: string;
  amount: number;
}[];

export type SuicideRiskPieChartData = {
  id: number;
  title: string;
  amount: number;
}[];

export type ScoresOfTestDimensionsChartData = {
  score: number;
  min: number;
  group_id: string;
  max: number;
  status: string;
  group_title: string;
  status_id: number;
  total_score: number;
  title: string;
  cycle_counts: number;
}[];

export type MyReportDetailsResponse = {
  reportTypeId: number;
  reportTypeTitle: string;
  section: null;
  title: null;
  key: string;
  reportTitle: string;
  reportId: number;
  data:
    | TotalParticipantsData
    | TotalBranchesData
    | ParticipantsStatisticsLineChartData
    | RequestStatusPieChartData
    | SuicideRiskPieChartData
    | ScoresOfTestDimensionsChartData;
};

export type MyReportDetailsRequest = {
  id: number;
  params?:
    | {
        [x: number]: string | number;
      }
    | undefined;
};

// Types for chart data structures
export type ParticipantsStatisticsChartDataItem = {
  date: string;
  [key: string]: string | number;
} & {
  [key: `p${number}`]: number;
  [key: `${string}_title`]: string;
};

export type ParticipantsStatisticsSeriesItem = {
  dataKey: string;
  label: string;
};

export type RequestStatusChartDataItem = {
  id: number;
  value: number;
  label: string;
};

export type RequestStatusChartState = {
  data: RequestStatusChartDataItem[];
  total: number;
};

export type SuicideRiskChartDataItem = {
  id: number;
  value: number;
  label: string;
};

export type SuicideRiskChartState = {
  data: SuicideRiskChartDataItem[];
  total: number;
};

export type ScoresOfTestDimensionsChartDataItem = {
  p1_title: string;
  status_id: number;
  p1_amount: number;
  p1_average?: number;
  min?: number;
  max?: number;
};

export type ReportDetailDto = {
  reportTypeId: number;
  reportTypeTitle: string;
  section: number;
  title: null;
  key: string;
  reportTitle: string;
  reportId: number;
  data: unknown[];
};
