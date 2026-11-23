import { PiBuildingsLight } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { getTransactionDetail, TransactionRecord } from "@pages/Wallet/_shared/utils";
import {
  MONEY_TYPE_STATUS_TEXT,
  TRANSACTION_TYPE_STATUS_COLOR,
  TRANSACTION_TYPE_STATUS_TEXT,
} from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";

import {
  MyTransactionDataType,
  MyTransactionMoneyDataType,
  WalletMyTransactionDataType,
} from "../../../../MyTransactionListUsersTab/@types/@myTransactionListUsersTab";

const MyTransactionListBranchTableModel = ({
  viewDetails,
}: {
  viewDetails: (records: string) => void;
}): CustomColumnType<WalletMyTransactionDataType | MyTransactionDataType>[] => {
  return [
    {
      title: "اطلاعات تراکنش",
      children: [
        {
          title: "مبلغ تراکنش",
          dataIndex: "moneys",
          key: "moneys",
          width: 150,
          render: (_: MyTransactionMoneyDataType, record: TransactionRecord) => {
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
          dataIndex: "source",
          key: "source",
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
          render: (value: MyTransactionMoneyDataType) => {
            return (
              <CustomTag className="w-fit" color="geekblue">
                {MONEY_TYPE_STATUS_TEXT[value?.moneyType]}
              </CustomTag>
            );
          },
        },
        {
          title: "مبدا تراکنش ",
          dataIndex: "from",
          key: "from",
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
          dataIndex: "to",
          key: "to",
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
          ...GetServerColumnSearchProps({
            dataIndex: "uuid",
            label: "شناسه تراکنش",
            type: "text",
          }),
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
      title: "اطلاعات شعب و کسب و کار",
      children: [
        {
          title: "شناسه کیف پول",
          dataIndex: "walletUuid",
          key: "walletUuid",
          width: 150,
        },
        {
          title: "کیف پول سرویس",
          dataIndex: "service",
          key: "service",
          width: 150,
          render: (value: string) => (
            <div className="no-color-tag">
              <SamimServiceTag service={value} />
            </div>
          ),
        },
        {
          title: "نوع کسب و کار",
          dataIndex: "businessType",
          key: "businessType",
          width: 150,
          render: () => {
            return (
              <CustomTag className="w-fit gap-1" color="blue" icon={<PiBuildingsLight />}>
                حقوقی
              </CustomTag>
            );
          },
        },

        {
          title: "نام کسب و کار ",
          dataIndex: "businessName",
          key: "businessName",
          width: 150,
          // Todo[Atefeh]: uncomment when api got ready
          // ...GetServerColumnSearchProps({
          //   dataIndex: "businessName",
          //   label: "نام کسب و کار  ",
          //   type: "text",
          // }),
        },
        {
          title: "شعبه / واحد",
          dataIndex: "walletBranchName",
          key: "walletBranchName",
          width: 150,
          // Todo[Atefeh]: uncomment when api got ready
          // ...GetServerColumnSearchProps({
          //   dataIndex: "branchName",
          //   label: "نام شعبه / واحد",
          //   type: "text",
          // }),
        },
        {
          title: "کد شعبه",
          dataIndex: "branchCode",
          key: "branchCode",
          width: 150,
          render: (value: string) => dataPlaceHolder({ data: value }),
          // Todo[Atefeh]: uncomment when api got ready
          // ...GetServerColumnSearchProps({
          //   dataIndex: "branchCode",
          //   label: "کد شعبه",
          //   type: "text",
          // }),
        },
        {
          title: "استان",
          dataIndex: "province",
          key: "province",
          width: 200,
          // Todo[Atefeh]: uncomment when api got ready
          // ...GetServerColumnSearchProps({
          //   dataIndex: "province",
          //   label: "استان",
          //   type: "text",
          // }),
        },
        {
          title: "شهر",
          dataIndex: "city",
          key: "city",
          width: 200,
          // Todo[Atefeh]: uncomment when api got ready
          // ...GetServerColumnSearchProps({
          //   dataIndex: "city",
          //   label: "شهر",
          //   type: "text",
          // }),
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

export default MyTransactionListBranchTableModel;
