import { Key } from "react";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import useAdminBranchCode from "@infra/hooks/useAdminBranchCode";

import CustomTag from "../../../../../components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "../../../../helpers/utils";
import {
  FixedType,
  GeneralTableModelTypeWithSearch,
} from "../../../modules/GeneralTypes/GeneralTypes";

import "./_factorTableMode.scss";

export type RoomFactorRow = {
  id: number;
  paymentdate: string;
  ispay: boolean;
  username: string;
  roomid: number;
  roomName: string;
  floorId: number;
  floorName: string;
  buildngId: string;
  buildingName: string;
  dormitoryId: number;
  dormitoryName: string;
  status: boolean;
  requestStatus: number;
  amount: number;
  term: number;
  createdDate: string;
  modifiedDate: string;
  policyid: number;
  requstid: number;
  todate: string;
  isValid: boolean;
  studentNumber: string;
  name: string;
  family: string;
};

const FactorListColumn = ({
  onUpdateFactorClickHandler,
  onDisableFactorClickHandler,
  onCancelFactorClickHandler,
}: GeneralTableModelTypeWithSearch & {
  onUpdateFactorClickHandler: (row: RoomFactorRow) => void;
  onDisableFactorClickHandler: (row: RoomFactorRow) => void;
  onCancelFactorClickHandler: (row: RoomFactorRow) => void;
}) => {
  const [isAdminBranchCode] = useAdminBranchCode();
  return [
    {
      title: "نام",
      dataIndex: "name",
      key: "name",
      width: 180,
      searchable: true,
    },
    {
      title: "نام خانوادگی",
      dataIndex: "family",
      key: "family",
      width: 220,
      searchable: true,
    },
    {
      title: "کد ملی / اتباع",
      dataIndex: "username",
      key: "username",
      width: 150,
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
      title: "ساختمان",
      dataIndex: "buildingName",
      key: "buildingName",
      width: 200,
      searchable: true,
    },
    {
      title: "طبقه",
      dataIndex: "floorName",
      key: "floorName",
      width: 200,
      searchable: true,
    },
    {
      title: "اتاق",
      dataIndex: "roomName",
      key: "roomName",
      width: 200,
      searchable: true,
    },
    {
      title: "مبلغ (ریال)",
      dataIndex: "amount",
      key: "amount",
      width: 150,
      searchable: true,
      render: (value: number) => {
        return dataPlaceHolder({ data: value?.toString(), isPrice: true });
      },
    },
    {
      title: "تاریخ ایجاد فاکتور",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 150,
      render: (value: string) => {
        return dataPlaceHolder({
          data: value,
          isDate: true,
        });
      },
    },
    // {
    //   title: "تاریخ پرداخت",
    //   dataIndex: "paymentdate",
    //   key: "paymentdate",
    //   width: 100,
    //   render: (value: string) => {
    //     return dataPlaceHolder({
    //       data: value,
    //       isDate: true,
    //     });
    //   },
    // },
    // {
    //   title: "وضعیت پرداخت",
    //   dataIndex: "ispay",
    //   key: "ispay",
    //   width: 150,
    //   render: (value: boolean) => {
    //     return value ? "پرداخت شده" : "در انتظار پرداخت";
    //   },
    //   filters: [
    //     {
    //       text: "پرداخت شده",
    //       value: false,
    //     },
    //     {
    //       text: "در انتظار پرداخت",
    //       value: true,
    //     },
    //   ],
    //   onFilter: (value: boolean | Key, record: DormFactorList) => {
    //     return record.ispay === value;
    //   },
    //   filterSearch: true,
    // },
    {
      title: "نیمسال",
      dataIndex: "term",
      key: "term",
      width: 150,
      render: (value: number) => {
        if (value?.toString() === "0") {
          return (
            <CustomTag color="orange" staticWidth={120}>
              نیمسال دوم 1402
            </CustomTag>
          );
        }
        if (value?.toString() === "1") {
          return (
            <CustomTag color="blue" staticWidth={120}>
              تابستان 1403
            </CustomTag>
          );
        }
        if (value?.toString() === "2") {
          return (
            <CustomTag color="green-inverse" staticWidth={120}>
              نیمسال اول 1403
            </CustomTag>
          );
        }
        if (value?.toString() === "3") {
          return (
            <CustomTag color="cyan-inverse" staticWidth={120}>
              نیمسال دوم 1403
            </CustomTag>
          );
        }
        if (value?.toString() === "4") {
          return (
            <CustomTag color="yellow" staticWidth={120}>
              ترم تابستان 1404
            </CustomTag>
          );
        }
        if (value?.toString() === "5") {
          return (
            <CustomTag color="cyan" staticWidth={120}>
              نیمسال اول 1404
            </CustomTag>
          );
        }
        if (value?.toString() === "6") {
          return (
            <CustomTag color="cyan-inverse" staticWidth={120}>
              نیمسال دوم 1404
            </CustomTag>
          );
        }
        if (value?.toString() === "7") {
          return (
            <CustomTag color="gold-inverse" staticWidth={120}>
              ترم تابستان 1405
            </CustomTag>
          );
        }
        if (value?.toString() === "8") {
          return (
            <CustomTag color="geekblue" staticWidth={120}>
              نیمسال اول 1405
            </CustomTag>
          );
        }
        return (
          <CustomTag color="error" staticWidth={120}>
            ترم نامشخص
          </CustomTag>
        );
      },
      filters: [
        {
          text: "نیمسال اول 1402",
          value: 0,
        },
        {
          text: "ترم تابستان 1403",
          value: 1,
        },
        {
          text: "نیمسال اول 1403",
          value: 2,
        },
        {
          text: "نیمسال دوم 1403",
          value: 3,
        },
        {
          text: "ترم تابستان 1404",
          value: 4,
        },
        {
          text: "نیمسال اول 1404",
          value: 5,
        },
        {
          text: "نیمسال دوم 1404",
          value: 6,
        },
        {
          text: "ترم تابستان 1405",
          value: 7,
        },
        {
          text: "نیمسال اول 1405",
          value: 8,
        },
      ],
      onFilter: (value: any, record: RoomFactorRow) => {
        return record?.term === value;
      },
      filterSearch: true,
    },
    {
      title: "وضعیت درخواست",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (value: boolean) => {
        return value ? (
          <CustomTag color="success" staticWidth={120}>
            پرداخت شده
          </CustomTag>
        ) : (
          <CustomTag color="red" staticWidth={120}>
            پرداخت نشده
          </CustomTag>
        );
      },
      filters: [
        {
          text: "پرداخت شده",
          value: true,
        },
        {
          text: "پرداخت نشده",
          value: false,
        },
      ],
      onFilter: (value: boolean | Key, record: RoomFactorRow) => {
        return record?.status === value;
      },
      filterSearch: true,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 300,
      render: (_: string, records: RoomFactorRow) => {
        return (
          <div className="dorm-factor-table-btns-container">
            <CustomButton
              type="link"
              size="small"
              onClick={() => onUpdateFactorClickHandler(records)}
              className="dorm-edit-btn"
              disabled={records?.status}
            >
              به‌روزرسانی فاکتور
            </CustomButton>
            {isAdminBranchCode && (
              <CustomButton
                type="link"
                size="small"
                onClick={() => onDisableFactorClickHandler(records)}
                className="dorm-edit-btn"
                disabled={records?.status}
              >
                غیرفعال سازی
              </CustomButton>
            )}
            <CustomButton
              type="link"
              size="small"
              onClick={() => onCancelFactorClickHandler(records)}
              className="dorm-edit-btn"
              // "نیمسال دوم 1404"
              disabled={records?.term !== 6 || records?.status === true} //  به دلیل جنگ چون خوابگاه کنسل شد، این فیچر فقط برای این ترم در نظر گرفته می شود
            >
              ابطال فاکتور
            </CustomButton>
          </div>
        );
      },
    },
  ];
};

export default FactorListColumn;
