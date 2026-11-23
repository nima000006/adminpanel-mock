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
import { GetMyBranchAccountingListTurnOver } from "@pages/Finance/MyBranchAccounting/MyBranchTurnOver/MyBranchTurnOverList/@types/@getMyBranchAccountingListTurnOverTypes";

import { MyBranchInvoicesAndDocsServiceTableModelPropsTypes } from "./@types/MyBranchInvoicesAndDocsServiceTableModelPropsTypes";

const MyBranchInvoicesAndDocsServiceTableModel = ({
  onClickHandler,
}: MyBranchInvoicesAndDocsServiceTableModelPropsTypes): CustomColumnType<GetMyBranchAccountingListTurnOver>[] => {
  return [
    {
      title: "شماره سند سیستمی",
      dataIndex: "uuid",
      key: "uuid",
      width: 250,
      ...GetServerColumnSearchProps({
        dataIndex: "id",
        label: "شماره سند سیستمی",
        type: "text",
      }),
    },
    {
      title: "امکان تسویه",
      dataIndex: "accountingInvoiceSettleStatus",
      key: "accountingInvoiceSettleStatus",
      width: 170,
      render: (_: string, record: GetMyBranchAccountingListTurnOver) => {
        const status =
          accountingInvoiceSettleStatusMap[
            record?.accountingInvoiceSettleStatus
              ?.name as keyof typeof accountingInvoiceSettleStatusMap
          ] ?? accountingInvoiceSettleStatusMap.DEFAULT;

        return (
          <CustomTag className="w-fit gap-1" color={status.color} icon={status.icon}>
            {status.text}
          </CustomTag>
        );
      },
    },
    {
      title: "وضعیت پرداخت",
      dataIndex: "settlementAggregationStatus",
      key: "settlementAggregationStatus",
      width: 170,
      render: (value: IdTitleName) => {
        const status =
          settlementAggregationStatusMap[value?.name] ??
          settlementAggregationStatusMap.DEFAULT;

        return (
          <CustomTag color={status.color} className="w-fit">
            {status.text}
          </CustomTag>
        );
      },
    },
    {
      title: "مبلغ",
      dataIndex: "amount",
      key: "amount",
      width: 120,
      ...GetServerColumnSearchProps({
        dataIndex: "money",
        label: "مبلغ",
        type: "sort",
      }),
      render: (value: number) =>
        dataPlaceHolder({
          data: value.toString(),
          isPrice: true,
          isRial: true,
          currency: { isAvailable: true, type: "تومان" },
        }),
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
      width: 110,
      render: (value: IdTitleName) => <SamimServiceTag service={value?.name} />,
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
      width: 100,
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
      key: "action",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 75,
      render: (_: unknown, record: GetMyBranchAccountingListTurnOver) => {
        return (
          <CustomButton
            onClick={() => onClickHandler(record?.uuid.toString())}
            type="link"
          >
            مشاهده
          </CustomButton>
        );
      },
    },
  ];
};

export default MyBranchInvoicesAndDocsServiceTableModel;
