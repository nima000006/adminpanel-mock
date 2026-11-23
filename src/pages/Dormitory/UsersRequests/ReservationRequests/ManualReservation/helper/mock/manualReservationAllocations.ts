import {
  AllocateResidenceCardItem,
  AllocationType,
} from "../components/AllocateResidenceStep/@types/@allocateResidenceStep";

export const MANUAL_RESERVATION_ALLOCATION_TYPE = {
  bed: "bed",
  unit: "unit",
  building: "building",
} as const satisfies Record<AllocationType, AllocationType>;

const BED_META_ITEMS: AllocateResidenceCardItem["metaItems"] = [
  { value: "اتاق مستقل" },
  { value: "VIP" },
  { value: "۰۰۲", label: "واحد اقامتی" },
  { value: "VIP" },
  { value: "طبقه ۵", label: "طبقه" },
  { value: "شهید بهشتی", label: "ساختمان" },
];

export const MANUAL_RESERVATION_MOCK_BEDS: AllocateResidenceCardItem[] = [
  {
    id: "bed-1",
    title: "تخت ۰۰۲",
    subtitle: "تخت پایین",
    tagLabel: "دو طبقه",
    tagColor: "geekblue",
    bedTier: "secondFloor",
    metaItems: BED_META_ITEMS,
    deposit: 12000000,
    residenceFee: 2000000,
  },
  {
    id: "bed-2",
    title: "تخت ۰۰۲",
    subtitle: "تخت پایین",
    tagLabel: "سه طبقه",
    tagColor: "volcano",
    bedTier: "threeFloor",
    metaItems: BED_META_ITEMS,
    deposit: 12000000,
    residenceFee: 0,
  },
  {
    id: "bed-3",
    title: "تخت ۰۰۲",
    tagLabel: "دو طبقه",
    tagColor: "geekblue",
    bedTier: "secondFloor",
    metaItems: BED_META_ITEMS,
    deposit: 12000000,
    residenceFee: 2000000,
  },
  {
    id: "bed-4",
    title: "تخت ۰۰۲",
    subtitle: "تخت پایین",
    tagLabel: "دو طبقه",
    tagColor: "geekblue",
    bedTier: "secondFloor",
    metaItems: BED_META_ITEMS,
    deposit: 12000000,
    residenceFee: 2000000,
  },
  {
    id: "bed-5",
    title: "تخت ۰۰۲",
    subtitle: "تخت پایین",
    tagLabel: "دو طبقه",
    tagColor: "geekblue",
    bedTier: "secondFloor",
    metaItems: BED_META_ITEMS,
    deposit: 12000000,
    residenceFee: 2000000,
  },
  {
    id: "bed-6",
    title: "تخت ۰۰۲",
    tagLabel: "دو طبقه",
    tagColor: "geekblue",
    bedTier: "secondFloor",
    metaItems: BED_META_ITEMS,
    deposit: 12000000,
    residenceFee: 2000000,
  },
  {
    id: "bed-7",
    title: "تخت ۰۰۲",
    subtitle: "تخت پایین",
    tagLabel: "دو طبقه",
    tagColor: "geekblue",
    bedTier: "secondFloor",
    metaItems: BED_META_ITEMS,
    deposit: 12000000,
    residenceFee: 2000000,
  },
  {
    id: "bed-8",
    title: "تخت ۰۰۲",
    tagLabel: "دو طبقه",
    tagColor: "geekblue",
    bedTier: "secondFloor",
    metaItems: BED_META_ITEMS,
    deposit: 12000000,
    residenceFee: 2000000,
  },
];

export const MANUAL_RESERVATION_MOCK_UNITS: AllocateResidenceCardItem[] = [
  {
    id: "unit-1",
    title: "ماه‌تاب، ۰۰۵",
    subtitle: "۴ تخت",
    tagLabel: "اتاق مستقل",
    metaItems: [
      { value: "معمولی" },
      { value: "طبقه ۳", label: "طبقه" },
      { value: "سعادت‌آباد", label: "ساختمان" },
    ],
    deposit: 8500000,
    residenceFee: 1500000,
  },
  {
    id: "unit-2",
    title: "ماه‌تاب، ۰۰۶",
    subtitle: "۴ تخت",
    tagLabel: "سوییت",
    metaItems: [
      { value: "معمولی" },
      { value: "طبقه ۳", label: "طبقه" },
      { value: "سعادت‌آباد", label: "ساختمان" },
    ],
    deposit: 8500000,
    residenceFee: 1500000,
  },
  {
    id: "unit-3",
    title: "یاس، ۰۱۳",
    subtitle: "۱ تخت",
    tagLabel: "اتاق مستقل",
    metaItems: [
      { value: "ویژه" },
      { value: "طبقه ۱", label: "طبقه" },
      { value: "آزادی", label: "ساختمان" },
    ],
    deposit: 20000000,
    residenceFee: 4000000,
  },
  {
    id: "unit-4",
    title: "یاس، ۰۱۴",
    subtitle: "۲ تخت",
    tagLabel: "اتاق مستقل",
    metaItems: [
      { value: "ویژه" },
      { value: "طبقه ۱", label: "طبقه" },
      { value: "آزادی", label: "ساختمان" },
    ],
    deposit: 20000000,
    residenceFee: 4000000,
  },
  {
    id: "unit-5",
    title: "یاس، ۰۱۵",
    subtitle: "۳ تخت",
    tagLabel: "اتاق مستقل",
    metaItems: [
      { value: "ویژه" },
      { value: "طبقه ۱", label: "طبقه" },
      { value: "آزادی", label: "ساختمان" },
    ],
    deposit: 20000000,
    residenceFee: 4000000,
  },
  {
    id: "unit-6",
    title: "یاس، ۰۱۶",
    subtitle: "۴ تخت",
    tagLabel: "اتاق مستقل",
    metaItems: [
      { value: "ویژه" },
      { value: "طبقه ۱", label: "طبقه" },
      { value: "آزادی", label: "ساختمان" },
    ],
    deposit: 20000000,
    residenceFee: 4000000,
  },
];

export const MANUAL_RESERVATION_MOCK_BUILDINGS: AllocateResidenceCardItem[] = [
  {
    id: "building-1",
    title: "سعادت‌آباد",
    subtitle: "۱۲ واحد",
    tagLabel: "معمولی",
    metaItems: [{ value: "۴ طبقه" }, { value: "شهید چمران", label: "اقامتگاه" }],
    deposit: 8500000,
    residenceFee: 1500000,
  },
  {
    id: "building-2",
    title: "آزادی",
    subtitle: "۸ واحد",
    tagLabel: "ویژه",
    metaItems: [{ value: "۳ طبقه" }, { value: "شهید بهشتی", label: "اقامتگاه" }],
    deposit: 20000000,
    residenceFee: 4000000,
  },
  {
    id: "building-3",
    title: "شهید بهشتی",
    subtitle: "۲۰ واحد",
    tagLabel: "ویژه",
    metaItems: [{ value: "۵ طبقه" }, { value: "ولیعصر", label: "اقامتگاه" }],
    deposit: 20000000,
    residenceFee: 4000000,
  },
  {
    id: "building-4",
    title: "ولیعصر",
    subtitle: "۱۰ واحد",
    tagLabel: "معمولی",
    metaItems: [{ value: "۲ طبقه" }, { value: "شهید چمران", label: "اقامتگاه" }],
    deposit: 8500000,
    residenceFee: 1500000,
  },
];

export const getAllocationItemsByType = (
  allocationType: AllocationType
): AllocateResidenceCardItem[] => {
  if (allocationType === MANUAL_RESERVATION_ALLOCATION_TYPE.unit) {
    return MANUAL_RESERVATION_MOCK_UNITS;
  }

  if (allocationType === MANUAL_RESERVATION_ALLOCATION_TYPE.building) {
    return MANUAL_RESERVATION_MOCK_BUILDINGS;
  }

  return MANUAL_RESERVATION_MOCK_BEDS;
};

export const MANUAL_RESERVATION_MOCK_FILTER_BUILDINGS = [
  { id: 1, title: "شهید بهشتی" },
  { id: 2, title: "سعادت‌آباد" },
  { id: 3, title: "آزادی" },
];

export const MANUAL_RESERVATION_MOCK_FILTER_FLOORS = [
  { id: 1, title: "طبقه ۱" },
  { id: 2, title: "طبقه ۳" },
  { id: 3, title: "طبقه ۵" },
];

export const MANUAL_RESERVATION_MOCK_FILTER_UNITS = [
  { id: 1, title: "۰۰۲" },
  { id: 2, title: "۰۰۵" },
  { id: 3, title: "۰۱۳" },
];
