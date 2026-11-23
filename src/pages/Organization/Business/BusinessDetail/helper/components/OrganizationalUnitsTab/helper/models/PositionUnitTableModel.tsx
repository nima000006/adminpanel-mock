import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { mockDataType } from "@pages/Organization/Business/BusinessDetail/helper/components/OrganizationalUnitsTab/helper/components/PositionsAndPersonnelSegmentContent/@types/@positionsAndPersonnelSegmentContent";

const PositionUnitTableModel = (): CustomColumnType<mockDataType>[] => {
  return [
    {
      title: "عنوان سمت",
      dataIndex: "positionTitle",
      key: "positionTitle",
      width: 150,
    },
    {
      title: "نوع سمت ",
      dataIndex: "positionType",
      key: "positionType",
      width: 150,
      render: (value: number) => {
        return <CustomTag color={"blue"}>{value}</CustomTag>;
      },
    },
    {
      title: "فعال در",
      dataIndex: "activeIn",
      key: "activeIn",
      width: 150,
    },
    {
      title: "سمت والد",
      dataIndex: "parentPosition",
      key: "parentPosition",
      width: 150,
      render: (value: number) => {
        return <CustomTag color={"purple"}>{value}</CustomTag>;
      },
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "createDate",
      key: "createDate",
      width: 130,
      render: (value: string) => {
        return <>{dataPlaceHolder({ data: value, isDate: true })}</>;
      },
    },
    {
      title: "تاریخ آخرین ویرایش",
      dataIndex: "lastEditDate",
      key: "lastEditDate",
      width: 130,
      render: (value: string) => {
        return <>{dataPlaceHolder({ data: value, isDate: true })}</>;
      },
    },
    {
      title: "ایجاد شده توسط",
      dataIndex: "creator",
      key: "creator",
      width: 130,
    },
  ];
};
export default PositionUnitTableModel;
