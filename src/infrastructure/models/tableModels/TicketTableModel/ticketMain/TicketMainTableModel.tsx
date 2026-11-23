import { Key } from "react";

import moment from "jalali-moment";

import SuperAppIcon from "../../../../../assets/icons/SuperAppIcon";
import UniFood from "../../../../../assets/icons/UniFood";
import UniRoom from "../../../../../assets/icons/UniRoomIcon";
import { TicketsListType } from "../../../../../pages/Tickets/Main/@types/@ticketsMain";
import {
  FixedType,
  GeneralTableModelTypeWithSearch,
} from "../../../modules/GeneralTypes/GeneralTypes";

export const TicketMainModel = ({
  viewClickHandler,
}: GeneralTableModelTypeWithSearch & {
  viewClickHandler: (id: number) => void;
}) => [
  {
    title: "نام",
    dataIndex: "firstName",
    key: "firstName",
    width: 120,
    searchable: true,
  },
  {
    title: "نام خانوادگی",
    dataIndex: "lastName",
    key: "lastName",
    width: 130,
    searchable: true,
  },
  {
    title: "کد ملی / اتباع",
    dataIndex: "nationalCode",
    key: "nationalCode",
    width: 150,
    searchable: true,
  },
  {
    title: "شماره تیکت",
    dataIndex: "id",
    key: "id",
    width: 120,
    searchable: true,
  },
  {
    title: "شماره موبایل",
    dataIndex: "mobile",
    key: "mobile",
    width: 120,
    searchable: true,
  },
  {
    title: "کد واحد",
    dataIndex: "branchCode",
    key: "branchCode",
    width: 100,
    searchable: true,
  },
  {
    title: "عنوان",
    dataIndex: "title",
    key: "title",
    width: 200,
    searchable: true,
  },
  {
    title: "محصول",
    dataIndex: "servicename",
    key: "servicename",
    width: 100,

    render: (value: string) => {
      return (
        <div className="product-wrapper">
          {value === "سلف" ? (
            <span>
              <UniFood />
              سلف
            </span>
          ) : value === "روم" ? (
            <span>
              <UniRoom />
              خوابگاه
            </span>
          ) : value === "سوپر اپ" ? (
            <span>
              <SuperAppIcon /> سوپر اپ
            </span>
          ) : null}
        </div>
      );
    },
    filters: [
      {
        text: "سلف",
        value: "سلف",
      },
      {
        text: "خوابگاه",
        value: "روم",
      },
    ],
    onFilter: (value: boolean | Key, record: TicketsListType) => {
      return record?.servicename === value;
    },
    filterSearch: true,
  },
  {
    title: "نوع",
    dataIndex: "typeOfProblem",
    key: "typeOfProblem",
    width: 100,
  },
  {
    title: "شماره دانشجویی",
    dataIndex: "studentnumber",
    key: "studentnumber",
    width: 150,
    searchable: true,
  },
  {
    title: "تاریخ ثبت",
    dataIndex: "createdate",
    key: "createdate",
    width: 150,
    searchable: true,
    render: (value: string) => {
      return moment(value ?? new Date())
        .locale("fa")
        .format("(HH:mm) YYYY/M/D");
    },
  },
  {
    title: "انتظار",
    dataIndex: "createdate",
    key: "createdate",
    width: 100,
    render: (value: string) => {
      const diffTime = moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
        moment(value ?? new Date()),
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
    sorter: (a: TicketsListType, b: TicketsListType) => {
      return (
        moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
          moment(a.createdate ?? new Date()),
          "seconds"
        ) -
        moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
          moment(b.createdate ?? new Date()),
          "seconds"
        )
      );
    },
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",
    width: 75,
    fixed: "right" as FixedType,
    className: "tables-sticky-column-left",
    render: (value: number) => {
      return (
        <div className="view-text-ticket-main" onClick={() => viewClickHandler(value)}>
          مشاهده
        </div>
      );
    },
  },
];
