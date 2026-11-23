import { PriceSeparator } from "../../../../helpers/utils";
import { FixedType } from "../../../modules/GeneralTypes/GeneralTypes";

export const BuyerReportModel = ({
  watchBillsClickHandler,
}: {
  watchBillsClickHandler: (id: number) => void;
}) => [
  {
    title: "نام خریدار",
    dataIndex: "buyerName",
    key: "buyerName",
    width: 150,
  },
  {
    title: "شناسه خریدار",
    dataIndex: "buyerNo",
    key: "buyerNo",
    width: 150,
  },
  {
    title: "تعداد کل فاکتورها",
    dataIndex: "factorsQty",
    key: "factorsQty",
    width: 150,
  },
  {
    title: "مبلغ کل فاکتورها",
    dataIndex: "factorsTotalPrice",
    key: "factorsTotalPrice",
    width: 150,
    render: (value: number) => {
      return PriceSeparator(value?.toString());
    },
  },
  {
    title: " تعداد در انتظار تسویه",
    dataIndex: "waitingForPaymentQty",
    key: "waitingForPaymentQty",
    width: 170,
  },
  {
    title: " مبالغ در انتظار تسویه",
    dataIndex: "waitingForPaymentPrice",
    key: "waitingForPaymentPrice",
    width: 170,
    render: (value: number) => {
      return PriceSeparator(value?.toString());
    },
  },
  {
    title: " تعداد سر رسید شده",
    dataIndex: "finishedPaymentQty",
    key: "finishedPaymentQty",
    width: 170,
  },
  {
    title: "مبالغ سر رسید شده",
    dataIndex: "finishedPaymentPrice",
    key: "finishedPaymentPrice",
    width: 170,
    render: (value: number) => {
      return PriceSeparator(value?.toString());
    },
  },
  {
    title: "تعداد تسویه شده",
    dataIndex: "settledQty",
    key: "settledQty",
    width: 150,
  },
  {
    title: "مبالغ تسویه شده",
    dataIndex: "settledPrice",
    key: "settledPrice",
    width: 150,
    render: (value: number) => {
      return PriceSeparator(value?.toString());
    },
  },
  {
    title: "",
    dataIndex: "key",
    key: "key",
    width: 150,
    fixed: "right" as FixedType,
    className: "tables-sticky-column-left",
    render: (value: number) => {
      return (
        <span onClick={() => watchBillsClickHandler(value)} className="action-btn">
          مشاهده صورتحساب ها
        </span>
      );
    },
  },
];
