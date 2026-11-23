import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { FinanceBusinessOwnerTransactionDataType } from "../../@types/@financeBusinessOwnersTransactionsTypes";

const TransactionsTableModel =
  (): CustomColumnType<FinanceBusinessOwnerTransactionDataType>[] => {
    return [
      {
        title: "سهم از تراکنش (تومان)",
        dataIndex: "amount",
        key: "amount",
        width: 200,
        render: (value: number) =>
          dataPlaceHolder({
            data: value?.toString(),
            isPrice: true,
            isRial: true,
          }),
      },
      {
        title: "شناسه تراکنش",
        dataIndex: "transactionId",
        key: "transactionId",
        width: 150,
      },
      {
        title: "تاریخ و ساعت تراکنش",
        dataIndex: "createdDate",
        key: "createdDate",
        width: 193,
        render: (value: number) =>
          dataPlaceHolder({
            data: value?.toString(),
            isDate: true,
            customDateFormat: "HH:mm, YYYY/MM/DD",
          }),
      },
      {
        title: "کسب و کار",
        dataIndex: "businessName",
        key: "businessName",
        width: 193,
      },
      {
        title: "استان",
        dataIndex: "province",
        key: "province",
        width: 193,
        render: () => emptyString,
      },
      {
        title: "شهر",
        dataIndex: "city",
        key: "city",
        width: 193,
        render: () => emptyString,
      },
      {
        title: "واحد / شعبه",
        dataIndex: "branchName",
        key: "branchName",
        width: 160,
        render: (_: unknown, records: FinanceBusinessOwnerTransactionDataType) =>
          dataPlaceHolder({ data: records?.branchName }),
      },
      {
        title: "سرویس",
        dataIndex: "service",
        key: "service",
        width: 150,
        render: (_: string, records: FinanceBusinessOwnerTransactionDataType) => {
          return <SamimServiceTag service={records?.service} />;
        },
      },
      {
        title: "نام",
        dataIndex: "firstname",
        key: "firstname",
        width: 193,
        render: (_: unknown, records: FinanceBusinessOwnerTransactionDataType) =>
          dataPlaceHolder({ data: records?.firstname }),
      },
      {
        title: "نام خانوادگی",
        dataIndex: "lastname",
        key: "lastname",
        width: 193,
        render: (_: unknown, records: FinanceBusinessOwnerTransactionDataType) =>
          dataPlaceHolder({ data: records?.lastname }),
      },
      {
        title: "کد ملی / اتباع",
        dataIndex: "username",
        key: "username",
        width: 193,
        render: (_: unknown, records: FinanceBusinessOwnerTransactionDataType) =>
          dataPlaceHolder({ data: records?.username }),
      },
      {
        title: "شماره دانشجویی / پرسنلی",
        dataIndex: "personalCode",
        key: "personalCode",
        width: 193,

        render: (_: unknown, records: FinanceBusinessOwnerTransactionDataType) =>
          dataPlaceHolder({ data: records?.personalCode }),
      },
      {
        title: "شماره موبایل",
        dataIndex: "mobileNumber",
        key: "mobileNumber",
        width: 193,
        render: (_: unknown, records: FinanceBusinessOwnerTransactionDataType) =>
          dataPlaceHolder({ data: records?.mobileNumber }),
      },
      {
        title: "وضعیت", //   به درخواست اقای جماعتی این ستون اضافه شد
        dataIndex: "accountingInvoiceStatus",
        key: "accountingInvoiceStatus",
        width: 150,
        render: () => emptyString,
      },
    ];
  };
export default TransactionsTableModel;
