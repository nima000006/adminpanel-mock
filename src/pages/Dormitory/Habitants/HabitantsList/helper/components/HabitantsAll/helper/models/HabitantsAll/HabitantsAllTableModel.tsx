import { Link } from "react-router";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  HABITANTS_STATUS_COLOR,
  HABITANTS_STATUS_TEXT,
} from "@pages/Dormitory/Habitants/HabitantsList/helper/utils";

const HabitantsAllTableModel = () => {
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
      title: "شماره تماس",
      dataIndex: "mobile",
      key: "mobile",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "mobile",
        label: "شماره تماس",
        type: "text",
      }),
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (value: number | string) => (
        <CustomTag color={HABITANTS_STATUS_COLOR[value]}>
          {HABITANTS_STATUS_TEXT[value]}
        </CustomTag>
      ),
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
      title: "تاریخ شروع اسکان",
      dataIndex: "startDate",
      key: "startDate",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "startDate",
        label: "تاریخ شروع اسکان",
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
      title: "تاریخ پایان اسکان",
      dataIndex: "endDate",
      key: "endDate",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "endDate",
        label: "تاریخ پایان اسکان",
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
            pathname: "",
            search: makeSearchParams({
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

export default HabitantsAllTableModel;
