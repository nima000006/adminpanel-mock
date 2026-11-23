import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  AdmissionCapacityBedItem,
  AdmissionCapacityBuildingItem,
  AdmissionCapacityUnitItem,
  ScheduleType,
} from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import { RESERVABLE_CAPACITY_TYPE } from "@pages/Dormitory/Admission/_shared/util";

export type CapacitiesEditMode =
  (typeof RESERVABLE_CAPACITY_TYPE)[keyof typeof RESERVABLE_CAPACITY_TYPE];

export type CapacitiesFilterFormType = {
  building?: SelectType<IdTitle>[];
  floor?: SelectType<IdTitle>[];
  unitTitle?: SelectType<IdTitle>[];
  unitType?: SelectType<IdTitle>[];
  qualityGrade?: SelectType<IdTitle>[];
  bedCountInUnit?: SelectType<IdTitle>[];
  bedType?: SelectType<IdTitle>[];
};

export type CapacitiesEditPriceFormType = {
  price?: number | null;
  receiveDeposit?: boolean;
  deposit?: number | null;
};

export type CapacitiesModalTarget =
  | {
      kind: "group";
    }
  | {
      kind: "single";
      record:
        | AdmissionCapacityBedItem
        | AdmissionCapacityUnitItem
        | AdmissionCapacityBuildingItem;
    };

export type CapacitiesModalContext = {
  mode: CapacitiesEditMode;
  hasFilter: boolean;
  filteredCount: number;
  scheduleType: ScheduleType;
  programTitle: string;
};

export type CapacitiesEditPriceModalProps = {
  open: boolean;
  target: CapacitiesModalTarget | null;
  context: CapacitiesModalContext;
  onCancel: () => void;
  onConfirm: (values: CapacitiesEditPriceFormType) => void;
};

export type CapacitiesDeleteModalProps = {
  open: boolean;
  target: CapacitiesModalTarget | null;
  context: CapacitiesModalContext;
  onCancel: () => void;
  onConfirm: () => void;
};
