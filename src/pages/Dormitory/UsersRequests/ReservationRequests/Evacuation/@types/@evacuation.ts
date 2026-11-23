export const EVACUATION_TIMING = {
  early: "early",
  late: "late",
  onTime: "onTime",
} as const;

export const EVACUATION_LAW = {
  percentRange: "percentRange",
  custom: "custom",
  fixed: "fixed",
} as const;

export type EvacuationTiming = (typeof EVACUATION_TIMING)[keyof typeof EVACUATION_TIMING];
export type EvacuationLaw = (typeof EVACUATION_LAW)[keyof typeof EVACUATION_LAW];

export type EvacuationStaySummaryItem = {
  label: string;
  value: string | number;
  isPrice?: boolean;
  suffix?: string;
};

export type EvacuationStaySummaryData = {
  progressPercent: number;
  progressText: string;
  items: EvacuationStaySummaryItem[];
};

export type EvacuationFinancialFormValues = {
  selectedAmount: number;
  skipCharge: boolean;
  newResidenceSelectedAmount?: number;
  newResidenceSkipCharge?: boolean;
};

export type EvacuationFinancialMock = {
  timing: EvacuationTiming;
  law: EvacuationLaw | null;
  staySummary: EvacuationStaySummaryData;
  /** مبلغ معیار سیستمی (ریال) برای مقایسه آلرت / درصد */
  systemAmountRial: number;
  systemPercent: number;
  /**
   * مبلغ کامل بدون کسر روزهای سپری‌شده (ریال) — فقط برای variant اقامت جدید
   * وقتی skipCharge روشن شود این مبلغ در باند نمایش داده می‌شود
   */
  fullAmountRial?: number;
  /** مبلغ اولیه فیلد / بنر (ریال) */
  selectedAmountRial: number;
  selectedPercent: number;
  rangeHint?: string;
  amountInputHint?: string;
  showSystemPercentLink: boolean;
  isAmountEditable: boolean;
  isSkipChargeDisabled: boolean;
  skipChargeDefault: boolean;
};
