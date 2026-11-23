import { ScheduleType } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import {
  CapacitiesMode,
  getCapacitiesEntityLabel,
  getCapacitiesPricePeriodLabel,
  hasActiveCapacitiesFilter,
  RESERVABLE_CAPACITY_TYPE,
} from "@pages/Dormitory/Admission/_shared/util";
import {
  CapacitiesEditMode,
  CapacitiesModalTarget,
} from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailCapacitiesContent/@types/@allAdmissionStepsEditDetailCapacitiesContent";

export {
  getCapacitiesEntityLabel,
  getCapacitiesPricePeriodLabel,
  hasActiveCapacitiesFilter,
};

export const getCapacitiesInfoAlertMessage = (mode: CapacitiesEditMode) => {
  if (mode === RESERVABLE_CAPACITY_TYPE.bed) {
    return "در این بخش، تمامی تخت‌هایی که به این برنامه پذیرش اضافه شده‌اند نمایش داده می‌شوند.";
  }

  if (mode === RESERVABLE_CAPACITY_TYPE.unit) {
    return "در این بخش، تمامی واحد اقامتی‌هایی که به این برنامه پذیرش اضافه شده‌اند نمایش داده می‌شوند.";
  }

  if (mode === RESERVABLE_CAPACITY_TYPE.building) {
    return "در این بخش، تمامی ساختمان‌هایی که به این برنامه پذیرش اضافه شده‌اند نمایش داده می‌شوند.";
  }
};

const getCapacitiesRecordIdentifier = (
  mode: CapacitiesMode,
  target: CapacitiesModalTarget | null
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

export const getEditPriceAlertMessage = ({
  mode,
  target,
  hasFilter,
  filteredCount,
  scheduleType,
}: {
  mode: CapacitiesEditMode;
  target: CapacitiesModalTarget | null;
  hasFilter: boolean;
  filteredCount: number;
  scheduleType: ScheduleType;
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

export const getDeleteAlertMessage = ({
  mode,
  target,
  hasFilter,
  filteredCount,
  programTitle,
}: {
  mode: CapacitiesEditMode;
  target: CapacitiesModalTarget | null;
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
