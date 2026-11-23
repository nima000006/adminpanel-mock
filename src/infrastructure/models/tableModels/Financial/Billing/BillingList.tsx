import moment from "jalali-moment";

import UniConsulting from "../../../../../assets/icons/UniConsulting";
import UniFood from "../../../../../assets/icons/UniFood";
import UniGame from "../../../../../assets/icons/UniGame";
import UniRoom from "../../../../../assets/icons/UniRoomIcon";
import { PriceSeparator } from "../../../../helpers/utils";
import { FixedType } from "../../../modules/GeneralTypes/GeneralTypes";

export const BillingListModel = ({
  checkClickHandler,
}: {
  checkClickHandler: (id: number) => void;
}) => [
  {
    title: "شماره صورتحساب",
    dataIndex: "billingNumber",
    key: "billingNumber",
    width: 150,
  },
  {
    title: "عنوان خدمت",
    dataIndex: "serviceTitle",
    key: "serviceTitle",
    width: 150,
  },
  {
    title: "محصول",
    dataIndex: "product",
    key: "product",
    width: 100,
    render: (value: number) => {
      return (
        <>
          {value === 1 ? (
            <span className="product-svg-container">
              <UniRoom />
              خوابگاه
            </span>
          ) : value === 2 ? (
            <span className="product-svg-container">
              <UniFood />
              سلف
            </span>
          ) : value === 3 ? (
            <span className="product-svg-container">
              <UniConsulting />
              مشاوره
            </span>
          ) : value === 4 ? (
            <span className="product-svg-container">
              <UniGame />
              گیم
            </span>
          ) : (
            <></>
          )}
        </>
      );
    },
  },
  {
    title: "نوع صورتحساب",
    dataIndex: "billingType",
    key: "billingType",
    width: 150,
    render: (value: string) => {
      return (
        <span className={value === "برگشت از فروش" ? "red-text" : undefined}>
          {value}
        </span>
      );
    },
  },
  {
    title: "صورتحساب مرجع",
    dataIndex: "billingReference",
    key: "billingReference",
    width: 130,
  },
  {
    title: "رسمیت",
    dataIndex: "formal",
    key: "formal",
    width: 100,
  },
  {
    title: "وضعیت",
    dataIndex: "status",
    key: "status",
    width: 100,
  },
  {
    title: "نوع تسویه",
    dataIndex: "paymentType",
    key: "paymentType",
    width: 100,
  },
  {
    title: "وضعیت فاکتور",
    dataIndex: "factorStatus",
    key: "factorStatus",
    width: 150,
  },
  {
    title: "نام خدمت دهنده",
    dataIndex: "servicerName",
    key: "servicerName",
    width: 150,
  },
  {
    title: "شناسه خدمت دهنده",
    dataIndex: "servicerNo",
    key: "servicerNo",
    width: 150,
  },
  {
    title: "نام خریدار",
    dataIndex: "buyerName",
    key: "buyerName",
    width: 100,
  },
  {
    title: "شناسه خریدار",
    dataIndex: "buyerNo",
    key: "buyerNo",
    width: 100,
  },
  {
    title: "مبلغ نهایی",
    dataIndex: "finalPrice",
    key: "finalPrice",
    width: 100,
    render: (value: number, records: any) => {
      return (
        <span
          className={`${
            records.billingType === "برگشت از فروش" ? "red-text" : undefined
          }`}
        >
          {PriceSeparator(value?.toString())}{" "}
        </span>
      );
    },
  },
  {
    title: "تاریخ پرداخت",
    dataIndex: "paymentDate",
    key: "paymentDate",
    width: 100,
    render: (value: string) => {
      return <span> {moment(value).locale("fa").format("YYYY/M/D")}</span>;
    },
  },
  {
    title: "شماره ارجاع پرداخت",
    dataIndex: "paymentNoReference",
    key: "paymentNoReference",
    width: 150,
  },
  {
    title: "شماره پیگیری پرداخت",
    dataIndex: "paymentTrackingNo",
    key: "paymentTrackingNo",
    width: 150,
  },
  {
    title: "",
    dataIndex: "key",
    key: "key",
    width: 75,
    fixed: "right" as FixedType,
    className: "tables-sticky-column-left",
    render: (value: number) => {
      return (
        <span onClick={() => checkClickHandler(value)} className="check-btn">
          بررسی
        </span>
      );
    },
  },
];
