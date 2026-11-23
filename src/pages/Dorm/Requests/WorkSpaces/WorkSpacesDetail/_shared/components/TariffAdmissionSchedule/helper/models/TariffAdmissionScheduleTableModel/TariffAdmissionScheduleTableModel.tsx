import CustomTag from "@components/Renderers/CustomTag/CustomTag";

import {
  titleColumn,
  idColumn,
  schedulingTypeColumn,
  reservationTypeColumn,
  appliedStartDateColumn,
  appliedEndDateColumn,
  createDateColumn,
} from "./utils/TariffTableModel";

const TariffAdmissionScheduleTableModel = () => {
  return [
    titleColumn, // عنوان
    idColumn, // شناسه
    {
      title: "اقامتگاه",
      dataIndex: "AssociationDormitory_title",
      key: "AssociationDormitory_title",
      width: 150,
    },
    {
      title: "استان",
      dataIndex:
        "AssociationCategoryBranch_AssociationCategoryRegion_AssociationRegionType_title",
      key: "AssociationCategoryBranch_AssociationCategoryRegion_AssociationRegionType_title",
      width: 150,
    },
    {
      title: "شهر",
      dataIndex: "AssociationCategoryBranch_AssociationCategoryRegion_title",
      key: "AssociationCategoryBranch_AssociationCategoryRegion_title",
      width: 150,
    },
    {
      title: "شعبه / واحد ",
      dataIndex: "AssociationCategoryBranch_title",
      key: "AssociationCategoryBranch_title",
      width: 150,
    },
    schedulingTypeColumn, // نوع زمانبندی
    reservationTypeColumn, // نوع رزرو
    {
      title: "نوع مدیریت",
      dataIndex: "managementTypeId",
      key: "managementTypeId",
      width: 150,
      render: (value: number) => {
        return (
          <div>
            {value === 1 ? (
              <CustomTag color="green">دانشگاهی</CustomTag>
            ) : value === 2 ? (
              <CustomTag color="blue">خودگردان</CustomTag>
            ) : value === 3 ? (
              <CustomTag color="yellow">آزاد</CustomTag>
            ) : value === 4 ? (
              <CustomTag color="red">اجاره ای</CustomTag>
            ) : null}
          </div>
        );
      },
    },
    appliedStartDateColumn, // تاریخ شروع اعمال موثر
    appliedEndDateColumn, // تاریخ پایان اعمال موثر
    createDateColumn, // تاریخ ثبت
  ];
};

export default TariffAdmissionScheduleTableModel;
