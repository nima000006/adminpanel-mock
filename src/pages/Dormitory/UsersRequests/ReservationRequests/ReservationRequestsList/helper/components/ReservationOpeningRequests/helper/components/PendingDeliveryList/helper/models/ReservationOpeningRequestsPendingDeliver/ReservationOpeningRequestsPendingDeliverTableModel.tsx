import { Link } from "react-router";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { DORMITORY_USER_REQUESTS_RESERVATION_OPENING_REQUESTS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import {
  DORMITORY_RESERVATION_BASE_ICON,
  DORMITORY_RESERVE_TYPE_COLOR,
  DORMITORY_RESERVE_TYPE_ICON,
  DORMITORY_SCHEDULE_TYPE_COLOR,
  DORMITORY_SCHEDULE_TYPE_TEXT,
  ReservationOpeningRequestsStatus,
} from "@pages/Dormitory/_shared/utils";

const ReservationOpeningRequestsPendingDeliverTableModel = () => {
  return [
    {
      title: "شماره درخواست",
      dataIndex: "requestNumber",
      key: "requestNumber",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "requestNumber",
        label: "شماره درخواست",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "نام ",
      dataIndex: "firstName",
      key: "firstName",
      width: 130,
    },
    {
      title: "نام خانوادگی",
      dataIndex: "lastName",
      key: "lastName",
      width: 130,
    },
    {
      title: "کدملی/فراگیر",
      dataIndex: "username",
      key: "username",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "username",
        label: "کدملی/فراگیر",
        type: "text",
      }),
    },
    {
      title: "شعبه / واحد",
      dataIndex: "branch",
      key: "branch",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "branch",
        label: "شعبه / واحد",
        type: "text",
      }),
    },
    {
      title: "شماره تماس",
      dataIndex: "mobile",
      key: "mobile",
      width: 130,
    },
    {
      title: "در انتظار پرداخت",
      dataIndex: "pendingPayment",
      key: "pendingPayment",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "pendingPayment",
        label: "در انتظار پرداخت",
        type: "sort",
      }),
      render: (value: number) => (
        <div className="flex justify-center">
          <CustomTag color="#FA8C16" className="min-h-5 w-fit min-w-5">
            {value}
          </CustomTag>
        </div>
      ),
    },
    {
      title: "پرداخت شده",
      dataIndex: "paid",
      key: "paid",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "paid",
        label: "پرداخت شده",
        type: "sort",
      }),
      render: (value: number) => (
        <div className="flex justify-center">
          <CustomTag color="#52C41A" className="min-h-5 w-fit min-w-5">
            {value}
          </CustomTag>
        </div>
      ),
    },
    {
      title: "سر رسید",
      dataIndex: "paymentDueDate",
      key: "paymentDueDate",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "paymentDueDate",
        label: "سر رسید",
        type: "sort",
      }),
      render: (value: number) => (
        <div className="flex justify-center">
          <CustomTag color="#F5222D" className="min-h-5 w-fit min-w-5">
            {value}
          </CustomTag>
        </div>
      ),
    },
    {
      title: "اقامتگاه",
      dataIndex: "residenceName",
      key: "residenceName",
      width: 130,
    },
    {
      title: "اسکان تخصیص یافته",
      dataIndex: "assigendAccommodation",
      key: "assigendAccommodation",
      width: 150,
    },
    {
      title: "برنامه پذیرش",
      dataIndex: "admission",
      key: "admission",
      width: 130,
      render: (value: string) => (
        <Link
          to={{
            pathname: "",
            search: makeSearchParams({
              id: value,
            }),
          }}
          className="text-link"
        >
          {value}
        </Link>
      ),
    },
    {
      title: "نوع زمان بندی",
      dataIndex: "scheduleType",
      key: "scheduleType",
      width: 130,
      render: (value: number) => (
        <CustomTag color={DORMITORY_SCHEDULE_TYPE_COLOR[value]}>
          {DORMITORY_SCHEDULE_TYPE_TEXT[value]}
        </CustomTag>
      ),
    },
    {
      title: "مبنای رزرو",
      dataIndex: "reserveBase",
      key: "reserveBase",
      width: 130,
      render: (value: number) => (
        <div className="flex items-center gap-2">
          {DORMITORY_RESERVATION_BASE_ICON[value]}
        </div>
      ),
    },
    {
      title: "نوع رزرو",
      dataIndex: "reserveType",
      key: "reserveType",
      width: 130,
      render: (value: { id: number; title: string }) => (
        <CustomTag
          color={DORMITORY_RESERVE_TYPE_COLOR[value?.id]}
          className="flex w-fit items-center gap-1"
        >
          <span>{DORMITORY_RESERVE_TYPE_ICON[value?.id]}</span>
          <span>{value?.title}</span>
        </CustomTag>
      ),
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "createDate",
      key: "createDate",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "createDate",
        label: "تاریخ ایجاد",
        type: "sort",
      }),
      render: (value: string) => {
        return (
          <>
            {dataPlaceHolder({
              data: value,
              isDate: true,
              customDateFormat: "HH:mm, YYYY/MM/DD ",
            })}
          </>
        );
      },
    },
    {
      title: "آخرین اقدام کننده",
      dataIndex: "lastModifier",
      key: "lastModifier",
      width: 150,
    },
    {
      title: "تاریخ آخرین اقدام",
      dataIndex: "lastModifiedDate",
      key: "lastModifiedDate",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "lastModifiedDate",
        label: "تاریخ آخرین اقدام",
        type: "sort",
      }),
      render: (value: string) => {
        return (
          <>
            {dataPlaceHolder({
              data: value,
              isDate: true,
              customDateFormat: "HH:mm, YYYY/MM/DD ",
            })}
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 75,
      render: (value: number) => (
        <Link
          to={{
            pathname:
              DORMITORY_USER_REQUESTS_RESERVATION_OPENING_REQUESTS_DETAIL_PAGE_ROUTE,
            search: makeSearchParams({
              status: ReservationOpeningRequestsStatus?.pendingDelivery,
              id: value,
            }),
          }}
          className="text-link"
        >
          مشاهده
        </Link>
      ),
    },
  ];
};

export default ReservationOpeningRequestsPendingDeliverTableModel;
