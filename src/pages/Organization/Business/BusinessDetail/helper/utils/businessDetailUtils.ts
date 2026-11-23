export const branchTypeModeTag = (branchType: number) => {
  switch (branchType) {
    case 1:
      return "مرکزی";
    case 2:
      return "اصلی";
  }
};
export const SegmentedMode = {
  branchInfo: "0",
  organUnit: "1",
  position: "2",
};

export const BaseInfoSegmentedMode = {
  unitType: "0",
  positionType: "1",
};

export const OrganUnitSegmentedMode = {
  organUnit: "0",
  organStructure: "1",
  topChart: "2",
};

export const TopChartViewMode = {
  unitInfo: "0",
  positions: "1",
};

export const PositionSegmentMode = {
  positionOrganization: "0",
  structureOrganization: "1",
};
export const PositionDrawerSegmentMode = {
  positionInfo: "0",
  personnelList: "1",
};

export const BUSINESS_BASE_INFO_ALERT_FIRST_ROW =
  "شما با استفاده از جدول زیر و استفاده از گزینه “تخصیص به” می‌توانید تعیین کنید که “نوع واحد” و “نوع سمت” انتخاب شده برای چه شعبه هایی قابل ارائه می‌باشد.";
export const BUSINESS_BASE_INFO_ALERT_SECOND_ROW =
  "توجه:در حالت پیشفرض شعبه مرکزی شما دارای تمامی انواع واحد و انواع سمت می‌باشد.";

export const ALLOCATION_UNIT_TYPE_FIRST_ROW =
  "با استفاده از این فرم، شما قادر خواهید بود نوع واحد های جدید را به شعب دلخواه خود اضافه نمایید.";

export const ALLOCATION_UNIT_TYPE_SECOND_ROW =
  "پس از افزودن نوع واحد به یک شعبه، این امکان برای شما فراهم می‌گردد تا در هنگام ایجاد واحد سازمانی جدید در آن شعبه، از لیست نوع واحد های تعریف شده استفاده نمایید.";

export const ALLOCATION_POSITION_TYPE_FIRST_ROW =
  "با استفاده از این فرم، شما قادر خواهید بود نوع سمت های جدید را به شعب دلخواه خود اضافه نمایید.";

export const ALLOCATION_POSITION_TYPE_SECOND_ROW =
  "پس از افزودن نوع سمت به یک شعبه، این امکان برای شما فراهم می‌گردد تا در هنگام ایجاد واحد سازمانی جدید در آن شعبه، از لیست نوع سمت های تعریف شده استفاده نمایید.";
