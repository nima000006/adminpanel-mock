import { Link } from "react-router";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { DORMITORY_USER_REQUESTS_RESERVATION_COMPLETED_REQUESTS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import {
  DORMITORY_RESERVATION_BASE_ICON,
  DORMITORY_SCHEDULE_TYPE_COLOR,
  DORMITORY_SCHEDULE_TYPE_TEXT,
  ReservationCompletedRequestsStatus,
} from "@pages/Dormitory/_shared/utils";

const ReservationCompletedRequestsRejectedTableModel = () => {
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
      ...GetServerColumnSearchProps({
        dataIndex: "firstName",
        label: "نام ",
        type: "text",
      }),
    },
    {
      title: "نام خانوادگی",
      dataIndex: "lastName",
      key: "lastName",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "lastName",
        label: "نام خانوادگی",
        type: "text",
      }),
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
      title: "اقامتگاه درخواستی",
      dataIndex: "residenceName",
      key: "residenceName",
      width: 130,
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
      title: "تاریخ ایجاد",
      dataIndex: "lastModifiedDate",
      key: "lastModifiedDate",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "lastModifiedDate",
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
              DORMITORY_USER_REQUESTS_RESERVATION_COMPLETED_REQUESTS_DETAIL_PAGE_ROUTE,
            search: makeSearchParams({
              status: ReservationCompletedRequestsStatus?.rejected,
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

export default ReservationCompletedRequestsRejectedTableModel;
