import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";

import {
  getGenderLabel,
  getUserGroupLabel,
} from "../../../../../utils/UsersRequestsDetail";

const UsersRequestsRoomDetailResidentsTableModel = () => {
  return [
    {
      title: "نام",
      dataIndex: "name",
      key: "name",
      width: 130,
    },
    {
      title: "نام خانوادگی",
      dataIndex: "family",
      key: "family",
      width: 130,
    },
    {
      title: "جنسیت",
      dataIndex: "gender",
      key: "gender",
      width: 100,
      render: (value: number) => {
        return (
          <CustomTag color={value === 0 ? "purple" : value === 1 ? "volcano" : ""}>
            {getGenderLabel(value)}
          </CustomTag>
        );
      },
    },
    {
      title: "گروه کاربری",
      dataIndex: "userGroup",
      key: "userGroup",
      width: 150,
      render: (value: number) => {
        return (
          <CustomTag color={value === 0 ? "geekblue" : value === 1 ? "cyan" : "red"}>
            {getUserGroupLabel(value)}
          </CustomTag>
        );
      },
    },
    {
      title: "شماره دانشجویی / شماره پرسنلی",
      dataIndex: "studentCode",
      key: "studentCode",
      width: 200,
    },
    {
      title: "کدملی / اتباع",
      dataIndex: "nationalCode",
      key: "nationalCode",
      width: 130,
    },
    {
      title: "واحد دانشگاهی",
      dataIndex: "uni",
      key: "uni",
      width: 130,
    },
    {
      title: "مقطع تحصیلی",
      dataIndex: "degree",
      key: "degree",
      width: 130,
    },
    {
      title: "رشته تحصیلی",
      dataIndex: "field",
      key: "field",
      width: 130,
    },
    {
      title: "سال ورود",
      dataIndex: "entranceYear",
      key: "entranceYear",
      width: 130,
    },
    {
      title: "ترم",
      dataIndex: "term",
      key: "term",
      width: 130,
    },
    {
      title: "برنامه پذیرش",
      dataIndex: "admission",
      key: "admission",
      width: 300,
    },
    {
      title: "نوع زمان‌بندی",
      dataIndex: "schedulingId",
      key: "schedulingId",
      width: 100,
      render: (value: number) => {
        return (
          <div>
            {value === 1 ? (
              <CustomTag color="blue">ترمیک</CustomTag>
            ) : value === 2 ? (
              <CustomTag color="green">ماهانه</CustomTag>
            ) : (
              <CustomTag color="gold">روزانه</CustomTag>
            )}
          </div>
        );
      },
    },
    {
      title: "شروع اسکان",
      dataIndex: "settlementStartDate",
      key: "settlementStartDate",
      width: 150,
      render: (value: string) => {
        return (
          <>
            {dataPlaceHolder({
              data: value,
              isDate: true,
              customDateFormat: "HH:mm ,YYYY/MM/DD",
            })}
          </>
        );
      },
    },
    {
      title: "پایان اسکان",
      dataIndex: "settlementEndDate",
      key: "settlementEndDate",
      width: 150,
      render: (value: string) => {
        return (
          <>
            {dataPlaceHolder({
              data: value,
              isDate: true,
              customDateFormat: "HH:mm ,YYYY/MM/DD",
            })}
          </>
        );
      },
    },
  ];
};

export default UsersRequestsRoomDetailResidentsTableModel;
