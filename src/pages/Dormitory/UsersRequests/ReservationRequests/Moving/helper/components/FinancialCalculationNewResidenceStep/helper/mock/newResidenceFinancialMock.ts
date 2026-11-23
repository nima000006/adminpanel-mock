import {
  EVACUATION_LAW,
  EVACUATION_TIMING,
  EvacuationFinancialMock,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/@types/@evacuation";

/** ماک استپ محاسبه مالی اقامت جدید — حالت کاهش هزینه */
export const NEW_RESIDENCE_FINANCIAL_MOCK: EvacuationFinancialMock = {
  timing: EVACUATION_TIMING.early,
  law: EVACUATION_LAW.custom,
  staySummary: {
    progressPercent: 40,
    progressText: "۹۰ روز مانده از اسکان",
    items: [
      { label: "مبلغ کل هزینه اقامتی", value: 100000000, isPrice: true },
      { label: "روز های استفاده شده", value: 10, suffix: "روز" },
      { label: "مبلغ استفاده شده", value: 10000000, isPrice: true },
      { label: "مبلغ باقی‌مانده اقامت", value: 90000000, isPrice: true },
    ],
  },
  systemAmountRial: 90000000,
  systemPercent: 100,
  fullAmountRial: 100000000,
  selectedAmountRial: 10000000,
  selectedPercent: 110,
  amountInputHint: "معادل ۸ میلیون تومان",
  showSystemPercentLink: true,
  isAmountEditable: true,
  isSkipChargeDisabled: false,
  skipChargeDefault: false,
};
