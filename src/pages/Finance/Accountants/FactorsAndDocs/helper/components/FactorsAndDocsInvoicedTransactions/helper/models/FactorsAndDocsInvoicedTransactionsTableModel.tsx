import moment from "jalali-moment";
import {
  PiBank,
  PiBuildings,
  PiCreditCard,
  PiIdentificationCard,
  PiMoney,
  PiPizza,
  PiUmbrella,
  PiWallet,
} from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import { TransactionItem } from "../../@types/@accountingInvoicedTransactionsTypes";

const FactorsAndDocsInvoicedTransactionsTableModel = ({
  onDetailClickHandler,
}: {
  onDetailClickHandler: (record: TransactionItem) => void;
}): CustomColumnType<TransactionItem>[] => {
  return [
    { title: "نام", dataIndex: "firstName", key: "firstName", width: 130 },
    { title: "نام خانوادگی", dataIndex: "lastName", key: "lastName", width: 130 },
    {
      title: "کد ملی",
      dataIndex: "userName",
      key: "userName",
      width: 130,
    },
    {
      title: "شماره تلفن",
      dataIndex: "phone",
      key: "phone",
      width: 130,
    },
    {
      title: "مبلغ کل تراکنش (ریال)",
      dataIndex: "transactionAmount",
      key: "transactionAmount",
      width: 200,
    },
    {
      title: "نوع مبلغ",
      dataIndex: "transactionAmountType",
      key: "transactionAmountType",
      width: 130,
    },
    {
      title: "نام سرویس",
      dataIndex: "serviceName",
      key: "serviceName",
      width: 130,
      render: (text: string) => {
        if (text === "تغذیه") {
          return (
            <CustomTag color="success" staticWidth="fit-content">
              <PiPizza className="custom-icon" />
              {text}
            </CustomTag>
          );
        } else if (text === "کارت دانشجویی") {
          return (
            <CustomTag color="blue" staticWidth="fit-content">
              <PiIdentificationCard className="custom-icon" />
              {text}
            </CustomTag>
          );
        } else if (text === "بیمه") {
          return (
            <CustomTag color="geekblue" staticWidth="fit-content">
              <PiUmbrella className="custom-icon" />
              {text}
            </CustomTag>
          );
        } else if (text === "خوابگاه") {
          return (
            <CustomTag color="purple" staticWidth="fit-content">
              <PiBuildings className="custom-icon" />
              {text}
            </CustomTag>
          );
        }

        return <CustomTag>{text}</CustomTag>;
      },
    },
    {
      title: "نوع پرداخت",
      dataIndex: "paymentType",
      key: "paymentType",
      width: 122,
      render: (text: string) => (
        <CustomTag
          color={text === "نقدی" ? "warning" : "volcano"}
          className="tag-container"
          staticWidth={"fit-content"}
        >
          <PiMoney className="custom-icon" />
          {text}
        </CustomTag>
      ),
    },
    {
      title: "روش پرداخت",
      dataIndex: "paymentWay",
      key: "paymentWay",
      width: 162,
      render: (text: string) => {
        if (text === "دستگاه کارت خوان") {
          return (
            <CustomTag color="cyan" staticWidth="fit-content">
              <PiCreditCard className="custom-icon" />
              {text}
            </CustomTag>
          );
        } else if (text === "درگاه بانکی") {
          return (
            <CustomTag color="geekblue" staticWidth="fit-content">
              <PiBank className="custom-icon" />
              {text}
            </CustomTag>
          );
        } else if (text === "کیف پول") {
          return (
            <CustomTag color="blue" staticWidth="fit-content">
              <PiWallet className="custom-icon" />
              {text}
            </CustomTag>
          );
        }
        return <CustomTag>{text}</CustomTag>;
      },
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (text: string) => {
        if (text === "در انتظار بررسی") {
          return (
            <CustomTag color="processing" staticWidth="fit-content">
              {text}
            </CustomTag>
          );
        } else if (text === "پرداخت شده") {
          return (
            <CustomTag color="success" staticWidth="fit-content">
              {text}
            </CustomTag>
          );
        }
        return <CustomTag>{text}</CustomTag>;
      },
    },
    {
      title: "شماره فاکتور",
      dataIndex: "paidInvoiceId",
      key: "paidInvoiceId",
      width: 130,
    },
    {
      title: "شماره تراکنش",
      dataIndex: "trackNumber",
      key: "trackNumber",
      width: 130,
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
      title: "شماره مرجع",
      dataIndex: "referenceNumber",
      key: "referenceNumber",
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 150,
      className: "tables-sticky-column-left",
      render: (_: unknown, record: TransactionItem) => {
        return (
          <CustomButton onClick={() => onDetailClickHandler(record)} type="link">
            مشاهده جزئیات
          </CustomButton>
        );
      },
    },
  ];
};
export default FactorsAndDocsInvoicedTransactionsTableModel;
