import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  AdmissionCapacityBedItem,
  AdmissionCapacityBuildingItem,
  AdmissionCapacityUnitItem,
  AdmissionRenewalFinancialSettingType,
  AdmissionRenewalSourceItem,
  RENEWAL_FINANCIAL_SETTING,
} from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import {
  formatStayDateRangeLabel,
  parseStayDateRangeLabels,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/helper/util";
import { AdmissionStepsSchedulingFormType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSchedulingContent/@types/@admissionStepsSchedulingContent";
import { getEffectiveScheduleType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSchedulingContent/helper/util";
import {
  AdmissionStepsSettingsFormType,
  AdmissionStepsSettingsProgramInfo,
  RenewalCapacitySegment,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/@types/@admissionStepsSettingsContent";
import { ADMISSION_DETAIL_MOCK_DATA } from "@pages/Dormitory/Admission/_shared/helper/mock/admissionDetailMockData";
import {
  RESERVABLE_CAPACITY_TYPE,
  SCHEDULE_TYPE,
} from "@pages/Dormitory/Admission/_shared/util";

export const settingsContentData = ADMISSION_DETAIL_MOCK_DATA;

// تا آماده شدن API، لیست برنامه‌های پذیرش مبدأ قابل انتخاب برای تمدید از mock خوانده می‌شود
export const RENEWAL_SOURCE_CATALOG: AdmissionRenewalSourceItem[] =
  settingsContentData.renewalSources;

export const isDailyOrMonthlySchedule = (
  scheduleType?: (typeof SCHEDULE_TYPE)[keyof typeof SCHEDULE_TYPE]
) =>
  scheduleType === SCHEDULE_TYPE.monthly ||
  scheduleType === SCHEDULE_TYPE.dailyFree ||
  scheduleType === SCHEDULE_TYPE.dailyPackage;

// زمینه مرحله تنظیمات فقط از مراحل قبلی ویزارد ساخته می‌شود؛ تمدید در ایجاد برنامه خاموش شروع می‌شود
export const resolveSettingsContext = (
  scheduling?: AdmissionStepsSchedulingFormType | null,
  programInfo?: AdmissionStepsSettingsProgramInfo | null
) => {
  const stayRangeLabel = formatStayDateRangeLabel(scheduling?.stayDateRange);
  const { fromLabel, toLabel } = parseStayDateRangeLabels(stayRangeLabel);

  return {
    scheduleType: scheduling ? getEffectiveScheduleType(scheduling) : undefined,
    programTitle: programInfo?.programTitle,
    reservableCapacity: programInfo?.reservableCapacity,
    renewalAllowedFrom: fromLabel,
    renewalAllowedTo: toLabel,
  };
};

export const RENEWAL_FINANCIAL_SETTING_OPTIONS: {
  value: AdmissionRenewalFinancialSettingType;
  title: string;
  description: string;
}[] = [
  {
    value: RENEWAL_FINANCIAL_SETTING.noFee,
    title: "هزینه‌ای دریافت نمی‌کنم",
    description:
      "در صورتی که از کاربران بابت فاصله دو برنامه پذیرش هیچ هزینه‌ای دریافت نمی‌کنید این گزینه را انتخاب نمایید.",
  },
  {
    value: RENEWAL_FINANCIAL_SETTING.warehousing,
    title: "هزینه انبارداری دریافت می‌کنم",
    description:
      "در صورتی که از کاربران بابت فاصله دو برنامه پذیرش هزینه‌ی انبارداری دریافت می‌کنید این گزینه را انتخاب و هزینه انبارداری را تعیین نمایید.",
  },
  {
    value: RENEWAL_FINANCIAL_SETTING.extraStay,
    title: "هزینه اقامت مازاد دریافت می‌کنم",
    description:
      "در صورتی که از کاربران بابت فاصله دو برنامه پذیرش هزینه‌ای بابت اقامت روزهای مازاد دریافت می‌کنید و فرضتان بر این است که کاربران در اقامتگاه ساکن باقی خواهند ماند این گزینه را انتخاب نمایید.",
  },
];

export const RENEWAL_FINANCIAL_SETTING_LABEL: Record<
  AdmissionRenewalFinancialSettingType,
  string
> = {
  [RENEWAL_FINANCIAL_SETTING.noFee]: "هزینه‌ای دریافت نمی‌کنم",
  [RENEWAL_FINANCIAL_SETTING.warehousing]: "هزینه انبارداری دریافت می‌کنم",
  [RENEWAL_FINANCIAL_SETTING.extraStay]: "هزینه اقامت مازاد دریافت می‌کنم",
};

export const SOURCE_PROGRAM_OPTIONS = RENEWAL_SOURCE_CATALOG.map((source) => ({
  id: source.id,
  title: source.sourceProgramTitle,
}));

export const buildSettingsInitialValues = (params: {
  hasRenewal: boolean;
  renewalSources: AdmissionRenewalSourceItem[];
}): AdmissionStepsSettingsFormType => ({
  hasRenewal: params.hasRenewal,
  // CustomSelect option values are stringified ids — keep the same type so tags show titles
  sourcePrograms: params.renewalSources.map((source) => String(source.id)),
});

export const getSelectedSourceProgramIds = (
  sourcePrograms?: SelectType<IdTitle>[] | (string | number)[] | IdTitle[]
) => {
  if (!sourcePrograms?.length) {
    return [];
  }

  return sourcePrograms.map((item) => {
    if (typeof item === "object" && item !== null) {
      if ("value" in item) {
        return Number(item.value);
      }

      if ("id" in item) {
        return Number(item.id);
      }
    }

    return Number(item);
  });
};

export const getRenewalQuestion = (isDailyOrMonthly: boolean) =>
  isDailyOrMonthly
    ? "آیا می‌خواهید ساکنین این برنامه پذیرش امکان ثبت درخواست تمدید داشته باشند؟"
    : "آیا می‌خواهید ساکنین قبلیِ برنامه‌های پذیرش‌ “ترمیک / دوره‌ای” امکان ثبت درخواست تمدید داشته باشند؟";

export const getRenewalDescription = (
  isDailyOrMonthly: boolean,
  renewalAllowedFrom: string,
  renewalAllowedTo: string
) =>
  isDailyOrMonthly
    ? `در صورت فعال بودن، ساکنین این برنامه پذیرش امکان ثبت درخواست تمدید برای اقامت خود را در بازه مجاز اسکان این برنامه از “${renewalAllowedFrom}” تا “${renewalAllowedTo}” خواهند داشت.`
    : "در صورت فعال بودن، مشخص کنید ساکنین کدام برنامه‌های پذیرش می‌توانند برای ظرفیت‌های این برنامه درخواست تمدید ثبت کنند.";

export const getFinancialModalAlertMessage = (
  record: AdmissionRenewalSourceItem,
  currentProgramTitle: string
) =>
  `مشخص کنید بابت فاصله “${record.timeInterval}” رفتار مالی شما با کاربران ساکن برنامه پذیرش “${record.sourceProgramTitle}” که به این برنامه “${currentProgramTitle}” تمدید می‌کنند چگونه خواهد بود.`;

export const applyFinancialSettingsToSource = (
  record: AdmissionRenewalSourceItem,
  values: {
    financialSettingType: AdmissionRenewalFinancialSettingType;
    warehousingFee?: number | null;
    extraStayDailyPercent?: number | null;
  }
): AdmissionRenewalSourceItem => {
  const financialSettingType = values.financialSettingType;

  return {
    ...record,
    financialSettingType,
    financialSettingLabel: RENEWAL_FINANCIAL_SETTING_LABEL[financialSettingType],
    warehousingFee:
      financialSettingType === RENEWAL_FINANCIAL_SETTING.warehousing
        ? (values.warehousingFee ?? null)
        : null,
    extraStayDailyPercent:
      financialSettingType === RENEWAL_FINANCIAL_SETTING.extraStay
        ? (values.extraStayDailyPercent ?? null)
        : null,
  };
};

export const RENEWAL_CAPACITY_SEGMENT = {
  renewable: "renewable",
  nonRenewable: "nonRenewable",
} as const;

export const getNonRenewableCapacityCount = (record: AdmissionRenewalSourceItem) =>
  Math.max(record.sourceCapacity - record.renewableCapacity, 0);

export const getRenewalCapacitySegmentOptions = (record: AdmissionRenewalSourceItem) => [
  {
    value: RENEWAL_CAPACITY_SEGMENT.renewable,
    label: `ظرفیت‌های قابل تمدید (${record.renewableCapacity})`,
  },
  {
    value: RENEWAL_CAPACITY_SEGMENT.nonRenewable,
    label: `ظرفیت‌های غیر قابل تمدید (${getNonRenewableCapacityCount(record)})`,
  },
];

export const getRenewalCapacityItemsByMode = (
  capacityType: string,
  data: typeof settingsContentData = settingsContentData
):
  | AdmissionCapacityBedItem[]
  | AdmissionCapacityUnitItem[]
  | AdmissionCapacityBuildingItem[] => {
  if (capacityType === RESERVABLE_CAPACITY_TYPE.bed) {
    return data.capacityBeds;
  }

  if (capacityType === RESERVABLE_CAPACITY_TYPE.unit) {
    return data.capacityUnits;
  }

  return data.capacityBuildings;
};

export const getRenewalCapacityTableData = (
  capacityType: string,
  segment: RenewalCapacitySegment,
  record: AdmissionRenewalSourceItem,
  data: typeof settingsContentData = settingsContentData
):
  | AdmissionCapacityBedItem[]
  | AdmissionCapacityUnitItem[]
  | AdmissionCapacityBuildingItem[] => {
  const items = getRenewalCapacityItemsByMode(capacityType, data);
  const splitIndex = Math.min(
    items.length,
    Math.max(0, Math.round((items.length * record.renewablePercent) / 100))
  );

  if (segment === RENEWAL_CAPACITY_SEGMENT.renewable) {
    return items.slice(0, splitIndex);
  }

  return items.slice(splitIndex);
};
