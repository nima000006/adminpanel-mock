import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import { TopChartUnit } from "../../@types/@topChartUnit ";

const BusinessRequestsTableBaseInfoTopChartTableModel = (
  handleAddChild: (record: TopChartUnit) => void
) => {
  return [
    {
      title: "عنوان واحد",
      dataIndex: "unitName",
      key: "unitName",
      width: 120,
    },
    {
      title: "نوع واحد",
      dataIndex: "unitType",
      key: "unitType",
      width: 105,
      render: (_: unknown, record: TopChartUnit) => {
        return <CustomTag color="processing">{record.unitType}</CustomTag>;
      },
    },
    {
      title: "شعبه",
      dataIndex: "branch",
      key: "branch",
      width: 105,
      render: (_: unknown, record: TopChartUnit) => {
        return <CustomTag color="geekblue">{record.branch}</CustomTag>;
      },
    },
    {
      title: "والد واحد",
      dataIndex: "parentUnit",
      key: "parentUnit",
      width: 130,
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "createDate",
      key: "createDate",
      width: 135,
    },
    {
      title: "تاریخ آخرین ویرایش",
      dataIndex: "lastEditDate",
      key: "lastEditDate",
      width: 185,
    },
    {
      title: "ایجاد شده توسط",
      dataIndex: "createdBy",
      key: "createdBy",
      width: 150,
    },
    {
      title: "توضیحات",
      dataIndex: "description",
      key: "description",
      width: 80,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      render: (_: unknown, record: TopChartUnit) => (
        <div className="btn-container">
          <CustomButton type="link" className="delete-button">
            حذف
          </CustomButton>
          <CustomButton type="link">ویرایش</CustomButton>
          <CustomButton onClick={() => handleAddChild(record)} type="link">
            زیر مجموعه
          </CustomButton>
        </div>
      ),
    },
  ];
};
export default BusinessRequestsTableBaseInfoTopChartTableModel;
