import { ScheduleType } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import {
  AdmissionStepsCapacitiesModalTarget,
  AdmissionStepsCapacitiesRecord,
  AdmissionStepsCapacitiesTabKey,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/@types/@admissionStepsCapacitiesContent";
import {
  CapacitiesMode,
  getCapacitiesEntityLabel,
  getCapacitiesPricePeriodLabel,
  RESERVABLE_CAPACITY_TYPE,
} from "@pages/Dormitory/Admission/_shared/util";

export const ADMISSION_STEPS_CAPACITIES_TABS = {
  withoutProgram: "withoutProgram", // فاقد برنامه
  thisProgram: "thisProgram", // این برنامه
  transferable: "transferable", // قابل انتقال
  nonAddable: "nonAddable", // غیر قابل افزودن
} as const;

const getCapacitiesEntityPlural = (mode: CapacitiesMode) =>
  mode === RESERVABLE_CAPACITY_TYPE.bed
    ? "تخت‌هایی"
    : mode === RESERVABLE_CAPACITY_TYPE.unit
      ? "واحد اقامتی‌هایی"
      : "ساختمان‌هایی";

const getCapacitiesEntityPluralNoun = (mode: CapacitiesMode) =>
  mode === RESERVABLE_CAPACITY_TYPE.bed
    ? "تخت‌ها"
    : mode === RESERVABLE_CAPACITY_TYPE.unit
      ? "واحدهای اقامتی"
      : "ساختمان‌ها";

export const getCapacitiesCreationTabAlertMessage = ({
  mode,
  tab,
  stayDateFrom = "تاریخ X",
  stayDateTo = "تاریخ Y",
}: {
  mode: CapacitiesMode;
  tab: AdmissionStepsCapacitiesTabKey;
  stayDateFrom?: string;
  stayDateTo?: string;
}) => {
  const entityPlural = getCapacitiesEntityPlural(mode);

  if (tab === ADMISSION_STEPS_CAPACITIES_TABS.withoutProgram) {
    return `در این بخش فقط ${entityPlural} نمایش داده می‌شوند که در بازه مجاز اسکان، از «${stayDateFrom}» تا «${stayDateTo}»، در هیچ برنامه پذیرش دیگری استفاده نشده باشند.`;
  }

  if (tab === ADMISSION_STEPS_CAPACITIES_TABS.thisProgram) {
    return `در این بخش، تمامی ${entityPlural} که به این برنامه پذیرش اضافه کرده‌اید نمایش داده می‌شوند.`;
  }

  if (tab === ADMISSION_STEPS_CAPACITIES_TABS.transferable) {
    return `در این بخش، ${entityPlural} نمایش داده می‌شوند که در برنامه‌های پذیرش دیگر با وضعیت «پیش‌نویس» یا «عودت شده» قرار دارند و در صورت نیاز می‌توانید آن‌ها را به این برنامه پذیرش منتقل کنید.`;
  }

  const entityPluralNoun = getCapacitiesEntityPluralNoun(mode);

  return `در این بخش، ${entityPluralNoun} که در سایر برنامه‌های پذیرش با وضعیت «فعال» یا «در انتظار بررسی» قرار دارند نمایش داده می‌شوند و در حال حاضر امکان اضافه کردن آن‌ها به این برنامه پذیرش وجود ندارد.`;
};

const getCapacitiesRecordIdentifier = (
  mode: CapacitiesMode,
  target: AdmissionStepsCapacitiesModalTarget | null
) => {
  if (!target || target.kind !== "single") return "";

  const record = target.record;

  if (mode === RESERVABLE_CAPACITY_TYPE.bed && "bedCode" in record) {
    return record.bedCode;
  }

  if (mode === RESERVABLE_CAPACITY_TYPE.unit && "unitTitle" in record) {
    return record.unitTitle;
  }

  if (mode === RESERVABLE_CAPACITY_TYPE.building && "building" in record) {
    return record.building;
  }

  return "";
};

const getCapacitiesRecordCode = (
  mode: CapacitiesMode,
  record: AdmissionStepsCapacitiesRecord
) => {
  if (mode === RESERVABLE_CAPACITY_TYPE.bed && "bedCode" in record) {
    return record.bedCode;
  }

  return record.code ?? "";
};

const getCapacitiesRecordTitle = (
  mode: CapacitiesMode,
  record: AdmissionStepsCapacitiesRecord
) => {
  if (mode === RESERVABLE_CAPACITY_TYPE.unit && "unitTitle" in record) {
    return record.unitTitle;
  }

  if (mode === RESERVABLE_CAPACITY_TYPE.building && "building" in record) {
    return record.building;
  }

  if (mode === RESERVABLE_CAPACITY_TYPE.bed && "bedTitle" in record) {
    return record.bedTitle ?? "";
  }

  return "";
};

export const getCapacitiesAddAlertMessage = ({
  mode,
  target,
  hasFilter,
  filteredCount,
  scheduleType,
}: {
  mode: CapacitiesMode;
  target: AdmissionStepsCapacitiesModalTarget | null;
  hasFilter: boolean;
  filteredCount: number;
  scheduleType?: ScheduleType;
}) => {
  if (!target) return "";

  const entityLabel = getCapacitiesEntityLabel(mode);
  const periodLabel = getCapacitiesPricePeriodLabel(scheduleType);

  if (target.kind === "single") {
    const identifier = getCapacitiesRecordIdentifier(mode, target);

    if (mode === RESERVABLE_CAPACITY_TYPE.bed) {
      return `قیمت تخت با کد “${identifier}” را برای یک “${periodLabel}” وارد نمایید`;
    }

    return `قیمت ${entityLabel} “${identifier}” را برای یک “${periodLabel}” وارد نمایید.`;
  }

  if (hasFilter) {
    return `قیمت “${filteredCount}” ${entityLabel} فیلترشده را برای یک “${periodLabel}” وارد کنید.`;
  }

  return `قیمت “${filteredCount}” ${entityLabel} را برای یک “${periodLabel}” وارد کنید.`;
};

export const getCapacitiesTransferAlertMessage = ({
  mode,
  target,
  hasFilter,
  filteredCount,
  scheduleType,
  programTitle,
}: {
  mode: CapacitiesMode;
  target: AdmissionStepsCapacitiesModalTarget | null;
  hasFilter: boolean;
  filteredCount: number;
  scheduleType?: ScheduleType;
  programTitle: string;
}): { title: string; description: string } => {
  if (!target) return { title: "", description: "" };

  const entityLabel = getCapacitiesEntityLabel(mode);
  const entityPluralNoun = getCapacitiesEntityPluralNoun(mode);
  const periodLabel = getCapacitiesPricePeriodLabel(scheduleType);

  if (target.kind === "single") {
    const record = target.record;
    const code = getCapacitiesRecordCode(mode, record);
    const title = getCapacitiesRecordTitle(mode, record);
    const previousProgramTitle = record.linkedProgramTitle ?? "عنوان برنامه قبلی";

    if (mode === RESERVABLE_CAPACITY_TYPE.bed) {
      return {
        title: `برای انتقال تخت با کد “${code}” از برنامه “${previousProgramTitle}” به این برنامه “${programTitle}” قیمت یک “${periodLabel}” آن‌ را وارد کنید.`,
        description: "در صورت انتقال، تخت از برنامه پذیرش قبلیش حذف می‌شود.",
      };
    }

    return {
      title: `برای انتقال ${entityLabel} با کد “${code}” و عنوان “${title}” از برنامه “${previousProgramTitle}” به این برنامه “${programTitle}” قیمت یک “${periodLabel}” آن‌ را وارد کنید.`,
      description: `در صورت انتقال، ${entityLabel} از برنامه پذیرش قبلیش حذف می‌شود.`,
    };
  }

  if (hasFilter) {
    return {
      title: `برای انتقال “${filteredCount}” ${entityLabel} فیلترشده به برنامه “${programTitle}” قیمت یک “${periodLabel}” آن‌ها را وارد کنید.`,
      description: `در صورت انتقال، ${entityPluralNoun} از برنامه پذیرش قبلیشان حذف می‌شوند.`,
    };
  }

  return {
    title: `برای انتقال “${filteredCount}” ${entityLabel} به این برنامه “${programTitle}” قیمت یک “${periodLabel}” آن‌ها را وارد کنید.`,
    description: `در صورت انتقال، ${entityPluralNoun} از برنامه پذیرش قبلیشان حذف می‌شوند.`,
  };
};

export const getCapacitiesBulkAddLabel = (hasFilter: boolean) =>
  hasFilter ? "افزودن گروهی (بر اساس فیلترها)" : "افزودن گروهی";

export const getCapacitiesBulkTransferLabel = (hasFilter: boolean) =>
  hasFilter ? "انتقال گروهی (بر اساس فیلترها)" : "انتقال گروهی";

export const getCapacitiesBulkEditLabel = (hasFilter: boolean) =>
  hasFilter ? "ویرایش گروهی قیمت (بر اساس فیلترها)" : "ویرایش گروهی قیمت";

export const getCapacitiesBulkDeleteLabel = (hasFilter: boolean) =>
  hasFilter ? "حذف گروهی از برنامه (بر اساس فیلترها)" : "حذف گروهی از برنامه";

export const getCapacitiesDeleteAlertMessage = ({
  mode,
  target,
  hasFilter,
  filteredCount,
  programTitle,
}: {
  mode: CapacitiesMode;
  target: AdmissionStepsCapacitiesModalTarget | null;
  hasFilter: boolean;
  filteredCount: number;
  programTitle: string;
}) => {
  if (!target) return "";

  const entityLabel = getCapacitiesEntityLabel(mode);

  if (target.kind === "single") {
    const identifier = getCapacitiesRecordIdentifier(mode, target);

    if (mode === RESERVABLE_CAPACITY_TYPE.bed) {
      return `از حذف تخت با کد “${identifier}” از این برنامه “${programTitle}” اطمینان دارید؟`;
    }

    return `از حذف ${entityLabel} “${identifier}” از این برنامه “${programTitle}” اطمینان دارید؟`;
  }

  if (hasFilter) {
    return `از حذف، “${filteredCount}” ${entityLabel} فیلترشده از این برنامه “${programTitle}” اطمینان دارید؟`;
  }

  return `از حذف، “${filteredCount}” ${entityLabel} از این برنامه “${programTitle}” اطمینان دارید؟`;
};

export const getCapacitiesEditPriceAlertMessage = ({
  mode,
  target,
  hasFilter,
  filteredCount,
  scheduleType,
}: {
  mode: CapacitiesMode;
  target: AdmissionStepsCapacitiesModalTarget | null;
  hasFilter: boolean;
  filteredCount: number;
  scheduleType?: ScheduleType;
}) => {
  if (!target) return "";

  const entityLabel = getCapacitiesEntityLabel(mode);
  const periodLabel = getCapacitiesPricePeriodLabel(scheduleType);

  if (target.kind === "single") {
    const identifier = getCapacitiesRecordIdentifier(mode, target);

    if (mode === RESERVABLE_CAPACITY_TYPE.bed) {
      return `جهت ویرایش، قیمت تخت با کد “${identifier}” را برای یک “${periodLabel}” وارد نمایید.`;
    }

    return `جهت ویرایش، قیمت ${entityLabel} “${identifier}” را برای یک “${periodLabel}” وارد نمایید.`;
  }

  if (hasFilter) {
    return `جهت ویرایش، قیمت “${filteredCount}” ${entityLabel} فیلترشده را برای یک “${periodLabel}” وارد کنید.`;
  }

  return `جهت ویرایش، قیمت “${filteredCount}” ${entityLabel} را برای یک “${periodLabel}” وارد کنید.`;
};
