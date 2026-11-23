export type TopChartUnit = {
  id: number;
  branch: string;
  unitName: string; // عنوان واحد
  unitType: string; // نوع واحد
  parentUnit: string; // والد واحد
  createDate: string; // تاریخ ایجاد
  lastEditDate: string; // تاریخ آخرین ویرایش
  createdBy: string; // ایجاد شده توسط
  description: string; // توضیحات
};

export type BusinessRequestTopChartResponse = {
  unitMandatoryFileUrl: string;
  unitSecondaryFileUrl: string;
  branchMandatoryFileUrl: string;
  branchSecondaryFileUrl: string;
  positionMandatoryFileUrl: string;
  positionSecondaryFileUrl: string;
  topChartMandatoryFileUrl: string;
  topChartSecondaryFileUrl: string;
};
export type BusinessRequestTopChartParams = {
  businessTempHistoryId: number;
};
