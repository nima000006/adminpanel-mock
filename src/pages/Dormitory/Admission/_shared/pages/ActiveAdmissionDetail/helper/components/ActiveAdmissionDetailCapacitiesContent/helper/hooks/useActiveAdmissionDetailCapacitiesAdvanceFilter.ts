import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import {
  ADMISSION_CAPACITY_OCCUPANCY_STATUS,
  ADMISSION_CAPACITY_OCCUPANCY_STATUS_CONFIG,
  CapacitiesMode,
  RESERVABLE_CAPACITY_TYPE,
} from "@pages/Dormitory/Admission/_shared/util";

const mockBuildingOptions = [
  { id: 1, title: "شهید بهشتی" },
  { id: 2, title: "مریم" },
];

const mockFloorOptions = [
  { id: 1, title: "طبقه همکف" },
  { id: 2, title: "طبقه اول" },
  { id: 3, title: "طبقه دوم" },
];

const mockUnitTitleOptions = [
  { id: 1, title: "عنوان واحد اقامتی 1" },
  { id: 2, title: "عنوان واحد اقامتی 2" },
];

const mockUnitTypeOptions = [
  { id: 1, title: "مستقل" },
  { id: 2, title: "اتاق سوئیت" },
  { id: 3, title: "سوئیت" },
  { id: 4, title: "واحد آپارتمانی" },
];

const mockQualityGradeOptions = [
  { id: 1, title: "درجه یک" },
  { id: 2, title: "درجه دو" },
];

const mockBedCountInUnitOptions = [
  { id: 1, title: "1 تخته" },
  { id: 2, title: "2 تخته" },
  { id: 4, title: "4 تخته" },
];

const mockBedTypeOptions = [
  { id: 1, title: "کف خواب" },
  { id: 2, title: "یک طبقه" },
  { id: 3, title: "دو طبقه" },
  { id: 4, title: "سه طبقه" },
];

const occupancyStatusOptions = Object.values(ADMISSION_CAPACITY_OCCUPANCY_STATUS).map(
  (value, index) => ({
    id: index + 1,
    title: ADMISSION_CAPACITY_OCCUPANCY_STATUS_CONFIG[value].label,
    name: value,
  })
);

const useActiveAdmissionDetailCapacitiesAdvanceFilter = (mode: CapacitiesMode) => {
  const isBed = mode === RESERVABLE_CAPACITY_TYPE.bed;
  const isUnit = mode === RESERVABLE_CAPACITY_TYPE.unit;
  const isBuilding = mode === RESERVABLE_CAPACITY_TYPE.building;

  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "ساختمان",
      name: "building",
      type: "select",
      mode: "multiple",
      options: mockBuildingOptions,
    },
  ];

  // Floor/unit filters apply only to bed and unit modes; building mode only adds quality grade.
  if (isBed || isUnit) {
    filterItemsList.push(
      {
        label: "طبقه",
        name: "floor",
        type: "select",
        mode: "multiple",
        options: mockFloorOptions,
      },
      {
        label: "واحد اقامتی",
        name: "unitTitle",
        type: "select",
        mode: "multiple",
        options: mockUnitTitleOptions,
      },
      {
        label: "نوع واحد اقامتی",
        name: "unitType",
        type: "select",
        mode: "multiple",
        options: mockUnitTypeOptions,
      },
      {
        label: "درجه کیفی واحد اقامتی",
        name: "qualityGrade",
        type: "select",
        mode: "multiple",
        options: mockQualityGradeOptions,
      },
      {
        label: "تعداد تخت در واحد اقامتی",
        name: "bedCountInUnit",
        type: "select",
        mode: "multiple",
        options: mockBedCountInUnitOptions,
      }
    );
  }

  if (isBed) {
    filterItemsList.push({
      label: "نوع تخت",
      name: "bedType",
      type: "select",
      mode: "multiple",
      options: mockBedTypeOptions,
    });
  }

  if (isBuilding) {
    filterItemsList.push({
      label: "درجه کیفی ساختمان",
      name: "qualityGrade",
      type: "select",
      mode: "multiple",
      options: mockQualityGradeOptions,
    });
  }

  filterItemsList.push({
    label: "وضعیت اشغال",
    name: "occupancyStatus",
    type: "select",
    mode: "multiple",
    options: occupancyStatusOptions,
    isNeedsName: true,
  });

  return { filterItemsList };
};

export default useActiveAdmissionDetailCapacitiesAdvanceFilter;
