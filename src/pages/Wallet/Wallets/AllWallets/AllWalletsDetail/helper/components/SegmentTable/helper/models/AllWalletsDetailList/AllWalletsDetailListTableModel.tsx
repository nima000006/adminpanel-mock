import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { emptyString } from "@infra/config/global.vars";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { TransactionRecord, getTransactionDetail } from "@pages/Wallet/_shared/utils";
import { AllTransactionDataType } from "@pages/Wallet/Transactions/AllTransactions/AllTransactionsList/helper/components/AllTransactionListUsersTab/@types/@allTransactionListUsersTab";
import { WALLET_TYPE } from "@pages/Wallet/Wallets/_shared/utils/walletUtils";
import {
  MONEY_TYPE_STATUS_TEXT,
  TRANSACTION_TYPE_STATUS_COLOR,
  TRANSACTION_TYPE_STATUS_TEXT,
} from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";
import { WalletsTransactionsContentByWalletIdType } from "@pages/Wallet/Wallets/AllWallets/AllWalletsDetail/@types/@allWalletsDetail";

import {
  AllWalletsDetailListTableModelProps,
  AllWalletsDetailTransactionMoneyType,
} from "./@types/@allWalletsDetailListTableModel";

const AllWalletsDetailListTableModel = ({
  walletType,
  openUserDrawer,
  openBusinessDrawer,
}: AllWalletsDetailListTableModelProps): CustomColumnType<
  WalletsTransactionsContentByWalletIdType | AllTransactionDataType
>[] => {
  return [
    {
      title: "مبلغ تراکنش",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 150,
      // Todo[Nima]: uncomment when api got ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "totalAmount",
      //   label: "مبلغ تراکنش",
      //   type: "sort",
      // }),
      render: (value: number) =>
        dataPlaceHolder({ data: value.toString(), isPrice: true, isRial: true }) +
        " " +
        "تومان",
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
      dataIndex: "transactionDetail",
      key: "transactionDetail",
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
      render: (value: AllWalletsDetailTransactionMoneyType) => {
        return (
          <CustomTag className="w-fit" color="geekblue">
            {MONEY_TYPE_STATUS_TEXT[value?.moneyType]}
          </CustomTag>
        );
      },
    },
    {
      title: "سرویس",
      dataIndex: "service",
      key: "service",
      width: 150,
      render: (value: string) => (!value ? "-" : <SamimServiceTag service={value} />),
    },
    {
      title: "مبدا تراکنش",
      dataIndex: "start",
      key: "start",
      width: 150,
      // Todo[Nima]: uncomment when api got ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "transactionSource",
      //   label: "مبدا تراکنش",
      //   type: "text",
      // }),
      render: (_: unknown, record: TransactionRecord) => {
        const { start } = getTransactionDetail(record);
        return <> {start}</>;
      },
    },
    {
      title: "مقصد تراکنش",
      dataIndex: "end",
      key: "end",
      width: 150,
      // Todo[Nima]: uncomment when api got ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "transactionSource",
      //   label: "مقصد تراکنش",
      //   type: "text",
      // }),
      render: (_: unknown, record: TransactionRecord) => {
        const { end } = getTransactionDetail(record);
        return <> {end} </>;
      },
    },
    {
      title: "شناسه تراکنش",
      dataIndex: "uuidNumber",
      key: "uuidNumber",
      width: 250,
      // ...GetServerColumnSearchProps({
      //   dataIndex: "uuid",
      //   label: "شناسه تراکنش",
      //   type: "text",
      // }),
      render: (_: unknown, record: TransactionRecord) => {
        return <> {record?.uuid} </>;
      },
    },
    {
      title: "شماره مرجع درگاه",
      dataIndex: "referenceNo",
      key: "referenceNo",
      width: 200,
      ...GetServerColumnSearchProps({
        dataIndex: "referenceNo",
        label: "شماره مرجع درگاه",
        type: "text",
      }),
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
    },

    ...(walletType === WALLET_TYPE.studentUser
      ? [
          {
            title: "شماره دانشجویی",
            dataIndex: "studentNo",
            key: "studentNo",
            width: 150,
            // Todo[Atefeh]: uncomment when api got ready
            // ...GetServerColumnSearchProps({
            //   dataIndex: "studentNo",
            //   label: "شماره دانشجویی",
            //   type: "text",
            // }),
            render: () => <> {emptyString} </>,
          },
          {
            title: "رشته تحصیلی",
            dataIndex: "field",
            key: "field",
            width: 150,
            render: () => <CustomTag>{emptyString}</CustomTag>,
          },
        ]
      : []),
    ...(walletType === WALLET_TYPE.staffUser
      ? [
          {
            title: "کد پرسنلی",
            dataIndex: "personalCode",
            key: "personalCode",
            width: 150,
            // Todo[Atefeh]: uncomment when api got ready
            // ...GetServerColumnSearchProps({
            //   dataIndex: "personalCode",
            //   label: "کد پرسنلی",
            //   type: "text",
            // }),
            render: () => <> {emptyString} </>,
          },
          {
            title: "عنوان سمت",
            dataIndex: "positionTitle",
            key: "positionTitle",
            width: 150,
            render: () => {
              return <CustomTag>{emptyString}</CustomTag>;
            },
            // ...GetServerColumnSearchProps({
            //   dataIndex: "positionTitle",
            //   label: "عنوان سمت",
            //   type: "text",
            // }),
          },
        ]
      : []),
    {
      title: "واحد / شعبه",
      dataIndex: "branch",
      key: "branch",
      width: 150,
      render: () => {
        return <CustomTag>{emptyString}</CustomTag>;
      },
    },
    {
      title: "تاریخ و زمان",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 150,
      // Todo[Nima]: uncomment when api got ready
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
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      fixed: "right" as FixedType,
      width: 120,
      className: "tables-sticky-column-left",
      render: (_: string, records: TransactionRecord) => {
        return (
          <CustomButton
            type="link"
            onClick={
              walletType === WALLET_TYPE.business
                ? () => openBusinessDrawer(records?.uuid)
                : () => openUserDrawer(records?.uuid)
            }
          >
            جزئیات بیشتر
          </CustomButton>
        );
      },
    },
  ];
};

export default AllWalletsDetailListTableModel;
