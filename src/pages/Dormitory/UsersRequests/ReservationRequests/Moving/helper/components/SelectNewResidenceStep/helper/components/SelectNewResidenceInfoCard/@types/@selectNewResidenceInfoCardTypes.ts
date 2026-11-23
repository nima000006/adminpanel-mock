import { BED_TYPE } from "@pages/Dormitory/Residence/ActiveResidence/_shared/util";

export type SelectNewResidenceBase = "bed" | "residence" | "building";

export type SelectNewResidenceInfo = {
  /** تخت */
  bedTitle?: string;
  bedType?: keyof typeof BED_TYPE;
  bedPosition?: string;
  /** واحد اقامتی */
  roomTitle?: string;
  roomType?: string;
  /** ساختمان */
  buildingTitle?: string;
  capacity?: string;
  /** مشترک */
  floorTitle?: string;
  unitTitle?: string;
  depositAmount?: number;
  accommodationAmount: number;
};

export type SelectNewResidenceInfoCardProps = {
  label: string;
  variant: "current" | "alternative";
  base: SelectNewResidenceBase;
  data: SelectNewResidenceInfo;
};
