import { Key } from "react";

import moment from "jalali-moment";

import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";

import CustomTag from "../../../../../components/Renderers/CustomTag/CustomTag";
import {
  ActiveDormReportRequestsTableData,
  RequestActiveDormitory,
} from "../../../../../pages/Reports/dorms/DormsRequests/DormReportRequests/ActiveDormReportRequests/@types/@activeDormReportRequests";
import { dataPlaceHolder, LimitText } from "../../../../helpers/utils";
import { GeneralTableModelTypeWithSearch } from "../../../modules/GeneralTypes/GeneralTypes";

import "./_roomReportRequestsModel.scss";

export const RoomReportRequestsModel = ({
  from,
}: GeneralTableModelTypeWithSearch & { from: number }) => [
  {
    title: "نام",
    dataIndex: "name",
    key: "name",
    width: 100,
    searchable: true,
  },
  {
    title: "نام خانوادگی",
    dataIndex: "family",
    key: "family",
    width: 200,
    searchable: true,
  },
  {
    title: "شماره دانشجویی",
    dataIndex: "studntNumber",
    key: "studntNumber",
    width: 200,
    searchable: true,
  },
  {
    title: "جنسیت",
    dataIndex: "jender",
    key: "jender",
    width: 90,
    filters: [
      {
        text: "مرد",
        value: "مرد",
      },
      {
        text: "زن",
        value: "زن",
      },
    ],
    onFilter: (value: boolean | Key, record: RequestActiveDormitory) => {
      return record.jender === value;
    },
    filterSearch: true,
  },
  {
    title: "کد ملی / اتباع",
    dataIndex: "nationalcode",
    key: "nationalcode",
    width: 120,
    searchable: true,
  },
  {
    title: "شماره موبایل",
    dataIndex: "mobile",
    key: "mobile",
    width: 140,
    searchable: true,
    // render: (value: string) => {
    //   return <div dir="ltr">{value?.slice(0, 4) + "***" + value?.slice(7, 11)}</div>;
    // },
  },
  {
    title: "خوابگاه",
    dataIndex: "dormitoryname",
    key: "dormitoryname",
    width: 200,
    searchable: true,
  },
  {
    title: "نوع رزرو",
    dataIndex: "dormitorytype",
    key: "dormitorytype",
    width: 100,
    searchable: true,
  },
  {
    title: "نوع درخواست",
    dataIndex: "status",
    key: "status",
    width: 120,
    render: (value: number) => {
      if (value === 1) {
        return "در انتطار بررسی";
      }
      if (value === 2) {
        return "رد شده";
      }
      if (value === 3) {
        return "در انتطار پرداخت";
      }
      if (value === 4) {
        return "پرداخت شده";
      }
      if (value === 5) {
        return "تحویل شده";
      }
      return "";
    },
  },
  {
    title: "تاریخ درخواست",
    dataIndex: "requestdate",
    key: "requestdate",
    width: 170,
    render: (requestdate: string) => {
      return moment(requestdate ?? new Date())
        .locale("fa")
        .format("(HH:mm) YYYY/M/D");
    },
    sorter: (
      a: ActiveDormReportRequestsTableData,
      b: ActiveDormReportRequestsTableData
    ) => {
      return (
        moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
          moment(a.requestdate ?? new Date()),
          "seconds"
        ) -
        moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
          moment(b.requestdate ?? new Date()),
          "seconds"
        )
      );
    },
  },
  {
    title: "کد ملی ادمین",
    dataIndex: "adminUsername",
    key: "adminUsername",
    width: 150,
    searchable: true,
  },
  {
    title: "تاریخ آخرین تغییر",
    dataIndex: "modifiedDate",
    key: "modifiedDate",
    width: 150,
    render: (value: string) => {
      return dataPlaceHolder({ data: value, isDate: true });
    },
  },
  {
    title: "توضیحات",
    dataIndex: "description",
    key: "description",
    width: 150,
    render: (value: string) => {
      return <CustomTooltip title={value}>{LimitText(value, 15)}</CustomTooltip>;
    },
  },
  ...(from === 4 || from === 5
    ? [
        {
          title: "تاریخ پرداخت",
          dataIndex: "paymentDate",
          key: "paymentDate",
          width: 150,
          render: (paymentDate: string) => {
            return moment(paymentDate ?? new Date())
              .locale("fa")
              .format("(HH:mm) YYYY/M/D");
          },
          sorter: (
            a: ActiveDormReportRequestsTableData,
            b: ActiveDormReportRequestsTableData
          ) => {
            return (
              moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
                moment(a.paymentDate ?? new Date()),
                "seconds"
              ) -
              moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
                moment(b.paymentDate ?? new Date()),
                "seconds"
              )
            );
          },
        },
      ]
    : []),
  ...(from === 4 || from === 5
    ? [
        {
          title: "شماره مرجع",
          dataIndex: "refrenceNo",
          key: "refrenceNo",
          width: 150,
        },
      ]
    : []),
  ...(from === 4 || from === 5
    ? [
        {
          title: "شماره پیگیری",
          dataIndex: "trackNo",
          key: "trackNo",
          width: 150,
        },
      ]
    : []),
  ...(from === 4 || from === 5
    ? [
        {
          title: "نحوه پرداخت ",
          dataIndex: "manualPayment",
          key: "manualPayment",
          width: 150,
        },
      ]
    : []),
  ...(from === 4 || from === 5
    ? [
        {
          title: "نوع پرداخت",
          dataIndex: "payemntType",
          key: "payemntType",
          width: 150,
          render: (value: number) => {
            if (value?.toString() === "0") {
              return <CustomTag color="green">دانشجویار</CustomTag>;
            }
            if (value?.toString() === "1") {
              return <CustomTag color="cyan">آموزشیار</CustomTag>;
            }
            if (value?.toString() === "2") {
              return <CustomTag color="blue">پوز</CustomTag>;
            }
            if (value?.toString() === "3") {
              return <CustomTag color="gold">واریز به حساب</CustomTag>;
            }

            return value;
          },
        },
      ]
    : []),
  {
    title: "انتظار",
    dataIndex: "remainingDate",
    key: "remainingDate",
    width: 100,
    render: (_: string, record: ActiveDormReportRequestsTableData) => {
      const diffTime = moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
        moment(record?.requestdate ?? new Date()),
        "days"
      );

      const colorGenerator =
        +diffTime < 3 ? "green" : +diffTime > 2 && +diffTime < 5 ? "yellow" : "red";
      return (
        <div className="waiting-time-container">
          <span className={`waiting-time ${colorGenerator}`}>{diffTime}</span>
          <span>روز</span>
        </div>
      );
    },
    sorter: (
      a: ActiveDormReportRequestsTableData,
      b: ActiveDormReportRequestsTableData
    ) => {
      return (
        moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
          moment(a.requestdate ?? new Date()),
          "seconds"
        ) -
        moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
          moment(b.requestdate ?? new Date()),
          "seconds"
        )
      );
    },
  },
];
