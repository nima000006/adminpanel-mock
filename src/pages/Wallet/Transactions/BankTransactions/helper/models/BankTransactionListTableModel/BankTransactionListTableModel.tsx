import { PiCheck, PiHourglassSimpleHigh, PiProhibit } from "react-icons/pi";

import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { GetBankTransactionListsItems } from "@pages/Wallet/Transactions/BankTransactions/@types/@bankTransactions";
import {
  staffTypeConfig,
  statusOption,
} from "@pages/Wallet/Transactions/BankTransactions/helper/components/BankMoreDetailDrawerContent/helper/utils";

const BankTransactionListTableModel = ({
  viewDetails,
  resolveConflictBtn,
}: {
  viewDetails: (records: GetBankTransactionListsItems) => void;
  resolveConflictBtn: (records: number) => void;
}): CustomColumnType<GetBankTransactionListsItems>[] => {
  return [
    {
      title: "اطلاعات کاربر",
      children: [
        {
          title: "گروه کاربری",
          dataIndex: "groups",
          key: "groups",
          width: 90,
          render: (_: unknown, record: GetBankTransactionListsItems) => {
            const config =
              staffTypeConfig[record?.staffType?.name as keyof typeof staffTypeConfig] ??
              staffTypeConfig.DEFAULT;

            return (
              <CustomTag className="w-fit" color={config.color}>
                {config.label}
              </CustomTag>
            );
          },
        },
        {
          title: "نام",
          dataIndex: "firstName",
          key: "firstName",
          width: 90,
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
        {
          title: "نام خانوادگی",
          dataIndex: "lastName",
          key: "lastName",
          width: 100,
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
        {
          title: "کد ملی / کد فراگیر",
          dataIndex: "nationalCode",
          key: "nationalCode",
          width: 160,
          ...GetServerColumnSearchProps({
            dataIndex: "nationalCode",
            label: "کد ملی / کد فراگیر",
            type: "text",
          }),
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
        {
          title: "شماره دانشجویی / پرسنلی",
          dataIndex: "personalCode",
          key: "personalCode",
          width: 200,
          ...GetServerColumnSearchProps({
            dataIndex: "personalCode",
            label: "شماره دانشجویی / پرسنلی",
            type: "text",
          }),
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
        {
          title: "شعبه / واحد",
          dataIndex: "branchName",
          key: "branchName",
          width: 130,
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
      ],
    },
    {
      title: "اطلاعات تراکنش",
      children: [
        {
          title: "مبلغ تراکنش",
          dataIndex: "amount",
          key: "amount",
          width: 200,
          ...GetServerColumnSearchProps({
            dataIndex: "amount",
            label: "مبلغ تراکنش",
            type: "sort",
          }),
          render: (value: string) =>
            dataPlaceHolder({
              data: value,
              isPrice: true,
              isRial: true,
            }) + " تومان",
        },
        {
          title: "وضعیت",
          dataIndex: "status",
          key: "status",
          width: 120,
          render: (_: unknown, record: GetBankTransactionListsItems) => {
            const status = record.status?.name;
            const title = statusOption.find((item) => item.name === status)?.title;

            if (status === "VERIFIED") {
              return (
                <CustomTag
                  className="flex w-fit gap-1"
                  color="volcano"
                  icon={<PiHourglassSimpleHigh />}
                >
                  {title}
                </CustomTag>
              );
            }

            const isSuccess = [
              "COMPLETED",
              "AVAILABLE_IN_WALLET",
              "REVERT_TO_WALLET",
            ].includes(status ?? "");

            return (
              <CustomTag
                className="flex w-fit gap-1"
                color={isSuccess ? "green" : "red"}
                icon={isSuccess ? <PiCheck /> : <PiProhibit />}
              >
                {title}
              </CustomTag>
            );
          },
        },
        {
          title: "سرویس",
          dataIndex: "service",
          key: "service",
          width: 120,
          render: (_: unknown, record: GetBankTransactionListsItems) => (
            <SamimServiceTag service={record?.service?.name} />
          ),
        },
        {
          title: "درگاه بانکی",
          dataIndex: "bankGateway",
          key: "bankGateway",
          width: 140,
          render: (_: unknown, record: GetBankTransactionListsItems) =>
            dataPlaceHolder({ data: record?.bankGateway.title }),
        },
        {
          title: "کد پیگیری",
          dataIndex: "trackNumber",
          key: "trackNumber",
          width: 160,
          ...GetServerColumnSearchProps({
            dataIndex: "trackNumber",
            label: "کد پیگیری",
            type: "text",
          }),
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
        {
          title: "شماره مرجع درگاه",
          dataIndex: "referenceNumber",
          key: "referenceNumber",
          width: 150,
          ...GetServerColumnSearchProps({
            dataIndex: "referenceNumber",
            label: "شماره مرجع درگاه",
            type: "text",
          }),
          render: (value: string) => dataPlaceHolder({ data: value }),
        },

        {
          title: "تاریخ و زمان",
          dataIndex: "paymentDate",
          key: "paymentDate",
          width: 140,
          ...GetServerColumnSearchProps({
            dataIndex: "createdDate",
            label: "تاریخ و زمان",
            type: "sort",
          }),
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
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 150,
      className: "tables-sticky-column-left",
      render: (_: unknown, record: GetBankTransactionListsItems) => {
        return (
          <div className="flex">
            <CustomButton type="link" onClick={() => viewDetails(record)}>
              جزئیات بیشتر
            </CustomButton>
            {record.status?.name === "VERIFIED" ? (
              <CustomButton
                type="link"
                onClick={() => resolveConflictBtn(record?.paymentRequestId)}
              >
                رفع مغایرت
              </CustomButton>
            ) : null}
          </div>
        );
      },
    },
  ];
};

export default BankTransactionListTableModel;
