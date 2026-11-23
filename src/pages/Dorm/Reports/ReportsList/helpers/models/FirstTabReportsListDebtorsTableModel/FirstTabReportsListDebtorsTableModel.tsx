import { Link } from "react-router";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import {
  makeSearchParams,
  dataPlaceHolder,
  PriceSeparatorWithExtraNumbers,
} from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { DORM_REPORTS_DEBTORS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/dorm";

import { ReportsListDebtorsTabType } from "../../../@types/@reportsList";

const FirstTabReportsListDebtorsTableModel = () => [
  {
    title: "نام",
    dataIndex: "firstName",
    key: "firstName",
    width: 120,
  },
  {
    title: "نام خانوادگی",
    dataIndex: "lastName",
    key: "lastName",
    width: 120,
  },
  {
    title: "وضعیت آخرین قسط",
    dataIndex: "lastInstallmentStatus",
    key: "lastInstallmentStatus",
    width: 150,
    render: (value: number) => {
      return (
        <CustomTag color={value === 0 ? "red" : value === 1 ? "green" : "gold"}>
          {value === 0 ? "سر رسید شده" : value === 1 ? "تسویه شده" : "در انتظار پرداخت"}
        </CustomTag>
      );
    },
  },
  {
    title: "سررسید قسط پیش رو",
    dataIndex: "nextInstallmentDueDate",
    key: "nextInstallmentDueDate",
    width: 150,
    render: (nextInstallmentDueDate: string) => {
      return dataPlaceHolder({
        data: nextInstallmentDueDate,
        isDate: true,
      });
    },
  },
  {
    title: "مانده مبلغ (تومان)",
    dataIndex: "balanceAmount",
    id: "balanceAmount",
    width: 150,
    render: (value: string) => {
      return dataPlaceHolder({
        data: PriceSeparatorWithExtraNumbers(value),
        isPrice: true,
      });
    },
  },
  {
    title: "شماره موبایل",
    dataIndex: "MobileNumber",
    key: "MobileNumber",
    width: 150,
  },
  {
    title: "جنسیت",
    dataIndex: "gender",
    key: "gender",
    width: 100,
    render: (value: number) => {
      return (
        <CustomTag color={value === 0 ? "purple" : value === 1 ? "volcano" : ""}>
          {value === 0 ? "آقایان" : value === 1 ? "بانوان" : ""}
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
          {value === 0 ? "دانشجو" : value === 1 ? "استاد" : "میهمان"}
        </CustomTag>
      );
    },
  },
  {
    title: "شماره دانشجویی/شماره پرسنلی",
    dataIndex: "userId",
    key: "userId",
    width: 200,
  },
  {
    title: "کدملی/اتباع",
    dataIndex: "nationalCode",
    key: "nationalCode",
    width: 150,
  },
  {
    title: "اقامتگاه",
    dataIndex: "residence",
    key: "residence",
    width: 150,
  },
  {
    title: "ساختمان",
    dataIndex: "building",
    key: "building",
    width: 150,
  },
  {
    title: "اتاق",
    dataIndex: "room",
    key: "room",
    width: 150,
  },
  {
    title: "واحد دانشگاهی",
    dataIndex: "unit",
    key: "unit",
    width: 150,
  },
  {
    title: "نوع زمانبندی",
    dataIndex: "typeSchedule",
    key: "typeSchedule",
    width: 100,
    render: (value: number) => {
      return (
        <CustomTag color={value === 0 ? "blue" : value === 1 ? "green" : "gold"}>
          {value === 0 ? "ترمیک" : value === 1 ? "ماهانه" : "روزانه"}
        </CustomTag>
      );
    },
  },
  {
    title: "شروع اسکان",
    dataIndex: "startOfSettlement",
    key: "startOfSettlement",
    width: 150,
    render: (startOfSettlement: string) => {
      return dataPlaceHolder({
        data: startOfSettlement,
        isDate: true,
        customDateFormat: "HH:mm - YYYY/M/D",
      });
    },
  },
  {
    title: "پایان اسکان",
    dataIndex: "endOfSettlement",
    key: "endOfSettlement",
    width: 150,
    render: (endOfSettlement: string) => {
      return dataPlaceHolder({
        data: endOfSettlement,
        isDate: true,
        customDateFormat: "HH:mm - YYYY/M/D",
      });
    },
  },
  {
    title: "شروع بدهکاری از",
    dataIndex: "startDebtors",
    key: "startDebtors",
    width: 150,
    render: (endOfSettlement: string) => {
      return dataPlaceHolder({
        data: endOfSettlement,
        isDate: true,
        customDateFormat: "HH:mm - YYYY/M/D",
      });
    },
  },
  {
    title: "مدت زمان بدهکاری",
    dataIndex: "durationDebtors",
    key: "durationDebtors",
    width: 150,
    render: (value: string) => <CustomTagWithDiffDays value={value} />,
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",
    fixed: "right" as FixedType,
    className: "tables-sticky-column-left",
    width: 100,
    render: (value: number, record: ReportsListDebtorsTabType) => {
      return (
        <div className="dorms-main-list-table-container">
          <Link
            to={{
              pathname: DORM_REPORTS_DEBTORS_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({
                id: value,
                title: `${record?.firstName} ${record?.lastName}`,
                userGroup: record?.userGroup?.toString(),
              }),
            }}
            className="text-link"
          >
            مشاهده
          </Link>
        </div>
      );
    },
  },
];

export default FirstTabReportsListDebtorsTableModel;
