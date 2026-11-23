import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";

import {
  AssociationCategoryFacilityTypes,
  AssociationScopeOfUseOfFacilityType,
} from "../../../../../../@types/@buildingDetailDrawerContent";

const BuildingDetailBuildingFacilitiesTableModel = () => {
  return [
    {
      title: "عنوان",
      dataIndex: "AssociationCategoryFacility",
      key: "AssociationCategoryFacility",
      width: 120,
      render: (value: AssociationCategoryFacilityTypes) => {
        return <>{value?.title}</>;
      },
    },
    {
      title: "نوع امکانات",
      dataIndex: "id",
      key: "id",
      width: 120,
      render: (_: number, record: AssociationScopeOfUseOfFacilityType) => {
        return (
          <CustomTag>
            {record?.AssociationCategoryFacility?.AssociationCategoryFacilityType?.title}
          </CustomTag>
        );
      },
    },
    {
      title: "واحد اندازه‌گیری",
      dataIndex: "unit",
      key: "unit",
      width: 120,
    },
    {
      title: "مقدار ",
      dataIndex: "amount",
      key: "amount",
      width: 120,
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "createDate",
      key: "createDate",
      width: 150,
      render: (value: string, record: AssociationScopeOfUseOfFacilityType) => {
        return (
          <>
            {dataPlaceHolder({ data: value, isDate: true })} ,{" "}
            {dataPlaceHolder({ data: record?.createTime, isTime: true })}
          </>
        );
      },
    },
    {
      title: "ایجاد کننده",
      dataIndex: "createByUserId",
      key: "createByUserId",
      width: 120,
    },
    {
      title: "تاریخ ویرایش",
      dataIndex: "updateDate",
      key: "updateDate",
      width: 120,
      render: (value: string, record: AssociationScopeOfUseOfFacilityType) => {
        return (
          <>
            {dataPlaceHolder({ data: value, isDate: true })} ,{" "}
            {dataPlaceHolder({ data: record?.updateTime, isTime: true })}
          </>
        );
      },
    },
    {
      title: "ویرایش کننده",
      dataIndex: "updateByUserId",
      key: "updateByUserId",
      width: 120,
    },
  ];
};

export default BuildingDetailBuildingFacilitiesTableModel;
