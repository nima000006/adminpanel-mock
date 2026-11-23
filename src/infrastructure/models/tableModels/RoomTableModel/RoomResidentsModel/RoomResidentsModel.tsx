import { Button } from "antd";
import moment from "jalali-moment";

import { ListOfDormResidents } from "../../../../../pages/Reports/dorms/DormsRequests/DormReportRequests/AllDormReportRequests/@types/@allDormReportRequests";
import { PriceSeparatorWithExtraNumbers } from "../../../../helpers/utils";
import {
  FixedType,
  GeneralTableModelTypeWithSearch,
} from "../../../modules/GeneralTypes/GeneralTypes";
import "./_roomResidentsModel.scss";

const RoomResidentsModel = ({
  transferClickHandler,
}: GeneralTableModelTypeWithSearch & {
  transferClickHandler: (id: string, record: Partial<ListOfDormResidents>) => void;
}) => [
  {
    title: "نام",
    dataIndex: "name",
    key: "name",
    width: 200,
    searchable: true,
  },
  {
    title: "نام خانوادگی",
    dataIndex: "family",
    key: "family",
    width: 250,
    searchable: true,
  },
  {
    title: "نوع",
    dataIndex: "typerezerve",
    key: "typerezerve",
    width: 100,
  },
  {
    title: "شروع اسکان",
    dataIndex: "startdate",
    key: "startdate",
    width: 130,

    render: (startdate: string) => {
      const date = moment(startdate);
      return date.isValid() ? date.locale("fa").format("YYYY/M/D") : "-";
    },
  },
  {
    title: "پایان اسکان",
    dataIndex: "enddate",
    key: "enddate",
    width: 130,
    render: (enddate: string) => {
      const date = moment(enddate);
      return date.isValid() ? date.locale("fa").format("YYYY/M/D") : "-";
    },
  },
  {
    title: "شماره دانشجویی",
    dataIndex: "studentnumber",
    key: "studentnumber",
    width: 150,
    searchable: true,
  },
  {
    title: "کد ملی / کد اتباع",
    dataIndex: "nationalnumber",
    key: "nationalnumber",
    width: 160,
    searchable: true,
  },
  {
    title: "شماره موبایل",
    dataIndex: "mobile",
    key: "mobile",
    width: 160,
    searchable: true,
  },
  {
    title: "اتاق",
    dataIndex: "roomname",
    key: "roomname",
    width: 100,
    searchable: true,
  },
  {
    title: "خوابگاه",
    dataIndex: "dormitoryname",
    key: "dormitoryname",
    width: 360,
    searchable: true,
  },
  {
    title: "وضعیت ویژه",
    dataIndex: "emergencysatatus",
    key: "emergencysatatus",
    width: 120,
    searchable: true,
  },
  {
    title: "ساختمان",
    dataIndex: "buildingname",
    key: "buildingname",
    width: 210,
    searchable: true,
  },
  {
    title: "طبقه",
    dataIndex: "floorname",
    key: "floorname",
    width: 210,
    searchable: true,
  },
  // {
  //   title: "وضعیت مالی",
  //   dataIndex: "paymentstat",
  //   key: "paymentstat",
  //   width: 120,
  //   ...GetColumnSearchProps({
  //     dataIndex: "paymentstat",
  //     searchInput,
  //     searchedColumn,
  //     setSearchedColumn,
  //     searchText,
  //     setSearchText,
  //   }),
  // },
  {
    title: "مبلغ کل",
    dataIndex: "amount",
    key: "amount",
    width: 140,
    render: (value: string) => {
      return PriceSeparatorWithExtraNumbers(value);
    },
  },
  {
    title: "مبلغ پرداخت شده",
    dataIndex: "totalPayment",
    key: "totalPayment",
    width: 140,
    searchable: true,
    render: (value?: string) => {
      if (value) {
        return PriceSeparatorWithExtraNumbers(value?.toString());
      }
    },
  },
  {
    title: "مبلغ بدهی",
    dataIndex: "totalUnPayment",
    key: "totalUnPayment",
    width: 140,
    searchable: true,
    render: (value?: string) => {
      if (value) {
        return PriceSeparatorWithExtraNumbers(value?.toString());
      }
    },
  },
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
  // {
  //   title: "مجاز",
  //   dataIndex: "prmission",
  //   key: "prmission",
  //   width: 100,
  //   render: (value: boolean) => {
  //     //_: string, records: any
  //     return <Switch defaultChecked={value} />;
  //   },
  // },
  {
    title: "",
    dataIndex: "dormitoryId",
    key: "dormitoryId",
    className: "tables-sticky-column-left",
    fixed: "right" as FixedType,
    width: 100, //150
    render: (key: string, record: ListOfDormResidents) => {
      return (
        <div className="room-residents-action-btns-container">
          {/* <Button
            type="default"
            size="small"
            // onClick={() => roomClickHandler(records?.id)}
            className="dorm-action-btn"
          >
            مشاهده
          </Button> */}
          <Button
            type="primary"
            size="small"
            onClick={() => transferClickHandler(key, record)}
            className="dorm-action-btn"
            // Todo[saman]: jamaati said to disable this 15:55 10 / 6 / 1403 because of some bug in back
            // disabled={true}
          >
            جابجایی
          </Button>
        </div>
      );
    },
  },
];

export default RoomResidentsModel;
