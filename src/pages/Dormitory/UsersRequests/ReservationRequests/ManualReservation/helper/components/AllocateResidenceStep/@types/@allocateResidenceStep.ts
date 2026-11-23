export type AllocationType = "bed" | "unit" | "building";

export type AllocateBedTier = "secondFloor" | "threeFloor";

export type AllocateResidenceCardItem = {
  id: string;
  title: string;
  subtitle?: string;
  tagLabel: string;
  tagColor?: string;
  bedTier?: AllocateBedTier;
  /** Meta segments rendered right-to-left: label (muted) then value. */
  metaItems: { label?: string; value: string }[];
  deposit: number;
  residenceFee: number;
};

export type AllocateResidenceFormType = {
  selectedAllocationId?: string;
  search?: string;
  filterBuilding?: string;
  filterFloor?: string;
  filterUnit?: string;
};

export type AllocateResidenceCardProps = {
  item: AllocateResidenceCardItem;
  allocationType: AllocationType;
};

export type AllocateLocationFilterProps = {
  allocationType: Extract<AllocationType, "bed" | "unit">;
};
