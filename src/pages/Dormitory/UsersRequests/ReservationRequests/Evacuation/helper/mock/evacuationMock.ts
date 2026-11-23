import {
  EVACUATION_LAW,
  EVACUATION_TIMING,
  EvacuationFinancialMock,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/@types/@evacuation";

export const EVACUATION_SCENARIOS = {
  // زودتر از موعد
  earlyPercentRange: "earlyPercentRange", // زودتر از موعد درصد بازه ای
  earlyCustom: "earlyCustom", //زودتر + دلخواه (عادی)
  earlyCustomIncrease: "earlyCustomIncrease", // زودتر + دلخواه (افزایشی)
  earlyFixed: "earlyFixed", //زودتر + ثابت (از قانون تخلیه برنامه پذیرش تبعیت می‌کند)

  //دیرتر از موعد
  latePercentRange: "latePercentRange", // بعد از موعد درصد بازه ای
  lateCustom: "lateCustom", // بعد از موعد دلخواه (عادی)
  lateCustomDecrease: "lateCustomDecrease", // بعد از موعد دلخواه (کاهشی)
  lateCustomFree: "lateCustomFree", // بعد از موعد دلخواه (رایگان)
  lateFixed: "lateFixed", // بعد از موعد ثابت

  // در زمان موعد
  onTime: "onTime", // در زمان موعد
} as const;

export type EvacuationScenarioKey =
  (typeof EVACUATION_SCENARIOS)[keyof typeof EVACUATION_SCENARIOS];

/** سناریوی فعال برای رندر صفحه  */
export const ACTIVE_EVACUATION_SCENARIO: EvacuationScenarioKey =
  EVACUATION_SCENARIOS.earlyCustom;

const earlyStaySummaryBase = {
  progressPercent: 40,
  progressText: "۹۰ روز مانده از اسکان",
  items: [
    { label: "مبلغ کل هزینه اقامتی", value: 100000000, isPrice: true },
    { label: "روز های استفاده شده", value: 10, suffix: "روز" },
    { label: "مبلغ استفاده شده", value: 10000000, isPrice: true },
    { label: "مبلغ باقی‌مانده اقامت", value: 90000000, isPrice: true },
  ],
};

const lateStaySummaryBase = {
  progressPercent: 100,
  progressText: "۱۰ روز از موعد تخلیه گذشته",
  items: [
    { label: "مبلغ کل هزینه اقامتی", value: 100000000, isPrice: true },
    { label: "روز های استفاده شده", value: 110, suffix: "روز" },
    { label: "روز های مازاد اقامت", value: 10, suffix: "روز" },
    { label: "مبلغ اقامت مازاد", value: 10000000, isPrice: true },
  ],
};

const onTimeStaySummary = {
  progressPercent: 98,
  progressText: "۲ ساعت مانده از اسکان",
  items: [
    { label: "مبلغ کل هزینه اقامتی", value: 100000000, isPrice: true },
    { label: "روز های استفاده شده", value: 100, suffix: "روز" },
    { label: "روز های مازاد اقامت", value: 0, suffix: "روز" },
    { label: "روز های باقی‌مانده اقامت", value: 0, suffix: "روز" },
  ],
};

export const EVACUATION_MOCK_BY_SCENARIO: Record<
  EvacuationScenarioKey,
  EvacuationFinancialMock
> = {
  earlyPercentRange: {
    timing: EVACUATION_TIMING.early,
    law: EVACUATION_LAW.percentRange,
    staySummary: earlyStaySummaryBase,
    systemAmountRial: 90000000,
    systemPercent: 100,
    selectedAmountRial: 90000000,
    selectedPercent: 100,
    rangeHint: "بین ۶ تا ۹ میلیون تومان",
    showSystemPercentLink: false,
    isAmountEditable: true,
    isSkipChargeDisabled: true, // برای فعال یا غیر فعال بودن چک باکس
    skipChargeDefault: false,
  },
  earlyCustom: {
    timing: EVACUATION_TIMING.early,
    law: EVACUATION_LAW.custom,
    staySummary: earlyStaySummaryBase,
    systemAmountRial: 90000000,
    systemPercent: 100,
    selectedAmountRial: 90000000,
    selectedPercent: 100,
    showSystemPercentLink: true,
    isAmountEditable: true,
    isSkipChargeDisabled: true,
    skipChargeDefault: false,
  },
  earlyCustomIncrease: {
    timing: EVACUATION_TIMING.early,
    law: EVACUATION_LAW.custom,
    staySummary: earlyStaySummaryBase,
    systemAmountRial: 90000000,
    systemPercent: 100,
    selectedAmountRial: 120000000,
    selectedPercent: 133,
    amountInputHint: "معادل ۱۲ میلیون تومان",
    showSystemPercentLink: true,
    isAmountEditable: true,
    isSkipChargeDisabled: true,
    skipChargeDefault: false,
  },
  earlyFixed: {
    timing: EVACUATION_TIMING.early,
    law: EVACUATION_LAW.fixed,
    staySummary: earlyStaySummaryBase,
    systemAmountRial: 45000000,
    systemPercent: 50,
    selectedAmountRial: 45000000,
    selectedPercent: 50,
    amountInputHint:
      "محاسبه مبلغ روز های باقی‌مانده از قانون تخلیه در برنامه پذیرش تبعیت میکند.",
    showSystemPercentLink: true,
    isAmountEditable: false,
    isSkipChargeDisabled: true,
    skipChargeDefault: false,
  },
  latePercentRange: {
    timing: EVACUATION_TIMING.late,
    law: EVACUATION_LAW.percentRange,
    staySummary: lateStaySummaryBase,
    systemAmountRial: 10000000,
    systemPercent: 100,
    selectedAmountRial: 10000000,
    selectedPercent: 100,
    rangeHint: "بین ۱ تا ۲ میلیون تومان",
    showSystemPercentLink: true,
    isAmountEditable: true,
    isSkipChargeDisabled: true,
    skipChargeDefault: false,
  },
  lateCustom: {
    timing: EVACUATION_TIMING.late,
    law: EVACUATION_LAW.custom,
    staySummary: lateStaySummaryBase,
    systemAmountRial: 10000000,
    systemPercent: 100,
    selectedAmountRial: 10000000,
    selectedPercent: 100,
    showSystemPercentLink: true,
    isAmountEditable: true,
    isSkipChargeDisabled: false,
    skipChargeDefault: false,
  },
  lateCustomDecrease: {
    timing: EVACUATION_TIMING.late,
    law: EVACUATION_LAW.custom,
    staySummary: lateStaySummaryBase,
    systemAmountRial: 10000000,
    systemPercent: 100,
    selectedAmountRial: 7000000,
    selectedPercent: 70,
    amountInputHint: "معادل ۷۰۰ هزارتومان",
    showSystemPercentLink: true,
    isAmountEditable: true,
    isSkipChargeDisabled: false,
    skipChargeDefault: false,
  },
  lateCustomFree: {
    timing: EVACUATION_TIMING.late,
    law: EVACUATION_LAW.custom,
    staySummary: lateStaySummaryBase,
    systemAmountRial: 10000000,
    systemPercent: 100,
    selectedAmountRial: 0,
    selectedPercent: 0,
    amountInputHint: "هزینه اقامت روزهای مازاد رایگان میباشد",
    showSystemPercentLink: true,
    isAmountEditable: true,
    isSkipChargeDisabled: false,
    skipChargeDefault: true,
  },
  lateFixed: {
    timing: EVACUATION_TIMING.late,
    law: EVACUATION_LAW.fixed,
    staySummary: lateStaySummaryBase,
    systemAmountRial: 12000000,
    systemPercent: 120,
    selectedAmountRial: 12000000,
    selectedPercent: 120,
    amountInputHint:
      "محاسبه مبلغ روز های مازاد از قانون تخلیه در برنامه پذیرش تبعیت میکند.",
    showSystemPercentLink: false,
    isAmountEditable: false,
    isSkipChargeDisabled: true,
    skipChargeDefault: false,
  },
  onTime: {
    timing: EVACUATION_TIMING.onTime,
    law: null,
    staySummary: onTimeStaySummary,
    systemAmountRial: 0,
    systemPercent: 0,
    selectedAmountRial: 0,
    selectedPercent: 0,
    showSystemPercentLink: false,
    isAmountEditable: false,
    isSkipChargeDisabled: true,
    skipChargeDefault: false,
  },
};

export const getActiveEvacuationMock = (): EvacuationFinancialMock =>
  EVACUATION_MOCK_BY_SCENARIO[ACTIVE_EVACUATION_SCENARIO];
