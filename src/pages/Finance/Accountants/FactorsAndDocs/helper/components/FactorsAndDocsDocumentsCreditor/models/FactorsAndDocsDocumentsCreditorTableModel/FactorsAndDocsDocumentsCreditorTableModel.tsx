import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  accountingInvoiceSettleStatusMap,
  settlementAggregationStatusMap,
} from "@pages/Finance/Accountants/_shared/utils";

import { AccountingDebtDocumentContent } from "../../../FactorsAndDocsDocuments/@types/@factorsAndDocsDebtDocuments";

const FactorsAndDocsDocumentsCreditorTableModel = ({
  onDetailClickHandler,
}: {
  onDetailClickHandler: (record: AccountingDebtDocumentContent) => void;
}): CustomColumnType<AccountingDebtDocumentContent>[] => {
  return [
    {
      title: "شماره سند سیستمی",
      dataIndex: "uuid",
      key: "uuid",
      width: 250,
      ...GetServerColumnSearchProps({
        dataIndex: "id",
        label: "شماره سند دانشجویار",
        type: "text",
      }),
    },
    {
      title: "امکان تسویه با ذینفع",
      dataIndex: "accountingInvoiceSettleStatus",
      key: "accountingInvoiceSettleStatus",
      width: 170,
      render: (_: string, record: AccountingDebtDocumentContent) => {
        const status =
          accountingInvoiceSettleStatusMap[
            record?.accountingInvoiceSettleStatus
              ?.name as keyof typeof accountingInvoiceSettleStatusMap
          ] ?? accountingInvoiceSettleStatusMap.DEFAULT;

        return (
          <CustomTag className="custom-tag" color={status.color} icon={status.icon}>
            {status.text}
          </CustomTag>
        );
      },
    },
    {
      title: "وضعیت پرداخت به ذینفع",
      dataIndex: "settlementAggregationStatus",
      key: "settlementAggregationStatus",
      width: 170,
      render: (value: IdTitleName) => {
        const status =
          settlementAggregationStatusMap[value?.name] ??
          settlementAggregationStatusMap.DEFAULT;

        return (
          <CustomTag color={status.color} className="custom-tag">
            {status.text}
          </CustomTag>
        );
      },
    },
    {
      title: "مبلغ",
      dataIndex: "amount",
      key: "amount",
      width: 160,
      ...GetServerColumnSearchProps({
        dataIndex: "money",
        label: "مبلغ",
        type: "sort",
      }),
      render: (value: string) => {
        return dataPlaceHolder({ data: value, isPrice: true, isRial: true });
      },
    },
    {
      title: "کسب و کار",
      dataIndex: "businessName",
      key: "businessName",
      width: 100,
      render: (value: string) => {
        return dataPlaceHolder({ data: value });
      },
    },
    {
      title: "واحد / شعبه (ذینفع)",
      dataIndex: "branchName",
      key: "branchName",
      width: 160,
    },
    {
      title: "سرویس",
      dataIndex: "samimService",
      key: "samimService",
      width: 115,
      render: (_: unknown, record: AccountingDebtDocumentContent) => {
        return <SamimServiceTag service={record?.samimService?.name} />;
      },
    },
    {
      title: "استان",
      dataIndex: "provinceName",
      key: "provinceName",
      width: 150,
    },
    {
      title: "شهر",
      dataIndex: "cityName",
      key: "cityName",
      width: 150,
    },
    {
      title: "تاریخ و زمان ایجاد سند",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 185,
      ...GetServerColumnSearchProps({
        dataIndex: "createdDate",
        label: "تاریخ و زمان ایجاد سند",
        type: "sort",
      }),
      render: (value: string) => {
        return dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm، YYYY/MM/DD",
        });
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 70,
      render: (_: unknown, record: AccountingDebtDocumentContent) => {
        return (
          <CustomButton onClick={() => onDetailClickHandler(record)} type="link">
            مشاهده
          </CustomButton>
        );
      },
    },
  ];
};
export default FactorsAndDocsDocumentsCreditorTableModel;
