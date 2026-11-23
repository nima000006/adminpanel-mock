import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { getTransactionDetail, TransactionRecord } from "@pages/Wallet/_shared/utils";
import { MONEY_TYPE_STATUS_TEXT } from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";

import {
  MyTransactionSamimWalletContentType,
  MyTransactionSamimWalletMoneyDataType,
} from "../../../@types/@myTransactionListWalletTab";

const MyTransactionListWalletTableModel = ({
  viewDetails,
}: {
  viewDetails: (records: string) => void;
}): CustomColumnType<MyTransactionSamimWalletContentType>[] => {
  return [
    {
      title: "اطلاعات تراکنش",
      children: [
        {
          title: "مبلغ تراکنش",
          dataIndex: "money",
          key: "money",
          width: 150,
          render: (value: MyTransactionSamimWalletMoneyDataType) => {
            return <> {value?.totalAmount / 10} تومان </>;
          },
        },
        {
          title: "جهت تراکنش",
          dataIndex: "money",
          key: "money",
          width: 150,
          render: (value: MyTransactionSamimWalletMoneyDataType) => {
            return <> {value?.totalAmount} </>;
          },
        },
        {
          title: "هدف تراکنش",
          dataIndex: "transactionSource",
          key: "transactionSource",
          width: 150,
          render: (_: unknown, record: TransactionRecord) => {
            const { detail, color } = getTransactionDetail(record);
            return (
              <CustomTag className="w-fit" color={color}>
                {detail}
              </CustomTag>
            );
          },
        },
        {
          title: "نوع پول",
          dataIndex: "money",
          key: "money",
          width: 150,
          render: (value: MyTransactionSamimWalletMoneyDataType) => {
            return (
              <CustomTag color="geekblue">
                {MONEY_TYPE_STATUS_TEXT[value?.moneyType]}
              </CustomTag>
            );
          },
        },
        {
          title: "مبدا تراکنش ",
          dataIndex: "transactionSource",
          key: "transactionSource",
          width: 150,
          // Todo[Atefeh]: uncomment when api got ready
          // ...GetServerColumnSearchProps({
          //   dataIndex: "transactionSource",
          //   label: "مبدا تراکنش ",
          //   type: "text",
          // }),
          render: (_: unknown, record: TransactionRecord) => {
            const { start } = getTransactionDetail(record);
            return <>{start}</>;
          },
        },
        {
          title: "مقصد تراکنش",
          dataIndex: "transactionSource",
          key: "transactionSource",
          width: 150,
          // Todo[Atefeh]: uncomment when api got ready
          // ...GetServerColumnSearchProps({
          //   dataIndex: "transactionSource",
          //   label: "مقصد تراکنش",
          //   type: "text",
          // }),
          render: (_: unknown, record: TransactionRecord) => {
            const { end } = getTransactionDetail(record);
            return <>{end}</>;
          },
        },
        {
          title: "شناسه تراکنش",
          dataIndex: "uuid",
          key: "uuid",
          width: 150,
          // Todo[Atefeh]: uncomment when api got ready
          // ...GetServerColumnSearchProps({
          //   dataIndex: "uuid",
          //   label: "شناسه تراکنش",
          //   type: "text",
          // }),
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
              customDateFormat: "YYYY-MM-DD , HH:mm",
            });
          },
        },
      ],
    },

    {
      title: "",
      dataIndex: "uuid",
      key: "uuid",
      fixed: "right" as FixedType,
      width: 150,
      className: "tables-sticky-column-left",
      render: (value: string) => {
        return (
          <CustomButton type="link" onClick={() => viewDetails(value)}>
            جزئیات بیشتر
          </CustomButton>
        );
      },
    },
  ];
};

export default MyTransactionListWalletTableModel;
