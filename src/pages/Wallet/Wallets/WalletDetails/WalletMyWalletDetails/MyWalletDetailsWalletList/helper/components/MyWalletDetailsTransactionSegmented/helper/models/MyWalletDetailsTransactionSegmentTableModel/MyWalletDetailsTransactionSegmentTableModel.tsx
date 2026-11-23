import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { getTransactionDetail } from "@pages/Wallet/_shared/utils";
import {
  MONEY_TYPE_STATUS_TEXT,
  TRANSACTION_TYPE_STATUS_COLOR,
  TRANSACTION_TYPE_STATUS_TEXT,
} from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";

import { MyTransactionDataType } from "../../components/MyWalletDetailsTransactionSegmentTable/@types/@myWalletDetailsTransactionSegmentTable";

const MyWalletDetailsTransactionSegmentTableModel = ({
  moreDetailTransactionBtnHandler,
}: {
  moreDetailTransactionBtnHandler: (id: string) => void;
}): CustomColumnType<MyTransactionDataType>[] => {
  return [
    {
      title: "مبلغ تراکنش",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 150,
      //Todo[Nima]:uncomment when api got ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "totalAmount",
      //   label: "مبلغ تراکنش",
      //   type: "sort",
      // }),
      render: (_: unknown, record: MyTransactionDataType) => {
        return (
          <>
            {dataPlaceHolder({
              data: record?.totalAmount.toString(),
              isRial: true,
              isPrice: true,
            })}{" "}
            تومان
          </>
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
      dataIndex: "transactionSource",
      key: "transactionSource",
      width: 150,
      render: (_: unknown, record: MyTransactionDataType) => {
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
      render: (value: MyTransactionDataType) => {
        return (
          <CustomTag className="w-fit" color="geekblue">
            {MONEY_TYPE_STATUS_TEXT[value?.moneyType]}
          </CustomTag>
        );
      },
    },
    {
      title: "مبدا تراکنش",
      dataIndex: "source",
      key: "source",
      width: 150,
      // Todo[Atefeh]:uncomment when api got ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "transactionSource",
      //   label: "مبدا تراکنش",
      //   type: "text",
      // }),
      render: (_: unknown, record: MyTransactionDataType) => {
        const { start } = getTransactionDetail(record);
        return <>{dataPlaceHolder({ data: start })}</>;
      },
    },
    {
      title: "مقصد تراکنش",
      dataIndex: "to",
      key: "to",
      width: 150,
      // Todo[Atefeh]:uncomment when api got ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "transactionSource",
      //   label: "مقصد تراکنش",
      //   type: "text",
      // }),
      render: (_: unknown, record: MyTransactionDataType) => {
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
      width: 150,
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
      // Todo[Atefeh]:uncomment when api got ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "createdDate",
      //   label: "تاریخ و زمان",
      //   type: "sort",
      // }),
      render: (value: string) => {
        return (
          <>
            {dataPlaceHolder({
              data: value,
              isDate: true,
              customDateFormat: "HH:mm, YYYY-MM-DD",
            })}
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      fixed: "right" as FixedType,
      width: 120,
      className: "tables-sticky-column-left",
      render: (_: string, record: MyTransactionDataType) => {
        return (
          <CustomButton
            type="link"
            onClick={() => moreDetailTransactionBtnHandler(record?.uuid)}
          >
            جزئیات بیشتر
          </CustomButton>
        );
      },
    },
  ];
};

export default MyWalletDetailsTransactionSegmentTableModel;
