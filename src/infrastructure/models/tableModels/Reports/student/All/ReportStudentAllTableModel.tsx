import { Key } from "react";

import moment from "jalali-moment";

import DeliveryHandIcon from "../../../../../../assets/icons/DeliveryHandIcon";
import PostMotorIcon from "../../../../../../assets/icons/PostMotorIcon";
import { StudentCardProps } from "../../../../general.model";
import {
  FixedType,
  GeneralTableModelTypeWithSearch,
} from "../../../../modules/GeneralTypes/GeneralTypes";

const ReportStudentAllTableModel = ({
  onStatusHistoryClickHandler,
}: GeneralTableModelTypeWithSearch & {
  onStatusHistoryClickHandler: (key: number) => void;
}) => [
  {
    title: "نام",
    dataIndex: "firstName",
    key: "firstName",
    width: 100,
    searchable: true,
  },
  {
    title: "نام خانوادگی",
    dataIndex: "lastName",
    key: "lastName",
    width: 140,
    searchable: true,
  },
  {
    title: "کد ملی / اتباع",
    dataIndex: "nationalNumber",
    key: "nationalNumber",
    width: 140,
    searchable: true,
  },
  {
    title: "شماره دانشجویی",
    dataIndex: "studentNumber",
    key: "studentNumber",
    width: 150,
    searchable: true,
  },
  {
    title: "نوع درخواست",
    dataIndex: "requestType",
    key: "requestType",
    width: 150,
    render: (requestType: number) => {
      return requestType === 0 ? (
        <div className="request-type-container">
          <span className="d-flex">
            <DeliveryHandIcon />
          </span>
          <span className="d-flex">حضوری</span>
        </div>
      ) : (
        <div className="request-type-container">
          <span className="d-flex">
            <PostMotorIcon />
          </span>
          <span className="d-flex">ارسال پستی</span>
        </div>
      );
    },
    filters: [
      {
        text: "حضوری",
        value: 0,
      },
      {
        text: "پستی",
        value: 1,
      },
    ],
    onFilter: (value: boolean | Key, record: StudentCardProps) => {
      return record.requestType === value;
    },
    filterSearch: true,
  },
  {
    title: "وضعیت",
    dataIndex: "status",
    key: "status",
    width: 100,
    searchable: true,
  },
  {
    title: "تاریخ درخواست",
    dataIndex: "requestDate",
    key: "requestDate",
    width: 150,
    render: (requestDate: string) => {
      return moment(requestDate ?? new Date())
        .locale("fa")
        .format("YYYY/M/D");
    },
  },
  {
    title: "ملیت",
    dataIndex: "nationality",
    key: "nationality",
    width: 100,
    searchable: true,
  },
  {
    title: "انتظار",
    dataIndex: "waitingTime",
    key: "waitingTime",
    width: 100,
    render: (_: string, record: StudentCardProps) => {
      const diffTime = moment(new Date(), "YYYY/M/D").diff(
        moment(record?.requestDate ?? new Date()),
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
    sorter: (a: StudentCardProps, b: StudentCardProps) => {
      return (
        moment(new Date(), "YYYY/M/D").diff(moment(a.requestDate ?? new Date()), "days") -
        moment(new Date(), "YYYY/M/D").diff(moment(b.requestDate ?? new Date()), "days")
      );
    },
  },
  {
    title: "",
    dataIndex: "key",
    key: "key",
    className: "tables-sticky-column-left",
    fixed: "right" as FixedType | undefined,
    width: 100,
    render: (key: number) => {
      return (
        <div className="checkout-container">
          <div
            onClick={() => {
              onStatusHistoryClickHandler(key);
            }}
            className="checkout-modal-container"
          >
            تاریخچه
          </div>
        </div>
      );
    },
  },
];

export default ReportStudentAllTableModel;
