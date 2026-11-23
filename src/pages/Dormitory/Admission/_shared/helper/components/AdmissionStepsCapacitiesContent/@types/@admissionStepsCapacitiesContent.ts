import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  AdmissionDetailStatus,
  ScheduleType,
} from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import { CapacitiesMode } from "@pages/Dormitory/Admission/_shared/util";

export type AdmissionStepsCapacitiesTabKey =
  "withoutProgram" | "thisProgram" | "transferable" | "nonAddable";

export type AdmissionStepsCapacitiesFilterFormType = {
  building?: SelectType<IdTitle>;
  floor?: SelectType<IdTitle>;
  unitTitle?: SelectType<IdTitle>[];
  unitType?: SelectType<IdTitle>[];
  qualityGrade?: SelectType<IdTitle>[];
  bedCountInUnit?: SelectType<IdTitle>[];
  bedType?: SelectType<IdTitle>[];
};

export type AdmissionStepsCapacitiesAddFormType = {
  price?: number | null;
  receiveDeposit?: boolean;
  deposit?: number | null;
};

export type AdmissionStepsCapacitiesLinkedProgramFields = {
  linkedProgramTitle?: string;
  linkedProgramStatus?: AdmissionDetailStatus;
  linkedProgramScheduleType?: ScheduleType;
  code?: string;
};

export type AdmissionStepsCapacitiesRecord = (
  | GetAdmissionBedsListContent
  | GetAdmissionUnitListContent
  | GetAdmissionBuildingsListContent
) &
  AdmissionStepsCapacitiesLinkedProgramFields;

export type AdmissionStepsCapacitiesModalTarget =
  | {
      kind: "group";
    }
  | {
      kind: "single";
      record: AdmissionStepsCapacitiesRecord;
    };

export type AdmissionStepsCapacitiesModalContext = {
  mode: CapacitiesMode;
  hasFilter: boolean;
  filteredCount: number;
  scheduleType?: ScheduleType;
  programTitle: string;
};

export type AdmissionStepsCapacitiesModalIntent = "add" | "edit" | "transfer";

export type AdmissionStepsCapacitiesAddModalProps = {
  open: boolean;
  intent?: AdmissionStepsCapacitiesModalIntent;
  target: AdmissionStepsCapacitiesModalTarget | null;
  context: AdmissionStepsCapacitiesModalContext;
  onCancel: () => void;
  onConfirm: (values: AdmissionStepsCapacitiesAddFormType) => void;
};

export type AdmissionStepsCapacitiesDeleteModalProps = {
  open: boolean;
  target: AdmissionStepsCapacitiesModalTarget | null;
  context: AdmissionStepsCapacitiesModalContext;
  onCancel: () => void;
  onConfirm: () => void;
};

export type AdmissionStepsCapacitiesContentProps = {
  mode: CapacitiesMode;
  scheduleType?: ScheduleType;
  programTitle?: string;
  onBack: () => void;
  onSaveDraft: () => void;
  onSubmitAndContinue: () => void;
};

export type AdmissionStepsCapacitiesTableVariant =
  "addable" | "program" | "readonly" | "transferable";

export type GetAdmissionBedsListRequest = {
  uuid: string;
  buildingUuids?: string[];
  floorUuids?: string[];
  roomUuids?: string[];
  roomTypes?: string[];
  qualityGradeUuids?: string[];
  bedCounts?: number[];
  bedTypes?: string[];
  bedNumber?: string;
  bedTitle?: string;
  tab?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
};

export type GetAdmissionBedsListContent = {
  uuid: string;
  bedNumber: string;
  title: string;
  bedType: IdTitleName;
  bedPosition: null;
  roomUuid: string;
  roomTitle: string;
  roomBedCount: number;
  roomType: IdTitleName;
  qualityGradeUuid: string | null;
  qualityGradeTitle: string | null;
  floorUuid: string;
  floorNumber: number;
  floorTitle: string;
  buildingUuid: string;
  buildingTitle: string;
  itemUuid: null;
  price: null;
  depositAmount: null;
  admissionPlanUuid: string | null;
  admissionPlanTitle: string | null;
  admissionPlanStatus: IdTitleName | null;
  periodType: IdTitleName | null;
};

export type GetAdmissionBedsListResponse = {
  content: GetAdmissionBedsListContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetAdmissionBedsListCountRequest = {
  uuid: string;
  buildingUuids?: string[];
  floorUuids?: string[];
  roomUuids?: string[];
  roomTypes?: string[];
  qualityGradeUuids?: string[];
  bedCounts?: number[];
  bedTypes?: string[];
  bedNumber?: string;
  bedTitle?: string;
};

export type GetAdmissionBedsListCountResponse = {
  unassigned: number;
  thisPlan: number;
  movable: number;
  notAddable: number;
};

export type GetAdmissionBuildingsListRequest = {
  uuid: string;
  buildingUuids?: string[];
  floorUuids?: string[];
  roomUuids?: string[];
  roomTypes?: string[];
  qualityGradeUuids?: string[];
  bedCounts?: number[];
  bedTypes?: string[];
  bedNumber?: string;
  bedTitle?: string;
  tab?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
};

export type GetAdmissionBuildingsListContent = {
  uuid: string;
  title: string;
  qualityGradeUuid: string;
  qualityGradeTitle: string;
  itemUuid: string;
  price: number;
  depositAmount: number;
  admissionPlanUuid: string;
  admissionPlanTitle: string;
  admissionPlanStatus: IdTitleName;
  periodType: IdTitleName;
};

export type GetAdmissionBuildingsListResponse = {
  content: GetAdmissionBuildingsListContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetAdmissionBuildingsListCountRequest = {
  uuid: string;
  buildingUuids?: string[];
  floorUuids?: string[];
  roomUuids?: string[];
  roomTypes?: string[];
  qualityGradeUuids?: string[];
  bedCounts?: number[];
  bedTypes?: string[];
  bedNumber?: string;
  bedTitle?: string;
};

export type GetAdmissionBuildingsListCountResponse = {
  unassigned: number;
  thisPlan: number;
  movable: number;
  notAddable: number;
};

export type GetAdmissionUnitListRequest = {
  uuid: string;
  buildingUuids?: string[];
  floorUuids?: string[];
  roomUuids?: string[];
  roomTypes?: string[];
  qualityGradeUuids?: string[];
  bedCounts?: number[];
  bedTypes?: string[];
  bedNumber?: string;
  bedTitle?: string;
  tab?: string;
  pageNumber: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: string;
};

export type GetAdmissionUnitListContent = {
  uuid: string;
  roomNumber: string;
  title: string;
  bedCount: number;
  roomType: IdTitleName;
  qualityGradeUuid: string;
  qualityGradeTitle: string;
  floorUuid: string;
  floorNumber: number;
  floorTitle: string;
  buildingUuid: string;
  buildingTitle: string;
  itemUuid: string;
  price: number;
  depositAmount: number;
  admissionPlanUuid: string;
  admissionPlanTitle: string;
  admissionPlanStatus: IdTitleName;
  periodType: IdTitleName;
};

export type GetAdmissionUnitListResponse = {
  content: GetAdmissionUnitListContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetAdmissionUnitListCountRequest = {
  uuid: string;
  buildingUuids?: string[];
  floorUuids?: string[];
  roomUuids?: string[];
  roomTypes?: string[];
  qualityGradeUuids?: string[];
  bedCounts?: number[];
  bedTypes?: string[];
  bedNumber?: string;
  bedTitle?: string;
};

export type GetAdmissionUnitListCountResponse = {
  unassigned: number;
  thisPlan: number;
  movable: number;
  notAddable: number;
};
