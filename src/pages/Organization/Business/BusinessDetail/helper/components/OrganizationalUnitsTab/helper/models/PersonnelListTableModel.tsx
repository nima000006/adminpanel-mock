import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { personnelListMockDataType } from "@pages/Organization/Business/BusinessDetail/helper/components/OrganizationalUnitsTab/helper/components/PositionsAndPersonnelSegmentContent/@types/@positionsAndPersonnelSegmentContent";

const PersonnelListTableModel = (): CustomColumnType<personnelListMockDataType>[] => {
  return [
    {
      title: "نام",
      dataIndex: "firstName",
      key: "firstName",
      width: 150,
    },
    {
      title: "نام خانوادگی",
      dataIndex: "lastName",
      key: "lastName",
      width: 150,
    },
    {
      title: "سمت",
      dataIndex: "position",
      key: "position",
      width: 150,
      render: (value: number) => {
        return <CustomTag color={"purple"}>{value}</CustomTag>;
      },
    },
    {
      title: "کد ملی",
      dataIndex: "nationalCode",
      key: "nationalCode",
      width: 150,
    },
    {
      title: "کد پرسنلی",
      dataIndex: "personnelCode",
      key: "personnelCode",
      width: 150,
    },
    {
      title: "تاریخ شروع به کار",
      dataIndex: "startDate",
      key: "startDate",
      width: 130,
      render: (value: string) => {
        return <>{dataPlaceHolder({ data: value, isDate: true })}</>;
      },
    },
    {
      title: "تاریخ اتمام کار",
      dataIndex: "endDate",
      key: "endDate",
      width: 130,
      render: (value: string) => {
        return <>{dataPlaceHolder({ data: value, isDate: true })}</>;
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
export default PersonnelListTableModel;
