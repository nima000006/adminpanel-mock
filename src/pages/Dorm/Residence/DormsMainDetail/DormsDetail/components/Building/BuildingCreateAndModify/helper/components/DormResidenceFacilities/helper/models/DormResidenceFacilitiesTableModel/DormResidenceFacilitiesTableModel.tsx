import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import {
  DormFacilityType,
  DormResidenceFacilitiesTableModelTypes,
} from "./@types/@dormResidenceFacilitiesTableModel";
import { DormFacilitiesType } from "../../../../../../@types/@buildingCreateAndModify";

const DormResidenceFacilitiesTableModel = ({
  onEditHandler,
  onDeleteHandler,
}: DormResidenceFacilitiesTableModelTypes) => {
  return [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: 100,
      render: (value: DormFacilityType) => {
        return <>{value?.title}</>;
      },
    },
    {
      title: "نوع امکانات",
      dataIndex: "type",
      key: "type",
      width: 150,
      render: (value: DormFacilityType) => {
        return <CustomTag className="tag-text">{value?.title}</CustomTag>;
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
      width: 100,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 150,
      className: "tables-sticky-column-left",
      render: (value: string, records: DormFacilitiesType) => {
        return (
          <div className="action-btn-container">
            <CustomButton type="link" onClick={() => onEditHandler(records)}>
              ویرایش
            </CustomButton>
            <CustomButton type="link" danger onClick={() => onDeleteHandler(value)}>
              حذف
            </CustomButton>
          </div>
        );
      },
    },
  ];
};

export default DormResidenceFacilitiesTableModel;
