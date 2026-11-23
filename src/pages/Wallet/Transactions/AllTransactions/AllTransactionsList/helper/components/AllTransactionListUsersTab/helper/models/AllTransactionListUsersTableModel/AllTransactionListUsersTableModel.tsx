import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { TransactionRecord, getTransactionDetail } from "@pages/Wallet/_shared/utils";
import {
  MONEY_TYPE_STATUS_TEXT,
  TRANSACTION_TYPE_STATUS_COLOR,
  TRANSACTION_TYPE_STATUS_TEXT,
  TRANSACTION_USER_GROUP_COLOR,
  TRANSACTION_USER_GROUP_TEXT,
} from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";

import {
  AllTransactionDataType,
  AllTransactionMoneyDataType,
} from "../../../@types/@allTransactionListUsersTab";

const AllTransactionListUsersTableModel = ({
  viewDetails,
}: {
  viewDetails: (records: string) => void;
}): CustomColumnType<AllTransactionDataType>[] => {
  return [
    {
      title: "اطلاعات تراکنش",

      children: [
        {
          title: "مبلغ تراکنش",
          dataIndex: "moneys",
          key: "moneys",
          width: 150,
          render: (_: unknown, record: TransactionRecord) => {
            return (
              dataPlaceHolder({
                data: record?.money?.totalAmount?.toString(),
                isPrice: true,
                isRial: true,
              }) + " تومان"
            );
          },
        },
        {
          title: "جهت تراکنش",
          dataIndex: "transactionType",
          key: "transactionType",
          width: 150,
          render: (value: string) => {
            return (
              <CustomTag className="w-fit" color={TRANSACTION_TYPE_STATUS_COLOR[value]}>
                {TRANSACTION_TYPE_STATUS_TEXT[value]}
              </CustomTag>
            );
          },
        },
        {
          title: "هدف تراکنش",
          dataIndex: "ts",
          key: "ts",
          width: 150,
          render: (_: unknown, record: TransactionRecord) => {
            const { detail, color } = getTransactionDetail(record);
            return (
              <CustomTag className="w-fit" color={color}>
                {dataPlaceHolder({ data: detail })}
              </CustomTag>
            );
          },
        },
        {
          title: "نوع پول",
          dataIndex: "money",
          key: "money",
          width: 150,
          render: (value: AllTransactionMoneyDataType) => {
            return (
              <CustomTag className="w-fit" color="geekblue">
                {MONEY_TYPE_STATUS_TEXT[value?.moneyType]}
              </CustomTag>
            );
          },
        },
        {
          title: "مبدا تراکنش ",
          dataIndex: "transActionFrom",
          key: "transActionFrom",
          width: 150,
          // Todo[Atefeh]: uncomment when api got ready
          // ...GetServerColumnSearchProps({
          //   dataIndex: "transactionSource",
          //   label: "مبدا تراکنش ",
          //   type: "text",
          // }),
          render: (_: unknown, record: TransactionRecord) => {
            const { start } = getTransactionDetail(record);
            return <>{dataPlaceHolder({ data: start })}</>;
          },
        },
        {
          title: "مقصد تراکنش",
          dataIndex: "transactionEnd",
          key: "transactionEnd",
          width: 150,
          // Todo[Atefeh]: uncomment when api got ready
          // ...GetServerColumnSearchProps({
          //   dataIndex: "transactionSource",
          //   label: "مقصد تراکنش",
          //   type: "text",
          // }),
          render: (_: unknown, record: TransactionRecord) => {
            const { end } = getTransactionDetail(record);
            return <>{dataPlaceHolder({ data: end })}</>;
          },
        },
        {
          title: "شناسه تراکنش",
          dataIndex: "uuid",
          key: "uuid",
          width: 150,
          ...GetServerColumnSearchProps({
            dataIndex: "uuid",
            label: "شناسه تراکنش",
            type: "text",
          }),
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
        {
          title: "شماره مرجع درگاه",
          dataIndex: "referenceNo",
          key: "referenceNo",
          width: 200,
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
        {
          title: "کد پیگیری",
          dataIndex: "trackNo",
          key: "trackNo",
          width: 150,
          ...GetServerColumnSearchProps({
            dataIndex: "trackNo",
            label: "کد پیگیری",
            type: "text",
          }),
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
        {
          title: "تاریخ و زمان",
          dataIndex: "createdDate",
          key: "createdDate",
          width: 150,
          // Todo[Atefeh]: uncomment when api got ready
          // ...GetServerColumnSearchProps({
          //   dataIndex: "createdDate",
          //   label: "تاریخ و زمان",
          //   type: "sort",
          // }),
          render: (value: string) => {
            return dataPlaceHolder({
              data: value,
              isDate: true,
              customDateFormat: "HH:mm, YYYY-MM-DD",
            });
          },
        },
      ],
    },
    {
      title: "اطلاعات کاربر",
      children: [
        {
          title: "گروه کاربری",
          dataIndex: "userGroup",
          key: "userGroup",
          width: 150,
          render: (value: string) => {
            if (!value) return "-";
            return (
              <CustomTag className="w-fit" color={TRANSACTION_USER_GROUP_COLOR[value]}>
                {TRANSACTION_USER_GROUP_TEXT[value]}
              </CustomTag>
            );
          },
        },
        {
          title: "نام ",
          dataIndex: "walletFirstName",
          key: "walletFirstName",
          width: 150,
          // Todo[Atefeh]: uncomment when api got ready
          // ...GetServerColumnSearchProps({
          //   dataIndex: "walletFirstName",
          //   label: "نام ",
          //   type: "text",
          // }),
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
        {
          title: "نام خانوادگی",
          dataIndex: "walletLastName",
          key: "walletLastName",
          width: 150,
          // Todo[Atefeh]: uncomment when api got ready
          // ...GetServerColumnSearchProps({
          //   dataIndex: "walletLastName",
          //   label: "نام خانوادگی",
          //   type: "text",
          // }),
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
        {
          title: "کد ملی / کد فراگیر",
          dataIndex: "walletUserName",
          key: "walletUserName",
          width: 150,
          // Todo[Atefeh]: uncomment when api got ready
          // ...GetServerColumnSearchProps({
          //   dataIndex: "walletUserName",
          //   label: "کد ملی / کد فراگیر",
          //   type: "text",
          // }),
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
        {
          title: "شماره دانشجویی / پرسنلی",
          dataIndex: "staffCode",
          key: "staffCode",
          width: 200,
          // Todo[Atefeh]: uncomment when api got ready
          // ...GetServerColumnSearchProps({
          //   dataIndex: "staffCode",
          //   label: "شماره دانشجویی / پرسنلی",
          //   type: "text",
          // }),
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
      ],
    },

    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      fixed: "right" as FixedType,
      width: 150,
      className: "tables-sticky-column-left",
      render: (_: string, record: TransactionRecord) => {
        return (
          <CustomButton type="link" onClick={() => viewDetails(record?.uuid)}>
            جزئیات بیشتر
          </CustomButton>
        );
      },
    },
  ];
};

export default AllTransactionListUsersTableModel;
