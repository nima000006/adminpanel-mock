import { Key } from "react";

import { Button } from "antd";
import moment from "jalali-moment";

import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";
import { ListOfDormResidents } from "@pages/Reports/dorms/DormsRequests/DormReportRequests/AllDormReportRequests/@types/@allDormReportRequests";

import CustomTag from "../../../../../components/Renderers/CustomTag/CustomTag";
import {
  ACTIVE_REQUESTS,
  CONFIRMED_REQUESTS,
  DELIVERED_REQUESTS,
  MOVING_REQUESTS,
  PENDING_REQUESTS,
  TRANSFER_REQUESTS,
} from "../../../../../pages/Room/Requests/RequestTypes";
import { dataPlaceHolder, LimitText } from "../../../../helpers/utils";
import {
  FixedType,
  GeneralTableModelTypeWithSearch,
} from "../../../modules/GeneralTypes/GeneralTypes";

export type ActiveDormRequests = {
  id: number;
  key: number;
  name: string;
  family: string;
  jender: string;
  nationalcode: string;
  mobile: string;
  dormitoryname: string;
  dormitorytype: string;
  dormitoryid: number;
  requesttype: string;
  score: string;
  requestdate: string;
  studntNumber: string;
  status: number;
  branchCode: string;
  manual: string;
  refrenceNo: number;
  trackNo: number;
  adminUsername: null;
  modifiedDate: null;
  paymentDate: null;
  manualPayment: string;
  payemntType: number;
  description: string;
};

const DormActiveRequests = ({
  onRoomAssignClickHandler,
  onRoomCancelClickHandler,
  onRoomDeliveredHandler,
  onTransferListClickHandler,
  onMovingListClickHandler,
  onPendingChangeToPaidClickHandler,
  onRevertDeliveredClickHandler,
  from,
}: GeneralTableModelTypeWithSearch & {
  from?: number;
  onRoomAssignClickHandler?: ({
    dormId,
    id,
    data,
  }: {
    dormId: number;
    id: number;
    data: ListOfDormResidents;
  }) => void;
  onRoomCancelClickHandler?: (key: number) => void;
  onRoomDeliveredHandler?: (id: number) => void;
  onTransferListClickHandler?: (id: number) => void;
  onMovingListClickHandler?: (id: number) => void;
  onPendingChangeToPaidClickHandler?: (info: ListOfDormResidents) => void;
  onRevertDeliveredClickHandler?: (id: number) => void;
}) => [
  {
    title: "نام",
    dataIndex: "name",
    key: "name",
    width: 150,
    searchable: true,
  },
  {
    title: "نام خانوادگی",
    dataIndex: "family",
    key: "family",
    width: 240,
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
    onFilter: (value: boolean | Key, record: ListOfDormResidents) => {
      return record?.jender === value;
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
    width: 300,
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
    title: "وضعیت درخواست",
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
    sorter: (a: ListOfDormResidents, b: ListOfDormResidents) => {
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
    title: "نوع درخواست",
    dataIndex: "manual",
    key: "manual",
    width: 220,
    searchable: true,
  },
  // {
  //   title: "امتیاز",
  //   dataIndex: "score",
  //   key: "score",
  //   width: 100,
  // },
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
          sorter: (a: ListOfDormResidents, b: ListOfDormResidents) => {
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
          searchable: true,
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
            if (value?.toString() === "4") {
              return <CustomTag color="orange">پیمانکاری</CustomTag>;
            }

            return value;
          },
          filters: [
            {
              text: "دانشجویار",
              value: 0,
            },
            {
              text: "آموزشیار",
              value: 1,
            },
            {
              text: "پوز",
              value: 2,
            },
            {
              text: "واریز به حساب",
              value: 3,
            },
          ],
          onFilter: (value: boolean | Key, record: ListOfDormResidents) => {
            return record?.payemntType === value;
          },
          filterSearch: true,
        },
      ]
    : []),
  {
    title: "نام رشته",
    dataIndex: "fieldName",
    key: "fieldName",
    width: 140,
    searchable: true,
  },
  {
    title: "نام مقطع",
    dataIndex: "levelName",
    key: "levelName",
    width: 140,
    searchable: true,
  },
  {
    title: "انتظار",
    dataIndex: "remainingDate",
    key: "remainingDate",
    width: 100,
    render: (_: string, record: ListOfDormResidents) => {
      const diffTime = moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
        moment(record?.requestdate ?? new Date()),
        "days"
      );

      return (
        <div className="waiting-time-container">
          {/* <span className={`waiting-time ${colorGenerator}`}>{diffTime}</span> */}
          <CustomTag
            color={
              +diffTime < 3
                ? "green-inverse"
                : +diffTime > 2 && +diffTime < 5
                  ? "gold-inverse"
                  : "red-inverse"
            }
            staticWidth={30}
          >
            {diffTime}
          </CustomTag>
          <span>روز</span>
        </div>
      );
    },
    sorter: (a: ListOfDormResidents, b: ListOfDormResidents) => {
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

  ...(from === ACTIVE_REQUESTS ||
  from === PENDING_REQUESTS ||
  from === CONFIRMED_REQUESTS ||
  from === MOVING_REQUESTS ||
  from === TRANSFER_REQUESTS ||
  from === DELIVERED_REQUESTS
    ? [
        {
          title: "",
          dataIndex: "key",
          key: "key",
          width: 188,
          fixed: "right" as FixedType,
          className: `${
            from === ACTIVE_REQUESTS ||
            from === PENDING_REQUESTS ||
            from === CONFIRMED_REQUESTS ||
            from === MOVING_REQUESTS ||
            from === TRANSFER_REQUESTS ||
            from === DELIVERED_REQUESTS
              ? "tables-sticky-column-left"
              : ""
          } `,
          render: (_: string, records: any) => {
            if (from === ACTIVE_REQUESTS) {
              return (
                <div className="room-request-action-btns-container">
                  <Button
                    type="primary"
                    size="small"
                    onClick={() =>
                      onRoomAssignClickHandler?.({
                        dormId: records?.dormitoryid,
                        id: records?.id,
                        data: records,
                      })
                    }
                  >
                    تخصیص
                  </Button>
                  <Button
                    type="link"
                    danger
                    size="small"
                    onClick={() => onRoomCancelClickHandler?.(records?.key)}
                  >
                    رد درخواست
                  </Button>
                </div>
              );
            }
            if (from === PENDING_REQUESTS) {
              return (
                <div className="room-request-action-btns-container">
                  <Button
                    type="link"
                    size="small"
                    onClick={() => onPendingChangeToPaidClickHandler?.(records)}
                  >
                    پرداخت شده
                  </Button>
                  <Button
                    type="link"
                    danger
                    size="small"
                    onClick={() => onRoomCancelClickHandler?.(records?.key)}
                  >
                    رد درخواست
                  </Button>
                </div>
              );
            }
            if (from === CONFIRMED_REQUESTS) {
              return (
                <div className="room-request-action-btns-container">
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => onRoomDeliveredHandler?.(records?.id)}
                  >
                    تحویل
                  </Button>
                </div>
              );
            }
            if (from === MOVING_REQUESTS) {
              return (
                <div>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => onMovingListClickHandler?.(records?.id)}
                    ghost
                  >
                    مشاهده درخواست
                  </Button>
                </div>
              );
            }
            if (from === TRANSFER_REQUESTS) {
              return (
                <div>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => onTransferListClickHandler?.(records?.id)}
                    ghost
                  >
                    مشاهده درخواست
                  </Button>
                </div>
              );
            }
            if (from === DELIVERED_REQUESTS) {
              return (
                <div className="revert-delivered-btn">
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => onRevertDeliveredClickHandler?.(records?.id)}
                    ghost
                  >
                    بازگردانی
                  </Button>
                </div>
              );
            }
          },
        },
      ]
    : []),
];

export default DormActiveRequests;
