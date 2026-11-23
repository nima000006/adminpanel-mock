import CustomTag from "@components/Renderers/CustomTag/CustomTag";

import { FloorInfoIdTitleType } from "../../../../../../@types/@floorDetailDrawerContent";

export const FloorDetailFloorFacilitiesTableModel = [
  {
    title: "عنوان",
    dataIndex: "title",
    key: "title",
    width: 100,
  },
  {
    title: "نوع امکانات",
    dataIndex: "AssociationCategoryFacilityType",
    key: "AssociationCategoryFacilityType",
    width: 100,
    render: (value: FloorInfoIdTitleType) => {
      return <CustomTag>{value?.title}</CustomTag>;
    },
  },
];
